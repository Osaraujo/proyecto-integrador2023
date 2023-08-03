
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
}

const main = new Main();
main.start();

const getId_Hash = () => location.hash ? location.hash.slice(2) : 'home';
const getUrl_Id = id => `templates/${id}.html`;
const loadTemplate = async (url, targetElement) => {
    try 
    {
        const response = await fetch(url);
        if (!response.ok) 
            {throw new Error('Network response was not ok');}
        const templateText = await response.text();
        document.querySelector(targetElement).innerHTML = templateText;

        if (url === 'templates/home.html') 
            {renderCards('.cards-container');}
        if (url === 'templates/about-us.html') 
            {accordion();}
    } catch (error) {
    document.querySelector(targetElement).innerHTML = '<h1>Error</h1><p>En este momento no es posible ver el contenido de esta página.</p>';
    }
};