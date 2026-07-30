import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { subjects, topics, quizzes } from "../data/mockData";
import "./Dashboard.css";
function StudentDashboard() {
  const [view, setView] = useState("subjects");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const subjectTopics = topics.filter((t) => t.subjectId === selectedSubjectId);
  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const topicQuiz = quizzes.filter((q) => q.topicId === selectedTopicId);
  function handleSelectSubject(id) {
    setView("subjects");
    setSelectedSubjectId(id);
    setSelectedTopicId(null);
    setTakingQuiz(false);
    setScore(null);
  }
  function selectAnswer(quizId, choice) {
    setAnswers({ ...answers, [quizId]: choice });
  }
  function submitQuiz() {
    let correct = 0;
    topicQuiz.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct += 1;
    });
    setScore({ correct, total: topicQuiz.length });
  }
  const topItem = (
    <>
      {" "}
      <div
        className={`dsb-nav-item${view === "profile" ? " active" : ""}`}
        onClick={() => setView("profile")}
      >
        {" "}
        <span>👤</span> Profile{" "}
      </div>{" "}
      <div
        className={`dsb-nav-item${view === "subjects" && !selectedSubjectId ? " active" : ""}`}
        onClick={() => setView("subjects")}
      >
        {" "}
        <span>🏠</span> Student Dashboard{" "}
      </div>{" "}
    </>
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
          <div className="dsb-profile-wrap">
            {" "}
            <div className="dsb-profile-bg"></div>{" "}
            <div className="dsb-profile-content">
              {" "}
              <div className="dsb-profile-avatar-wrap">
                {" "}
                <div className="dsb-profile-avatar-circle">S</div>{" "}
                <div
                  className="dsb-profile-edit-badge"
                  title="Change profile pic"
                >
                  ✎
                </div>{" "}
              </div>{" "}
              <div className="dsb-profile-bodycard">
                {" "}
                <h2>Demo Student</h2>{" "}
                <div className="dsb-profile-row">
                  School: KlikAral Demo School
                </div>{" "}
                <div className="dsb-profile-row">
                  Section: Grade 7 - St. Peter
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
          {selectedTopic && !takingQuiz && (
            <div>
              {" "}
              <button onClick={() => setSelectedTopicId(null)}>
                &larr; Back to topics
              </button>{" "}
              <h2>{selectedTopic.title}</h2> <p>{selectedTopic.content}</p>{" "}
              {topicQuiz.length > 0 && (
                <button
                  style={{ marginTop: "16px" }}
                  onClick={() => {
                    setTakingQuiz(true);
                    setScore(null);
                    setAnswers({});
                  }}
                >
                  Take quiz
                </button>
              )}{" "}
            </div>
          )}{" "}
          {takingQuiz && score === null && (
            <div>
              {" "}
              <h2>{selectedTopic.title} quiz</h2>{" "}
              {topicQuiz.map((q) => (
                <div key={q.id} style={{ marginBottom: "18px" }}>
                  {" "}
                  <p>
                    <strong>{q.question}</strong>
                  </p>{" "}
                  {q.choices.map((choice) => (
                    <label
                      key={choice}
                      style={{ display: "block", marginBottom: "4px" }}
                    >
                      {" "}
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === choice}
                        onChange={() => selectAnswer(q.id, choice)}
                      />{" "}
                      {choice}{" "}
                    </label>
                  ))}{" "}
                </div>
              ))}{" "}
              <button onClick={submitQuiz}>Submit quiz</button>{" "}
            </div>
          )}{" "}
          {takingQuiz && score !== null && (
            <div>
              {" "}
              <h2>Quiz result</h2>{" "}
              <p>
                You scored {score.correct} out of {score.total}.
              </p>{" "}
              <button onClick={() => setTakingQuiz(false)}>
                Back to lesson
              </button>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </DashboardLayout>
  );
}
export default StudentDashboard;