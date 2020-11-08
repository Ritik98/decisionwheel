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
    viewmap = { "preview": "#previewviewarea", "dataEntry": "#userdataentrybox" };
    $(viewmap[this.last_visible_view]).hide();
    this.last_visible_view = viewname;
    $(viewmap[this.last_visible_view]).show();
  }
}

var TestSuite =
{

  focusOnDecision() {
    App.State.CurrentStage = 7;
    App.UserData = [
      "focusOnDecision",
      ["choice1","choice2","choice3"],
      ["con1","con2","con3"],
      ["val1","val2","val3"],
      ["feel1","feel2","feel3"],
      "Additionalinfo",
      "Whocanhelp",
      "",
      ""
    ]
  },
  focusOnChoice() {
    App.State.CurrentStage = 1;
    App.UserData = [
      "focusOnChoice",
      [],
      [],
      [],
      [],
      "",
      "",
      "",
      ""
    ]
  },
  focusOnDependentChoice() {
    App.State.CurrentStage = 2;
    App.UserData = [
      "focusOnDependentChoice",
      ["choice1","choice2","choice3"],
      [],
      [],
      [],
      "",
      "",
      "",
      ""
    ]
  },
  focusOnAddInfo() {
    App.State.CurrentStage = 5;
    App.UserData = [
      "focusOnAddInfo",
      ["choice1","choice2","choice3"],
      ["con1","con2","con3"],
      ["val1","val2","val3"],
      ["feel1","feel2","feel3"],
      "",
      "",
      "",
      ""
    ]
  },
  focusOnSubmit() {
    App.State.CurrentStage = 9;
    App.UserData = [
      "focusOnSubmit",
      ["vhjv", "hvjvbjh", "fjeer", "ygfbchds"],
      ["vhjv", "hvjvbjh", "fjeer", "ygfbchds"],
      ["vhjv", "hvjvbjh", "fjeer", "ygfbchds"],
      ["vhjv", "hvjvbjh", "fjeer", "ygfbchds"],
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

  getResponse() {
    var response = $.trim($("#iResponse").val());
    if (response == "" && App.State.CurrentStage != 7) {
      alert("Give some response");
      return false;
    }
    return response;

  },
  decisionChoice(choice){
    App.UserData[App.State.CurrentStage]=App.UserData[this.pivot][choice];
    App.showView("preview");
    PreviewPane.refresh();
    PreviewPane.enableEdit();
    MainButtons.toggleButton(++App.State.CurrentStage, true);
    $("#iResponse").show();
    $("#SubmitResponse").prop('disabled', false);
    $("#choiceList").text("");
    
  },
  SubmitResponse() {
    var response = this.getResponse(); 
    if (response != false) {
      PreviewPane.enableEdit();
      MainButtons.enableNextButton();
      App.showView("preview");
      this.checkStageAndSetView(response);
      PreviewPane.refresh();
      App.State.CurrentStage++;
    }

    // var editId = ["#e1" , "#e2" , "#e3" , "#e4" , "e5" , "e6" , "e7" , "e8" , "e9"]
  },
  checkStageAndSetView(response){
    if (this.IsList[App.State.CurrentStage]) {//Choices Condition
      this.addChoices();
      $("#AddMore").hide();
    }
    else if (this.DependentList[App.State.CurrentStage]) {
      this.nextChoice();
      $("#iChoices").text("");
      this.incr = 0;

    }
    else if (App.State.CurrentStage == 7) { ; }
    else {
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
  },
  
  nextChoice() {
    var response = this.getResponse();
    if (response != false) {
      this.incr++;
      if (App.UserData[this.pivot].length - 1 == this.incr) {
        $("#InputNextBtn").prop('disabled', true);
        $("#SubmitResponse").prop('disabled', false);
      }
      this.showChoices();
      App.UserData[App.State.CurrentStage].push(response);
      $("#iResponse").val("");
      /**
       * increment
       * checkcondn
       * show next choice in pane
       * push choice
       * empty data entry textarea
       */
    }

  },
  addChoices() {
    var response = this.getResponse();
    if (response != false){
      $("#SubmitResponse").prop('disabled', false);
      App.UserData[App.State.CurrentStage].push(response);
      $("#iResponse").val("");
    }
  },
  setView(btnIndex) {
    $("#iQuestion").text(this.Questions[btnIndex]);
  },
  showAdd() {
    $("#AddMore").prop('disabled', false);
    $("#SubmitResponse").prop('disabled', true);
  },
  showNext() {
    $("#InputNextBtn").prop('disabled', false);
    $("#SubmitResponse").prop('disabled', true);
  },
  showChoices() {
    $("#iChoices").text(App.UserData[this.pivot][this.incr]);
  },
  setDecisionPane() {
    $("#iResponse").hide();
    $("#SubmitResponse").prop('disabled', true);
    for (var i = 0; i < App.UserData[this.pivot].length; i++) {
      $("#choiceList").append('<button class="choiceOption" onClick="DataEntryPane.decisionChoice('+i+')">' + App.UserData[this.pivot][i] + '</button>');
    }
  },
  prepareForEdit() {
    var data = App.UserData[App.edit];
    $("#iResponse").val(data);
    $("#InputNewBtn").prop('disabled', true);
    $("#iQuestion").text(DataEntryPane.Questions[App.edit]);
  }
}

var PreviewPane = {
  "ChoicePosition": 0,
  refresh() {
    controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
    for (var i = 0; i < controls.length; i++) {
      if (DataEntryPane.IsList[i] || DataEntryPane.DependentList[i]) {
        $(controls[i]).text(App.UserData[i][this.ChoicePosition]);
      }
      else {
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
  choice(action) {
    if (action == "forward")
      this.ChoicePosition++;
    else {
      this.ChoicePosition--;
      if (this.ChoicePosition < 0)
        this.ChoicePosition = App.UserData[DataEntryPane.pivot].length - 1;
    }
    this.ChoicePosition = this.ChoicePosition % (App.UserData[DataEntryPane.pivot].length);
    this.refresh();
  },
  enableEdit(){
    var editId = "#e" + (App.State.CurrentStage + 1);
      if (!DataEntryPane.DependentList[App.State.CurrentStage]) {
        $(editId).show();
      }
  }
}

var MainButtons = {
  "buttons": ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9", "#b10"],
  toggleButton(index, visible) {
    $(this.buttons[index]).prop('disabled', (!visible));
  },
  showChoicesEntryPane() {
    DataEntryPane.showAdd();
    this.showDataEntryPane(DataEntryPane.pivot);

  },
  showDependentEntryPane(btnIndex) {
    DataEntryPane.showNext();
    DataEntryPane.showChoices();
    this.showDataEntryPane(btnIndex);
  },
  showDecisionPane(btnIndex) {
    DataEntryPane.setDecisionPane();
    this.showDataEntryPane(btnIndex);
  },
  showDataEntryPane(btnIndex) {
    DataEntryPane.setView(btnIndex);
    App.showView("dataEntry");
    this.toggleButton(App.State.CurrentStage, false);
  },
  enableNextButton() {
    this.toggleButton(App.State.CurrentStage + 1, true);
  }

}

$(document).ready(function () {
  TestSuite.focusOnDecision();
  MainButtons.toggleButton(App.State.CurrentStage, true);
  PreviewPane.refresh();
});