function SubjectCard({ name }) {
  return (
    <div className="subject-card">
      {" "}
      <div className="subject-icon"></div>{" "}
      <div className="subject-info">
        {" "}
        <p className="subject-name">{name}</p>{" "}
        <div className="progress-bar"></div>{" "}
        <span className="more-details">more details →</span>{" "}
      </div>{" "}
    </div>
  );
}
export default SubjectCard;
