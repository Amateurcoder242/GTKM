const questions = [
    {
        question: "What's my full name?",
        answers: [
            {text: "Avanaly Alceres", correct: false},
            {text: "Avnaly Alkeres", correct: false},
            {text: "Avnaly Alceres", correct: true},
            {text: "Avnaly Ana Alceres", correct: false},
        ]
    },
    {
        question: "When's my birthday?",
        answers: [
            {text: "July 23rd", correct: false},
            {text: "September 2nd", correct: false},
            {text: "August 2nd", correct: false},
            {text: "August 8th", correct: true},
        ] 
    },
    {
        question: "How many siblings do I have?",
        answers: [
            {text: "1", correct: false},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: true},
        ]
    },
    {
        question: "What's my favorite sport?",
        answers: [
            {text: "Football", correct: false},
            {text: "Soccer", correct: true},
            {text: "Track", correct: false},
            {text: "Softball", correct: false},
        ]
    },
    {
        question: "What's my favorite book genre?",
        answers: [
            {text: "Mythology", correct: false},
            {text: "Romance", correct: false},
            {text: "Mystery", correct: true},
            {text: "Psychological Thriller", correct: false}, 
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
