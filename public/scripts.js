'use strict';

var currentPage;
var socket = io();

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
			var currentPageContent = document.getElementById('main');
			currentPageContent.innerHTML = etusivuHTML;
		}
		else if(currentPage.includes("Yritys")){
			var currentPageContent = document.getElementById('main');
			currentPageContent.innerHTML = yritysHTML;
		}
		else if(currentPage.includes("Palvelut")){
			var currentPageContent = document.getElementById('main');
			currentPageContent.innerHTML = palvelutHTML;
		}
		else if(currentPage.includes("Ota yhteyttä")){
			var currentPageContent = document.getElementById('main');
			currentPageContent.innerHTML = yhteystiedotHTML;
		}
		else if(currentPage.includes("Vieraskirja")){
			var currentPageContent = document.getElementById('main');
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





	
