import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

function ImagePicker({ value, onChange, label = "Picture" }) {
  const inputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div>
      <label className="text-xs font-semibold text-slate uppercase tracking-wide">{label}</label>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="w-20 h-16 rounded-lg border border-[#ece7f5] overflow-hidden flex items-center justify-center bg-paper shrink-0">
          {value ? (
            <img src={value} alt="Cover preview" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={20} className="text-slate" />
          )}
        </div>
        <div className="flex-1">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-2 rounded-lg text-sm font-semibold border border-[#ece7f5] text-slate hover:bg-paper cursor-pointer w-full"
            >
              {value ? "Change image" : "Upload image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-slate hover:text-red-500 transition-colors cursor-pointer"
                title="Remove image"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <p className="text-xs text-slate/70 mt-1.5">PNG, JPG up to 5MB — used as the card cover.</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePicker;
