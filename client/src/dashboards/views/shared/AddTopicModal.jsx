import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X, ChevronDown, Check, ImagePlus } from "lucide-react";
import { useSetData } from "../../../store/useData";
import { fetchSubjects, uploadImage } from "../../../lib/api";
import { useCreateData } from "../../../hooks/useMutations";
import { useShowModal } from "@store";

function AddTopicModal() {
  const closeModal = useShowModal((s) => s.closeModal);
  const subjectId = useShowModal((s) => s.modalData);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const fileRef = useRef(null);
  const { data, setData } = useSetData();
  const [subjects, setSubjects] = useState([]);
  const [params] = useSearchParams();
  const role = params.get("role");
  const status = role === "ADMIN" ? "APPROVED" : "PENDING";
  const createTopic = useCreateData(closeModal);

  useEffect(() => {
    fetchSubjects().then(setSubjects);
  }, []);

  const subject = subjects.find((s) => s.id === subjectId);
  const subjectName = subject?.name ?? "Subject Name";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#ece7f5]">
          <div>
            <h3 className="font-semibold text-ink text-lg">Add a topic</h3>
            <p className="text-sm text-slate mt-1">in {subjectName}</p>
          </div>
          <button onClick={closeModal} className="text-slate hover:text-ink transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Title</label>
            <input
              type="text"
              placeholder="e.g. Fractions"
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none focus:border-violet"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Thumbnail</label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="w-20 h-16 rounded-lg border border-[#ece7f5] overflow-hidden flex items-center justify-center bg-paper shrink-0">
                {data.coverImage ? (
                  <img src={data.coverImage} alt="Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <ImagePlus size={20} className="text-slate" />
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const res = await uploadImage(file);
                    setData({ ...data, coverImage: `http://localhost:5001${res.data.url}` });
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="px-3 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer w-full"
                >
                  {data.coverImage ? "Change image" : "Upload image"}
                </button>
                <p className="text-xs text-slate/70 mt-1.5">PNG, JPG up to 5MB — used as the card cover.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Explanation</label>
            <textarea
              rows={4}
              value={data.content ?? ""}
              placeholder="Topic explanation shown to students..."
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none focus:border-violet"
              onChange={(e) => setData({ ...data, content: e.target.value })}
              onPaste={(e) => {
                e.preventDefault();
                const html = e.clipboardData.getData("text/html");
                let text = html
                  ? html
                      .replace(/<br\s*\/?>/gi, "\n")
                      .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
                      .replace(/<[^>]+>/g, "")
                      .replace(/&nbsp;/g, " ")
                      .replace(/&amp;/g, "&")
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">")
                  : e.clipboardData.getData("text/plain");
                text = text.replace(/\n{3,}/g, "\n\n").trim();
                setData({ ...data, content: text });
              }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Assign to teacher</label>
            <div className="relative mt-1.5">
              <button
                type="button"
                onClick={() => setTeacherOpen(!teacherOpen)}
                className="w-full flex items-center justify-between gap-2 border border-[#ece7f5] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-violet cursor-pointer"
              >
                <span className="text-slate">No teacher assigned</span>
                <ChevronDown size={16} className="text-slate" />
              </button>
              {teacherOpen && (
              <div className="absolute z-10 top-full mt-2 w-full bg-white border border-[#ece7f5] rounded-lg shadow-lg shadow-[#2a2049]/10 max-h-40 overflow-y-auto">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate hover:bg-[#faf8ff] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-[#ece7f5] flex items-center justify-center text-[10px] text-slate">—</span>
                    No teacher
                  </span>
                  <Check size={15} className="text-violet" />
                </button>
                <div className="border-t border-[#ece7f5]" />
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-ink hover:bg-[#faf8ff] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/80?img=32" alt="Teacher" className="w-5 h-5 rounded-full object-cover" />
                    Teacher Name
                  </span>
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => createTopic.mutate({ table: "topic", data: { ...data, status, subjectId } })}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTopicModal;
