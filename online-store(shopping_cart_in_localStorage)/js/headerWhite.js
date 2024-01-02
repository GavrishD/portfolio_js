const headerWhiteHTML = `
    <header class="header-white">
        <div class="header-container black">
            <button class="icon-mobile-menu"></button>
            <div class="header-logo logo-color"></div>
            <nav class="header-menu">
                <ul class="menu-list">
                    <li><a href="home.html">Shop</a></li>
                    <li><a href="home.html">Mainpage</a></li>
                    <li><a href="history.html">Our history</a></li>
                    <li><a href="catalog.html">All items</a></li>
                    <li><span>×</span></li>
                </ul>
            </nav>
            <div class="header-icons">
                    <button class="icon-shopping-basket" type="button"></button>
                    <button class="icon-fox" type="button"></button>
            </div>
        </div>
        <div class="header-userbag">
            <div class="cart-header">
                <span></span>
                <p>box</p>
                <div class="cart-title">Your Bag</div>
            </div>
            <div class="shopping-cart-empty">Shopping cart is empty</div>
            <div class="shopping-cards"></div>
            <div class="cart-footer">
                <button class="shop-button btn-bag" type="button">Checkout</button>
            </div>
        </div>
    </header>
`;
document.body.insertAdjacentHTML("afterbegin", headerWhiteHTML);
