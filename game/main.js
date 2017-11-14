$(function () {
    $("#initModal").modal('show');

    $("#signUpButton").click(function (e) { 
        e.preventDefault();
        data = {"mail": $("#userEmail").val(), "time": new Date().toLocaleString()};
        $.post("http://rpi.pyth.se:5000/add", data, function() {


        }).done(function(data) {
            console.log(data);
            $("#initModal").modal('hide');
        }).fail(function(data, status, xhr) {
            console.log(data);
        });        
        
    });
    $("#doneButton").click(function (e) { 
        e.preventDefault();
        $("#userEmail").val("");
        $("#doneModal").modal('hide');
        $("#initModal").modal('show');
    });    

    $(document).on('gameDone', function () {
        console.log("Game finished");
        $("#doneModal").modal('show');
    });
});