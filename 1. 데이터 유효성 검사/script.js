const form = document.getElementById('form');
const username = document.getElementById('Username');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const password2 = document.getElementById('ConfirmPassword');

//Input error 메시지를 출력한다
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').innerText = message;   
}

//Input success 메시지를 출력한다
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Email이 유효한 형태로 작성되었는지 검사한다
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Email is not valid')
    }
}

//입력값의 길이를 검사한다
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${input.id} must be less than ${max} characters`);
    }
    else {
        showSuccess(input);
    }
}

//비밀번호의 일치 여부를 검사한다
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//필수 요소가 전부 작성되었는지 검사한다
function checkRequired(inputArr) {
    let isError = false;
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${input.id} is required`);
            isError = true;
        }
        else {
            showSuccess(input);
        }
    })
    return isError;
}

//버튼에 대한 이벤트 핸들러를 등록한다.
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})