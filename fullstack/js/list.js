var listItems = [];

$(document).ready(function(){

  $('#addButton').click(function(){
    addItem();
  });

  $('#listInput').keyup(function(e){
    if(e.keyCode == 13) {
      addItem();
    }
  });
});


function addItem() {

  var task = $('#listInput').val()
  var priority = $('#priority').val()

  addItemToHTML(task, priority)
  $('#listInput').val('');
  $('#priority').val(-1)
}

function addItemToHTML(task, priority) {
  var priorityClass='priority';
  switch(priority) {
    case '1':
      priorityClass='priority1';
      break;
    case '2':
      priorityClass='priority2';
      break;
    case '3':
      priorityClass='priority3';
      break;
  }

  $('#list').append("<li class="+ priorityClass +"><i class='fa fa-close'/>" + task + "</li>")
  $('.fa-close').click(function(){
    console.log($(this).parent())
    $(this).parent().remove()
  });
}


