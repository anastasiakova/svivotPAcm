var users = [
    "a"
];

var pwds = [
    "a"
];

var isLoggedIn = false;

function addUser(username, pwd){
    if(users.includes(username))
    {
        //shit.
    }
    else
    {
        users.push(username);
        pwds.push(pwd);
    }
}

function tryLogIn(){
    var username = $("[name='loginUserName']").val();
    var pwd = $("[name='loginPassword']").val();
    if(users.includes(username) && pwds[users.indexOf(username)] == pwd){
        toggleVisibility('Settings');
        var nu = $('#signupLink');
        $('#signupLink').remove();
        $('#loginLink').remove();
        window.scrollTo(0, 0);
        isLoggedIn = true;
        $('#loggedInUser')[0].innerText = "Hello, " + username + "!";
    }
    else
    {
        alert("No such user.");
    }
}

function validateSignUpForm(){
    var enteredUsername = $("[name='signupUserName']").val();
    var enteredPwd = $("[name='signupPassword']").val();
    var enteredFirstName = $("[name='privateName']").val();
    var enteredLastName = $("[name='lastName']").val();
    var enteredEmail = $("[name='email']").val();
    var enteredDate = $("[name='birthday']").val();

    var validForm = (validateUsername(enteredUsername) &&
                    validatePwd(enteredPwd) &&
                    ValidateName(enteredFirstName) &&
                    ValidateName(enteredLastName) &&
                    validateDate(enteredDate) &&
                    validateEmail(enteredEmail));
    
    if(validForm)
    {
        addUser(enteredUsername, enteredPwd);
        alert("User added successfully!");
        toggleVisibility('Welcome');
        window.scrollTo(0, 0);
    }
    else
    {
        window.alert("Some value is wrong...");
    }
    
    return validForm;
}

function validateUsername(user){
    return (isNotEmpty(user) && !(users.includes(user)));
}

function ValidateName(name){
    var chars = /^[a-zA-Z]*$/
    return chars.test(name);
}

function validatePwd(pwd){
    var digits = /[0-9]/;
    var chars = /[a-zA-Z]/;
    var both = /^[a-zA-Z0-9]*$/
    return (digits.test(pwd) && chars.test(pwd) && both.test(pwd) && pwd.length >= 8);  
}

function isNotEmpty(str){
    return (str.length > 0);
}

function validateDate(str){
    var d = new Date(str);
    var ans = d instanceof Date && !isNaN(d);
    var currDate = new Date();
    var currYear = currDate.getFullYear();
    return d instanceof Date && !isNaN(d) && d.getFullYear() <= currYear;
}

function validateEmail(email){
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
}

function playClicked(){
    if(isLoggedIn){
        setSettings();
        toggleVisibility('Play');
        Start();
    }
    else
    {
        alert('In order to play you must log in first.\nPlease register, it is free!');
    }
}