import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  subjects as initialSubjects,
  topics as initialTopics,
} from "../data/mockData";
import "./Dashboard.css";
function TeacherDashboard() {
  const [view, setView] = useState("subjects");
  const [subjectsList, setSubjectsList] = useState(initialSubjects);
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = subjectsList.find((s) => s.id === selectedSubjectId);
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
  const topItem = (
    <div className="dsb-nav-item" onClick={() => setView("profile")}>
      {" "}
      <span>👤</span> Profile{" "}
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
      {view === "profile" && (
        <div>
          {" "}
          <h1>Profile</h1>{" "}
          <div className="dsb-profile-card">
            {" "}
            <div className="dsb-profile-avatar">T</div>{" "}
            <p>
              <strong>Demo Teacher</strong>
            </p>{" "}
            <p>Role: Teacher</p>{" "}
            <p>Subjects handled: {subjectsList.length}</p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {view === "subjects" && (
        <div>
          {" "}
          <h1>Teacher dashboard</h1>{" "}
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
          {!selectedSubjectId && (
            <p>Select a subject from the sidebar to manage its lessons.</p>
          )}{" "}
          {selectedSubjectId && (
            <div>
              {" "}
              <h2>{selectedSubject.name} topics</h2>{" "}
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