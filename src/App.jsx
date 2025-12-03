import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCcw, 
  PieChart,
  Target,
  Wallet
} from 'lucide-react';

const App = () => {
  // Tab State: 'risk' | 'position' | 'quick'
  const [activeTab, setActiveTab] = useState('risk');

  return (
    <>
      {/* [獨立主題 CSS 設定] 
        主題名稱: BlueXmas
        日後若要更改顏色，只需調整這裡的 HEX 代碼即可。
      */}
      <style>{`
        :root {
          /* 主題色票 (由 CMYK 轉換) */
          --bx-white: #F0F8FF;      /* C3 M0 Y0 K0 - 背景底色 */
          --bx-pale-blue: #5CA4DA;  /* C50 M20 Y0 K0 - 強調色/按鈕 */
          --bx-deep-blue: #1E468C;  /* C100 M68 Y10 K0 - 標題/深色文字 */
          --bx-red: #C13A45;        /* C20 M86 Y63 K0 - 股票漲/停利 */
          
          /* 輔助色 (保留綠色作為股票跌/停損，調整為搭配 BlueXmas 的色調) */
          --bx-green: #10B981;      /* 股票跌/停損 */
          --bx-text-main: #334155;  /* 主要內文灰 */
          --bx-text-sub: #94a3b8;   /* 次要文字灰 */
        }

        /* 全域樣式應用 */
        .theme-blue-xmas {
          background-color: var(--bx-white);
          color: var(--bx-text-main);
        }
        
        .bg-theme-deep { background-color: var(--bx-deep-blue); }
        .text-theme-deep { color: var(--bx-deep-blue); }
        
        .bg-theme-pale { background-color: var(--bx-pale-blue); }
        .text-theme-pale { color: var(--bx-pale-blue); }
        .border-theme-pale { border-color: var(--bx-pale-blue); }

        .text-theme-red { color: var(--bx-red); }
        .bg-theme-red-light { background-color: rgba(193, 58, 69, 0.1); }
        .border-theme-red { border-color: rgba(193, 58, 69, 0.2); }

        .text-theme-green { color: var(--bx-green); }
        .bg-theme-green-light { background-color: rgba(16, 185, 129, 0.1); }
        .border-theme-green { border-color: rgba(16, 185, 129, 0.2); }
      `}</style>

      {/* 修改版面結構：使用 flex-col 搭配 flex-1 確保卡片位於視覺正中心，footer 位於底部 */}
      <div className="theme-blue-xmas min-h-screen w-full flex flex-col transition-colors duration-300">
        
        {/* 卡片置中容器 */}
        <div className="flex-1 flex items-center justify-center p-4 w-full">
          {/* Main Container - RWD 設定 
              w-full: 手機版滿寬
              max-w-lg: 平板/桌機版限制最大寬度 (約 512px)，比原本 md 更寬一點以適應現代螢幕
              rounded-3xl: 更圓潤的邊角，符合現代 App 風格
          */}
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            
            {/* Header Title - 改為白色背景 */}
            <div className="bg-white p-6 text-center shadow-sm z-10">
              <h1 className="text-2xl font-bold text-theme-deep flex items-center justify-center gap-3 tracking-wide">
                <TrendingUp className="text-theme-pale" size={28} /> 
                股票風險戰情室
              </h1>
              <p className="text-slate-400 text-sm mt-2 opacity-80 font-light">
                BlueXmas Theme • Risk Control
              </p>
            </div>

            {/* Navigation Tabs - 改為淺藍色背景 */}
            <div className="flex bg-theme-pale">
              <TabButton 
                isActive={activeTab === 'risk'} 
                onClick={() => setActiveTab('risk')} 
                icon={<Calculator size={20} />} 
                label="損益試算" 
              />
              <TabButton 
                isActive={activeTab === 'position'} 
                onClick={() => setActiveTab('position')} 
                icon={<PieChart size={20} />} 
                label="買股資金" 
              />
              <TabButton 
                isActive={activeTab === 'quick'} 
                onClick={() => setActiveTab('quick')} 
                icon={<Target size={20} />} 
                label="快速策略" 
              />
            </div>

            {/* Content Area */}
            <div className="bg-white min-h-[450px] relative">
              {activeTab === 'risk' && <RiskCalculator />}
              {activeTab === 'position' && <PositionCalculator />}
              {activeTab === 'quick' && <QuickStrategy />}
            </div>

          </div>
        </div>
        
        {/* Footer 置於底部 */}
        <p className="pb-6 text-slate-400 text-xs text-center font-light tracking-wider w-full">
          投資一定有風險，計算結果僅供參考<br/>盈虧自負，請嚴格執行紀律
        </p>
      </div>
    </>
  );
};

// --- 元件: Tab 按鈕 ---
const TabButton = ({ isActive, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-bold flex flex-col items-center gap-1.5 transition-all duration-300 relative overflow-hidden ${
      isActive 
        ? 'bg-white text-theme-pale' // 選取時：白色背景、淺藍字
        : 'text-blue-50 hover:text-white hover:bg-white/10' // 未選取：(淺藍背景)、白色字
    }`}
  >
    {/* 移除原本的底部線條，讓選取狀態直接透過白色背景呈現 */}
    <span>{icon}</span>
    {label}
  </button>
);

// --- 功能 1: 原始的風險報酬計算機 ---
const RiskCalculator = () => {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [results, setResults] = useState(null);
  const [advice, setAdvice] = useState('');
  const [direction, setDirection] = useState('long');

  useEffect(() => {
    calculate();
  }, [entryPrice, stopLoss, takeProfit]);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);

    if (!entry || !sl || !tp || entry <= 0) {
      setResults(null);
      return;
    }

    let riskAmt = 0, rewardAmt = 0, currentDirection = 'long';

    // 判斷方向
    if (tp > entry && entry > sl) {
      currentDirection = 'long';
      riskAmt = entry - sl;
      rewardAmt = tp - entry;
    } else if (sl > entry && entry > tp) {
      currentDirection = 'short';
      riskAmt = sl - entry;
      rewardAmt = entry - tp;
    } else {
      setResults(null); 
      setAdvice('價格邏輯錯誤');
      return;
    }

    const riskPct = (riskAmt / entry) * 100;
    const rewardPct = (rewardAmt / entry) * 100;
    const rrRatio = rewardAmt / riskAmt;

    setDirection(currentDirection);
    setResults({
      riskPct: riskPct.toFixed(2),
      rewardPct: rewardPct.toFixed(2),
      rrRatio: rrRatio.toFixed(2)
    });

    // 簡單建議
    if (riskPct > 10) setAdvice("⚠️ 風險 > 10%，部位請縮小。");
    else if (rrRatio < 1) setAdvice("❌ 損益比 < 1，不建議進場。");
    else if (rrRatio >= 3) setAdvice("🚀 損益比 > 3，優質交易。");
    else setAdvice("✅ 損益比正常，可依計畫執行。");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="space-y-5">
        <InputGroup label="進場價" value={entryPrice} setValue={setEntryPrice} placeholder="100" />
        <div className="grid grid-cols-2 gap-5">
          <InputGroup label="停損價" value={stopLoss} setValue={setStopLoss} theme="green" placeholder="90" />
          <InputGroup label="停利價" value={takeProfit} setValue={setTakeProfit} theme="red" placeholder="120" />
        </div>
      </div>

      {results ? (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner mt-4">
           <div className="flex justify-between items-center mb-4">
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
                direction === 'long' 
                  ? 'bg-theme-red-light text-theme-red border border-theme-red' 
                  : 'bg-theme-green-light text-theme-green border border-theme-green'
              }`}>
                {direction === 'long' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                {direction === 'long' ? '做多看漲' : '做空看跌'}
              </span>
              <span className="text-sm font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                R:R = 1 : {results.rrRatio}
              </span>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-4">
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
               <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Risk (停損)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">{results.riskPct}%</div>
             </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[var(--bx-red)]">
               <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Reward (停利)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">{results.rewardPct}%</div>
             </div>
           </div>
           
           <div className="text-sm text-theme-deep bg-blue-50/80 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
             <div className="shrink-0 mt-0.5"><AlertTriangle size={16}/></div>
             <div className="leading-relaxed">{advice}</div>
           </div>
        </div>
      ) : (
        <EmptyState text="輸入價格計算損益比" />
      )}
    </div>
  );
};

// --- 功能 2: 資金分配計算機 (30% 原則) ---
const PositionCalculator = () => {
  const [capital, setCapital] = useState('');
  const [price, setPrice] = useState('');
  
  const targetPercent = 0.30; // 30%
  const investAmt = capital ? parseFloat(capital) * targetPercent : 0;
  const shares = (price && investAmt) ? Math.floor(investAmt / parseFloat(price)) : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-5">
        <InputGroup label="總資金 (Total Capital)" value={capital} setValue={setCapital} placeholder="例如: 1000000" icon={<Wallet size={18}/>} />
        <InputGroup label="股票現價 (Stock Price)" value={price} setValue={setPrice} placeholder="例如: 50" />
      </div>

      {capital && price ? (
        <div className="space-y-4">
          <div className="bg-theme-pale/10 p-6 rounded-2xl border border-theme-pale/30 text-center">
            <p className="text-sm text-theme-pale mb-2 font-bold tracking-wide">建議投入資金 (30%)</p>
            <p className="text-4xl font-black text-theme-deep">
              ${investAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-theme-deep text-white p-6 rounded-2xl shadow-xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-white opacity-10 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
               <PieChart size={140} />
            </div>
            <p className="text-blue-200 text-sm mb-3 font-medium">約可購買股數</p>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-5xl font-bold text-theme-pale">{shares.toLocaleString()}</span>
              <span className="text-xl text-blue-300 mb-1.5 font-light">股</span>
            </div>
            <div className="h-px w-full bg-blue-800 my-4"></div>
            <p className="text-xs text-blue-300 flex items-center gap-2">
              <span className="bg-blue-800 px-2 py-1 rounded">換算</span>
              {Math.floor(shares/1000)} 張 {shares%1000} 股
            </p>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入資金與股價以計算部位" />
      )}
    </div>
  );
};

// --- 功能 3: 快速進出場策略 + 紀律提醒 ---
const QuickStrategy = () => {
  const [price, setPrice] = useState('');
  const p = parseFloat(price);

  // 4% 停利, 5% 停損, 10% 停損
  const tpPrice = p ? (p * 1.04).toFixed(2) : '-';
  const slPrice5 = p ? (p * 0.95).toFixed(2) : '-';
  const slPrice10 = p ? (p * 0.90).toFixed(2) : '-';

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <InputGroup label="股票現價" value={price} setValue={setPrice} placeholder="例如: 80" />

      {p ? (
        <div className="space-y-5">
          {/* Target Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-theme-red-light p-5 rounded-2xl border border-theme-red text-center hover:scale-[1.02] transition-transform">
              <div className="text-theme-red text-xs font-bold mb-2 uppercase tracking-wider">停利目標 (+4%)</div>
              <div className="text-3xl font-black text-theme-red">${tpPrice}</div>
            </div>
            <div className="bg-theme-green-light p-5 rounded-2xl border border-theme-green text-center hover:scale-[1.02] transition-transform">
              <div className="text-theme-green text-xs font-bold mb-2 uppercase tracking-wider">停損防守 (-5%)</div>
              <div className="text-3xl font-black text-theme-green">${slPrice5}</div>
            </div>
          </div>

          {/* Reminder Card */}
          <div className="bg-orange-50/50 border-l-4 border-orange-400 p-5 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-orange-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-orange-500" />
              短線操作紀律
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">停損 5%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${slPrice5}
                  </span>
                  <span className="text-theme-red font-bold bg-theme-red-light px-3 py-1 rounded-full text-xs border border-theme-red">
                    砍 70%
                  </span>
                </div>
              </li>
              <li className="w-full h-px bg-orange-200/50"></li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">停損 10%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${slPrice10}
                  </span>
                  <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-full text-xs">
                    全砍
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入現價以生成操作策略" />
      )}
    </div>
  );
};

// --- Shared Components ---

const InputGroup = ({ label, value, setValue, placeholder, theme = "blue", icon }) => {
  // 根據傳入的 theme props 決定 Input 的邊框與 focus 顏色
  // 這裡映射到我們自定義的 CSS 變數
  const themeStyles = {
    blue: "focus:ring-[var(--bx-pale-blue)] focus:border-[var(--bx-pale-blue)] bg-slate-50",
    red: "focus:ring-[var(--bx-red)] focus:border-[var(--bx-red)] bg-theme-red-light/30 text-theme-red placeholder-red-200 border-theme-red/30",
    green: "focus:ring-[var(--bx-green)] focus:border-[var(--bx-green)] bg-theme-green-light/30 text-theme-green placeholder-green-200 border-theme-green/30"
  };
  
  const inputClass = themeStyles[theme];

  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 mb-1.5 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative group">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-sans transition-colors ${
           theme === 'red' ? 'text-theme-red/50' : theme === 'green' ? 'text-theme-green/50' : 'text-slate-400 group-hover:text-theme-pale'
        }`}>$</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-9 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 text-xl font-bold transition-all shadow-sm ${inputClass}`}
        />
      </div>
    </div>
  );
};

const EmptyState = ({ text }) => (
  <div className="flex flex-col items-center justify-center h-56 text-slate-300">
    <div className="bg-slate-50 p-6 rounded-full mb-4 animate-pulse">
      <RefreshCcw size={32} className="text-slate-200" />
    </div>
    <p className="text-sm font-medium tracking-wide">{text}</p>
  </div>
);

export default App;