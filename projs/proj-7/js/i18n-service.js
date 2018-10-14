'use strict';

var gCurrLang = 'en';

var gTrans = {
    welcomeMsg: {
        en: 'Welcome to my bookstore',
        he: 'ברוך הבא לחנות הספרים שלי'
    },
    id: {
        en: 'Id',
        he: 'מק"ט',
    },
    title: {
        en: 'Title',
        he: 'כותר',
    },

    price: {
        en: 'Price',
        he: 'מחיר',
    },
    newBkBtn: {
        en: 'Create new book?',
        he: 'הוסף כותר חדש',
    },
    action: {
        en: 'Action',
        he: 'בצע',
    },
    readBtn: {
        en: 'Read',
        he: 'הצג',
    },
    updateBtn: {
        en: 'Update',
        he: 'עדכן',
    },
    deleteBtn: {
        en: 'Delete',
        he: 'מחק',
    },
    modalBkTitle: {
        en: 'Book Title',
        he: 'שם הספר',
    },
    modalBkPrice: {
        en: 'Price',
        he: 'מחיר',
    },
    modalBkPic: {
        en: 'Add a book picture',
        he: 'הוסף תמונה',
    },
    submit: {
        en: 'Submit',
        he: 'שמור',
    },
    modalUpdate: {
        en: 'Update Book',
        he: 'עדכן ספר',
    },
    modalRead: {
        en: 'Book Details',
        he: 'פרטי הספר',
    },
    modalAdd: {
        en: 'Add a New Book',
        he: 'הוסף ספר חדש',
    },
    modalTitlePlaceholder: {
        en: 'Enter the book title',
        he: 'רשום/י את שם הספר',
    },
    modalPricePlaceholder: {
        en: 'Enter the books\'price',
        he: 'רשום/י את מחיר הספר',
    }
}


function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');

        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.body.classList.add('rtl')
        $("#read-and-add-new-book").addClass('rtl');
        $(".tbl-header").children().addClass('right-align');
        $('.modal-body').children().addClass('right-align');
    } else {
        document.body.classList.remove('rtl')
        $("#read-and-add-new-book").removeClass('rtl');
        $(".tbl-header").children().removeClass('right-align');
        $('.modal-body').children().removeClass('right-align');
    }
    doTrans();
}