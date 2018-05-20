'use strict';

var currentPage;
var socket = io();
//SET MAIN ELEMENT CONTENT VARIABLES

var etusivuHTML;
var getEtusivuHTML = new XMLHttpRequest();

getEtusivuHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		etusivuHTML = this.responseText;
	}
};

getEtusivuHTML.open("GET", "/contents/etusivu.html", true);
getEtusivuHTML.send();

var yritysHTML = '<h1>Frontend Solutions</h1><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque non cupiditate fugiat dolorum voluptatem repudiandae quia laborum debitis at, voluptate ipsa accusantium officia, sunt consequuntur autem hic laudantium! Ullam alias, quasi voluptatem consectetur fuga accusamus expedita, velit itaque providentnumquam, officiis dignissimos? <br><br>Molestias ratione tempore repellendus, harum officia inventore fuga dolor nobis obcaecati porro eaque nemo recusandae commodi omnis, quod quam! Eaque voluptatum magni, tempora illo aut iste, quod doloribus reprehenderit voluptatem quo quidem odit perspiciatis facere minus soluta accusamus possimus autem fugit! Laudantium nihil obcaecati cupiditate error quas reprehenderit.</p>';

var palvelutHTML = '<h1>Palvelut ja hinnasto</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fuga sunt aliquid veritatis voluptatem officiis magnam corporis debitis est, nam voluptas incidunt dolores, ipsa enim beatae. <br><br>Repudiandae voluptatem consequatur voluptates illum, fugit placeat obcaecati velit optio recusandaesuscipit ullam, ratione consequuntur similique vel aspernatur aliquam libero ipsum qui labore illo.</p>';

var yhteystiedotHTML = '<h1>Yhteystiedot</h1><ul><li><b>Osoite:</b> Umpikuja 1 A 2, 12345 HELSINKI</li><li><b>Puh:</b> 123-456 789</li><li><b>Email:</b> john_smith@bogusemail.com</li>';

var vieraskirjaHTML = '<h1>Vieraskirja</h1><form><input type=\'text\' required placeholder=\'Laita tähän nimesi\' id=\'name\' name=\'name\'/><br><input type=\'text\' required placeholder=\'Kirjoita viestisi tähän\' id=\'comment\' name=\'comment\'/><button type=\'submit\'>Jätä viesti</button></form><hr><div id=\'comments\'></div>';

//SET ACTIVE MENU BUTTON TO ETUSIVU ON PAGE LOAD
function loadetusivu(){
	var currentPageContent = document.getElementById('main');
	currentPageContent.innerHTML = etusivuHTML;
}


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
				el.innerHTML = comments + "<hr>";
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





	
