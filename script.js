const questions = [
    {
        question: "What does DOM stand for in Javascript?",
        answers: [
            { text: "Data Object Model", correct: false},
             { text: "Document Objecct Model", correct: true},
              { text: "Display Object Method", correct: false},
               { text: "Digital Order Model", correct: false},
        ]
    },
    {
        question: "Which method selects a single element by is unique ID?",
        answers: [
            { text: "document.querySelectorAll()", correct: false},
            { text: "document.getElementByClassName()", correct: false},
            { text: "document.getElementById()", correct: true},
            { text: "document.getElementByTagName()", correct: false},
        ]
    },
    {
        question: "Which CSS property activates flexbox on a container?",
        answers: [
             { text: "display: flex", correct: true},
            { text: "positon: flex", correct: false},
            { text: "layout: flex", correct: false},
            { text: "flex: container", correct: false},
        ]
    },
    {
        question: "Which method is used to attach an event listener in Javascript?",
        answers: [
            { text: "element.addEvent()", correct: false},
            { text: "element.attachEvent()", correct: false},
             { text: "element.listen()", correct: false},
            { text: "element.addEventListener()", correct: true},
        ]
    },
    {
        question: "Which event is best used to detect when a key is pressed down?",
        answers: [
            { text: "keyup", correct: false},
            { text: "keydown", correct: true},
            { text: "keypress", correct: false},
            { text: "input", correct: false},
        ]
    },
    {
        question: "Which method is used to create a new element in the DOM?",
        answers: [
            { text: "document.createElement()", correct: true},
            { text: "document.createDocument()", correct: false},
            { text: "document.newElement()", correct: false},
            { text: "document.addElement()", correct: false},
        ]
    },
    {
        question: "Which property is used to change the text content of an element?",
        answers: [
            { text: "innerHTML", correct: false},
            { text: "textContent", correct: true},
            { text: "innerText", correct: false},
            { text: "text", correct: false},
        ]
    },
    {
        question: "Which method is used to remove an element from the DOM?",
        answers: [
            { text: "element.remove()", correct: true},
            { text: "element.delete()", correct: false},
            { text: "element.destroy()", correct: false},
            { text: "element.detach()", correct: false},
        ]
    },
    {
        question: "Which method is used to get the value of an input field?",
        answers: [
            { text: "input.value", correct: true},
            { text: "input.getValue()", correct: false},
            { text: "input.value()", correct: false},
            { text: "input.get()", correct: false},
        ]
    },
    {
        question: "Which method is used to change the style of an element?",
        answers: [
            { text: "element.style", correct: true},
            { text: "element.css", correct: false},
            { text: "element.setStyle()", correct: false},
            { text: "element.style()", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let queestionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = queestionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct ==="true";
    if(iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block"

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();