/* ==========================================================================
   Nihongo Online Exam — Application Engine
   Supports JLPT (N5/N4/N3), JFT-Basic (A2), and Student/Teacher Role Login
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    PREFS: "nihongo_exam_prefs_v1",
    AUTH: "nihongo_exam_auth_v1",
    SESSION: "nihongo_exam_active_session_v1",
    HISTORY: "nihongo_exam_history_v1",
    CUSTOM_QS: "nihongo_exam_custom_questions_v1"
  };

  const MAX_EXAM_AUDIO_PLAYS = 2;
  const TEACHER_DEMO_PIN = "2026";

  const DATA = window.EXAM_DATA;
  if (!DATA) {
    console.error("EXAM_DATA not found.");
    return;
  }

  /* ========================================================================
     State
     ======================================================================== */
  const state = {
    prefs: {
      furigana: true,
      theme: "light",
      candidateName: ""
    },
    auth: null, // { role: "student"|"teacher", name: string, code: string }
    loginModalRole: "student",
    setup: {
      track: "jlpt",       // "jlpt" | "jft"
      levelId: "N5",       // "N5" | "N4" | "N3" | "JFT-A2"
      mode: "exam",        // "exam" | "study"
      sectionFilter: "all" // "all" | section key
    },
    session: null,
    timerHandle: null,
    audio: {
      speaking: false,
      rate: 1.0,
      voices: [],
      jaVoice: null
    },
    reviewFilter: "all",
    teacherTab: "bank"
  };

  /* ========================================================================
     DOM Helpers & References
     ======================================================================== */
  const $ = (id) => document.getElementById(id);

  const els = {
    viewHome: $("view-home"),
    viewExam: $("view-exam"),
    viewResults: $("view-results"),
    viewTeacher: $("view-teacher"),

    btnBrandHome: $("btn-brand-home"),
    btnHeaderAccount: $("btn-header-account"),
    headerRoleDot: $("header-role-dot"),
    headerAccountLabel: $("header-account-label"),
    btnFurigana: $("btn-furigana"),
    furiganaState: $("furigana-state"),
    btnTheme: $("btn-theme"),
    btnHistory: $("btn-history"),

    resumeBanner: $("resume-banner"),
    resumeTitle: $("resume-title"),
    resumeMeta: $("resume-meta"),
    btnResume: $("btn-resume"),
    btnDiscardResume: $("btn-discard-resume"),

    statAttempts: $("stat-attempts"),
    statBest: $("stat-best"),
    statPassed: $("stat-passed"),

    roleLoginGrid: $("role-login-grid"),
    btnRoleStudent: $("btn-role-student"),
    btnRoleTeacher: $("btn-role-teacher"),
    roleActiveBar: $("role-active-bar"),
    activeRoleBadge: $("active-role-badge"),
    activeUserName: $("active-user-name"),
    activeUserMeta: $("active-user-meta"),
    btnOpenTeacherDash: $("btn-open-teacher-dash"),
    btnSwitchRole: $("btn-switch-role"),
    btnLogout: $("btn-logout"),

    cardTrackJlpt: $("card-track-jlpt"),
    cardTrackJft: $("card-track-jft"),
    jlptLevelSection: $("jlpt-level-section"),
    jftInfoSection: $("jft-info-section"),
    jftOverviewCard: $("jft-overview-card"),
    levelGrid: $("level-grid"),
    sectionFilterGroup: $("section-filter-group"),
    candidateName: $("candidate-name"),
    summaryTitle: $("summary-title"),
    summaryMeta: $("summary-meta"),
    btnStartExam: $("btn-start-exam"),

    examLevelBadge: $("exam-level-badge"),
    examSectionLabel: $("exam-section-label"),
    examTimerWrap: $("exam-timer-wrap"),
    examTimer: $("exam-timer"),
    questionCounter: $("question-counter"),
    btnOpenMap: $("btn-open-map"),
    btnFinishExam: $("btn-finish-exam"),
    examProgressBar: $("exam-progress-bar"),
    examProgressFill: $("exam-progress-fill"),

    qNumBadge: $("q-num-badge"),
    qTypeTag: $("q-type-tag"),
    btnFlag: $("btn-flag"),
    passageContainer: $("passage-container"),
    passageTitle: $("passage-title"),
    passageBody: $("passage-body"),
    btnTogglePassage: $("btn-toggle-passage"),

    audioContainer: $("audio-container"),
    btnAudioPlay: $("btn-audio-play"),
    audioPlayLabel: $("audio-play-label"),
    btnAudioSpeed: $("btn-audio-speed"),
    audioReplays: $("audio-replays"),
    audioVisualizer: $("audio-visualizer"),
    audioStatusNote: $("audio-status-note"),
    btnAudioTranscript: $("btn-audio-transcript"),
    audioTranscriptBody: $("audio-transcript-body"),

    qInstruction: $("q-instruction"),
    qPrompt: $("q-prompt"),
    optionsList: $("options-list"),
    studyFeedback: $("study-feedback"),
    studyFeedbackHeader: $("study-feedback-header"),
    studyFeedbackText: $("study-feedback-text"),

    desktopMapGrid: $("desktop-map-grid"),
    mobileMapGrid: $("mobile-map-grid"),
    sidebarCounts: $("sidebar-counts"),
    btnSidebarSubmit: $("btn-sidebar-submit"),
    btnSubmitFromMap: $("btn-submit-from-map"),

    btnPrev: $("btn-prev"),
    btnBottomMap: $("btn-bottom-map"),
    bottomMapText: $("bottom-map-text"),
    btnNext: $("btn-next"),
    btnNextLabel: $("btn-next-label"),

    resultStamp: $("result-stamp"),
    resultLevelLabel: $("result-level-label"),
    resultHeadline: $("result-headline"),
    resultMeta: $("result-meta"),
    resultScaledScore: $("result-scaled-score"),
    resultScoreMax: $("result-score-max"),
    resultPct: $("result-pct"),
    breakdownGrid: $("breakdown-grid"),
    reviewFilters: $("review-filters"),
    reviewList: $("review-list"),
    btnPrintResult: $("btn-print-result"),
    btnRetake: $("btn-retake"),
    btnHome: $("btn-home"),

    // Teacher view
    teacherWelcome: $("teacher-welcome"),
    btnTeacherToExams: $("btn-teacher-to-exams"),
    teacherTabs: $("teacher-tabs"),
    teacherTabBank: $("teacher-tab-bank"),
    teacherTabCreate: $("teacher-tab-create"),
    teacherTabResults: $("teacher-tab-results"),
    teacherFilterLevel: $("teacher-filter-level"),
    teacherBankCount: $("teacher-bank-count"),
    teacherBankList: $("teacher-bank-list"),
    formAddQuestion: $("form-add-question"),
    tqLevel: $("tq-level"),
    tqSection: $("tq-section"),
    tqType: $("tq-type"),
    tqAnswer: $("tq-answer"),
    tqInstruction: $("tq-instruction"),
    tqPrompt: $("tq-prompt"),
    tqOpt0: $("tq-opt0"),
    tqOpt1: $("tq-opt1"),
    tqOpt2: $("tq-opt2"),
    tqOpt3: $("tq-opt3"),
    tqExplanation: $("tq-explanation"),
    tqFeedback: $("tq-feedback"),
    teacherMetrics: $("teacher-metrics"),
    teacherResultsList: $("teacher-results-list"),

    // Modals
    modalLogin: $("modal-login"),
    modalLoginTitle: $("modal-login-title"),
    formLogin: $("form-login"),
    loginNameLabel: $("login-name-label"),
    loginName: $("login-name"),
    loginCodeLabel: $("login-code-label"),
    loginCode: $("login-code"),
    teacherPinHint: $("teacher-pin-hint"),
    loginError: $("login-error"),
    btnDemoLogin: $("btn-demo-login"),
    btnSubmitLogin: $("btn-submit-login"),

    modalMap: $("modal-map"),
    modalConfirm: $("modal-confirm"),
    confirmSummaryText: $("confirm-summary-text"),
    confirmStats: $("confirm-stats"),
    btnConfirmSubmit: $("btn-confirm-submit"),
    modalHistory: $("modal-history"),
    historyList: $("history-list"),
    btnClearHistory: $("btn-clear-history")
  };

  /* ========================================================================
     Initialization
     ======================================================================== */
  function init() {
    loadPreferences();
    loadAuth();
    applyPreferences();
    applyAuthUI();
    initSpeechSynthesis();
    bindEvents();
    renderHomeView();
  }

  function loadPreferences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.furigana === "boolean") state.prefs.furigana = parsed.furigana;
        if (parsed.theme === "dark" || parsed.theme === "light") state.prefs.theme = parsed.theme;
        if (typeof parsed.candidateName === "string") state.prefs.candidateName = parsed.candidateName;
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        state.prefs.theme = "dark";
      }
    } catch (_) {
      // Ignore storage errors
    }
    els.candidateName.value = state.prefs.candidateName || "";
  }

  function savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(state.prefs));
    } catch (_) {
      // Ignore storage errors
    }
  }

  function applyPreferences() {
    document.documentElement.setAttribute("data-theme", state.prefs.theme);
    document.body.classList.toggle("hide-furigana", !state.prefs.furigana);
    els.btnFurigana.setAttribute("aria-pressed", String(state.prefs.furigana));
    els.furiganaState.textContent = state.prefs.furigana ? "ON" : "OFF";
  }

  /* ========================================================================
     Role-Based Auth (Student & Teacher)
     ======================================================================== */
  function loadAuth() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.role === "student" || parsed.role === "teacher") && parsed.name) {
          state.auth = parsed;
        }
      }
    } catch (_) {
      state.auth = null;
    }
  }

  function saveAuth(authObj) {
    state.auth = authObj;
    try {
      if (authObj) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authObj));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      }
    } catch (_) {
      // Ignore storage errors
    }
  }

  function applyAuthUI() {
    const auth = state.auth;
    if (!auth) {
      els.btnHeaderAccount.classList.add("hidden");
      els.roleLoginGrid.classList.remove("hidden");
      els.roleActiveBar.classList.add("hidden");
      return;
    }

    const isTeacher = auth.role === "teacher";
    els.btnHeaderAccount.classList.remove("hidden");
    els.headerRoleDot.classList.toggle("is-teacher", isTeacher);
    els.headerAccountLabel.textContent = auth.name;

    els.roleLoginGrid.classList.add("hidden");
    els.roleActiveBar.classList.remove("hidden");
    els.activeRoleBadge.textContent = isTeacher ? "TEACHER" : "STUDENT";
    els.activeRoleBadge.classList.toggle("is-teacher", isTeacher);
    els.activeUserName.textContent = auth.name;
    els.activeUserMeta.textContent = isTeacher
      ? "Instructor access · Question Bank & Student Results unlocked"
      : `${auth.code ? `ID: ${auth.code} · ` : ""}Examinee access for JLPT & JFT-Basic`;

    els.btnOpenTeacherDash.classList.toggle("hidden", !isTeacher);

    if (!els.candidateName.value.trim()) {
      els.candidateName.value = auth.name;
      state.prefs.candidateName = auth.name;
      savePreferences();
    }
  }

  function openLoginModal(role) {
    state.loginModalRole = role === "teacher" ? "teacher" : "student";
    syncLoginModalFields();
    els.loginError.classList.add("hidden");
    els.loginName.value = state.auth && state.auth.role === state.loginModalRole ? state.auth.name : "";
    els.loginCode.value = "";
    openModal("modal-login");
    window.setTimeout(() => els.loginName.focus(), 60);
  }

  function syncLoginModalFields() {
    const isTeacher = state.loginModalRole === "teacher";
    document.querySelectorAll(".login-role-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.loginRole === state.loginModalRole);
    });
    els.modalLoginTitle.textContent = isTeacher ? "Teacher Sign In" : "Student Sign In";
    els.loginNameLabel.textContent = isTeacher ? "Instructor Name" : "Student Name";
    els.loginName.placeholder = isTeacher ? "e.g., Sato Sensei" : "e.g., Tanaka Yuki";
    els.loginCodeLabel.textContent = isTeacher ? "Teacher Access PIN" : "Student ID (Optional)";
    els.loginCode.type = isTeacher ? "password" : "text";
    els.loginCode.placeholder = isTeacher ? "Enter PIN (2026)" : "e.g., STU-2026-01";
    els.teacherPinHint.classList.toggle("hidden", !isTeacher);
    els.btnSubmitLogin.textContent = isTeacher ? "Enter Teacher Portal" : "Sign In as Student";
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const name = els.loginName.value.trim();
    const code = els.loginCode.value.trim();
    const role = state.loginModalRole;

    if (!name) {
      els.loginError.textContent = "Please enter your name.";
      els.loginError.classList.remove("hidden");
      return;
    }

    if (role === "teacher" && code !== TEACHER_DEMO_PIN) {
      els.loginError.textContent = `Invalid Teacher PIN. Use demo PIN "${TEACHER_DEMO_PIN}" or One-Tap Demo Login.`;
      els.loginError.classList.remove("hidden");
      return;
    }

    completeSignIn({ role, name, code });
  }

  function handleDemoLogin() {
    if (state.loginModalRole === "teacher") {
      completeSignIn({ role: "teacher", name: "Sato Sensei", code: TEACHER_DEMO_PIN });
    } else {
      completeSignIn({ role: "student", name: "Tanaka Yuki", code: "STU-2026-01" });
    }
  }

  function completeSignIn(authObj) {
    saveAuth(authObj);
    state.prefs.candidateName = authObj.name;
    els.candidateName.value = authObj.name;
    savePreferences();
    applyAuthUI();
    closeModal("modal-login");

    if (authObj.role === "teacher") {
      openTeacherDashboard();
    }
  }

  function logoutUser() {
    saveAuth(null);
    applyAuthUI();
    if (els.viewTeacher.classList.contains("view-active")) {
      showView("home");
      renderHomeView();
    }
  }

  /* ========================================================================
     Web Speech API (Listening Audio)
     ======================================================================== */
  function initSpeechSynthesis() {
    if (!("speechSynthesis" in window)) return;

    const refreshVoices = () => {
      const voices = window.speechSynthesis.getVoices() || [];
      state.audio.voices = voices;
      state.audio.jaVoice =
        voices.find((v) => v.lang && v.lang.toLowerCase() === "ja-jp") ||
        voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ja")) ||
        null;
    };

    refreshVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = refreshVoices;
    }
  }

  function stopAudio() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    state.audio.speaking = false;
    updateAudioUI();
  }

  function playCurrentAudio() {
    if (!state.session) return;
    const q = getCurrentQuestion();
    if (!q || q.section !== "listening") return;

    if (state.audio.speaking) {
      stopAudio();
      return;
    }

    const usedPlays = state.session.audioPlays[q.id] || 0;
    if (state.session.mode === "exam" && usedPlays >= MAX_EXAM_AUDIO_PLAYS) {
      els.audioStatusNote.textContent = "Replay limit reached for Timed Exam mode.";
      return;
    }

    if (!("speechSynthesis" in window)) {
      els.audioStatusNote.textContent = "Audio synthesis is not supported on this browser. Please open the Audio Script below.";
      revealTranscript(true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(q.audioText);
    utterance.lang = "ja-JP";
    utterance.rate = state.audio.rate;
    if (state.audio.jaVoice) {
      utterance.voice = state.audio.jaVoice;
    }

    state.session.audioPlays[q.id] = usedPlays + 1;
    saveActiveSession();

    state.audio.speaking = true;
    updateAudioUI();

    utterance.onend = () => {
      state.audio.speaking = false;
      updateAudioUI();
    };

    utterance.onerror = () => {
      state.audio.speaking = false;
      els.audioStatusNote.textContent = "Japanese voice unavailable on this device. Use the Audio Script below.";
      revealTranscript(true);
      updateAudioUI();
    };

    window.speechSynthesis.speak(utterance);
  }

  function revealTranscript(forceShow) {
    const isHidden = els.audioTranscriptBody.classList.contains("hidden");
    const shouldShow = typeof forceShow === "boolean" ? forceShow : isHidden;
    els.audioTranscriptBody.classList.toggle("hidden", !shouldShow);
    els.btnAudioTranscript.textContent = shouldShow ? "Hide Audio Script" : "Show Audio Script";
  }

  function updateAudioUI() {
    const q = getCurrentQuestion();
    if (!q || q.section !== "listening" || !state.session) return;

    const used = state.session.audioPlays[q.id] || 0;
    const isExam = state.session.mode === "exam";
    const remaining = Math.max(0, MAX_EXAM_AUDIO_PLAYS - used);

    const iconPlay = els.btnAudioPlay.querySelector(".icon-play");
    const iconStop = els.btnAudioPlay.querySelector(".icon-stop");

    iconPlay.classList.toggle("hidden", state.audio.speaking);
    iconStop.classList.toggle("hidden", !state.audio.speaking);
    els.audioPlayLabel.textContent = state.audio.speaking ? "Stop Audio" : "Play Audio";
    els.audioVisualizer.classList.toggle("playing", state.audio.speaking);

    if (isExam) {
      els.audioReplays.textContent = `Replays: ${remaining} left`;
      els.btnAudioPlay.disabled = !state.audio.speaking && remaining <= 0;
    } else {
      els.audioReplays.textContent = `Played: ${used}x (Unlimited)`;
      els.btnAudioPlay.disabled = false;
    }

    if (!state.audio.speaking && !els.audioStatusNote.textContent) {
      if (!("speechSynthesis" in window)) {
        els.audioStatusNote.textContent = "Browser speech unavailable — script enabled below.";
      } else if (!state.audio.jaVoice) {
        els.audioStatusNote.textContent = "Tip: If audio is silent, your device may lack a ja-JP TTS voice; script is available below.";
      } else {
        els.audioStatusNote.textContent = "Press Play Audio to hear the Japanese prompt.";
      }
    }
  }

  /* ========================================================================
     Event Binding
     ======================================================================== */
  function bindEvents() {
    els.btnFurigana.addEventListener("click", () => {
      state.prefs.furigana = !state.prefs.furigana;
      applyPreferences();
      savePreferences();
    });

    els.btnTheme.addEventListener("click", () => {
      state.prefs.theme = state.prefs.theme === "dark" ? "light" : "dark";
      applyPreferences();
      savePreferences();
    });

    els.btnBrandHome.addEventListener("click", () => {
      if (state.session && !state.session.submitted) {
        saveActiveSession();
        stopTimer();
        stopAudio();
      }
      showView("home");
      renderHomeView();
    });

    els.btnHeaderAccount.addEventListener("click", () => {
      if (state.auth && state.auth.role === "teacher") {
        openTeacherDashboard();
      } else {
        openLoginModal(state.auth ? state.auth.role : "student");
      }
    });

    els.btnHistory.addEventListener("click", openHistoryModal);

    // Role Login buttons
    els.btnRoleStudent.addEventListener("click", () => openLoginModal("student"));
    els.btnRoleTeacher.addEventListener("click", () => openLoginModal("teacher"));
    els.btnSwitchRole.addEventListener("click", () => {
      const target = state.auth && state.auth.role === "student" ? "teacher" : "student";
      openLoginModal(target);
    });
    els.btnLogout.addEventListener("click", logoutUser);
    els.btnOpenTeacherDash.addEventListener("click", openTeacherDashboard);

    document.querySelectorAll(".login-role-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.loginModalRole = tab.dataset.loginRole;
        els.loginError.classList.add("hidden");
        syncLoginModalFields();
      });
    });

    els.formLogin.addEventListener("submit", handleLoginSubmit);
    els.btnDemoLogin.addEventListener("click", handleDemoLogin);

    // Track Selection Cards (JLPT vs JFT-Basic)
    [els.cardTrackJlpt, els.cardTrackJft].forEach((card) => {
      card.addEventListener("click", () => selectExamTrack(card.dataset.track));
    });

    // Mode options
    document.querySelectorAll(".mode-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.setup.mode = btn.dataset.mode;
        document.querySelectorAll(".mode-option").forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-checked", String(active));
        });
        updateStartSummary();
      });
    });

    els.candidateName.addEventListener("input", () => {
      state.prefs.candidateName = els.candidateName.value.trim();
      savePreferences();
    });

    els.btnStartExam.addEventListener("click", startNewExam);
    els.btnResume.addEventListener("click", resumeSavedSession);
    els.btnDiscardResume.addEventListener("click", () => {
      clearActiveSession();
      renderResumeBanner();
    });

    // Active Exam controls
    els.btnPrev.addEventListener("click", () => navigateQuestion(-1));
    els.btnNext.addEventListener("click", () => {
      if (!state.session) return;
      if (state.session.currentIndex >= state.session.questions.length - 1) {
        openConfirmSubmitModal();
      } else {
        navigateQuestion(1);
      }
    });

    els.btnFlag.addEventListener("click", toggleFlagCurrent);
    els.btnTogglePassage.addEventListener("click", () => {
      const collapsed = els.passageBody.classList.toggle("collapsed");
      els.btnTogglePassage.textContent = collapsed ? "Expand Passage" : "Collapse";
    });

    els.btnAudioPlay.addEventListener("click", playCurrentAudio);
    els.btnAudioSpeed.addEventListener("click", () => {
      state.audio.rate = state.audio.rate === 1.0 ? 0.85 : 1.0;
      els.btnAudioSpeed.textContent = `${state.audio.rate.toFixed(state.audio.rate === 1 ? 1 : 2)}x`;
    });
    els.btnAudioTranscript.addEventListener("click", () => revealTranscript());

    els.btnOpenMap.addEventListener("click", () => openModal("modal-map"));
    els.btnBottomMap.addEventListener("click", () => openModal("modal-map"));
    els.btnFinishExam.addEventListener("click", openConfirmSubmitModal);
    els.btnSidebarSubmit.addEventListener("click", openConfirmSubmitModal);
    els.btnSubmitFromMap.addEventListener("click", () => {
      closeModal("modal-map");
      openConfirmSubmitModal();
    });
    els.btnConfirmSubmit.addEventListener("click", () => {
      closeModal("modal-confirm");
      finalizeExam(false);
    });

    // Results controls
    els.reviewFilters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      state.reviewFilter = btn.dataset.filter;
      els.reviewFilters.querySelectorAll(".filter-chip").forEach((c) => {
        c.classList.toggle("active", c === btn);
      });
      renderReviewList();
    });

    els.btnPrintResult.addEventListener("click", () => window.print());
    els.btnRetake.addEventListener("click", () => {
      if (!state.session) return;
      state.setup.track = state.session.track || "jlpt";
      state.setup.levelId = state.session.levelId;
      state.setup.mode = state.session.mode;
      state.setup.sectionFilter = state.session.sectionFilter;
      startNewExam();
    });
    els.btnHome.addEventListener("click", () => {
      showView("home");
      renderHomeView();
    });

    els.btnClearHistory.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      renderHistoryList();
      renderHomeStats();
      if (els.viewTeacher.classList.contains("view-active")) {
        renderTeacherResults();
      }
    });

    // Teacher Dashboard controls
    els.btnTeacherToExams.addEventListener("click", () => {
      showView("home");
      renderHomeView();
    });

    els.teacherTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-ttab]");
      if (!btn) return;
      switchTeacherTab(btn.dataset.ttab);
    });

    els.teacherFilterLevel.addEventListener("change", renderTeacherBank);
    els.tqLevel.addEventListener("change", syncTeacherSectionDropdown);
    els.formAddQuestion.addEventListener("submit", handleAddCustomQuestion);

    // Modal close handlers
    document.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", () => closeModal(el.dataset.close));
    });

    document.addEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal:not(.hidden)").forEach((m) => m.classList.add("hidden"));
      return;
    }
    if (!els.viewExam.classList.contains("view-active")) return;
    if (document.querySelector(".modal:not(.hidden)")) return;

    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "ArrowLeft") {
      navigateQuestion(-1);
    } else if (e.key === "ArrowRight") {
      if (state.session && state.session.currentIndex < state.session.questions.length - 1) {
        navigateQuestion(1);
      }
    } else if (["1", "2", "3", "4"].includes(e.key)) {
      selectOption(Number(e.key) - 1);
    } else if (e.key.toLowerCase() === "f") {
      toggleFlagCurrent();
    }
  }

  /* ========================================================================
     View Switching & Modals
     ======================================================================== */
  function showView(name) {
    const map = {
      home: els.viewHome,
      exam: els.viewExam,
      results: els.viewResults,
      teacher: els.viewTeacher
    };
    Object.entries(map).forEach(([key, el]) => {
      const active = key === name;
      el.classList.toggle("hidden", !active);
      el.classList.toggle("view-active", active);
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    if (id === "modal-map") {
      renderMapGrid(els.mobileMapGrid, true);
    }
    modal.classList.remove("hidden");
  }

  function closeModal(id) {
    const modal = $(id);
    if (modal) modal.classList.add("hidden");
  }

  /* ========================================================================
     Question Bank Access (Built-in + Teacher Custom Questions)
     ======================================================================== */
  function getCustomQuestions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QS);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function saveCustomQuestions(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QS, JSON.stringify(list));
    } catch (_) {
      // Ignore storage errors
    }
  }

  function getQuestionsForLevel(levelId) {
    const builtIn = DATA.questions[levelId] || [];
    const custom = getCustomQuestions().filter((q) => q.levelId === levelId);
    return builtIn.concat(custom);
  }

  function getFilteredQuestions(levelId, sectionFilter) {
    const list = getQuestionsForLevel(levelId);
    if (sectionFilter === "all") return list.slice();
    return list.filter((q) => q.section === sectionFilter);
  }

  function getLevelMeta(levelId) {
    if (levelId === "JFT-A2") return DATA.jftLevel;
    return DATA.levels.find((l) => l.id === levelId) || DATA.levels[0];
  }

  function computeDurationMinutes(level, count, totalLevelCount) {
    if (count === totalLevelCount) return level.durationMinutes;
    return Math.max(5, Math.round((level.durationMinutes * count) / Math.max(1, totalLevelCount)));
  }

  /* ========================================================================
     Home View & Track Selection
     ======================================================================== */
  function selectExamTrack(track) {
    state.setup.track = track === "jft" ? "jft" : "jlpt";
    state.setup.sectionFilter = "all";

    if (state.setup.track === "jft") {
      state.setup.levelId = "JFT-A2";
    } else if (state.setup.levelId === "JFT-A2") {
      state.setup.levelId = "N5";
    }

    renderTrackCards();
    renderTrackDetailSection();
    renderSectionFilters();
    updateStartSummary();
  }

  function renderHomeView() {
    applyAuthUI();
    renderResumeBanner();
    renderHomeStats();
    renderTrackCards();
    renderTrackDetailSection();
    renderSectionFilters();
    updateStartSummary();
  }

  function renderTrackCards() {
    const isJlpt = state.setup.track === "jlpt";
    els.cardTrackJlpt.classList.toggle("selected", isJlpt);
    els.cardTrackJlpt.setAttribute("aria-checked", String(isJlpt));
    els.cardTrackJlpt.querySelector(".track-select-indicator").textContent = isJlpt ? "Selected ✓" : "Select";

    els.cardTrackJft.classList.toggle("selected", !isJlpt);
    els.cardTrackJft.setAttribute("aria-checked", String(!isJlpt));
    els.cardTrackJft.querySelector(".track-select-indicator").textContent = !isJlpt ? "Selected ✓" : "Select";
  }

  function renderTrackDetailSection() {
    const isJft = state.setup.track === "jft";
    els.jlptLevelSection.classList.toggle("hidden", isJft);
    els.jftInfoSection.classList.toggle("hidden", !isJft);

    if (isJft) {
      renderJftOverviewCard();
    } else {
      renderLevelCards();
    }
  }

  function renderJftOverviewCard() {
    const jft = DATA.jftLevel;
    const allQs = getQuestionsForLevel(jft.id);
    const filtered = getFilteredQuestions(jft.id, state.setup.sectionFilter);
    const mins = computeDurationMinutes(jft, filtered.length, allQs.length);

    const counts = { script: 0, conversation: 0, listening: 0, reading: 0 };
    allQs.forEach((q) => {
      if (typeof counts[q.section] === "number") counts[q.section] += 1;
    });

    els.jftOverviewCard.innerHTML = `
      <div class="level-card-top">
        <span class="level-code" style="color: var(--jft-teal)">${jft.code}</span>
        <span class="level-tag">${jft.tag}</span>
      </div>
      <h3 style="margin: 6px 0 4px">${jft.title}</h3>
      <p style="margin: 0; font-size: 0.88rem; color: var(--text-muted)">${jft.description}</p>
      <div class="jft-domains-grid">
        <div class="jft-domain-pill"><strong>Script &amp; Vocab</strong><span>${counts.script} items</span></div>
        <div class="jft-domain-pill"><strong>Conversation</strong><span>${counts.conversation} items</span></div>
        <div class="jft-domain-pill"><strong>Listening</strong><span>${counts.listening} items</span></div>
        <div class="jft-domain-pill"><strong>Reading</strong><span>${counts.reading} items</span></div>
      </div>
      <div class="level-meta" style="margin-top: 12px">
        <span>${filtered.length} Selected Questions</span>
        <span>~${mins} min</span>
        <span>Pass: ${state.setup.sectionFilter === "all" ? "200 / 250" : "60%"}</span>
      </div>
    `;
  }

  function renderLevelCards() {
    els.levelGrid.innerHTML = "";
    DATA.levels.forEach((lvl) => {
      const allQs = getQuestionsForLevel(lvl.id);
      const filtered = getFilteredQuestions(lvl.id, state.setup.sectionFilter);
      const mins = computeDurationMinutes(lvl, filtered.length, allQs.length);
      const selected = state.setup.levelId === lvl.id;

      const card = document.createElement("button");
      card.type = "button";
      card.className = `level-card${selected ? " selected" : ""}`;
      card.setAttribute("role", "radio");
      card.setAttribute("aria-checked", String(selected));
      card.innerHTML = `
        <div class="level-card-top">
          <span class="level-code">${lvl.code}</span>
          <span class="level-tag">${lvl.tag}</span>
        </div>
        <h3>${lvl.title}</h3>
        <p>${lvl.description}</p>
        <div class="level-meta">
          <span>${filtered.length} Questions</span>
          <span>~${mins} min</span>
          <span>Pass: ${state.setup.sectionFilter === "all" ? `${lvl.passScore180}/180` : "60%"}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        state.setup.levelId = lvl.id;
        renderLevelCards();
        updateStartSummary();
      });

      els.levelGrid.appendChild(card);
    });
  }

  function renderSectionFilters() {
    const sections = DATA.trackSections[state.setup.track] || DATA.trackSections.jlpt;
    els.sectionFilterGroup.innerHTML = "";

    const makeChip = (key, label) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const active = state.setup.sectionFilter === key;
      btn.className = `filter-chip${active ? " active" : ""}`;
      btn.dataset.section = key;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", String(active));
      btn.textContent = label;
      btn.addEventListener("click", () => {
        state.setup.sectionFilter = key;
        renderSectionFilters();
        renderTrackDetailSection();
        updateStartSummary();
      });
      els.sectionFilterGroup.appendChild(btn);
    };

    makeChip("all", "All Sections");
    sections.forEach((secKey) => {
      makeChip(secKey, DATA.sectionLabels[secKey] || secKey);
    });
  }

  function updateStartSummary() {
    const level = getLevelMeta(state.setup.levelId);
    const allQs = getQuestionsForLevel(level.id);
    const filtered = getFilteredQuestions(level.id, state.setup.sectionFilter);
    const mins = computeDurationMinutes(level, filtered.length, allQs.length);
    const scopeLabel =
      state.setup.sectionFilter === "all"
        ? "All Sections"
        : DATA.sectionLabels[state.setup.sectionFilter] || state.setup.sectionFilter;
    const modeLabel = state.setup.mode === "exam" ? "Timed Mock Exam" : "Study Mode (Untimed)";

    els.summaryTitle.textContent = `${level.title} — ${scopeLabel}`;
    els.summaryMeta.textContent =
      state.setup.mode === "exam"
        ? `${filtered.length} questions · ${mins} min limit · ${modeLabel}`
        : `${filtered.length} questions · Untimed · Instant explanations`;
  }

  function renderHomeStats() {
    const history = getHistory();
    els.statAttempts.textContent = String(history.length);
    if (history.length === 0) {
      els.statBest.textContent = "--";
      els.statPassed.textContent = "0";
      return;
    }
    const bestPct = Math.max(...history.map((h) => h.pct));
    const passedCount = history.filter((h) => h.passed).length;
    els.statBest.textContent = `${bestPct}%`;
    els.statPassed.textContent = String(passedCount);
  }

  function renderResumeBanner() {
    const saved = loadActiveSession();
    if (!saved || saved.submitted) {
      els.resumeBanner.classList.add("hidden");
      return;
    }
    const answeredCount = Object.keys(saved.answers || {}).length;
    const total = (saved.questions || []).length;
    const modeText = saved.mode === "exam" ? `Time left: ${formatTime(saved.remainingSeconds)}` : "Study Mode";
    els.resumeTitle.textContent = `${saved.levelId} Examination In Progress`;
    els.resumeMeta.textContent = `${answeredCount} of ${total} answered · ${modeText}`;
    els.resumeBanner.classList.remove("hidden");
  }

  /* ========================================================================
     Session Lifecycle
     ======================================================================== */
  function startNewExam() {
    const level = getLevelMeta(state.setup.levelId);
    const allQs = getQuestionsForLevel(level.id);
    const questions = getFilteredQuestions(level.id, state.setup.sectionFilter);
    if (questions.length === 0) return;

    const durationMinutes = computeDurationMinutes(level, questions.length, allQs.length);
    const totalSeconds = durationMinutes * 60;

    state.session = {
      id: `exam_${Date.now()}`,
      track: state.setup.track,
      levelId: level.id,
      mode: state.setup.mode,
      sectionFilter: state.setup.sectionFilter,
      candidateName: (els.candidateName.value || (state.auth ? state.auth.name : "")).trim(),
      questions,
      currentIndex: 0,
      answers: {},
      flagged: {},
      audioPlays: {},
      totalSeconds,
      remainingSeconds: totalSeconds,
      startedAt: Date.now(),
      submitted: false
    };

    saveActiveSession();
    enterExamView();
  }

  function resumeSavedSession() {
    const saved = loadActiveSession();
    if (!saved || saved.submitted) return;
    state.session = saved;
    enterExamView();
  }

  function enterExamView() {
    stopAudio();
    showView("exam");
    const isJft = state.session.levelId === "JFT-A2";
    els.examLevelBadge.textContent = state.session.levelId;
    els.examLevelBadge.classList.toggle("is-jft", isJft);
    renderCurrentQuestion();
    renderMapGrid(els.desktopMapGrid, false);
    startTimerIfNeeded();
  }

  function startTimerIfNeeded() {
    stopTimer();
    if (!state.session) return;

    if (state.session.mode !== "exam") {
      els.examTimer.textContent = "Study";
      els.examTimerWrap.classList.remove("timer-warn", "timer-critical");
      return;
    }

    updateTimerDisplay();
    state.timerHandle = window.setInterval(() => {
      if (!state.session || state.session.submitted) {
        stopTimer();
        return;
      }
      state.session.remainingSeconds = Math.max(0, state.session.remainingSeconds - 1);
      updateTimerDisplay();
      if (state.session.remainingSeconds % 5 === 0) {
        saveActiveSession();
      }
      if (state.session.remainingSeconds <= 0) {
        stopTimer();
        finalizeExam(true);
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerHandle !== null) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
  }

  function updateTimerDisplay() {
    if (!state.session) return;
    const sec = state.session.remainingSeconds;
    els.examTimer.textContent = formatTime(sec);
    els.examTimerWrap.classList.toggle("timer-warn", sec <= 300 && sec > 60);
    els.examTimerWrap.classList.toggle("timer-critical", sec <= 60);
  }

  /* ========================================================================
     Active Question Rendering
     ======================================================================== */
  function getCurrentQuestion() {
    if (!state.session) return null;
    return state.session.questions[state.session.currentIndex] || null;
  }

  function renderCurrentQuestion() {
    const s = state.session;
    const q = getCurrentQuestion();
    if (!s || !q) return;

    const total = s.questions.length;
    const idx = s.currentIndex;
    const answeredCount = Object.keys(s.answers).length;
    const pct = Math.round(((idx + 1) / total) * 100);

    els.examSectionLabel.textContent = DATA.sectionLabels[q.section] || q.section;
    els.questionCounter.textContent = `${idx + 1} / ${total}`;
    els.bottomMapText.textContent = `Map (${answeredCount}/${total})`;
    els.sidebarCounts.textContent = `${answeredCount}/${total} answered`;
    els.examProgressFill.style.width = `${pct}%`;
    els.examProgressBar.setAttribute("aria-valuenow", String(pct));

    els.qNumBadge.textContent = `Question ${idx + 1}`;
    els.qTypeTag.textContent = `${DATA.sectionLabels[q.section] || q.section} · ${q.typeLabel}`;

    const isFlagged = Boolean(s.flagged[q.id]);
    els.btnFlag.setAttribute("aria-pressed", String(isFlagged));
    els.btnFlag.querySelector("span").textContent = isFlagged ? "Flagged" : "Flag";

    if (q.passage) {
      els.passageContainer.classList.remove("hidden");
      els.passageTitle.textContent = q.passageTitle || "Reading Passage";
      els.passageBody.innerHTML = q.passage;
      els.passageBody.classList.remove("collapsed");
      els.btnTogglePassage.textContent = "Collapse";
    } else {
      els.passageContainer.classList.add("hidden");
      els.passageBody.innerHTML = "";
    }

    if (q.section === "listening") {
      els.audioContainer.classList.remove("hidden");
      els.audioStatusNote.textContent = "";
      els.audioTranscriptBody.innerHTML = q.audioScriptHtml || escapeHtml(q.audioText || "");
      revealTranscript(false);
      const ttsAvailable = "speechSynthesis" in window;
      els.btnAudioTranscript.classList.toggle("hidden", s.mode === "exam" && ttsAvailable);
      updateAudioUI();
    } else {
      els.audioContainer.classList.add("hidden");
    }

    els.qInstruction.textContent = q.instruction;
    els.qPrompt.innerHTML = q.prompt;

    renderOptions(q);
    renderStudyFeedback(q);

    els.btnPrev.disabled = idx === 0;
    const isLast = idx === total - 1;
    els.btnNextLabel.textContent = isLast ? "Finish" : "Next";

    renderMapGrid(els.desktopMapGrid, false);
  }

  function renderOptions(q) {
    const s = state.session;
    const selectedIdx = s.answers[q.id];
    const hasAnswered = typeof selectedIdx === "number";
    const isStudyChecked = s.mode === "study" && hasAnswered;

    els.optionsList.innerHTML = "";
    q.options.forEach((optHtml, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", String(selectedIdx === i));

      if (selectedIdx === i) btn.classList.add("selected");
      if (isStudyChecked) {
        if (i === q.answer) btn.classList.add("correct");
        else if (i === selectedIdx) btn.classList.add("incorrect");
      }

      btn.innerHTML = `
        <span class="option-num">${i + 1}</span>
        <span class="option-label">${optHtml}</span>
      `;

      btn.addEventListener("click", () => selectOption(i));
      els.optionsList.appendChild(btn);
    });
  }

  function renderStudyFeedback(q) {
    const s = state.session;
    const selectedIdx = s.answers[q.id];
    if (s.mode !== "study" || typeof selectedIdx !== "number") {
      els.studyFeedback.classList.add("hidden");
      return;
    }

    const isCorrect = selectedIdx === q.answer;
    els.studyFeedback.classList.remove("hidden", "is-correct", "is-incorrect");
    els.studyFeedback.classList.add(isCorrect ? "is-correct" : "is-incorrect");
    els.studyFeedbackHeader.textContent = isCorrect
      ? "✓ Correct!"
      : `✕ Incorrect — Correct answer is #${q.answer + 1}`;
    els.studyFeedbackText.textContent = q.explanation;
  }

  function selectOption(optionIndex) {
    if (!state.session || state.session.submitted) return;
    const q = getCurrentQuestion();
    if (!q || optionIndex < 0 || optionIndex >= q.options.length) return;

    state.session.answers[q.id] = optionIndex;
    saveActiveSession();
    renderOptions(q);
    renderStudyFeedback(q);

    const answeredCount = Object.keys(state.session.answers).length;
    const total = state.session.questions.length;
    els.bottomMapText.textContent = `Map (${answeredCount}/${total})`;
    els.sidebarCounts.textContent = `${answeredCount}/${total} answered`;
    renderMapGrid(els.desktopMapGrid, false);
  }

  function toggleFlagCurrent() {
    if (!state.session) return;
    const q = getCurrentQuestion();
    if (!q) return;
    if (state.session.flagged[q.id]) {
      delete state.session.flagged[q.id];
    } else {
      state.session.flagged[q.id] = true;
    }
    saveActiveSession();
    const isFlagged = Boolean(state.session.flagged[q.id]);
    els.btnFlag.setAttribute("aria-pressed", String(isFlagged));
    els.btnFlag.querySelector("span").textContent = isFlagged ? "Flagged" : "Flag";
    renderMapGrid(els.desktopMapGrid, false);
  }

  function navigateQuestion(delta) {
    if (!state.session) return;
    const next = state.session.currentIndex + delta;
    if (next < 0 || next >= state.session.questions.length) return;
    stopAudio();
    state.session.currentIndex = next;
    saveActiveSession();
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpToQuestion(index) {
    if (!state.session) return;
    if (index < 0 || index >= state.session.questions.length) return;
    stopAudio();
    state.session.currentIndex = index;
    saveActiveSession();
    renderCurrentQuestion();
  }

  function renderMapGrid(container, closeOnSelect) {
    if (!state.session || !container) return;
    const s = state.session;
    container.innerHTML = "";

    const groups = [];
    s.questions.forEach((q, idx) => {
      let group = groups.find((g) => g.section === q.section);
      if (!group) {
        group = { section: q.section, items: [] };
        groups.push(group);
      }
      group.items.push({ q, idx });
    });

    groups.forEach((g) => {
      const wrap = document.createElement("div");
      const title = document.createElement("h4");
      title.className = "map-section-title";
      title.textContent = DATA.sectionLabels[g.section] || g.section;
      wrap.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "map-num-grid";

      g.items.forEach(({ q, idx }) => {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "map-cell";
        if (typeof s.answers[q.id] === "number") cell.classList.add("answered");
        if (s.flagged[q.id]) cell.classList.add("flagged");
        if (idx === s.currentIndex) cell.classList.add("current");
        cell.textContent = String(idx + 1);
        cell.setAttribute("aria-label", `Go to question ${idx + 1}`);

        cell.addEventListener("click", () => {
          jumpToQuestion(idx);
          if (closeOnSelect) closeModal("modal-map");
        });

        grid.appendChild(cell);
      });

      wrap.appendChild(grid);
      container.appendChild(wrap);
    });
  }

  /* ========================================================================
     Submission & Scoring (JLPT 180-pt & JFT-Basic 250-pt)
     ======================================================================== */
  function openConfirmSubmitModal() {
    if (!state.session) return;
    const total = state.session.questions.length;
    const answered = Object.keys(state.session.answers).length;
    const unanswered = total - answered;
    const flagged = Object.keys(state.session.flagged).length;

    els.confirmSummaryText.textContent =
      unanswered > 0
        ? `You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway?`
        : "All questions answered! Ready to calculate your score?";

    els.confirmStats.innerHTML = `
      <div class="confirm-stat"><strong>${answered}</strong><span>Answered</span></div>
      <div class="confirm-stat"><strong>${unanswered}</strong><span>Unanswered</span></div>
      <div class="confirm-stat"><strong>${flagged}</strong><span>Flagged</span></div>
    `;
    openModal("modal-confirm");
  }

  function finalizeExam(autoSubmitted) {
    if (!state.session) return;
    stopTimer();
    stopAudio();

    const s = state.session;
    s.submitted = true;
    s.autoSubmitted = Boolean(autoSubmitted);
    s.finishedAt = Date.now();
    s.elapsedSeconds =
      s.mode === "exam"
        ? Math.max(0, s.totalSeconds - s.remainingSeconds)
        : Math.max(1, Math.round((s.finishedAt - s.startedAt) / 1000));

    const results = evaluateSession(s);
    s.results = results;

    clearActiveSession();
    saveHistoryRecord(s, results);

    state.reviewFilter = "all";
    document.querySelectorAll("#review-filters .filter-chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.filter === "all");
    });

    showView("results");
    renderResultsView();
  }

  function evaluateSession(s) {
    const level = getLevelMeta(s.levelId);
    const counts = {};

    s.questions.forEach((q) => {
      if (!counts[q.section]) counts[q.section] = { correct: 0, total: 0 };
      counts[q.section].total += 1;
      if (s.answers[q.id] === q.answer) {
        counts[q.section].correct += 1;
      }
    });

    const totalQuestions = s.questions.length;
    const totalCorrect = Object.values(counts).reduce((sum, c) => sum + c.correct, 0);
    const pct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    let domains = [];
    let scaledScore = 0;
    let maxScale = 180;
    let passThreshold = 80;
    let passed = false;

    if (s.sectionFilter !== "all") {
      const sec = counts[s.sectionFilter] || { correct: totalCorrect, total: totalQuestions };
      scaledScore = pct;
      maxScale = 100;
      passThreshold = 60;
      passed = pct >= 60;
      domains = [
        {
          name: DATA.sectionLabels[s.sectionFilter] || s.sectionFilter,
          correct: sec.correct,
          total: sec.total,
          score: pct,
          max: 100,
          pct,
          passed
        }
      ];
    } else if (s.levelId === "JFT-A2") {
      // Official JFT-Basic 250-point scale (pass >= 200)
      maxScale = level.maxScore; // 250
      passThreshold = level.passScore; // 200
      scaledScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * maxScale) : 0;
      passed = scaledScore >= passThreshold;

      domains = DATA.trackSections.jft.map((secKey) => {
        const c = counts[secKey] || { correct: 0, total: 0 };
        const dPct = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
        const dScore = c.total > 0 ? Math.round((c.correct / c.total) * 62.5) : 0;
        return {
          name: DATA.sectionLabels[secKey],
          correct: c.correct,
          total: c.total,
          score: dScore,
          max: 62.5,
          pct: dPct,
          passed: dPct >= 60
        };
      });
    } else {
      // JLPT 180-point scale across 3 domains
      const vocab = counts.vocab || { correct: 0, total: 0 };
      const grammar = counts.grammar || { correct: 0, total: 0 };
      const reading = counts.reading || { correct: 0, total: 0 };
      const listening = counts.listening || { correct: 0, total: 0 };

      const makeDomain = (name, correct, total) => {
        const score = total > 0 ? Math.round((correct / total) * 60) : 0;
        const domainPct = total > 0 ? Math.round((correct / total) * 100) : 0;
        return {
          name,
          correct,
          total,
          score,
          max: 60,
          pct: domainPct,
          passed: domainPct >= level.sectionMinPct
        };
      };

      domains = [
        makeDomain("Language Knowledge (Vocab & Grammar)", vocab.correct + grammar.correct, vocab.total + grammar.total),
        makeDomain("Reading Comprehension", reading.correct, reading.total),
        makeDomain("Listening Comprehension", listening.correct, listening.total)
      ];

      scaledScore = domains.reduce((sum, d) => sum + d.score, 0);
      maxScale = 180;
      passThreshold = level.passScore180;
      passed = scaledScore >= passThreshold && domains.every((d) => d.passed);
    }

    return {
      totalCorrect,
      totalQuestions,
      pct,
      scaledScore,
      maxScale,
      passThreshold,
      passed,
      domains
    };
  }

  /* ========================================================================
     Results View
     ======================================================================== */
  function renderResultsView() {
    const s = state.session;
    if (!s || !s.results) return;
    const r = s.results;
    const level = getLevelMeta(s.levelId);

    els.resultStamp.textContent = r.passed ? "合格 PASS" : "不合格 FAIL";
    els.resultStamp.classList.toggle("fail", !r.passed);

    const scopeName =
      s.sectionFilter === "all" ? level.title : `${level.code} · ${DATA.sectionLabels[s.sectionFilter]}`;
    els.resultLevelLabel.textContent = `${scopeName} Report`;
    els.resultHeadline.textContent = r.passed
      ? "Congratulations! Passing Standard Met"
      : "Keep Practicing — Review Weak Areas Below";

    const namePart = s.candidateName ? `Examinee: ${s.candidateName} · ` : "";
    const autoPart = s.autoSubmitted ? " · Auto-submitted (Time Expired)" : "";
    els.resultMeta.textContent = `${namePart}${r.totalCorrect}/${r.totalQuestions} correct · Time: ${formatTime(s.elapsedSeconds)} · Pass mark: ${r.passThreshold}/${r.maxScale}${autoPart}`;

    els.resultScaledScore.textContent = String(r.scaledScore);
    els.resultScoreMax.textContent = `/ ${r.maxScale}`;
    els.resultPct.textContent = `${r.pct}%`;

    els.breakdownGrid.innerHTML = "";
    r.domains.forEach((d) => {
      const card = document.createElement("div");
      card.className = "breakdown-card";
      card.innerHTML = `
        <div class="breakdown-top">
          <h3>${escapeHtml(d.name)}</h3>
          <span class="breakdown-badge ${d.passed ? "pass" : "fail"}">${d.passed ? "Pass" : "Below Min"}</span>
        </div>
        <div class="breakdown-bar">
          <div class="breakdown-bar-fill" style="width: ${d.pct}%"></div>
        </div>
        <div class="breakdown-numbers">
          <span>${d.score} / ${d.max} pts</span>
          <span>${d.correct}/${d.total} (${d.pct}%)</span>
        </div>
      `;
      els.breakdownGrid.appendChild(card);
    });

    renderReviewList();
  }

  function renderReviewList() {
    const s = state.session;
    if (!s) return;

    const filtered = s.questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => {
        const userAns = s.answers[q.id];
        const isCorrect = userAns === q.answer;
        if (state.reviewFilter === "incorrect") return !isCorrect;
        if (state.reviewFilter === "correct") return isCorrect;
        if (state.reviewFilter === "flagged") return Boolean(s.flagged[q.id]);
        return true;
      });

    els.reviewList.innerHTML = "";

    if (filtered.length === 0) {
      els.reviewList.innerHTML = `<div class="review-item"><p class="review-explanation">No questions match this filter.</p></div>`;
      return;
    }

    filtered.forEach(({ q, idx }) => {
      const userAns = s.answers[q.id];
      const isCorrect = userAns === q.answer;
      const isFlagged = Boolean(s.flagged[q.id]);
      const userChoiceHtml =
        typeof userAns === "number" ? `#${userAns + 1} ${q.options[userAns]}` : "<em>Unanswered</em>";
      const correctChoiceHtml = `#${q.answer + 1} ${q.options[q.answer]}`;

      const item = document.createElement("article");
      item.className = `review-item ${isCorrect ? "is-correct" : "is-incorrect"}`;

      const passageOrScript = q.passage
        ? `<div class="passage-box"><div class="passage-title">${escapeHtml(q.passageTitle || "Passage")}</div><div class="passage-body jp-text" lang="ja">${q.passage}</div></div>`
        : q.audioScriptHtml
        ? `<div class="audio-transcript jp-text" lang="ja"><strong>Audio Script:</strong><br>${q.audioScriptHtml}</div>`
        : "";

      item.innerHTML = `
        <div class="review-item-top">
          <div class="q-tags">
            <span class="q-num-badge">Q${idx + 1}</span>
            <span class="q-type-tag">${escapeHtml(DATA.sectionLabels[q.section] || q.section)} · ${escapeHtml(q.typeLabel)}</span>
            ${isFlagged ? '<span class="q-type-tag">Flagged</span>' : ""}
          </div>
          <span class="review-status ${isCorrect ? "pass" : "fail"}">${isCorrect ? "Correct" : "Incorrect"}</span>
        </div>
        ${passageOrScript}
        <div class="review-prompt jp-text" lang="ja">${q.prompt}</div>
        <div class="review-answers jp-text" lang="ja">
          <div><strong>Your Answer:</strong> ${userChoiceHtml}</div>
          ${!isCorrect ? `<div><strong>Correct Answer:</strong> ${correctChoiceHtml}</div>` : ""}
        </div>
        <p class="review-explanation">${escapeHtml(q.explanation)}</p>
      `;
      els.reviewList.appendChild(item);
    });
  }

  /* ========================================================================
     Teacher Dashboard View
     ======================================================================== */
  function openTeacherDashboard() {
    if (!state.auth || state.auth.role !== "teacher") {
      openLoginModal("teacher");
      return;
    }
    els.teacherWelcome.textContent = `Welcome, ${state.auth.name}`;
    showView("teacher");
    switchTeacherTab(state.teacherTab || "bank");
    syncTeacherSectionDropdown();
  }

  function switchTeacherTab(tabName) {
    state.teacherTab = tabName;
    els.teacherTabs.querySelectorAll("[data-ttab]").forEach((btn) => {
      const active = btn.dataset.ttab === tabName;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    els.teacherTabBank.classList.toggle("hidden", tabName !== "bank");
    els.teacherTabCreate.classList.toggle("hidden", tabName !== "create");
    els.teacherTabResults.classList.toggle("hidden", tabName !== "results");

    if (tabName === "bank") renderTeacherBank();
    if (tabName === "results") renderTeacherResults();
  }

  function syncTeacherSectionDropdown() {
    const levelId = els.tqLevel.value;
    const sections = levelId === "JFT-A2" ? DATA.trackSections.jft : DATA.trackSections.jlpt;
    els.tqSection.innerHTML = "";
    sections.forEach((sec) => {
      const opt = document.createElement("option");
      opt.value = sec;
      opt.textContent = DATA.sectionLabels[sec] || sec;
      els.tqSection.appendChild(opt);
    });
  }

  function renderTeacherBank() {
    const filter = els.teacherFilterLevel.value;
    const levelIds = filter === "all" ? ["N5", "N4", "N3", "JFT-A2"] : [filter];
    const items = [];
    levelIds.forEach((lid) => {
      getQuestionsForLevel(lid).forEach((q) => {
        items.push({ lid, q });
      });
    });

    els.teacherBankCount.textContent = `${items.length} question${items.length === 1 ? "" : "s"}`;
    els.teacherBankList.innerHTML = "";

    items.forEach(({ lid, q }) => {
      const card = document.createElement("div");
      card.className = "teacher-q-card";
      const isCustom = Boolean(q.isCustom);

      card.innerHTML = `
        <div class="teacher-q-top">
          <div class="q-tags">
            <span class="level-badge ${lid === "JFT-A2" ? "is-jft" : ""}">${escapeHtml(lid)}</span>
            <span class="q-type-tag">${escapeHtml(DATA.sectionLabels[q.section] || q.section)} · ${escapeHtml(q.typeLabel)}</span>
            ${isCustom ? '<span class="review-status pass">Custom</span>' : ""}
          </div>
          ${isCustom ? `<button type="button" class="btn btn-danger-soft btn-xs" data-del-q="${escapeHtml(q.id)}">Delete</button>` : ""}
        </div>
        <div class="jp-text" lang="ja">${q.prompt}</div>
        <div class="review-explanation">Answer: #${q.answer + 1} (${q.options[q.answer]})</div>
      `;

      const delBtn = card.querySelector("[data-del-q]");
      if (delBtn) {
        delBtn.addEventListener("click", () => {
          const updated = getCustomQuestions().filter((cq) => cq.id !== q.id);
          saveCustomQuestions(updated);
          renderTeacherBank();
        });
      }

      els.teacherBankList.appendChild(card);
    });
  }

  function handleAddCustomQuestion(e) {
    e.preventDefault();
    const levelId = els.tqLevel.value;
    const section = els.tqSection.value;
    const typeLabel = els.tqType.value.trim();
    const answer = Number(els.tqAnswer.value);
    const instruction = els.tqInstruction.value.trim();
    const prompt = escapeHtml(els.tqPrompt.value.trim());
    const options = [
      escapeHtml(els.tqOpt0.value.trim()),
      escapeHtml(els.tqOpt1.value.trim()),
      escapeHtml(els.tqOpt2.value.trim()),
      escapeHtml(els.tqOpt3.value.trim())
    ];
    const explanation = els.tqExplanation.value.trim();

    const newQ = {
      id: `custom-${Date.now()}`,
      levelId,
      section,
      typeLabel,
      instruction,
      prompt,
      options,
      answer,
      explanation,
      isCustom: true
    };

    const list = getCustomQuestions();
    list.push(newQ);
    saveCustomQuestions(list);

    els.formAddQuestion.reset();
    els.tqLevel.value = levelId;
    syncTeacherSectionDropdown();
    els.tqInstruction.value = "Choose the best answer to complete the sentence.";
    els.tqFeedback.textContent = `Saved to ${levelId} (${DATA.sectionLabels[section]})!`;
    window.setTimeout(() => {
      els.tqFeedback.textContent = "";
    }, 3500);
  }

  function renderTeacherResults() {
    const history = getHistory();
    const total = history.length;
    const passed = history.filter((h) => h.passed).length;
    const avgPct = total > 0 ? Math.round(history.reduce((s, h) => s + h.pct, 0) / total) : 0;

    els.teacherMetrics.innerHTML = `
      <div class="stat-box"><span class="stat-value">${total}</span><span class="stat-label">Submissions</span></div>
      <div class="stat-box"><span class="stat-value">${avgPct}%</span><span class="stat-label">Avg Score</span></div>
      <div class="stat-box"><span class="stat-value">${total > 0 ? Math.round((passed / total) * 100) : 0}%</span><span class="stat-label">Pass Rate</span></div>
    `;

    els.teacherResultsList.innerHTML = "";
    if (history.length === 0) {
      els.teacherResultsList.innerHTML = `<p class="review-explanation">No student exam submissions recorded in this browser yet.</p>`;
      return;
    }

    history.forEach((item) => {
      const dateStr = new Date(item.dateIso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      const who = item.candidateName ? escapeHtml(item.candidateName) : "Anonymous Student";
      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
        <div>
          <strong>${who} · ${escapeHtml(item.levelId)}</strong>
          <div class="review-explanation">${dateStr} · ${item.correct}/${item.total} correct · ${item.mode === "exam" ? "Timed" : "Study"}</div>
        </div>
        <div style="text-align:right">
          <span class="review-status ${item.passed ? "pass" : "fail"}">${item.passed ? "PASS" : "FAIL"}</span>
          <div style="font-weight:800;font-size:0.95rem;margin-top:4px">${item.scaledScore}/${item.maxScale} (${item.pct}%)</div>
        </div>
      `;
      els.teacherResultsList.appendChild(row);
    });
  }

  /* ========================================================================
     Storage: Active Session & History
     ======================================================================== */
  function saveActiveSession() {
    if (!state.session) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(state.session));
    } catch (_) {
      // Ignore storage errors
    }
  }

  function loadActiveSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function clearActiveSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (_) {
      // Ignore storage errors
    }
  }

  function getHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function saveHistoryRecord(s, results) {
    const history = getHistory();
    history.unshift({
      id: s.id,
      dateIso: new Date().toISOString(),
      track: s.track || "jlpt",
      levelId: s.levelId,
      mode: s.mode,
      sectionFilter: s.sectionFilter,
      candidateName: s.candidateName || "",
      scaledScore: results.scaledScore,
      maxScale: results.maxScale,
      pct: results.pct,
      passed: results.passed,
      correct: results.totalCorrect,
      total: results.totalQuestions
    });
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 30)));
    } catch (_) {
      // Ignore storage errors
    }
  }

  function openHistoryModal() {
    renderHistoryList();
    openModal("modal-history");
  }

  function renderHistoryList() {
    const history = getHistory();
    els.historyList.innerHTML = "";
    if (history.length === 0) {
      els.historyList.innerHTML = `<p class="review-explanation">No completed examinations yet. Start a JLPT or JFT-Basic exam to track your progress!</p>`;
      return;
    }

    history.forEach((item) => {
      const dateStr = new Date(item.dateIso).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      const scope =
        item.sectionFilter === "all"
          ? "Full Exam"
          : DATA.sectionLabels[item.sectionFilter] || item.sectionFilter;

      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(item.levelId)} · ${escapeHtml(scope)}</strong>
          <div class="review-explanation">${dateStr} · ${item.mode === "exam" ? "Timed" : "Study"} · ${item.correct}/${item.total}</div>
        </div>
        <div style="text-align:right">
          <span class="review-status ${item.passed ? "pass" : "fail"}">${item.passed ? "PASS" : "FAIL"}</span>
          <div style="font-weight:800;font-size:0.95rem;margin-top:4px">${item.scaledScore}/${item.maxScale} (${item.pct}%)</div>
        </div>
      `;
      els.historyList.appendChild(row);
    });
  }

  /* ========================================================================
     Utilities
     ======================================================================== */
  function formatTime(totalSec) {
    const s = Math.max(0, Math.floor(totalSec));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
