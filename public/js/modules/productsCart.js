fetch('api/products/productsCart.json')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(productsCart => {
        let htmlCartProductAdd = '';
        let subTotal = 0;
        let total = 0;

productsCart.forEach(product => {
    subTotal = product.price * product.amount;
    total += subTotal;
    htmlCartProductAdd += 
    
    `
    <tr class="productsCart">
        <td class="product__image"><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td>${product.amount}</td>
        <td>$${subTotal}</td>
        <td class="product__remove"><span>❌</span></td>
    </tr>
    `;
    });
    document.querySelector('.products-container').innerHTML = htmlCartProductAdd;
    document.querySelector('.product__cart-total').innerHTML = '$' + total;
    })
    .catch(error => {
    console.error('Error:', error);
});