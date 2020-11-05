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
  showView(toggle) {
    if (toggle == "dataEntry") {
      $("#previewviewarea").hide();
      $("#userdataentrybox").show();
    }
    else if (toggle == "preview") {
      $("#previewviewarea").show();
      $("#userdataentrybox").hide();
    }
  }
}

$(document).ready(function () {
  MainButtons.toggleButton(App.State.CurrentStage,true);
  PreviewPane.refresh();
});
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
  "dependentlist": [false, false, true, true, true, false, false, false, false],
  "incr": 0,

  /**
   * If this is a list type
   * and this is not a pivot
   * find out how many items should be there in the list
   *
   * when it is the last item, show submit, instead of add more
   */
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
    } else if (!(this.dependentlist[App.State.CurrentStage])) {
      App.UserData[App.State.CurrentStage] = response;
      $("#iResponse").val("");
    }
    if (this.dependentlist[App.State.CurrentStage]) {
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
    $("#InputNewBtn").prop('disabled', (!(this.IsList[App.State.CurrentStage])));
    if (this.dependentlist[App.State.CurrentStage]) {
      $("#InputNextBtn").prop('disabled', false);
      $("#s4").prop('disabled', true);
      $("#iContext").text(App.UserData[this.pivot][this.incr]);
    }
  },
  showNext() {
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
    App.UserData[App.State.CurrentStage].push(response);
    $("#iResponse").val("");
  },
  setView(btnIndex){
    $("#iQuestion").text(this.Questions[btnIndex]);
  }
}
var editPane = {
  edit(button_index) {
    App.EDIT_MODE = true;
    var data = App.UserData[button_index];
    $("#iResponse").val(data);
    App.edit = button_index;
    $("#InputNewBtn").prop('disabled', true);
    $("#iQuestion").text(DataEntryPane.Questions[button_index]);
    App.showView("dataEntry");
  }
}
var PreviewPane = {
  refresh() {
    controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
    for (var i = 0; i < controls.length; i++)
      $(controls[i]).text(App.UserData[i]);

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
  showDataEntryPane(btnIndex){
    App.showView("dataEntry");
    DataEntryPane.setView(btnIndex);
  }
}
