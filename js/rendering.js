var render_summary = function(i){
	var finished_product = projects[i].finished_product,
	github = projects[i].github;
	var out = "<div class = 'project_summary' id = 'summary_" + i + "'>";
	out += "<div class = 'container'>";
	out += "<div class = 'project_summary_wrapper'>";

	out += "<div class = 'col-lg-3 col-md-3'></div>";

	out += "<div class = 'col-lg-6 col-md-6'>";
	var section = projects[i].summary.section;
	out += "<h2>"+projects[i].summary.title+"</h2>";

	var bg_img = projects[i].bg_img;
	out += "<img src = '"+bg_img+"' class = 'summary_header_img'>";

	for(var j = 0; j < section.length; j++){//iterate through each section
		out += "<h3>" + section[j].header + "</h3>";
		for(var k = 0; k < section[j].p.length; k++){//iterate through each paragraph
			out += "<p>" + section[j].p[k].text + "</p>";
		}
	}

	//finished product/github repo buttons:
	out += "<a href = '"+finished_product+"' target = '_blank' >";
	out += "<div class = 'col-md-6' class = 'summary_button' id = 'product_button'>";//button 1
	out += "<p>View finished product</p>";
	out +="</div>";//end button 1	
	out += "</a>";

	out += "<a href = '"+github+"' target = '_blank' >";
	out += "<div class = 'col-md-6' class = 'summary_button' id = 'repo_button'>";//button 2
	out += "<p>View code on github</p>";	
	out +="</div>";//end button 2	
	out += "</a>";
	out += "</div>";//col
	out += "</div>";//wrapper
	out += "</div>";//container
	out += "</div>";//project_summary
	$('body').append(out);
}

var display_projects = function(div_id){

	for(var i = 0; i < projects.length; i++){
		var header = projects[i].header,
		details = projects[i].details,
		bg_img = projects[i].bg_img,
		finished_product = projects[i].finished_product,
		github = projects[i].github,
		taglist = projects[i].taglist
		page = projects[i].page;

		//TAGS
		var tag_div = "<div class = 'tags text-left'><i class = 'fa fa-tags'> tags: </i>";
		for(var j = 0; j < taglist.length; j++){
			tag_div += "<i class = 'tag'>" + taglist[j].tag + "</i>";

		}
		tag_div += "</div>";

		var out;
		if(projects.length % 2 === 1 && i === projects.length-1){//this centers the last element if the set is odd
			out = "<div class = 'col-md-3'></div><div class = 'col-md-6'>";
		} else {
			out = "<div class = 'col-md-6'>";
		}
		out += '<div class = "row text-center project-frame">'
		+ '<div class = "project" id = "project_'+i+'"">';

		out += "<a href = '"+page+"' target = '_blank'>";

		out += '<img src = "' + bg_img + '"/>';
		out += '<div class = "details">';
		out += '<div class = "title">' + '<h3>' + header + '</h3></div>';
		out += '<hr>';
		out += '<div class = "p"><p>' + details + '</p></div>';
		out += '<hr>';
		out += tag_div;
		out += '<div class = "view-options">';
		out += "<div class = 'view col-md-12'><p>Additional Details</p></div>";
		out +='</div>';//end view-options
		out +='</div>';//end details

		out += '</a>';
		out += "</div></div></div>";
		$(div_id).append(out);
		//render_summary(i);

	}
};

var display_experience = function(div_id){
	for(var i = 0; i < experience.length; i++){
		var position = experience[i].position,
		date = experience[i].date,
		place = experience[i].place,
		details = experience[i].details,
		bullet_points = experience[i].bullet_points,
		loc = experience[i].loc,
		link = experience[i].link; 

		var out = '<div class = "row">';

		if(i!=0){
			out += '<hr>';//section dividers
		}

		//LEFT COLUMN
		out += '<div class = "col-md-4">';
		out += '<h3 class = "place" >' + place + '</h3>';
		out += '<p class = "date">' + date + '</p>';
		out += '</div>';

		//RIGHT COLUMN
		out += '<div class = "col-md-8">';
		out += '<h3 class = "position">' + position + '</h3>';
		out += '<p class = "work_description">' + details + '</p>';
		
		//bullet points
		out += '<ul>';
		for(j = 0; j < bullet_points.length; j++){
			out += '<li>' + bullet_points[j].bullet + '</li>';
		}
		out += '</ul>';
		out += '<p class = "work_location"><i class = "fa fa-map-marker"></i> ' + loc;
		if(link != ""){
			out += ' | <a href = "' + link + '" target = "blank" <i class = "fa fa-link"></i> ' + link + '</a></p>';
		} else {
			out += '</p>'
		}
		out += '</div>';
		out += '</div>';

		$(div_id).append(out);
	}
};

var display_awards = function(div_id){
	var out = '<ul class="timeline">';
	for(var i = 0; i < awards.length; i++){
		var award = awards[i].award,
		place = awards[i].place,
		date = awards[i].date;

		if(i % 2 === 1){
			out += '<li class="timeline-inverted">';
		} else {
			out += '<li>';
		}

		out += '<div class="timeline-image">';
		out += '<h4>' + date + '</h4>';		
		out += '</div>';

		out += '<div class="timeline-panel">';
		out += '<div class="timeline-heading">';
		out += '<h4 class="subheading">' + award + '</h4>';
		out += '</div>';
		out += '<div class="timeline-body">';
		out += '<p><i class = "fa fa-map-marker"> ' + place + '</i></p>';
		out += '</div>';
		out += '</div>';

		out += '</li>';	
	}
	out += '</ul>';
	$(div_id).append(out);
};

var display_skills = function(div_id){
	var half = "<div class = 'col-md-6 skills_col'>",
	full = "<div class = 'col-md-12 skills_group'>"
	close_div = "</div>",
	out = "";

	for(var s = 0; s < skills.length; s++){

		//open column
		var section = full,
		col1 = half, 
		col2 = half;

		if(s!=0){
			section += '<hr>';//section dividers
		}

		//add header
		section += '<h3>' + skills[s].section + '</h3>';

		for(var i = 0; i < skills[s].skills.length; i++){

			var skill = skills[s].skills[i].skill,
			stars = skills[s].skills[i].stars;

			var full_star = "<i class = 'fa fa-star filled-star'></i> ", 
			empty_star = "<i class = 'fa fa-star faded'></i> ";

			var skill_field = "<div class = 'col-md-6 col-sm-6 col-xs-6 text-left sk'><p>" + skill + "</p></div>";
			var stars_field = "<div class = 'col-md-6 col-sm-6 col-xs-6 text-right st'>";
			for(var j = 0; j < stars; j++){
				stars_field += full_star;
			}
			for(; j < 5; j++){
				stars_field += empty_star;
			}
			stars_field += "</div>";

			var row = "<div class = 'row skill'><div class = 'col-md-12 col-sm-12'>";
			row += skill_field + stars_field;
			row += "</div></div>";

			if(i < Math.ceil(skills[s].skills.length/2)){
				if(i === Math.ceil(skills[s].skills.length/2)-1){
					col1 += row + close_div;
				} else {
					col1 += row;
				}
			} else {
				col2 += row;
			}

			if (i === skills[s].skills.length){
				col2 += close_div;
			}
		}	
		section += col1 + col2;
		section += close_div + close_div;//close column
		out += section;
	}
	$(div_id).append(out);
};

var display_contact = function(div_id){
	var row = "<div class = 'row'>",
	col_icon = '<div class = "col-md-3">',
	col_link = '<div class = "col-md-9">',
	close_div = "</div>", 
	out = "";
	for(var i = 0; i < contact.length; i++){
		var icon = contact[i].icon,
		link = contact[i].link;
		if(contact[i].mailto){
			out += '<a href = "mailto:' + link + '" target = "_blank">';			
		} else {
			out += '<a href = "http://' + link + '" target = "_blank">';			
		}
		out += row;
		out += col_icon;
		out += '<p><i class ="fa ' + icon + '"></i></p>';
		out += close_div;//close column
		out += col_link;
		out += '<p>' + link + '</p>';
		out += close_div;//close column
		out += close_div; //close row
		out += '</a>';
	}
	$(div_id).append(out);
};