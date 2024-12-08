function toggleAnswer(questionElement) {
    const answerElement = questionElement.nextElementSibling;
    answerElement.classList.toggle('show');
}