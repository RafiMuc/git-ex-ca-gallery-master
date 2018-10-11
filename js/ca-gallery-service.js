'use strict'
var gProjs;

function createProjs() {
    gProjs = [
        createProj('proj-1', 'Minesweeper', 'Games', 'Enter a minefield and try to stay alive',
            'projs/proj-1/index.html', 'Sep. 2018', ['matrix', 'Board Game']),
        createProj('proj-2', 'Board Game', 'Games', 'Try to collect the balls',
            'projs/proj-2/index.html', 'Sep. 2018', ['matrix', 'Board Game'])]
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

function sendEmail(address, subject, body){
    var hostName = `https://mail.google.com/mail/?view=cm&fs=1&to=
    ${address}&su=${subject}&body=${body}`;
    window.open(hostName, '_blank');
}
