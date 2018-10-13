'use strict'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;
const KEY_QUESTS = 'quests';

function init() {
    gQuestsTree = getFromStorage(KEY_QUESTS);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    renderQuest(gCurrQuest.txt);
}

function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            // alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            renderNewQuest();
            gLastRes = res;
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gLastRes = res;
        if (res === 'yes') {
            gCurrQuest = gCurrQuest.yes;
        }
        else {
            gCurrQuest = gCurrQuest.no;
        }
        renderQuest(gCurrQuest.txt);
    }
}

function addGuess(ev) {
    ev.preventDefault();
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    gCurrQuest.no = createQuest(gCurrQuest.txt);
    gCurrQuest.txt = $('#newQuest').val();
    gCurrQuest.yes = createQuest($('#newGuess').val());
    saveToStorage(KEY_QUESTS, gQuestsTree);
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gQuestsTree = getFromStorage(KEY_QUESTS);
    console.log(gQuestsTree)
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}
