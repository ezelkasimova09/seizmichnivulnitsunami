const questions = [
  {
    question: "Какво причинява сеизмичните вълни?",
    answers: ["Слънчевата енергия", "Дъжд", "Земетресения", "Вятър"],
    correctAnswer: "Земетресения"
  },
  {
    question: "Кой тип сеизмични вълни се движат най-бързо?",
    answers: ["P-вълни", "S-вълни", "Повърхностни вълни", "Топлинни вълни"],
    correctAnswer: "P-вълни"
  },
  {
    question: "През какви материали НЕ могат да преминават S-вълните?",
    answers: ["Твърди", "Газове", "Течности", "Метали"],
    correctAnswer: "Течности"
  },
  {
    question: "Какво е цунами?",
    answers: ["Силен дъжд", "Морска буря", "Голяма морска вълна, причинена от земетресение", "Ураган"],
    correctAnswer: "Голяма морска вълна, причинена от земетресение"
  },
  {
    question: "Коя е най-опасната част от земетресението?",
    answers: ["P-вълните", "S-вълните", "Повърхностните вълни", "Тишината след труса"],
    correctAnswer: "Повърхностните вълни"
  },
  {
    question: "Какво измерва скалата на Рихтер?",
    answers: ["Скоростта на вълните", "Дълбочината на океана", "Силата на земетресенията", "Температурата на Земята"],
    correctAnswer: "Силата на земетресенията"
  },
  {
    question: "Къде се случи едно от най-смъртоносните цунами през 2004 г.?",
    answers: ["Чили", "Индонезия", "Япония", "Мексико"],
    correctAnswer: "Индонезия"
  },
  {
    question: "Кое устройство регистрира сеизмични вълни?",
    answers: ["Барометър", "Термометър", "Сеизмограф", "Хигрометър"],
    correctAnswer: "Сеизмограф"
  },
  {
    question: "Как да се предпазим при земетресение?",
    answers: ["Да стоим до прозорец", "Да излезем на балкона", "Да се скрием под здрава маса", "Да се качим на асансьор"],
    correctAnswer: "Да се скрием под здрава маса"
  },
  {
    question: "Какво показва епицентърът на земетресение?",
    answers: ["Началната точка в морето", "Мястото с най-силно разклащане на повърхността", "Краят на земетресението", "Най-дълбоката точка на Земята"],
    correctAnswer: "Мястото с най-силно разклащане на повърхността"
  },
  {
    question: "Какво е основната причина за земетресенията?",
    answers: ["Промени в атмосферата", "Движение на тектонски плочи", "Гравитацията на Луната", "Изригване на гейзери"],
    correctAnswer: "Движение на тектонски плочи"
  },
  {
    question: "Какво измерва сеизмографът?",
    answers: ["Температура", "Влажност", "Сеизмична активност", "Скорост на вятъра"],
    correctAnswer: "Сеизмична активност"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("nextButton");
const resultText = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  document.getElementById("question").textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.classList.add("answer-button");
    answerButton.onclick = () => checkAnswer(answer);
    answersContainer.appendChild(answerButton);
  });

  timeLeft = 30;
  timerDisplay.textContent = `Време: ${timeLeft}`;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Време: ${timeLeft}`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    resultText.textContent = "⏱ Времето изтече! Отговорът е пропуснат.";
    resultText.style.color = "orange";
    nextButton.style.display = "block";
  }
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
    resultText.textContent = "✅ Правилен отговор!";
    resultText.style.color = "green";
  } else {
    resultText.textContent = "❌ Грешен отговор!";
    resultText.style.color = "red";
  }

  clearInterval(timer);
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    nextButton.style.display = "none";
    resultText.textContent = "";
  } else {
    resultText.textContent = `🎉 Викторината е завършена! Вашият резултат е ${score} от ${questions.length}.`;
    nextButton.style.display = "none";
  }
});

document.getElementById("homeButton").addEventListener("click", () => {
  window.location.href = "index.html";
});

loadQuestion();
