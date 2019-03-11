var skills_handler = function(){
	//expand stars upon hover:
	$('.skill').mouseenter(function(){
		$(this).children().children('.text-right').children('.filled-star').animate({
			"margin-right":"5px"
		}, t/4);
	});
	$('.skill').mouseleave(function(){
		$(this).children().children('.text-right').children('.filled-star').animate({
			"margin-right":"0px"
		}, t/4);
	});
}

var projects_handler = function(){
	//hover effect for project details
	if( $(document).width() > 480){
		hover_effects();
	}
	//PROJECT SUMMARY
	/****This was for the popup-- i shouldn't need it any more
	$('.project').click(function(){
		var index = ($(this).attr("id")).split("_")[1];
		//alert("project " + index + " has been clicked");
		$('#summary_'+index).show();
	});

	$('.fa-times').click(function(){
		$(this).parent().parent().hide();
	});

	$('.exit').click(function(){
		$(this).parent().parent().parent().parent().hide();		
	});
	*/
	//END PROJECT SUMMARY
}

var hover_effects = function(){
	show_details();
	hide_details();

}

var show_details = function(){
	$('.project').mouseenter(function(){
		$(this).children('a').children('.details').stop();
		$(this).children('a').children('.details').children('.title').stop();
		$(this).children('a').children('.details').children('.p').stop();
		$(this).children('a').children('.details').children('.tags').stop();
		$(this).children('a').children('.details').children('hr').stop();
		$(this).children('a').children('.details').children('.view-options').stop();

		$(this).children('a').children('.details').animate({
			height: 'show'
		}, t);

		$(this).children('a').children('.details').children('.title').animate({
			width: '100%'
		}, t);

		$(this).children('a').children('.details').children('.p').animate({
			right: '0%'
		}, t);
		$(this).children('a').children('.details').children('.tags').animate({
			left: '0%'
		}, t);
		$(this).children('a').children('.details').children('hr').animate({
			width: "80%"
		}, t*1.25);

		$(this).children('a').children('.details').children('.view-options').animate({
			bottom: '0px'
		}, t);
	});
}

var hide_details = function(){

	$('.project').mouseleave(function(){
		$(this).children('a').children('.details').stop();
		$(this).children('a').children('.details').children('.title').stop();
		$(this).children('a').children('.details').children('.p').stop();
		$(this).children('a').children('.details').children('.tags').stop();
		$(this).children('a').children('.details').children('hr').stop();
		$(this).children('a').children('.details').children('.view-options').stop();
		$(this).children('a').children('.details').animate({
			height: 'hide'
		}, t);
		$(this).children('a').children('.details').children('.title').animate({
			width: '300%'
		}, t);
		$(this).children('a').children('.details').children('.p').animate({
			right: '100%'
		}, t);
		$(this).children('a').children('.details').children('.tags').animate({
			left: '100%'
		}, t);		
		$(this).children('a').children('.details').children('hr').animate({
			width: "0%"
		}, t/2);
		$(this).children('a').children('.details').children('.view-options').animate({
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
var loaded = false;
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
    if (!loaded) {
      $('body').css('background-image', 'url("img/background.jpeg")');
      $('body').css('background-size', '100% 300%');
      loaded = true
    }
	} else {
		remove_classes();
		$('body').css("background-position","0 0vh");
		$('nav').css("display", "none");	
		$('.back-to-top').css("display", "none");	
	}
};
