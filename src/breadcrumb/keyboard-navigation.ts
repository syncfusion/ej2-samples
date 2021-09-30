import { loadCultureFiles } from '../common/culture-loader';
import { Breadcrumb } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    new Breadcrumb({
        enableNavigation: false
     }, '#keyboard-navigation');
};
