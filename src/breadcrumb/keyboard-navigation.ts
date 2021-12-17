import { loadCultureFiles } from '../common/culture-loader';
import { getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Breadcrumb } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    new Breadcrumb({
        enableNavigation: false
     }, '#keyboard-navigation');

    // To refresh Breadcrumb control state when reset button clicked
    new Button({ cssClass: 'e-small' }, '#reset').element.onclick = () => {
        var breadcrumb = document.getElementById('keyboard-navigation');
        var breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
    };
};
