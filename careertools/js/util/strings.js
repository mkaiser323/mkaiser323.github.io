function buildDateString(date){
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();

	return mm + '/' + dd + '/' + yyyy;
}

function constructTitle(company, role){
	return (company ? (company + "-") : "") + (role ? (role + " ") : "") + "Cover Letter";
}