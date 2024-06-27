document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    const logoutButton = document.getElementById('logoutButton');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Signup form validation
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('signupUsername').value.trim();
            const password = document.getElementById('signupPassword').value.trim();

            if (username === '' || password === '') {
                alert('Please fill in all fields.');
                return;
            }

            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        });
    }

    // Login form validation
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                sessionStorage.setItem('loggedInUser', username);
                window.location.href = 'todo.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Todo form submission
    if (todoForm) {
        if (!sessionStorage.getItem('loggedInUser')) {
            window.location.href = 'login.html';
        }

        todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const todoInput = document.getElementById('todoInput');
            const todoText = todoInput.value.trim();

            if (todoText !== '') {
                const listItem = document.createElement('li');
                listItem.innerHTML = todoText + "<button onclick='clean(event)'>delete</button>";
                todoList.appendChild(listItem);
                todoInput.value = '';}           
        });
    }

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});

function clean(event){
    event.target.parentElement.remove()
}