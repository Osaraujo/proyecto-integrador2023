const btnCart = document.querySelector('.btn-cart-toggle');
const cartContainer = document.querySelector('.cart-container');
const cartClose = document.querySelector('.icon-cart-close');
const nameProduct = document.querySelectorAll('.nameProduct');
const removeProduct = document.querySelectorAll('.product__remove');

let showCart = false;

function openCart() {
    btnCart.classList.add('btn-pressed');
    cartContainer.classList.add('cart-container--open');
    showCart = true;
}
function closeCart() {
    btnCart.classList.remove('btn-pressed');
    cartContainer.classList.remove('cart-container--open');
    showCart = false;
}

btnCart.addEventListener('click', function (ev) {
    if (!showCart) {
        openCart();
        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('click', handleOutsideClick);
    } else {
        closeCart();
        window.removeEventListener('keydown', handleEscapeKey);
        window.removeEventListener('click', handleOutsideClick);
    }
});
cartClose.addEventListener('click', function () {
    closeCart();
});
