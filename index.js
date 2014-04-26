var terms;
var schools;
var subjects;
var request_term = null;
var request_subject = null;
var request_school =null;
var courses =null;

var url_head = 'http://vazzak2.ci.northwestern.edu/';
$(document).ready(function () {

	     // $(":radio").change(function(){
	     // 	var checked = $(':radio:checked')
	     // 	console.log(checked);
	     // });
	// var callbacks = $.Callbacks();
	loadData();
	// callbacks.add(select_courses);
	$('.menu').on('click',select_courses);
	
	// var i = 0;
	// for (var entry in terms.responseJSON) {
	// 	i++;
	// };
	// console.log(terms.readyState);
	// $(i).on('click',function(){
	// 	$(this).parent().

	// });


})

function choose_term(id)
{
	//alert(id);
	request_term = id;
	console.log('request_term'+request_term);
	var name = $('#' + id).text();
	$("#terms").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="terms_menu" style="overflow:scroll; height:150px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_terms(terms);
	//alert("ddd");
}

function choose_subject(id)
{
	request_subject = id;
	console.log('request_subject'+request_subject);
	//alert("here");
	//alert("id"+id);
	var name = $('#' + id).text();
	//alert(name);
	$("#subjects").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="subject_menu" style="overflow:scroll; height:300px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_subjects(subjects);
}

function choose_school(id)
{
	request_school = id;
	console.log('request_school'+request_school);
	//alert(id);
	var name = $('#' + id).text();
	//alert(name);
	$("#schools").html(name +'<i class="dropdown icon"></i>'+' <div class="menu" id="school_menu" style="overflow:scroll; height:150px"></div>');
	//document.getElementById("terms").innerHTML = id;
	//$('.ui.compact.menu').dropdown('set text', id);
	handle_reponse_schools(schools);
}


function handle_reponse_terms(response){
	terms = response;
	//alert(response.length);
	//alert(terms[0].name);
	//alert(terms[0].term_id);
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#terms_menu" ).append( $( '<div class="item"' + 'id=' + response[i].term_id + ' onclick=choose_term("'+ response[i].term_id +'")>' + response[i].name + '</div>' ) );
	}

	console.log(terms);
}
function handle_reponse_subjects(response){
	subjects = response;
	//alert(response[0].symbol);
	//alert(terms[0].term_id);
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#subject_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_subject("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	console.log(subjects);
}
function handle_reponse_schools(response){
	schools = response;
	for (var i = 0 ; i < response.length; i++)
	{
		$( "#school_menu" ).append( $( '<div class="item"' + 'id=' + response[i].symbol + ' onclick=choose_school("'+ response[i].symbol +'")>' + response[i].symbol + '</div>' ) );
	}
	console.log(schools);
}

function loadData(){
	 $.ajax({
                url: "http://vazzak2.ci.northwestern.edu/terms",
                dataType: "json",  
                // work with the response
                success: function(response ) {
             
                    handle_reponse_terms(response);
                }
            });


	$.ajax({
                url: "http://vazzak2.ci.northwestern.edu/schools",
                dataType: "json",  
                // work with the response
                success: function( response ) {
             
                    handle_reponse_schools(response);
                }
            });

	$.ajax({
                url: "http://vazzak2.ci.northwestern.edu/subjects",
                dataType: "json",  
                // work with the response
                success: function( response ) {
             
                    handle_reponse_subjects(response);
                }
            });
}

function select_courses(){
	var query_address ="http://vazzak2.ci.northwestern.edu/courses/?";
	if (request_term&&request_subject){
		query_address += ("term="+request_term+"&subject="+request_subject);

		$.ajax({
	                url: query_address,
	                dataType: "json",  
	                // work with the response
	                success: function( response ) {
	             
	                    courses=response;
	                    draw_courses();
	                }
	            });
	}
	else console.log("not selected!")
}

function draw_courses(){
	console.log("courses:");
	console.log(courses);
	// alert(courses.length);
	// alert(courses[0].title);
	$("#body").empty();
		for (var i =0;i<courses.length;i++){
			// console.log(courses[i].title);
			var to_append = '<section class ="ui segment" eroll = "false" days = '+courses[i].meeting_days +' start ='
			+courses[i].start_time+' end ='+courses[i].end_time+' id ='+courses[i].class_num+ ' catalog_num = '+courses[i].catalog_num+'>'
			+'<i class="huge expand icon" onclick = "enroll(this)" style = "float:right"></i>'+'<h3>'
			+courses[i].catalog_num+" "+courses[i].title+'<h3>'+'<p>'+"Instructor: "+courses[i].instructor.name+'</p><p>'
			+"Seats Available: "+courses[i].seats+'</p><p>'+"Room: " +courses[i].room+'</p><p>'+courses[i].start_time+' to '+courses[i].end_time+'</p></section>';
			$("#body").append(to_append);
		}

}

function enroll(x){
	var course = $(x).parent();
	var status = course.prop('enroll');
	course.prop('enroll',!status);
	if(course.prop('enroll')){
		$(x).prop('class', 'huge collapse icon');
	}
	else $(x).prop('class', 'huge expand icon');
	// var course = $('#'+$(x).parent().id);
	// console.log($(x).parent().attr('id'));
	
	console.log("x is "+x);
	
	var day = $(x).parent().attr('days');
	var starttime = $(x).parent().attr('start');
	var endtime = $(x).parent().attr('end');
	console.log(starttime);
	console.log(starttime[0]+starttime[1]);
	console.log(endtime);

	var n = day.length/2;
	console.log(day);
	var date = new Array(n);
	for(var j = 0; j < n; j++){
		switch(day[2*j+1]){
			case "o": 
				date[j] = 21;
				break;
			case "u": 
				date[j] = 22;
				break;
			case "e": 
				date[j] = 23;
				break;
			case "h": 
				date[j] = 24;
				break;
			case "i": 
				date[j] = 25;
				break;
			case "a": 
				date[j] = 26;
				break;
			default: 
				date[j] = 27;
				break;
		}		
	}
	//console.log(date);
	console.log("catalog_num :" +course.attr('catalog_num'));
	for(var j = 0; j < n; j++){
		if($(x).parent().prop('enroll')){
			NewEvent = {
	               "id":$(x).parent().prop('id')*(j+1),
	               "start": new Date(2014, 3, date[j], starttime[0]+starttime[1],starttime[3]+starttime[4]),
	               "end": new Date(2014, 3, date[j], endtime[0]+endtime[1],endtime[3]+endtime[4]),
	               "title":course.attr('catalog_num'),
	            };
	            
			$("#calendar").weekCalendar('updateEvent',  NewEvent);
	
		}
		else{
			$("#calendar").weekCalendar('removeEvent',  $(x).parent().prop('id')*(j+1));
	
		}
	}
}