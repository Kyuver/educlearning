function StudentSubjectTopicsView() {
  return (
    <div>
      <h1 className="font-sora font-semibold text-2xl text-ink mb-4">Subject Topics</h1>
      <div className="grid grid-cols-4 gap-4">
        <p className="text-sm text-slate col-span-4 py-10 text-center">
          No approved topics yet for this subject.
        </p>
      </div>
    </div>
  );
}

export default StudentSubjectTopicsView;
