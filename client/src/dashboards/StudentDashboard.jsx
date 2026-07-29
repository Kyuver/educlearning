import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { subjects, topics } from "../data/mockData";
import "./Dashboard.css";
function StudentDashboard() {
  const [view, setView] = useState("subjects");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const subjectTopics = topics.filter((t) => t.subjectId === selectedSubjectId);
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId(id);
    setSelectedTopicId(null);
  }
  const topItem = (
    <div className="dsb-nav-item" onClick={() => setView("profile")}>
      {" "}
      <span>👤</span> Profile{" "}
    </div>
  );
  return (
    <DashboardLayout
      subjects={subjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
    >
      {" "}
      {view === "profile" && (
        <div>
          {" "}
          <h1>Profile</h1>{" "}
          <div className="dsb-profile-card">
            {" "}
            <div className="dsb-profile-avatar">S</div>{" "}
            <p>
              <strong>Demo Student</strong>
            </p>{" "}
            <p>Role: Student</p> <p>Section: Demo Section</p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {view === "subjects" && (
        <div>
          {" "}
          <h1>Student dashboard</h1>{" "}
          {!selectedSubjectId && (
            <p>Select a subject from the sidebar to view its lessons.</p>
          )}{" "}
          {selectedSubjectId && !selectedTopicId && (
            <div>
              {" "}
              <h2>{selectedSubject.name} topics</h2>{" "}
              <ul className="dsb-topic-list">
                {" "}
                {subjectTopics.map((t) => (
                  <li key={t.id} onClick={() => setSelectedTopicId(t.id)}>
                    {t.title}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>
          )}{" "}
          {selectedTopic && (
            <div>
              {" "}
              <button onClick={() => setSelectedTopicId(null)}>
                &larr; Back to topics
              </button>{" "}
              <h2>{selectedTopic.title}</h2> <p>{selectedTopic.content}</p>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default StudentDashboard;