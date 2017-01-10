
﻿$(document).ready(function () {
    
    ForceLoadMessages();

    if (sessionStorage.getItem("Key") != null)
    {
        $('#keyBox').val(sessionStorage.Key);
    }

    

    $('#keyBox').on("keyup", function () {

        sessionStorage.Key = $('#keyBox').val();

    });
	
	$('#enterUser').on("click", function () {
        var row = $('.usernameDiv');
        var username = row.find('input[name$=pUsername]').val();
        sessionStorage.yourUsername = username;
        $('.userNav').append("Username: " + sessionStorage.yourUsername);
        $('.usernameDiv').hide();
        $('#ChatShit').show();

});

﻿if (sessionStorage.getItem("yourUsername") == null)
    $('#ChatShit').hide();
else {
    $('.userNav').append('<span class="usernameSpan">' + "Username: " + '</span>' + '<span class="usernameText">' + sessionStorage.yourUsername + '</span>');
    $('.usernameDiv').hide();
}

function ForceLoadMessages()
{
    $.post('/Message/GetMessage/',
    { pKey: sessionStorage.Key },
    function (data) {
        if (data.Result) {
            for (let i = 0; i < data.Result.length; i++) {
                if (i == 0) {
                    var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                    $('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + '</span>' + " " + '<span class="timeText">' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>' + '<br/>' + data.Result[i].Message + '<br/>');
                    sessionStorage.Username = data.Result[i].Username;
                    //sessionStorage.Time = data.Result[i].Timestamp;
                }
                else if (sessionStorage.Username == data.Result[i].Username) {
                    $('.newMessage').append(data.Result[i].Message + '<br/>');
                    //sessionStorage.Time = data.Result[i].Timestamp;
                }
                else {
                    var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                    $('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + '</span>' + " " + '<span class="timeText">' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>' + '<br/>' + data.Result[i].Message + '<br/>');
                    sessionStorage.Username = data.Result[i].Username;
                    //sessionStorage.Time = data.Result[i].Timestamp;
                }
            }
            sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
        }
        else {
            $('.newMessage').append('Failed to load message.' + '<br/>');
        }
    }, 'json');
};

$('#sendMsgBtn').click(function () {
    var row = $('#ChatShit');
    //var username = row.find('input[name$=pUsername]').val();
    var message = row.find('textarea[name$=pMessage]').val();
    var key = row.find('input[name$=pKey]').val();

    jQuery.ajax({
        type: "POST",
        url: '/Message/SendMessage/',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ pUsername: sessionStorage.yourUsername, pMessage: message, pKey: key }),
        success: function (data) {
            $('#messageBox').val('');
        },
        failure: function (errMsg) {
            alert("Error");
        }
    });
});

setTimeout(function () {
    setInterval(function () {
        var div = $('.chatContainer');
        var isBottom = false;

        if (div.scrollTop == div[0].scrollHeight) {
            isBottom = true;
        }
        else {
            isBottom = false;
        }

    $.post('/Message/GetMessage/',
    { pKey: sessionStorage.Key },
    function (data) {
        if (data.Result) {
            for (let i = 0; i < data.Result.length; i++) {
                if (sessionStorage.getItem("Time") != null) {
                    if (data.Result[i].Timestamp > sessionStorage.Time) {
                        if (sessionStorage.Username == data.Result[i].Username) {
                            $('.newMessage').append(data.Result[i].Message + '<br/>');
                        }
                        else {
							var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
							$('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + '</span>' + " " +
								'<span class="timeText">' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>' + '<br/>' + data.Result[i].Message + '<br/>');
							sessionStorage.Username = data.Result[i].Username;
						}
                    }
                    else {
                        if (sessionStorage.Username == data.Result[i].Username) {
                            $('.newMessage').append(data.Result[i].Message + '<br/>');
                        }
                        else {
                            var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
                            $('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + '</span>' + " " +
                                '<span class="timeText">' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>' + '<br/>' + data.Result[i].Message + '<br/>');
                            sessionStorage.Username = data.Result[i].Username;
                        }
                    }
                }
                sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
            }
            else {
                alert("Error");
            }
        }, 'json');
        setTimeout(function () {
            if (isBottom) {
                div.scrollTop(div[0].scrollHeight);
            }
            else {
                div.scrollTop(div[0].scrollHeight);
            }
        }, 35);
    }, 500);
}, 35);


$(document).ready(function () {
    $('#messageBox').keypress(function (e) {
        if (e.keyCode == 13)
            $('#sendMsgBtn').click();
    });
});

//$('#loadMsg').click(function () {
//    $.post('/Message/GetMessage/',
//    function (data) {
//        if (data.Result) {
//            for (let i = 0; i < data.Result.length; i++) {
//                if (sessionStorage.getItem("Time") != null)
//                {
//                    if (data.Result[i].Timestamp > sessionStorage.Time) {
//                        if (sessionStorage.Username == data.Result[i].Username) {
//                            $('#showMsg').append(data.Result[i].Message + '\n');
//                            //sessionStorage.Time = data.Result[i].Timestamp;
//                        }
//                        else {
//                            var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
//                            $('#showMsg').append('\n' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result[i].Message + '\n');
//                            sessionStorage.Username = data.Result[i].Username;
//                            //sessionStorage.Time = data.Result[i].Timestamp;
//                        }
//                    }
//                }
//                else
//                {
//                    if (sessionStorage.Username == data.Result[i].Username) {
//                        $('#showMsg').append(data.Result[i].Message + '\n');
//                        //sessionStorage.Time = data.Result[i].Timestamp;
//                    }
//                    else {
//                        var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
//                        $('#showMsg').append('\n' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '\n' + data.Result[i].Message + '\n');
//                        sessionStorage.Username = data.Result[i].Username;
//                        //sessionStorage.Time = data.Result[i].Timestamp;
//                    }
//                }             
//            }
//            sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
//        }
//        else {
//            alert("Error");
//        }
//    }, 'json');
//});

//$('#loadMsg').click(function () {
//    var div = $('.chatContainer');
//    var isBottom = false;

//    //if (div.scrollTop == div[0].scrollHeight)
//    //    isBottom = true;
//    //else
//    //    isBottom = false;

//    $.post('/Message/GetMessage/',
//    function (data) {
//        if (data.Result) {
//            for (let i = 0; i < data.Result.length; i++) {
//                if (sessionStorage.getItem("Time") != null) {
//                    if (data.Result[i].Timestamp > sessionStorage.Time) {
//                        if (sessionStorage.Username == data.Result[i].Username) {
//                            $('.newMessage').append(data.Result[i].Message + '<br/>');
//                        }
//                        else {
//                            var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
//                            $('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '<br/>' + data.Result[i].Message + '<br/>');
//                            sessionStorage.Username = data.Result[i].Username;
//                        }
//                    }
//                }
//                else {
//                    if (sessionStorage.Username == data.Result[i].Username) {
//                        $('.newMessage').append(data.Result[i].Message + '<br/>');
//                    }
//                    else {
//                        var date = new Date(parseInt(data.Result[i].Timestamp.substr(6)));
//                        $('.newMessage').append('<br/>' + '<span class="usernameText">' + data.Result[i].Username + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '<br/>' + data.Result[i].Message + '<br/>');
//                        sessionStorage.Username = data.Result[i].Username;
//                    }
//                }
//            }
//            sessionStorage.Time = data.Result[data.Result.length - 1].Timestamp;
//        }
//        else {
//            alert("Error");
//        }
//    }, 'json');

//    setTimeout(function () {      
//        if (isBottom)
//            div.scrollTop(div[0].scrollHeight);
//        else
//            div.scrollTop(div[0].scrollHeight);
//    }, 35);
//});


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