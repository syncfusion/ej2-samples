import { loadCultureFiles } from '../common/culture-loader';
import { getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { BreadcrumbItemModel, Breadcrumb } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    let items: BreadcrumbItemModel[] = [
        {
            iconCss: 'e-icons e-home',
            url: "https://ej2.syncfusion.com/demos",
        },
        {
            text: "Components",
            url: "https://ej2.syncfusion.com/demos/#/material/grid/grid-overview",
        },
        {
            text: "Navigations",
            url: "https://ej2.syncfusion.com/demos/#/material/menu/default",
        },
        {
            text: "Breadcrumb",
            url: "./breadcrumb/default",
        }
    ];

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

    let activeItems: BreadcrumbItemModel[] = [
        {
            iconCss: 'e-icons e-home',
            url: "https://ej2.syncfusion.com/demos",
        },
        {
            text: "All Components",
            url: "https://ej2.syncfusion.com/demos/#/material/grid/grid-overview",
        },
        {
            text: "Breadcrumb",
            url: "./breadcrumb/default",
        }
    ];

    new Breadcrumb({
        items: items,
        enableNavigation: false
    }, '#default');

    new Breadcrumb({
        items: overflowItems,
        enableNavigation: false,
        maxItems: 3,
        separatorTemplate: '<span class="e-bicons e-arrow"></span>'
    }, '#overflow');

    new Breadcrumb({
        items: activeItems,
        enableNavigation: false,
        enableActiveItemNavigation: true
    }, '#active-item');
    
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
