const currentQuestion = $('#quiz-current-question');
let currentQuestionOptionNumber = 1;

const questionsOptions = [
    $('#question1'),
    $('#question2'),
    $('#question3'),
    $('#question4'),
];

const alternativeOptions = [
    $('#alternative1'),
    $('#alternative2'),
    $('#alternative3'),
    $('#alternative4'),
];

const alternativeOptionsButtons = [
    $('#alternativeButton1'),
    $('#alternativeButton2'),
    $('#alternativeButton3'),
    $('#alternativeButton4'),
]

let currentEnergyQuestions;
loadCurrentEnergyQuestions();

setTimeout(() => {
    selectQuizOption(1);

    $('#question1').on('click',()=>{selectQuizOption(1)});
    $('#question2').on('click',()=>{selectQuizOption(2)});
    $('#question3').on('click',()=>{selectQuizOption(3)});
    $('#question4').on('click',()=>{selectQuizOption(4)});
},1000)


function selectQuizOption(option) {    
    currentQuestionOptionNumber = option;

    questionsOptions.forEach(question=> {
        question.removeClass(' quiz-select-question-option-active');
    });

    questionsOptions[Number(option)-1].addClass('quiz-select-question-option-active');

    currentQuestion.html(currentEnergyQuestions.questions[option-1]);

    for(let contador=0; contador < alternativeOptions.length; contador++) {

        switch(option) {
            case 1:
                alternativeOptions[contador].html(currentEnergyQuestions.alternatives.question1[contador])
                break;
            case 2:
                alternativeOptions[contador].html(currentEnergyQuestions.alternatives.question2[contador])
                break;
            case 3:
                alternativeOptions[contador].html(currentEnergyQuestions.alternatives.question3[contador])
                break;
            case 4:
                alternativeOptions[contador].html(currentEnergyQuestions.alternatives.question4[contador])
                break;
        }
    }

    alternativeOptionsButtons.forEach(alternative=> {
        alternative.removeClass('quiz-alternative-active');
        alternative.removeClass('quiz-alternative-wrong');
    });
}

function checkCorrectAnswer(option) {
    if(option === currentEnergyQuestions.correctAlternatives[currentQuestionOptionNumber-1])
        return true;

    return false;
}

function selectQuizAlternative(option) {
    alternativeOptionsButtons.forEach(alternative=> {
        alternative.removeClass('quiz-alternative-active');
        alternative.removeClass('quiz-alternative-wrong');
    });

    if(checkCorrectAnswer(option)) {
        alternativeOptionsButtons[Number(option)-1].addClass('quiz-alternative-active');
    } else {
        alternativeOptionsButtons[Number(option)-1].addClass('quiz-alternative-wrong');
    }
}

function loadCurrentEnergyQuestions() {
    $.getJSON('../content/questions.json', (data) => {
        const paginaEnergiaAtual = localStorage.getItem('paginaAtual')

        if(paginaEnergiaAtual.includes('solar')) {
            currentEnergyQuestions = data.solarQuestions;

        } else if (paginaEnergiaAtual.includes('eolica')) {
            currentEnergyQuestions = data.solarQuestions;

        } else if (paginaEnergiaAtual.includes('hidraulica')) {
            currentEnergyQuestions = data.solarQuestions;

        } else if (paginaEnergiaAtual.includes('maremotriz')) {
            currentEnergyQuestions = data.solarQuestions;
        } 
    }).fail("Ocorreu um erro")
}