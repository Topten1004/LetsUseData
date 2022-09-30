function displayStudentCredentials() {
    //----------------------------Show Loder Image------------------------------
    document.getElementById("loader-spinner").style.display = "block"
    //--------------------------------------------------------------------------
    const data = {
    };
    fetchFunction("ProfileInfo", data).then(d => {
        bindLabel(d.UserName, d.Password, d.FullName, d.Email, d.Photo);
        //----------------------------Hide Spinner------------------------------
        document.getElementById("loader-spinner").style.display = "none"
        //-------------------------------------------------------------------------
    });
}

var fileBase64String = "";
displayStudentCredentials();
function bindLabel(userName, password, fullName, email, photo) {
    document.getElementById("LabelEmial").innerHTML = email;
    document.getElementById("fullName").innerText = fullName;
    document.getElementById("ProfileImageView").src = (photo == "") ? "Content/images/photo.jpg" : photo;
    document.getElementById("fileUploadImage").addEventListener("change", readFile);
}

//function personalInfoUpdate(theForm) {
//    //----------------------------Show Loder Image------------------------------
//    document.getElementById("loader-spinner").style.display = "block"
//    //--------------------------------------------------------------------------
//    ClearMessageNote();
//    var studentName = document.getElementById("fullName").value;
//    if (studentName != "") {
//        const data = {
//            Name: studentName,
//            InfoType: "Name"
//        };

//        fetchFunction("UpdateProfile", data).then(d => {
//            if (d.Result == "OK") {
//                document.getElementById("lblSuccessMsg").innerHTML = "The Name has been updated successfully.";
//                document.getElementById("fullName").value = studentName;
//            }
//            //----------------------------Hide Spinner------------------------------
//            document.getElementById("loader-spinner").style.display = "none"
//            //-------------------------------------------------------------------------
//        });
//    } else {
//        document.getElementById("lblErrorMsg").innerHTML = "Sorry! The Full Name field cannot be left blank."
//        //----------------------------Hide Spinner------------------------------
//        document.getElementById("loader-spinner").style.display = "none"
//        //-------------------------------------------------------------------------
//    }
//    return false;
//}

function updatePassword(theForm) {
    //----------------------------Show Loder Image------------------------------
    document.getElementById("loader-spinner").style.display = "block"
    //--------------------------------------------------------------------------
    ClearMessageNote();

    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (checkPassword(newPassword, confirmPassword, currentPassword)) {
        const data = {
            CurrentPassword: currentPassword,
            NewPassword: newPassword,
            InfoType: "Password"
        };

        fetchFunction("UpdateProfile", data).then(d => {
            if (d.Result == "OK") {
                document.getElementById("lblSuccessMsg").innerHTML = "The Password has been updated successfully.";
                document.getElementById("currentPassword").value = "";
                document.getElementById("newPassword").value = "";
                document.getElementById("confirmPassword").value = "";
            } else {
                document.getElementById("lblErrorMsg").innerHTML = "Sorry! Current Password is invalid.";
            }
            //----------------------------Hide Spinner------------------------------
            document.getElementById("loader-spinner").style.display = "none"
            //-------------------------------------------------------------------------
        });
    }
    else {
        //----------------------------Hide Spinner------------------------------
        document.getElementById("loader-spinner").style.display = "none"
        //-------------------------------------------------------------------------
    }
    return false;
}

function checkPassword(newPassword, confirmPassword, currentPassword) {
    var result = true;
    if (currentPassword == '') {
        document.getElementById("lblErrorMsg").innerHTML = "Sorry! The Current Password field cannot be left blank."
        result = false;
    }
    else if (newPassword == '') {
        document.getElementById("lblErrorMsg").innerHTML = "Sorry! The New Password field cannot be left blank."
        result = false;
    }
    else if (confirmPassword == '') {
        document.getElementById("lblErrorMsg").innerHTML = "Sorry! The Confirm Password field cannot be left blank."
        result = false;
    }
    else if (newPassword != confirmPassword) {
        document.getElementById("lblErrorMsg").innerHTML = "Confirm Password did not match. Please try again."
        result = false;
    }
    return result;
}

function readFile() {
    ClearMessageNote();
    if (this.files && this.files[0]) {

        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            document.getElementById("ProfileImageView").src = e.target.result;
            fileBase64String = e.target.result;
        });

        FR.readAsDataURL(this.files[0]);
        var img = document.getElementById('ProfileImageView');
        var width = img.clientWidth;
        var height = img.clientHeight;
    }
}

function submitImage() {
    //----------------------------Show Loder Image------------------------------
    document.getElementById("loader-spinner").style.display = "block"
    //-------------------------------------------------------
    ClearMessageNote();
    //js:   data:image/jpeg;base64,/9j/4AA
    //c#:   data:image;base64,/9j/4AA
    var substr = "base64,";
    if (fileBase64String != "") {
        var index = fileBase64String.indexOf(substr);

        if (index == -1) {
            return;
        }

        var imgBase64String = fileBase64String.substring(index + substr.length);
        if (imgBase64String != "") {
            const data = {
                Photo: imgBase64String,
                InfoType: "Photo"
            };

            fetchFunction("UpdateProfile", data).then(d => {
                if (d.Result == "OK") {
                    document.getElementById("lblPhotoMessage").innerHTML = "The Photo has been updated successfully.";
                    //----------------------------Hide Spinner------------------------------
                    document.getElementById("loader-spinner").style.display = "none"
                    //-------------------------------------------------------------------------
                }
            });
        }
    }
    else {
        document.getElementById("lblPhotoErrorMessage").innerHTML = "Please select a photo.";
        //----------------------------Hide Spinner------------------------------
        document.getElementById("loader-spinner").style.display = "none"
        //-------------------------------------------------------------------------
    }
}

function ClearMessageNote() {
    document.getElementById("lblPhotoErrorMessage").innerHTML = "";
    document.getElementById("lblPhotoMessage").innerHTML = "";

    document.getElementById("lblSuccessMsg").innerHTML = "";
    document.getElementById("lblErrorMsg").innerHTML = "";
}
