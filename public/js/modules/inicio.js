import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageInicio cargado.');

class PageInicio {

    static async renderTemplateCards(products) {
        const textoToRender = await fetch('/templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(textoToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }

    static async init () {
        console.log('PageInicio.init()');

        const products = await productController.getProducts();
        PageInicio.renderTemplateCards(products);
    
        console.log(`Se encontraron ${products.length} productos.`);

    }
}

export default PageInicio;

const containerSelector = '.cards-container';
const templateURL = 'templates/cards.hbs';
const productsURL = 'api/products/products.json';

async function httpGet(url, id = '') {
    try {
    const response = await fetch(url + id);
    if (!response.ok) {
        throw new Error('Error');
    }
    return await response.json();
    } catch (error) {
    console.error('ERROR ON GET', error);
    }
}

async function getTemplateText(templateURL) {
    try {
    const response = await fetch(templateURL);
    if (!response.ok) {
        throw new Error('Error');
    }
    return await response.text();
    } catch (error) {
    console.log('Error:', error);
    }
}

async function getProducts() {
    return await httpGet(productsURL);
}

async function renderCards(containerSelector) {
    try {
    const templateText = await getTemplateText(templateURL);
    const template = Handlebars.compile(templateText);
    const products = await getProducts();
    const renderedCards = template(products);
    document.querySelector(containerSelector).innerHTML = renderedCards;
    } catch (error) {
    console.error('Error:', error);
    }
}

getTemplateText(templateURL)