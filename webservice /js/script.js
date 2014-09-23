$(document).ready(function() {
    
  $('.table tbody').on("click", "td", function() {
    $('.table tr').removeClass('activeRow');
    $(this).parent().addClass('activeRow');
  });

  $('.table tbody tr:first-child').addClass('activeRow');


  //select box
  function loadDropdown(endContainer) {
    var data;
    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'http://10.1.4.159/NCGA-main/table/select.json',
      data: data,
      success: function(data) {
        $.each(data.select, function(index, elm) {
          $(endContainer+" select").append("<option>"+elm.id+"</option>");
        });
        customSelectPlugin(endContainer+" select");
      }
    });
  }

  loadDropdown('.user_selectbox');
  loadDropdown('.roleuser_selectbox');
  loadDropdown('.managuser_selectbox');
  loadDropdown('.term_select');
  loadDropdown('.association_select');

});





//campaign_code datatable 
 var usertableDetails = [];
 var userdataValue;
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=advancedsearch&pak=omemberid|~ofirstname|John~olastname|Smith~obusinessname|~oaddress|~ocity|~ostate|~opostalcode|~ophone|~oemailaddress|~oassociation|13~cyc|false',
    data: userdataValue,
    success: function(userdataValue) {
      $.each(userdataValue.aaData, function(i, f) {
            var tblRow = "<tr>" + "<td>" + f.AssociationCode + "</td>" + "<td>" + f.PostalCode + "</td>" + "<td>" + f.City + "</td>" + "<td>" +  f.State + "</td>" + 
                "<td>" +  f.PostalCode + "<td>" + f.Plus4 + "</td>" + "<td>" + f.Email + "</td>" + "<td>" + f.Email + "</td>" + "<td>" +  f.Email + "</td>" + 
                "<td>" +  f.Email + "</tr>";
            $("#campaign_table > tbody").append(tblRow);
          });
          usertableDetails = userdataValue;
        },
    complete: function(userdataValue) {
      // $('#campaign_table tbody tr:first-child').addClass('activeRow');
      initializeDatatables('campaign_table');
    }
  });

function initializeDatatables(tableName) {
  $('#'+tableName).dataTable({
    "scrollX": true,
    "ScrollY": "262px",
    "scrollCollapse": true,
    "pagingType" : "full_numbers",
    "bPaginate": true,
    "iDisplayLength": 8,
    "oLanguage": {
        "oPaginate": {
           "sNext": '<span> </span>',
           "sLast": '<span> </span>',
           "sFirst": '<span> </span>',
           "sPrevious": '<span> </span>'
        }                            
      }
  });
}

// select box
function customSelectPlugin(selectElm) {
    var $this = $(selectElm),
        numberOfOptions = $this.children('option').length;

    $this.addClass('s-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="styledSelect"></div>');

    var $styledSelect = $this.next('div.styledSelect');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
        e.stopPropagation();

        if($(this).hasClass("active")) {
          $(this).removeClass('active').next('ul.options').hide();
        } else {
          $('div.styledSelect.active').removeClass('active').next('ul.options').hide();
          $(this).addClass('active').next('ul.options').show();
        }
    });
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        /* alert($this.val()); Uncomment this for demonstration! */
    });
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

}