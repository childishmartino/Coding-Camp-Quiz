var startBtn = document.getElementById("start-btn");
var startScrnEl = document.getElementById("startscreen");
var questionsContainerEl = document.getElementById("questions-container");
var questionEl = document.getElementById("question");
var answerBtnsEl = document.getElementById("answer-btns");
let shuffledQuestions, currentQuestionsIndex
var endScrnEl = document.getElementById("endscreen");
var saveHighscore = document.getElementById("submit");
var time = questions.length * 15
var timerId;
var timerEl = document.getElementById("time");
var score = 0;
var finalScoreEl = document.getElementById("finalscore");

//start quiz
function startQuiz() {
    startScrnEl.setAttribute("class", "hide");
    questionsContainerEl.removeAttribute("class", "hide");
    questionsContainerEl.setAttribute("class", "jumbotron jumbotron-fluid")
    timerId = setInterval(clock, 1000);
    timerEl.textContent = time;
    shuffledQuestions = questions.sort(() => Math.random() - .5); //shuffle question & define
    currentQuestionsIndex = 0; //define question index
    setQuestion();
}

//set a question
function setQuestion() {
    if (currentQuestionsIndex > questions.length - 1) {
        quizEnd();
        console.log(currentQuestionsIndex)
    } else {
        resetState() //clear for each question
        showQuestion(shuffledQuestions[currentQuestionsIndex]); //get question and answer
    };
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', selectAnswer)
        answerBtnsEl.appendChild(button);
    })
};

//reset for each question
function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild
            (answerBtnsEl.firstChild)
    }
};

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    console.log(correct);
    if (correct) {
        score++;
        console.log(score);
        console.log(currentQuestionsIndex);
        currentQuestionsIndex++;
        setQuestion();
    } else {
        time -= 5;
    }
};

// clock
function clock() {
    time--;
    timerEl.textContent = time

    if (time <= 0) {
        quizEnd();

    }
};

function quizEnd() {
    questionsContainerEl.setAttribute("class", "hide");
    endScrnEl.removeAttribute("class", "hide");
    endScrnEl.setAttribute("class", "jumbotron jumbotron-fluid")
    finalScoreEl.innerText = score;
    clearInterval(timerId);
}

startBtn.onclick = startQuiz;