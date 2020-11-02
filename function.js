var App =
{
    "State": {
        "CurrentStage": 2
    },
    "UserData": [
        "This is the problem",
        ["choice 1" , "choice 2" , "choice 3" , "choice 4"],
        [],
        [],
        [],
        "",
        "",
        "",
        ""
    ]
}
$( document ).ready(function() {
    MainButtons.enableCurrentButton();
    PreviewPane.refresh();

});
var DataEntryPane =
{
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
    "IsList": [ false, true, false, false, false , false, false , false , false],
    "pivot": 1,
    "dependentlist": [ false, false, true, true, true , false, false , false , false],
     "incr" : 0,

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
        if ( this.IsList[App.State.CurrentStage])
        {
            this.addNew();
        }
        else{
            App.UserData[App.State.CurrentStage] = response;
            $("#iResponse").val("");
        }
        if(this.dependentlist[App.State.CurrentStage])
        {
            App.UserData[App.State.CurrentStage].push(response);
            this.incr=0;
        $("#iResponse").val("");
        }
        PreviewPane.refresh();
        $("#userdataentrybox").hide();
        $("#previewviewarea").show();
        MainButtons.enableNextButton();

    },
    show() {

        $("#iQuestion").text(this.Questions[App.State.CurrentStage]);
        $("#userdataentrybox").show();
        if (this.IsList[App.State.CurrentStage])
            $("#InputNewBtn").prop('disabled', false);
        else
            $("#InputNewBtn").prop('disabled', true);
            if(this.dependentlist[App.State.CurrentStage])
            {
             $("#InputNextBtn").prop('disabled', false);
             $("#s4").prop('disabled', true);
            }


    },
    showNext(){
        var response = $.trim($("#iResponse").val());
        if (response == "") {
            alert("Give some response");
            return;
        }
        this.incr++;
        if(App.UserData[this.pivot].length-1==this.incr)
        {
            $("#InputNextBtn").prop('disabled', true);
             $("#s4").prop('disabled', false);
        }
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
    }
}

var PreviewPane =
{
    refresh() {
        controls = ["#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8", "#p9"];
        for (var i = 0; i < controls.length; i++)
            $(controls[i]).text(App.UserData[i]);

    }
}
var MainButtons =
{
    "buttons": ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9", "#b10"],
    disableCurrentButton() {
        id = this.buttons[App.State.CurrentStage];
        $(id).prop('disabled', true);
    },
    enableCurrentButton() {
        id = this.buttons[App.State.CurrentStage];
        $(id).prop('disabled', false);
    },
    enableNextButton() {
        App.State.CurrentStage++;
        id = this.buttons[App.State.CurrentStage];
        $(id).prop('disabled', false);
    },

    collectresponse(btn) {
        this.disableCurrentButton();
        // show edit pare
        // hide preview pare
        DataEntryPane.show();

        $("#previewviewarea").hide();
    }
}
