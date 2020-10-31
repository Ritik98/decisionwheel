var AppState = {
    "currentstage": 0
}
function collectresponse(btn){
    var buttons = ["#b1","#b2","#b3","#b4","#b5","#b6","#b7","#b8","#b9","#b10"];
    $(buttons[AppState.currentstage]).prop('disabled', true);;
    // show edit pare
    // hide preview pare
    $("#userdataentrybox").show();
    $("#previewviewarea").hide();
    AppState.currentstage++;
    $(buttons[AppState.currentstage]).prop('disabled', false);;
}
