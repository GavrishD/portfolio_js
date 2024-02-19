const headerWhiteHTML = `
    <header class="header-white">
        <div class="header-container black">
            <button class="icon-mobile-menu"></button>
            <div class="header-logo logo-color"></div>
            <nav class="header-menu">
                <ul class="menu-list">
                    <li><a href="index.html">Shop</a></li>
                    <li><a href="index.html">Mainpage</a></li>
                    <li><a href="history.html">Our history</a></li>
                    <li><a href="main.html">All items</a></li>
                    <li><span>×</span></li>
                </ul>
            </nav>
            <div class="header-icons">
                <button class="header-cart" type="button">
                    <span class="icon-cart black" type="button"></span>
                </button>
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
                <div class="cart-title small">Total:</div>
                <p>$<span>0</span></p>
                <button class="shop-button btn-bag" type="button">Checkout</button>
            </div>
        </div>
    </header>
`;
document.body.insertAdjacentHTML("afterbegin", headerWhiteHTML);
