const testContainer = document.getElementById('test-container');
const submitButton = document.getElementById('submit-button');
const resultDiv = document.getElementById('result');
const correctAnswersDiv = document.getElementById('correct-answers');


fetch('test.json')
  .then(response => response.json())
  .then(data => {
    displayQuestions(data);
    
    submitButton.addEventListener('click', () => {
      const score = calculateResult(data);
      displayResult(score, data);
      displayCorrectAnswers(data);
    });
  });

function displayQuestions(testData) {
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

function calculateResult(testData) {
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

function displayResult(score, testData) {
  resultDiv.textContent = `You scored ${score} out of ${testData.questions.length} points.`;
}

function displayCorrectAnswers(testData) {
  correctAnswersDiv.innerHTML = "<p>Correct answer:</p>";
  testData.questions.forEach((question, index) => {
    const correctAnswer = question.answers.find(answer => answer.isCorrect);
    correctAnswersDiv.innerHTML += `<p>${index + 1}. ${question.question}: ${correctAnswer.answer}</p>`;
  });
}
