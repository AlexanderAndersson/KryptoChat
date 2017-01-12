
﻿$(document).ready(function () {

    if (sessionStorage.getItem("CountMessages") == null) {
        sessionStorage.CountMessages = 5;
    }
    
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
        let responseArray = UsernameErrorCheck(username);
        if (responseArray[0] == true)
        {
            sessionStorage.yourUsername = username;
            $('.userNav').append("Username: " + sessionStorage.yourUsername);
            $('.usernameDiv').hide();
            $('#ChatShit').show();
        }
        else
        {
            row.find('input[name$=pUsername]').css('background-color', 'red');
            $('#usernameError').html(responseArray[1]);
        }
        
    });

    $('input[name$=pUsername]').on('keyup', function () {
        var row = $('.usernameDiv');
        var username = row.find('input[name$=pUsername]').val();
        let responseArray = UsernameErrorCheck(username);

        if ($('input[name$=pUsername]').val().length <= 0)
        {
            row.find('input[name$=pUsername]').css('background-color', 'white');
            $('#usernameError').html('');
        }
        else if (responseArray[0] == true) {
            row.find('input[name$=pUsername]').css('background-color', 'green');
            $('#usernameError').html('');
        }
        else {
            row.find('input[name$=pUsername]').css('background-color', 'red');
            $('#usernameError').html(responseArray[1]);
        }
    });

    $('#messageBox').on('keyup', function () {

        let message = $('#messageBox').val();
        let responseArray = SendMsgCheckErrorTextTooLong(message)

        if (responseArray[0] == true) {
            $('#sendMsgError').html('');
        }
        else
        {
            $('#sendMsgError').html(responseArray[1]);
        }

    });

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
    { pKey: sessionStorage.Key, pMessagesToGet: sessionStorage.CountMessages },
    function (data) {
        if (data.Result) {
            sessionStorage.CountMessages = 0;
            for (let i = 0; i < data.Result.length; i++) {
                sessionStorage.CountMessages = Number(sessionStorage.CountMessages) + 1;
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

    let responseArray = SendMsgErrorCheck(message);

    if (responseArray[0] == true) {
        $('#sendMsgError').html('');

        jQuery.ajax({
            type: "POST",
            url: '/Message/SendMessage/',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ pUsername: sessionStorage.yourUsername, pMessage: message, pKey: key }),
            success: function (data) {
                $('#messageBox').val('');
                sessionStorage.CountMessages = Number(sessionStorage.CountMessages) + 1;
            },
            failure: function (errMsg) {
                alert("Error");
            }
        });
    }
    else {
        $('#sendMsgError').html(responseArray[1]);
    }

    
});

setTimeout(function () {
    setInterval(function () {
        var div = $('.chatContainer');
        var isBottom = false;
        var sum = Math.ceil(((div[0].scrollHeight - div.height() + 1) - 0.000006666666877208627)) - Math.ceil(div[0].scrollTop)

        //if (div.scrollTop == div[0].scrollHeight) {
        //    isBottom = true;
        //}
        //else {
        //    isBottom = false;
        //}

        

        if (sum == 0)
        {
            isBottom = true;
        }
        else
        {
            isBottom = false;
        }

        $.post('/Message/GetMessage/',
            { pKey: sessionStorage.Key, pMessagesToGet: sessionStorage.CountMessages },
            function (data) {
                if (data.Result) {
                    sessionStorage.CountMessages = 0;
                    for (let i = 0; i < data.Result.length; i++) {
                        sessionStorage.CountMessages = Number(sessionStorage.CountMessages) + 1;
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
                    //$('#testingGround').html(sessionStorage.CountMessages);
                    $('#testingGround').html('scrollTop: ' + div[0].scrollTop + '<br />'
                        + 'scrollHeight: ' + ((div[0].scrollHeight - div.height() + 1) - 0.000006666666877208627) + '<br />'
                        + 'sum: ' + sum + '<br />'
                        + 'isbottom: ' + isBottom + '<br />'
                        );
                    
                }
        else {
            alert("Error");
        }
        }, 'json');
        setTimeout(function () {
            if (isBottom == true) {
                div.scrollTop(div[0].scrollHeight);
            }
        }, 50);
    }, 500);
}, 50);


$(document).ready(function () {
    $('#messageBox').keypress(function (e) {
        if (e.keyCode == 13)
            $('#sendMsgBtn').click();
    });
});

function SendMsgErrorCheck(message) {
    let isValid = true;
    let errorMsg = "";

    if ($.trim(message).length == 0) {
        isValid = false;
        errorMsg = "Message cannot be empty!";
    }

    if (message.length > 300) {
        isValid = false;
        errorMsg = "Message cannot be longer than 300 characters!";
    }

    let array = [isValid, errorMsg];
    return array;
};

function SendMsgCheckErrorTextTooLong(message)
{
    let isValid = true;
    let errorMsg = "";

    if ($.trim(message).length > 300) {
        isValid = false;
        errorMsg = "Text too long!";
    }

    let array = [isValid, errorMsg];
    return array;
}

function UsernameErrorCheck(username) {
    let isValid = true;
    let errorMsg = "";

    if ($.trim(username).length == 0) {
        isValid = false;
        errorMsg = "Username cannot be empty!";
    }

    if (username.length > 25) {
        isValid = false;
        errorMsg = "Username cannot be more than 25 characters!";
    }

    if ($.trim(username).length == 1) {
        isValid = false;
        errorMsg = "Username must be atleast 2 characters!";
    }

    let array = [isValid, errorMsg];
    return array;
};

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