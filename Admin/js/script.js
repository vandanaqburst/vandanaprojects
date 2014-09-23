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
      url: 'http://10.1.4.159/NCGA-main/Admin/select.json',
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

//Users datatable 
 var usertableDetails = [];
 var userdataValue;
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: 'http://10.1.4.159/NCGA-main/Admin/Tabledata.json',
    data: userdataValue,
    success: function(userdataValue) {
      $("#user_table > tbody").html('');
      $.each(userdataValue.details, function(i, f) {
            var tblRow = "<tr>" + "<td>" + f.User + "</td>" + "<td>" + f.password + "</td>" +
                "<td>" + f.First_name + "</td>" + "<td>" +  f.Last_name + "</td>" + "<td>" +  f.Edit + "</td>" +
                "<td>" +  f.td + "</td>" + "</tr>";
            $("#user_table > tbody").append(tblRow);
            $('#user_table tbody tr:first-child').addClass('activeRow');
          });
          usertableDetails = userdataValue;
        },
    complete: function(userdataValue) {
      initializeDatatables('user_table');
    }

  });

//Dues datatable 
  var usertableDetails = [];
  var userdataValue;
    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'http://10.1.4.159/NCGA-main/Admin/Tabledata.json',
      data: userdataValue,
      success: function(userdataValue) {
        $.each(userdataValue.details, function(i, f) {
              var tblRow = "<tr>" + "<td>" + f.User + "</td>" + "<td>" + f.password + "</td>" +
                  "<td>" + f.First_name + "</td>" + "<td>" +  f.Last_name + "</td>" + 
                  "<td>" +  f.td + "</td>" + "</tr>";
              $("#due_table > tbody").append(tblRow);
            });
            usertableDetails = userdataValue;
          },
      complete: function(userdataValue) {
        $('#due_table tbody tr:first-child').addClass('activeRow');
        initializeDatatables('due_table');
      }
    });


//Grower_district datatable 
 var usertableDetails = [];
 var userdataValue;
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: 'http://10.1.4.159/NCGA-main/Admin/Tabledata.json',
    data: userdataValue,
    success: function(userdataValue) {
      $.each(userdataValue.details, function(i, f) {
            var tblRow = "<tr>" + "<td>" + f.User + "</td>" + "<td>" + f.password + "</td>" +
                "<td>" + f.First_name + "</td>" + "<td>" +  f.td + "</td>" + 
                "<td>" +  f.td + "</td>" + "</tr>";
            $("#position_table > tbody").append(tblRow);
          });
          usertableDetails = userdataValue;
        },
    complete: function(userdataValue) {
      $('#position_table tbody tr:first-child').addClass('activeRow');
      initializeDatatables('position_table');
    }
  });

//campaign_code datatable 
 var usertableDetails = [];
 var userdataValue;
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: 'http://10.1.4.159/NCGA-main/Admin/Tabledata.json',
    data: userdataValue,
    success: function(userdataValue) {
      $.each(userdataValue.details, function(i, f) {
            var tblRow = "<tr>" + "<td>" + f.User + "</td>" + "<td>" + f.password + "</td>" +
                "<td>" + f.First_name + "</td>" + "<td>" +  f.td + "</td>" + 
                "<td>" +  f.td + "</td>" + "</tr>";
            $("#campaign_table > tbody").append(tblRow);
          });
          usertableDetails = userdataValue;
        },
    complete: function(userdataValue) {
      $('#campaign_table tbody tr:first-child').addClass('activeRow');
      initializeDatatables('campaign_table');
    }
  });

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