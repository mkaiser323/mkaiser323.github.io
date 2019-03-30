var bg = {
	"header":"img/header.jpg",
	"projects":"img/projects.jpg",
	"awards":'img/awards.jpg'
};

var contact = [
	{
		"icon":"fa fa-github-square",
		"link":"github.com/mkaiser323"
	},{
		"icon":"fa fa-linkedin-square",
		"link":"linkedin.com/in/mkaiser323"
	},{
		"icon":"fa fa-envelope",
		"link":"mahedi.kaiser@gmail.com",
		"mailto": true
	}
];

var skills = [
	{
		"section":"Web Development",
		"skills":[
			{
				"skill":"ReactJS",
				"stars":4
			},
      {
				"skill":"AngularJS",
				"stars":4
			},
      {
				"skill":"JQuery",
				"stars":5
			},
			{
				"skill":"HTML",
				"stars":5
			},
      {
				"skill":"CSS",
				"stars":5
			},
      {
				"skill":"SASS",
				"stars":5
			},
      {
				"skill":"JavaScript",
				"stars":4
			},
      {
				"skill":"Bootstrap",
				"stars":5
			},
      {
				"skill":"WordPress",
				"stars":4
			},
      {
				"skill":"Weblogic",
				"stars":3
			},
      {
				"skill":"Webpack",
				"stars":3
			}
		]
	},{
		"section":"Programming Languages",
		"skills":[
			{
				"skill":"Java",
				"stars":5
			},{
				"skill":"Python",
				"stars":5
			},{
				"skill":"PHP",
				"stars":3
			},{
				"skill":"MySQL",
				"stars":5
			}
		]
	},{
		"section":"Tools",
		"skills":[
			{
				"skill":"Eclipse Enterprise Edition",
				"stars":5
			},{
				"skill":"Git",
				"stars":5
			},{
				"skill":"TortoiseSVN",
				"stars":5
			},{
				"skill":"Postman",
				"stars":5
			},{
				"skill":"MySQL Workbench",
				"stars":3
			},{
				"skill":"Android Studios",
				"stars":3
			}
		]
	},
  {
    "section": "Other",
    "skills": [
      {
        "skill": "SQLAlchemy",
        "stars": 5
      },
      {
        "skill": "Springboot",
        "stars": 5
      },
      {
        "skill": "JUnit",
        "stars": 5
      },
      {
        "skill": "Cucumber",
        "stars": 4
      },
      {
        "skill": "Elasticsearch",
        "stars": 5
      }
    ]
  }
];

var awards = [
	{
		"award":"2nd place Winnner, Google & ThoughtWorks Hackathon",
		"place":"Boston, MA",
		"date":"March 2016"
	},{
		"award":"1st place Winnner, IBM & Facebook Hackathon",
		"place":"CUNY - Lehman College",
		"date":"October 2015"
	},{
		"award":"1st place Winnner, TrainCube Web Development Competition",
		"place":"CUNY - Lehman College",
		"date":"July 2015"
	},{
		"award":"3rd place Winnner, LSAMP & Goldman Sachs hackathon",
		"place":"CUNY - City College",
		"date":"May 2015"
	},{
		"award":"Dean's List",
		"place":"CUNY - Lehman College",
		"date":"Fall 2014 <br> to <br> Spring 2015"
	},{
		"award":"Herbert H. Lehman Leadership Certificate",
		"place":"CUNY - Lehman College",
		"date":"November 2014"
	},{
		"award":"Loyola Scholarship",
		"place":"Fordham University",
		"date":"Fall 2009 <br>to<br> Fall 2011"
	},{
		"award":"President's Education Award",
		"place":"Al-Madinah High School",
		"date":"May 2009"
	}
];

var experience = [
  {
    "position": "Software Engineer",
    "date": "September 2018 - March 2019",
    "place": "Bombfell (Startup)",
    "details": "Worked closely with CTO, product manager, and 4 person dev team to perform all software development for the company. Worked with stakeholders to automate and optimize business processes. Performed all roles in development and took ownership of several projects.",
    "sectioned": true,
    "sections":[
      {
       "title":"Payment System Rewrite",
       "date":"(September - March 2019)",
       "bullet_points":[
        {"bullet":"Saved the company an average of 10% per refund transaction by fixing bug in refund process"},
        {"bullet":"Refactored payment system for improved code modularity and maintainability"},
        {"bullet":"Implemented test framework for payment system for improved reliability"},
       ]
      },
      {
       "title":"Pagespeed Optimization",
       "date":"February 2019 - March 2019",
       "bullet_points":[
        {"bullet":"Improved load time and search ranking by increasing Google Pagespeed score by 70 points (out of 100)"},
        {"bullet":"Optimized webpack bundling using commons chunks and compression plugins"},
        {"bullet":"Reorganized page structure and lazy-loaded below-the-fold contents using AJAX and JQuery events"}
       ]
      },
      {
       "title":"Bombfell Shop Launch",
       "date":"September 2018 - December 2018",
       "bullet_points":[
        {"bullet":"Coordinated with Product Manager, Stylists, and 4 other developers to launch ecommerce shop in 2 months"},
        {"bullet":"Wrote python code to search, sort, and cache shop items based on various filters and user preferences"},
        {"bullet":"Developed multiple React components for shop pages"}
       ]
      },
      {
       "title":"Security &amp; Authentication",
       "date":"December 2018 - February 2019",
       "bullet_points":[
        {"bullet":"Implemented Multi-factor Authentication for internal accounts using totp authentication"},
        {"bullet":"Made accounts more brute-force resistant by implementing bcrypt password hashing"}
       ]
      },
      {
       "title":"Custom Reporting Calendar",
       "date":"February 2019 - March 2019",
       "bullet_points":[
        {"bullet":"Improved business utility of reports by implementing custom reporting calendar API"},
        {"bullet":"Designed and developed custom calendar API using python and SQLAlchemy based on Nation Retail Federation calendar and internally defined reporting periods"}
       ]
      },
    ]
  },
	{
		"position":"Software Engineer",
		"date":"June 2016 - September 2018",
		"place":"General Motors",
		"details":"Wrote software for test automation team. Received Operational Excellence Award for creating Data Setup & Diagnostics Tool.",
    "sectioned":true,
    "sections": [
        {
        "title":"Salesforce Rewrite Project",
        "date": "January 2018 - April 2018",
        "bullet_points": [
          {"bullet":"Rewrote Salesforce APIs as in-house Springboot microservices to extend availability of services globally"},
          {"bullet":"Collaborated with a team of 15 developers and architects to make microservices work together seamlessly"},
          {"bullet":"Wrote comprehensive unit tests, component tests, andintegration tests to ensure code reliability and maintainability"}
        ]
      },
      {
        "title":"Data Setup & Diagnostics Tool",
        "date":"February 2017 - September 2018",
        "bullet_points":[
        {"bullet":"Cut defect resolution and data setup times by 30% by eliminating bottlenecks in the process"},
        {"bullet":"Collaborated with a single teammate to design, develop & deploy the tool in under 6 months"},
        {"bullet":"Used AJAX and self-written AngularJS plugins to provide fast, smooth, and intuitive user experience"},
        {"bullet":"Handled all DevOps related tasks including deploying application to WebLogic, implementing single sign on, setting up Elasticsearch pipeline, and writing cron jobs to manage memory and monitor system health"}
        ]
      },
      {
        "title":"Test Automation",
        "date": "Jube 2016 - September 2018",
        "bullet_points":[
          {"bullet":"Responsible for creating automated tests for new Salesforce REST APIs using JUnit & Jenkins"},
          {"bullet":"Improved readability and business utility of unit test results by migrating to Cucumber"},
          {"bullet":"Minimized build failures by collaborating with multiple teams to resolve defects"}
        ]
      }
    ],
		"loc":"Detroit, MI",
		"link":""
	},{
		"position":"Web Developer",
		"date":"March 2016 - June 2016",
		"place":"LSAMP",
		"details":"In charge of designing, developing, testing and deploying various componenets of the projectSTEM platform using PHP, JavaScript, HTML, CSS and WordPress.",
		"bullet_points":[
		 {"bullet":"Migrated the platform to WordPress for faster loading"}],
		"loc":"Manhattan, NY",
		"link":"http://projectstem.net"
	},{
		"position":"Web Developer",
		"date":"December 2015 - June 2016",
		"place":"Climate Change Impact Studies",
		"details":"Designed, developed and deployed a WordPress web site for a newly established environmental organization. This included:",
		"bullet_points":[
			{"bullet":"Designed and developed a homepage primarily composed of a Google Maps plugin and a sidebar"},
			{"bullet":"Customized the plugin to serve the specific needs of the client"},
			{"bullet":"Made the site responsive across all screen sizes"},

		],
		"loc":"Bronx, NY",
		"link":"http://climate-change-impact-studies.org"
	},{
		"position":"Web Developer",
		"date":"October 2015 - December 2015",
		"place":"Electifi",
		"details":"Created the landing page for a startup",
		"bullet_points":[],
		"loc":"Bronx, NY",
		"link":"http://electifi.com"
	},{
		"position":"Mathematics Researcher & Programmer",
		"date":"October 2015 - January 2016",
		"place":"CUNY - Research Foundation",
		"details":"I worked on open problems in CAT(0) space with direct application to mapping optimal evolutionary history in phylogenetic trees",
		"bullet_points":[
			{"bullet":"Worked in groups to come up with algorithms to compute shortest paths in CAT(0) space"},
			{"bullet":"Wrote python code to implement proposed solutions"}
		],
		"loc":"Bronx, NY",
		"link":""
	},{
		"position":"Academic Excellence Chair",
		"date":"January 2016 - June 2016",
		"place":"National Society of Black Engineers",
		"details":"I organize workshops and study groups revolving around computer science classes being offered by Lehman as well as interview preparation for students that are applying for internships and jobs",
		"bullet_points":[],
		"loc":"Bronx, NY",
		"link":""
	},{
		"position":"Founding Officer & VP of Social Media",
		"date":"September 2014 - May 2015",
		"place":"National Society of Collegiate Scholars",
		"details":"I helped two of my friends establish the Lehman College chapter of the NSCS. My responsibilities included:",
		"bullet_points":[
			{"bullet":"Maintaining detailed records of club activity to aid in publicity, recruitment and officer transitions"},
			{"bullet":"Increasing the club's online visibility by promoting and marketing events on Social Media"}
		],
		"loc":"Bronx, NY",
		"link":""
	},{
		"position":"Computer Lab Assistant",
		"date":"January 2011 - May 2012",
		"place":"Fordham University",
		"details":"I worked directly under the computer lab coordinator, who was in charge of all of the computer labs on campus. On some days, I worked the front desk and helped students and teachers with the computer lab services. On other days, I worked on various errands and projects for my supervisor, which included the following:",
		"bullet_points":[
			{"bullet":"I regularly removed outdated software and installed new software in all computers in the four computer labs under my supervision"},
			{"bullet":"During the summer, I successfully disassembled 120 old computers and assembled and configured new replacements in time for the Spring semester deadline"}
		],
		"loc":"Bronx, NY",
		"link":""
	}
];

var projects = [
	{
		"header":"Front End Web Developer",
		"details":"Software Development class project in which I worked with 2 other teammates on a project where we implemented design principles learned in class",
		"taglist": [
			{"tag":"Agile&nbsp;Development"},
			{"tag":"JavaScript"},
			{"tag":"JQuery"}
		],
		"bg_img":"img/gallery.png",
		"finished_product":"http://mkaiser323.github.io/Gallery",
		"github":"https://github.com/mkaiser323/Gallery",
		"page":"Gallery.html",
		"summary":{
			"title":"Art Gallery",
			"section":[
				{
					"header":"Project Overview",
					"p":[
						{"text":"Art Gallery helps artists display digital art and sell it for a profit. It was a group project for my Software Engineering class in which we implemented principles learned in class. Our professor acted as our client and gave us two months to complete minimal requirements, which included writing documentation as well as implementing a few of the proposed features."},
						{"text":""}
					]
				},{
					"header":"My Contributions",
					"p":[
						{"text":"As the front end developer of the team, I designed the user interface. I implemented a JavaScript search function to send an AJAX request to the database, pull relevant data, and dynamically display create HTML objects and display them on the screen."},
						{"text":"I also helped with documentation and back end."}
					]
				},{
					"header":"Skills Learned",
					"p":[
						{"text":"This was my first time working with back end. I learned how to set up a local server, write basic PHP and mySQL, and make the front end interact with the back end."},
						{"text":""}
					]
				}
			]
		}
	},{
		"header":"Front End Web Developer",
		"details":"Won first place, competing in a team of 3 to develop a brand-new mobile-friendly web site for a local business in under a week.",
		"taglist": [
			{"tag":"HTML5"},
			{"tag":"CSS3"},
			{"tag":"JavaScript"},
			{"tag":"JQuery"},
			{"tag":"Bootstrap"}
		],
		"bg_img":"img/albatax.png",
		"finished_product":"http://www.albatax.com",
		"github":"https://github.com/mkaiser323/AlbaTax",
		"page":"AlbaTax.html",
		"summary":{
			"title":"AlbaTax.com",
			"section":[
				{
					"header":"Project Overview",
					"p":[
						{"text":"AlbaTax.com was created at a web development competition, where we competed in teams of 3 to create a web site for a local business in under 5 days. To give us more time to focus on the more difficult features, we chose to start from a template rather than code from scratch."},
						{"text":""}
					]
				},{
					"header":"My Contributions",
					"p":[
						{"text":"I was designated as the lead front end developer. I worked on the navigation bar, the carousel at the top of the page, the contact form, the footer, and made the page responsive. In order to accomodate the client's many spanish-speaking users, I also used a Google Plugin to translate the entire page to spanish."},
						{"text":""}
					]
				},{
					"header":"Skills Learned",
					"p":[
						{"text":"The endless hours I spent reading and working with the code in the template taught me a lot about what can be done with css, JavaScript, media queries, good coding practices. Using a pre-made template thus proved to be a lerning experience rather than a crutch."},
						{"text":"This was also my first time using an API."}
					]
				}
			]
		}
	},
	{
		"header":"Front End Web Developer",
		"details":"At a 12 hour hackathon, I learned Meteor.js and used it to create a demo web app that alerts users of nearby volunteer opportunities. Our demo won third place.",
		"taglist": [
			{"tag":"HTML5"},
			{"tag":"CSS3"},
			{"tag":"JavaScript"},
			{"tag":"Meteor.js"}
		],
		"bg_img":"img/godu.png",
		"finished_product":"http://godu.meteor.com",
		"github":"https://github.com/mkaiser323/GoDu",
		"page":"GoDu.html",
		"summary":{
			"title":"GoDu",
			"section":[
				{
					"header":"Project Overview",
					"p":[
						{"text":"GoDu is an app designed to use geolocation to alert users of nearby volunteer opportunities at the push of a big green button. Its name is a call to action ('Go Do') and its simple user interface is meant to encourage users to use their free time to become more active in community service."},
						{"text":""}
					]
				},{
					"header":"My Contributions",
					"p":[
						{"text":"I was the lead developer for this project. In under 12 hours, I learned Meteor.js and wrote all of the code for the app except for the placeholder JSON data."},
						{"text":""}
					]
				},{
					"header":"Skills Learned",
					"p":[
						{"text":"I learned the basics of the Meteor.js. I also learned that learning a new skill at a hackathon is usually not worth it, especially considering that I could have easily written the same program using raw HTML, CSS and JavaScript."},
						{"text":""}
					]
				}
			]
		}
	},
	{
		"header":"Java Game Developer",
		"details":"Independently developed a video game to give children a fun way to learn their multipication, consisting of over 1,600 lines of code",
		"taglist": [
			{"tag":"Java"},
			{"tag":"Eclipse"}
		],
		"bg_img":"img/blocks.png",
		"finished_product":"http://bit.do/multiplication_blocks",
		"github":"https://github.com/mkaiser323/Blocks",
		"page":"Blocks.html",
		"summary":{
			"title":"Multiplication Blocks",
			"section":[
				{
					"header":"Project Overview",
					"p":[
						{"text":"Multiplication Blocks is meant to give children a fun way to learn their multiplication. It is an extension of my Asteroids project, which I had done for my Intro to Java class. I replaced the asteroids with blocks with numbers on them. The multiplication problem shows up in the background and you have to shoot the block with the correct answer. The game also stores the questions that you got wrong in a queue and brings those questions back every time the queue is filled."},
						{"text":""}
					]
				},{
					"header":"Skills Learned",
					"p":[
						{"text":"As a relatively inexperienced programmer at the time, the countless hours that I spent on it made me very comfortable with the Java programming language as well as general algorithm design. I also learned to make my program organized and efficient, as I was working with over 1,600 lines of code."},
						{"text":""}
					]
				}
			]
		}
	},
	{
		"header":"Java Game Developer",
		"details":"Used starter code to write a fully functional Asteroids video game for the final project of my introductory Java class",
		"taglist": [
			{"tag":"Java"},
			{"tag":"Eclipse"}
		],
		"bg_img":"img/asteroids.png",
		"finished_product":"http://bit.do/Asteroids",
		"github":"https://github.com/mkaiser323/Asteroids",
		"page":"Asteroids.html",
		"summary":{
			"title":"Asteroids",
			"section":[
				{
					"header":"Project Overview",
					"p":[
						{"text":"This the final project for our introductory Java class. We were asked to make our own versions of the classic Asteroids Game. The minimmum requirements for the project were to draw a shapes on the screen to represent the asteroids and the ship, to move the ship in response to user input, and to shoot. I went far beyond these requirements and made a fully functional game."},
						{"text":"My Asteroids game tracks score and ship damage, and stores high scores in an external text file, sorted from highest to lowest. It also has a welcome screen, separate screens to the high score, tutorial, and main menu options."}
					]
				},{
					"header":"Skills Learned",
					"p":[
						{"text":"Java was my first programming language and creating Asteroids helped me solidify my understanding of vital Object Oriented Programming principles such as Inheritance, Data Structures, File I/O, and Algorithms."},
						{"text":""}
					]
				}
			]
		}
	}
];
