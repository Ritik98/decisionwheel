

var App = 
{
    "State" : {
        "CurrentStage" : 0
    }
}

var DataEntryPane = 
{
    SubmitInput()
    {
        $("#userdataentrybox").hide();
        $("#previewviewarea").show();
        MainButtons.enableNextButton();
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
        $("#userdataentrybox").show();
        $("#previewviewarea").hide();
    }
}
