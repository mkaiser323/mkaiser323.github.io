var backgroundImage = [
	'https://static.pexels.com/photos/28221/pexels-photo-28221.jpg',
	'https://static.pexels.com/photos/5443/city-lights-night-rooftop.jpg',
	'https://static.pexels.com/photos/9574/pexels-photo.jpeg'];

$(document).ready(function(){
	
	var imageIndex = Math.round((backgroundImage.length-1)*Math.random());
	$("body").css("background-image", "url("+backgroundImage[imageIndex]+")");
	// alert("hello world");
});