// Get questions from localStorage or use default
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [
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
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startView = document.getElementById('startView');
const quizView = document.getElementById('quizView');
const scoreView = document.getElementById('scoreView');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const questionElement = document.getElementById('question');
const choiceA = document.getElementById('choiceA');
const choiceB = document.getElementById('choiceB');
const choiceC = document.getElementById('choiceC');
const choiceD = document.getElementById('choiceD');
const scoreElement = document.getElementById('score');
const emojiElement = document.getElementById('emoji');
const progressBar = document.getElementById('progressBar');

// View Functions
function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    view.classList.add('active');
}

function onStart() {
    currentQuestionIndex = 0;
    score = 0;
    showView(quizView);
    renderQuestion();
}

function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.title;
    choiceA.textContent = question.choiceA;
    choiceB.textContent = question.choiceB;
    choiceC.textContent = question.choiceC;
    choiceD.textContent = question.choiceD;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function onPlayerSubmit(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        score++;
    }
    currentQuestionIndex++;
    renderQuestion();
}

function showScore() {
    showView(scoreView);
    const scorePercent = (score / questions.length) * 100;
    scoreElement.textContent = `Score: ${score}/${questions.length} (${scorePercent.toFixed(0)}%)`;
    
    let emoji = "";
    if (scorePercent < 20) emoji = "😢";
    else if (scorePercent < 40) emoji = "😞";
    else if (scorePercent < 60) emoji = "😐";
    else if (scorePercent < 80) emoji = "🙂";
    else emoji = "😄";
    
    emojiElement.textContent = emoji;
}

// Event Listeners
startButton.addEventListener('click', onStart);
restartButton.addEventListener('click', onStart);

choiceA.addEventListener('click', () => onPlayerSubmit('A'));
choiceB.addEventListener('click', () => onPlayerSubmit('B'));
choiceC.addEventListener('click', () => onPlayerSubmit('C'));
choiceD.addEventListener('click', () => onPlayerSubmit('D'));

// Initialize
showView(startView);