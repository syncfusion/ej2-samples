import { loadCultureFiles } from '../common/culture-loader';
import { Toolbar, Menu } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import * as dataSource from './menu-data.json';

/**
 * Menu - toolbar integration sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let menuTemplate: string = '<ul id="menu"></ul>';
    let searchTemplate: string = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" />'
        + '<span class="e-input-group-icon em-icons e-search"></span></div>';
    let ddbTemplate: string = '<button id="userDBtn">Andrew</button>';

    // Initialize Toolbar component
    new Toolbar(
        {
            created: create,
            items: [
                { template: menuTemplate },
                { template: searchTemplate, align: 'Right' },
                { template: ddbTemplate, align: 'Right' },
                { prefixIcon: 'e-shopping-cart', align: 'Right' }
            ]
        },
        '#shoppingtoolbar');


    function create(): void {
        // Initialize Menu component
        new Menu({ items: (dataSource as any).toolbarIntegrationData }, '#menu');

        // Initialize DropDownButton component
        new DropDownButton({ items: (dataSource as any).userData }, '#userDBtn');

        this.refreshOverflow();
    }
};
