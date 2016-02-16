var t = 1000;

$(document).ready(function(){

	$(window).resize(function(){
		if($(document).width() <= 480){
			location.reload();
		} else {
			show_details();
			hide_details();

		}
	});

	//nav toggle
	$('.fa-bars').click(function(){
		$('.nav').toggle();
	});

	display_projects('#display_projects');
	display_experience('#display_experience');
	display_awards('#display_awards');
	display_skills('#display_skills');
	display_contact('#display_contact');
	
	$(window).scroll(function(){
		section_handler();
	});

	projects_handler();
	skills_handler();
	header_handler();

});