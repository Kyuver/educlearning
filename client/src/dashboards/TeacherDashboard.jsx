import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import {
  subjects,
  topics as initialTopics,
  teacherProfile,
  sections,
} from "../data/mockData";
import "./Dashboard.css";
function TeacherDashboard() {
  const [view, setView] = useState("none");
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const mySubjects = subjects.filter((s) =>
    teacherProfile.subjectIds.includes(s.id),
  );
  const mySection = sections.find((sec) => sec.id === teacherProfile.sectionId);
  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = mySubjects.find((s) => s.id === selectedSubjectId);
  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId(id);
  }
  function startEdit(topic) {
    setEditingTopicId(topic.id);
    setDraftContent(topic.content);
  }
  function saveEdit(topicId) {
    setTopicsList(
      topicsList.map((t) =>
        t.id === topicId ? { ...t, content: draftContent } : t,
      ),
    );
    setEditingTopicId(null);
  }
  const topItem = (
    <>
      {" "}
      <div className="dsb-nav-item" onClick={() => setView("subjects")}>
        {" "}
        <span>🏠</span> Teacher Dashboard{" "}
      </div>{" "}
      <div className="dsb-nav-item" onClick={() => setView("profile")}>
        {" "}
        <span>👤</span> Profile{" "}
      </div>{" "}
      <Link to="/" className="dsb-nav-item" style={{ textDecoration: "none" }}>
        {" "}
        <span>🚪</span> Logout{" "}
      </Link>{" "}
    </>
  );
  return (
    <DashboardLayout
      subjects={mySubjects}
      selectedSubjectId={selectedSubjectId}
      onSelectSubject={handleSelectSubject}
      topItem={topItem}
    >
      {" "}
      {view === "none" && (
        <p>Click "Teacher Dashboard" in the sidebar to get started.</p>
      )}{" "}
      {view === "profile" && (
        <div>
          {" "}
          <h1>Profile</h1>{" "}
          <div className="dsb-profile-card">
            {" "}
            <div className="dsb-profile-avatar">T</div>{" "}
            <p>
              <strong>{teacherProfile.name}</strong>
            </p>{" "}
            <p>Role: Teacher</p> <p>Section: {mySection.name}</p>{" "}
            <p>
              Subjects handled: {mySubjects.map((s) => s.name).join(", ")}
            </p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {view === "subjects" && (
        <div>
          {" "}
          <h1>Teacher dashboard</h1> <p>Section: {mySection.name}</p>{" "}
          {!selectedSubjectId && (
            <p>Select one of your assigned subjects from the sidebar.</p>
          )}{" "}
          {selectedSubjectId && (
            <div>
              {" "}
              <h2>{selectedSubject.name} topics</h2>{" "}
              <ul className="dsb-topic-list">
                {" "}
                {subjectTopics.map((t) => (
                  <li key={t.id}>
                    {" "}
                    <div className="dsb-topic-row">
                      {" "}
                      <strong>{t.title}</strong>{" "}
                      <button onClick={() => startEdit(t)}>Edit</button>{" "}
                    </div>{" "}
                    {editingTopicId === t.id && (
                      <div className="dsb-edit-box">
                        {" "}
                        <textarea
                          value={draftContent}
                          onChange={(e) => setDraftContent(e.target.value)}
                        />{" "}
                        <button onClick={() => saveEdit(t.id)}>
                          Save
                        </button>{" "}
                      </div>
                    )}{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default TeacherDashboard;