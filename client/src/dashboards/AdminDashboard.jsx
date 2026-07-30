import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import {
  subjects as initialSubjects,
  topics as initialTopics,
  pendingItems as initialPending,
  incidents as initialIncidents,
} from "../data/mockData";
import "./Dashboard.css";
function AdminDashboard() {
  const [view, setView] = useState("none");
  const [subjectsList, setSubjectsList] = useState(initialSubjects);
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [pending, setPending] = useState(initialPending);
  const [incidentsList, setIncidentsList] = useState(initialIncidents);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = subjectsList.find((s) => s.id === selectedSubjectId);
  function handleSelectSubject(id) {
    setView("dashboard");
    setSelectedSubjectId(id);
  }
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
  function addSubject() {
    if (!newSubjectName.trim()) return;
    const newId = Math.max(...subjectsList.map((s) => s.id)) + 1;
    setSubjectsList([...subjectsList, { id: newId, name: newSubjectName }]);
    setNewSubjectName("");
  }
  function addTopic() {
    if (!newTopicTitle.trim() || !selectedSubjectId) return;
    const newId = topicsList.length
      ? Math.max(...topicsList.map((t) => t.id)) + 1
      : 1;
    setTopicsList([
      ...topicsList,
      {
        id: newId,
        subjectId: selectedSubjectId,
        title: newTopicTitle,
        content: "Lesson content coming soon.",
      },
    ]);
    setNewTopicTitle("");
  }
  function resolveIncident(id) {
    setIncidentsList(incidentsList.filter((i) => i.id !== id));
  }
  const topItem = (
    <div className="dsb-nav-item" onClick={() => setView("dashboard")}>
      {" "}
      <span>🛠️</span> Admin Dashboard{" "}
    </div>
  );
  return (
    <DashboardLayout
      subjects={subjectsList}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
    >
      {" "}
      {view === "none" && (
        <p>Click "Admin Dashboard" in the sidebar to get started.</p>
      )}{" "}
      {view === "dashboard" && (
        <div>
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
          <h2 style={{ marginTop: "32px" }}>Reported incidents</h2>{" "}
          {incidentsList.length === 0 && <p>No open incidents.</p>}{" "}
          <ul className="dsb-pending-list">
            {" "}
            {incidentsList.map((i) => (
              <li key={i.id} className="dsb-pending-row">
                {" "}
                <span>
                  {i.type} — {i.description} (reported by {i.reportedBy})
                </span>{" "}
                <div>
                  {" "}
                  <button onClick={() => resolveIncident(i.id)}>
                    Resolve
                  </button>{" "}
                </div>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
          <h2 style={{ marginTop: "32px" }}>Add a subject</h2>{" "}
          <div className="dsb-add-subject">
            {" "}
            <input
              type="text"
              placeholder="New subject name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
            />{" "}
            <button onClick={addSubject}>Add subject</button>{" "}
          </div>{" "}
          {selectedSubjectId && (
            <div style={{ marginTop: "20px" }}>
              {" "}
              <h2>{selectedSubject.name}</h2>{" "}
              <button onClick={() => deleteSubject(selectedSubjectId)}>
                Delete this subject
              </button>{" "}
              <div className="dsb-add-topic">
                {" "}
                <input
                  type="text"
                  placeholder="New topic title"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                />{" "}
                <button onClick={addTopic}>Add topic</button>{" "}
              </div>{" "}
              <ul className="dsb-pending-list" style={{ marginTop: "14px" }}>
                {" "}
                {subjectTopics.map((t) => (
                  <li key={t.id} className="dsb-admin-topic-row">
                    {" "}
                    <span>{t.title}</span>{" "}
                    <button onClick={() => deleteTopic(t.id)}>
                      Delete
                    </button>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
      <Link to="/" className="dsb-logout-fixed">
        Logout
      </Link>{" "}
    </DashboardLayout>
  );
}
export default AdminDashboard;