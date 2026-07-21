# 流程資料交換表 (Process Data Exchange Table)

本表詳細定義了目標流程（TO-BE Process）中各步驟的資料流向、處理邏輯、去向與狀態變化，作為下一階段資料流程圖（DFD）與實體關係圖（ERD）的設計基礎。

---

## 流程資料交換矩陣

| 步驟編號 | 執行者 (Executor) | 輸入資料 (Input Data) | 處理或判斷邏輯 (Process / Decision Logic) | 輸出資料 (Output Data) | 資料去向 (Data Destination) | 狀態變化 (Status Transition) | 對應需求 (Req ID) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T-01** | 一般社員 | 學號、姓名、方案選項 | 系統接收輸入，將學號中的英文字母轉大寫，並驗證必填欄位。 | 大寫學號、姓名、金額（500/900） | 頁面暫存資料 | 無 | FR-01 |
| **T-02** | 系統 | 學號、LocalStorage 預約列表 | 檢查該學號是否在 LocalStorage 中已存在「已繳費」或「待繳費」的記錄（一人一預約限制）。 | 檢查結果（Pass/Block） | 預約表單控制器 | 無 | BR-02 |
| **T-03** | 系統 | 預約表單資料、目前系統模擬日期 | 產生隨機 3 位數，格式化組裝 `RES-YYYYMMDD-三位隨機數` 流水號，寫入欄位。 | 完整預約主資料 (Reservation Record) | LocalStorage (tku_guitar_reservations) | `無` → `待繳費` | FR-02, DR-01 |
| **T-04** | 財務幹部 | 搜尋關鍵字（學號/姓名/預約號）、篩選狀態值 | 讀取 LocalStorage 預約列表，以輸入文字進行模糊搜尋（Array.filter 配合 String.includes）。 | 過濾後的預約列表 (Filtered list) | 財務後台表格視圖 | 無 | FR-03 |
| **T-05** | 財務幹部 | 新方案選項（半年/一年）、預約編號 | 財務臨時於櫃檯切換下拉選單，重算對應金額，並直接寫入 LocalStorage。 | 更新方案後的預約資料 (Updated Scheme/Amount) | LocalStorage (tku_guitar_reservations) | 無 | FR-08 |
| **T-06** | 財務幹部 | 預約編號、經辦人姓名（林同學）、收款系統時間 | 現場收取現金後，一鍵確認，自動開立收據。組裝秒級付款時間戳記。 | 電子收據資料 (Receipt Record) 與更新狀態的預約 | LocalStorage (tku_guitar_reservations) | `待繳費` → `已繳費` | FR-04, FR-05, DR-02 |
| **T-07** | 財務幹部 | 預約編號、作廢經辦人（林同學）、作廢系統時間 | 針對已繳費項目，點選作廢，組裝作廢時間戳記，將實收金額歸零，排除核銷效力。 | 已作廢預約資料 (Voided Record) | LocalStorage (tku_guitar_reservations) | `已繳費` → `已作廢` | BR-03, DR-02 |
| **T-08** | 社員/財務 | 查詢學號 | 讀取 LocalStorage 預約列表，由學號反向尋找該社員的最新一筆資料，並比對其狀態。 | 電子收據憑證頁面（若已繳）或狀態警示訊息（待繳/逾期/取消/作廢） | 收據查驗渲染區 | 無 (若已作廢，收據浮水印改為 VOIDED) | FR-07, DR-02 |
| **T-09** | 系統 | LocalStorage 預約列表、模擬系統日期 | 當日期模擬器變更時，自動循環掃描。若 dateCreated 與模擬日期相差 > 7 天，狀態改為逾期。 | 已逾期預約資料 (Overdue Records) | LocalStorage (tku_guitar_reservations) | `待繳費` → `已逾期` | BR-01, DR-03 |
| **T-10** | 社長 | LocalStorage 預約列表 | 讀取全部預約，計算繳費率 `Paid / (Paid + Pending)`，實收總額與待收總額，排除逾期與作廢。 | 看板指標數值、已繳/待繳/逾期與作廢四大名冊 | 社長後台儀表板 | 無 | FR-06, BR-01 |
