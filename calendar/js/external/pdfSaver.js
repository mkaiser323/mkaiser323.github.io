function saveSelectionAsPDF(filename, selector, orientation){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		saveImageAsPDF(canvas.toDataURL('image/png'), 792, 612, filename, orientation)
	});
}

function saveImageAsPDF(imageData, long, short, fileName, orientation){
	if (orientation == 'landscape'){
		width = long;
		height = short;
	} else {
		width = short;
		height = long;
	}
	var doc = new jsPDF({
		orientation: orientation,
		unit: 'pt',
		format: 'letter'
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}