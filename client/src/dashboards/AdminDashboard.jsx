import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  subjects as initialSubjects,
  topics as initialTopics,
  pendingItems as initialPending,
} from "../data/mockData";
import "./Dashboard.css";
function AdminDashboard() {
  const [subjectsList, setSubjectsList] = useState(initialSubjects);
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [pending, setPending] = useState(initialPending);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = subjectsList.find((s) => s.id === selectedSubjectId);
  function approve(id) {
    setPending(pending.filter((p) => p.id !== id));
  }
  function deleteItem(id) {
    setPending(pending.filter((p) => p.id !== id));
  }
  function deleteSubject(id) {
    setSubjectsList(subjectsList.filter((s) => s.id !== id));
    setTopicsList(topicsList.filter((t) => t.subjectId !== id));
    setSelectedSubjectId(null);
  }
  function deleteTopic(id) {
    setTopicsList(topicsList.filter((t) => t.id !== id));
  }
  const topItem = <div className="dsb-brand-sub">Admin Dashboard</div>;
  return (
    <DashboardLayout
      subjects={subjectsList}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={setSelectedSubjectId}
      topItem={topItem}
    >
      {" "}
      <h1>Admin dashboard</h1> <h2>Pending approvals</h2>{" "}
      {pending.length === 0 && <p>No pending items.</p>}{" "}
      <ul className="dsb-pending-list">
        {" "}
        {pending.map((p) => (
          <li key={p.id} className="dsb-pending-row">
            {" "}
            <span>
              {p.type}: {p.name}
            </span>{" "}
            <div>
              {" "}
              <button onClick={() => approve(p.id)}>Approve</button>{" "}
              <button onClick={() => deleteItem(p.id)}>Delete</button>{" "}
            </div>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      {selectedSubjectId && (
        <div style={{ marginTop: "32px" }}>
          {" "}
          <h2>{selectedSubject.name}</h2>{" "}
          <button onClick={() => deleteSubject(selectedSubjectId)}>
            Delete this subject
          </button>{" "}
          <ul className="dsb-pending-list" style={{ marginTop: "14px" }}>
            {" "}
            {subjectTopics.map((t) => (
              <li key={t.id} className="dsb-admin-topic-row">
                {" "}
                <span>{t.title}</span>{" "}
                <button onClick={() => deleteTopic(t.id)}>Delete</button>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default AdminDashboard;