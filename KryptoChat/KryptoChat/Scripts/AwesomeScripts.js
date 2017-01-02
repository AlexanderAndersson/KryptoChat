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
            //loadMsg();
        },
        failure: function (errMsg) {
            alert("Error");
        }
    });
});

setInterval(function () {
    $.post('/Message/GetMessage/',
    function (data) {
        if (data.Result) {
            if (data.Result.Timestamp != sessionStorage.Time) {
                if (sessionStorage.Username == data.Result.Username) {
                    $('#showMsg').append(data.Result.Message + '\n');
                    sessionStorage.Time = data.Result.Timestamp;
                }
                else {
                    var date = new Date(parseInt(data.Result.Timestamp.substr(6)));
                    $('#showMsg').append(data.Result.Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result.Message + '\n');
                    sessionStorage.Username = data.Result.Username;
                    sessionStorage.Time = data.Result.Timestamp;
                }
            }
        }
        else {
            alert("Error");
        }
    }, 'json');
}, 500);


$('#loadMsg').click(function () {
    $.post('/Message/GetMessage/',
    function (data) {
        //sessionStorage.Username = data.Result.Username;
        if (data.Result) {
            if (sessionStorage.Username == data.Result.Username) {
                $('#showMsg').append(data.Result.Message + '\n');
            }
            else {
                var date = new Date(parseInt(data.Result.Timestamp.substr(6)));
                $('#showMsg').append(data.Result.Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result.Message + '\n');
                sessionStorage.Username = data.Result.Username;
            }
        }
        else {
            alert("Error");
        }
    }, 'json');
});


//function loadMsg() {
//    $.post('/Message/GetMessage/',
//    function (data) {
//        if (data.Result) {
//            if (sessionStorage.Username == data.Result.Username) {
//                $('#showMsg').append(data.Result.Message + '\n');
//            }
//            else {
//                var date = new Date(parseInt(data.Result.Timestamp.substr(6)));
//                $('#showMsg').append(data.Result.Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result.Message + '\n');
//                sessionStorage.Username = data.Result.Username;
//            }
//        }
//        else {
//            alert("Error");
//        }
//    }, 'json');
//}
