 
$(document).ready(function() {
  $("#contact-search").click(function(){
      var assid_passed = window.location.search; 
      assid_passed = assid_passed.replace("?","")
      var search_memid = $("#contact_memid").val();
      var search_firstname = $("#contact_firstname").val();
      var search_lastname = $("#contact_lastname").val();
      var search_business = $("#contact_business").val();
      var search_address = $("#contact_address").val();
      var search_city = $("#contact_city").val();
      var search_pincode = $("#contact_pincode").val();
      var search_phone = $("#contact_phone").val();
      var search_email = $("#contact_email").val();
      var usertableDetails = [];
      var userdataValue;
// contact search page data table
      $.ajax({
        type: 'GET',
        dataType: "json",
        url : 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=advancedsearch&pak=omemberid|~ofirstname|'+search_firstname+'~olastname|'+search_lastname+'~obusinessname|~oaddress|~ocity|~ostate|~opostalcode|~ophone|~oemailaddress|~oassociation|'+assid_passed+'~cyc|false',
        success: function(data) {
           $.each(data.aaData, function(i, f) {
            var tblRow = "<tr>" + "<td id='select-"+data.aaData[i].MemberID+"'>" +'<span class="select-id">select</span>'+"<td>" + data.aaData[i].AssociationCode  + "</td>" + "<td class=''>" + data.aaData[i].FirstName  + "</td>" + "<td>" +  data.aaData[i].LastName + "</td>" + "<td>" +  data.aaData[i].Business + "</td>" + "<td>" + data.aaData[i].Address1  + "</td>" + "<td>" + data.aaData[i].City  + "</td>" +
                "</td>" +"<td>" + data.aaData[i].State  + "</td>"+"<td>" + data.aaData[i].PostalCode  + "</td>"
                + "</tr>";
            $("#campaign_table > tbody").append(tblRow);
             $(".found-members").css("display","block");
             $(".found-members span").html(i);
             $(".search-label").css("display","none");

          });

          usertableDetails = userdataValue;

        },
        complete: function(userdataValue) {
          // $('#campaign_table tbody tr:first-child').addClass('activeRow');
          initializeDatatables('campaign_table');
          $("#campaign_table").css("overflow-x", "visible");
          for(var i=1; i<10; i++) {
            var colWidth = $("#campaign_table td:nth-child("+i+")").width();
            $(".dataTables_scrollHeadInner th:nth-child("+i+")").css("min-width", colWidth);
          }
          $(".dataTables_scrollBody").height(467);
        }
      });
  });
});
 $( 'tbody' ).on( 'click', '.sorting_1', function () { 
 
  $(this).each(function(){
    
    var select_id = $(this).attr("id");
    select_id = select_id.split('-')[1]
     location.href = "rapidrenewal.html?"+select_id;
     
  })

 })
 
function initializeDatatables(tableName) {
  $('#'+tableName).dataTable({
    "scrollX": true,
    "ScrollY": "262px",
    "scrollCollapse": true,
    "bPaginate": false,
    "iDisplayLength": -1     
  });
}

 