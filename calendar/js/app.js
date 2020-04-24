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
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Day {
	constructor(date) {
		this.date = date;
		this.day = date.getDate();
		this.weekday = weekdays[date.getDay()];
	}

	next() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() + 1);
		return new Day(result)
	}
}

class Week {
	constructor(startDate) {
		//TODO: validation, startDate should be on a Sunday
		this.startDate = startDate
		

	}
}

function getFirstDayOfCurrentMonth(){
	var date = new Date();
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	return new Day(firstDay)
}

var save = true;
app.controller('myCtrl', function($scope) {
	calendar = generateCalendar()
	console.log(calendar)

	var d = getFirstDayOfCurrentMonth()
	console.log(d)
	console.log(d.next())
	//$scope.title = calendar.title
	$scope.weeks = ['week1', 'week2']

	$scope.save=function(){
		saveAsPDF(calendar.fileName, '#calendar')
	}
});

function saveAsPDF(filename, selector){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		saveImageAsPDF(canvas.toDataURL('image/png'), 0, 0, filename)
	});
}

function generateCalendar(){
	var title = "April 2020"
	var body = "<h1>" + title + "</h1>";

	return new Calendar(title, body)
}

function saveImageAsPDF(imageData, width, height, fileName){
	var doc = new jsPDF({
		orientation: 'landscape',
		unit: 'px',
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}


function appendHtmlByID(content, selector){
	var myEl = angular.element(document.querySelector(selector));
    myEl.append(content);  
}
