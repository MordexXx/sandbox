//FETCH MAIN ELEMENT CONTENTS


//ETUSIVU
var etusivuHTML;
var getEtusivuHTML = new XMLHttpRequest();

getEtusivuHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		etusivuHTML = this.responseText;
	}
};

getEtusivuHTML.open("GET", "/contents/etusivu.html", true);
getEtusivuHTML.send();


//YRITYS
var yritysHTML;
var getyritysHTML = new XMLHttpRequest();

getyritysHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yritysHTML = this.responseText;
	}
};

getyritysHTML.open("GET", "/contents/yritys.html", true);
getyritysHTML.send();


//PALVELUT
var palvelutHTML;
var getpalvelutHTML = new XMLHttpRequest();

getpalvelutHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		palvelutHTML = this.responseText;
	}
};

getpalvelutHTML.open("GET", "/contents/palvelut.html", true);
getpalvelutHTML.send();


//YHTEYSTIEDOT
var yhteystiedotHTML;
var getyhteystiedotHTML = new XMLHttpRequest();

getyhteystiedotHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		yhteystiedotHTML = this.responseText;
	}
};

getyhteystiedotHTML.open("GET", "/contents/yhteystiedot.html", true);
getyhteystiedotHTML.send();


//VIERASKIRJA
var vieraskirjaHTML;
var getvieraskirjaHTML = new XMLHttpRequest();

getvieraskirjaHTML.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		vieraskirjaHTML = this.responseText;
	}
};

getvieraskirjaHTML.open("GET", "/contents/vieraskirja.html", true);
getvieraskirjaHTML.send();

function loadetusivu(){
    var currentPageContent = document.getElementById('main');
    currentPageContent.innerHTML = etusivuHTML;
}