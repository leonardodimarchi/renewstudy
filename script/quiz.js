const questionsOptions = [
    $('#question1'),
    $('#question2'),
    $('#question3'),
    $('#question4'),
    $('#question5'),
];

const alternativeOptions = [
    $('#alternative1'),
    $('#alternative2'),
    $('#alternative3'),
    $('#alternative4'),
];

const currentEnergyQuestions = []

function selectQuizOption(option) {    
    questionsOptions.forEach(question=> {
        question.removeClass(' quiz-select-question-option-active');
    });

    questionsOptions[Number(option)-1].addClass('quiz-select-question-option-active');
}

function selectQuizAlternative(option) {
    alternativeOptions.forEach(alternative=> {
        alternative.removeClass('quiz-alternative-active');
    });

    //if(checkCorrectAnswer(option))
    alternativeOptions[Number(option)-1].addClass('quiz-alternative-active');
}

//function checkCorrectAnswer(option)

