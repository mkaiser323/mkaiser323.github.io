//credit: https://stackoverflow.com/a/37966002
function rotateCanvas(canvas){
	  // create intermediate canvas
	  var rotCanvas = document.createElement("canvas");
  
	  // swap width and height
	  rotCanvas.width = canvas.height;
	  rotCanvas.height = canvas.width;
  
	  // get context
	  var rctx = rotCanvas.getContext("2d");
  
	  // translate to center (rotation pivot)
	  rctx.translate(rotCanvas.width * 0.5, rotCanvas.height * 0.5);
  
	  // rotate -90° (CCW)
	  rctx.rotate(-Math.PI * 0.5);
  
	  // draw image offset so center of image is on top of pivot
	  rctx.drawImage(canvas, -canvas.width * 0.5, -canvas.height * 0.5);
	  
	  return rotCanvas
}

function saveSelectionAsPDF(filename, selector, orientation){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		if (orientation == 'landscape'){
			canvas = rotateCanvas(canvas)
		}
		saveImageAsPDF(canvas, 792, 612, filename, orientation)
	});
}

function saveImageAsPDF(imageData, height, width, fileName, orientation){
	var doc = new jsPDF({
		orientation: 'portrait',
		unit: 'pt',
		format: 'letter'
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}