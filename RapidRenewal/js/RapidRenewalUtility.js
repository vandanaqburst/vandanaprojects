$(document).ready(function(){
  var global_associationid = ' '
   global_associationid = getCookie("AssociationID");
     $.ajax({
                type: 'GET',
                dataType: 'json',
                async: false,
                url : 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=getcurrentbatch&pak=@AssociationID|'+global_associationid,
                success :function(data){
                   var outputoption="<option>"
                   for (var i in data.aaData) {
                    outputoption+= '<option>'+data.aaData[i].Code+ '-' +data.aaData[i].Description +'</option>';
                   }
                   outputoption+="</option>";
                   $('#batch-selection').html(outputoption)
                }
              });
    var r =localStorage.getItem('value');
    if (r!=''){
      $('#member-id').val(r);
    }

    setTimeout(function(){
      if($('#member-id').val() != ''){
         $('.search').trigger('click');
         
         }
    });

    $(".disabled-select").prop('disabled', 'disabled');
    var memberId = '';
    var associationId = '';
    var objjj = '';
    var url = "";
    $('.search').on('click', function() {
         memberId = $('#member-id').val();
         if( memberId==''){
             $(".error").css("display","block");
             return false;
         }
         else{
             $.ajax({
                type: 'GET',
                dataType: 'json',
                async: false,
                url : 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=multiplerenewal&pak=@Criteria|'+memberId,
                success :function(data){
                localStorage.setItem('value', document.getElementById("member-id").value)
                        var output="<div class=>";
                        for (var i in data.aaData) {
                            var exp_date ='';
                            if(data.aaData[i].ExpireDate!=null){
                                 exp_date = data.aaData[i].ExpireDate;
                                 exp_date = exp_date.split('T')[0];
                             }
                              
                
                              var newIdval = localStorage.getItem('recruiterid_selected')
                              var newMemebrval = data.aaData[i].MemberID;
                              var recruterVal = '';
                              if(newIdval == 'recruiter-'+newMemebrval) {
                                var recruitersearch = window.location.search;  
                                recruitersearch = recruitersearch.replace("?","");
                                recruterVal = recruitersearch;
                              }
                                
                              associationId =  data.aaData[i].AssociationID ;
                              if(global_associationid != 13 || ( global_associationid == 13 && associationId == 13)){
                              output+= "<div class='search-set'>"
                              output+= "<span class='bgPrimary id-info'>"+data.aaData[i].MemberID+"</span>";
                              output+= "<span class='display-name'>"+data.aaData[i].Display+"</span>";
                              output+= "<p id='expiry-label'>Expire Date:<span>"+exp_date+"</span></p>"
                              output+= "<p id='status-label'>Status:<span></span></p>"
                                 output+= "<p id='dues-label'>Dues: $<span class='dues-text' id="+data.aaData[i].MemberID+"></span></p>"
                              output+= "<label id='terms-text'>Terms:</label>"
                               output+="<select id='selected-registry'  class='selected-registry-"+associationId+" selects'></select>"
                                 if(global_associationid == 13){
                                     output+="<select id='selected-method' class='disabled-select'><option value=''>State</option> <option value='CYC'>CYC</option><option value='Online'>Online</option> <option value='State'>State</option></select>"
                                      $(".disabled-select").prop('disabled', 'disabled');
                                 }
                               else {
                                   output+="<select id='selected-method'><option value=''>National</option> <option value='CYC'>CYC</option><option value='Online'>Online</option> <option value='State'>State</option></select>"
                               }
                              output+="<div class='recruiter-filed'><label id='recruter-text'>RecruiterID:</label><input type='text' class='recruiter-id'id='recruiter-"+data.aaData[i].MemberID+"' name='' value="+recruterVal+"><a id='tag-"+associationId+"'>Search</a></div>"    
                                 output+="</div>";
                              $(".error").css("display","none");
                              if(global_associationid == 13) {
                                   $(".disabled-select").prop('disabled', 'disabled');
                              }
                           }
                           else{
                            $(".error").css("display","block");
                           }
                            $.ajax({
                                type: 'GET',
                                dataType: 'json',
                                beforeSend: function( xhr ) {
                              var assId = associationId;
                            },
                            url : 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=getmemberduesconsolidated&pak=@AssociationID|'+ associationId+'~@GrowerView|0',
                            success :function(data){
                              var url = this.url
                              url = url.split('|')[1];
                              url = url.split('~@')[0];
                              output=''
                               for(var j in data.aaData){
                                   output+= '<option>'+data.aaData[j].MemberCodeDesc+'</option>';
                               }
                               
                               $('.selected-registry-'+url).html(output)
                               $( "select#selected-registry option:selected" ).each(function() {
                                   var selected_option= ($( this ).text());
                                   selected_option = selected_option.split('$')[1];
                                   console.log(selected_option);
                                   $(this).parent().prev().prev().find('span').html(selected_option);
                                   //$('this).prev().prev().find('span'').html(selected_option);
                           
                                })
                          
                                 $( '.recruiter-filed' ).on( 'click', 'a', function () { 
                                   var tag_id = $(this).attr("id");
                                   tag_id = tag_id.split('-')[1];
                                   var rec_id = $(this).prev().attr("id");
                                   localStorage.setItem("recruiterid_selected",rec_id);
                                      location.href = "recruitersearch.html?"+tag_id;
                                      
                                  });
                                 $('.selects').change(function() {
                                  var option = $(this).find('option:selected').val();
                                  option= option.split('$')[1];
                                  $(this).prev().prev().find('span').html(option);
                                             
                                });

                            }
                          })
           
                         }
                          output+="</div>";
                          document.getElementById("member-details").innerHTML=output;
                          $( ".search-set:even" ).css( "background-color", "#c7c7c7" );
                          $(".renewing-text").css("visibility","visible")
                          $(".renewing-text span").html(++i)
                          $(".disabled-select").prop('disabled', 'disabled');
                },
             
             })
           

        }
 

    })

    $(".cancel").click(function(){
          $("#member-id").val('');
          $("#member-details").html('');
          $(".error").css("display","none");
    })
    $(".renew").click(function(){
         var dues_stored =[];
        location.href = "renewalconfirmation.html?"+memberId;
        jsonObj = [];
             $('.dues-text').each(function() {
                 var r = $(this).html();
                 var t = $(this).attr("id");           
                item = {}
                item ["r"] = r;
                item ["t"] = t;
                jsonObj.push(item);
             });
        localStorage.setItem('testvalue', JSON.stringify(jsonObj))
        var test2 = localStorage.getItem("testvalue");
        //test = JSON.parse(test2);
        var objjj = JSON.parse(localStorage.getItem("testvalue"));
        for (var k=0; k< objjj.length; k++) {
               console.log(objjj[k].r)
               $('#'+objjj[k].t).html(objjj[k].r)
        }
    });

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
    	 $.ajax({
    			type: 'GET',
    			dataType: 'json',
    			url : 'https://gims.ncga.com/WebServices/API/AssociationAPI.aspx?auth=testing&act=advancedsearch&pak=omemberid|~ofirstname|'+search_firstname+'~olastname|'+search_lastname+'~obusinessname|~oaddress|~ocity|~ostate|~opostalcode|~ophone|~oemailaddress|~oassociation|'+assid_passed+'~cyc|false',
    			success :function(data){
    				console.log(data)
    				var tablecontent= "";
        			for (var i in data.aaData) {
        					tablecontent+=  "<tr>" + "<td>" +'select'+"<td>" + data.aaData[i].AssociationCode  + "</td>" + "<td class=''>" + data.aaData[i].FirstName  + "</td>" + "<td>" +  data.aaData[i].LastName + "</td>" + "<td>" +  data.aaData[i].Business + "</td>" + "<td>" + data.aaData[i].Address1  + "</td>" + "<td>" + data.aaData[i].City  + "</td>" +
                            "</td>" +"<td>" + data.aaData[i].State  + "</td>"+"<td>" + data.aaData[i].PostalCode  + "</td>" + "</tr>"
                    }
        			console.log(tablecontent)
        			document.getElementById("contact-table").innerHTML=tablecontent;
                }
        })
    });
    $( ".selected-batch" ).change(function() {
      $('.confirm').css("visibility",'visible');
    });
    $('.confirm').click(function(){
      $(this).hide();
    })
})