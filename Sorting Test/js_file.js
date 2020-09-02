
 $(document).ready(function() {
  //Set id to 1
  var id = $('#UserID');
  id.val("1");

  //Increment by 1 to the id
  function generateID(){
    var str = id.val();
    var int = parseInt(str);
    var idVal =  (int + 1);
    id.val(idVal.toString());
  }
  //When button clicked
  $('button').on('click', function(){
    //create a new object
    var obj = new Object();
    //retrieve from input and pass to object
    obj.id = $('#UserID').val();
    obj.name = $('#UserName').val();
    obj.occupation = $("#UserOccupation").val();

    if(obj.name.length == 0){  // validation, if empty cannot input
        return false;
    }
    else if(obj.occupation.length == 0){
        return false;
    }


    //add row to the table.
    var addrow = "<tr><td class='col-id'>" + obj.id + "</td><td class='col-name'>" + obj.name + "</td><td class='col-occupation'>"+ obj.occupation +"</td></tr>";
    $("table tbody").append(addrow);
    //Add 1 to id field
   generateID();
  });
  
  function sortByNumber(rows, selector, ascending) { //sorting for ID
    rows.sort(function(a, b) {
      var numberA = parseInt($(selector, a).text(), 10);
      var numberB = parseInt($(selector, b).text(), 10);
      if (ascending)
        return numberA - numberB;
      else
        return numberB - numberA;
    });
    
    return rows;
  }
  
  function sortByText(rows, selector, ascending) { // sorting for both username and occupation
    rows.sort(function(a, b) {
      var textA = $(selector, a).text();
      var textB = $(selector, b).text();
      if (ascending)
        return textA.localeCompare(textB);
      else
        return textB.localeCompare(textA);
    });
    
    return rows;
  }

  function sortAllBy(field) {
    var rows = $('table tbody tr').toArray(); //uses switch for dropdown box. if ID, sortbynumber. If username or occupation, sortbytext
    
    switch (field) {
      case 'ID':
        rows = sortByNumber(rows, 'td.col-id', true);
        break;
      case 'Name':
        rows = sortByText(rows, 'td.col-name', true);
        break;
      case 'Occupation':
        rows = sortByText(rows, 'td.col-occupation', true);
        break;
      default:
        console.error('Undefined sort field ' + field);
        break;
    }
    
    for (var i = 0; i < rows.length; i++) {
      $('table tbody').append(rows[i]);
    }
  }
  
  $('select').on('change', function() {
    sortAllBy(this.value);
  });
});
