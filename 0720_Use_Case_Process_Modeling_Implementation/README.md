# 系統分析與設計：7/20 使用案例、流程建模與第三切片實作

本資料夾包含了 SAD 第 10 組於 115/07/20 的所有學習產出與實作成果。我們完成了面向一般社員、財務幹部與社長之「社費預約繳費與電子收據管理系統」的分析建模，並基於模型實作了第三個可操作切片（預約取消與收據作廢機制）。

---

## 一、今日完成成果索引 (Deliverables Index)

1.  **[專案導覽說明檔 (README.md)](file:///0720_Use_Case_Process_Modeling_Implementation/README.md)** (本檔案)
2.  **[參與者目標矩陣 (actor_goal_matrix.md)](file:///0720_Use_Case_Process_Modeling_Implementation/actor_goal_matrix.md)**：定義 3 種系統主動參與者、目標、觸發事件與成功結果。
3.  **[使用案例清單 (use_case_inventory.md)](file:///0720_Use_Case_Process_Modeling_Implementation/use_case_inventory.md)**：包含 7 個動詞＋名詞之核心使用案例，並定義 MoSCoW 優先級與包含/延伸關係。
4.  **使用案例圖 (Use Case Diagram)**：
    *   **[使用案例圖圖片 (use_case_diagram.png)](file:///0720_Use_Case_Process_Modeling_Implementation/use_case_diagram.png)**
    *   **[Mermaid 原始碼 (use_case_diagram.mermaid)](file:///0720_Use_Case_Process_Modeling_Implementation/use_case_diagram_source/use_case_diagram.mermaid)**
5.  **[使用案例描述 (use_case_descriptions.md)](file:///0720_Use_Case_Process_Modeling_Implementation/use_case_descriptions.md)**：包含 UC-01、UC-04 與 UC-05 的 3 份完整描述（涵蓋正常、替代及例外路徑）。
6.  **現況泳道流程圖 (AS-IS Process Model)**：
    *   **[現況流程圖片 (as_is_process.png)](file:///0720_Use_Case_Process_Modeling_Implementation/as_is_process.png)**
    *   **[Mermaid 原始碼 (as_is_process.mermaid)](file:///0720_Use_Case_Process_Modeling_Implementation/process_model_sources/as_is_process.mermaid)**
7.  **目標泳道流程圖 (TO-BE Process Model)**：
    *   **[目標流程圖片 (to_be_process.png)](file:///0720_Use_Case_Process_Modeling_Implementation/to_be_process.png)**
    *   **[Mermaid 原始碼 (to_be_process.mermaid)](file:///0720_Use_Case_Process_Modeling_Implementation/process_model_sources/to_be_process.mermaid)**
8.  **[流程問題與改善對照表 (process_problem_improvement.md)](file:///0720_Use_Case_Process_Modeling_Implementation/process_problem_improvement.md)**：對照 AS-IS 痛點（P-01 至 P-05）與 TO-BE 改善措施。
9.  **[流程資料交換表 (process_data_exchange.md)](file:///0720_Use_Case_Process_Modeling_Implementation/process_data_exchange.md)**：定義重要步驟之輸入、處理、輸出與狀態變化（T-01 至 T-10），準備對接下階段 DFD。
10. **[模型一致性矩陣 (model_consistency_matrix.md)](file:///0720_Use_Case_Process_Modeling_Implementation/model_consistency_matrix.md)**：核對 FR、UC、流程與畫面之一致性，並記錄 MC-01 (學號鎖定 Bug) 與 MC-02 (作廢列印漏洞) 之修正。
11. **[實作待辦清單 (implementation_backlog.md)](file:///0720_Use_Case_Process_Modeling_Implementation/implementation_backlog.md)**：定義本期第三切片 (IMP-01 至 IMP-04) 之完成標準 (DoD) 與驗證方法。
12. **[更新後的實作任務書 (updated_code_agent_brief.md)](file:///0720_Use_Case_Process_Modeling_Implementation/updated_code_agent_brief.md)**：模型驅動之程式碼代理實作規格書。
13. **[手動驗收測試紀錄 (manual_acceptance_test.md)](file:///0720_Use_Case_Process_Modeling_Implementation/manual_acceptance_test.md)**：6 筆手動測試案例（3 正常/替代、3 例外/防弊/邊界）之執行軌跡與判定結果（全數通過）。
14. **[生成式 AI 使用紀錄 (ai_code_agent_log.md)](file:///0720_Use_Case_Process_Modeling_Implementation/ai_code_agent_log.md)**：開發日誌與人機協同反思。
15. **第三個可操作切片原型代碼 (Third Working Slice)**：
    *   **[網頁主程式 (index.html)](file:///0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/index.html)**
    *   **[邏輯腳本 (app.js)](file:///0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/app.js)**
    *   **[樣式表 (style.css)](file:///0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/style.css)**

---

## 二、分析建模核心摘要

1.  **參與者與目標**：本系統的核心外部主動操作者包含**一般社員**（預約方案、取消預約、查詢列印收據）、**財務幹部**（模糊搜尋、櫃檯方案切換、一鍵確認收款、作廢收據）與**社長**（即時財務統計與催繳名單監控）。學校課外活動組承辦人為**非參與者利害關係人**。
2.  **現況痛點與目標改善**：
    *   *現況 (AS-IS)*：人工詢問方案與剩餘名額效率低；紙本收款對帳耗時且收據易遺失；社長無法即時獲取催繳名單；發生收款錯誤或退繳時，無法系統作廢已開立收據，易生財務舞弊。
    *   *目標 (TO-BE)*：線上登記與 RES- 預約自動計時（BR-01）；後台模糊搜尋（<500ms）一鍵收款；線上查詢列印加蓋財務章電子收據；社長四大名冊自動拆分；後台作廢收據防弊（收據印上 VOIDED 並禁止列印）。

---

## 三、第三個可操作切片實作說明

本組於今日實作了**方案 B：第三個可操作切片**，成功完成以下功能：
1.  **社員自主取消預約**：於一般社員狀態面板增設「取消此筆預約」按鈕（僅在待繳費時顯示）。點選確認後狀態變為 `已取消`，卡片重設，並**釋出學號佔用**，允許學員以同一個學號重新進行預約登記。
2.  **財務後台待繳取消與已繳作廢**：在後台操作欄位，對待繳預約提供紅色「取消」按鈕；對已繳項目提供「作廢」按鈕。點選作廢並確認後，狀態變為 `已作廢`，並寫入 `voidTimestamp` 與經辦人。
3.  **社長看板作廢名冊與數據連動**：新增「已作廢/取消數」指標卡，並於下方渲染出獨立的「已作廢與已取消名冊」（顯示姓名、學號、原方案、原金額、作廢時間與經辦人）。社長的實收總額與待收預估自動扣減已作廢及已取消之款項。
4.  **已作廢收據紅印警示與列印截斷**：在收據查驗頁面查詢已作廢學號時，渲染出帶有紅色 dashed 邊框的收據，並蓋上傾斜的「收據已作廢 VOIDED」作廢大印，最下方**不提供「列印 / 下載」按鈕**，杜絕社員持已作廢收據報帳之財務舞弊風險。

---

## 四、如何開啟與操作原型

1.  **目錄位置**：本專案原型代碼位於 `0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/`。
2.  **啟動方式**：直接在瀏覽器中雙擊打開 **[index.html](file:///0720_Use_Case_Process_Modeling_Implementation/revised_or_third_working_slice/index.html)** 檔案即可執行（無需任何伺服器部署）。
3.  **現場測試引導 (實作驗收路徑)**：
    *   *測試取消預約與學號釋放*：
        - 切換至「一般社員」，輸入學號 `D1129902` 姓名 `趙二同學` 送出半年期預約。確認右側出現 RES- 待繳卡片。
        - 點擊卡片下方的「取消此筆預約」按鈕並確認。畫面卡片重設。
        - 再次於上方輸入 `D1129902` 姓名 `趙二同學` 送出一年期預約。確認系統**成功放行**，直接產生新預約，無重複預約阻擋（此修正解決了 MC-01 一致性 Bug）。
    *   *測試收據作廢與防弊列印截斷*：
        - 切換至「財務後台」，在搜尋框輸入 `D1120009` (吳宗憲)，點擊其對應列的「一鍵確認收款」。該行狀態變為綠色已繳費，並顯示作廢按鈕。
        - 切換至社長看板，確認「實收社費總額」增加 900 元。
        - 切換至「財務後台」，點擊吳宗憲列已繳費 badge 旁的「作廢」按鈕並二次確認。該行狀態變為已作廢。
        - 切換至社長看板，確認「實收社費總額」扣減了 900 元，且「已作廢與已取消名冊」中出現吳宗憲，記錄經辦人與作廢時間。
        - 切換至「收據查驗」，輸入 `D1120009` 點擊查驗。確認渲染出紅色虛線邊框的作廢收據，印有紅色「收據已作廢 VOIDED」印章，且**底部完全無列印按鈕**（此修正解決了 MC-02 一致性 Bug）。

---

## 五、驗收結果與已知限制

*   **已通過手動驗收條件**：`MAT-01` (正常預約與一鍵確認)、`MAT-02` (社員端取消預約)、`MAT-03` (財務端取消待繳預約)、`MAT-04` (已繳費收據作廢)、`MAT-05` (查驗已作廢收據)、`MAT-06` (已取消/作廢學號重新登記放行)。
*   **通過率**：100% (6/6 測試案例全數 Pass)。
*   **已知限制**：
    - 系統無真實後端，所有資料儲存在瀏覽器 `LocalStorage` 中。若手動清理瀏覽器快取，系統資料將重新初始化為 20 筆預載資料。
    - 收據查驗僅靠學號做模糊比對且未進行密碼保護，屬單機原型階段的便利性設計。

---

## 六、版本管理與提交記錄 (Commit Log)
本小組在本地 Git 儲存庫進行了嚴格的版本與交付管理：

*   **今日最新 Commit ID**：`[待更新：請於 git commit 後在此更新]`
*   **Commit 歷史**：
    1. `docs: 初始化 0720 分析建模資料夾與交付結構` (對應任務 1)
    2. `feat: 實作第三切片 - 一般社員取消預約與學號佔用釋放` (對應任務 2.1, 2.2)
    3. `feat: 實作第三切片 - 財務端取消與作廢收據功能` (對應任務 2.2)
    4. `feat: 實作第三切片 - 社長看板作廢指標、名冊與收據查驗防弊列印截斷` (對應任務 2.1, 2.2, 2.3)
    5. `docs: 建立完整參與者目標矩陣、使用案例描述與流程資料交換模型` (對應任務 3)
    6. `docs: 建立 Mermaid 使用案例與 AS-IS/TO-BE 流程圖原始碼與圖檔` (對應任務 4)
    7. `test: 執行手動驗收測試並記錄測試證據` (對應任務 5)
