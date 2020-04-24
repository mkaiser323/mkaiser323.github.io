var app = angular.module('myApp', []);

class Calendar{
	constructor(title, body) {
    	this.title = title;
    	this.body = body;
    	this.ext = 'pdf';
  	}

  	get fileName(){
  		return this.title + '.' + this.ext
  	}
}

var save = true;
app.controller('myCtrl', function($scope) {
	calendar = generateCalendar()
	console.log(calendar)

	appendHtmlByID(calendar.body, '#calendar')

	if (save){
		saveToPdf(calendar.body, calendar.fileName)
	}
});


/*
Try this:
https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e
https://html2canvas.hertzen.com/ => https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js
*/


function generateCalendar(){
	var title = "April 2020"
	var body = "<h1>" + title + "</h1>";

	return new Calendar(title, body)
}

function saveToPdf(content, fileName){
	var doc = new jsPDF({
		orientation: 'landscape',
	})
	doc.text(content, 10, 10)
	doc.save(fileName)
}


function appendHtmlByID(content, selector){
	var myEl = angular.element(document.querySelector(selector));
    myEl.append(content);  
}
