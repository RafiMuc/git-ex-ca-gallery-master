'use strict';

$(document).ready(init);

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();
    renderQuest(gCurrQuest.txt); 
    // TODO: show the gameQuest section
    $('.gameQuest').show();

}

function renderQuest(txt) {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.gameQuest > h2 > div').text(txt);
}

function renderNewQuest() {
    $('.gameQuest').hide();
    $('.gameNewQuest').show();
}