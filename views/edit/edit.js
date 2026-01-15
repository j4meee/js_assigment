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

let editingIndex = -1;

// DOM Elements
const questionsList = document.getElementById('questionsList');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const editDialog = document.getElementById('editDialog');
const editTitle = document.getElementById('editTitle');
const editChoiceA = document.getElementById('editChoiceA');
const editChoiceB = document.getElementById('editChoiceB');
const editChoiceC = document.getElementById('editChoiceC');
const editChoiceD = document.getElementById('editChoiceD');
const editCorrect = document.getElementById('editCorrect');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const deleteEditBtn = document.getElementById('deleteEditBtn');

// Functions
function renderQuestionsList() {
    questionsList.innerHTML = "";
    
    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.className = "question-item";
        questionElement.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">${index + 1}. ${question.title}</div>
            <div style="color: #666; margin-bottom: 5px;">
                A: ${question.choiceA} | B: ${question.choiceB} | C: ${question.choiceC} | D: ${question.choiceD}
            </div>
            <div style="color: #4CAF50; font-weight: bold; margin-bottom: 10px;">Correct: ${question.correct}</div>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        questionsList.appendChild(questionElement);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            openEditDialog(index);
        });
    });
}

function openEditDialog(index) {
    editingIndex = index;
    
    if (index >= 0) {
        const question = questions[index];
        editTitle.value = question.title;
        editChoiceA.value = question.choiceA;
        editChoiceB.value = question.choiceB;
        editChoiceC.value = question.choiceC;
        editChoiceD.value = question.choiceD;
        editCorrect.value = question.correct;
        deleteEditBtn.style.display = 'inline-block';
    } else {
        editTitle.value = "";
        editChoiceA.value = "";
        editChoiceB.value = "";
        editChoiceC.value = "";
        editChoiceD.value = "";
        editCorrect.value = "A";
        deleteEditBtn.style.display = 'none';
    }
    
    editDialog.classList.remove('hidden');
}

function closeEditDialog() {
    editDialog.classList.add('hidden');
    editingIndex = -1;
}

function saveQuestion() {
    const newQuestion = {
        title: editTitle.value,
        choiceA: editChoiceA.value,
        choiceB: editChoiceB.value,
        choiceC: editChoiceC.value,
        choiceD: editChoiceD.value,
        correct: editCorrect.value
    };
    
    if (editingIndex >= 0) {
        questions[editingIndex] = newQuestion;
    } else {
        questions.push(newQuestion);
    }
    
    // Save to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    
    closeEditDialog();
    renderQuestionsList();
}

function deleteQuestion() {
    if (editingIndex >= 0) {
        questions.splice(editingIndex, 1);
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
        closeEditDialog();
        renderQuestionsList();
    }
}

// Event Listeners
addQuestionBtn.addEventListener('click', () => openEditDialog(-1));
saveEditBtn.addEventListener('click', saveQuestion);
cancelEditBtn.addEventListener('click', closeEditDialog);
deleteEditBtn.addEventListener('click', deleteQuestion);

editDialog.addEventListener('click', (e) => {
    if (e.target === editDialog) {
        closeEditDialog();
    }
});

// Initialize
renderQuestionsList();