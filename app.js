const UNIT_LIBRARY = {
  anspruch: {
    id: "anspruch",
    expression: "etwas in Anspruch nehmen",
    originalForm: "nimmt … in Anspruch",
    sentence: "Das tägliche Üben nimmt zwar Zeit in Anspruch, führt aber langfristig zu besseren Ergebnissen.",
    sentenceMarked: "Das tägliche Üben <mark class=\"target-highlight\">nimmt zwar Zeit in Anspruch</mark>, führt aber langfristig zu besseren Ergebnissen.",
    translationMarked: "Ежедневные занятия хотя и <mark class=\"target-highlight\">занимают время</mark>, но в долгосрочной перспективе дают лучшие результаты.",
    definition: "занимать, требовать времени или ресурсов",
    grammar: "etwas + Akk. in Anspruch nehmen · nahm in Anspruch · hat in Anspruch genommen",
    source: "Wiktionary · выбранное словарное значение",
    examples: [
      ["Die Reparatur wird drei Stunden in Anspruch nehmen.", "Ремонт займёт три часа."],
      ["Die Vorbereitung nahm viel Zeit in Anspruch.", "Подготовка потребовала много времени."]
    ],
    practicePrompt: "Скажите по-немецки: «Ремонт займёт три часа».",
    practiceHint: "Die Reparatur … drei Stunden in Anspruch …",
    answerTest: value => /reparatur/i.test(value) && /in\s+anspruch/i.test(value) && /(nimmt|nehmen)/i.test(value),
    nextContext: "Die Reparatur wird mehrere Tage in Anspruch nehmen.",
    difficultyBase: 58,
    reasons: ["порядок частей", "зависимость от подсказок"]
  },
  zuverlaessig: {
    id: "zuverlaessig",
    expression: "zuverlässig",
    originalForm: "zuverlässiger",
    sentence: "Ein zuverlässiger Lernplan muss nicht kompliziert sein.",
    sentenceMarked: "Ein <mark class=\"target-highlight\">zuverlässiger</mark> Lernplan muss nicht kompliziert sein.",
    translationMarked: "<mark class=\"target-highlight\">Надёжный</mark> план обучения не обязательно должен быть сложным.",
    definition: "надёжный; тот, на кого или на что можно положиться",
    grammar: "Adjektiv · zuverlässig · zuverlässiger · am zuverlässigsten",
    source: "Wiktionary · прилагательное",
    examples: [
      ["Sie ist sehr zuverlässig.", "Она очень надёжная."],
      ["Wir brauchen eine zuverlässige Lösung.", "Нам нужно надёжное решение."]
    ],
    practicePrompt: "Дополните: Wir brauchen eine ___ Lösung.",
    practiceHint: "Начинается с zuver…",
    answerTest: value => /zuverlässig/i.test(value),
    nextContext: "Auf diese Informationen kann man sich verlassen: Sie sind zuverlässig.",
    difficultyBase: 47,
    reasons: ["медленное воспроизведение"]
  },
  auseinandersetzen: {
    id: "auseinandersetzen",
    expression: "sich mit etwas auseinandersetzen",
    originalForm: "sich … mit … auseinanderzusetzen",
    sentence: "Hilfreich ist es, sich aktiv mit neuen Ausdrücken auseinanderzusetzen.",
    sentenceMarked: "Hilfreich ist es, <mark class=\"target-highlight\">sich aktiv mit neuen Ausdrücken auseinanderzusetzen</mark>.",
    translationMarked: "Полезно <mark class=\"target-highlight\">активно разбираться с новыми выражениями</mark>.",
    definition: "подробно заниматься темой; разбираться с чем-либо",
    grammar: "sich mit + Dat. auseinandersetzen · setzte sich auseinander · hat sich auseinandergesetzt",
    source: "Wiktionary · возвратный отделяемый глагол",
    examples: [
      ["Wir setzen uns mit dem Problem auseinander.", "Мы подробно разбираемся с проблемой."],
      ["Sie hat sich mit der Kritik auseinandergesetzt.", "Она проанализировала критику."]
    ],
    practicePrompt: "Скажите: «Я разбираюсь с этой проблемой».",
    practiceHint: "Ich setze mich mit diesem Problem …",
    answerTest: value => /setze/i.test(value) && /mich/i.test(value) && /mit/i.test(value) && /auseinander/i.test(value),
    nextContext: "Im Seminar setzen wir uns mit aktuellen Fragen auseinander.",
    difficultyBase: 83,
    reasons: ["ошибки управления", "возвратное местоимение", "4 подсказки"]
  }
};

const STORAGE_KEY = "wortaktiv-demo-v2";
const STAGES = ["understand", "card", "practice", "review"];
const ACTIVITY_LABELS = {
  understand: "Разбор",
  card: "Карточки",
  practice: "Практика",
  review: "Повтор"
};

function createInitialState() {
  return {
    selectedUnitId: "anspruch",
    stage: "understand",
    cardSide: "front",
    cardEdits: {},
    savedUnits: [],
    contexts: { anspruch: 2, zuverlaessig: 1, auseinandersetzen: 1 },
    todaySeconds: 34 * 60,
    attemptsTotal: 23,
    statsPeriod: "7",
    statsSort: "difficulty",
    activitySeconds: { understand: 39 * 60, card: 28 * 60, practice: 72 * 60, review: 22 * 60 },
    unitStats: {
      anspruch: { timeSeconds: 900, attempts: 8, errors: 2, hints: 2, successes: 4, lapses: 1 },
      zuverlaessig: { timeSeconds: 205, attempts: 5, errors: 1, hints: 1, successes: 4, lapses: 0 },
      auseinandersetzen: { timeSeconds: 730, attempts: 8, errors: 5, hints: 4, successes: 2, lapses: 2 }
    }
  };
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...createInitialState(), ...stored } : createInitialState();
  } catch {
    return createInitialState();
  }
}

let state = loadState();
if (!UNIT_LIBRARY[state.selectedUnitId]) state.selectedUnitId = "anspruch";
let currentView = "article";
let selectedText = "";
let lastActivityAt = Date.now();
let toastTimer;
let persistTicks = 0;
let isCardEditing = false;

const articleView = document.querySelector("#article-view");
const statisticsView = document.querySelector("#statistics-view");
const learningPanel = document.querySelector("#learning-panel");
const panelContent = document.querySelector("#panel-content");
const panelTitle = document.querySelector("#panel-unit-title");
const panelKicker = document.querySelector("#panel-kicker");
const selectionToolbar = document.querySelector("#selection-toolbar");
const toast = document.querySelector("#toast");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getUnit() {
  return UNIT_LIBRARY[state.selectedUnitId] || UNIT_LIBRARY.anspruch;
}

function markedHtmlToText(value) {
  return String(value)
    .replace(/<mark class="target-highlight">/g, "**")
    .replace(/<\/mark>/g, "**")
    .replace(/<br\s*\/?>/gi, "\n");
}

function getDefaultCardText(unit, side) {
  if (side === "front") return markedHtmlToText(unit.sentenceMarked);
  const examples = unit.examples.map(pair => `${pair[0]}\n${pair[1]}`).join("\n\n");
  return [
    markedHtmlToText(unit.sentenceMarked),
    markedHtmlToText(unit.translationMarked),
    `${unit.expression} — ${unit.definition}`,
    examples
  ].join("\n\n");
}

function getCardText(unit, side) {
  return state.cardEdits?.[unit.id]?.[side] ?? getDefaultCardText(unit, side);
}

function renderCardText(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<mark class="target-highlight">$1</mark>')
    .replace(/\n/g, "<br>");
}

function dictionaryUrl(unit) {
  return `https://de.wiktionary.org/wiki/Special:Search?search=${encodeURIComponent(unit.expression)}`;
}

function pluralErrors(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "ошибка";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return "ошибки";
  return "ошибок";
}

function formatDuration(seconds, compact = false) {
  const value = Math.max(0, Math.round(seconds));
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const rest = value % 60;
  if (hours) return `${hours} ч ${minutes} мин`;
  if (compact) return `${minutes} мин`;
  return `${minutes} мин ${String(rest).padStart(2, "0")} с`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
}

function setCurrentUnit(unitId) {
  if (!UNIT_LIBRARY[unitId]) return;
  state.selectedUnitId = unitId;
  state.stage = "understand";
  state.cardSide = "front";
  isCardEditing = false;
  learningPanel.classList.remove("is-collapsed");
  document.querySelectorAll(".study-target").forEach(element => {
    element.classList.toggle("is-current", element.dataset.unitId === unitId);
  });
  renderPanel();
  saveState();
}

function setStage(stage) {
  if (!STAGES.includes(stage)) return;
  state.stage = stage;
  if (stage !== "card") isCardEditing = false;
  document.querySelectorAll("[data-stage]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.stage === stage));
  });
  renderPanel();
  saveState();
}

function renderPanel() {
  const unit = getUnit();
  panelTitle.textContent = unit.expression;
  document.querySelectorAll("[data-stage]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.stage === state.stage));
  });

  if (state.stage === "understand") renderUnderstand(unit);
  if (state.stage === "card") renderCard(unit);
  if (state.stage === "practice") renderPractice(unit);
  if (state.stage === "review") renderReview(unit);
}

function renderUnderstand(unit) {
  panelKicker.textContent = "UNDERSTAND · словарь + контекст";
  panelContent.innerHTML = `
    <h3>Значение в этом предложении</h3>
    <p>Словарные факты отделены от контекстного объяснения.</p>
    <section class="info-block soft">
      <span class="block-label">Исходная форма</span>
      <strong>${escapeHtml(unit.originalForm)}</strong>
      <span class="source-line"><span class="source-badge">Контекст</span>Получено из статьи</span>
    </section>
    <section class="info-block">
      <span class="block-label">Выбранное значение</span>
      <strong>${escapeHtml(unit.definition)}</strong>
      <span class="source-line"><span class="source-badge">Словарь</span>${escapeHtml(unit.source)}</span>
    </section>
    <section class="info-block">
      <span class="block-label">Немецкая модель</span>
      <strong>${escapeHtml(unit.grammar)}</strong>
      <p>Уверенность контекстного выбора: высокая.</p>
    </section>
    <div class="audio-row">
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.expression)}">Выражение</button>
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.sentence)}">Предложение</button>
    </div>
    <div class="audio-status" data-audio-status>Немецкий системный голос · de-DE</div>
    <div class="panel-actions">
      <button class="primary-button" type="button" data-next-stage="card">Собрать карточку →</button>
    </div>`;
}

function renderCard(unit) {
  const isFront = state.cardSide === "front";
  const isSaved = state.savedUnits.includes(unit.id);
  const frontText = getCardText(unit, "front");
  const backText = getCardText(unit, "back");
  const hasEdits = Boolean(state.cardEdits?.[unit.id]);
  panelKicker.textContent = "CARD · формат Anki";
  panelContent.innerHTML = `
    <div class="card-heading">
      <div>
        <h3>${isCardEditing ? "Редактирование карточки" : "Предпросмотр карточки"}</h3>
        <p>${isCardEditing ? "Можно изменить обе стороны. **Текст** выделит целевое слово." : "Содержимое можно изменить перед сохранением."}</p>
      </div>
      ${isCardEditing ? "" : `<button class="secondary-button compact-button" type="button" data-edit-card>Редактировать</button>`}
    </div>
    <div class="card-switch" aria-label="Сторона карточки">
      <button type="button" data-card-side="front" aria-pressed="${isFront}" ${isCardEditing ? "disabled" : ""}>Лицевая</button>
      <button type="button" data-card-side="back" aria-pressed="${!isFront}" ${isCardEditing ? "disabled" : ""}>Обратная</button>
    </div>
    <section class="card-preview">
      ${isCardEditing ? `
        <label class="card-editor-label" for="card-front-editor">Лицевая сторона</label>
        <textarea class="card-editor" id="card-front-editor" rows="4">${escapeHtml(frontText)}</textarea>
        <label class="card-editor-label" for="card-back-editor">Обратная сторона</label>
        <textarea class="card-editor" id="card-back-editor" rows="10">${escapeHtml(backText)}</textarea>
        <div class="editor-note" id="card-editor-note">Изменения хранятся локально в этом браузере.</div>
      ` : `
        <span class="block-label">${isFront ? "Лицевая сторона" : "Обратная сторона"}${hasEdits ? " · изменено вами" : ""}</span>
        <div class="card-sentence card-user-content">${renderCardText(isFront ? frontText : backText)}</div>
        <div class="audio-row">
          <button class="audio-button" type="button" data-speak="${escapeHtml(unit.expression)}">Выражение</button>
          ${isFront ? "" : `<button class="audio-button" type="button" data-speak="${escapeHtml(unit.sentence)}">Предложение</button>`}
        </div>
        <div class="audio-status" data-audio-status>Немецкий системный голос · de-DE</div>
      `}
      <a class="dictionary-link" href="${dictionaryUrl(unit)}" target="_blank" rel="noopener noreferrer" aria-label="Открыть ${escapeHtml(unit.expression)} в Wiktionary в новой вкладке">Открыть «${escapeHtml(unit.expression)}» в Wiktionary ↗</a>
    </section>
    ${isCardEditing ? `
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-cancel-card-edit>Отмена</button>
        ${hasEdits ? `<button class="secondary-button" type="button" data-reset-card>Вернуть исходное</button>` : ""}
        <button class="primary-button" type="button" data-save-card-edit>Сохранить изменения</button>
      </div>
    ` : `
      <p class="card-caption">Поля текста и аудио сохраняются отдельно.</p>
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-next-stage="understand">← Назад</button>
        <button class="primary-button" type="button" data-save-anki ${isSaved ? "disabled" : ""}>${isSaved ? "Сохранено в Anki demo ✓" : "Добавить в Anki demo"}</button>
      </div>
    `}`;
}

function saveCardEdits() {
  const unit = getUnit();
  const frontEditor = document.querySelector("#card-front-editor");
  const backEditor = document.querySelector("#card-back-editor");
  const front = frontEditor?.value.trim();
  const back = backEditor?.value.trim();
  if (!front || !back) {
    const note = document.querySelector("#card-editor-note");
    note.textContent = "Обе стороны должны содержать текст.";
    note.classList.add("is-error");
    (!front ? frontEditor : backEditor)?.focus();
    return;
  }
  state.cardEdits ||= {};
  state.cardEdits[unit.id] = { front, back };
  isCardEditing = false;
  saveState();
  renderCard(unit);
  showToast("Изменения карточки сохранены локально.");
}

function resetCardEdits() {
  const unit = getUnit();
  if (state.cardEdits?.[unit.id]) delete state.cardEdits[unit.id];
  isCardEditing = false;
  saveState();
  renderCard(unit);
  showToast("Восстановлен исходный текст карточки.");
}

function renderPractice(unit) {
  const unitStats = state.unitStats[unit.id];
  panelKicker.textContent = "PRACTICE · активное воспроизведение";
  panelContent.innerHTML = `
    <h3>Используйте выражение</h3>
    <p>Сначала ответьте без подсказки. Ошибка не завершает упражнение.</p>
    <section class="practice-block">
      <span class="block-label">Задание</span>
      <p class="practice-prompt">${escapeHtml(unit.practicePrompt)}</p>
      <input class="answer-input" id="practice-answer" autocomplete="off" aria-label="Ответ по-немецки" placeholder="Введите немецкое предложение">
      <div class="feedback" id="practice-feedback">Попыток для этой единицы: ${unitStats.attempts}</div>
    </section>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-show-hint>Подсказка</button>
      <button class="primary-button" type="button" data-check-answer>Проверить ответ</button>
    </div>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-next-stage="card">← Карточка</button>
      <button class="secondary-button" type="button" data-next-stage="review">Повторная встреча →</button>
    </div>`;
}

function renderReview(unit) {
  const contextCount = state.contexts[unit.id] || 1;
  panelKicker.textContent = "REVIEW · новый контекст";
  panelContent.innerHTML = `
    <h3>Вы встретили это снова</h3>
    <p>Новый контекст углубляет знание и не создаёт дубликат карточки.</p>
    <section class="context-block">
      <span class="block-label">Встреча № ${contextCount + 1}</span>
      <strong>${escapeHtml(unit.nextContext)}</strong>
      <p>Другой контекст · то же значение</p>
    </section>
    <section class="info-block soft">
      <span class="block-label">Быстрый recall</span>
      <strong>Сможете объяснить выражение до открытия карточки?</strong>
      <p>Сохранение встречи увеличивает разнообразие контекстов.</p>
    </section>
    <div class="audio-row">
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.nextContext)}">Новый контекст</button>
    </div>
    <div class="audio-status" data-audio-status></div>
    <div class="panel-actions">
      <button class="primary-button" type="button" data-save-context>Сохранить новый контекст</button>
    </div>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-next-stage="practice">← Практика</button>
      <button class="secondary-button" type="button" data-open-statistics>Посмотреть статистику →</button>
    </div>`;
}

function speak(text, statusNode) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    statusNode.textContent = "Озвучивание недоступно в этом браузере.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  const germanVoice = window.speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith("de"));
  if (germanVoice) utterance.voice = germanVoice;
  utterance.onstart = () => { statusNode.textContent = `Воспроизводится: ${text}`; };
  utterance.onend = () => { statusNode.textContent = "Готово · немецкий голос de-DE"; };
  utterance.onerror = () => { statusNode.textContent = "Не удалось воспроизвести аудио."; };
  window.speechSynthesis.speak(utterance);
}

function saveToAnkiDemo() {
  const unit = getUnit();
  if (!state.savedUnits.includes(unit.id)) state.savedUnits.push(unit.id);
  document.querySelectorAll(`[data-unit-id="${unit.id}"]`).forEach(element => element.classList.add("is-learned"));
  saveState();
  showToast(`«${unit.expression}» сохранено в Anki demo без дубликата.`);
  setStage("practice");
}

function showHint() {
  const unit = getUnit();
  const feedback = document.querySelector("#practice-feedback");
  state.unitStats[unit.id].hints += 1;
  feedback.className = "feedback";
  feedback.textContent = `Подсказка: ${unit.practiceHint}`;
  saveState();
}

function checkPracticeAnswer() {
  const unit = getUnit();
  const answer = document.querySelector("#practice-answer");
  const feedback = document.querySelector("#practice-feedback");
  const unitStats = state.unitStats[unit.id];
  unitStats.attempts += 1;
  state.attemptsTotal += 1;

  if (unit.answerTest(answer.value.trim())) {
    unitStats.successes += 1;
    feedback.className = "feedback is-success";
    feedback.textContent = "Верно: целевая конструкция использована в подходящей форме.";
    showToast("Успешная попытка добавлена в профиль знания.");
  } else {
    unitStats.errors += 1;
    feedback.className = "feedback is-error";
    feedback.textContent = "Пока не получилось. Проверьте обязательные части конструкции или откройте подсказку.";
  }
  saveState();
}

function saveNewContext() {
  const unit = getUnit();
  state.contexts[unit.id] = (state.contexts[unit.id] || 1) + 1;
  state.activitySeconds.review += 18;
  saveState();
  showToast(`Контекст № ${state.contexts[unit.id]} добавлен к существующей карточке.`);
  renderReview(unit);
}

function calculateDifficulty(unitId) {
  const unit = UNIT_LIBRARY[unitId];
  const stats = state.unitStats[unitId];
  const evidenceAdjustment = stats.attempts < 3 ? 0 : stats.errors * 1.8 + stats.hints * 0.9 + stats.lapses * 2.4 - stats.successes * 0.55;
  return Math.max(0, Math.min(99, Math.round(unit.difficultyBase + evidenceAdjustment)));
}

function periodData(period) {
  const todayMinutes = Math.round(state.todaySeconds / 60);
  if (period === "30") {
    return { total: "10 ч 38 мин", units: 38, attempts: state.attemptsTotal + 89, values: [["Нед. 1", 133], ["Нед. 2", 149], ["Нед. 3", 167], ["Нед. 4", 189]] };
  }
  if (period === "all") {
    return { total: "54 ч", units: 126, attempts: state.attemptsTotal + 661, values: [["Апр", 380], ["Май", 460], ["Июн", 515], ["Июл", 601], ["Авг", 583], ["Сен", 701]] };
  }
  return { total: formatDuration((18 + 27 + 0 + 31 + 22 + 29 + todayMinutes) * 60, true), units: 11, attempts: state.attemptsTotal, values: [["Пн", 18], ["Вт", 27], ["Ср", 0], ["Чт", 31], ["Пт", 22], ["Сб", 29], ["Сегодня", todayMinutes]] };
}

function renderStatistics() {
  const data = periodData(state.statsPeriod);
  document.querySelector("#stats-today").textContent = formatDuration(state.todaySeconds, true);
  document.querySelector("#stats-units").textContent = String(data.units);
  document.querySelector("#stats-attempts").textContent = String(data.attempts);
  document.querySelector("#period-total").textContent = `Всего за период: ${data.total}`;

  const maxValue = Math.max(...data.values.map(item => item[1]), 1);
  const chart = document.querySelector("#day-chart");
  chart.style.gridTemplateColumns = `repeat(${data.values.length}, 1fr)`;
  chart.setAttribute("aria-label", `Активное время: ${data.values.map(item => `${item[0]} ${item[1]} минут`).join(", ")}`);
  chart.innerHTML = data.values.map(([label, value]) => `
    <div class="day-column" aria-label="${escapeHtml(label)}: ${value} минут">
      <span>${value}м</span>
      <span class="day-track"><span class="day-bar" style="height:${Math.round(value / maxValue * 100)}%"></span></span>
      <span>${escapeHtml(label)}</span>
    </div>`).join("");

  const breakdownEntries = Object.entries(state.activitySeconds);
  const breakdownTotal = Math.max(breakdownEntries.reduce((sum, entry) => sum + entry[1], 0), 1);
  document.querySelector("#activity-breakdown").innerHTML = breakdownEntries.map(([key, seconds]) => `
    <div class="breakdown-line">
      <span>${ACTIVITY_LABELS[key]}</span>
      <span class="breakdown-track"><span class="breakdown-fill" style="width:${Math.round(seconds / breakdownTotal * 100)}%"></span></span>
      <strong>${formatDuration(seconds, true)}</strong>
    </div>`).join("");

  const ranked = Object.keys(UNIT_LIBRARY).map(id => {
    const unit = UNIT_LIBRARY[id];
    const stats = state.unitStats[id];
    return { ...unit, ...stats, time: stats.timeSeconds, difficulty: calculateDifficulty(id) };
  }).sort((a, b) => b[state.statsSort] - a[state.statsSort]);

  document.querySelector("#unit-ranking").innerHTML = ranked.map(unit => `
    <article class="ranking-row">
      <div class="ranking-main">
        <strong>${escapeHtml(unit.expression)}</strong>
        <span>${escapeHtml(unit.reasons.join(" · "))} · ${unit.errors} ${pluralErrors(unit.errors)}</span>
      </div>
      <div class="ranking-numbers">
        <strong>${unit.attempts < 3 ? "мало данных" : `${unit.difficulty}/100`}</strong>
        <span>${formatDuration(unit.timeSeconds)} · ${unit.attempts} попыток</span>
      </div>
      <button class="ranking-action" type="button" data-practice-unit="${unit.id}">Практиковать</button>
    </article>`).join("");
}

function switchView(view) {
  currentView = view;
  const showStatistics = view === "statistics";
  articleView.hidden = showStatistics;
  statisticsView.hidden = !showStatistics;
  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.view === view);
    button.setAttribute("aria-pressed", String(button.dataset.view === view));
  });
  if (showStatistics) renderStatistics();
}

function analyzeSelection() {
  const normalized = selectedText.toLocaleLowerCase("de-DE");
  let unitId = "anspruch";
  if (normalized.includes("zuverläss")) unitId = "zuverlaessig";
  else if (normalized.includes("auseinander")) unitId = "auseinandersetzen";
  else if (!normalized.includes("anspruch")) {
    const selection = document.getSelection();
    const anchorElement = selection?.anchorNode?.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentElement : selection?.anchorNode;
    const sentence = anchorElement?.closest("p")?.textContent?.trim() || selectedText;
    const safeSentence = escapeHtml(sentence);
    const safeTarget = escapeHtml(selectedText);
    const selectedLower = selectedText.toLocaleLowerCase("de-DE");
    UNIT_LIBRARY.custom = {
      id: "custom",
      expression: selectedText,
      originalForm: selectedText,
      sentence,
      sentenceMarked: safeSentence.replace(safeTarget, `<mark class="target-highlight">${safeTarget}</mark>`),
      translationMarked: `<mark class="target-highlight">Демо-перевод</mark>: подключённый словарь или AI уточнит значение выбранного фрагмента.`,
      definition: "пользовательское выделение; требуется подтверждение значения",
      grammar: "Автоматический разбор будет добавлен после словарного поиска.",
      source: "Исходный текст · демо fallback",
      examples: [[sentence, "Перевод примера появится после подтверждения."]],
      practicePrompt: `Введите выбранный фрагмент ещё раз: «${selectedText}».`,
      practiceHint: `Начало: ${selectedText.slice(0, Math.max(2, Math.ceil(selectedText.length / 3)))}…`,
      answerTest: value => value.toLocaleLowerCase("de-DE").includes(selectedLower),
      nextContext: `Новый контекст для «${selectedText}» будет найден при следующей встрече.`,
      difficultyBase: 50,
      reasons: ["недостаточно данных"]
    };
    state.unitStats.custom = { timeSeconds: 0, attempts: 0, errors: 0, hints: 0, successes: 0, lapses: 0 };
    state.contexts.custom = 1;
    unitId = "custom";
    showToast("Создан черновик для пользовательского выделения.");
  }
  setCurrentUnit(unitId);
  selectionToolbar.hidden = true;
  document.getSelection()?.removeAllRanges();
}

document.addEventListener("pointerdown", () => { lastActivityAt = Date.now(); }, { passive: true });
document.addEventListener("keydown", () => { lastActivityAt = Date.now(); });

document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => setStage(button.dataset.stage)));
document.querySelectorAll(".study-target").forEach(target => {
  target.tabIndex = 0;
  target.addEventListener("click", () => setCurrentUnit(target.dataset.unitId));
  target.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setCurrentUnit(target.dataset.unitId);
    }
  });
});

document.querySelector("#article").addEventListener("mouseup", () => {
  const selection = document.getSelection();
  const text = selection?.toString().trim();
  if (!text || text.length < 2 || text.length > 180) {
    selectionToolbar.hidden = true;
    return;
  }
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  selectedText = text;
  document.querySelector("#selection-label").textContent = `«${text}»`;
  selectionToolbar.style.left = `${Math.max(12, Math.min(window.innerWidth - 372, rect.left))}px`;
  selectionToolbar.style.top = `${Math.max(76, rect.top - 56)}px`;
  selectionToolbar.hidden = false;
});

document.querySelector("#analyze-selection").addEventListener("click", analyzeSelection);
document.querySelector("#close-panel").addEventListener("click", () => learningPanel.classList.add("is-collapsed"));

panelContent.addEventListener("click", event => {
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) {
    const status = panelContent.querySelector("[data-audio-status]");
    speak(speakButton.dataset.speak, status);
    return;
  }
  const sideButton = event.target.closest("[data-card-side]");
  if (sideButton) {
    state.cardSide = sideButton.dataset.cardSide;
    renderCard(getUnit());
    return;
  }
  if (event.target.closest("[data-edit-card]")) {
    isCardEditing = true;
    renderCard(getUnit());
    document.querySelector("#card-front-editor")?.focus();
    return;
  }
  if (event.target.closest("[data-save-card-edit]")) {
    saveCardEdits();
    return;
  }
  if (event.target.closest("[data-cancel-card-edit]")) {
    isCardEditing = false;
    renderCard(getUnit());
    return;
  }
  if (event.target.closest("[data-reset-card]")) {
    resetCardEdits();
    return;
  }
  const stageButton = event.target.closest("[data-next-stage]");
  if (stageButton) {
    setStage(stageButton.dataset.nextStage);
    return;
  }
  if (event.target.closest("[data-save-anki]")) saveToAnkiDemo();
  if (event.target.closest("[data-show-hint]")) showHint();
  if (event.target.closest("[data-check-answer]")) checkPracticeAnswer();
  if (event.target.closest("[data-save-context]")) saveNewContext();
  if (event.target.closest("[data-open-statistics]")) switchView("statistics");
});

panelContent.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target.id === "practice-answer") checkPracticeAnswer();
});

document.querySelectorAll("[data-period]").forEach(button => button.addEventListener("click", () => {
  state.statsPeriod = button.dataset.period;
  document.querySelectorAll("[data-period]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  renderStatistics();
  saveState();
}));

document.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
  state.statsSort = button.dataset.sort;
  document.querySelectorAll("[data-sort]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  renderStatistics();
  saveState();
}));

document.querySelector("#unit-ranking").addEventListener("click", event => {
  const button = event.target.closest("[data-practice-unit]");
  if (!button) return;
  setCurrentUnit(button.dataset.practiceUnit);
  switchView("article");
  setStage("practice");
  learningPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  state = createInitialState();
  saveState();
  document.querySelectorAll(".study-target").forEach(element => element.classList.remove("is-learned"));
  setCurrentUnit("anspruch");
  switchView("article");
  showToast("Демо возвращено в исходное состояние.");
});

setInterval(() => {
  const isActive = document.visibilityState === "visible" && currentView === "article" && !learningPanel.classList.contains("is-collapsed") && Date.now() - lastActivityAt < 60_000;
  if (!isActive) return;
  const unitStats = state.unitStats[state.selectedUnitId];
  state.todaySeconds += 1;
  unitStats.timeSeconds += 1;
  state.activitySeconds[state.stage] += 1;
  document.querySelector("#header-today-time").textContent = formatDuration(state.todaySeconds, true);
  persistTicks += 1;
  if (persistTicks % 5 === 0) saveState();
}, 1000);

window.addEventListener("beforeunload", saveState);

state.savedUnits.forEach(unitId => document.querySelectorAll(`[data-unit-id="${unitId}"]`).forEach(element => element.classList.add("is-learned")));
document.querySelector("#header-today-time").textContent = formatDuration(state.todaySeconds, true);
document.querySelectorAll("[data-period]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.period === state.statsPeriod)));
document.querySelectorAll("[data-sort]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.sort === state.statsSort)));
setCurrentUnit(state.selectedUnitId);
switchView("article");
