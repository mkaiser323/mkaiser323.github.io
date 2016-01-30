var t = 1000;


$(document).ready(function(){

	//nav toggle

	$('.fa-bars').click(function(){
		$('.nav').toggle();
	});

	//make nav disappear when clicking anywhere on screen


	display_projects('display_projects');
	display_experience('display_experience');
	display_awards('display_awards');
	display_skills('display_skills');
	display_contact('display_contact');
	
	//change bg in response to scrolling to different sections
	$(window).scroll(function(){
		section_handler();
	});

	projects_handler();
	skills_handler();
	header_handler();

});

var skills_handler = function(){
	//expand stars upon hover:
	$('.skill').mouseenter(function(){
		$(this).children('.text-right').children('.filled-star').animate({
			"margin-right":"5px"
		}, t/4);
	});
	$('.skill').mouseleave(function(){
		$(this).children('.text-right').children('.filled-star').animate({
			"margin-right":"0px"
		}, t/4);
	});
}

var projects_handler = function(){
	//hover effect for project details
	$('.project').mouseenter(function(){
		$(this).children('.details').stop();
		$(this).children('.details').children('.title').stop();
		$(this).children('.details').children('.p').stop();
		$(this).children('.details').children('.tags').stop();
		$(this).children('.details').children('hr').stop();
		$(this).children('.details').children('.view-options').stop();

		$(this).children('.details').animate({
			height: 'show'
		}, t);

		$(this).children('.details').children('.title').animate({
			width: '100%'
		}, t);

		$(this).children('.details').children('.p').animate({
			right: '0%'
		}, t);
		$(this).children('.details').children('.tags').animate({
			left: '0%'
		}, t);
		$(this).children('.details').children('hr').animate({
			width: "80%"
		}, t*1.25);

		$(this).children('.details').children('.view-options').animate({
			bottom: '0px'
		}, t);
	});

	$('.project').mouseleave(function(){
		$(this).children('.details').stop();
		$(this).children('.details').children('.title').stop();
		$(this).children('.details').children('.p').stop();
		$(this).children('.details').children('.tags').stop();
		$(this).children('.details').children('hr').stop();
		$(this).children('.details').children('.view-options').stop();
		$(this).children('.details').animate({
			height: 'hide'
		}, t);
		$(this).children('.details').children('.title').animate({
			width: '300%'
		}, t);
		$(this).children('.details').children('.p').animate({
			right: '100%'
		}, t);
		$(this).children('.details').children('.tags').animate({
			left: '100%'
		}, t);		
		$(this).children('.details').children('hr').animate({
			width: "0%"
		}, t/2);
		$(this).children('.details').children('.view-options').animate({
			bottom: '-500px'
		}, t);
	});
}

var header_handler = function(){

	arrow_hover();
}

var arrow_hover = function(){
	hover_down();
}

var hover_down = function(){
	$('.fa-angle-down').animate({
		top: "0px"
	}, t);
	hover_up();
};
var hover_up = function(){
	$('.fa-angle-down').animate({
		top: "25px"
	}, t);
	hover_down();

};

var remove_classes = function(){
	for(var i = 1; i <= 6; i++ ){
		$('.nav li:nth-of-type(' + i + ') a').removeClass('highlighted');		
	}
};

var section_handler = function(){
	var distance_to_summary = $('header')[0].scrollHeight,
	distance_to_projects = distance_to_summary + $('#summary')[0].scrollHeight, 
	distance_to_experience = distance_to_projects + $('#projects')[0].scrollHeight,
	distance_to_awards = distance_to_experience + $('#experience')[0].scrollHeight,
	distance_to_skills = distance_to_awards + $('#awards')[0].scrollHeight, 
	distance_to_contact = distance_to_skills + $('#skills')[0].scrollHeight;

	var in_summary = $(this).scrollTop() >= distance_to_summary;
	var in_projects = $(this).scrollTop() >= distance_to_projects;
	var in_experience = $(this).scrollTop() >= distance_to_experience;
	var in_awards = $(this).scrollTop() >= distance_to_awards;
	var in_skills = $(this).scrollTop() >= distance_to_skills;
	var in_contact = $(this).scrollTop() >= distance_to_contact;

	if(in_contact){
		remove_classes();
		$('.nav li:nth-of-type(6) a').addClass('highlighted');
		$('.back-to-top').css("display", "block");	
		$('nav').css("display", "block");
	} else if (in_skills) {
		remove_classes();
		$('nav').css("display", "block");
		$('.back-to-top').css("display", "block");	
		$('.nav li:nth-of-type(5) a').addClass('highlighted');
	} else if(in_awards){
		remove_classes();
		$('body').css("background-position","0 -200vh");
		$('nav').css("display", "block");
		$('.back-to-top').css("display", "block");	
		$('.nav li:nth-of-type(4) a').addClass('highlighted');
	} else if (in_experience){
		remove_classes();
		$('body').css("background-position","0 -200vh");
		$('nav').css("display", "block");
		$('.back-to-top').css("display", "block");	
		$('.nav :nth-of-type(3) a').addClass('highlighted');
	} else if(in_projects){
		remove_classes();
		$('body').css("background-position","0 -100vh");
		$('nav').css("display", "block");
		$('.back-to-top').css("display", "block");	
		$('.nav li:nth-of-type(2) a').addClass('highlighted');    		
	} else if(in_summary){
		remove_classes();
		$('body').css("background-position","0 -100vh");

		$('nav').css("display", "block");
		$('.back-to-top').css("display", "block");	
		$('.nav li:nth-of-type(1) a').addClass('highlighted');
	} else {
		remove_classes();
		$('body').css("background-position","0 0vh");
		$('nav').css("display", "none");	
		$('.back-to-top').css("display", "none");	
	}
};


/*only works on header, scrollAmount needs to be recalculated for each section*/
var background_movement = function(){
	var scrollAmount = $(window).scrollTop();
	scrollAmount *= -0.3;
	var value = "0px " + scrollAmount + "px";
	$('body').css("background-position", value);
};

var display_projects = function(div_id){

	for(var i = 0; i < projects.length; i++){
		var header = projects[i].header,
		details = projects[i].details,
		bg_img = projects[i].bg_img,
		finished_product = projects[i].finished_product,
		github = projects[i].github,
		taglist = projects[i].taglist;

		//TAGS
		var tag_div = "<div class = 'tags text-left'><i class = 'fa fa-tags'> tags: </i>";
		for(var j = 0; j < taglist.length; j++){
			tag_div += "<i class = 'tag'>" + taglist[j].tag + "</i>";

		}
		tag_div += "</div>";

		var out;
		if(projects.length % 2 === 1 && i === 0){
			out = "<div class = 'col-md-3'></div><div class = 'col-md-6'>";
		} else {
			out = "<div class = 'col-md-6'>";
		}
		out += '<div class = "row text-center project-frame">'
		+ '<div class = "project">';

		out += '<img src = "' + bg_img + '"/>';
		out += '<div class = "details">';
		out += '<div class = "title">' + '<h3>' + header + '</h3></div>';
		out += '<hr>';
		out += '<div class = "p"><p>' + details + '</p></div>';
		out += '<hr>';
		out += tag_div;
		out += '<div class = "view-options">'
		 		+ '<a href = "' + finished_product +'" target = "_blank">' 
					+ '<div class = "view view-project col-md-6">';

					if(i==1){
						out += '<i class  = "fa fa-eye"></i><p>View Demo</p>';
					} else {
					 out += '<i class  = "fa fa-eye"></i><p>View Finished Product</p>';	
					}
					out += '</div></a>'
				+ '<a href = "' + github + '" target = "_blank">' 
					+ '<div class = "view view-code col-md-6">'
						+ '<i class  = "fa fa-code"></i><p>View Code</p>'
					+ '</div></a>'
				+'</div>';	
		out += "</div></div></div></div>";
		document.getElementById(div_id).innerHTML += out;
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

		document.getElementById(div_id).innerHTML += out;
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
		//out += '<i class = "fa fa-trophy"></i>';
		out += '<h4>' + date + '</h4>';		
		out += '</div>';

		out += '<div class="timeline-panel">';
		out += '<div class="timeline-heading">';
		//out += '<h4>' + date + '</h4>';
		out += '<h4 class="subheading">' + award + '</h4>';
		out += '</div>';
		out += '<div class="timeline-body">';
		out += '<p><i class = "fa fa-map-marker"> ' + place + '</i></p>';
		out += '</div>';
		out += '</div>';

		out += '</li>';	
	}
	out += '</ul>';
	document.getElementById(div_id).innerHTML += out;


};

var display_skills = function(div_id){
	var half = "<div class = 'col-md-6'>",
	full = "<div class = 'col-md-12'>"
	close_div = "</div>",
	out = "";

	for(var s = 0; s < skills.length; s++){

		//open column
		var section = full,
		col1 = half, 
		col2 = half;

		//add header
		section += '<h3>' + skills[s].section + '</h3>';

		for(var i = 0; i < skills[s].skills.length; i++){

			var skill = skills[s].skills[i].skill,
			stars = skills[s].skills[i].stars;

			var full_star = "<i class = 'fa fa-star filled-star'></i> ", 
			empty_star = "<i class = 'fa fa-star faded'></i> ";

			var skill_field = "<div class = 'col-md-6 text-left'><p>" + skill + "</p></div>";
			var stars_field = "<div class = 'col-md-6 text-right'>";
			for(var j = 0; j < stars; j++){
				stars_field += full_star;
			}
			for(; j < 5; j++){
				stars_field += empty_star;
			}
			stars_field += "</div>";

			var row = "<div class = 'col-md-12 col-sm-12 skill'>";
			row += skill_field + stars_field;
			row += "</div>";

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

	document.getElementById(div_id).innerHTML += out;
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
	document.getElementById(div_id).innerHTML += out;
};