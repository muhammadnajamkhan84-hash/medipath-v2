// ============================================================
// MediPath — home page logic (index.html)
// Departments data, search, filters, floor guide, popup modal,
// FAQ accordion, theme toggle, appointment form, role banner.
// ============================================================

const $ = (id) => document.getElementById(id);

// ---------------- Department data ----------------
// days: 0 = Sunday ... 6 = Saturday, or 'all' for 24/7 places
const departments = [
  {
    id: "emergency",
    name: "Emergency Department",
    category: "emergency",
    floor: "Ground Floor",
    room: "Room G-01",
    doctor: "Dr. Ayesha Khan (on duty)",
    contact: "042-111-000-001",
    days: "all",
    timing: "Open 24 hours, every day",
    directions: [
      "Come in through the Main Gate — the Emergency entrance is on your left.",
      "Report to the triage counter right inside the entrance.",
      "The attendant will guide you to a bed or the doctor on duty.",
    ],
  },
  {
    id: "reception",
    name: "Reception & Information",
    category: "general",
    floor: "Ground Floor",
    room: "Main Lobby",
    doctor: "Front Desk Team",
    contact: "042-111-000-000",
    days: "all",
    timing: "Open 24 hours, every day",
    directions: [
      "Enter through the Main Gate and walk straight into the lobby.",
      "The reception counter is directly in front of you.",
      "Ask there for token numbers, directions, or general help.",
    ],
  },
  {
    id: "cardiology",
    name: "Cardiology OPD",
    category: "opd",
    floor: "1st Floor",
    room: "Room 104",
    doctor: "Dr. Imran Sheikh",
    contact: "042-111-000-002",
    days: [1, 2, 3, 4, 5, 6],
    timing: "Mon – Sat · 9:00 AM – 2:00 PM",
    hours: { open: "09:00", close: "14:00" },
    directions: [
      "From Reception, take the stairs or lift to the 1st Floor.",
      'Turn right out of the lift — follow the "Cardiology" signs.',
      "Room 104 is the third door on the left. Collect your token at the OPD counter first.",
    ],
  },
  {
    id: "orthopedics",
    name: "Orthopedics OPD",
    category: "opd",
    floor: "1st Floor",
    room: "Room 107",
    doctor: "Dr. Sana Malik",
    contact: "042-111-000-003",
    days: [1, 2, 3, 4, 5, 6],
    timing: "Mon – Sat · 10:00 AM – 3:00 PM",
    hours: { open: "10:00", close: "15:00" },
    directions: [
      "From Reception, take the stairs or lift to the 1st Floor.",
      "Turn left out of the lift and walk past Cardiology.",
      "Room 107 is at the end of the corridor, next to the plaster room.",
    ],
  },
  {
    id: "pathology",
    name: "Pathology Lab",
    category: "laboratory",
    floor: "Ground Floor",
    room: "Room G-12",
    doctor: "Lab Services",
    contact: "042-111-000-004",
    days: [1, 2, 3, 4, 5, 6],
    timing: "Mon – Sat · 8:00 AM – 8:00 PM",
    hours: { open: "08:00", close: "20:00" },
    directions: [
      "From the Main Gate, walk past Reception toward the left wing.",
      'Follow the "Laboratory" signs down the corridor.',
      "Room G-12 is on your right. Take a token from the dispenser outside.",
    ],
  },
  {
    id: "radiology",
    name: "Radiology & X-Ray",
    category: "laboratory",
    floor: "Ground Floor",
    room: "Room G-15",
    doctor: "Imaging Department",
    contact: "042-111-000-005",
    days: "all",
    timing: "Open 24 hours, every day",
    directions: [
      "From the Main Gate, walk past Reception toward the left wing.",
      "Go past the Pathology Lab — Radiology is two doors ahead.",
      "Room G-15. For X-Ray report directly; for ultrasound, book at the counter first.",
    ],
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    category: "general",
    floor: "Ground Floor",
    room: "Shop G-20",
    doctor: "Pharmacy Counter",
    contact: "042-111-000-006",
    days: [1, 2, 3, 4, 5, 6],
    timing: "Mon – Sat · 9:00 AM – 9:00 PM",
    hours: { open: "09:00", close: "21:00" },
    directions: [
      "Exit the main lobby toward the parking side.",
      "The pharmacy shop is right next to the exit gate.",
      "Show your prescription at the counter window.",
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics Ward",
    category: "ward",
    floor: "2nd Floor",
    room: "Ward P-2",
    doctor: "Dr. Bilal Ahmed",
    contact: "042-111-000-007",
    days: "all",
    timing: "Visiting: 10:00 AM – 8:00 PM (daily)",
    hours: { open: "10:00", close: "20:00" },
    directions: [
      "From Reception, take the lift to the 2nd Floor.",
      "Turn right — the Pediatrics Ward is the first ward on the corridor.",
      "Check in at the ward nursing station before visiting.",
    ],
  },
  {
    id: "male-ward",
    name: "Male General Ward",
    category: "ward",
    floor: "2nd Floor",
    room: "Ward M-1",
    doctor: "Dr. Farhan Iqbal",
    contact: "042-111-000-008",
    days: "all",
    timing: "Visiting: 10:00 AM – 8:00 PM (daily)",
    hours: { open: "10:00", close: "20:00" },
    directions: [
      "From Reception, take the lift to the 2nd Floor.",
      "Walk straight past the nursing station.",
      "Ward M-1 is on the left side of the corridor.",
    ],
  },
  {
    id: "female-ward",
    name: "Female General Ward",
    category: "ward",
    floor: "2nd Floor",
    room: "Ward F-1",
    doctor: "Dr. Nadia Tariq",
    contact: "042-111-000-009",
    days: "all",
    timing: "Visiting: 10:00 AM – 8:00 PM (daily)",
    hours: { open: "10:00", close: "20:00" },
    directions: [
      "From Reception, take the lift to the 2nd Floor.",
      "Walk straight past the nursing station.",
      "Ward F-1 is on the right side of the corridor.",
    ],
  },
  {
    id: "maternity",
    name: "Maternity Ward",
    category: "ward",
    floor: "3rd Floor",
    room: "Ward MT-1",
    doctor: "Dr. Saima Raza",
    contact: "042-111-000-010",
    days: "all",
    timing: "Visiting: 10:00 AM – 8:00 PM (daily)",
    hours: { open: "10:00", close: "20:00" },
    directions: [
      "From Reception, take the lift to the 3rd Floor.",
      'Follow the "Maternity" signs to the left.',
      "Ward MT-1 — please keep noise low in this wing.",
    ],
  },
  {
    id: "icu",
    name: "Intensive Care Unit (ICU)",
    category: "ward",
    floor: "3rd Floor",
    room: "ICU-1",
    doctor: "Dr. Kamran Shah",
    contact: "042-111-000-011",
    days: "all",
    timing: "Visits: 5:00 PM – 6:00 PM only",
    hours: { open: "17:00", close: "18:00" },
    directions: [
      "From Reception, take the lift to the 3rd Floor.",
      "Turn right and walk to the end — the ICU has glass doors.",
      "Only one visitor at a time, and only during visiting hours.",
    ],
  },
];

const categoryLabels = {
  emergency: "Emergency",
  laboratory: "Laboratory",
  ward: "Ward",
  opd: "OPD",
  general: "General",
};

const today = new Date().getDay(); // 0 = Sunday

function isOpenToday(dept) {
  return dept.days === "all" || dept.days.includes(today);
}

// true only if the department is open at this exact moment,
// using the visitor's own clock (no server needed)
function isOpenNow(dept) {
  const now = new Date();
  const day = now.getDay();
  const dayOpen =
    dept.days === "all" ||
    (Array.isArray(dept.days) && dept.days.includes(day));
  if (!dayOpen) return false;
  if (!dept.hours) return true; // 24/7 departments have no hours field
  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= toMin(dept.hours.open) && mins < toMin(dept.hours.close);
}

// small helper used on cards and in the popup
function openStatusHtml(dept) {
  const open = isOpenNow(dept);
  return `<p class="dept-status ${open ? "open" : "closed"}"><span class="open-dot"></span>${open ? "Open now" : "Closed"}</p>`;
}

// keep user-typed names safe when we inject them into the page
function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

// ---------------- Department cards ----------------
const deptGrid = $("deptGrid");

function deptCard(dept) {
  const open = isOpenToday(dept);
  return `
    <article class="dept-card ${dept.category}" data-id="${dept.id}" tabindex="0" role="button"
             aria-label="View details for ${escapeHtml(dept.name)}">
      <h3>${escapeHtml(dept.name)}</h3>
      <p>${escapeHtml(dept.floor)} · ${escapeHtml(dept.room)}</p>
      <p>${escapeHtml(dept.doctor)}</p>
      <p>${escapeHtml(dept.timing)}</p>
      ${openStatusHtml(dept)}
      <span class="tag">${categoryLabels[dept.category]}</span><br>
      <span class="badge ${open ? "open" : "closed"}">${open ? "● Open today" : "● Closed today"}</span>
    </article>`;
}

function renderDepartments(list) {
  if (!list.length) {
    deptGrid.innerHTML =
      '<div class="no-results">No departments match your search. Try a different name, room, or doctor.</div>';
    return;
  }
  deptGrid.innerHTML = list.map(deptCard).join("");

  deptGrid.querySelectorAll(".dept-card").forEach((card) => {
    const open = () =>
      openModal(departments.find((d) => d.id === card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

// ---------------- Filters ----------------
$("filterBar").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");

  const cat = btn.dataset.category;
  if (cat === "all") renderDepartments(departments);
  else if (cat === "today") renderDepartments(departments.filter(isOpenToday));
  else if (cat === "open-now") renderDepartments(departments.filter(isOpenNow));
  else renderDepartments(departments.filter((d) => d.category === cat));
});

// ---------------- Search ----------------
function runSearch() {
  const q = $("searchInput").value.trim().toLowerCase();
  if (!q) {
    renderDepartments(departments);
    return;
  }

  const hits = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.doctor.toLowerCase().includes(q) ||
      d.room.toLowerCase().includes(q),
  );
  renderDepartments(hits);
  $("departments").scrollIntoView({ behavior: "smooth" });
}

$("searchBtn").addEventListener("click", runSearch);
$("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

// quick access shortcuts in the hero
$("quickEmergency").addEventListener("click", () =>
  openModal(departments.find((d) => d.id === "emergency")),
);
$("quickReception").addEventListener("click", () =>
  openModal(departments.find((d) => d.id === "reception")),
);

// ---------------- Voice search (Web Speech API) ----------------
(function initVoiceSearch() {
  const micBtn = $("micBtn");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    micBtn.disabled = true;
    micBtn.title = "Voice search is not supported in this browser";
    return;
  }
  micBtn.addEventListener("click", () => {
    const rec = new SR();
    rec.lang = "en-US";
    micBtn.classList.add("listening");
    micBtn.textContent = "🔴";
    rec.onresult = (e) => {
      $("searchInput").value = e.results[0][0].transcript;
      runSearch();
    };
    const resetMic = () => {
      micBtn.classList.remove("listening");
      micBtn.textContent = "🎤";
    };
    rec.onend = resetMic;
    rec.onerror = resetMic;
    try {
      rec.start();
    } catch {
      /* already listening */
    }
  });
})();

// ---------------- Floor guide ----------------
function renderFloor(floorName) {
  const onFloor = departments.filter((d) => d.floor === floorName);
  const box = $("floorMap");

  if (!onFloor.length) {
    box.innerHTML = "<p>No departments listed on this floor.</p>";
    return;
  }
  box.innerHTML = onFloor
    .map(
      (d) => `
    <div class="floor-row" data-id="${d.id}" role="button" tabindex="0">
      <span class="floor-row-name">${escapeHtml(d.name)}</span>
      <span class="floor-row-room">${escapeHtml(d.room)} · ${escapeHtml(d.timing)}</span>
    </div>`,
    )
    .join("");

  box.querySelectorAll(".floor-row").forEach((row) => {
    const open = () =>
      openModal(departments.find((d) => d.id === row.dataset.id));
    row.addEventListener("click", open);
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

$("floorPills").addEventListener("click", (e) => {
  const pill = e.target.closest(".floor-pill");
  if (!pill) return;

  document.querySelectorAll(".floor-pill").forEach((p) => {
    p.classList.remove("active");
    p.setAttribute("aria-pressed", "false");
  });
  pill.classList.add("active");
  pill.setAttribute("aria-pressed", "true");
  renderFloor(pill.dataset.floor);
});

// ---------------- Department popup modal ----------------
const overlay = $("modalOverlay");

function openModal(dept) {
  if (!dept) return;
  $("modalCategory").textContent = categoryLabels[dept.category];
  $("modalName").textContent = dept.name;
  $("modalFloor").textContent = `${dept.floor} — ${dept.room}`;
  $("modalDoctor").textContent = dept.doctor;
  $("modalContact").textContent = dept.contact;
  $("modalTiming").textContent = dept.timing;
  $("modalStatus").innerHTML = openStatusHtml(dept);
  $("modalDirections").innerHTML = dept.directions
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");

  // step-by-step navigation always restarts in full-list mode
  navDept = dept;
  setNavMode(false);

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  $("modalClose").focus();
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

$("modalClose").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});

// ---------------- Step-by-step navigation mode ----------------
// Shows one direction at a time with Previous / Next controls.
// navIndex === -1 means the full numbered list is visible.
let navDept = null;
let navIndex = -1;

function showStep() {
  const total = navDept.directions.length;
  $("stepCount").textContent = `Step ${navIndex + 1} of ${total}`;
  $("stepText").textContent = navDept.directions[navIndex];
  $("stepPrevBtn").disabled = navIndex === 0;
  $("stepNextBtn").textContent = navIndex === total - 1 ? "Finish ✓" : "Next →";
}

function setNavMode(on) {
  $("modalDirections").hidden = on;
  $("navStartBtn").hidden = on;
  $("stepNav").hidden = !on;
  navIndex = on ? 0 : -1;
  if (on) showStep();
}

$("navStartBtn").addEventListener("click", () => setNavMode(true));
$("navExitBtn").addEventListener("click", () => setNavMode(false));
$("stepPrevBtn").addEventListener("click", () => {
  if (navIndex > 0) {
    navIndex--;
    showStep();
  }
});
$("stepNextBtn").addEventListener("click", () => {
  if (navIndex < navDept.directions.length - 1) {
    navIndex++;
    showStep();
  } else setNavMode(false); // finished — back to the full list
});

// ---------------- FAQ accordion ----------------
$("faqList").addEventListener("click", (e) => {
  const btn = e.target.closest(".faq-question");
  if (!btn) return;
  const item = btn.parentElement;
  const willOpen = !item.classList.contains("open");

  // close the others — one open at a time
  document.querySelectorAll(".faq-item.open").forEach((i) => {
    i.classList.remove("open");
    i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
  });

  if (willOpen) {
    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
});

// ---------------- Theme toggle (body.dark-mode, remembered) ----------------
const themeBtn = $("themeToggle");

function applyTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");
  try {
    localStorage.setItem("medipath_theme", mode);
  } catch {
    /* private mode etc. */
  }
  themeBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  themeBtn.textContent = mode === "dark" ? "☀️ Light" : "🌙 Dark";
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("medipath_theme") || "light";
} catch {
  /* ignore */
}
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});

// ---------------- Emergency mode ----------------
// Hides the filter bar and shows only emergency departments (see style.css)
$("emergencyModeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const on = document.body.classList.toggle("emergency-mode");

  // reset the filter pills back to "All" for when the mode is turned off
  document.querySelectorAll(".filter-btn").forEach((b) => {
    const isAll = b.dataset.category === "all";
    b.classList.toggle("active", isAll);
    b.setAttribute("aria-pressed", isAll ? "true" : "false");
  });

  renderDepartments(
    on ? departments.filter((d) => d.category === "emergency") : departments,
  );
  $("departments").scrollIntoView({ behavior: "smooth" });
});

// ---------------- Appointment form ----------------
const apptDept = $("apptDept");
departments.forEach((d) => {
  const opt = document.createElement("option");
  opt.value = d.id;
  opt.textContent = d.name;
  apptDept.appendChild(opt);
});

// don't let people pick a date in the past
$("apptDate").min = new Date().toISOString().split("T")[0];

// ---------------- Appointment tokens (saved on this device) ----------------
function makeToken() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `MP-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem("medipath_appointments")) || [];
  } catch {
    return [];
  }
}

function saveBookings(list) {
  try {
    localStorage.setItem("medipath_appointments", JSON.stringify(list));
  } catch {
    /* private mode etc. */
  }
}

function renderBookings() {
  const box = $("apptList");
  const list = getBookings();

  if (!list.length) {
    box.innerHTML =
      '<p class="no-bookings">No appointments yet. Book one with the form above — your token will appear here.</p>';
    return;
  }

  box.innerHTML = list
    .map(
      (b) => `
    <div class="appt-item">
      <div>
        <span class="token-badge">${escapeHtml(b.token)}</span>
        <p><strong>${escapeHtml(b.deptName)}</strong> · ${escapeHtml(b.date)}</p>
        <p class="muted">${escapeHtml(b.name)} · ${escapeHtml(b.phone)}</p>
      </div>
      <button type="button" class="cancel-btn" data-token="${escapeHtml(b.token)}">Cancel</button>
    </div>`,
    )
    .join("");

  box.querySelectorAll(".cancel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      saveBookings(getBookings().filter((b) => b.token !== btn.dataset.token));
      renderBookings();
    });
  });
}

$("apptForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("apptName").value.trim();
  const phone = $("apptPhone").value.trim();
  const dept = departments.find((d) => d.id === apptDept.value);
  const date = $("apptDate").value;
  const token = makeToken();

  const list = getBookings();
  list.unshift({
    token,
    name,
    phone,
    deptName: dept.name,
    date,
    createdAt: new Date().toISOString(),
  });
  saveBookings(list);
  renderBookings();

  const msg = $("apptConfirmation");
  msg.innerHTML = `Thank you, ${escapeHtml(name)}! Your token number is <span class="token-badge">${token}</span><br>Show this token at the reception for your ${escapeHtml(dept.name)} visit on ${escapeHtml(date)}.`;
  msg.classList.add("show");
  e.target.reset();
  msg.scrollIntoView({ behavior: "smooth", block: "center" });
});

// ---------------- Role banner (from the login page) ----------------
(function showRoleBanner() {
  const banner = $("roleBanner");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("medipath_user"));
  } catch {
    /* corrupted data */
  }

  if (user && user.name) {
    // visitAs = why they're here today (chosen on the login page);
    // role = their account type. Prefer the visit purpose for the greeting.
    const purpose = user.visitAs || user.role;
    const roleText =
      {
        visitor: "a visitor",
        checkup: "here for a regular checkup",
        patient: "a patient",
        admin: "an administrator",
        doctor: "a doctor",
        staff: "a staff member",
      }[purpose] || "a visitor";
    banner.innerHTML = `Welcome back, <strong>${escapeHtml(user.name)}</strong> — you're browsing as ${roleText}.`;
  } else {
    banner.innerHTML = `Welcome to MediPath — <a href="login.html">log in</a> for a personalized visit guide.`;
  }
  banner.classList.add("show");
})();

// ---------------- Logout ----------------
// Clears the saved login and sends the user back to the login page.
$("logoutBtn").addEventListener("click", () => {
  try {
    localStorage.removeItem("medipath_user");
  } catch {
    /* ignore */
  }
  location.replace("login.html");
});

// ---------------- first paint ----------------
renderDepartments(departments);
renderBookings();
renderFloor("Ground Floor");
