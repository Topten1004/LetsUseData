function init() {
    localStorage.removeItem("courseInstanceId");


    if (localStorage.getItem("KeepMeLoggedIn") == "true") {
        if (localStorage.getItem("Hash") != null) {
            document.getElementById("loader-spinner-fullpage").style.display = "block";

            // Experiment
            if (d.StudentName.startsWith('estudiante')) {
                window.location.href = "Experiment/Start.html";
            }
            else {
                window.location.href = "CourseSelection.html";
            }
        }
    }
    else {
        localStorage.removeItem("Hash");
        localStorage.removeItem("IsAdmin");
        localStorage.removeItem("AdminHash");

        document.getElementById("loader-spinner-fullpage").style.display = "none";
    }

    if (localStorage.getItem("isDemo") == "true") localStorage.removeItem("isDemo");
}

//const data = {
//    username: "",
//    password: ""
//};
//fetchFunction("Login", data)

$("#show_icon").on("click", function (){
    $(".fa-eye", this).toggleClass("d-none")
    $(".fa-eye-slash", this).toggleClass("d-none")
    if ($(".fa-eye", this).hasClass("d-none")){
        $("#txtPassword").attr("type", "text")
    }
    else {
        $("#txtPassword").attr("type", "password")
    }
})

function getUserCredentials() {
    //-----------------------Disable Button and Show LoaderImage----------------------
    document.getElementById("login-loder-img").style.display = "block" 
    document.getElementById("disabled-div").style.display = "block" 
    //--------------------------------------------------------------------------------
    const username = document.getElementById("txtUser").value;
    const password = document.getElementById("txtPassword").value;

    const data = {
        username: username,
        password: password
    };

    fetchFunction("Login", data).then(d => {
        const guid = d.studentIdHash;
        const error = d.error;
        if (guid == "-1") {

            if (error == "Password was incorrect") {
                document.getElementById("txtPassword").classList.add("invalid")
                document.getElementById("password_message").style.display = ""
                document.getElementById("txtUser").classList.remove("invalid")
                document.getElementById("username_message").style.display = "none"
            }
            else {
                document.getElementById("txtPassword").classList.remove("invalid")
                document.getElementById("password_message").style.display = "none"
            }

            if (error == "Could not find a login with that username")
            {
                document.getElementById("txtUser").classList.add("invalid")
                document.getElementById("username_message").style.display = ""
            }
            else {
                document.getElementById("txtUser").classList.remove("invalid")
                document.getElementById("username_message").style.display = "none"
            }
            
            //----------------------------Enable Button------------------------------
            document.getElementById("disabled-div").style.display = "none" 
            //-------------------------------------------------------------------------
            const username = document.getElementById("txtUser").value;
        } else {
            KeepLoggedIn();
            //----------------------------Show Loder Image------------------------------
            document.getElementById("login-loder-img").style.display = "block"
            //--------------------------------------------------------------------------
            localStorage.setItem("Hash", guid);
            localStorage.setItem("StudentName", d.StudentName);
            localStorage.setItem("StudentProfileImage", d.Picture);

            if (d.IsAdmin & d.AdminHash!="" ) {
                localStorage.setItem("IsAdmin", d.IsAdmin);
                localStorage.setItem("AdminHash", d.AdminHash);
            }

            // Experiment
            if (d.StudentName.startsWith('estudiante')) {
                window.location.href = "Experiment/Start.html";
            }
            else {
                window.location.href = "CourseSelection.html";
            }
        }
        //----------------------Hide Loader Image----------------------------------
        document.getElementById("login-loder-img").style.display = "none" 
        //--------------------------------------------------------------------------
    });

    return false;
}

function HowToLogin() {
    window.location.href = "VideoPage.html";
}

function RequestLogin() {
    window.location.href = "RequestLogin.html";
}
function DisabledButton() {
    document.getElementById("javascriptLogin").disabled = true;
    document.getElementById("javascriptLogin").style.pointerEvents = "none";

    document.getElementById("HowToLogin").disabled = true;
    document.getElementById("HowToLogin").style.pointerEvents = "none";

    document.getElementById("RequestLogin").disabled = true;
    document.getElementById("RequestLogin").style.pointerEvents = "none";

}
function EnableButton() {
    document.getElementById("javascriptLogin").disabled = false;
    document.getElementById("javascriptLogin").style.pointerEvents = "auto";

    document.getElementById("HowToLogin").disabled = false;
    document.getElementById("HowToLogin").style.pointerEvents = "auto";

    document.getElementById("RequestLogin").disabled = false;
    document.getElementById("RequestLogin").style.pointerEvents = "auto";

}

function KeepLoggedIn() {
    if (document.getElementById("keepLoggedIn").checked) {
        localStorage.setItem("KeepMeLoggedIn", true);
    }
}
function ForgetPasswordPageLoad() {
    window.location.href = "ForgetPassword.html";
}
function LoadLoginPage() {
    window.location.href = "Default2.html";
}
function ForgetPassword() {
    document.getElementById("lblMessage").style.display="none"
    document.getElementById("lblMessage").innerHTML = "";
    document.getElementById("lblSuccessMessage").innerHTML = "";

    const registerEmail = document.getElementById("TextBoxRegisterEmail").value;
    if (validate(registerEmail)) {
        //-----------------------Disable Button and Show LoaderImage----------------------
        document.getElementById("login-loder-img").style.display = "block"
        document.getElementById("disabled-div").style.display = "block"
        //--------------------------------------------------------------------------------
        const data = {
            registerEmail: registerEmail,
        };
        fetchFunction("ForgetPassword", data).then(d => {
            if (d.error != "") {
                $("#email_message span").text(d.error);
                document.getElementById("TextBoxRegisterEmail").classList.add("invalid")
                document.getElementById("email_message").style.display = ""
            }
            if (d.success != "") {
                document.getElementById("lblSuccessMessage").innerHTML = d.success;
                document.getElementById("TextBoxRegisterEmail").classList.remove("invalid")
                document.getElementById("email_message").style.display = "none"
            }
            //----------------------Hide Loader Image----------------------------------
            document.getElementById("login-loder-img").style.display = "none"
            document.getElementById("disabled-div").style.display = "none"
            //--------------------------------------------------------------------------
        });
    }

    return false;
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(senderEmail) {
    var result = true;
    document.getElementById("lblSuccessMessage").innerText = "";

    if (senderEmail == "") {
        $("#email_message span").text("This field can’t be empty");
        result = false;
        document.getElementById("TextBoxRegisterEmail").classList.add("invalid")
        document.getElementById("email_message").style.display = ""
    }
    else if (!validateEmail(senderEmail)) {
        $("#email_message span").text("Invalid Email Address");
        document.getElementById("email_message").style.display = ""
        result = false;
    }
    return result;
}

init();