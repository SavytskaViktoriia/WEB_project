const testData = { 

    "testName": "Test",
    "questions": [
      {
        "question": "In which country the largest mountain in the world is located ?",
        "answers": [
          { "answer": "China", "isCorrect": false },
          { "answer": "Nepal", "isCorrect": true },
          { "answer": "India", "isCorrect": false },
          { "answer": "Tibet", "isCorrect": false }
        ]
      },
      {
        "question": "What is the longest river in the world?",
        "answers": [
          { "answer": "Amazon", "isCorrect": true },
          { "answer": "Nile", "isCorrect": false },
          { "answer": "Yangtze", "isCorrect": false },
          { "answer": "Mississippi", "isCorrect": false }
        ]
      },
      {
        "question": "Which sea surrounds Italy?",
        "answers": [
        { "answer": "Black Sea", "isCorrect": false },
        { "answer": "Adriatic Sea", "isCorrect": false },
        { "answer": "Tyrrhenian Sea", "isCorrect": true },
        { "answer": "Caspian Sea", "isCorrect": false }
        ]
      },
      {
        "question": "Which country is the largest by area?",
        "answers": [
        { "answer": "China", "isCorrect": true },
        { "answer": "France", "isCorrect": false },
        { "answer": "Canada", "isCorrect": false },
        { "answer": "USA", "isCorrect": false }
        ]
      },
      {
        "question": "What is the largest lake in the world by area?",
        "answers": [
          { "answer": "Lake Ladoga", "isCorrect": false },
          { "answer": "Lake Baikal", "isCorrect": true },
          { "answer": "Caspian Sea", "isCorrect": false },
          { "answer": "Great Bear Lake", "isCorrect": false }
        ]
      }
      
    ]
};

const testContainer = document.getElementById('test-container');
const submitButton = document.getElementById('submit-button');
const resultDiv = document.getElementById('result');
const correctAnswersDiv = document.getElementById('correct-answers');

function displayQuestions() {
  testData.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
    const answersList = document.createElement('ul');
    question.answers.forEach((answer, answerIndex) => {
      const answerItem = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = answerIndex;
      input.id = `question${index}-answer${answerIndex}`;
      const label = document.createElement('label');
      label.htmlFor = `question${index}-answer${answerIndex}`;
      label.innerHTML = answer.answer;
      answerItem.appendChild(input);
      answerItem.appendChild(label);
      answersList.appendChild(answerItem);
    });
    questionDiv.appendChild(answersList);
    testContainer.appendChild(questionDiv);
  });
}

function calculateResult() {
  let score = 0;
  testData.questions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedAnswer) {
      if (testData.questions[index].answers[selectedAnswer.value].isCorrect) {
        score++;
        selectedAnswer.parentElement.classList.add('correct-answer');
      } else {
        selectedAnswer.parentElement.classList.add('wrong-answer');
      }
    }
  });
  return score;
}

function displayCorrectAnswers() {
  correctAnswersDiv.innerHTML = "<p>Correct answer:</p>";
  testData.questions.forEach((question, index) => {
    const correctAnswer = question.answers.find(answer => answer.isCorrect);
    correctAnswersDiv.innerHTML += `<p>${index + 1}. ${question.question}: ${correctAnswer.answer}</p>`;
  });
}

submitButton.addEventListener('click', () => {
  const score = calculateResult();
  resultDiv.textContent = `You scored ${score} out of ${testData.questions.length} points.`;
  displayCorrectAnswers();
});




displayQuestions();
