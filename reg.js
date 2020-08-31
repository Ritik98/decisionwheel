
function registrationform() {
    console.log("click");
    var f = /^[A-Za-z]+$/;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var mail = document.getElementById("mail").value;
    var num  = document.getElementById("num").value;
    var pswrd  = document.getElementById("pswrd").value;
    var pswr  = document.getElementById("pswr").value;
    buttonOK = "true";

    if(fname == "" && lname == "" && mail == "" && num == "" && pswrd=="") {
        alert("Please fill the registration form.");
        buttonOK = "false";
    }

    else {
        if (fname == "" ) {
          alert("Please enter your firstname.");
          buttonOK = "false";
        }
       else if(fname.match(f)) 
       true;
       else  {
          alert("first name must contain alphabets only.");
          buttonOK = "false";
        }

    

           if (lname == "") {
              alert("Please enter your lastname.");
              buttonOK = "false";
            }
            else if(lname.match(f)) 
            true;
            else {
               alert("last name must contain alphabets only.");
               buttonOK = "false";
            }

            

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

                else {
    
                  if (num == "") {
                     alert("Please enter your phone number.");
                      buttonOK = "false";
                   }
                  else if(isNaN(num)) {
                     alert("Phone number must contain only numeric value.");
                     buttonOK = "false";
                    }
                  else if(num.length < 10) {
                     alert("Please verify your phone number. It must contain exactly 10 digits.");
                     buttonOK = "false";
                    } 

                    else {

                        if(pswrd=="") {
                          alert("Please enter password.")
                          buttonOK = "false";
                        }

                       else if(pswrd.length<5) {
                          alert("Password length must be greater than 5 characters.")
                          buttonOK = "false";
                        }

                        else if(pswrd.length>20) {
                           alert("Password length must be less than 20 characters.")
                           buttonOK = "false";
                        }

                        else if(pswr!=pswrd) {
                          alert("Invalid password.Please match your passwords.")
                          buttonOK = "false";
                        }
                    }
                }
            
       
    }                    



  if (buttonOK == "false") {
      return false;
    } 
  
 

 alert("Your name is "+fname+" "+lname+".  Your email is "+mail+".  Your phone number is "+num+". Your password is "+pswr+".   Thank You for your response.")
}
   

  




