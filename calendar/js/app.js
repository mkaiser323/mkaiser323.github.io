var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $compile) {
	var title='calendar.pdf'
	var htmlString = 'Hello World'

	appendHtmlByID(htmlString, '#calendar')
	saveToPdf(htmlString, title)
});

function saveToPdf(content, title){
	var doc = new jsPDF()
	doc.text(content, 10, 10)
	doc.save(title)
}


function appendHtmlByID(content, selector){
	var myEl = angular.element(document.querySelector(selector));
    myEl.append(content);  
}
