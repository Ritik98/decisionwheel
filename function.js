var App = {
  "State": {
    "CurrentStage": 0
  },
  "UserData": [
    "",
    [],
    [],
    [],
    [],
    "",
    "",
    "",
    ""
  ],
  "edit": -1,
  EDIT_MODE: false,
  last_visible_view: "preview",
  showView(viewname) {
    viewmap = {"preview" :  "#previewviewarea" , "dataEntry" : "#userdataentrybox" };
    $(viewmap[this.last_visible_view]).hide();
    this.last_visible_view =  viewname ;
    $(viewmap[this.last_visible_view]).show();
  }
}

var TestSuite = 
{

  focusOnDecision() 
  {
    App.State.CurrentStage = 7;
    App.UserData =   [
      "focusOnDecision",
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      "gjjvhg",
      "bvjkjkbb",
      "",
      ""
    ]
  },
  focusOnProblem() 
  {
    App.State.CurrentStage = 0;
    App.UserData =   [
      "focusOnProblem",
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      ["vhjv","hvjvbjh"],
      "gjjvhg",
      "bvjkjkbb",
      "",
      ""
    ]
  },
  focusOnSubmit() 
  {
    App.State.CurrentStage = 9;
    App.UserData =   [
      "focusOnSubmit",
      ["vhjv","hvjvbjh","fjeer","ygfbchds"],
      ["vhjv","hvjvbjh","fjeer","ygfbchds"],
      ["vhjv","hvjvbjh","fjeer","ygfbchds"],
      ["vhjv","hvjvbjh","fjeer","ygfbchds"],
      "gjjvhg",
      "bvjkjkbb",
      "decision",
      "ADecision"
    ]
  }

}

var DataEntryPane = {
  "Questions": [
    "What is Problem ?",
    "What are the choices?",
    "What are the consequences ?",
    "What are the values?",
    "What are your feelings ?",
    "Anything More you want to share ?",
    "Who Can Help ?",
    "What is your Decision ?",
    "Assess Decision"
  ],
  "IsList": [false, true, false, false, false, false, false, false, false],
  "pivot": 1,
  "DependentList": [false, false, true, true, true, false, false, false, false],
  "incr": 0,

  /**
   * If this is a list type
   * and this is not a pivot
   * find out how many items should be there in the list
   *
   * when it is the last item, show submit, instead of add more
   */
  getResponse(){
    var response = $.trim($("#iResponse").val());
    return response;
    
  },

  SubmitResponse(){
    var response = this.getResponse();
      if (response == "" && App.State.CurrentStage != 7) {
        alert("Give some response");
        return;
      }
    
    // var editId = ["#e1" , "#e2" , "#e3" , "#e4" , "e5" , "e6" , "e7" , "e8" , "e9"]
    var editId = "#e" + (App.State.CurrentStage + 1);
    MainButtons.enableNextButton();
    App.showView("preview");
    if( ! this.DependentList[App.State.CurrentStage] ){
      $(editId).show();
    }
    if (this.IsList[App.State.CurrentStage]){;}
    else if(this.DependentList[App.State.CurrentStage]){;}
    else if(App.State.CurrentStage == 7){;}
    else{
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
    PreviewPane.refresh();
  },
  SubmitInput() {
    var response = $.trim($("#iResponse").val());
    if (response == "") {
      alert("Give some response");
      return;
    }
    if (App.EDIT_MODE) {
      App.UserData[App.edit] = response;
      App.EDIT_MODE = false;
      $("#iResponse").val("");
      PreviewPane.refresh();
      App.showView("preview");
      return;
    }

    if (this.IsList[App.State.CurrentStage]) {
      this.addNew();
    } else if (!(this.DependentList[App.State.CurrentStage])) {
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
    if (this.DependentList[App.State.CurrentStage]) {
      App.UserData[App.State.CurrentStage].push(response);
      this.incr = 0;
      $("#iContext").text("");
      $("#iResponse").val("");
    }
    PreviewPane.refresh();
    App.showView("preview");
    MainButtons.toggleButton(++App.State.CurrentStage,true);

  },
  show() {
    App.showView("dataEntry");
    $("#iQuestion").text(this.Questions[App.State.CurrentStage]);
    $("#IewBtnputNn").prop('disabled', (!(this.IsList[App.State.CurrentStage])));
    if (this.DependentList[App.State.CurrentStage]) {
      $("#InputNextBtn").prop('disabled', false);
      $("#s4").prop('disabled', true);
      $("#iContext").text(App.UserData[this.pivot][this.incr]);
    }
  },
  addChoices() {
    var response = $.trim($("#iResponse").val());
    if (response == "") {
      alert("Give some response");
      return;
    }
    this.incr++;
    if (App.UserData[this.pivot].length - 1 == this.incr) {
      $("#InputNextBtn").prop('disabled', true);
      $("#s4").prop('disabled', false);
    }
    $("#iContext").text(App.UserData[this.pivot][this.incr]);
    App.UserData[App.State.CurrentStage].push(response);
    $("#iResponse").val("");

  },
  addNew() {
    var response = $.trim($("#iResponse").val());
    if (response == "") {
      alert("Give some response");
      return;
    }
    $("#SubmitResponse").prop('disabled',false);
    App.UserData[App.State.CurrentStage].push(response);
    $("#iResponse").val("");
  },
  setView(btnIndex){
    $("#iQuestion").text(this.Questions[btnIndex]);
  },
  showAdd(){
  $("#AddMore").prop('disabled',false);
  $("#SubmitResponse").prop('disabled',true);
  },
  showNext(){
    $("#InputNextBtn").prop('disabled',false);
    $("#SubmitResponse").prop('disabled',true);
  },
  showChoices(){
    $("#iChoices").text(App.UserData[this.pivot][this.incr]);
  },
  setDecisionPane(){
    $("#iResponse").hide();
    $("#SubmitResponse").prop('disabled',true);
    for(var i = 0;i<App.UserData[this.pivot].length;i++){
    $("#choiceList").append('<button class="choiceOption">'+ App.UserData[this.pivot][i]+'</button>');
    }
  },
  prepareForEdit()
  {
    var data = App.UserData[App.edit];
    $("#iResponse").val(data);
    $("#InputNewBtn").prop('disabled', true);
    $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
  }
}

var PreviewPane = {
  "ChoicePosition" : 0 ,
   refresh() {
    controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
    for (var i = 0; i < controls.length; i++){
      if ( DataEntryPane.IsList[i] || DataEntryPane.DependentList[i]){
        $(controls[i]).text(App.UserData[i][this.ChoicePosition]);
      }
      else{
        $(controls[i]).text(App.UserData[i]);
      }
    }
  },
  edit(button_index) {
    App.EDIT_MODE = true;
    App.edit = button_index;
    DataEntryPane.prepareForEdit();
    App.showView("dataEntry");

  },
  choice(action){
    if( action == "forward" )
    this.ChoicePosition++;
    else {
      this.ChoicePosition--;
      if( this.ChoicePosition < 0 )
        this.ChoicePosition = App.UserData[DataEntryPane.pivot].length - 1 ;
    }
    this.ChoicePosition = this.ChoicePosition % (App.UserData[DataEntryPane.pivot].length);
    this.refresh();
  }
}

var MainButtons = {
  "buttons": ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9", "#b10"],
toggleButton( index , visible ){
  $(this.buttons[index]).prop('disabled',( ! visible ));
},
  collectresponse() {
    this.toggleButton(App.State.CurrentStage,false);
    // show edit pare
    // hide preview pare
    DataEntryPane.show();
  },
  showChoicesEntryPane(){
    DataEntryPane.showAdd();
    this.showDataEntryPane(DataEntryPane.pivot);

  },
  showDependentEntryPane(btnIndex){
    DataEntryPane.showNext();
    DataEntryPane.showChoices();
    this.showDataEntryPane(btnIndex);
  },
  showDecisionPane(btnIndex){
    DataEntryPane.setDecisionPane();
    this.showDataEntryPane(btnIndex);
  },
  showDataEntryPane(btnIndex){
    DataEntryPane.setView(btnIndex);
    App.showView("dataEntry");
  },
  enableNextButton(){
    this.toggleButton(App.State.CurrentStage , false);
    this.toggleButton(App.State.CurrentStage+1 , true);
  }
  
}

$(document).ready(function () {
  // TestSuite.focusOnSubmit();
  MainButtons.toggleButton(App.State.CurrentStage,true);
  PreviewPane.refresh();
});