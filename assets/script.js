const startButton = document.getElementById('start-btn');
const quizPage = document.getElementById('quiz-page');
const landingPage = document.getElementById('landing-page');
const timerElement = document.getElementById('timer');


let secondsLeft = 60;
let currentQuestion = 0;
let score = 0;


const quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
    answer: "B"
  },
  {
    question: "What does DOM stand for?",
    choices: ["Document Object Model", "Dominant Object Model", "Document Object Motor", "Document Over Match"],
    answer: "A"
  },
  {
    question: "A variable in JavaScript declared with which of the following keyword?",
    choices: ["var", "new", "string", "int"],
    answer: "A"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: ["<body>", "<head>", "<footer>", "both <body> and <head> section"],
    answer: "A"
  }
];


function startQuiz() {
  landingPage.classList.add('hide');
  quizPage.classList.remove('hide');
  setQuestion();
  startTimer();
}

function setQuestion() {
  const questionElement = document.getElementById('question');
  const choiceElements = document.querySelectorAll('#choices li span');

  questionElement.innerText = quizQuestions[currentQuestion].question;
  choiceElements.forEach((choice, index) => {
    choice.innerText = quizQuestions[currentQuestion].choices[index];
  });
}


function startTimer() {
  const timer = setInterval(function() {
    secondsLeft--;
    timerElement.innerText = `Time remaining: ${secondsLeft} seconds`;

    if (secondsLeft === 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}


function checkAnswer() {
  const selectedChoice = document.querySelector('input[name="choice"]:checked');
  
  if (!selectedChoice) {
    return;
  }

  const answer = selectedChoice.value;
  
  if (answer === quizQuestions[currentQuestion].answer) {
    score++;
  }
  
  currentQuestion++;
  

  if (currentQuestion >= quizQuestions.length) {
    endQuiz();
  } else {
    setQuestion();
  }
}


function endQuiz() {
  clearInterval(timer);
  quizPage.classList.add('hide');
  const finalScoreElement = document.getElementById('final-score');
  finalScoreElement.innerText = score;
  const scorePage = document.getElementById('score-page');
  scorePage.classList.remove('hide');
}


startButton.addEventListener('click', startQuiz);
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
