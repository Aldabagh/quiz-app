//grab all the html elements used
var quizContainer = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var viewHighscoresBtn = document.getElementById("viewHighscoresBtn"); 
var scoreEl = document.getElementById("score");
var startBtn = document.getElementById("start-btn");
var titleTag = document.getElementById("title");
var finalScore = document.getElementById("score-container");
var displayHs = document.getElementById("display-highscore-div");
var enitialBtn = document.getElementById("submitHighscoreBtn");
var initInput = document.getElementById("fname");
var backBtn = document.getElementById("goBackBtn");
var clearHighscoreBtn = document.getElementById("clearHighscoreBtn"); 
var list = document.querySelector(".highscore-list");



let globalTimerPreset = 60;
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerId;

// Define questions and choices here
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    choices: ["<js>", "<script>", "<javascript>", "<scripting>"],
    answer: "<script>"
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    choices: ['msgBox("Hello World");', 'alertBox("Hello World");', 'alert("Hello World");', `msg("Hello World");`],
    answer: 'alert("Hello World");'
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    choices: [`The <head> section`, `Both the <head> section and the <body> section are correct`, `The <body> section`, `The <footer> section`],
    answer: `The <body> section`
  },
  {
    question: 'Where is my food?',
    choices: [`The <head> section`, `Both the <head> section and the <body> section are correct`, `The <body> section`, `The <footer> section`],
    answer: `The <body> section`
  },
];

backBtn.addEventListener('click', ()=>{window.location.reload()})
clearHighscoreBtn.addEventListener('click', ()=>{
  localStorage.removeItem("highScores");
  list.style.display = "none"
})

function setUpGame() {
  timeLeft = globalTimerPreset; //reset the time back to 99 seconds so reusable to reset game
  timerEl.textContent = globalTimerPreset; //go in and set the default number of the timer so it starts at the actual start number on page load

  //hide elements that may be visible after a previous round
  document.getElementById("display-highscore-div").style.display = "none"; //this would be the last visible item after viewing highscore of a previous game

  //fills back content that gets reused for quiz questions
  titleTag.textContent = "Coding Quiz Challenge"; //this h1 tag gets reused for questions so make sure its reset

  //display-Hide items that are needed for the "main menu"
  titleTag.style.display = "block"; //show the quiz title because after 1 round it will be hidden
  document.getElementById("instructions").style.display = "block"; //show instructions under h1 tag
  viewHighscoresBtn.style.display = "none"; //default view highscores button is hidden after coming from highscores of previous round
  startBtn.style.display = "block"; //show the start button
  finalScore.style.display ="none";

 
}


function displayQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  for (let choice of q.choices) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", function() {
      if (choice === q.answer) {
        score++;
        scoreEl.textContent = score;
      } else {
        timeLeft-=10;
        
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        console.log("quiz should end");
        endQuiz();
      }
    });
    li.appendChild(btn);
    choicesEl.appendChild(li);
  }
}

function startTimer() {
  timerId = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function submitScore() {
  var currentPerson ={
    init: initInput.value,
    score:score
  };
  
  var highscores = JSON.parse(localStorage.getItem("highScores"));
  
  highscores.push(currentPerson);
  highscores.forEach(highscore => {
    var listItem = document.createElement("li");
    listItem.textContent = `User : ${highscore.init} — Score : ${highscore.score}`;
    list.appendChild(listItem);
  });
  localStorage.setItem("highScores",JSON.stringify(highscores));
  console.log(currentPerson);
  // localStorage.setItem("user",currentPerson);
  finalScore.style.display = "none";
  displayHs.style.display = "block";
  viewHighscoresBtn.style.display = 'block';
  
}



function startQuiz() {
  startBtn.disabled = true;
  viewHighscoresBtn.style.display = 'none';
  startBtn.style.display = 'none';
  document.querySelector('#instructions').style.display = `none`;
  titleTag.style.display = "none";
  finalScore.style.display = "none";
  displayHs.style.display = "none";
  var highscores = JSON.parse(localStorage.getItem("highScores"));
  if (!highscores) {
    localStorage.setItem("highScores",JSON.stringify([]))
  }
  
  
  displayQuestion();
  startTimer();
  
}

function endQuiz() {
  clearInterval(timerId);
  quizContainer.innerHTML = `
    <h2>Quiz Complete</h2>
    <p>Your score is ${score}.</p>
  `;
  finalScore.style.display = "block";
}



setUpGame();
startBtn.addEventListener("click", startQuiz);
enitialBtn.addEventListener("click", submitScore);