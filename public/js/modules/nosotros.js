
console.warn('🆗: Módulo PageNosotros cargado.');

class PageNosotros {

    static async init () {
        console.log('PageNosotros.init()');
        console.log('.');
        console.log('..');
        console.log('...');
    }
}

export default PageNosotros;

function accordion() {
    const accordionTitles = document.querySelectorAll('.accordion-title');
    const accordionContents = document.querySelectorAll('.accordion-content--hidden');
    const toExpandBoxes = document.querySelectorAll('.to_expand_box');
    const iconOpenCloseSpans = document.querySelectorAll('.expand_box');

    function accordionToggle(contentElements, classOriginal, classNew) {
        contentElements.forEach((contentElement, index) => {
        accordionTitles[index].addEventListener('click', function() {
            contentElement.classList.toggle(classOriginal);
            contentElement.classList.toggle(classNew);
            this.classList.toggle('accordion-title--open');
            });
        });
    }
    accordionToggle(accordionContents, 'accordion-content--open', 'accordion-content--hidden');
    accordionToggle(iconOpenCloseSpans, 'expand_box', 'shrink_box');
    accordionToggle(toExpandBoxes, 'to_expand_box', 'to_shrink_box');
}

accordion();