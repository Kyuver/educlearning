import { School, ClipboardList } from "lucide-react";

function StudentProfileView() {
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
          <div className="h-46 w-full bg-violet shrink-0 relative">
            <div className="absolute left-8 bottom-0 translate-y-1/2 w-36 h-36 rounded-full bg-violet text-white flex items-center justify-center font-bold text-5xl border-4 border-white shrink-0">
              S
            </div>
          </div>
          <div className="px-8 pb-6 pt-20 flex-1 flex flex-col">
            <div>
              <h2 className="font-sora font-semibold text-2xl text-ink">Student Name</h2>
              <p className="text-sm text-slate mt-1">Section · Student</p>
            </div>
            <div className="mt-6 flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0">
                  <School size={18} />
                </span>
                <div>
                  <p className="text-xs text-slate">School</p>
                  <p className="text-sm font-medium text-ink">KlikAral Demo School</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] bg-paper">
                <span className="w-9 h-9 rounded-full bg-violet/10 text-violet flex items-center justify-center shrink-0">
                  <ClipboardList size={18} />
                </span>
                <div>
                  <p className="text-xs text-slate">Section</p>
                  <p className="text-sm font-medium text-ink">Section Name</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-md overflow-hidden border border-[#ece7f5] flex flex-col">
          <div className="px-6 py-4 border-b border-[#ece7f5]">
            <h3 className="font-sora font-semibold text-base text-ink">My subjects</h3>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#ece7f5] hover:bg-paper transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shrink-0">
                <School size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">Subject Name</p>
                <p className="text-xs text-slate mt-0.5">Topics available: 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileView;
