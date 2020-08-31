function registrationform() {
    console.log("click");
    var mail = document.getElementById("mail").value;
    var psw  = document.getElementById("pswrd").value;
    buttonOK = "true";

    if(mail == "") { 
      alert("please enter your email id.");
      buttonOK = "false";
    }
    
    else if(mail.indexOf('@') == -1) { 
      alert("please include an '@' in the email address.");
      buttonOK = "false";
    }
    else if((mail.charAt(mail.length-4)!='.') && (mail.charAt(mail.length-3)!='.')) {
      alert("Invalid email. Please verify your email address.");
      buttonOK = "false";
    }
    
    if(psw="") {
        alert("please enter your password.");
      buttonOK = "false";
    }

    
  if (buttonOK == "false") {
      return false;
    } 
  
 

    alert(".  Your email is "+mail+".  Your password is "+psw+".   Thank You.")
  }