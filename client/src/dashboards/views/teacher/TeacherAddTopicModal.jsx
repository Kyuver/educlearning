import { useEffect, useRef, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { useSetData } from "../../../store/useData";
import { fetchSubjects, uploadImage } from "../../../lib/api";
import { useCreateData } from "../../../hooks/useMutations";
import { useShowModal } from "@store";

function TeacherAddTopicModal({ subjectId }) {
  const closeModal = useShowModal((s) => s.closeModal);
  const fileRef = useRef(null);
  const { data, setData } = useSetData();
  const [subjects, setSubjects] = useState([]);
  const createTopic = useCreateData(closeModal);

  useEffect(() => {
    fetchSubjects().then(setSubjects);
  }, []);

  const subject = subjects.find((s) => s.id === Number(subjectId));
  const subjectName = subject?.name ?? "Subject Name";

  // console.log(subjectId);
  // console.log(subject);
  // const { title, coverImage, content, status, ...others } = data

  // subbject: Number(subjectId)
  // title: title
  // coverImage: title
  // content: content
  // status: status
  const params = new URLSearchParams(window.location.search);
  const teacherId = params.get("id")

  console.log("here",teacherId)
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
                      .replace(/&/g, "&")
                      .replace(/</g, "<")
                      .replace(/>/g, ">")
                  : e.clipboardData.getData("text/plain");
                text = text.replace(/\n{3,}/g, "\n\n").trim();
                setData({ ...data, content: text });
              }}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => createTopic.mutate({
              table: "topic",
              data: {
                ...data, status: "PENDING",
                subjectId: Number(subjectId),
                teacherId: Number(teacherId)
              }
            })}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAddTopicModal;
