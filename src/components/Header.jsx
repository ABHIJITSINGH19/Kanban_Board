import { Menu, User } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="h-20 sm:h-22 bg-white border-b border-b-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-lg">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 ml-auto">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-black shadow-md bg-black flex items-center justify-center text-white shrink-0">
          <User size={16} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    </header>
  );
}
