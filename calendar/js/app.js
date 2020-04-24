var app = angular.module('myApp', []);

class Calendar{
	constructor(title, weeks) {
    	this.title = title;
    	this.weeks = weeks;
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
		this.placeholder = false;
	}

	next() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() + 1);
		return new Day(result)
	}

	previous() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() - 1);
		return new Day(result)
	}
}

class Week {
	constructor(startDate) {
		this.startDate = startDate;
		this.mostRecentSunday = this.getMostRecentSunday();
		this.populateDays()
	}

	getMostRecentSunday() {
		var day = this.startDate;
		while (day.weekday != 'Sunday') {
			day = day.previous()
		}
		return day;
	}

	populateDays() {
		this.days = [this.mostRecentSunday];
		var day = this.mostRecentSunday;
		do {
			if (day.date < this.startDate.date) {
				day.placeholder = true;
			}
			this.days.push(day);
			day = day.next();
		} while (day.weekday != 'Sunday');
		this.nextDay = day;
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
	var title = "April 2020";
	var body = "<h1>" + title + "</h1>";

	var firstDay = getFirstDayOfCurrentMonth();
	var weeks = [];
	var d = firstDay;
	while (d.date.getMonth() == firstDay.date.getMonth()) {
		var w = new Week(d)
		weeks.push(w);
		d = w.nextDay
	}

	return new Calendar(title, weeks)
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
