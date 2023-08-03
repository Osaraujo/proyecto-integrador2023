import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');
/*
class PageAlta {

    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        PageAlta.loadTable();
        return deletedProduct;
    }

    // static getProductFromRow(row) {
    //     const rowCells = row.children;
    //     const product = {};
    //     for (const cell of rowCells) {
    //         if (cell.dataset.productProperty) {
    //             product[cell.dataset.productProperty] = cell.innerHTML;
    //         }
    //     }
    //     return product;
    // }

    // static async completeForm(e) {
    //     const row = e.target.closest('tr');
    //     const productToEdit = PageAlta.getProductFromRow(row);
    //     console.log('productToEdit:', productToEdit);
    // }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                return;
            }
            // if (e.target.classList.contains('btn-edit')) {
            //     PageAlta.completeForm(e);
            //     return;
            // }
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table-container');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static async init () {
        console.log('PageAlta.init()');

        PageAlta.prepareTable();
    }

}
*/
//export default PageAlta;

import productService from '/js/services/product.js';

console.warn('🆗: Módulo PageInicio cargado.');

class PageAlta {

    static async init () {
        console.log('PageAlta.init()');

        document.getElementById('btn-get-all').addEventListener('click', async e => {
            const products = await productService.getProducts();
            console.log(products);
        });
        
        document.getElementById('btn-get-one').addEventListener('click', async e => {
            const id = prompt('Ingresar id:');
            const product = await productService.getProduct(id);
            console.log(product);
        });

        document.getElementById('btn-delete').addEventListener('click', async e => {
            const id = prompt('Ingresar id:');
            const deletedProduct = await productService.deleteProduct(id);
            console.log(deletedProduct);
        });

        const inputId = document.getElementById('id');
        const inputName = document.getElementById('name');
        const inputDescription = document.getElementById('description');
        const inputPrice = document.getElementById('price');

        document.getElementById('btn-post').addEventListener('click', async e => {
            e.preventDefault();
            const product = {
                name: inputName.value,
                description: inputDescription.value,
                price: inputPrice.value,
            };
            const newProduct = await productService.saveProduct(product);
            // console.log(product);
            console.log(newProduct);
        });

        document.getElementById('btn-put').addEventListener('click', async e => {
            e.preventDefault();
            const id = inputId.value;
            const product = {
                name: inputName.value,
                description: inputDescription.value,
                price: inputPrice.value,
            };
            const updatedProduct = await productService.updateProduct(id, product);
            // console.log(product);
            console.log(updatedProduct);
        });

    }
    static productsTableContainer;

    static async deleteProduct(e) {
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const row = e.target.closest('tr');
        const _id = row.querySelector('td[data-product-property="_id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(_id);
        PageAlta.loadTable();
        return deletedProduct;
    }

    // static getProductFromRow(row) {
    //     const rowCells = row.children;
    //     const product = {};
    //     for (const cell of rowCells) {
    //         if (cell.dataset.productProperty) {
    //             product[cell.dataset.productProperty] = cell.innerHTML;
    //         }
    //     }
    //     return product;
    // }

    // static async completeForm(e) {
    //     const row = e.target.closest('tr');
    //     const productToEdit = PageAlta.getProductFromRow(row);
    //     console.log('productToEdit:', productToEdit);
    // }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('btn-delete')) {
                const deletedProduct = await PageAlta.deleteProduct(e);
                console.log('deletedProduct:', deletedProduct);
                return;
            }
            // if (e.target.classList.contains('btn-edit')) {
            //     PageAlta.completeForm(e);
            //     return;
            // }
        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;
    }

    static async loadTable() {
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos.`);
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table-container');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static async init () {
        console.log('PageAlta.init()');

        PageAlta.prepareTable();
    }
}

export default PageAlta;