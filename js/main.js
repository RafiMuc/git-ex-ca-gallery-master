'use strict';

$(document).ready(function () {
    initPage();
})

function initPage() {
    createProjs();
    renderProjs();
}

function renderProjs() {
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a id="link-${proj.id}" class="portfolio-link" data-toggle="modal" onClick="renderProjModal('${proj.id}')">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}.svg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.name}</p>
          </div>
        </div>`
    })
    $('#proj-portfolio').html(strHtmls.join(''));
}

function renderProjModal(id) {
    var proj = getProjById(id);
    $('#modal-proj-name').text(proj.name);
    $('#modal-proj-title').text(proj.title);
    $('#modal-proj-url').text(proj.url);
    $('#modal-proj-desc').text(proj.desc);
    $('#modal-published-at').text('Date: ' + proj.publishedAt);
    $('#modal-proj-labels').text('Category: ' + proj.labels);
    $('#link-' + id).attr('href', '#proj-modal');
    $('#link-' + id).click();
    $('#proj-modal').show();
    $('#link-' + id).attr('href', '');
}