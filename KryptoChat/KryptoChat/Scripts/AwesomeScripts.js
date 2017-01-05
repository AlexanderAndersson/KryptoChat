$(document).ready(function () {

    $.post('/Message/GetMessage/',
    function (data) {
        if (data.Result) {
            for (let i = 0; i < data.Result.length; i++) {
                if (sessionStorage.Username == data.Result[i].Username) {
                    $('#showMsg').append(data.Result[i].Message + '\n');
                    //sessionStorage.Time = data.Result[i].Timestamp;
                }
                else {
                    var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                    $('#showMsg').append('\n' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result[i].Message + '\n');
                    sessionStorage.Username = data.Result[i].Username;
                    //sessionStorage.Time = data.Result[i].Timestamp;
                }
            }
            sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
        }
        else {
            $('#showMsg').append('Failed to load message.' + '\n');
        }
    }, 'json');

});



$('#sendMsgBtn').click(function () {
    var row = $('#ChatShit');
    var username = row.find('input[name$=pUsername]').val();
    var message = row.find('textarea[name$=pMessage]').val();
    jQuery.ajax({
        type: "POST",
        url: '/Message/SendMessage/',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ pUsername: username, pMessage: message }),
        success: function (data) {
            $('#messageBox').val('');
        },
        failure: function (errMsg) {
            alert("Error");
        }
    });
});

$('#loadMsg').click(function () {
    $.post('/Message/GetMessage/',
    function (data) {
        if (data.Result) {
            for (let i = 0; i < data.Result.length; i++) {
                if (sessionStorage.getItem("Time") != null)
                {
                    if (data.Result[i].Timestamp > sessionStorage.Time) {
                        if (sessionStorage.Username == data.Result[i].Username) {
                            $('#showMsg').append(data.Result[i].Message + '\n');
                            //sessionStorage.Time = data.Result[i].Timestamp;
                        }
                        else {
                            var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                            $('#showMsg').append('\n' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result[i].Message + '\n');
                            sessionStorage.Username = data.Result[i].Username;
                            //sessionStorage.Time = data.Result[i].Timestamp;
                        }
                    }
                }
                else
                {
                    if (sessionStorage.Username == data.Result[i].Username) {
                        $('#showMsg').append(data.Result[i].Message + '\n');
                        //sessionStorage.Time = data.Result[i].Timestamp;
                    }
                    else {
                        var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                        $('#showMsg').append('\n' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result[i].Message + '\n');
                        sessionStorage.Username = data.Result[i].Username;
                        //sessionStorage.Time = data.Result[i].Timestamp;
                    }
                }             
            }
            sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
        }
        else {
            alert("Error");
        }
    }, 'json');
});


//setInterval(function () {
//    $.post('/Message/GetMessage/',
//    function (data) {
//        if (data.Result) {
//            if (data.Result.Timestamp != sessionStorage.Time) {
//                if (sessionStorage.Username == data.Result.Username) {
//                    $('#showMsg').append(data.Result.Message + '\n');
//                    sessionStorage.Time = data.Result.Timestamp;
//                }
//                else {
//                    var date = new Date(parseInt(data.Result.Timestamp.substr(6)));
//                    $('#showMsg').append(data.Result.Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result.Message + '\n');
//                    sessionStorage.Username = data.Result.Username;
//                    sessionStorage.Time = data.Result.Timestamp;
//                }
//            }
//        }
//        else {
//            alert("Error");
//        }
//    }, 'json');
//}, 500);