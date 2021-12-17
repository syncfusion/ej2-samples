import { loadCultureFiles } from '../common/culture-loader';
import { Breadcrumb, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();
    
    new Breadcrumb({
        enableNavigation: false
    }, '#bind-to-location');

    var url = 'https://ej2.syncfusion.com/demos/#/bootstrap5/breadcrumb/bind-to-location.html',
        themeName = url.split('/')[5];
    new Breadcrumb({
        url: url,
        beforeItemRender: (args: BreadcrumbBeforeItemRenderEventArgs) => {
            if (args.item.text == 'demos') {
                args.item.url = args.item.url + '/#/' + themeName;
            }
            else if (args.item.text == 'breadcrumb') {
                args.item.url = 'https://ej2.syncfusion.com/demos/#/bootstrap5/breadcrumb/default.html'
            }
            else if (args.item.text == '#' || args.item.text == themeName) {
                args.cancel = true;
            }
        }
    }, '#url-binding');

    // To refresh Breadcrumb control state when reset button clicked
    new Button({ cssClass: 'e-small' }, '#reset').element.onclick = () => {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
};
