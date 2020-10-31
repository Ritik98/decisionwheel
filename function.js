

var App = 
{
    "State" : {
        "CurrentStage" : 0
    }
}

var DataEntryPane = 
{
    "Questions" : [
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
    SubmitInput()
    {
        $("#userdataentrybox").hide();
        $("#previewviewarea").show();
        MainButtons.enableNextButton();
    },
    show(){
        $("#iQuestion").text(this.Questions[App.State.CurrentStage]);
        $("#userdataentrybox").show();
    }

}

var MainButtons = 
{
    "buttons" : ["#b1","#b2","#b3","#b4","#b5","#b6","#b7","#b8","#b9","#b10"],
    disableCurrentButton()
    {
        id = this.buttons[App.State.CurrentStage];
        $(id).prop('disabled', true);
    },
    enableNextButton()
    {
        App.State.CurrentStage++;
        id = this.buttons[App.State.CurrentStage];
        $(id).prop('disabled', false);
    },

    collectresponse(btn){
        this.disableCurrentButton();
        // show edit pare
        // hide preview pare
        DataEntryPane.show();

        $("#previewviewarea").hide();
    }
}
