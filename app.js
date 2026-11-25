/* ============================================================
   ZeTheta — Online Loan Application Portal (Paisabazaar Style)
   ============================================================ */

const funnelState = {
  loanType: "Personal Loan",
  name: "",
  phone: "",
  employment: "Salaried",
  income: 75000,
  loanAmount: 500000,
  purpose: "Personal"
};

const emiState = {
  amount: 500000,
  rate: 10.5,
  tenure: 5,
  unit: "yr" // "yr" or "mo"
};

function formatINR(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

function goHome(e) {
  if (e) e.preventDefault();
  closeFunnel();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileNav() {
  const nav = document.getElementById("mobileNav");
  if (nav) nav.classList.toggle("open");
}

/* ===== APPLICATION FUNNEL ===== */
function openFunnel(loanType) {
  funnelState.loanType = loanType || "Personal Loan";
  const titleEl = document.getElementById("funnelLoanTitle");
  if (titleEl) {
    titleEl.textContent = `${funnelState.loanType} — Up to ₹50 Lakhs @ 9.98% p.a.`;
  }
  showStep(1);
  const overlay = document.getElementById("funnelOverlay");
  if (overlay) overlay.classList.add("open");
}

function closeFunnel() {
  const overlay = document.getElementById("funnelOverlay");
  if (overlay) overlay.classList.remove("open");
}

function closeFunnelOverlay(e) {
  if (e.target && e.target.id === "funnelOverlay") {
    closeFunnel();
  }
}

function showStep(n) {
  document.querySelectorAll(".funnel-step").forEach((el, idx) => {
    el.classList.toggle("active", idx + 1 === n);
  });
}

function nextStep(current) {
  if (current === 1) {
    const nameInput = document.getElementById("userName");
    const phoneInput = document.getElementById("userPhone");
    funnelState.name = (nameInput && nameInput.value.trim()) || "Applicant";
    funnelState.phone = (phoneInput && phoneInput.value.trim()) || "9876543210";
  }
  if (current === 5) {
    updateOffersTable();
  }
  showStep(current + 1);
}

function selectOption(cardEl, field) {
  const parent = cardEl.parentElement;
  parent.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
  cardEl.classList.add("selected");
  const label = cardEl.querySelector(".option-label");
  if (label) funnelState[field] = label.textContent.trim();
}

function updateIncomeDisplay(val) {
  funnelState.income = Number(val);
  const el = document.getElementById("incomeDisplay");
  if (el) el.textContent = formatINR(funnelState.income);
}

function setIncome(val) {
  funnelState.income = val;
  const slider = document.getElementById("incomeSlider");
  if (slider) slider.value = val;
  updateIncomeDisplay(val);
  if (event && event.target && event.target.parentElement) {
    event.target.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    event.target.classList.add("active");
  }
}

function updateLoanAmtDisplay(val) {
  funnelState.loanAmount = Number(val);
  const el = document.getElementById("loanAmtDisplay");
  if (el) el.textContent = formatINR(funnelState.loanAmount);
}

function setLoanAmt(val) {
  funnelState.loanAmount = val;
  const slider = document.getElementById("loanAmtSlider");
  if (slider) slider.value = val;
  updateLoanAmtDisplay(val);
  if (event && event.target && event.target.parentElement) {
    event.target.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    event.target.classList.add("active");
  }
}

function calcMonthlyEMI(P, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0) return P / months;
  const pow = Math.pow(1 + r, months);
  return (P * r * pow) / (pow - 1);
}

function updateOffersTable() {
  const P = funnelState.loanAmount || 500000;
  const months = 60;
  const rates = [10.5, 11.0, 12.0, 13.0, 10.75];
  const emiCells = document.querySelectorAll("#step6 .offers-table tbody .emi");
  emiCells.forEach((cell, idx) => {
    if (rates[idx] !== undefined) {
      cell.textContent = formatINR(calcMonthlyEMI(P, rates[idx], months));
    }
  });
}

function applyNow(lenderName) {
  closeFunnel();
  const lenderEl = document.getElementById("appliedLender");
  const refEl = document.getElementById("refId");
  const modal = document.getElementById("successModal");
  if (lenderEl) lenderEl.textContent = lenderName;
  if (refEl) refEl.textContent = "ZTH-" + Math.floor(100000 + Math.random() * 900000);
  if (modal) modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) modal.classList.remove("open");
}

/* ===== EMI CALCULATOR ===== */
function setBankRate(bank, rate) {
  emiState.rate = rate;
  const input = document.getElementById("emiRateInput");
  const slider = document.getElementById("emiRateSlider");
  if (input) input.value = rate;
  if (slider) slider.value = rate;
  document.querySelectorAll(".bank-chip").forEach(chip => {
    chip.classList.toggle("active", chip.textContent.trim() === bank);
  });
  recalculateEMI();
}

function setEmiAmount(val) {
  emiState.amount = val;
  const input = document.getElementById("emiAmountInput");
  const slider = document.getElementById("emiAmountSlider");
  if (input) input.value = val;
  if (slider) slider.value = val;
  if (event && event.target && event.target.parentElement) {
    event.target.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    event.target.classList.add("active");
  }
  recalculateEMI();
}

function syncEmiFromInput(field) {
  if (field === "amount") {
    const val = Math.max(5000, Math.min(10000000, Number(document.getElementById("emiAmountInput").value) || 500000));
    emiState.amount = val;
    document.getElementById("emiAmountSlider").value = val;
  } else if (field === "rate") {
    const val = Math.max(8, Math.min(30, Number(document.getElementById("emiRateInput").value) || 10.5));
    emiState.rate = val;
    document.getElementById("emiRateSlider").value = val;
  } else if (field === "tenure") {
    const maxVal = emiState.unit === "yr" ? 7 : 84;
    const val = Math.max(1, Math.min(maxVal, Number(document.getElementById("emiTenureInput").value) || 1));
    emiState.tenure = val;
    document.getElementById("emiTenureSlider").value = val;
  }
  recalculateEMI();
}

function syncEmiFromSlider(field) {
  if (field === "amount") {
    emiState.amount = Number(document.getElementById("emiAmountSlider").value);
    document.getElementById("emiAmountInput").value = emiState.amount;
  } else if (field === "rate") {
    emiState.rate = Number(document.getElementById("emiRateSlider").value);
    document.getElementById("emiRateInput").value = emiState.rate;
  } else if (field === "tenure") {
    emiState.tenure = Number(document.getElementById("emiTenureSlider").value);
    document.getElementById("emiTenureInput").value = emiState.tenure;
  }
  recalculateEMI();
}

function setTenureUnit(unit) {
  if (emiState.unit === unit) return;
  const input = document.getElementById("emiTenureInput");
  const slider = document.getElementById("emiTenureSlider");
  const minmax = slider.nextElementSibling;
  if (unit === "mo") {
    emiState.tenure = Math.min(84, emiState.tenure * 12);
    slider.min = 6;
    slider.max = 84;
    if (minmax) minmax.innerHTML = "<span>6 Mo</span><span>84 Mo</span>";
  } else {
    emiState.tenure = Math.max(1, Math.round(emiState.tenure / 12));
    slider.min = 1;
    slider.max = 7;
    if (minmax) minmax.innerHTML = "<span>1 Yr</span><span>7 Yr</span>";
  }
  emiState.unit = unit;
  input.value = emiState.tenure;
  slider.value = emiState.tenure;
  document.getElementById("toggleYr").classList.toggle("active", unit === "yr");
  document.getElementById("toggleMo").classList.toggle("active", unit === "mo");
  recalculateEMI();
}

function recalculateEMI() {
  const P = emiState.amount;
  const months = emiState.unit === "yr" ? emiState.tenure * 12 : emiState.tenure;
  const emi = calcMonthlyEMI(P, emiState.rate, months);
  const totalPayment = emi * months;
  const totalInterest = Math.max(0, totalPayment - P);

  document.getElementById("emiResult").textContent = formatINR(emi);
  document.getElementById("brkPrincipal").textContent = formatINR(P);
  document.getElementById("brkInterest").textContent = formatINR(totalInterest);
  document.getElementById("brkTotal").textContent = formatINR(totalPayment);

  const pPct = Math.round((P / totalPayment) * 100);
  const iPct = 100 - pPct;
  document.getElementById("splitPrincipal").style.width = pPct + "%";
  document.getElementById("splitInterest").style.width = iPct + "%";
  document.getElementById("splitPLabel").textContent = `Principal ${pPct}%`;
  document.getElementById("splitILabel").textContent = `Interest ${iPct}%`;

  renderAmortisation(P, emiState.rate, months, emi);
}

function renderAmortisation(P, annualRate, months, emi) {
  const tbody = document.getElementById("amortBody");
  if (!tbody) return;
  const r = annualRate / 12 / 100;
  let balance = P;
  const rows = [];
  const totalYears = Math.ceil(months / 12);

  for (let yr = 1; yr <= totalYears; yr++) {
    const opening = balance;
    let yrPrincipal = 0;
    let yrInterest = 0;
    const monthsInYear = yr === totalYears && months % 12 !== 0 ? months % 12 : 12;
    for (let m = 0; m < monthsInYear && balance > 0; m++) {
      const interest = balance * r;
      const principal = Math.min(balance, emi - interest);
      yrInterest += interest;
      yrPrincipal += principal;
      balance = Math.max(0, balance - principal);
    }
    rows.push(`
      <tr>
        <td>Year ${yr}</td>
        <td>${formatINR(opening)}</td>
        <td>${formatINR(yrPrincipal)}</td>
        <td>${formatINR(yrInterest)}</td>
        <td>${formatINR(balance)}</td>
      </tr>
    `);
  }
  tbody.innerHTML = rows.join("");
}

function toggleAmort() {
  const sec = document.getElementById("amortSection");
  const btn = document.querySelector(".amort-toggle");
  if (!sec) return;
  const hidden = sec.style.display === "none";
  sec.style.display = hidden ? "block" : "none";
  if (btn) btn.textContent = hidden ? "Hide Amortisation Schedule ▴" : "View Amortisation Schedule ▾";
}

// Initialize EMI calculator on load
document.addEventListener("DOMContentLoaded", () => {
  recalculateEMI();
});
