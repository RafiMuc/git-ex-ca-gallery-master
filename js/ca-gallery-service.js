'use strict'
var gProjs;

function createProjs() {
    gProjs = [
        createProj('proj-1', 'Games', 'Minesweeper', 'Enter a minefield and try to stay alive',
            'projs/proj-1/index.html', 'Sep. 2018', ['matrix', 'Board Game']),
        createProj('proj-2', 'Games', 'Board Game', 'Try to collect the balls',
            'projs/proj-2/index.html', 'Sep. 2018', ['matrix', 'Board Game']),
        createProj('proj-3', 'Games', 'Chess', 'Try to collect the balls',
            'projs/proj-3/index.html', 'Sep. 2018', ['matrix', 'Board Game']),
        createProj('proj-4', 'Utility', 'ToDo List App', 'Manage your ToDo list',
            'projs/proj-4/index.html', 'Sep. 2018', ['Todo', 'Utility']),
        createProj('proj-5', 'Games', 'Guess Who Game', 'Think of a person and let the program guess',
            'projs/proj-5/index.html', 'Sep. 2018', ['game']),
        createProj('proj-6', 'Game', 'In Picture', 'Answer some questions about a picture presented to you',
            'projs/proj-6/index.html', 'Sep. 2018', ['game', 'questions']),
        createProj('proj-7', 'Web site', 'Bookstore', 'Have a look at my bookstore',
            'projs/proj-7/index.html', 'Sep. 2018', ['web site', 'web store'])]
}

function createProj(id, name, title, desc, url, publishedAt, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        labels: labels
    }
}

function getProjs() {
    return gProjs;
}

function getProjById(id) {
    return gProjs.find(function (proj) {
        return proj.id === id;
    })
}

function sendEmail(address, subject, body) {
    var hostName = `https://mail.google.com/mail/?view=cm&fs=1&to=
    ${address}&su=${subject}&body=${body}`;
    window.open(hostName, '_blank');
}
