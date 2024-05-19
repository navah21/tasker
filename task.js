function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const tick=document.getElementById("checklist")

    if (email && password ) {
    
        window.location.href = 'todo.html';
    } else {
        alert('Please fill all fields ');
    }
}
