const products = [
    { id: 1, title: "Alloy Rims 15\"", price: 45000, image: "https://sehgalmotors.pk/cdn/shop/files/1698928856014156_87693c7b-8c81-46f4-a988-2df1f9a9295a.jpg?v=1766229905" },
    { id: 2, title: "LED Underglow", price: 3500, image: "https://www.carzstore.pk/cdn/shop/files/rgb-halo-kits-underglow-the-ultimate-underglow-kit-6pc-choose-your-size-38326424338668_800x_494e8ace-6938-4967-ac24-770f89da3877_large.jpg?v=1704871365" },
    { id: 3, title: "Android Panel", price: 12000, image: "https://pakmotors.pk/wp-content/uploads/2022/06/Universal-7-Inch-Touch-Screen-Android-Lcd.webp" },
    { id: 4, title: "Body Kit", price: 65000, image: "https://static0.hotcarsimages.com/wordpress/wp-content/uploads/2021/01/lbw-gtr-e1612261018852.jpg?w=1200&h=628&fit=crop" },
    { id: 5, title: "Turbo Charger", price: 85000, image: "https://i.ytimg.com/vi/EKk8ldZ5CgM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLARv4oqebWRs_Nr83aNs4RRSEjJ1w" },
    { id: 6, title: "Spoiler", price: 7000, image: "https://img.vevorstatic.com/us%2FTYXWYLHJLHJD8ZQ27V0%2Fgoods_img-v2%2Fspoiler-m100-1.2.jpg?timestamp=1716807461000&format=webp&format=webp" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const initDashboard = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('welcomeMsg').innerText = `Hi, ${user.name}`;
    renderProducts(products);
    renderCart();
};

const renderProducts = (list) => {
    const grid = document.getElementById('productGrid');
    
    grid.innerHTML = list.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.title}">
            <h4>${p.title}</h4>
            <p>Rs. ${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
};

const handleSearch = () => {
    const query = document.getElementById('searchBar').value.toLowerCase();
    
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
};

const addToCart = (id) => {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartStorage();
};

const removeFromCart = (index) => {
    
    cart = cart.filter((_, i) => i !== index);
    updateCartStorage();
};

const updateCartStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

const renderCart = () => {
    const container = document.getElementById('cartItems');
    const totalMsg = document.getElementById('totalPrice');
    const countMsg = document.getElementById('cartCount');

    
    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <p>${item.title} (Rs. ${item.price})</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');


    const total = cart.reduce((acc, item) => acc + item.price, 0);
    totalMsg.innerText = total.toLocaleString();
    countMsg.innerText = cart.length;
};

const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};