document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');
    const logoutButton = document.getElementById('logoutButton');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const works = JSON.parse(localStorage.getItem('works')) || [];

    // Load existing todos from localStorage
    function loadTodos() {
        works.forEach(work => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${work.todoText} <button class="delete-btn">delete</button>`;
            todoList.appendChild(listItem);
        });
    }

    // Call the function to load todos
    if (todoList) {
        loadTodos();
    }

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
                listItem.innerHTML = `${todoText} <button class="delete-btn">delete</button>`;
                todoList.appendChild(listItem);
                todoInput.value = '';

                works.push({ todoText });
                localStorage.setItem('works', JSON.stringify(works));
            }
        });
    }

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

    // Event delegation for delete buttons
    if (todoList) {
        todoList.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                clean(event);
            }
        });
    }
});

function clean(event) {
    const todoText = event.target.parentElement.innerText.replace('delete', '').trim();
    let works = JSON.parse(localStorage.getItem('works')) || [];
    works = works.filter(work => work.todoText !== todoText);
    localStorage.setItem('works', JSON.stringify(works));
    event.target.parentElement.remove();
}
