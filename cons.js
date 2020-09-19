// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


var choices= ["c1","c2","c3" ];
var l= choices.length

// myobj= {
//   c1 : 
//   { "choice" : "choice 1",
//     "consequences": "consequences 1"
//   },  
//   c2 : 
//   { "choice" : "choice 2",
//     "consequences": "consequences 2"
//   },  
//   c3 : 
//   { "choice" : "choice 3",
//     "consequences": "consequences 3"
//   },  
// }

myobj2= {
  1 : 
  { "choice" : "choice 1",
    "consequences": "consequences 1"
  },  
  2 : 
  { "choice" : "choice 2",
    "consequences": "consequences 2"
  },  
  3 : 
  { "choice" : "choice 3",
    "consequences": "consequences 3"
  },  
}

var n=1;

function show() 
{
 
    modal.style.display = "block";

}

//------------------------------------------------------------------------------------------

var id = 1;
var newinput = function() 
{
  var parent = document.getElementById("container-to-ad");
  // console.log(parent);
  var field = document.createElement("input");
  field.className = "myclassname"
  field.style = "display:block;"
  field.id = "input" + id;
  // console.log(id);
  parent.appendChild(field);
  id=id+1;
}


var delinput = function()
{
  var parent = document.getElementById("container-to-ad");
  // parent.removeChild(parent.childNodes[parent.length-1]);  
  parent.removeChild(parent.lastChild);

}


//------------------------------------------------------------------------------------------

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  // consequences.push("");
  modal.style.display = "none";
}

//----------------------------------------------------------------------------------------

var nxt = function()
{

  if (n<(l)) 
  {
    document.getElementById("s2").disabled = true;
    document.getElementById("s1").disabled = false;

  var choicearray=[];
  var choices = document.getElementsByClassName("myclassname");
  console.log(choices.item);
  for (var i = 0; i < choices.length; i++)
  {
      choicearray.push(choices[i].value)
  }

  console.log(n);

  myobj2[n].consequences= choicearray;

  console.log(myobj2);
  n=n+1 

  }
  else if(n==l)
  {
    document.getElementById("s2").disabled = false;
    document.getElementById("s1").disabled = true;

    var choicearray=[];
    var choices = document.getElementsByClassName("myclassname");
    console.log(choices.item);
    for (var i = 0; i < choices.length; i++)
    {
        choicearray.push(choices[i].value)
    }
  
    console.log(n);
  
    myobj2[n].consequences= choicearray;
  
    console.log(myobj2);
    n=n+1
  }
  else if(n>l)
  {
    modal.style.display = "none";
  }
}


var bck = function()
{
  alert("back button pressed")
}

