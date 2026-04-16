const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if(!name || !email || !password) return alert("Please fill all fields!");

    
    if(users.some(u => u.email === email)) return alert("Email already exists!");

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Account created successfully!");
    window.location.href = 'index.html';
};

const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

 
    const user = users.find(u => u.email === email && u.password === pass);

    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert("Invalid credentials!");
    }
};