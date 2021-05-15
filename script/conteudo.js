const energias = ['SOLAR','EÓLICA', 'HIDRÁULICA', 'MAREMOTRIZ'];

const energiaAtual = $('#energia-atual');
const energiaAnterior = $('#energia-anterior');
const energiaProximo = $('#energia-proximo');

const guiaConteudo = $('#guia-conteudo');
const conteudo = $('#ipt-conteudo');

firstLoadPage();
updateLoadPage();
checkChangeColor();

function checkChangeColor() {
    guiaConteudo.removeClass('top-range-solar');
    guiaConteudo.removeClass('top-range-eolica');
    guiaConteudo.removeClass('top-range-hidra');
    guiaConteudo.removeClass('top-range-mare');

    switch(energiaAtual.text()){
        case energias[0]: 
            guiaConteudo.addClass('top-range-solar');
            break;
        case energias[1]: 
            guiaConteudo.addClass('top-range-eolica');
            break;
        case energias[2]: 
            guiaConteudo.addClass('top-range-hidra');
            break;
        case energias[3]: 
            guiaConteudo.addClass('top-range-mare');
            break;
    }
}

function goBackward() {
    const indiceAtual = energias.indexOf(energiaAtual.text());
    let novoIndice = indiceAtual-1;

    if(indiceAtual == 0) {
        novoIndice = 3;
    }

    energiaAtual.text(energias[novoIndice]);

    updateLoadPage()
    checkChangeColor();
}

function goForward() {
    const indiceAtual = energias.indexOf(energiaAtual.text());
    let novoIndice = indiceAtual+1;

    if(indiceAtual == 3) {
        novoIndice = 0;
    }

    energiaAtual.text(energias[novoIndice]);

    updateLoadPage();
    checkChangeColor();
}

function firstLoadPage() {
    const paginaEnergiaAtual = localStorage.getItem('paginaAtual')

    if(paginaEnergiaAtual.includes('solar')) {
        energiaAtual.text(energias[0]);

    } else if (paginaEnergiaAtual.includes('eolica')) {
        energiaAtual.text(energias[1]);

    } else if (paginaEnergiaAtual.includes('hidraulica')) {
        energiaAtual.text(energias[2]);

    } else if (paginaEnergiaAtual.includes('maremotriz')) {
        energiaAtual.text(energias[3]);
    } 
}

function updateLoadPage() {
    switch(energiaAtual.text()){
        case energias[0]: 
            history.pushState({}, null, 'solar.html');
            conteudo.load('content/conteudo-solar.html');
            energiaAnterior.text(energias[3]);
            energiaProximo.text(energias[1]);
            localStorage.setItem('paginaAtual','solar');

            break;
        case energias[1]: 
            history.pushState({}, null, 'eolica.html');
            conteudo.load('content/conteudo-eolica.html');
            energiaAnterior.text(energias[0]);
            energiaProximo.text(energias[2]);
            localStorage.setItem('paginaAtual','eolica')

            break;
        case energias[2]: 
            history.pushState({}, null, 'hidraulica.html');
            conteudo.load('content/conteudo-hidraulica.html');
            energiaAnterior.text(energias[1]);
            energiaProximo.text(energias[3]);
            localStorage.setItem('paginaAtual','hidraulica')

            break;
        case energias[3]: 
            history.pushState({}, null, 'maremotriz.html');
            conteudo.load('content/conteudo-maremotriz.html');
            energiaAnterior.text(energias[2]);
            energiaProximo.text(energias[0]);
            localStorage.setItem('paginaAtual','maremotriz')

            break;
    }
}