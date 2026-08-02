import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { useSetData } from "../../../store/useData";
import { uploadImage } from "../../../lib/api";
import { useShowModal } from "@/store/showModal";

function TeacherEditTopicModal() {
  const { closeModal } = useShowModal()

  const fileRef = useRef(null);
  const { data, setData } = useSetData()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="px-6 py-4 border-b border-[#ece7f5]">
          <h3 className="font-semibold text-ink">Edit topic</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Title</label>
            <input
              type="text"
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm outline-none"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate uppercase tracking-wide">Picture</label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="w-20 h-16 rounded-lg border border-[#ece7f5] overflow-hidden flex items-center justify-center bg-paper shrink-0">
                {data.coverImage ? (
                  <img src={data.coverImage} alt="Picture" className="w-full h-full object-cover" />
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
              className="mt-1.5 w-full border border-[#ece7f5] rounded-lg px-4 py-3 text-sm resize-none outline-none"
              rows={4}
              value={data.content ?? ""}
              placeholder="Topic explanation shown to students..."
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
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#ece7f5]">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet text-white hover:opacity-90 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherEditTopicModal;
