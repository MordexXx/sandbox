'use strict';

var currentPageContent = document.getElementById('main');
var etusivuHTML;
var currentPage;
var yritysHTML;
var palvelutHTML;
var yhteystiedotHTML;
var vieraskirjaHTML;
var socket = io();
//FETCH MAIN ELEMENT CONTENTS


//ETUSIVU

var getEtusivuHTML = new XMLHttpRequest();

getEtusivuHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		etusivuHTML = this.responseText;
	}
};

getEtusivuHTML.open("GET", "/contents/etusivu.html", false);
getEtusivuHTML.send();


//YRITYS

var getyritysHTML = new XMLHttpRequest();

getyritysHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yritysHTML = this.responseText;
	}
};

getyritysHTML.open("GET", "/contents/yritys.html", false);
getyritysHTML.send();


//PALVELUT

var getpalvelutHTML = new XMLHttpRequest();

getpalvelutHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		palvelutHTML = this.responseText;
	}
};

getpalvelutHTML.open("GET", "/contents/palvelut.html", false);
getpalvelutHTML.send();


//YHTEYSTIEDOT

var getyhteystiedotHTML = new XMLHttpRequest();

getyhteystiedotHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yhteystiedotHTML = this.responseText;
	}
};

getyhteystiedotHTML.open("GET", "/contents/yhteystiedot.html", false);
getyhteystiedotHTML.send();


//VIERASKIRJA

var getvieraskirjaHTML = new XMLHttpRequest();

getvieraskirjaHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		vieraskirjaHTML = this.responseText;
	}
};

getvieraskirjaHTML.open("GET", "/contents/vieraskirja.html", false);
getvieraskirjaHTML.send();


// document.addEventListener("DOMContentLoaded", function(event) {
// var currentPageContent = document.getElementById('main');
// currentPageContent.innerHTML = etusivuHTML;
// });



//SET ACTIVE MENU BUTTON TO ETUSIVU ON PAGE LOAD

		currentPageContent.innerHTML = etusivuHTML;
		console.log(currentPageContent);
		console.log(etusivuHTML);


//CHECK WHICH MENU BUTTON HAS BEEN PRESSED AND SET IT AS ACTIVE
var btnContainer = document.getElementById('navbar');
var btns = btnContainer.getElementsByClassName('menu-item');

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
		this.className += ' active';
		currentPage = current[0].innerText;
		//SET MAIN ELEMENT TEXT TO MATCH THE ACTIVE PAGE
		if(currentPage.includes("Etusivu")){
			currentPageContent.innerHTML = etusivuHTML;
		}
		else if(currentPage.includes("Yritys")){
			currentPageContent.innerHTML = yritysHTML;
		}
		else if(currentPage.includes("Palvelut")){
			currentPageContent.innerHTML = palvelutHTML;
		}
		else if(currentPage.includes("Ota yhteyttä")){
			currentPageContent.innerHTML = yhteystiedotHTML;
		}
		else if(currentPage.includes("Vieraskirja")){
			currentPageContent.innerHTML = vieraskirjaHTML;
			//LOAD QUESTBOOK COMMENTS FROM THE SERVER
			var el = document.getElementById('comments');
			socket.on('comments', function(comments) {
				el.innerHTML = comments;
			});
			//PUT FORM INPUT VALUES INTO VARIABLES
			var form = document.querySelector('form');
			var nameInput = document.getElementById('name');
			var commentInput = document.getElementById('comment');

			//ADD LISTENER FOR THE SUBMIT BUTTON
			form.addEventListener('submit', runEvent);

			//SEND FORM DATA TO SERVER AND REFRESH THE COMMENT ELEMENT
			function runEvent(e){
				e.preventDefault();
				var data = [nameInput.value, commentInput.value];
				//EMPTY THE COMMENT FIELD AFTER SUBMIT BUTTON HAS BEEN PRESSED
				document.getElementById('comment').value = '';			
				socket.emit('sql',data);
			}
		}
  });
}





	
