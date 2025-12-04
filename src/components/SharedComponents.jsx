import React from 'react';
import { 
  TreePine, 
  Gift, 
  Snowflake, 
  Carrot, 
  Rabbit,
  Sprout 
} from 'lucide-react';

// --- Shared Components ---

export const InputGroup = ({ label, value, setValue, placeholder, theme = "blue", icon }) => {
  const themeStyles = {
    blue: "focus:ring-[var(--bx-pale-blue)] focus:border-[var(--bx-pale-blue)] bg-slate-50",
    red: "focus:ring-[var(--bx-red)] focus:border-[var(--bx-red)] bg-theme-red-light/30 text-theme-red placeholder-red-300 border-theme-red/30",
    green: "focus:ring-[var(--bx-green)] focus:border-[var(--bx-green)] bg-theme-green-light/30 text-theme-green placeholder-green-500 border-theme-green/30"
  };
  
  const inputClass = themeStyles[theme];

  // 一般輸入處理
  const handleInput = (e) => {
    const val = e.target.value;
    if (val.length > 12) return; 
    if (parseFloat(val) < 0) return;
    setValue(val);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 mb-1.5 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative group">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-sans transition-colors ${
           theme === 'red' ? 'text-theme-red/50' : theme === 'green' ? 'text-theme-green/70' : 'text-slate-400 group-hover:text-theme-pale'
        }`}>$</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          maxLength={12} 
          className={`w-full pl-9 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 text-xl font-bold transition-all shadow-sm ${inputClass} group-hover:shadow-md`}
        />
      </div>
    </div>
  );
};

export const EmptyState = ({ text, isXmasMode }) => (
  <div className="flex flex-col items-center justify-center h-56 text-theme-deep">
    <div className="bg-slate-50 p-6 rounded-full mb-4 animate-pulse relative">
       {/* 主要圖示：聖誕模式顯示深綠色松樹，普通模式顯示灰色兔子 */}
      {isXmasMode ? (
        <TreePine size={32} className="text-emerald-700" />
      ) : (
        <Rabbit size={32} className="text-slate-500" />
      )}
      
      {isXmasMode ? <div className="absolute -top-3 -right-3 text-theme-red opacity-50"><Gift size={20} /></div> : <div className="absolute -top-1 -right-1 text-orange-700 opacity-50"><Carrot size={16} /></div>}
    </div>
    <p className="text-sm font-medium tracking-wide flex items-center gap-2">
        {text} {isXmasMode ? <Snowflake size={20} className="animate-spin-slow text-theme-pale opacity-50"/> : <Sprout size={20} className="text-theme-pale opacity-50"/>}
    </p>
  </div>
);