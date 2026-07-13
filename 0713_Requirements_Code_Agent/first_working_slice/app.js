// TKU Guitar SAD System JavaScript Logic

// 1. Initial Mock Data (20 records)
const initialReservations = [
    { reservationId: "RES-20260705-412", studentId: "D1120001", name: "張志明", scheme: "full", amount: 900, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/6 下午2:14:15", dateCreated: "2026-07-05" },
    { reservationId: "RES-20260705-182", studentId: "D1120002", name: "王雅婷", scheme: "half", amount: 500, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/6 下午2:30:22", dateCreated: "2026-07-05" },
    { reservationId: "RES-20260706-953", studentId: "D1120003", name: "李家豪", scheme: "full", amount: 900, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/7 上午10:15:30", dateCreated: "2026-07-06" },
    { reservationId: "RES-20260706-204", studentId: "D1120004", name: "陳怡君", scheme: "half", amount: 500, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/7 上午11:02:11", dateCreated: "2026-07-06" },
    { reservationId: "RES-20260707-611", studentId: "D1120005", name: "林俊傑", scheme: "full", amount: 900, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/8 下午4:45:00", dateCreated: "2026-07-07" },
    { reservationId: "RES-20260708-302", studentId: "D1120006", name: "黃淑芬", scheme: "half", amount: 500, status: "已繳費", handler: "財務幹部 林同學", timestamp: "2026/7/9 上午9:50:18", dateCreated: "2026-07-08" },
    
    { reservationId: "RES-20260710-881", studentId: "D1120007", name: "張美麗", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-10" },
    { reservationId: "RES-20260710-549", studentId: "D1120008", name: "李小龍", scheme: "half", amount: 500, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-10" },
    { reservationId: "RES-20260711-209", studentId: "D1120009", name: "吳宗憲", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-11" },
    { reservationId: "RES-20260711-667", studentId: "D1120010", name: "蔡依林", scheme: "half", amount: 500, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-11" },
    { reservationId: "RES-20260712-403", studentId: "D1120011", name: "周杰倫", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-12" },
    { reservationId: "RES-20260712-192", studentId: "D1120012", name: "許瑋倫", scheme: "half", amount: 500, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-12" },
    { reservationId: "RES-20260712-588", studentId: "D1120013", name: "羅志祥", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-12" },
    { reservationId: "RES-20260713-717", studentId: "D1120014", name: "蔡同學", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-13" },
    { reservationId: "RES-20260713-339", studentId: "D1120015", name: "林志玲", scheme: "half", amount: 500, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-13" },
    { reservationId: "RES-20260713-909", studentId: "D1120016", name: "彭于晏", scheme: "full", amount: 900, status: "待繳費", handler: "", timestamp: "", dateCreated: "2026-07-13" },
    
    { reservationId: "RES-20260620-112", studentId: "D1120017", name: "王大陸", scheme: "full", amount: 900, status: "已逾期", handler: "", timestamp: "", dateCreated: "2026-06-20" },
    { reservationId: "RES-20260621-394", studentId: "D1120018", name: "曾莞婷", scheme: "half", amount: 500, status: "已逾期", handler: "", timestamp: "", dateCreated: "2026-06-21" },
    { reservationId: "RES-20260622-601", studentId: "D1120019", name: "柯震東", scheme: "full", amount: 900, status: "已逾期", handler: "", timestamp: "", dateCreated: "2026-06-22" },
    { reservationId: "RES-20260623-745", studentId: "D1120020", name: "賈靜雯", scheme: "half", amount: 500, status: "已逾期", handler: "", timestamp: "", dateCreated: "2026-06-23" }
];

// Helper to load/save LocalStorage data
function getReservations() {
    let data = localStorage.getItem('tku_guitar_reservations');
    if (!data) {
        localStorage.setItem('tku_guitar_reservations', JSON.stringify(initialReservations));
        return initialReservations;
    }
    return JSON.parse(data);
}

function saveReservations(reservations) {
    localStorage.setItem('tku_guitar_reservations', JSON.stringify(reservations));
}

// Global Filter and Search States
let currentFilter = 'all';
let searchQuery = '';

// 2. Initialize Application on Load
document.addEventListener('DOMContentLoaded', () => {
    getReservations(); // Trigger initialization
    initTabs();
    updateAmount(500); // Set default selection amount
    
    // Member student ID listener to automatically look up active reservation
    const studentIdInput = document.getElementById('member-student-id');
    if (studentIdInput) {
        studentIdInput.addEventListener('input', () => {
            lookupActiveReservation(studentIdInput.value.trim());
        });
    }

    // Refresh Officer Table & President View initially
    renderOfficerTable();
    renderPresidentDashboard();
});

// 3. Tab Switcher Logic
function initTabs() {
    const buttons = document.querySelectorAll('.role-btn');
    const panels = document.querySelectorAll('.view-panel');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Refresh views on switch
            if (targetTab === 'officer-view') {
                renderOfficerTable();
            } else if (targetTab === 'president-view') {
                renderPresidentDashboard();
            } else if (targetTab === 'member-view') {
                const currentId = document.getElementById('member-student-id').value.trim();
                lookupActiveReservation(currentId);
            }
        });
    });
}

// 4. Toast Notifications
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';
    if (isError) {
        toast.classList.add('error');
    }
    
    // Force show
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// 5. Member View Operations
function updateAmount(price) {
    const summary = document.getElementById('summary-amount');
    if (summary) {
        summary.textContent = `NT$ ${price}`;
    }
}

// Check if student already has a reservation
function lookupActiveReservation(studentId) {
    const noResState = document.getElementById('no-reservation-state');
    const activeResState = document.getElementById('active-reservation-state');
    
    if (!studentId) {
        noResState.classList.remove('hidden');
        activeResState.classList.add('hidden');
        return;
    }
    
    const reservations = getReservations();
    const res = reservations.find(r => r.studentId.toUpperCase() === studentId.toUpperCase());
    
    if (res) {
        noResState.classList.add('hidden');
        activeResState.classList.remove('hidden');
        
        document.getElementById('member-res-id').textContent = res.reservationId;
        document.getElementById('member-res-scheme').textContent = res.scheme === 'full' ? '一年期社費' : '半年期社費';
        document.getElementById('member-res-amount').textContent = `NT$ ${res.amount}`;
        document.getElementById('member-res-date').textContent = res.dateCreated;
        
        // Update badge status
        const badge = document.getElementById('member-badge');
        badge.textContent = res.status;
        badge.setAttribute('data-status', res.status);
        badge.className = `badge ${res.status === '已繳費' ? 'paid' : (res.status === '待繳費' ? 'pending' : 'overdue')}`;
        
        // Update instructions and button visibility
        const alertBox = document.getElementById('member-info-alert');
        const instructionText = document.getElementById('member-instruction-text');
        const viewReceiptBtn = document.getElementById('view-my-receipt-btn');
        
        if (res.status === '已繳費') {
            alertBox.style.background = 'rgba(16, 185, 129, 0.08)';
            alertBox.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            instructionText.innerHTML = `<strong>付款已確認！</strong> 您的社費已於 ${res.timestamp} 由 ${res.handler} 收取。`;
            viewReceiptBtn.classList.remove('hidden');
            viewReceiptBtn.onclick = () => {
                // Switch to Receipt Tab and query
                const receiptTabBtn = document.querySelector('[data-tab="receipt-view"]');
                document.getElementById('query-student-id').value = res.studentId;
                receiptTabBtn.click();
                queryReceipt();
            };
        } else if (res.status === '已逾期') {
            alertBox.style.background = 'rgba(239, 68, 68, 0.08)';
            alertBox.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            instructionText.innerHTML = `<strong>此預約已逾期！</strong> 超過 7 天未付款，請聯絡財務幹部或重新送出預約登記。`;
            viewReceiptBtn.classList.add('hidden');
        } else {
            // Pending Payment
            alertBox.style.background = 'rgba(56, 189, 248, 0.08)';
            alertBox.style.borderColor = 'rgba(56, 189, 248, 0.15)';
            instructionText.textContent = `請於 7 天內前往社課現場繳納現金給財務幹部，逾期預約將會自動失效。`;
            viewReceiptBtn.classList.add('hidden');
        }
    } else {
        noResState.classList.remove('hidden');
        activeResState.classList.add('hidden');
    }
}

function handleReservationSubmit(event) {
    event.preventDefault();
    
    const studentIdInput = document.getElementById('member-student-id');
    const nameInput = document.getElementById('member-name');
    const schemeRadio = document.querySelector('input[name="payment-scheme"]:checked');
    
    const studentId = studentIdInput.value.trim().toUpperCase();
    const name = nameInput.value.trim();
    const scheme = schemeRadio.value;
    const amount = scheme === 'full' ? 900 : 500;
    
    if (!studentId || !name) {
        showToast("學號與姓名皆為必填！", true);
        return;
    }
    
    const reservations = getReservations();
    
    // Check if student already has a reservation
    const existingIndex = reservations.findIndex(r => r.studentId.toUpperCase() === studentId);
    
    if (existingIndex !== -1) {
        // If already paid, reject
        if (reservations[existingIndex].status === '已繳費') {
            showToast("您已完成社費繳納，無須重複預約！", true);
            return;
        }
        // If pending, ask or overwrite
        if (confirm(`學號 ${studentId} 已有未繳費的預約。點擊確定將會覆蓋舊預約並重新計時！`)) {
            reservations.splice(existingIndex, 1);
        } else {
            return;
        }
    }
    
    // Generate new unique ID
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(100 + Math.random() * 900); // 3 digits
    const reservationId = `RES-${dateStr}-${randomNum}`;
    const dateCreated = today.toISOString().slice(0, 10);
    
    const newRes = {
        reservationId: reservationId,
        studentId: studentId,
        name: name,
        scheme: scheme,
        amount: amount,
        status: "待繳費",
        handler: "",
        timestamp: "",
        dateCreated: dateCreated
    };
    
    reservations.push(newRes);
    saveReservations(reservations);
    
    showToast("繳費預約已成功送出！請記下您的預約編號。");
    
    // Lookup state card
    lookupActiveReservation(studentId);
}

// 6. Officer View Operations (Fuzzy Search & Confirm)
function handleSearch() {
    searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    renderOfficerTable();
}

function setFilter(filterType) {
    currentFilter = filterType;
    
    // Update filter active class
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === filterType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderOfficerTable();
}

function renderOfficerTable() {
    const tableBody = document.getElementById('reservations-table-body');
    if (!tableBody) return;
    
    const reservations = getReservations();
    
    // Filter & Search Logic
    const filtered = reservations.filter(r => {
        // Status filter
        if (currentFilter !== 'all' && r.status !== currentFilter) {
            return false;
        }
        
        // Search query
        if (searchQuery) {
            const matchId = r.reservationId.toLowerCase().includes(searchQuery);
            const matchStudent = r.studentId.toLowerCase().includes(searchQuery);
            const matchName = r.name.toLowerCase().includes(searchQuery);
            return matchId || matchStudent || matchName;
        }
        
        return true;
    });
    
    // Sort so Pending Payment is at the top
    filtered.sort((a, b) => {
        if (a.status === '待繳費' && b.status !== '待繳費') return -1;
        if (a.status !== '待繳費' && b.status === '待繳費') return 1;
        return b.dateCreated.localeCompare(a.dateCreated);
    });

    tableBody.innerHTML = '';
    
    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                    查無符合條件的繳費預約記錄
                </td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(r => {
        const tr = document.createElement('tr');
        
        const badgeClass = r.status === '已繳費' ? 'paid' : (r.status === '待繳費' ? 'pending' : 'overdue');
        const actionHtml = r.status === '待繳費' ? 
            `<button class="btn-action btn-confirm" onclick="confirmPayment('${r.reservationId}')">
                <i class="fa-solid fa-check"></i> 一鍵確認
             </button>` : 
            `<span class="badge ${badgeClass}">${r.status}</span>`;
            
        tr.innerHTML = `
            <td class="font-mono" style="font-weight: 500; font-size: 0.85rem;">${r.reservationId}</td>
            <td class="font-mono">${r.studentId}</td>
            <td style="font-weight: 600;">${r.name}</td>
            <td>${r.scheme === 'full' ? '一年期社費' : '半年期社費'}</td>
            <td class="text-highlight">NT$ ${r.amount}</td>
            <td style="font-size: 0.8rem; color: var(--text-secondary);">${r.dateCreated}</td>
            <td><span class="badge ${badgeClass}">${r.status}</span></td>
            <td style="text-align: center;">${actionHtml}</td>
        `;
        
        tableBody.appendChild(tr);
    });
}

function confirmPayment(resId) {
    const reservations = getReservations();
    const index = reservations.findIndex(r => r.reservationId === resId);
    
    if (index !== -1) {
        const today = new Date();
        // Custom localized date time string
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const timestampStr = today.toLocaleString('zh-TW', options);
        
        reservations[index].status = '已繳費';
        reservations[index].handler = '財務幹部 林同學';
        reservations[index].timestamp = timestampStr;
        
        saveReservations(reservations);
        showToast(`已成功確認 [${reservations[index].name}] 收款！電子收據已開立。`);
        
        renderOfficerTable();
        renderPresidentDashboard();
    } else {
        showToast("確認收款失敗：找不到預約記錄！", true);
    }
}

// 7. President View Dashboard Operations
function renderPresidentDashboard() {
    const reservations = getReservations();
    
    // Filter out Overdue data from paid rate denominator or count it as unpaid?
    // Formula: paymentRate = (Paid / Total) * 100
    const totalCount = reservations.length;
    const paidReservations = reservations.filter(r => r.status === '已繳費');
    const pendingReservations = reservations.filter(r => r.status === '待繳費');
    const overdueReservations = reservations.filter(r => r.status === '已逾期');
    
    const paidCount = paidReservations.length;
    const pendingCount = pendingReservations.length;
    const overdueCount = overdueReservations.length;
    
    // 1. Calculate overall payment rate (rounded)
    const paymentRateVal = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
    
    document.getElementById('president-payment-rate').textContent = `${paymentRateVal}%`;
    document.getElementById('payment-progress-bar').style.width = `${paymentRateVal}%`;
    
    // 2. Sum amounts (Exclude OVERDUE from real income / and estimate pending income)
    const totalPaidSum = paidReservations.reduce((sum, r) => sum + r.amount, 0);
    const totalPendingSum = pendingReservations.reduce((sum, r) => sum + r.amount, 0);
    
    document.getElementById('president-total-paid').textContent = `NT$ ${totalPaidSum.toLocaleString()}`;
    document.getElementById('president-total-pending').textContent = `NT$ ${totalPendingSum.toLocaleString()}`;
    document.getElementById('president-total-overdue').textContent = `${overdueCount} 人`;
    
    // 3. Render lists
    const paidListContainer = document.getElementById('president-paid-list');
    const unpaidListContainer = document.getElementById('president-unpaid-list');
    
    if (paidListContainer) {
        paidListContainer.innerHTML = '';
        if (paidCount === 0) {
            paidListContainer.innerHTML = `<div class="empty-state"><i class="fa-regular fa-folder"></i><p>尚無已繳款社員資料</p></div>`;
        } else {
            // Sort by payment timestamp (desc)
            const sortedPaid = [...paidReservations].sort((a,b) => b.timestamp.localeCompare(a.timestamp));
            sortedPaid.forEach(r => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div class="item-left">
                        <span class="item-name">${r.name} (${r.studentId})</span>
                        <span class="item-sub"><i class="fa-solid fa-user-check"></i> 經辦：${r.handler}</span>
                        <span class="item-sub"><i class="fa-solid fa-clock"></i> 時間：${r.timestamp}</span>
                    </div>
                    <div class="item-right">
                        <span class="item-price text-purple">NT$ ${r.amount}</span>
                        <span class="badge paid">已繳費</span>
                    </div>
                `;
                paidListContainer.appendChild(item);
            });
        }
    }
    
    if (unpaidListContainer) {
        unpaidListContainer.innerHTML = '';
        const unpaidAndOverdue = [...pendingReservations, ...overdueReservations];
        
        if (unpaidAndOverdue.length === 0) {
            unpaidListContainer.innerHTML = `<div class="empty-state"><i class="fa-regular fa-face-smile"></i><p>全體已繳費！無未繳名冊</p></div>`;
        } else {
            // Sort by status, then date created
            unpaidAndOverdue.sort((a,b) => {
                if (a.status === '待繳費' && b.status !== '待繳費') return -1;
                if (a.status !== '待繳費' && b.status === '待繳費') return 1;
                return b.dateCreated.localeCompare(a.dateCreated);
            });
            
            unpaidAndOverdue.forEach(r => {
                const item = document.createElement('div');
                item.className = 'list-item';
                const badgeClass = r.status === '待繳費' ? 'pending' : 'overdue';
                item.innerHTML = `
                    <div class="item-left">
                        <span class="item-name">${r.name} (${r.studentId})</span>
                        <span class="item-sub"><i class="fa-regular fa-calendar"></i> 預約日期：${r.dateCreated}</span>
                        <span class="item-sub"><i class="fa-solid fa-receipt"></i> 預約單：${r.reservationId}</span>
                    </div>
                    <div class="item-right">
                        <span class="item-price">NT$ ${r.amount}</span>
                        <span class="badge ${badgeClass}">${r.status}</span>
                    </div>
                `;
                unpaidListContainer.appendChild(item);
            });
        }
    }
}

// 8. Electronic Receipt View Queries
function queryReceipt() {
    const studentIdInput = document.getElementById('query-student-id');
    const resultArea = document.getElementById('receipt-result');
    if (!studentIdInput || !resultArea) return;
    
    const queryId = studentIdInput.value.trim().toUpperCase();
    
    if (!queryId) {
        showToast("請輸入欲查驗之學號！", true);
        return;
    }
    
    const reservations = getReservations();
    const res = reservations.find(r => r.studentId.toUpperCase() === queryId);
    
    if (!res) {
        resultArea.innerHTML = `
            <div class="info-alert" style="background: var(--color-red-bg); border-color: rgba(239, 68, 68, 0.25); color: #fee2e2;">
                <i class="fa-solid fa-circle-exclamation" style="color: var(--color-red);"></i>
                <span><strong>查無此學號之預約記錄！</strong> 請確認輸入學號是否有誤，或先前往「一般社員」視窗進行方案預約。</span>
            </div>
        `;
        return;
    }
    
    if (res.status === '待繳費') {
        resultArea.innerHTML = `
            <div class="info-alert" style="background: var(--color-orange-bg); border-color: rgba(245, 158, 11, 0.25); color: #fef3c7;">
                <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-orange);"></i>
                <span><strong>預約尚未完成繳款！</strong> 社員 [${res.name}] 已於 ${res.dateCreated} 預約繳費 (${res.scheme === 'full' ? '一年期社費 900元' : '半年期社費 500元'})，但現場尚未繳納現金給財務幹部。請攜帶現金至社課現場進行一鍵收款確認。</span>
            </div>
        `;
        return;
    }
    
    if (res.status === '已逾期') {
        resultArea.innerHTML = `
            <div class="info-alert" style="background: var(--color-red-bg); border-color: rgba(239, 68, 68, 0.25); color: #fee2e2;">
                <i class="fa-solid fa-circle-xmark" style="color: var(--color-red);"></i>
                <span><strong>該筆繳費預約已逾期作廢！</strong> 社員 [${res.name}] 於 ${res.dateCreated} 預約的方案已超過 7 天未付款，已被系統自動標記為逾期。請重新於一般社員視圖送出預約。</span>
            </div>
        `;
        return;
    }
    
    // If Paid, render receipt ticket
    const receiptNo = `REC-${res.reservationId.replace('RES-', '')}`;
    resultArea.innerHTML = `
        <div class="receipt-ticket">
            <div class="receipt-watermark">PAID</div>
            
            <div class="receipt-header">
                <i class="fa-solid fa-guitar receipt-logo"></i>
                <h3>淡江大學吉他社 電子收據</h3>
                <div class="receipt-no">收據編號：${receiptNo}</div>
            </div>
            
            <div class="receipt-status-badge">
                <span class="badge paid" style="font-size: 0.85rem; padding: 6px 14px;">
                    <i class="fa-solid fa-circle-check"></i> 付款成功
                </span>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-details-list">
                <div class="receipt-row">
                    <span class="lbl">繳費社團</span>
                    <span class="val">淡江大學吉他社 (TKU GUITAR)</span>
                </div>
                <div class="receipt-row">
                    <span class="lbl">繳費學員</span>
                    <span class="val">${res.name} (${res.studentId})</span>
                </div>
                <div class="receipt-row">
                    <span class="lbl">繳費項目</span>
                    <span class="val">${res.scheme === 'full' ? '一年期社費 (全學年活動)' : '半年期社費 (單學期活動)'}</span>
                </div>
                <div class="receipt-row">
                    <span class="lbl">收付方式</span>
                    <span class="val">實體現金收訖</span>
                </div>
                <div class="receipt-row">
                    <span class="lbl">經辦人</span>
                    <span class="val" style="font-weight: 600;"><i class="fa-solid fa-user-shield"></i> ${res.handler}</span>
                </div>
                <div class="receipt-row">
                    <span class="lbl">確認時間</span>
                    <span class="val font-mono" style="font-size: 0.82rem;">${res.timestamp}</span>
                </div>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-total-row">
                <span class="lbl">實收金額</span>
                <span class="val">NT$ ${res.amount} 元整</span>
            </div>
            
            <p class="receipt-footer-text">
                本收據由淡江大學吉他社財務管理系統自動生成，具備評鑑備查效力。<br>
                若有任何帳務疑義，請洽經辦財務人員。
            </p>
            
            <button class="btn btn-secondary btn-block margin-top" onclick="window.print()">
                <i class="fa-solid fa-print"></i> 列印 / 下載收據憑證
            </button>
        </div>
    `;
}
