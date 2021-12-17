import { loadCultureFiles } from '../common/culture-loader';
import { getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { BreadcrumbItemModel, Breadcrumb } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    let overflowItems: BreadcrumbItemModel[] = [
        {
            text: "Home",
            url: "./"
        },
        {
            text: "Breadcrumb",
            url: "./breadcrumb"
        },
        {
            text: "Default",
            url: "./breadcrumb/default"
        },
        {
            text: "Icons",
            url: "./breadcrumb/icons"
        },
        {
            text: "Navigation",
            url: "./breadcrumb/navigation"
        },
        {
            text: "Overflow",
            url: "./breadcrumb/overflow"
        }
    ];

    new Breadcrumb({
        items: overflowItems,
        maxItems: 3,
        overflowMode: 'Hidden',
        enableNavigation: false
    }, '#default-mode');

    new Breadcrumb({
        items: overflowItems,
        maxItems: 3,
        overflowMode: 'Menu',
        enableNavigation: false
    }, '#menu-mode');

    new Breadcrumb({
        items: overflowItems,
        maxItems: 3,
        overflowMode: 'Collapsed',
        enableNavigation: false
    }, '#collapsed-mode');

    new Breadcrumb({
        items: overflowItems,
        overflowMode: 'Wrap',
        enableNavigation: false
    }, '#wrap-mode');

    new Breadcrumb({
        items: overflowItems,
        overflowMode: 'Scroll',
        enableNavigation: false
    }, '#scroll-mode');

    // To refresh all Breadcrumb control state when reset button clicked
    new Button({ cssClass: 'e-small' }, '#reset').element.onclick = () => {
        var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
        for (var i = 0; i < breadcrumbs.length; i++) {
            breadcrumb = breadcrumbs[i];
            breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
            breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length - 1].text;
        }
    };
};
