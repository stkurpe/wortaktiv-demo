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
const TRANSLATIONS = {
  ru: {
    mainNav: "Основные разделы", article: "Статья", statistics: "Статистика", interfaceLanguage: "Язык интерфейса", resetDemo: "Сбросить демо",
    articleMeta: "Deutsch · B1–B2 · 4 минуты", activeTimeNote: "Время считается только при активной работе", today: "Сегодня", tryIt: "Попробуйте",
    selectionHelp: "Выделите фрагмент текста или нажмите на цветную учебную единицу.", demoArticle: "Учебный демонстрационный текст", localContext: "Контекст обрабатывается локально",
    closePanel: "Свернуть панель", stageNav: "Этапы работы с единицей", understand: "Понять", card: "Карточка", practice: "Практика", review: "Повтор",
    localAnalytics: "Локальная учебная аналитика", learningStats: "Статистика обучения", statsIntro: "Демо-данные объединяются с действиями текущей сессии.",
    days7: "7 дней", days30: "30 дней", allTime: "Всё время", activeTime: "активного времени", learningUnits: "Учебных единиц", selectedPeriod: "за выбранный период",
    attempts: "Попыток", writtenSpoken: "письменно и устно", timeByDay: "Время по дням", activityOnly: "Только активность", hardest: "Самые сложные",
    rankingHelp: "Рейтинг объясняет, что именно требует повторения.", difficulty: "Сложность", time: "Время", errors: "Ошибки", analyze: "Разобрать",
    understandKicker: "UNDERSTAND · словарь + контекст", meaningHere: "Значение в этом предложении", factsSeparated: "Словарные факты отделены от контекстного объяснения.",
    sourceForm: "Исходная форма", context: "Контекст", fromArticle: "Получено из статьи", selectedMeaning: "Выбранное значение", dictionary: "Словарь",
    openDictionary: "Открыть в онлайн-словаре", germanPattern: "Немецкая модель", confidence: "Уверенность контекстного выбора: высокая.", expression: "Выражение", sentence: "Предложение",
    voiceReady: "Немецкий системный голос · de-DE", buildCard: "Собрать карточку →", cardKicker: "CARD · формат Anki", editCard: "Редактирование карточки",
    cardPreview: "Предпросмотр карточки", editHelp: "Можно изменить обе стороны. **Текст** выделит целевое слово.", previewHelp: "Содержимое можно изменить перед сохранением.",
    edit: "Редактировать", cardSides: "Сторона карточки", front: "Лицевая", back: "Обратная", frontSide: "Лицевая сторона", backSide: "Обратная сторона", changed: "изменено вами",
    localEditNote: "Изменения хранятся локально в этом браузере.", cancel: "Отмена", restore: "Вернуть исходное", saveChanges: "Сохранить изменения",
    cardFields: "Поля текста и аудио сохраняются отдельно.", backButton: "← Назад", savedAnki: "Сохранено в Anki demo ✓", addAnki: "Добавить в Anki demo",
    bothSides: "Обе стороны должны содержать текст.", editsSaved: "Изменения карточки сохранены локально.", originalRestored: "Восстановлен исходный текст карточки.",
    practiceKicker: "PRACTICE · активное воспроизведение", useExpression: "Используйте выражение", answerFirst: "Сначала ответьте без подсказки. Ошибка не завершает упражнение.",
    task: "Задание", answerLabel: "Ответ по-немецки", answerPlaceholder: "Введите немецкое предложение", attemptsForUnit: "Попыток для этой единицы: {count}", hint: "Подсказка",
    checkAnswer: "Проверить ответ", cardBack: "← Карточка", nextEncounter: "Повторная встреча →", reviewKicker: "REVIEW · новый контекст", metAgain: "Вы встретили это снова",
    contextDeepens: "Новый контекст углубляет знание и не создаёт дубликат карточки.", encounter: "Встреча № {count}", otherContext: "Другой контекст · то же значение",
    quickRecall: "Быстрый recall", explainBefore: "Сможете объяснить выражение до открытия карточки?", contextVariety: "Сохранение встречи увеличивает разнообразие контекстов.",
    newContext: "Новый контекст", saveContext: "Сохранить новый контекст", practiceBack: "← Практика", viewStats: "Посмотреть статистику →",
    audioUnavailable: "Озвучивание недоступно в этом браузере.", playing: "Воспроизводится: {text}", audioDone: "Готово · немецкий голос de-DE", audioError: "Не удалось воспроизвести аудио.",
    ankiSaved: "«{word}» сохранено в Anki demo без дубликата.", hintPrefix: "Подсказка: {hint}", correct: "Верно: целевая конструкция использована в подходящей форме.",
    successAdded: "Успешная попытка добавлена в профиль знания.", incorrect: "Пока не получилось. Проверьте обязательные части конструкции или откройте подсказку.",
    contextSaved: "Контекст № {count} добавлен к существующей карточке.", totalPeriod: "Всего за период: {total}", activeTimeAria: "Активное время", minuteShort: "м",
    lowData: "мало данных", attemptCount: "{count} попыток", practiceAction: "Практиковать", draftCreated: "Создан черновик для пользовательского выделения.", resetDone: "Демо возвращено в исходное состояние.",
    activityUnderstand: "Разбор", activityCard: "Карточки", activityPractice: "Практика", activityReview: "Повтор", exportStats: "Экспорт статистики", exportReady: "Файл статистики скачан.", exportError: "Не удалось создать файл.", pdfTitle: "Отчёт WortAktiv", generated: "Создан", hints: "Подсказки"
  },
  en: {
    mainNav: "Main sections", article: "Article", statistics: "Statistics", interfaceLanguage: "Interface language", resetDemo: "Reset demo",
    articleMeta: "German · B1–B2 · 4 minutes", activeTimeNote: "Time is counted only while you are active", today: "Today", tryIt: "Try it",
    selectionHelp: "Select a passage or click a highlighted learning unit.", demoArticle: "Learning demo text", localContext: "Context is processed locally",
    closePanel: "Close panel", stageNav: "Learning stages", understand: "Understand", card: "Card", practice: "Practice", review: "Review",
    localAnalytics: "Local learning analytics", learningStats: "Learning statistics", statsIntro: "Demo data is combined with actions from this session.",
    days7: "7 days", days30: "30 days", allTime: "All time", activeTime: "active time", learningUnits: "Learning units", selectedPeriod: "in the selected period",
    attempts: "Attempts", writtenSpoken: "written and spoken", timeByDay: "Time by day", activityOnly: "Active time only", hardest: "Hardest units",
    rankingHelp: "The ranking explains what needs more practice.", difficulty: "Difficulty", time: "Time", errors: "Errors", analyze: "Analyze",
    understandKicker: "UNDERSTAND · dictionary + context", meaningHere: "Meaning in this sentence", factsSeparated: "Dictionary facts are separated from the contextual explanation.",
    sourceForm: "Source form", context: "Context", fromArticle: "Taken from the article", selectedMeaning: "Selected meaning", dictionary: "Dictionary",
    openDictionary: "Open in online dictionary", germanPattern: "German pattern", confidence: "Context selection confidence: high.", expression: "Expression", sentence: "Sentence",
    voiceReady: "German system voice · de-DE", buildCard: "Build card →", cardKicker: "CARD · Anki format", editCard: "Edit card",
    cardPreview: "Card preview", editHelp: "Edit both sides. **Text** highlights the target expression.", previewHelp: "You can edit the content before saving.",
    edit: "Edit", cardSides: "Card side", front: "Front", back: "Back", frontSide: "Front side", backSide: "Back side", changed: "edited by you",
    localEditNote: "Changes are stored locally in this browser.", cancel: "Cancel", restore: "Restore original", saveChanges: "Save changes",
    cardFields: "Text and audio fields are stored separately.", backButton: "← Back", savedAnki: "Saved to Anki demo ✓", addAnki: "Add to Anki demo",
    bothSides: "Both sides must contain text.", editsSaved: "Card changes saved locally.", originalRestored: "Original card content restored.",
    practiceKicker: "PRACTICE · active recall", useExpression: "Use the expression", answerFirst: "Answer without a hint first. A mistake does not end the exercise.",
    task: "Task", answerLabel: "Answer in German", answerPlaceholder: "Enter a German sentence", attemptsForUnit: "Attempts for this unit: {count}", hint: "Hint",
    checkAnswer: "Check answer", cardBack: "← Card", nextEncounter: "Next encounter →", reviewKicker: "REVIEW · new context", metAgain: "You found it again",
    contextDeepens: "A new context deepens knowledge without creating a duplicate card.", encounter: "Encounter #{count}", otherContext: "Different context · same meaning",
    quickRecall: "Quick recall", explainBefore: "Can you explain the expression before opening the card?", contextVariety: "Saving this encounter increases context variety.",
    newContext: "New context", saveContext: "Save new context", practiceBack: "← Practice", viewStats: "View statistics →",
    audioUnavailable: "Speech is unavailable in this browser.", playing: "Playing: {text}", audioDone: "Done · German voice de-DE", audioError: "Could not play audio.",
    ankiSaved: "“{word}” was saved to Anki demo without a duplicate.", hintPrefix: "Hint: {hint}", correct: "Correct: the target construction is used in a suitable form.",
    successAdded: "Successful attempt added to the knowledge profile.", incorrect: "Not quite. Check the required parts or open the hint.",
    contextSaved: "Context #{count} was added to the existing card.", totalPeriod: "Total for period: {total}", activeTimeAria: "Active time", minuteShort: "m",
    lowData: "not enough data", attemptCount: "{count} attempts", practiceAction: "Practice", draftCreated: "A draft was created for the selected text.", resetDone: "The demo was reset.",
    activityUnderstand: "Analysis", activityCard: "Cards", activityPractice: "Practice", activityReview: "Review", exportStats: "Export statistics", exportReady: "Statistics file downloaded.", exportError: "Could not create the file.", pdfTitle: "WortAktiv report", generated: "Generated", hints: "Hints"
  },
  de: {
    mainNav: "Hauptbereiche", article: "Artikel", statistics: "Statistik", interfaceLanguage: "Sprache der Oberfläche", resetDemo: "Demo zurücksetzen",
    articleMeta: "Deutsch · B1–B2 · 4 Minuten", activeTimeNote: "Zeit wird nur bei aktiver Nutzung gezählt", today: "Heute", tryIt: "Probieren Sie es aus",
    selectionHelp: "Markieren Sie einen Textabschnitt oder klicken Sie auf eine hervorgehobene Lerneinheit.", demoArticle: "Lerntext zur Demonstration", localContext: "Kontext wird lokal verarbeitet",
    closePanel: "Panel schließen", stageNav: "Lernschritte", understand: "Verstehen", card: "Karte", practice: "Üben", review: "Wiederholen",
    localAnalytics: "Lokale Lernanalyse", learningStats: "Lernstatistik", statsIntro: "Demodaten werden mit den Aktionen dieser Sitzung kombiniert.",
    days7: "7 Tage", days30: "30 Tage", allTime: "Gesamt", activeTime: "aktive Zeit", learningUnits: "Lerneinheiten", selectedPeriod: "im gewählten Zeitraum",
    attempts: "Versuche", writtenSpoken: "schriftlich und mündlich", timeByDay: "Zeit pro Tag", activityOnly: "Nur aktive Zeit", hardest: "Schwierigste Einheiten",
    rankingHelp: "Die Rangliste zeigt, was weiter geübt werden sollte.", difficulty: "Schwierigkeit", time: "Zeit", errors: "Fehler", analyze: "Analysieren",
    understandKicker: "VERSTEHEN · Wörterbuch + Kontext", meaningHere: "Bedeutung in diesem Satz", factsSeparated: "Wörterbuchangaben und kontextuelle Erklärung sind getrennt.",
    sourceForm: "Ausgangsform", context: "Kontext", fromArticle: "Aus dem Artikel übernommen", selectedMeaning: "Gewählte Bedeutung", dictionary: "Wörterbuch",
    openDictionary: "Im Online-Wörterbuch öffnen", germanPattern: "Deutsches Muster", confidence: "Sicherheit der Kontextauswahl: hoch.", expression: "Ausdruck", sentence: "Satz",
    voiceReady: "Deutsche Systemstimme · de-DE", buildCard: "Karte erstellen →", cardKicker: "KARTE · Anki-Format", editCard: "Karte bearbeiten",
    cardPreview: "Kartenvorschau", editHelp: "Beide Seiten können bearbeitet werden. **Text** markiert den Zielausdruck.", previewHelp: "Der Inhalt kann vor dem Speichern bearbeitet werden.",
    edit: "Bearbeiten", cardSides: "Kartenseite", front: "Vorderseite", back: "Rückseite", frontSide: "Vorderseite", backSide: "Rückseite", changed: "von Ihnen geändert",
    localEditNote: "Änderungen werden lokal in diesem Browser gespeichert.", cancel: "Abbrechen", restore: "Original wiederherstellen", saveChanges: "Änderungen speichern",
    cardFields: "Text- und Audiofelder werden getrennt gespeichert.", backButton: "← Zurück", savedAnki: "In Anki-Demo gespeichert ✓", addAnki: "Zur Anki-Demo hinzufügen",
    bothSides: "Beide Seiten müssen Text enthalten.", editsSaved: "Kartenänderungen wurden lokal gespeichert.", originalRestored: "Ursprünglicher Karteninhalt wiederhergestellt.",
    practiceKicker: "ÜBEN · aktives Abrufen", useExpression: "Ausdruck verwenden", answerFirst: "Antworten Sie zuerst ohne Hinweis. Ein Fehler beendet die Übung nicht.",
    task: "Aufgabe", answerLabel: "Antwort auf Deutsch", answerPlaceholder: "Deutschen Satz eingeben", attemptsForUnit: "Versuche für diese Einheit: {count}", hint: "Hinweis",
    checkAnswer: "Antwort prüfen", cardBack: "← Karte", nextEncounter: "Nächste Begegnung →", reviewKicker: "WIEDERHOLEN · neuer Kontext", metAgain: "Erneut gefunden",
    contextDeepens: "Ein neuer Kontext vertieft das Wissen, ohne eine doppelte Karte anzulegen.", encounter: "Begegnung Nr. {count}", otherContext: "Anderer Kontext · gleiche Bedeutung",
    quickRecall: "Schneller Abruf", explainBefore: "Können Sie den Ausdruck erklären, bevor Sie die Karte öffnen?", contextVariety: "Das Speichern erhöht die Vielfalt der Kontexte.",
    newContext: "Neuer Kontext", saveContext: "Neuen Kontext speichern", practiceBack: "← Üben", viewStats: "Statistik ansehen →",
    audioUnavailable: "Sprachausgabe ist in diesem Browser nicht verfügbar.", playing: "Wiedergabe: {text}", audioDone: "Fertig · deutsche Stimme de-DE", audioError: "Audio konnte nicht abgespielt werden.",
    ankiSaved: "„{word}“ wurde ohne Duplikat in der Anki-Demo gespeichert.", hintPrefix: "Hinweis: {hint}", correct: "Richtig: Die Zielkonstruktion wurde passend verwendet.",
    successAdded: "Erfolgreicher Versuch wurde zum Wissensprofil hinzugefügt.", incorrect: "Noch nicht. Prüfen Sie die notwendigen Teile oder öffnen Sie den Hinweis.",
    contextSaved: "Kontext Nr. {count} wurde zur vorhandenen Karte hinzugefügt.", totalPeriod: "Gesamt im Zeitraum: {total}", activeTimeAria: "Aktive Zeit", minuteShort: "Min.",
    lowData: "zu wenig Daten", attemptCount: "{count} Versuche", practiceAction: "Üben", draftCreated: "Für die Auswahl wurde ein Entwurf erstellt.", resetDone: "Die Demo wurde zurückgesetzt.",
    activityUnderstand: "Analyse", activityCard: "Karten", activityPractice: "Üben", activityReview: "Wiederholen", exportStats: "Statistik exportieren", exportReady: "Statistikdatei heruntergeladen.", exportError: "Datei konnte nicht erstellt werden.", pdfTitle: "WortAktiv-Bericht", generated: "Erstellt", hints: "Hinweise"
  }
};

const REASON_TRANSLATIONS = {
  en: {
    "порядок частей": "part order", "зависимость от подсказок": "hint dependency", "медленное воспроизведение": "slow recall",
    "ошибки управления": "case-government errors", "возвратное местоимение": "reflexive pronoun", "4 подсказки": "4 hints", "недостаточно данных": "not enough data"
  },
  de: {
    "порядок частей": "Reihenfolge der Teile", "зависимость от подсказок": "Abhängigkeit von Hinweisen", "медленное воспроизведение": "langsamer Abruf",
    "ошибки управления": "Rektionsfehler", "возвратное местоимение": "Reflexivpronomen", "4 подсказки": "4 Hinweise", "недостаточно данных": "zu wenig Daten"
  }
};

function createInitialState() {
  return {
    selectedUnitId: "anspruch",
    locale: "ru",
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
if (!TRANSLATIONS[state.locale]) state.locale = "ru";
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

function t(key, values = {}) {
  const dictionary = TRANSLATIONS[state.locale] || TRANSLATIONS.ru;
  return (dictionary[key] || TRANSLATIONS.ru[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
}

function applyLocale() {
  document.documentElement.lang = state.locale;
  document.querySelector("#interface-language").value = state.locale;
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach(node => { node.setAttribute("aria-label", t(node.dataset.i18nAria)); });
  document.querySelector("#interface-language").setAttribute("aria-label", t("interfaceLanguage"));
  document.querySelector("#header-today-time").textContent = formatDuration(state.todaySeconds, true);
  renderPanel();
  if (currentView === "statistics") renderStatistics();
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

function localizedReasons(reasons) {
  if (state.locale === "ru") return reasons;
  return reasons.map(reason => REASON_TRANSLATIONS[state.locale]?.[reason] || reason);
}

function formatDuration(seconds, compact = false) {
  const value = Math.max(0, Math.round(seconds));
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const rest = value % 60;
  const units = state.locale === "en" ? ["h", "min", "s"] : state.locale === "de" ? ["Std.", "Min.", "Sek."] : ["ч", "мин", "с"];
  if (hours) return `${hours} ${units[0]} ${minutes} ${units[1]}`;
  if (compact) return `${minutes} ${units[1]}`;
  return `${minutes} ${units[1]} ${String(rest).padStart(2, "0")} ${units[2]}`;
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
  panelKicker.textContent = t("understandKicker");
  panelContent.innerHTML = `
    <h3>${t("meaningHere")}</h3>
    <p>${t("factsSeparated")}</p>
    <section class="info-block soft">
      <span class="block-label">${t("sourceForm")}</span>
      <strong>${escapeHtml(unit.originalForm)}</strong>
      <span class="source-line"><span class="source-badge">${t("context")}</span>${t("fromArticle")}</span>
    </section>
    <section class="info-block">
      <span class="block-label">${t("selectedMeaning")}</span>
      <strong>${escapeHtml(unit.definition)}</strong>
      <span class="source-line"><span class="source-badge">${t("dictionary")}</span>${escapeHtml(unit.source)}</span>
      <a class="dictionary-link" href="${dictionaryUrl(unit)}" target="_blank" rel="noopener noreferrer" aria-label="${t("openDictionary")}: ${escapeHtml(unit.expression)} — Wiktionary">
        <span aria-hidden="true">↗</span>
        <span>${t("openDictionary")}</span>
        <small>Wiktionary</small>
      </a>
    </section>
    <section class="info-block">
      <span class="block-label">${t("germanPattern")}</span>
      <strong>${escapeHtml(unit.grammar)}</strong>
      <p>${t("confidence")}</p>
    </section>
    <div class="audio-row">
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.expression)}">${t("expression")}</button>
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.sentence)}">${t("sentence")}</button>
    </div>
    <div class="audio-status" data-audio-status>${t("voiceReady")}</div>
    <div class="panel-actions">
      <button class="primary-button" type="button" data-next-stage="card">${t("buildCard")}</button>
    </div>`;
}

function renderCard(unit) {
  const isFront = state.cardSide === "front";
  const isSaved = state.savedUnits.includes(unit.id);
  const frontText = getCardText(unit, "front");
  const backText = getCardText(unit, "back");
  const hasEdits = Boolean(state.cardEdits?.[unit.id]);
  panelKicker.textContent = t("cardKicker");
  panelContent.innerHTML = `
    <div class="card-heading">
      <div>
        <h3>${isCardEditing ? t("editCard") : t("cardPreview")}</h3>
        <p>${isCardEditing ? t("editHelp") : t("previewHelp")}</p>
      </div>
      ${isCardEditing ? "" : `<button class="secondary-button compact-button" type="button" data-edit-card>${t("edit")}</button>`}
    </div>
    <div class="card-switch" aria-label="${t("cardSides")}">
      <button type="button" data-card-side="front" aria-pressed="${isFront}" ${isCardEditing ? "disabled" : ""}>${t("front")}</button>
      <button type="button" data-card-side="back" aria-pressed="${!isFront}" ${isCardEditing ? "disabled" : ""}>${t("back")}</button>
    </div>
    <section class="card-preview">
      ${isCardEditing ? `
        <label class="card-editor-label" for="card-front-editor">${t("frontSide")}</label>
        <textarea class="card-editor" id="card-front-editor" rows="4">${escapeHtml(frontText)}</textarea>
        <label class="card-editor-label" for="card-back-editor">${t("backSide")}</label>
        <textarea class="card-editor" id="card-back-editor" rows="10">${escapeHtml(backText)}</textarea>
        <div class="editor-note" id="card-editor-note">${t("localEditNote")}</div>
      ` : `
        <span class="block-label">${isFront ? t("frontSide") : t("backSide")}${hasEdits ? ` · ${t("changed")}` : ""}</span>
        <div class="card-sentence card-user-content">${renderCardText(isFront ? frontText : backText)}</div>
        <div class="audio-row">
          <button class="audio-button" type="button" data-speak="${escapeHtml(unit.expression)}">${t("expression")}</button>
          ${isFront ? "" : `<button class="audio-button" type="button" data-speak="${escapeHtml(unit.sentence)}">${t("sentence")}</button>`}
        </div>
        <div class="audio-status" data-audio-status>${t("voiceReady")}</div>
      `}
    </section>
    ${isCardEditing ? `
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-cancel-card-edit>${t("cancel")}</button>
        ${hasEdits ? `<button class="secondary-button" type="button" data-reset-card>${t("restore")}</button>` : ""}
        <button class="primary-button" type="button" data-save-card-edit>${t("saveChanges")}</button>
      </div>
    ` : `
      <p class="card-caption">${t("cardFields")}</p>
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-next-stage="understand">${t("backButton")}</button>
        <button class="primary-button" type="button" data-save-anki ${isSaved ? "disabled" : ""}>${isSaved ? t("savedAnki") : t("addAnki")}</button>
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
    note.textContent = t("bothSides");
    note.classList.add("is-error");
    (!front ? frontEditor : backEditor)?.focus();
    return;
  }
  state.cardEdits ||= {};
  state.cardEdits[unit.id] = { front, back };
  isCardEditing = false;
  saveState();
  renderCard(unit);
  showToast(t("editsSaved"));
}

function resetCardEdits() {
  const unit = getUnit();
  if (state.cardEdits?.[unit.id]) delete state.cardEdits[unit.id];
  isCardEditing = false;
  saveState();
  renderCard(unit);
  showToast(t("originalRestored"));
}

function renderPractice(unit) {
  const unitStats = state.unitStats[unit.id];
  panelKicker.textContent = t("practiceKicker");
  panelContent.innerHTML = `
    <h3>${t("useExpression")}</h3>
    <p>${t("answerFirst")}</p>
    <section class="practice-block">
      <span class="block-label">${t("task")}</span>
      <p class="practice-prompt">${escapeHtml(unit.practicePrompt)}</p>
      <input class="answer-input" id="practice-answer" autocomplete="off" aria-label="${t("answerLabel")}" placeholder="${t("answerPlaceholder")}">
      <div class="feedback" id="practice-feedback">${t("attemptsForUnit", { count: unitStats.attempts })}</div>
    </section>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-show-hint>${t("hint")}</button>
      <button class="primary-button" type="button" data-check-answer>${t("checkAnswer")}</button>
    </div>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-next-stage="card">${t("cardBack")}</button>
      <button class="secondary-button" type="button" data-next-stage="review">${t("nextEncounter")}</button>
    </div>`;
}

function renderReview(unit) {
  const contextCount = state.contexts[unit.id] || 1;
  panelKicker.textContent = t("reviewKicker");
  panelContent.innerHTML = `
    <h3>${t("metAgain")}</h3>
    <p>${t("contextDeepens")}</p>
    <section class="context-block">
      <span class="block-label">${t("encounter", { count: contextCount + 1 })}</span>
      <strong>${escapeHtml(unit.nextContext)}</strong>
      <p>${t("otherContext")}</p>
    </section>
    <section class="info-block soft">
      <span class="block-label">${t("quickRecall")}</span>
      <strong>${t("explainBefore")}</strong>
      <p>${t("contextVariety")}</p>
    </section>
    <div class="audio-row">
      <button class="audio-button" type="button" data-speak="${escapeHtml(unit.nextContext)}">${t("newContext")}</button>
    </div>
    <div class="audio-status" data-audio-status></div>
    <div class="panel-actions">
      <button class="primary-button" type="button" data-save-context>${t("saveContext")}</button>
    </div>
    <div class="panel-actions">
      <button class="secondary-button" type="button" data-next-stage="practice">${t("practiceBack")}</button>
      <button class="secondary-button" type="button" data-open-statistics>${t("viewStats")}</button>
    </div>`;
}

function speak(text, statusNode) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    statusNode.textContent = t("audioUnavailable");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  const germanVoice = window.speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith("de"));
  if (germanVoice) utterance.voice = germanVoice;
  utterance.onstart = () => { statusNode.textContent = t("playing", { text }); };
  utterance.onend = () => { statusNode.textContent = t("audioDone"); };
  utterance.onerror = () => { statusNode.textContent = t("audioError"); };
  window.speechSynthesis.speak(utterance);
}

function saveToAnkiDemo() {
  const unit = getUnit();
  if (!state.savedUnits.includes(unit.id)) state.savedUnits.push(unit.id);
  document.querySelectorAll(`[data-unit-id="${unit.id}"]`).forEach(element => element.classList.add("is-learned"));
  saveState();
  showToast(t("ankiSaved", { word: unit.expression }));
  setStage("practice");
}

function showHint() {
  const unit = getUnit();
  const feedback = document.querySelector("#practice-feedback");
  state.unitStats[unit.id].hints += 1;
  feedback.className = "feedback";
  feedback.textContent = t("hintPrefix", { hint: unit.practiceHint });
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
    feedback.textContent = t("correct");
    showToast(t("successAdded"));
  } else {
    unitStats.errors += 1;
    feedback.className = "feedback is-error";
    feedback.textContent = t("incorrect");
  }
  saveState();
}

function saveNewContext() {
  const unit = getUnit();
  state.contexts[unit.id] = (state.contexts[unit.id] || 1) + 1;
  state.activitySeconds.review += 18;
  saveState();
  showToast(t("contextSaved", { count: state.contexts[unit.id] }));
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
  const labels = state.locale === "en"
    ? { weeks: ["Week 1", "Week 2", "Week 3", "Week 4"], months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"], days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"] }
    : state.locale === "de"
      ? { weeks: ["Woche 1", "Woche 2", "Woche 3", "Woche 4"], months: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep"], days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "Heute"] }
      : { weeks: ["Нед. 1", "Нед. 2", "Нед. 3", "Нед. 4"], months: ["Апр", "Май", "Июн", "Июл", "Авг", "Сен"], days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Сегодня"] };
  if (period === "30") {
    return { total: formatDuration(38280, true), units: 38, attempts: state.attemptsTotal + 89, values: labels.weeks.map((label, index) => [label, [133, 149, 167, 189][index]]) };
  }
  if (period === "all") {
    return { total: formatDuration(194400, true), units: 126, attempts: state.attemptsTotal + 661, values: labels.months.map((label, index) => [label, [380, 460, 515, 601, 583, 701][index]]) };
  }
  return { total: formatDuration((18 + 27 + 0 + 31 + 22 + 29 + todayMinutes) * 60, true), units: 11, attempts: state.attemptsTotal, values: labels.days.map((label, index) => [label, [18, 27, 0, 31, 22, 29, todayMinutes][index]]) };
}

function renderStatistics() {
  const data = periodData(state.statsPeriod);
  document.querySelector("#stats-today").textContent = formatDuration(state.todaySeconds, true);
  document.querySelector("#stats-units").textContent = String(data.units);
  document.querySelector("#stats-attempts").textContent = String(data.attempts);
  document.querySelector("#period-total").textContent = t("totalPeriod", { total: data.total });

  const maxValue = Math.max(...data.values.map(item => item[1]), 1);
  const chart = document.querySelector("#day-chart");
  chart.style.gridTemplateColumns = `repeat(${data.values.length}, 1fr)`;
  chart.setAttribute("aria-label", `${t("activeTimeAria")}: ${data.values.map(item => `${item[0]} ${item[1]}`).join(", ")}`);
  chart.innerHTML = data.values.map(([label, value]) => `
    <div class="day-column" aria-label="${escapeHtml(label)}: ${value}">
      <span>${value}${t("minuteShort")}</span>
      <span class="day-track"><span class="day-bar" style="height:${Math.round(value / maxValue * 100)}%"></span></span>
      <span>${escapeHtml(label)}</span>
    </div>`).join("");

  const breakdownEntries = Object.entries(state.activitySeconds);
  const breakdownTotal = Math.max(breakdownEntries.reduce((sum, entry) => sum + entry[1], 0), 1);
  document.querySelector("#activity-breakdown").innerHTML = breakdownEntries.map(([key, seconds]) => `
    <div class="breakdown-line">
      <span>${t(`activity${key[0].toUpperCase()}${key.slice(1)}`)}</span>
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
        <span>${escapeHtml(localizedReasons(unit.reasons).join(" · "))} · ${unit.errors} ${state.locale === "ru" ? pluralErrors(unit.errors) : t("errors").toLowerCase()}</span>
      </div>
      <div class="ranking-numbers">
        <strong>${unit.attempts < 3 ? t("lowData") : `${unit.difficulty}/100`}</strong>
        <span>${formatDuration(unit.timeSeconds)} · ${t("attemptCount", { count: unit.attempts })}</span>
      </div>
      <button class="ranking-action" type="button" data-practice-unit="${unit.id}">${t("practiceAction")}</button>
    </article>`).join("");
}

function statisticsExportData() {
  const period = periodData(state.statsPeriod);
  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    interfaceLanguage: state.locale,
    selectedPeriod: state.statsPeriod,
    summary: {
      todaySeconds: state.todaySeconds,
      periodTotal: period.total,
      learningUnits: period.units,
      attempts: period.attempts
    },
    activitySeconds: { ...state.activitySeconds },
    units: Object.keys(UNIT_LIBRARY).map(id => ({
      id,
      expression: UNIT_LIBRARY[id].expression,
      difficulty: calculateDifficulty(id),
      contexts: state.contexts[id] || 0,
      savedToAnkiDemo: state.savedUnits.includes(id),
      cardEdited: Boolean(state.cardEdits?.[id]),
      ...state.unitStats[id]
    })),
    cardEdits: state.cardEdits || {}
  };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportStatisticsJson() {
  const payload = JSON.stringify(statisticsExportData(), null, 2);
  downloadBlob(new Blob([payload], { type: "application/json;charset=utf-8" }), `wortaktiv-statistics-${new Date().toISOString().slice(0, 10)}.json`);
  showToast(t("exportReady"));
}

function buildPdfFromJpeg(jpegBytes, width, height) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const append = value => {
    const bytes = typeof value === "string" ? encoder.encode(value) : value;
    chunks.push(bytes);
    length += bytes.length;
  };
  const object = (number, body) => {
    offsets[number] = length;
    append(`${number} 0 obj\n${body}\nendobj\n`);
  };

  append(new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 226, 227, 207, 211, 10]));
  object(1, "<< /Type /Catalog /Pages 2 0 R >>");
  object(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  object(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>");
  const content = "q 595 0 0 842 0 0 cm /Im0 Do Q";
  object(4, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  offsets[5] = length;
  append(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  append(jpegBytes);
  append("\nendstream\nendobj\n");
  const xrefOffset = length;
  append("xref\n0 6\n0000000000 65535 f \n");
  for (let index = 1; index <= 5; index += 1) append(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const pdf = new Uint8Array(length);
  let cursor = 0;
  chunks.forEach(chunk => { pdf.set(chunk, cursor); cursor += chunk.length; });
  return pdf;
}

function canvasToJpeg(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Canvas export failed")), "image/jpeg", 0.92));
}

async function exportStatisticsPdf() {
  const report = statisticsExportData();
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;
  const context = canvas.getContext("2d");
  context.fillStyle = "#f5faf8";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#0b6b57";
  context.fillRect(0, 0, canvas.width, 28);
  context.fillStyle = "#15211e";
  context.font = "700 58px Arial, sans-serif";
  context.fillText(t("pdfTitle"), 90, 130);
  context.fillStyle = "#62716c";
  context.font = "28px Arial, sans-serif";
  context.fillText(`${t("generated")}: ${new Date().toLocaleString(state.locale)}`, 90, 184);

  const cards = [
    [t("today"), formatDuration(report.summary.todaySeconds, true)],
    [t("learningUnits"), String(report.summary.learningUnits)],
    [t("attempts"), String(report.summary.attempts)]
  ];
  cards.forEach(([label, value], index) => {
    const x = 90 + index * 360;
    context.fillStyle = "#ffffff";
    context.fillRect(x, 245, 320, 175);
    context.fillStyle = "#62716c";
    context.font = "24px Arial, sans-serif";
    context.fillText(label, x + 28, 292);
    context.fillStyle = "#15211e";
    context.font = "700 42px Arial, sans-serif";
    context.fillText(value, x + 28, 365);
  });

  context.fillStyle = "#15211e";
  context.font = "700 38px Arial, sans-serif";
  context.fillText(t("timeByDay"), 90, 520);
  const activityEntries = Object.entries(report.activitySeconds);
  const activityMax = Math.max(...activityEntries.map(([, seconds]) => seconds), 1);
  activityEntries.forEach(([key, seconds], index) => {
    const y = 585 + index * 82;
    context.fillStyle = "#30413c";
    context.font = "25px Arial, sans-serif";
    context.fillText(t(`activity${key[0].toUpperCase()}${key.slice(1)}`), 90, y);
    context.fillStyle = "#dceae5";
    context.fillRect(350, y - 25, 600, 26);
    context.fillStyle = "#0b6b57";
    context.fillRect(350, y - 25, Math.max(5, 600 * seconds / activityMax), 26);
    context.fillStyle = "#15211e";
    context.textAlign = "right";
    context.fillText(formatDuration(seconds, true), 1130, y);
    context.textAlign = "left";
  });

  context.fillStyle = "#15211e";
  context.font = "700 38px Arial, sans-serif";
  context.fillText(t("hardest"), 90, 980);
  const units = [...report.units].sort((a, b) => b.difficulty - a.difficulty);
  units.forEach((unit, index) => {
    const y = 1045 + index * 150;
    context.fillStyle = "#ffffff";
    context.fillRect(90, y - 45, 1040, 118);
    context.fillStyle = "#15211e";
    context.font = "700 28px Arial, sans-serif";
    context.fillText(unit.expression, 120, y);
    context.fillStyle = "#62716c";
    context.font = "23px Arial, sans-serif";
    context.fillText(`${t("difficulty")}: ${unit.difficulty}/100  ·  ${t("time")}: ${formatDuration(unit.timeSeconds, true)}`, 120, y + 42);
    context.textAlign = "right";
    context.fillText(`${t("errors")}: ${unit.errors}  ·  ${t("hints")}: ${unit.hints}`, 1100, y + 42);
    context.textAlign = "left";
  });

  context.fillStyle = "#62716c";
  context.font = "22px Arial, sans-serif";
  context.fillText("WortAktiv · local learning statistics", 90, 1660);
  const jpeg = await canvasToJpeg(canvas);
  const pdf = buildPdfFromJpeg(new Uint8Array(await jpeg.arrayBuffer()), canvas.width, canvas.height);
  downloadBlob(new Blob([pdf], { type: "application/pdf" }), `wortaktiv-statistics-${new Date().toISOString().slice(0, 10)}.pdf`);
  showToast(t("exportReady"));
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
    showToast(t("draftCreated"));
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
document.querySelector("#interface-language").addEventListener("change", event => {
  state.locale = TRANSLATIONS[event.target.value] ? event.target.value : "ru";
  saveState();
  applyLocale();
});
document.querySelector("#export-json").addEventListener("click", exportStatisticsJson);
document.querySelector("#export-pdf").addEventListener("click", () => {
  exportStatisticsPdf().catch(() => showToast(t("exportError")));
});

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
  const locale = state.locale;
  state = createInitialState();
  state.locale = locale;
  saveState();
  document.querySelectorAll(".study-target").forEach(element => element.classList.remove("is-learned"));
  setCurrentUnit("anspruch");
  switchView("article");
  applyLocale();
  showToast(t("resetDone"));
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
applyLocale();
