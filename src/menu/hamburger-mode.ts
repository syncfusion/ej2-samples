import { loadCultureFiles } from '../common/culture-loader';
import { Menu, MenuModel } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './menu-data.json';
// custom code start
import { Browser, select } from '@syncfusion/ej2-base';
// custom code end

/**
 * Hamburger Menu sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    // Menu model definition 
    let menuOptions: MenuModel = {
        // custom code start
        created: () => {
            if (Browser.isDevice) {
                select('.property-section').remove();
                select('#layoutcontainer').removeAttribute('class');
                select('#layoutcontainer').removeAttribute('id');
                (select('#menu') as HTMLElement).style.height = '363px';
            }
        },
        // custom code end
        items: (dataSource as any).hamburgerData,
        //Enable the hamburger mode.
        hamburgerMode: true,
        //Enable the item show on click.
        showItemOnClick: true,
        // Increased duration for smooth animation.
        animationSettings: { duration: 800 }
    };

    // Menu initialization
    let menuObj: Menu = new Menu(menuOptions, '#menu');

    // DropDownList initialization
    new DropDownList(
        {
            value: 'mobile',
            popupHeight: '200px',
            change: (args: ddlChange) => {
                let container: HTMLElement = document.querySelector('#layoutcontainer');
                switch (args.value) {
                    case 'mobile':
                    case 'tablet':
                        menuObj.close();
                        container.classList.add('deviceLayout');
                        container.classList[args.value === 'mobile' ? 'remove' : 'add']('tabletview');
                        menuObj.element.parentElement.classList[args.value === 'mobile' ? 'remove' : 'add']('e-menu-icon-left');
                        menuObj.hamburgerMode = true;
                        menuObj.showItemOnClick = true;
                    break;
                    case 'desktop':
                        container.classList.remove('deviceLayout', 'tabletview');
                        menuObj.hamburgerMode = false;
                        menuObj.showItemOnClick = false;
                    break;
                }
            }
        },
        '#ddlViewMode');
};
