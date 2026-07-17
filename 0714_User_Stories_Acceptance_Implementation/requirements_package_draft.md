# 需求文件包初稿 (Requirements Package Draft)

本文件為淡江大學吉他社財務管理系統之需求文件包初稿，旨在為系統分析、開發與驗收提供統一的規格指引，確保團隊與利害關係人對系統範圍達成共識。

---

## 一、專案基本資料與範圍摘要
* **專案名稱**：面向一般社員、財務幹部與社長之社費預約繳費、一鍵確認與電子收據管理系統
* **專案背景**：吉他社在每學期初收繳社費時，現場收現排隊時間長，傳統紙本收據極易遺失且難以核對，社長也難以即時掌握經費狀況以規畫活動預算。
* **專案範圍**：
  - **納入範圍**：身分切換模擬器、社員預約表單、唯一 RES 編號、財務後台模糊搜尋與一鍵確認、財務確認人與分秒時間戳記、社長即時統計儀表板與已繳/待繳/逾期名冊、符合評鑑的帶財務章電子收據查詢與列印、模擬日期時間流逝調整器、櫃檯現場快速變更方案。
  - **排除範圍**：真實後端伺服器與資料庫（限用 LocalStorage）、真實帳密認證、真實行動金流支付 APIs、自動發送 Email/簡訊網關服務。

---

## 二、利害關係人與目標角色
1. **一般社員 (蔡同學)**：希望繳費流程簡單，能拿到收據憑證且不易遺失。
2. **財務幹部 (林同學)**：現場收款的直接執行者，要求搜尋速度快、點按次數少，且責任分明避免帳目爭議。
3. **社長 (范同學)**：社團負責人與決策者，要求報表真實、隨時能掌握已收與未繳名冊，以便催繳。
4. **課外活動組承辦人**：評鑑審查者，要求收據欄位合規（收據號、姓名學號、社團、金額、經辦人與時間戳記），並蓋有社團財務證明章。

---

## 三、需求文件包組成清單 (文件導覽)
本需求文件包由以下模組化文件共同組成，您可以點選連結查看詳細細節：
1. **使用者故事**：[user_stories.md](file:///0714_User_Stories_Acceptance_Implementation/user_stories.md) - 定義系統價值。
2. **功能性需求**：[functional_requirements.md](file:///0714_User_Stories_Acceptance_Implementation/functional_requirements.md) - 定義系統行為。
3. **非功能性需求**：[non_functional_requirements.md](file:///0714_User_Stories_Acceptance_Implementation/non_functional_requirements.md) - 定義品質指標。
4. **業務規則、資料需求與限制條件**：[business_rules_data_constraints.md](file:///0714_User_Stories_Acceptance_Implementation/business_rules_data_constraints.md) - 定義運作約束。
5. **驗收條件**：[acceptance_criteria.md](file:///0714_User_Stories_Acceptance_Implementation/acceptance_criteria.md) - 定義完成標準。
6. **需求優先順序**：[requirements_priority.md](file:///0714_User_Stories_Acceptance_Implementation/requirements_priority.md) - 定義開發順序。
7. **雙向需求追溯矩陣**：[traceability_matrix_draft.md](file:///0714_User_Stories_Acceptance_Implementation/traceability_matrix_draft.md) - 定義追溯證據鏈。

---

## 四、未解決問題清單 (Open Issues List)

在目前的規格中，仍有以下問題需於後續階段或實際評鑑前進一步釐清：

| 問題編號 | 未解決問題說明 | 影響需求 | 要向誰確認 | 暫時處理方式 | 截止時間 | 狀態 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **OI-01** | 電子收據認證大印之行政效力 | FR-07 | 課外組承辦人 | 先以系統生成的「淡江大學吉他社財務收訖章」浮水印代替，並於社團評鑑前向課外組主任口頭確認是否接受電子憑證。 | 115/07/20 | 待確認 |
| **OI-02** | 逾期預約資料的保存期限 | BR-01 | 專案團隊/社長 | 原型系統中逾期資料會一直保留在 LocalStorage 中以供關懷名冊顯示。正式系統是否需要設置例如 30 天自動清理機制？暫時不做清理。 | 115/07/22 | 待確認 |
| **OI-03** | 現場退款與作廢機制 | BR-03 | 社長/財務 | 本期原型不支援退款功能。若有社員現場反悔，幹部需以人工記錄，系統暫不提供按鈕，以免與電子收據編號產生防弊衝突。 | 115/07/20 | 待確認 |

---

## 五、版本與變更紀錄 (Version and Change Log)

| 版本 | 日期 | 變更內容 | 變更原因 | 影響需求 | 負責人 | 提交紀錄 (Commit) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0.1** | 115/07/13 | 建立第一個可操作切片與基礎需求表 | 專案啟動與第一個核心流程建立 | FR-01 ~ FR-07 | 范植翔 | `docs: 初始化0713需求來源與首版原型` |
| **0.2** | 115/07/14 | 升級需求文件包，規劃並實作第二個可操作切片 | 依 7/13 訪談反饋，補強現場繳費靈活性、逾期測試及社長催繳手段 | FR-08, BR-02, DR-03, NFR-03, NFR-05 | 范植翔 | `feat: 實作系統模擬時間調整器與櫃檯方案現場變更` |
