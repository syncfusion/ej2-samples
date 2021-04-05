import { Menu, MenuModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { closest } from '@syncfusion/ej2-base';
import * as dataSource from './menu-data.json';

/**
 * Scrollable Menu sample
 */
(window as any).default = () => {
    // Menu model definition
    let menuOptions: MenuModel = {
        items: (dataSource as any).scrollableData,
        cssClass: 'e-custom-scroll',
        // Allows to enable the scroll option
        enableScrolling: true,
        // Increased duration for smooth animation.
        animationSettings: { duration: 800 },
        beforeOpen: (args: BeforeOpenCloseMenuEventArgs): void => {
            // Restricting sub menu wrapper height
            if (args.parentItem.text === 'Appliances') {
                (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height = '320px';
            }
            if (args.parentItem.text === 'Mobile') {
                (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height = '260px';
            }
        }
    };

    // Menu initialization
    new Menu(menuOptions, '#menu');
};
