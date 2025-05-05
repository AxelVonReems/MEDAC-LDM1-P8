// Prevention of multiple submits
$('#signupForm').on('submit', function(e) {
    if ($(this).hasClass('form-submitted')) {
        e.preventDefault();
    } else {
        $(this).addClass('form-submitted');
        $(this)[0].reset();
        $('#username, #email, #password, #password2, #bdate').css('background-color', defaultInputBackgroundColor);
    }
});

// Checking for all fields to be correct before submitting
let formValid = {
    username: false,
    email: false,
    password: false,
    password2: false,
    bdate: false,
    gender: false,
    terms: false
};

function checkValidation() {
    if (
        formValid.username &&
        formValid.email &&
        formValid.password &&
        formValid.password2 &&
        formValid.bdate &&
        formValid.gender &&
        formValid.terms
    ) {
        $('#signupButton').removeAttr('disabled');
    } else {
        $('#signupButton').attr('disabled', true);
    }
}

// Error message handling functions
function showMsg(errorID, message) {
    $(errorID).text(message).show();
}

function hideMsg(errorID) {
    $(errorID).hide();
}

// Variable for the default background color
const defaultInputBackgroundColor = '#92DCE5';

// Function to update input field background color based on validity and emptiness
function updateInputValidity(inputId, isValid, isEmpty) {
    if (isEmpty) {
        $(`#${inputId}`).css('background-color', defaultInputBackgroundColor);
    } else if (isValid) {
        $(`#${inputId}`).css('background-color', '#aaffaa');
    } else {
        $(`#${inputId}`).css('background-color', '#ffdddd');
    }
}

// Full name validation
$('#username').on('input', function() {
    const username = $(this).val();
    const usernameErrorID = '#username-error';
    const isEmpty = username === '';
    let isValid = false;

    if (username.length > 0 && username.length < 3) {
        showMsg(usernameErrorID, 'Full name must be at least 3 characters long');
        formValid.username = false;
    } else {
        hideMsg(usernameErrorID);
        formValid.username = true;
        isValid = true;
    }
    updateInputValidity('username', isValid, isEmpty);
    checkValidation();
});

// Email validation
$('#email').on('input', function() {
    const email = $(this).val();
    const emailErrorID = '#email-error';
    const regex = /^(?!.*\.\.)[a-zA-Z0-9_\.\-\+]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,}$/;
    const isEmpty = email === '';
    let isValid = false;

    if (isEmpty) {
        hideMsg(emailErrorID);
        formValid.email = false;
    } else if (email.length > 0 && email.length < 5) {
        showMsg(emailErrorID, 'Full name must be at least 5 characters long');
        formValid.email = false;
    } else if (!regex.test(email)) {
        showMsg(emailErrorID, 'Enter a valid e-mail');
        formValid.email = false;
    } else {
        hideMsg(emailErrorID);
        formValid.email = true;
        isValid = true;
    }
    updateInputValidity('email', isValid, isEmpty);
    checkValidation();
});

// Password validation
$('#password').on('input', function() {
    const password = $(this).val();
    const passwordErrorID = '#password-error';
    const isEmpty = password === '';
    let isValid = false;

    if (password.length > 0 && password.length < 6) {
        showMsg(passwordErrorID, 'Password must be at least 6 characters long');
        formValid.password = false;
    } else {
        hideMsg(passwordErrorID);
        formValid.password = true;
        isValid = true;
    }
    updateInputValidity('password', isValid, isEmpty);
    checkValidation();
});

// Confirm password validation
$('#password2').on('input', function() {
    const password2 = $(this).val();
    const password2ErrorID = '#password2-error';
    const isEmpty = password2 === '';
    let isValid = false;

    if (isEmpty) {
        hideMsg(password2ErrorID);
        formValid.password2 = false;
    } else if (password2 != $('#password').val()) {
        showMsg(password2ErrorID, 'Passwords doesn\'t match');
        formValid.password2 = false;
    } else {
        hideMsg(password2ErrorID);
        formValid.password2 = true;
        isValid = true;
    }
    updateInputValidity('password2', isValid, isEmpty);
    checkValidation();
});

// Date validation
function isAtLeast18(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

$('#bdate').on('input', function() {
    const bdate = $(this).val();
    const bdateErrorID = '#bdate-error';
    const isEmpty = bdate === '';
    let isValid = false;

    if (isEmpty) {
        hideMsg(bdateErrorID);
        formValid.bdate = false;
    } else if (!bdate) {
        showMsg(bdateErrorID, 'Please enter your birth date.');
        formValid.bdate = false;
    }

    if (isEmpty) {
        hideMsg(bdateErrorID);
        formValid.bdate = false;
    } else if (!isAtLeast18(bdate)) {
        showMsg(bdateErrorID, 'You must be at least 18 years old');
        formValid.bdate = false;
    } else {
        hideMsg(bdateErrorID);
        formValid.bdate = true;
        isValid = true;
    }
    updateInputValidity('bdate', isValid, isEmpty);
    checkValidation();
});

// Gender validation
function validateGender() {
    const gender = $("input[name='gender']:checked");
    const genderErrorID = '#gender-error';

    if (gender.length === 0) {
        showMsg(genderErrorID, 'You must indicate your gender.');
        formValid.gender = false;
    } else {
        hideMsg(genderErrorID);
        formValid.gender = true;
    }
    checkValidation();
}
$("input[name='gender']").on('change', validateGender);

// TOS validation
function validateTerms() {
    const terms = $('#terms');
    const termsErrorID = '#terms-error';

    if (!terms.is(':checked')) {
        showMsg(termsErrorID, 'You must accept the user agreement.');
        formValid.terms = false;
    } else {
        hideMsg(termsErrorID);
        formValid.terms = true;
    }
    checkValidation();
}
$('#terms').on('change', validateTerms);

// Trigger gender and TOS validation when user tries to press "Sign-up" button
// before selecting a gender and accepting terms and conditions
$('#signupButton').on('mouseenter', function() {
    validateGender();
    validateTerms();
});

// Showing message on successful sign up
$('#signupButton').on('click', function() {
    if (
        formValid.username &&
        formValid.email &&
        formValid.password &&
        formValid.password2 &&
        formValid.bdate &&
        formValid.gender &&
        formValid.terms
    ) {
        $('#signupMessage').show();
    }
});