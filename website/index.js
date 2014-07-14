function onSubmit(){

    if (document.getElementById('Emailid').value=="" 
                 || document.getElementById('Emailid').value==undefined || document.getElementById('Password').value=="" 
                 || document.getElementById('Password').value==undefined )
                {
                    alert ("Please fill the feilds");
                    return false;
                }
                else  
                    {   
                    alert('Submitted');  
                    return true;  
                    }

}
function checkform(){
    if(document.getElementById("un").value == 'jayem30' && document.getElementById("pw").value == 'jayem' ){
        alert("Login Successful");
        setTimeout(function() {window.location = "http://www.google.com/" });
    }else{
        alert("Access denied. Valid username and password is required.");
    }
}
