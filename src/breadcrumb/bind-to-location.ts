import { loadCultureFiles } from '../common/culture-loader';
import { Breadcrumb } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    new Breadcrumb({
        enableNavigation: false
    }, '#bind-to-location');

    new Breadcrumb({
        enableNavigation: false,
        url: "https://ej2.syncfusion.com/demos/breadcrumb/navigation"
    }, '#url-binding');
};
