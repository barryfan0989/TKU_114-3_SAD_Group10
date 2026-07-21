# 生成式 AI 使用紀錄 (Generative AI Use Log)

本文件記錄了本小組（SAD 第 10 組）於 115/07/20 開發週期中，與 AI 協同分析、建模與進行第三切片代碼開發的完整互動歷程。

---

## 一、AI 協同開發軌跡

| 順序 (No) | 協同目的 (Goal) | 使用工具 (Tools) | 提示詞模式或內容 (Prompt Pattern / Content) | 產出與成效 (Outputs & Effects) | 採用決策與人工調整說明 (Decisions & Adjustments) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **規劃實作計畫** | write_to_file | 依據 7/20 教材，評估專案狀態與第三個可操作切片（待繳取消與已繳作廢）的技術可行性。 | 產生 `implementation_plan.md`，定義變更範圍與手動驗收計畫。 | **採用**。計畫經由社長與組員審查通過，確定排除退費金流，採用單機 LocalStorage 狀態變更防弊。 |
| **2** | **環境複製準備** | run_command | `Copy-Item` 指令將 0714 代碼拷貝至 0720 資料夾中。 | 建立 `0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/` 資料夾並複製 index.html, app.js, style.css。 | **採用**。準備好第三切片的純淨代碼基礎。 |
| **3** | **HTML UI 增修** | replace_file_content | 尋找並在 `index.html` 中增設社員取消按鈕、後台作廢與取消按鈕、社長作廢統計卡與已作廢社員清冊。 | 完成 `index.html` 的 Notion 質感結構升級，增加對應的元件容器與 DOM ID。 | **採用**。完全符合使用案例設計的畫面變更，無多餘 UI 膨脹。 |
| **4** | **JS 邏輯開發** | replace_file_content | 實作待繳預約取消、已繳作廢邏輯、社長統計重新計算與收據作廢紅色大印渲染，並修改重複檢查為逆向尋找。 | 完成 `app.js` 升級，新增 `cancelReservation`, `voidPayment` 等核心控制函數，實作 VOIDED 印章與列印控制。 | **採用**。人工檢查逆向搜尋 `[...reservations].reverse().find` 確實解決了 MC-01 學號被歷史取消紀錄鎖死的 Bug，且防弊截斷列印功能成功。 |
| **5** | **CSS 質感微調** | replace_file_content | 在 `style.css` 中增加 `.btn-danger` 紅色 Notion 按鈕、`.cancelled` 與 `.voided` 灰色/紅色 badge，以及作廢章的 dashed 印章邊框。 | 實作符合 Notion 簡約紙頁風的作廢收據 CSS 樣式。 | **採用**。確保了頁面整體視覺美感的一致性。 |
| **6** | **分析模型與圖面** | write_to_file, run_command | 撰寫 matrix, inventory, descriptions, problem_improvement 等分析文件，並調用 Mermaid CLI 將圖檔轉成 PNG。 | 產生 7/20 SAD 課程要求的完整分析模型鏈，並生成 `use_case_diagram.png` 等圖檔。 | **採用**。Mermaid 原始碼保留於 sources 中，以便後續小組擴充修改。 |

---

## 二、AI 實作反思與經驗總結

1.  **分析模型驅動實作 (Model-Driven Development)**：
    今日實作前先釐清了參與者目標與系統邊界的關係（課外組承辦人為 Stakeholder 而非 Actor），並在 `use_case_inventory.md` 中詳細規劃了包含（Include）與延伸（Extend）關係，這使得程式碼代理在實作「取消」與「作廢」功能時，邏輯思路非常清晰，沒有寫出超出模型範圍的冗餘功能。
2.  **細節一致性 (Consistency Checks)**：
    在一致性核對中，小組發現了「舊取消預約鎖死新預約登記」的一致性衝突（MC-01），如果沒有在分析階段建立模型一致性矩陣，直接讓 AI 去寫，極容易在現場測試時遭遇学号被鎖定的例外 Bug。採用逆向尋找最新的有效預約順利排除此衝突。
3.  **邊界安全防弊 (Security Boundary Controls)**：
    對於「電子收據評鑑效力」問題，系統在作廢後自動更換印章浮水印為 `VOIDED` 並隱藏列印按鈕，從系統控制層面（System Boundary Controls）實施了防弊，是分析模型與實務安全結合的優良實務。
