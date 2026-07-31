import { useState } from "react";
import { Plus, X, Trash2, ArrowLeft, BookOpen, Brain, FlaskConical, Globe, Music, Wrench } from "lucide-react";

const iconMap = { 1: BookOpen, 2: Brain, 3: FlaskConical, 4: Globe, 5: Music, 6: Wrench };
const gradMap = {
  1: "from-blue-600 to-blue-400", 2: "from-rose-600 to-rose-400",
  3: "from-emerald-600 to-emerald-400", 4: "from-orange-600 to-orange-400",
  5: "from-purple-600 to-purple-400", 6: "from-cyan-600 to-cyan-400",
};

let nextId = 100;

function AddQuizModal({ subjects, topics, onClose }) {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState("subjects");
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const subjectTopics = activeSubject ? topics.filter((t) => t.subjectId === activeSubject) : [];
  const quizList = quizzes.filter((q) => q.topicId === activeTopic?.id);

  function addQuiz() {
    if (!newTitle.trim() || !activeTopic) return;
    setQuizzes([...quizzes, { id: nextId++, topicId: activeTopic.id, title: newTitle.trim(), questions: [] }]);
    setNewTitle("");
  }

  function deleteQuiz(id) {
    setQuizzes(quizzes.filter((q) => q.id !== id));
  }

  function addQuestion(quizId, question) {
    setQuizzes(quizzes.map((q) =>
      q.id === quizId ? { ...q, questions: [...q.questions, { id: nextId++, ...question }] } : q,
    ));
  }

  function deleteQuestion(quizId, questionId) {
    setQuizzes(quizzes.map((q) =>
      q.id === quizId ? { ...q, questions: q.questions.filter((x) => x.id !== questionId) } : q,
    ));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-xl flex flex-col" style={{ height: "80vh" }}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#ece7f5] shrink-0">
          <div className="flex items-center gap-3">
            {page !== "subjects" && (
              <button onClick={() => {
                if (page === "quizzes") { setPage("topics"); setActiveTopic(null); }
                else { setPage("subjects"); setActiveSubject(null); }
              }} className="text-slate hover:text-ink cursor-pointer"><ArrowLeft size={20} /></button>
            )}
            <h3 className="text-lg font-semibold text-ink">
              {page === "subjects" ? "Select a subject" :
               page === "topics" ? subjects.find((s) => s.id === activeSubject)?.name + " — Topics" :
               activeTopic?.title + " — Quizzes"}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate hover:text-ink cursor-pointer"><X size={22} /></button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {page === "subjects" && (
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((s) => {
                const Icon = iconMap[s.id];
                return (
                  <div key={s.id} onClick={() => { setActiveSubject(s.id); setPage("topics"); }} className="flex items-center gap-4 p-5 rounded-xl border border-[#ece7f5] hover:bg-paper cursor-pointer transition-colors">
                    <div className={"w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white shrink-0 " + gradMap[s.id]}>
                      {Icon && <Icon size={22} />}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-ink">{s.name}</p>
                      <p className="text-sm text-slate mt-0.5">{topics.filter((t) => t.subjectId === s.id).length} topics</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {page === "topics" && (
            <div className="flex flex-col gap-3">
              {subjectTopics.map((t) => (
                <div key={t.id} onClick={() => { setActiveTopic(t); setPage("quizzes"); }} className="flex items-center justify-between p-4 rounded-xl border border-[#ece7f5] hover:bg-paper cursor-pointer transition-colors">
                  <p className="text-base font-medium text-ink">{t.title}</p>
                  <p className="text-sm text-slate">{quizzes.filter((q) => q.topicId === t.id).length} quizzes</p>
                </div>
              ))}
            </div>
          )}

          {page === "quizzes" && (
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 border border-[#ece7f5] rounded-xl px-4 py-3 text-sm outline-none"
                  placeholder="Enter quiz title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={addQuiz} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet text-white text-sm font-semibold hover:opacity-90 cursor-pointer shrink-0">
                  <Plus size={18} /> Add Quiz
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {quizList.length === 0 && (
                  <p className="text-sm text-slate text-center py-10">No quizzes yet. Type a title and click Add Quiz.</p>
                )}

                {quizList.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onDelete={() => deleteQuiz(quiz.id)}
                    onAddQuestion={(q) => addQuestion(quiz.id, q)}
                    onDeleteQuestion={(qId) => deleteQuestion(quiz.id, qId)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizCard({ quiz, onDelete, onAddQuestion, onDeleteQuestion }) {
  const [adding, setAdding] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const [qText, setQText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIdx, setCorrectIdx] = useState(0);

  function saveQuestion() {
    if (!qText.trim() || choices.some((c) => !c.trim())) return;
    onAddQuestion({ text: qText.trim(), choices: [...choices], correctIndex: correctIdx });
    setQText("");
    setChoices(["", "", "", ""]);
    setCorrectIdx(0);
    setAdding(false);
  }

  return (
    <div className="border border-[#ece7f5] rounded-xl overflow-hidden">
      {/* Quiz header */}
      <div className="flex items-center justify-between px-5 py-4 bg-paper/50">
        <div>
          <p className="text-base font-semibold text-ink">{quiz.title}</p>
          <p className="text-sm text-slate mt-0.5">{quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAdding(!adding)} className="px-4 py-2 rounded-lg text-sm font-semibold border border-violet text-violet hover:bg-violet hover:text-white transition-colors cursor-pointer">
            <Plus size={16} /> {adding ? "Close" : "Add Question"}
          </button>
          <button onClick={() => setConfirmDel(true)} className="p-2 rounded-lg border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Add question form */}
      {adding && (
        <div className="px-5 py-4 border-t border-[#ece7f5] space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Question</label>
            <textarea
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
              rows={2} placeholder="e.g. What is 1/2 + 1/4?"
              value={qText} onChange={(e) => setQText(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Choices</label>
            <p className="text-xs text-slate mt-0.5 mb-3">Select the radio of the correct answer.</p>
            {choices.map((c, i) => (
              <div key={i} className="flex items-center gap-3 border border-[#ece7f5] rounded-lg px-4 py-3 mb-2">
                <input type="radio" name="correctChoice" checked={correctIdx === i} onChange={() => setCorrectIdx(i)} className="accent-violet shrink-0" />
                <input type="text" className="flex-1 text-sm outline-none" placeholder={`Choice ${i + 1}`} value={c} onChange={(e) => { const n = [...choices]; n[i] = e.target.value; setChoices(n); }} />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">Cancel</button>
            <button onClick={saveQuestion} className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer">Save Question</button>
          </div>
        </div>
      )}

      {/* Questions list */}
      {quiz.questions.length > 0 && (
        <div className="border-t border-[#ece7f5] divide-y divide-[#ece7f5]">
          {quiz.questions.map((q, i) => (
            <div key={q.id} className="px-5 py-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{i + 1}. {q.text}</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {q.choices.map((c, ci) => (
                    <span key={ci} className={`text-xs px-2.5 py-1 rounded-md border ${ci === q.correctIndex ? "border-green-400 bg-green-50 text-green-700 font-semibold" : "border-[#ece7f5] text-slate"}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => onDeleteQuestion(q.id)} className="p-1 rounded text-slate hover:text-red-500 cursor-pointer shrink-0 mt-0.5"><X size={14} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Confirm delete quiz */}
      {confirmDel && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl">
            <div className="px-6 py-5">
              <h3 className="font-semibold text-ink text-base">Delete quiz</h3>
              <p className="text-sm text-slate mt-2">Delete <span className="font-medium text-ink">{quiz.title}</span>?</p>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
              <button className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer" onClick={() => setConfirmDel(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 cursor-pointer" onClick={() => { onDelete(); setConfirmDel(false); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddQuizModal;
