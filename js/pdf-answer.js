/* ==========================================================================
   PDF Question Paper Generator + Answer Sheet System
   Student PDF dekhe "1-2, 2-4, 3-2" format e answer dibe
   ========================================================================== */

(function () {
  "use strict";

  // =========================================================================
  // PDF Question Paper Generator
  // =========================================================================

  window.generateQuestionPaper = function (levelId, sectionFilter) {
    const DATA = window.EXAM_DATA;
    if (!DATA) return;

    sectionFilter = sectionFilter || "all";
    const allQuestions = DATA.questions[levelId] || [];
    const questions =
      sectionFilter === "all"
        ? allQuestions
        : allQuestions.filter((q) => q.section === sectionFilter);

    if (!questions.length) {
      alert("No questions found for this level/section.");
      return;
    }

    // Level meta
    let levelTitle = "Exam";
    if (levelId === "JFT-A2") {
      levelTitle = DATA.jftLevel ? DATA.jftLevel.title : "JFT-A2 Exam";
    } else {
      const lvl = (DATA.levels || []).find((l) => l.id === levelId);
      levelTitle = lvl ? lvl.title : levelId + " Exam";
    }

    // Build printable HTML
    const win = window.open("", "_blank");
    if (!win) {
      alert("Please allow popups to generate PDF.");
      return;
    }

    const optionLabels = ["A", "B", "C", "D"];
    let questionsHtml = "";

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const passageHtml =
        q.passage
          ? `<div class="passage-box">
               <div class="passage-title">${q.passageTitle || "Passage"}</div>
               <div class="passage-text">${q.passage}</div>
             </div>`
          : "";

      const audioHtml =
        q.section === "listening"
          ? `<div class="audio-note">🔊 Listening Question — Audio Script: <em>${(q.audioText || "").substring(0, 80)}...</em></div>`
          : "";

      const optionsHtml = (q.options || [])
        .map(
          (opt, i) =>
            `<div class="option-row">
               <span class="opt-label">${optionLabels[i]}.</span>
               <span class="opt-text">${opt}</span>
             </div>`
        )
        .join("");

      questionsHtml += `
        <div class="question-block">
          <div class="q-header">
            <span class="q-number">Q${qNum}.</span>
            <span class="q-section-tag">${q.section ? q.section.toUpperCase() : ""}</span>
            ${q.typeLabel ? `<span class="q-type">${q.typeLabel}</span>` : ""}
          </div>
          ${passageHtml}
          ${audioHtml}
          <div class="q-instruction">${q.instruction || ""}</div>
          <div class="q-prompt">${q.prompt || ""}</div>
          <div class="options-list">${optionsHtml}</div>
        </div>`;
    });

    const answerBoxes = questions
      .map(
        (_, idx) =>
          `<div class="ans-box">
             <span class="ans-num">${idx + 1}.</span>
             <span class="ans-opts">A &nbsp; B &nbsp; C &nbsp; D</span>
             <span class="ans-write">___</span>
           </div>`
      )
      .join("");

    const doc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${levelTitle} — Question Paper</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #111; padding: 20px 30px; }
    h1 { text-align: center; font-size: 20px; margin-bottom: 4px; }
    .sub { text-align: center; font-size: 12px; color: #555; margin-bottom: 16px; }
    .meta-row { display: flex; gap: 20px; justify-content: center; margin-bottom: 20px; font-size: 12px; color: #333; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 8px 0; }
    .meta-row span b { color: #000; }
    .student-info { border: 1px solid #aaa; padding: 10px 16px; margin-bottom: 20px; border-radius: 4px; }
    .student-info label { font-size: 12px; color: #555; margin-right: 8px; }
    .student-info .info-line { display: flex; gap: 30px; }
    .info-field { flex: 1; border-bottom: 1px solid #666; padding-bottom: 2px; min-width: 120px; height: 20px; }
    .question-block { margin-bottom: 22px; padding: 12px 14px; border: 1px solid #ddd; border-radius: 6px; page-break-inside: avoid; }
    .q-header { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
    .q-number { font-weight: bold; font-size: 15px; }
    .q-section-tag { background: #1a1a7e; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 3px; }
    .q-type { background: #eee; font-size: 10px; padding: 2px 6px; border-radius: 3px; color: #444; }
    .passage-box { background: #f5f5f5; border-left: 3px solid #1a1a7e; padding: 8px 12px; margin-bottom: 10px; border-radius: 3px; font-size: 13px; line-height: 1.6; }
    .passage-title { font-weight: bold; font-size: 11px; color: #555; margin-bottom: 4px; }
    .audio-note { background: #fff8e1; border-left: 3px solid #f9a825; padding: 6px 10px; margin-bottom: 8px; font-size: 12px; border-radius: 3px; }
    .q-instruction { font-size: 12px; color: #555; margin-bottom: 6px; font-style: italic; }
    .q-prompt { font-size: 14px; margin-bottom: 10px; line-height: 1.6; }
    .options-list { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
    .option-row { display: flex; gap: 6px; align-items: flex-start; }
    .opt-label { font-weight: bold; color: #1a1a7e; min-width: 18px; }
    .opt-text { font-size: 13px; line-height: 1.5; }
    .answer-sheet { margin-top: 30px; border-top: 2px dashed #aaa; padding-top: 16px; }
    .answer-sheet h2 { text-align: center; font-size: 15px; margin-bottom: 10px; }
    .ans-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .ans-box { border: 1px solid #aaa; border-radius: 4px; padding: 6px 8px; font-size: 12px; display: flex; flex-direction: column; align-items: center; }
    .ans-num { font-weight: bold; margin-bottom: 4px; }
    .ans-opts { color: #555; font-size: 11px; margin-bottom: 4px; }
    .ans-write { border-bottom: 1px solid #666; min-width: 40px; text-align: center; }
    .instructions-box { background: #e8f4fd; border: 1px solid #90caf9; border-radius: 6px; padding: 10px 14px; margin-bottom: 20px; font-size: 12px; }
    .instructions-box h3 { font-size: 13px; margin-bottom: 6px; }
    .instructions-box ol { padding-left: 16px; line-height: 1.8; }
    ruby rt { font-size: 9px; }
    @media print {
      body { padding: 10px 20px; }
      .question-block { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>${levelTitle}</h1>
  <p class="sub">Official Question Paper — Nihongo Exam Portal</p>

  <div class="meta-row">
    <span>Level: <b>${levelId}</b></span>
    <span>Total Questions: <b>${questions.length}</b></span>
    <span>Date: <b>${new Date().toLocaleDateString("en-GB")}</b></span>
    <span>Time: <b>${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</b></span>
  </div>

  <div class="student-info">
    <div class="info-line">
      <div><label>Student Name:</label><div class="info-field"></div></div>
      <div><label>Student ID:</label><div class="info-field"></div></div>
      <div><label>Roll No:</label><div class="info-field"></div></div>
    </div>
  </div>

  <div class="instructions-box">
    <h3>📋 Instructions / নির্দেশনা</h3>
    <ol>
      <li>Read each question carefully before answering.</li>
      <li>Each question has 4 options: <b>A, B, C, D</b>.</li>
      <li>Circle or write your answer (A/B/C/D) in the Answer Sheet below.</li>
      <li>For online submission: type answers as <b>1-A, 2-C, 3-B</b> format (Question No - Option Letter).</li>
    </ol>
  </div>

  ${questionsHtml}

  <div class="answer-sheet">
    <h2>✏️ Answer Sheet</h2>
    <div class="ans-grid">${answerBoxes}</div>
  </div>

  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;

    win.document.write(doc);
    win.document.close();
  };

  // =========================================================================
  // Answer Sheet Submit System
  // "1-2, 2-4, 3-2" or "1-A, 2-C, 3-B" format support
  // =========================================================================

  window.AnswerSheetSystem = {
    // Parse answer string like "1-2, 2-4, 3-1" or "1-A, 2-C, 3-B"
    parseAnswers: function (inputStr) {
      const result = {};
      if (!inputStr || !inputStr.trim()) return result;

      // Split by comma or newline
      const parts = inputStr.split(/[,\n]+/);

      parts.forEach((part) => {
        part = part.trim();
        if (!part) return;

        // Match: "1-2" or "1-A" or "1 - 2" etc.
        const match = part.match(/^(\d+)\s*[-:\.]\s*([1-4AaBbCcDd])$/);
        if (match) {
          const qNum = parseInt(match[1], 10);
          let ans = match[2].toUpperCase();

          // Convert A->0, B->1, C->2, D->3
          if (ans === "A") ans = 0;
          else if (ans === "B") ans = 1;
          else if (ans === "C") ans = 2;
          else if (ans === "D") ans = 3;
          else ans = parseInt(ans, 10) - 1; // 1->0, 2->1, etc.

          result[qNum] = ans;
        }
      });

      return result;
    },

    // Check answers against correct answers
    checkAnswers: function (levelId, sectionFilter, parsedAnswers) {
      const DATA = window.EXAM_DATA;
      if (!DATA) return null;

      sectionFilter = sectionFilter || "all";
      const allQ = DATA.questions[levelId] || [];
      const questions =
        sectionFilter === "all"
          ? allQ
          : allQ.filter((q) => q.section === sectionFilter);

      let correct = 0;
      let wrong = 0;
      let unanswered = 0;
      const details = [];

      questions.forEach((q, idx) => {
        const qNum = idx + 1;
        const userAns = parsedAnswers[qNum];
        const correctAns = q.answer;
        const optLabels = ["A", "B", "C", "D"];

        if (userAns === undefined || userAns === null) {
          unanswered++;
          details.push({
            qNum,
            status: "unanswered",
            prompt: q.prompt,
            correctAns,
            correctLabel: optLabels[correctAns],
            correctText: (q.options || [])[correctAns] || "",
            userAns: null,
            userLabel: "-",
            explanation: q.explanation || ""
          });
        } else if (userAns === correctAns) {
          correct++;
          details.push({
            qNum,
            status: "correct",
            prompt: q.prompt,
            correctAns,
            correctLabel: optLabels[correctAns],
            correctText: (q.options || [])[correctAns] || "",
            userAns,
            userLabel: optLabels[userAns] || String(userAns + 1),
            explanation: q.explanation || ""
          });
        } else {
          wrong++;
          details.push({
            qNum,
            status: "wrong",
            prompt: q.prompt,
            correctAns,
            correctLabel: optLabels[correctAns],
            correctText: (q.options || [])[correctAns] || "",
            userAns,
            userLabel: optLabels[userAns] || String(userAns + 1),
            explanation: q.explanation || ""
          });
        }
      });

      const total = questions.length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

      return { correct, wrong, unanswered, total, pct, details };
    },

    // Render result into a container element
    renderResult: function (containerId, result, studentName) {
      const el = document.getElementById(containerId);
      if (!el || !result) return;

      const passed = result.pct >= 60;
      const stamp = passed ? "✅ PASS" : "❌ FAIL";
      const stampColor = passed ? "#16a34a" : "#dc2626";

      let detailRows = "";
      result.details.forEach((d) => {
        const icon =
          d.status === "correct" ? "✅" : d.status === "wrong" ? "❌" : "⬜";
        const bg =
          d.status === "correct"
            ? "#f0fdf4"
            : d.status === "wrong"
            ? "#fef2f2"
            : "#f9fafb";
        detailRows += `
          <div class="as-detail-row" style="background:${bg};border-left:3px solid ${
            d.status === "correct"
              ? "#16a34a"
              : d.status === "wrong"
              ? "#dc2626"
              : "#9ca3af"
          };padding:10px 12px;margin-bottom:8px;border-radius:4px;">
            <div style="font-weight:bold;margin-bottom:4px;">${icon} Q${d.qNum}</div>
            <div style="font-size:13px;color:#333;margin-bottom:4px;">${d.prompt}</div>
            <div style="font-size:12px;">
              Your Answer: <b style="color:${
                d.status === "correct" ? "#16a34a" : "#dc2626"
              }">${d.userLabel}</b>
              &nbsp;|&nbsp;
              Correct: <b style="color:#16a34a">${d.correctLabel} — ${d.correctText}</b>
            </div>
            ${
              d.explanation
                ? `<div style="font-size:11px;color:#555;margin-top:4px;font-style:italic;">💡 ${d.explanation}</div>`
                : ""
            }
          </div>`;
      });

      el.innerHTML = `
        <div style="text-align:center;padding:16px 0;">
          <div style="font-size:36px;font-weight:bold;color:${stampColor};">${stamp}</div>
          ${studentName ? `<div style="font-size:14px;color:#555;margin-top:4px;">Student: <b>${studentName}</b></div>` : ""}
          <div style="font-size:28px;font-weight:bold;margin-top:8px;">${result.correct}/${result.total}</div>
          <div style="font-size:15px;color:#555;">${result.pct}% Score</div>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:12px;font-size:13px;">
            <span style="color:#16a34a;">✅ Correct: <b>${result.correct}</b></span>
            <span style="color:#dc2626;">❌ Wrong: <b>${result.wrong}</b></span>
            <span style="color:#6b7280;">⬜ Unanswered: <b>${result.unanswered}</b></span>
          </div>
        </div>
        <hr style="margin:12px 0;border-color:#e5e7eb;">
        <div style="font-weight:bold;margin-bottom:8px;">Detailed Results:</div>
        ${detailRows}`;
    }
  };

  // =========================================================================
  // Inject Answer Sheet Panel into the page
  // =========================================================================

  function injectAnswerSheetUI() {
    // Create floating Answer Sheet button
    const fab = document.createElement("div");
    fab.id = "answer-sheet-fab";
    fab.innerHTML = `
      <button id="btn-open-answer-sheet" title="Open Answer Sheet / PDF" style="
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        background: #1a1a7e; color: #fff; border: none; border-radius: 50px;
        padding: 12px 20px; font-size: 14px; font-weight: bold;
        cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        display: flex; align-items: center; gap: 8px;
      ">
        <span>📄</span> Answer Sheet
      </button>`;
    document.body.appendChild(fab);

    // Create Answer Sheet Modal
    const modal = document.createElement("div");
    modal.id = "answer-sheet-modal";
    modal.style.cssText = `
      display:none; position:fixed; inset:0; z-index:10000;
      background:rgba(0,0,0,0.5); overflow-y:auto;`;
    modal.innerHTML = `
      <div style="
        background:#fff; max-width:600px; margin:30px auto; border-radius:12px;
        overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <!-- Header -->
        <div style="background:#1a1a7e;color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:18px;font-weight:bold;">📄 PDF & Answer Sheet</div>
            <div style="font-size:12px;opacity:0.8;">Download question paper or submit answers</div>
          </div>
          <button id="btn-close-answer-sheet" style="background:none;border:none;color:#fff;font-size:22px;cursor:pointer;">✕</button>
        </div>

        <!-- Tabs -->
        <div style="display:flex;border-bottom:2px solid #e5e7eb;">
          <button class="as-tab active" data-tab="pdf" style="flex:1;padding:12px;border:none;background:#f0f4ff;font-weight:bold;cursor:pointer;font-size:14px;">📥 Download PDF</button>
          <button class="as-tab" data-tab="submit" style="flex:1;padding:12px;border:none;background:#fff;cursor:pointer;font-size:14px;">✏️ Submit Answers</button>
          <button class="as-tab" data-tab="result" style="flex:1;padding:12px;border:none;background:#fff;cursor:pointer;font-size:14px;">📊 Result</button>
        </div>

        <!-- PDF Tab -->
        <div id="as-tab-pdf" class="as-tab-content" style="padding:20px;">
          <div style="margin-bottom:14px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:6px;">Select Level:</label>
            <select id="as-pdf-level" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
              <option value="N5">JLPT N5</option>
              <option value="N4">JLPT N4</option>
              <option value="N3">JLPT N3</option>
              <option value="JFT-A2">JFT-A2</option>
            </select>
          </div>
          <div style="margin-bottom:14px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:6px;">Section (optional):</label>
            <select id="as-pdf-section" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
              <option value="all">All Sections</option>
              <option value="vocab">Vocabulary & Kanji</option>
              <option value="grammar">Grammar</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
          </div>
          <button id="btn-generate-pdf" style="
            width:100%;padding:12px;background:#1a1a7e;color:#fff;
            border:none;border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;">
            📄 Generate & Download PDF Question Paper
          </button>
          <p style="font-size:11px;color:#6b7280;margin-top:8px;text-align:center;">
            A print dialog will open. Save as PDF or print directly.
          </p>
        </div>

        <!-- Submit Tab -->
        <div id="as-tab-submit" class="as-tab-content" style="padding:20px;display:none;">
          <div style="background:#fef9c3;border:1px solid #fde68a;border-radius:6px;padding:10px 12px;margin-bottom:14px;font-size:13px;">
            <b>📋 Format:</b> Write answers as <code>1-A, 2-C, 3-B</code> or <code>1-1, 2-3, 3-2</code><br>
            (Question Number - Option Letter/Number)
          </div>
          <div style="margin-bottom:10px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">Student Name:</label>
            <input id="as-student-name" type="text" placeholder="Enter student name..." style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
          </div>
          <div style="margin-bottom:10px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">Level:</label>
            <select id="as-submit-level" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
              <option value="N5">JLPT N5</option>
              <option value="N4">JLPT N4</option>
              <option value="N3">JLPT N3</option>
              <option value="JFT-A2">JFT-A2</option>
            </select>
          </div>
          <div style="margin-bottom:10px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">Section:</label>
            <select id="as-submit-section" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:14px;">
              <option value="all">All Sections</option>
              <option value="vocab">Vocabulary & Kanji</option>
              <option value="grammar">Grammar</option>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </select>
          </div>
          <div style="margin-bottom:14px;">
            <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">
              Your Answers <span style="font-weight:normal;color:#6b7280;">(e.g. 1-A, 2-C, 3-B, 4-A ...)</span>:
            </label>
            <textarea id="as-answer-input" rows="8" placeholder="1-A, 2-C, 3-B, 4-D, 5-A ..." style="
              width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;
              font-size:14px;font-family:monospace;resize:vertical;"></textarea>
          </div>
          <div id="as-submit-error" style="color:#dc2626;font-size:13px;margin-bottom:8px;display:none;"></div>
          <button id="btn-submit-answers" style="
            width:100%;padding:12px;background:#16a34a;color:#fff;
            border:none;border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;">
            ✅ Submit & Check Answers
          </button>
        </div>

        <!-- Result Tab -->
        <div id="as-tab-result" class="as-tab-content" style="padding:20px;display:none;">
          <div id="as-result-container" style="font-size:14px;color:#374151;">
            <div style="text-align:center;color:#9ca3af;padding:30px 0;">
              Submit answers first to see results here.
            </div>
          </div>
          <button id="btn-print-result-as" style="
            width:100%;margin-top:12px;padding:10px;background:#1a1a7e;color:#fff;
            border:none;border-radius:8px;font-size:14px;cursor:pointer;display:none;">
            🖨️ Print Result
          </button>
        </div>
      </div>`;

    document.body.appendChild(modal);

    // ---- Event Listeners ----

    document.getElementById("btn-open-answer-sheet").addEventListener("click", function () {
      modal.style.display = "block";
    });

    document.getElementById("btn-close-answer-sheet").addEventListener("click", function () {
      modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.style.display = "none";
    });

    // Tab switching
    modal.querySelectorAll(".as-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        modal.querySelectorAll(".as-tab").forEach(function (t) {
          t.style.background = "#fff";
          t.classList.remove("active");
        });
        tab.style.background = "#f0f4ff";
        tab.classList.add("active");

        modal.querySelectorAll(".as-tab-content").forEach(function (c) {
          c.style.display = "none";
        });
        document.getElementById("as-tab-" + tab.dataset.tab).style.display = "block";
      });
    });

    // Generate PDF
    document.getElementById("btn-generate-pdf").addEventListener("click", function () {
      const level = document.getElementById("as-pdf-level").value;
      const section = document.getElementById("as-pdf-section").value;
      window.generateQuestionPaper(level, section);
    });

    // Submit Answers
    document.getElementById("btn-submit-answers").addEventListener("click", function () {
      const level = document.getElementById("as-submit-level").value;
      const section = document.getElementById("as-submit-section").value;
      const name = document.getElementById("as-student-name").value.trim();
      const raw = document.getElementById("as-answer-input").value.trim();
      const errEl = document.getElementById("as-submit-error");

      if (!raw) {
        errEl.textContent = "Please enter your answers first.";
        errEl.style.display = "block";
        return;
      }
      errEl.style.display = "none";

      const parsed = window.AnswerSheetSystem.parseAnswers(raw);
      if (!Object.keys(parsed).length) {
        errEl.textContent = 'Could not parse answers. Use format: 1-A, 2-C, 3-B or 1-1, 2-3, 3-2';
        errEl.style.display = "block";
        return;
      }

      const result = window.AnswerSheetSystem.checkAnswers(level, section, parsed);
      if (!result) {
        errEl.textContent = "Error checking answers. Please try again.";
        errEl.style.display = "block";
        return;
      }

      // Store result for history
      try {
        const history = JSON.parse(localStorage.getItem("nihongo_exam_history_v1") || "[]");
        history.unshift({
          id: Date.now(),
          levelId: level,
          sectionFilter: section,
          studentName: name,
          score: result.correct,
          total: result.total,
          pct: result.pct,
          passed: result.pct >= 60,
          source: "answer-sheet",
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("nihongo_exam_history_v1", JSON.stringify(history.slice(0, 50)));
      } catch (_) {}

      // Render result
      window.AnswerSheetSystem.renderResult("as-result-container", result, name);
      document.getElementById("btn-print-result-as").style.display = "block";

      // Switch to result tab
      modal.querySelectorAll(".as-tab").forEach(function (t) {
        t.style.background = "#fff";
        t.classList.remove("active");
      });
      modal.querySelectorAll(".as-tab-content").forEach(function (c) {
        c.style.display = "none";
      });
      const resultTab = modal.querySelector('[data-tab="result"]');
      if (resultTab) {
        resultTab.style.background = "#f0f4ff";
        resultTab.classList.add("active");
      }
      document.getElementById("as-tab-result").style.display = "block";
    });

    // Print result
    document.getElementById("btn-print-result-as").addEventListener("click", function () {
      const content = document.getElementById("as-result-container").innerHTML;
      const win = window.open("", "_blank");
      if (!win) return;
      win.document.write(`<html><head><title>Exam Result</title>
        <style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;}</style>
        </head><body>${content}<script>window.onload=function(){window.print();}<\/script></body></html>`);
      win.document.close();
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectAnswerSheetUI);
  } else {
    injectAnswerSheetUI();
  }
})();
