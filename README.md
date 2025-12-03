📈 股票風險戰情室 (Stock Risk War Room)

這是一個現代化、響應式設計 (RWD) 的 React 股市輔助工具，專為台股投資人設計。具備風險控管、資金分配建議以及短線紀律提醒功能。

✨ 特色功能

1. 損益試算 (Risk Calculator)

自動判斷做多 (Long) 或做空 (Short) 方向。

輸入進場、停損、停利價，即時計算 損益比 (Risk/Reward Ratio)。

提供視覺化的風險/報酬比例條。

根據損益比提供投資建議 (例如：R/R < 1 不建議進場)。

2. 資金分配 (Position Sizing)

設定總資金與目標股價。

自動計算 30% 資金原則 下的建議進場金額。

自動換算可購買股數 (張數 + 零股)。

3. 快速策略 (Quick Strategy)

輸入現價，一鍵生成 +4% 停利 與 -5% 停損 價格。

紀律小卡：動態計算「停損 5% 砍 70%」、「停損 10% 全砍」的具體執行價格。


🚀 安裝與執行

安裝依賴

npm install


啟動開發伺服器

npm run dev


建置生產版本

npm run build


🛠️ 技術堆疊

Framework: React + Vite

Styling: Tailwind CSS

Icons: Lucide React