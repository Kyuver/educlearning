import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import {
  subjects,
  topics as initialTopics,
  quizzes as initialQuizzes,
  teacherProfile,
  sections,
} from "../data/mockData";
import "./Dashboard.css";
function TeacherDashboard() {
  const [view, setView] = useState("subjects");
  const [topicsList, setTopicsList] = useState(initialTopics);
  const [quizzesList, setQuizzesList] = useState(initialQuizzes);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [draftContent, setDraftContent] = useState("");
  const [draftLessonPlan, setDraftLessonPlan] = useState("");
  const [quizTopicId, setQuizTopicId] = useState(null);
  const [qQuestion, setQQuestion] = useState("");
  const [qChoices, setQChoices] = useState(["", "", "", ""]);
  const [qCorrect, setQCorrect] = useState(0);
  const mySubjects = subjects.filter((s) =>
    teacherProfile.subjectIds.includes(s.id),
  );
  const mySection = sections.find((sec) => sec.id === teacherProfile.sectionId);
  const subjectTopics = topicsList.filter(
    (t) => t.subjectId === selectedSubjectId,
  );
  const selectedSubject = mySubjects.find((s) => s.id === selectedSubjectId);
  function resetToHome() {
    setView("subjects");
    setSelectedSubjectId(null);
    setEditingTopicId(null);
    setQuizTopicId(null);
  }
  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId(id);
    setEditingTopicId(null);
    setQuizTopicId(null);
  }
  function startEdit(topic) {
    setEditingTopicId(topic.id);
    setDraftContent(topic.content);
    setDraftLessonPlan(topic.lessonPlan || "");
    setQuizTopicId(null);
  }
  function saveEdit(topicId) {
    setTopicsList(
      topicsList.map((t) =>
        t.id === topicId
          ? { ...t, content: draftContent, lessonPlan: draftLessonPlan }
          : t,
      ),
    );
    setEditingTopicId(null);
  }
  function startQuizForm(topicId) {
    setQuizTopicId(topicId);
    setEditingTopicId(null);
    setQQuestion("");
    setQChoices(["", "", "", ""]);
    setQCorrect(0);
  }
  function updateChoice(index, value) {
    const updated = [...qChoices];
    updated[index] = value;
    setQChoices(updated);
  }
  function addQuizQuestion() {
    if (!qQuestion.trim() || qChoices.some((c) => !c.trim())) return;
    const newId = quizzesList.length
      ? Math.max(...quizzesList.map((q) => q.id)) + 1
      : 1;
    setQuizzesList([
      ...quizzesList,
      {
        id: newId,
        topicId: quizTopicId,
        question: qQuestion,
        choices: qChoices,
        correctAnswer: qChoices[qCorrect],
      },
    ]);
    setQQuestion("");
    setQChoices(["", "", "", ""]);
    setQCorrect(0);
  }
  const topItem = (
    <>
      {" "}
      <div
        className={`dsb-nav-item${view === "profile" ? " active" : ""}`}
        onClick={() => setView("profile")}
      >
        {" "}
        <span></span> Profile{" "}
      </div>{" "}
      <div
        className={`dsb-nav-item${view === "subjects" && !selectedSubjectId ? " active" : ""}`}
        onClick={resetToHome}
      >
        {" "}
        <span></span> Teacher Dashboard{" "}
      </div>{" "}
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
      {view === "profile" && (
        <div>
          {" "}
          <h1>Profile</h1>{" "}
          <div className="dsb-profile-wrap">
            {" "}
            <div className="dsb-profile-bg"></div>{" "}
            <div className="dsb-profile-content">
              {" "}
              <div className="dsb-profile-avatar-wrap">
                {" "}
                <div className="dsb-profile-avatar-circle">T</div>{" "}
                <div
                  className="dsb-profile-edit-badge"
                  title="Change profile pic"
                >
                  ✎
                </div>{" "}
              </div>{" "}
              <div className="dsb-profile-bodycard">
                {" "}
                <h2>{teacherProfile.name}</h2>{" "}
                <div className="dsb-profile-row">Section: {mySection.name}</div>{" "}
                <div className="dsb-profile-row">
                  Subjects: {mySubjects.map((s) => s.name).join(", ")}
                </div>{" "}
                <Link to="/" className="dsb-profile-logout">
                  Logout
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {view === "subjects" && (
        <div>
          {" "}
          {!selectedSubjectId && (
            <>
              {" "}
              <h1>Teacher dashboard</h1> <p>Section: {mySection.name}</p>{" "}
              <p>Select one of your assigned subjects from the sidebar.</p>{" "}
            </>
          )}{" "}
          {selectedSubjectId && (
            <div>
              {" "}
              <h1>{selectedSubject.name} Topics</h1>{" "}
              <div className="dsb-topic-card-grid">
                {" "}
                {subjectTopics.map((t, i) => (
                  <div key={t.id} className="dsb-topic-card">
                    {" "}
                    <div className={`dsb-topic-thumb grad-${i % 3}`}>
                      {" "}
                      <BookOpen size={30} />{" "}
                    </div>{" "}
                    <div className="dsb-topic-card-body">
                      {" "}
                      <h4>{t.title}</h4>{" "}
                      <div className="dsb-topic-card-meta">
                        {selectedSubject.name} — {mySection.name}
                      </div>{" "}
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        {" "}
                        <button onClick={() => startEdit(t)}>Edit</button>{" "}
                        <button onClick={() => startQuizForm(t.id)}>
                          Quizzes
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              {editingTopicId && (
                <div
                  className="dsb-edit-box"
                  style={{ marginTop: "20px", maxWidth: "480px" }}
                >
                  {" "}
                  <h3>Edit topic</h3> <label>Description</label>{" "}
                  <textarea
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                  />{" "}
                  <label>Lesson plan</label>{" "}
                  <textarea
                    style={{ minHeight: "140px" }}
                    value={draftLessonPlan}
                    onChange={(e) => setDraftLessonPlan(e.target.value)}
                    placeholder="Objectives, materials, activities, assessment..."
                  />{" "}
                  <button onClick={() => saveEdit(editingTopicId)}>
                    Save
                  </button>{" "}
                </div>
              )}{" "}
              {quizTopicId && (
                <div className="dsb-quiz-form">
                  {" "}
                  <h3>Add quiz question</h3>{" "}
                  <input
                    type="text"
                    placeholder="Question"
                    value={qQuestion}
                    onChange={(e) => setQQuestion(e.target.value)}
                  />{" "}
                  {qChoices.map((c, i) => (
                    <div key={i} className="dsb-quiz-choice-row">
                      {" "}
                      <input
                        type="radio"
                        name="correct"
                        checked={qCorrect === i}
                        onChange={() => setQCorrect(i)}
                      />{" "}
                      <input
                        type="text"
                        placeholder={`Choice ${i + 1}`}
                        value={c}
                        onChange={(e) => updateChoice(i, e.target.value)}
                      />{" "}
                    </div>
                  ))}{" "}
                  <button onClick={addQuizQuestion}>Add question</button>{" "}
                  <h4 style={{ marginTop: "14px" }}>Existing questions</h4>{" "}
                  <ul className="dsb-quiz-list">
                    {" "}
                    {quizzesList
                      .filter((q) => q.topicId === quizTopicId)
                      .map((q) => (
                        <li key={q.id}>{q.question}</li>
                      ))}{" "}
                  </ul>{" "}
                </div>
              )}{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default TeacherDashboard;