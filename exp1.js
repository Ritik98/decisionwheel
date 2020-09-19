myobj =
{
  "problem": " this is the answer ",

  "choicearray": [],

  "choices":
  {

  },
  "moreinfo": "",

  "whocanhelp": [],

  "Decision": "this is the decision taken by user",

  "assessdecisison": " for decision assesment"
}

var questions = [" 1. What is Problem ?",
  "2. What are the Choices ?",
  "3. what can be the Consequences?",
  "4. What are the Values ?",
  "5. How are you Feeling ?",
  "6.  Anything More you want to share ?",
  "7. Who Can Help ?",
  "8. what is your Decision ?",
  "9. Assess Decision"];

var flag = 0;

// ##########################################################################################
//--------------------------------------------------------------------------------------------
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//---------------------------------------------------------------------------------------------

function show(btn) {
  document.getElementById(btn.id).disabled = false;
  var str1 = btn.id;
  var num = parseInt(str1.charAt(1)) + 1;
  var str2 = num.toString();
  var nid = 'b'.concat(str2);
  var qno = parseInt(str1.charAt(1)) - 1;
  var question = questions[qno];
  flag = parseInt(str1.charAt(1));


  var x = document.getElementById("q").innerHTML = question;
  document.getElementById("txtarea").value = "";

  modal.style.display = "block";
  document.getElementById(nid).disabled = false;
  // document.getElementById(btn.id).disabled = true;
}

//------------------------------------------------------------------------------------------
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  answers.push("");
  modal.style.display = "none";
}

//----------------------------------------------------------------------------------------

function storingAnswers() {

  var ans = document.getElementById("txtarea").value;

  if (flag == 1) {
    myobj.problem = ans;
    modal.style.display = "none";
  }

  else if (flag == 2) {
    var choices = document.getElementsByClassName("myclassname");
    var tempchoice = [];
    console.log(choices.item);
    for (var i = 0; i < choices.length; i++) {
      tempchoice.push(choices[i].value);
    }
    myobj.choicearray = tempchoice;
    modal2.style.display = "none";

    for (var j = 1; j <= myobj.choicearray.length; j++) {

      myobj.choices[j] =
      {
        "choice": "",
        "consequences": "",
        "values": "",
        "feeling": ""
      };

    }
  }

  else if (flag == 6) {
    myobj.moreinfo = ans;
    modal.style.display = "none";
  }
  else if (flag == 7) {
    myobj.whocanhelp = ans;
    modal.style.display = "none";
  }
  else if (flag == 8) {
    myobj.Decision = ans;
    modal.style.display = "none";
  }
  else if (flag == 9) {
    myobj.assessdecisison = ans;
    modal.style.display = "none";
  }
  else {
    alert("invalid flag value")
  }
}

//----------------------------------------------------------------------------------------

// ##########################################################################################

var modal2 = document.getElementById("myModal2");

var span2 = document.getElementsByClassName("close2")[0];

choicearray = [];

function show2(btn) {
  document.getElementById(btn.id).disabled = false;
  var str1 = btn.id;
  var num = parseInt(str1.charAt(1)) + 1;
  var str2 = num.toString();
  var nid = 'b'.concat(str2);
  var qno = parseInt(str1.charAt(1)) - 1;
  var question = questions[qno];
  flag = parseInt(str1.charAt(1));


  var x = document.getElementById("q2").innerHTML = question;

  modal2.style.display = "block";
  document.getElementById(nid).disabled = false;
  // document.getElementById(btn.id).disabled = true;
}
//----------------------------------------------------------------------------------------

span2.onclick = function () {
  modal2.style.display = "none";
}

//----------------------------------------------------------------------------------------

var newinput = function () {
  var id = 1;
  var parent = document.getElementById("container-to-ad");
  // console.log(parent);
  var field = document.createElement("input")
  field.className = "myclassname"
  field.style = "display:block;"
  field.id = "input" + id;
  parent.appendChild(field);
  id += 1;
}
//----------------------------------------------------------------------------------------


var delinput = function () {
  var parent = document.getElementById("container-to-ad");
  // parent.removeChild(parent.childNodes[parent.length-1]);  
  parent.removeChild(parent.lastChild);

}

//----------------------------------------------------------------------------------------
// ##########################################################################################

var modal3 = document.getElementById("myModal3");

var span3 = document.getElementsByClassName("close3")[0];



function show3(btn) {
  document.getElementById(btn.id).disabled = false;
  var str1 = btn.id;
  var num = parseInt(str1.charAt(1)) + 1;
  var str2 = num.toString();
  var nid = 'b'.concat(str2);
  var qno = parseInt(str1.charAt(1)) - 1;
  var question = questions[qno];
  flag = parseInt(str1.charAt(1));

  var x = document.getElementById("q3").innerHTML = question;

  modal3.style.display = "block";
  document.getElementById(nid).disabled = false;
  // document.getElementById(btn.id).disabled = true;
}

//----------------------------------------------------------------------------------------

span3.onclick = function () {
  modal3.style.display = "none";
}
//----------------------------------------------------------------------------------------


var newinput1 = function () {
  var id = 11;
  var parent = document.getElementById("container-to-ad-1");
  // console.log(parent);
  var field = document.createElement("input")
  field.className = "myclassname2"
  field.style = "display:block;"
  field.id = "input" + id;
  parent.appendChild(field);
  id += 1;
}
//----------------------------------------------------------------------------------------


var delinput1 = function () {
  var parent = document.getElementById("container-to-ad-1");
  // parent.removeChild(parent.childNodes[parent.length-1]);  
  parent.removeChild(parent.lastChild);

}

//----------------------------------------------------------------------------------------


var n = 1;


var nxt = function () {
  var l = myobj.choicearray.length;

  if (n < (l)) {
    document.getElementById("s2").disabled = true;
    document.getElementById("s1").disabled = false;

    var temparray = [];
    var consarray = document.getElementsByClassName("myclassname2");
    console.log(consarray.item);
    for (var i = 0; i < consarray.length; i++) {
      temparray.push(consarray[i].value)
    }
    myobj.choices[n].consequences = temparray;
    n = n + 1
    console.log(l)
    console.log(n)
  }
  else if (n == l) {
    document.getElementById("s2").disabled = false;
    document.getElementById("s1").disabled = true;

    var temparray = [];
    var consarray = document.getElementsByClassName("myclassname2");
    console.log(consarray.item);
    for (var i = 0; i < consarray.length; i++) {
      temparray.push(consarray[i].value)
    }
    myobj.choices[n].consequences = temparray;
    n = n + 1
    console.log(l)
    console.log(n)
  }

  else if (n > l) {
    console.log(n)
    modal3.style.display = "none";
  }
}

//----------------------------------------------------------------------------------------
// ##########################################################################################


