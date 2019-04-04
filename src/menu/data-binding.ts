import { loadCultureFiles } from '../common/culture-loader';
import { Menu } from '@syncfusion/ej2-navigations';
import * as dataSource from './menu-data.json';

/**
 * Menu data binding sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    // Menu initialization
    new Menu({ items: (dataSource as any).dataBinding }, '#menu');
};
