
// --- 元件: Tab 按鈕 ---

export const TabButton = ({ isActive, onClick, icon, label, isXmasMode }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-bold flex flex-col items-center gap-1.5 transition-all duration-300 relative group ${
      isActive 
        ? 'text-theme-red' // 選取時：紅色
        : 'text-slate-400 hover:text-theme-deep' // 未選取：灰色
    }`}
  >
    {/* 底部指示器：根據模式切換 (糖果條紋 vs 單色) */}
    {isActive && (
      <div className={`absolute bottom-0 left-0 w-full h-[4px] rounded-t-full transition-all duration-300 ${isXmasMode ? 'tab-indicator-candy' : 'tab-indicator-simple'}`} />
    )}
    <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-110'}`}>{icon}</span>
    {label}
  </button>
);

export default TabButton