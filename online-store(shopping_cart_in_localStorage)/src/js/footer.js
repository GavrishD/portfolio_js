const mainTag = document.querySelector("main");
const footerHTML = `
    <footer class="footer-other-pages">
        <div class="footer-container">
            <div class="footer-contacts">
                <img src="./src/img/footer/logo.png" alt="Foxminded">
                <p>Lorem ipsum dolor sit amet consectetur consectetur</p>
                <div class="number-tel">Call us : 8956 3254 7887</div>
                <div class="contacts-social">
                    <a href="" arial-label="Go to the store's Instagram page" class="icon-instagram"></a>
                    <a href="" arial-label="Go to the store's Telegram channel" class="icon-telegram"></a>
                    <a href="" arial-label="Go to the store's Twitter page" class="icon-twitter"></a>
                </div>
            </div>
            <div class="footer-items">
                <div class="footer-item">
                    <div class="item-title">Shop</div>
                    <ul>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div class="footer-item">
                    <div class="item-title">Products</div>
                    <ul>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div class="footer-item">
                    <div class="item-title">Collection</div>
                    <ul>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div class="footer-item">
                    <div class="item-title">Weekly updates</div>
                    <ul>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
                <div class="footer-item">
                    <div class="item-title">About us</div>
                    <ul>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">Lorem ipsum</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-rights">Storelogo, 2023 All rights reserved</div>
    </footer>
`;
mainTag.insertAdjacentHTML("afterend", footerHTML);