// DOM ELEMENTS ---------------------------------------------------------
const navPlayer = document.querySelector("#navPlayer");
const navEditor = document.querySelector("#navEditor");
const playerView = document.querySelector("#playerView");
const editorView = document.querySelector("#editorView");
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_scoreContainer = document.querySelector("#scoreContainer");
const dom_start = document.querySelector("#start");
const dom_score = document.querySelector("#score");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const addQuestionBtn = document.querySelector("#addQuestionBtn");
const questionsList = document.querySelector("#questionsList");

// DATA ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];
let runningQuestionIndex = 0;
let score = 0;

// VIEW FUNCTIONS ---------------------------------------------------------
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

// NAVIGATION FUNCTIONS
function showPlayerView() {
  show(playerView);
  hide(editorView);
  navPlayer.classList.add("active");
  navEditor.classList.remove("active");
  // Reset to start screen
  show(dom_start);
  hide(dom_quiz);
  hide(dom_scoreContainer);
}

function showEditorView() {
  hide(playerView);
  show(editorView);
  navPlayer.classList.remove("active");
  navEditor.classList.add("active");
  renderQuestionsList(); // Show all questions in editor
}

// PLAYER FUNCTIONS
function onStart() {
  runningQuestionIndex = 0;
  score = 0;
  renderQuestion(runningQuestionIndex);
  show(dom_quiz);
  hide(dom_start);
  hide(dom_scoreContainer);
}

function renderQuestion(questionIndex) {
  if(questionIndex >= questions.length){
    renderSCore();
    return;
  }

  const question = questions[questionIndex];
  dom_question.textContent = question.title;
  dom_choiceA.textContent = question.choiceA;
  dom_choiceB.textContent = question.choiceB;
  dom_choiceC.textContent = question.choiceC;
  dom_choiceD.textContent = question.choiceD;
}

function onPlayerSubmit(answer) {
  const currentQuestion = questions[runningQuestionIndex];
  if(answer === currentQuestion.correct){
    score++;
  }
  runningQuestionIndex++;

  if(runningQuestionIndex < questions.length){
    renderQuestion(runningQuestionIndex);
  } else {
    renderSCore();
  }
}

function renderSCore() {
  hide(dom_quiz);
  show(dom_scoreContainer);
  const scorePercent = (score / questions.length) * 100;
  dom_score.textContent = `Score: ${score}/${questions.length} (${scorePercent.toFixed(0)}%)`;
  
  let emoji = "";
  if (scorePercent < 20) emoji = "😢";
  else if (scorePercent < 40) emoji = "😞";
  else if (scorePercent < 60) emoji = "😐";
  else if (scorePercent < 80) emoji = "🙂";
  else emoji = "😄";

  const emojiElement = document.querySelector("#emoji");
  if (emojiElement) {
    emojiElement.textContent = emoji;
  }
}

// EDITOR FUNCTIONS
function renderQuestionsList() {
  questionsList.innerHTML = "";
  
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question-item";
    questionElement.innerHTML = `
      <div class="question-title">${index + 1}. ${question.title}</div>
      <div class="question-choices">
        A: ${question.choiceA} | B: ${question.choiceB} | C: ${question.choiceC} | D: ${question.choiceD}
      </div>
      <div class="question-correct">Correct: ${question.correct}</div>
      <button class="edit-btn" data-index="${index}">Edit</button>
    `;
    questionsList.appendChild(questionElement);
  });
}

// EVENT LISTENERS ---------------------------------------------------------
// Navigation
navPlayer.addEventListener("click", showPlayerView);
navEditor.addEventListener("click", showEditorView);

// Player
startButton.addEventListener("click", onStart);
restartButton.addEventListener("click", onStart);

// Answer choices
dom_choiceA.addEventListener("click", () => onPlayerSubmit("A"));
dom_choiceB.addEventListener("click", () => onPlayerSubmit("B"));
dom_choiceC.addEventListener("click", () => onPlayerSubmit("C"));
dom_choiceD.addEventListener("click", () => onPlayerSubmit("D"));

// Editor
addQuestionBtn.addEventListener("click", () => {
  // Simple alert for now - you can expand this
  alert("Add question feature coming soon!");
});

// INITIALIZATION ---------------------------------------------------------
showPlayerView(); // Start with player view