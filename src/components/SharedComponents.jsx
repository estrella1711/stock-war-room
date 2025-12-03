import React from 'react';
import { 
  RefreshCcw, 
  Gift, 
  Snowflake, 
  Carrot, 
  Rabbit 
} from 'lucide-react';

// --- Shared Components ---

export const InputGroup = ({ label, value, setValue, placeholder, theme = "blue", icon }) => {
  const themeStyles = {
    blue: "focus:ring-[var(--bx-pale-blue)] focus:border-[var(--bx-pale-blue)] bg-slate-50",
    red: "focus:ring-[var(--bx-red)] focus:border-[var(--bx-red)] bg-theme-red-light/30 text-theme-red placeholder-red-300 border-theme-red/30",
    // Change placeholder-green-500 to placeholder-[var(--bx-green)]/50
    green: "focus:ring-[var(--bx-green)] focus:border-[var(--bx-green)] bg-theme-green-light/30 text-theme-green placeholder-green-500 border-theme-green/30"
  };
  
  const inputClass = themeStyles[theme];

  // 一般輸入處理
  const handleInput = (e) => {
    const val = e.target.value;
    if (val.length > 15) return; 
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
          maxLength={15} 
          className={`w-full pl-9 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 text-xl font-bold transition-all shadow-sm ${inputClass} group-hover:shadow-md`}
        />
      </div>
    </div>
  );
};

export const EmptyState = ({ text, isXmasMode }) => (
  <div className="flex flex-col items-center justify-center h-56 text-slate-300">
    <div className="bg-slate-50 p-6 rounded-full mb-4 animate-pulse relative">
      <RefreshCcw size={32} className="text-slate-200" />
      {isXmasMode ? <div className="absolute -top-1 -right-1 text-theme-red opacity-50"><Gift size={16} /></div> : <div className="absolute -top-1 -right-1 text-orange-400 opacity-50"><Carrot size={16} /></div>}
    </div>
    <p className="text-sm font-medium tracking-wide flex items-center gap-2">
        {text} {isXmasMode ? <Snowflake size={14} className="animate-spin-slow opacity-50"/> : <Rabbit size={14} className="opacity-50"/>}
    </p>
  </div>
);