
var etusivuHTML = "<H1>Tervetuloa</H1>";

etusivuHTML +=` <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus pariatur porro voluptate repudiandae ipsum quas sit mollitia vero exercitationem quasi,
 saepe officiis quibusdam ad enim minus, voluptatum adipisci iusto dolor distinctio incidunt.<br><br> Laborum aperiam cum ullam, voluptatibus hic qui sapiente mollitia
  delectus culpa adipisci molestias deserunt quis incidunt. Adipisci quam alias rerum, consectetur labore ratione tenetur nemo odio facere. Dicta sed dolorem saepe omnis,
   placeat ab tempora. <br><br>Nesciunt dicta excepturi dolorum aut esse ipsum molestias culpa architecto at aperiam dolor exercitationem dolorem iusto doloremque ad dolores,
    vero aspernatur fugiat consectetur unde assumenda sit quasi sunt provident?</p>`;

var yritysHTML = "<h1>Frontend Solutions</h1>";

yritysHTML +=`<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque non cupiditate fugiat dolorum voluptatem repudiandae quia laborum debitis at, 
voluptate ipsa accusantium officia, sunt consequuntur autem hic laudantium! Ullam alias, quasi voluptatem consectetur fuga accusamus expedita, velit itaque provident
numquam, officiis dignissimos? <br><br>Molestias ratione tempore repellendus, harum officia inventore fuga dolor nobis obcaecati porro eaque nemo recusandae commodi omnis, 
quod quam! Eaque voluptatum magni, tempora illo aut iste, quod doloribus reprehenderit voluptatem quo quidem odit perspiciatis facere minus soluta accusamus possimus autem 
 fugit! Laudantium nihil obcaecati cupiditate error quas reprehenderit.</p>`;

var palvelutHTML = "<h1>Palvelut ja hinnasto</h1>";

palvelutHTML +=`<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fuga sunt aliquid veritatis voluptatem officiis magnam corporis debitis est, 
nam voluptas incidunt dolores, ipsa enim beatae. <br><br>Repudiandae voluptatem consequatur voluptates illum, fugit placeat obcaecati velit optio recusandae
suscipit ullam, ratione consequuntur similique vel aspernatur aliquam libero ipsum qui labore illo.</p>`;

var yhteystiedotHTML = "<h1>Yhteystiedot</h1>";

yhteystiedotHTML +=`
<ul><li><b>Osoite:</b> Umpikuja 1 A 2, 12345 HELSINKI</li>
<li><b>Puh:</b> 123-456 789</li><li>
<b>Email:</b> john_smith@bogusemail.com</li>`;

var vieraskirjaHTML = '<h1>Vieraskirja</h1><button id=\'SubmitComment\'>PUSH ME</BUTTON>';
var loaded = 0;

function loadetusivu(){
	let currentPageContent = document.getElementById("main");
	currentPageContent.innerHTML = etusivuHTML;
}


let btnContainer = document.getElementById("navbar");
let btns = btnContainer.getElementsByClassName("menu-item");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
		currentPage = current[0].innerText;
		//Update main text

		if(currentPage.includes("Etusivu")){
			let currentPageContent = document.getElementById("main");
			currentPageContent.innerHTML = etusivuHTML;
		}
		else if(currentPage.includes("Yritys")){
			let currentPageContent = document.getElementById("main");
			currentPageContent.innerHTML = yritysHTML;
		}
		else if(currentPage.includes("Palvelut")){
			let currentPageContent = document.getElementById("main");
			currentPageContent.innerHTML = palvelutHTML;
		}
		else if(currentPage.includes("Ota yhteyttä")){
			let currentPageContent = document.getElementById("main");
			currentPageContent.innerHTML = yhteystiedotHTML;
		}
		else if(currentPage.includes("Vieraskirja")){
			let currentPageContent = document.getElementById("main");
				
			
				document.getElementById('SubmitComment').addEventListener('click',postComment);

				function postComment(){
					var xhr = new XMLHttpRequest();
					xhr.open('GET', '/comments/add', true);
					xhr.send();
				}


				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", "./test.txt", true);
				xhttp.send();
				xhttp.onload = function(){
					if(this.status == 200){
						currentPageContent.innerHTML = vieraskirjaHTML;
						currentPageContent.innerHTML += `${this.responseText}`;
					}
					else{
						currentPageContent.innerHTML = vieraskirjaHTML;
					}

				}

			// currentPageContent.innerHTML = vieraskirjaHTML;
			currentPageContent.innerHTML += `</ul>`;
		}

  });
}





	
