const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

// show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error'; //className을 바꿈으로서 css에서 hidden -> visible 
    const small = formControl.quertSelector('small');
    small.innerText = message;
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(username.value === ''){
        showError(username, '이름을 입력해주세요');
    } else {
        showSuccess(username);
    }
});