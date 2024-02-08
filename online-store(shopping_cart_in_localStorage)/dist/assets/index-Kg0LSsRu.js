(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const c=document.querySelector.bind(document),b=c(".icon-mobile-menu"),S=c(".header-cart"),E=c(".cart-header span"),C=c(".header-userbag");c(".fox-items");const m=c(".shopping-cards"),p=c(".shopping-cart-empty");let a=[];localStorage.getItem("goods")&&(a=JSON.parse(localStorage.getItem("goods")),a.forEach(t=>q(t)),L());m.addEventListener("click",function(t){t.preventDefault();const e=t.target;let i;(e.dataset.action==="plus"||e.dataset.action==="minus")&&(i=e.closest(".counter-control").querySelector("[data-counter]")),e.dataset.action==="plus"&&(i.innerText=++i.innerText,g(t),u()),e.dataset.action==="minus"&&parseInt(i.innerText)>1&&(i.innerText=--i.innerText,g(t),u()),e.hasAttribute("data-action")&&e.closest(".shopping-cards")&&f(),localStorage.setItem("goods",JSON.stringify(a))});function g(t){const e=t.target;let n=e.closest(".counter-control").querySelector("[data-counter]");const r=e.closest("[data-id]").dataset.id;a.filter(function(s){s.id===r&&(s.counter=n.innerText)})}function T(t,e){const i=document.querySelector(`[data-id = '${e}']`);a=a.filter(n=>n.id!==e.toString()),localStorage.setItem("goods",JSON.stringify(a)),i.remove(),L(),f(),u(),t.stopPropagation()}function L(){p.classList.remove("invisible"),a.length&&p.classList.add("invisible")}I();function I(){document.querySelector(".header-cart").insertAdjacentHTML("beforeend",'<span class="cart-quantity"></span>')}u();function u(){const t=document.querySelector(".cart-quantity"),e=document.querySelectorAll(".product-card");let i=0;e.forEach(function(n){const o=n.querySelector("[data-counter]");i+=parseInt(o.innerText)}),t.innerText=i,i===0&&t.classList.add("invisible"),i>0&&t.classList.remove("invisible")}f();function f(){const t=document.querySelectorAll(".product-card"),e=document.querySelector(".cart-footer p span");let i=0,n=0;t.forEach(function(o){const r=o.querySelector("[data-counter]"),s=o.querySelector("[data-price]");n=parseInt(r.innerText)*parseInt(s.innerText),i+=n}),e.innerText=i,localStorage.setItem("goods",JSON.stringify(a))}function q(t){const e=`
        <div class="product-card" data-id="${t.id}">
            <div class="product-cart-content">
                <img src="${t.photo}" alt="Image of a fox for sale">
                <div class="cart-info">
                    <p>${t.name}</p>
                    <p>$<span data-price>${t.price}</span></p>
                </div>
            </div>
            <div class="product-cart-control">
                <div class="counter-control">
                    <div data-action="minus">-</div>
                    <div data-counter>${t.counter}</div>
                    <div data-action="plus">+</div>
                </div>
                <button id="${t.id}" type="button">Remove<span></span></button>
            </div>
        </div> 
    `;m.insertAdjacentHTML("afterbegin",e),m.querySelectorAll(".product-cart-control button").forEach(n=>{const o=n.id;n.addEventListener("click",r=>T(r,o))})}S.addEventListener("click",y);E.addEventListener("click",y);function y(t){t.target.closest(".header-cart,.cart-header span")&&(document.documentElement.classList.toggle("cart-open"),C.classList.toggle("visible"))}document.addEventListener("click",x);function x(t){t.target.closest(".icon-mobile-menu,.menu-list li,.menu-list li span")&&(document.documentElement.classList.toggle("menu-open"),b.classList.toggle("invisible"))}let v=document.querySelector(".menu-list"),d;v.onclick=function(t){let e=t.target.closest(".menu-list li");e&&v.contains(e)&&w(e)};function w(t){d&&d.classList.remove("active"),d=t,d.classList.add("active")}const l=document.querySelector.bind(document),O=l(".foxlife"),h=l("#emailInput");l(".input-error");l(".email-button");l(".email-form");window.addEventListener("scroll",function(){let t=window.pageYOffset;O.style.backgroundPositionY=t*.7+"px"});function N(t){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t)}document.addEventListener("submit",t=>{t.preventDefault();const e=l("#emailInput").value;N(e)?h.className="valid":h.className="invalid"});const P=document.querySelector("main"),$=`
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
`;P.insertAdjacentHTML("afterend",$);
