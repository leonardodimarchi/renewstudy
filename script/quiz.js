var currentQuestion = $('#quiz-current-question');
var currentQuestionOptionNumber = 1;

var questionsOptions = [
    $('#question1'),
    $('#question2'),
    $('#question3'),
    $('#question4'),
];

var alternativeOptions = [
    $('#alternative1'),
    $('#alternative2'),
    $('#alternative3'),
    $('#alternative4'),
];

var alternativeOptionsButtons = [
    $('#alternativeButton1'),
    $('#alternativeButton2'),
    $('#alternativeButton3'),
    $('#alternativeButton4'),
]

var currentEnergyQuestions;

loadCurrentEnergyQuestions();

setTimeout(() => {
    selectQuizOption(1);

    $('#question1').on('click',()=>{selectQuizOption(1)});
    $('#question2').on('click',()=>{selectQuizOption(2)});
    $('#question3').on('click',()=>{selectQuizOption(3)});
    $('#question4').on('click',()=>{selectQuizOption(4)});
},500)


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

    Swal.close();
}

function checkCorrectAnswer(option) {
    if(option === currentEnergyQuestions.correctAlternatives[currentQuestionOptionNumber-1]){
        Swal.fire({
            toast: 'true',
            position: 'bottom',

            title: '<b>Resposta correta</b><i style="color: black; margin-left: 1rem;" class="fas fa-check"></i>',
            text: 'Continue assim',

            confirmButtonColor: 'white',
            confirmButtonText: '<span style="color: aquamarine">OK</span>',

            width: '30rem',
            padding: '2rem',
            background: 'aquamarine',
        });
        return true;
    }

    Swal.fire({
        toast: 'true',
        position: 'bottom',

        title: '<i style="color: blac; margin-right: 1rem;" class="fas fa-times"></i><b>Resposta incorreta</b>',
        text: 'Tente novamente, você consegue !',

        confirmButtonColor: 'white',
        confirmButtonText: '<span style="color: red">OK</span>',

        width: '30rem',
        padding: '2rem',
        background: 'rgb(206, 81, 81)'
    });

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
    $.getJSON('./content/questions.json', (data) => {
        var paginaEnergiaAtual = localStorage.getItem('paginaAtual')

        if(paginaEnergiaAtual.includes('solar')) {
            currentEnergyQuestions = data.solarEnergy;

        } else if (paginaEnergiaAtual.includes('eolica')) {
            currentEnergyQuestions = data.windEnergy;

        } else if (paginaEnergiaAtual.includes('hidraulica')) {
            currentEnergyQuestions = data.riverEnergy;

        } else if (paginaEnergiaAtual.includes('maremotriz')) {
            currentEnergyQuestions = data.seaEnergy;
        } 
    })
}
