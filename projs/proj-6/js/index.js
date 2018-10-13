'use strict';

// The Model
var gCurrQuestIdx = 1;
var gQuests = [];

function initGame() {
    if (gCurrQuestIdx === 1) createQuests();
    renderQuest();
}

function createQuests() {
    gQuests = [
        {
            id: 1,
            opt: ['The dog is sleeping', 'The cat is sleeping'],
            correctOptIdx: 1,
            image: 'img/1.jpg'
        },
        {
            id: 2,
            opt: ['The monkey is thinking...', 'The lion is thinking...'],
            correctOptIdx: 0,
            image: 'img/2.jpg'
        },
        {
            id: 3,
            opt: ['There are two rabbits', 'There are two mice'],
            correctOptIdx: 1,
            image: 'img/3.jpg'
        }
    ];
}

function checkAnswer(optIdx) {
    if (+optIdx.id === gQuests[gCurrQuestIdx - 1].correctOptIdx) {
        (gCurrQuestIdx < 3) ? gCurrQuestIdx++ : gCurrQuestIdx = 1;
        initGame();
    }
}

function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx - 1];
    // DOM Model
    var strHtml = `<div class="quest-pic">
                    <img src="${currQuest.image}" alt="">
                </div>
                <button id="0" class="box quest1" 
                    onclick="checkAnswer(this)">${currQuest.opt[0]}</button>
                <button id="1" class="box quest2" 
                    onclick="checkAnswer(this)">${currQuest.opt[1]}</button>`;
    document.querySelector('.game-panel').innerHTML = strHtml;
}