function saveSelectionAsPDF(filename, selector, orientation){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		saveImageAsPDF(canvas.toDataURL('image/png'), 0, 0, filename, orientation)
	});
}

function saveImageAsPDF(imageData, width, height, fileName, orientation){
	var doc = new jsPDF({
		orientation: orientation,
		unit: 'px',
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}