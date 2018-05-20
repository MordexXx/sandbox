'use strict';

var currentPageContent = document.getElementById('main');
var form;
var socket = io();



//FETCH MAIN ELEMENT CONTENTS (SYNCHRONOUS REQUESTS SO WE DONT GET UNDEFINED VARIABLES WHEN LOADING THE FIRST PAGE)


//ETUSIVU 
var etusivuHTML;
var getEtusivuHTML = new XMLHttpRequest();

getEtusivuHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		etusivuHTML = this.responseText;
	}
};

getEtusivuHTML.open("GET", "/contents/etusivu.html", false);
getEtusivuHTML.send();


//YRITYS
var yritysHTML;
var getyritysHTML = new XMLHttpRequest();

getyritysHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yritysHTML = this.responseText;
	}
};

getyritysHTML.open("GET", "/contents/yritys.html", false);
getyritysHTML.send();


//PALVELUT
var palvelutHTML;
var getpalvelutHTML = new XMLHttpRequest();

getpalvelutHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		palvelutHTML = this.responseText;
	}
};

getpalvelutHTML.open("GET", "/contents/palvelut.html", false);
getpalvelutHTML.send();


//YHTEYSTIEDOT
var yhteystiedotHTML;
var getyhteystiedotHTML = new XMLHttpRequest();

getyhteystiedotHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yhteystiedotHTML = this.responseText;
	}
};

getyhteystiedotHTML.open("GET", "/contents/yhteystiedot.html", false);
getyhteystiedotHTML.send();


//VIERASKIRJA
var vieraskirjaHTML;
var getvieraskirjaHTML = new XMLHttpRequest();

getvieraskirjaHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		vieraskirjaHTML = this.responseText;
	}
};

getvieraskirjaHTML.open("GET", "/contents/vieraskirja.html", false);
getvieraskirjaHTML.send();

//SET NAVIGATION BUTTONS INTO VARIABLES
var btnContainer = document.getElementById('navbar');
var btns = btnContainer.getElementsByClassName('menu-item');



//SAVE CURRENT PAGE SELECTION INTO SESSION STORAGE AND LOAD IT UPON RELOADING
var activePage;

if(sessionStorage.activePage === null){
	currentPageContent.innerHTML = etusivuHTML;
	sessionStorage.setItem('activePage', 'Etusivu');
	activePage = document.getElementById('etusivu');
	activePage.className += ' active';	
}
else if(sessionStorage.activePage === 'Yritys'){
	currentPageContent.innerHTML = yritysHTML;
	activePage = document.getElementById('yritys');
	activePage.className += ' active';	
}
else if(sessionStorage.activePage === 'Palvelut'){
	currentPageContent.innerHTML = palvelutHTML;
	activePage = document.getElementById('palvelut');
	activePage.className += ' active';	
}
else if(sessionStorage.activePage === 'Yhteystiedot'){
	currentPageContent.innerHTML = yhteystiedotHTML;
	activePage = document.getElementById('yhteystiedot');
	activePage.className += ' active';	
}
else if(sessionStorage.activePage === 'Vieraskirja'){
	currentPageContent.innerHTML = vieraskirjaHTML;
	activePage = document.getElementById('vieraskirja');
	activePage.className += ' active';
	//LOAD QUESTBOOK COMMENTS FROM THE SERVER
	loadComments();
	//SUBMIT BUTTON
	submitButton();
}
else{
	currentPageContent.innerHTML = etusivuHTML;
	sessionStorage.setItem('activePage', 'Etusivu');
	activePage = document.getElementById('etusivu');
	activePage.className += ' active';	
}


//CHECK WHICH MENU BUTTON HAS BEEN PRESSED AND SET IT AS ACTIVE
var current;

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function() {
    current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
		this.className += ' active';
		var currentPage = current[0].innerText;
		//SET MAIN ELEMENT TEXT TO MATCH THE ACTIVE PAGE
		if(currentPage.includes("Etusivu")){
			currentPageContent.innerHTML = etusivuHTML;
			sessionStorage.setItem('activePage', 'Etusivu');
		}
		else if(currentPage.includes("Yritys")){
			currentPageContent.innerHTML = yritysHTML;
			sessionStorage.setItem('activePage', 'Yritys');
		}
		else if(currentPage.includes("Palvelut")){
			currentPageContent.innerHTML = palvelutHTML;
			sessionStorage.setItem('activePage', 'Palvelut');
		}
		else if(currentPage.includes("Ota yhteyttä")){
			currentPageContent.innerHTML = yhteystiedotHTML;
			sessionStorage.setItem('activePage', 'Yhteystiedot');
		}
		else if(currentPage.includes("Vieraskirja")){
			currentPageContent.innerHTML = vieraskirjaHTML;
			sessionStorage.setItem('activePage', 'Vieraskirja');
			//LOAD QUESTBOOK COMMENTS FROM THE SERVER
			loadComments();
			//SUBMIT BUTTON
			submitButton();
		}
  });
}

function submitButton(){
	//ADD LISTENER FOR THE SUBMIT BUTTON AND SEND COMMENT TO SERVER ON CLICK
	form = document.querySelector('form');
	form.addEventListener('submit', sendComment);
};

function loadComments(){
	var el = document.getElementById('comments');
	socket.on('comments', function(comments) {
	el.innerHTML = comments;
	console.log(comments);
	});
};

function sendComment(e){
	//PUT FORM INPUT VALUES INTO VARIABLES
	var nameInput = document.getElementById('name');
	var commentInput = document.getElementById('comment');
	//SEND FORM DATA TO SERVER AND REFRESH THE COMMENT ELEMENT
	e.preventDefault();
	var data = [nameInput.value, commentInput.value];
	//EMPTY THE COMMENT FIELD AFTER SUBMIT BUTTON HAS BEEN PRESSED
	document.getElementById('comment').value = '';			
	socket.emit('sql',data);

};

	
