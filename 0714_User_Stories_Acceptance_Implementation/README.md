# 系統分析與設計：7/14 需求文件包與第二個可操作切片

## A. 小組基本資料
* **課程名稱**：系統分析與設計
* **日期**：115/07/14
* **小組名稱**：Group 10
* **專案名稱**：面向一般社員、財務幹部與社長之社費預約繳費、一鍵確認與電子收據管理系統
* **組員與分工**：范植翔（負責需求工程、使用者故事改寫、品質審查、優先順序排序、雙向追溯矩陣建立、手動驗收測試與第二個可操作切片程式碼實作）
* **GitHub 儲存庫連結**：[TKU_114-3_SAD_Group10 (GitHub)](https://github.com/barryfan0989/TKU_114-3_SAD_Group10)
* **7/13 成果資料夾連結**：[0713_Requirements_Code_Agent/](file:///0713_Requirements_Code_Agent)
* **0714 成果資料夾連結**：[0714_User_Stories_Acceptance_Implementation/](file:///0714_User_Stories_Acceptance_Implementation)

---

## B. 今日完成成果索引
今日我們已將 7/13 的訪談與來源證據，整理為可閱讀、可排序、可實作、可驗收的完整需求文件包，並完成「第二個可操作切片」的實作與驗收。以下為文件導覽：

1. **[專案導覽說明檔 (README.md)](file:///0714_User_Stories_Acceptance_Implementation/README.md)** (本檔案)
2. **[使用者故事清單 (user_stories.md)](file:///0714_User_Stories_Acceptance_Implementation/user_stories.md)**：包含 8 則故事與 3 則 INVEST 品質審查。
3. **[功能性需求清單 (functional_requirements.md)](file:///0714_User_Stories_Acceptance_Implementation/functional_requirements.md)**：包含 8 筆 FR 的觸發、前提、行為與結果。
4. **[非功能性需求清單 (non_functional_requirements.md)](file:///0714_User_Stories_Acceptance_Implementation/non_functional_requirements.md)**：包含 5 筆 NFR、可量化指標與 3 個品質屬性情境。
5. **[業務規則、資料需求與限制條件 (business_rules_data_constraints.md)](file:///0714_User_Stories_Acceptance_Implementation/business_rules_data_constraints.md)**：定義逾期規則、一人一單限制與單機儲存技術限制。
6. **[驗收條件清單 (acceptance_criteria.md)](file:///0714_User_Stories_Acceptance_Implementation/acceptance_criteria.md)**：10 筆以上 Given/When/Then AC（涵蓋正常、例外與邊界）。
7. **[需求品質與衝突審查紀錄 (requirements_quality_review.md)](file:///0714_User_Stories_Acceptance_Implementation/requirements_quality_review.md)**：記錄 3 筆重複、模糊與不可驗收需求之修正（如引入時間模擬器）。
8. **[需求優先順序表 (requirements_priority.md)](file:///0714_User_Stories_Acceptance_Implementation/requirements_priority.md)**：MoSCoW 排序與價值投入矩陣分析。
9. **[需求文件包初稿 (requirements_package_draft.md)](file:///0714_User_Stories_Acceptance_Implementation/requirements_package_draft.md)**：整合成書，包含 3 筆未解決問題（Open Issues）與版本變更日誌。
10. **[雙向需求追溯矩陣 (traceability_matrix_draft.md)](file:///0714_User_Stories_Acceptance_Implementation/traceability_matrix_draft.md)**：保障 來源 -> 故事 -> 需求 -> AC -> 背包 -> 畫面 -> 測試的雙向證據鏈。
11. **[實作待辦清單 (implementation_backlog.md)](file:///0714_User_Stories_Acceptance_Implementation/implementation_backlog.md)**：定義 DoD 與驗證方式。
12. **[更新後的實作任務書 (updated_code_agent_brief.md)](file:///0714_User_Stories_Acceptance_Implementation/updated_code_agent_brief.md)**：供程式碼代理實作第二切片之規格書。
13. **[需求與畫面對照表 (requirements_to_screen.md)](file:///0714_User_Stories_Acceptance_Implementation/requirements_to_screen.md)**：UI 欄位按鈕對應需求及資料異動說明。
14. **[手動驗收測試紀錄 (manual_acceptance_test.md)](file:///0714_User_Stories_Acceptance_Implementation/manual_acceptance_test.md)**：7 筆手動測試紀錄（3 正常、2 例外、1 邊界、1 品質），附帶測試數據與證據。
15. **[生成式 AI 使用紀錄 (ai_code_agent_log.md)](file:///0714_User_Stories_Acceptance_Implementation/ai_code_agent_log.md)**：與程式碼代理協同開發與人工修正日誌。

---

## C. 本次實作選擇與說明
本組本次選擇：**方案 B：建立第二個可操作切片 (Second Working Slice)**。

我們延續了第一個切片的預約與收款主流程，實作了以下 4 大核心擴充功能，直接解決了訪談中的實務痛點（Q1, Q2, Q3）：
1. **系統模擬日期調整器 (System Date Simulator)**：於頂部新增日期選擇器。修改日期可模擬時間流逝，由系統自動掃描過期資料（BR-01），解決 7 天過期機制現場無法測試的瓶頸。
2. **櫃檯現場快速方案變更 (Quick Scheme Editor)**：財務幹部在收款現場對「待繳費」列可直接透過下拉選單切換半年(500)與一年(900)方案，即時重算金額並更新，解決 Q1 現場排隊混亂問題。
3. **社長逾期關懷名冊 (President Overdue Care List)**：社長看板的待繳費與已逾期名冊完全拆分。已逾期項目被排除於待收金額與已繳率分母，社長能精確掌握逾期學員進行線下催繳關懷，解決 Q2 預算虛胖問題。
4. **收據財務大印與列印最佳化 (Print & Stamp)**：電子收據票據中加蓋紅色圓形「淡江大學吉他社 財務收訖章」浮水印。設定 `@media print` 樣式，點擊列印時自動隱藏 header/footer 等無關元素，供課外組評鑑核銷，解決 Q3 行政合規問題。

---

## D. 開啟與操作方式
1. **目錄位置**：本專案原型代碼位於 `0714_User_Stories_Acceptance_Implementation/revised_or_second_working_slice/`。
2. **啟動方式**：直接在瀏覽器中雙擊打開 **[index.html](file:///0714_User_Stories_Acceptance_Implementation/revised_or_second_working_slice/index.html)** 檔案即可執行（無需伺服器部署）。
3. **操作示範路徑**：
   - **測試櫃檯變更**：切換到「財務後台」，在「吳宗憲(D1120009)」的行中，將方案下拉選單從一年期改為半年期，確認金額即時變為 500 元。點擊「一鍵確認收款」，隨後切換到「收據查驗」，輸入 `D1120009`，確認產生的收據為半年期 500 元，並印有紅色社團印章。
   - **測試 7 天自動逾期**：切換到「一般社員」，輸入 `D1120099` 姓名 `林小華` 預約半年方案。此時系統日期模擬器為今日（例如 2026-07-17）。切換頂部模擬日期為 8 天後（`2026-07-25`），系統將自動將該筆預約狀態更新為「已逾期」，並在社長看板的「逾期關懷名冊」中呈現。

---

## E. 驗收結果摘要
* **已通過驗收條件**：`AC-01-01`、`AC-01-02`（預約表單）、`AC-02-01`（RES-生成）、`AC-03-01`（模糊搜尋）、`AC-04-01`（一鍵收款）、`AC-05-01`（確認戳記）、`AC-06-01`（社長統計）、`AC-07-01`（電子收據大印）、`AC-08-01`（防重複）、`AC-08-02`（未繳覆蓋）、`AC-09-01`、`AC-09-02`（逾期掃描與邊界）、`AC-10-01`（手機適配與列印優化）。
* **通過率**：100% (7/7 測試案例全部 Pass)。
* **已知限制**：本系統完全基於 LocalStorage，資料儲存於單一瀏覽器快取中，若清除瀏覽器快取，資料將重設為 20 筆預載資料。

---

## F. 本次提交與版本管理紀錄
本組在本地 Git 進行了分支開發與變更 commit 管理，主要變更歷史如下：

* **Commit 1**: `docs: 複製7/13基礎代碼並初始化0714目錄` (對應任務 11)
* **Commit 2**: `feat: 升級HTML結構以適配時間模擬器與社長雙名冊` (對應任務 11)
* **Commit 3**: `feat: 實作日期模擬器、櫃檯方案切換、社長統計拆分與收據蓋印` (對應任務 11)
* **Commit 4**: `feat: 優化 Notino 原生 CSS 樣式與收據滿版列印排版` (對應任務 11)
* **Commit 5**: `docs: 完成使用者故事與需求文件包初稿` (對應任務 1~10, 12)
* **Commit 6**: `test: 補上手動驗收測試與修正紀錄` (對應任務 13)
