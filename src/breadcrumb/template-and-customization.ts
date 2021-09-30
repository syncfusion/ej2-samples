import { loadCultureFiles } from '../common/culture-loader';
import { BreadcrumbItemModel, Breadcrumb, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    
    let items: BreadcrumbItemModel[] = [
        {
            text: "Cart"
        },
        {
            text: "Billing"
        },
        {
            text: "Shipping"
        },
        {
            text: "Payment"
        }
    ];

    let iconItems: BreadcrumbItemModel[] = [
        {
            text: "Program Files",
            iconCss: "e-bicons e-folder"
        },
        {
            text: "Commom Files",
            iconCss: "e-bicons e-folder"
        },
        {
            text: "Services",
            iconCss: "e-bicons e-folder"
        },
        {
            text: "Config.json",
            iconCss: "e-bicons e-file"
        }
    ];

    let specificTemplateItems: BreadcrumbItemModel[] = [
        {
            text: "Home",
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

    new Breadcrumb({
        items: items,
        cssClass: 'e-breadcrumb-chips',
        itemTemplate: '#chipTemplate'
    }, '#item-template');

    new Breadcrumb({
        items: specificTemplateItems,
        itemTemplate: '#specificItemTemplate',
        cssClass: 'e-specific-item-template'
    }, '#specific-item-template');

    new Breadcrumb({
        items: items,
        separatorTemplate: '<span class="e-icons e-arrow"></span>'
    }, '#separator-template');

    new Breadcrumb({
        items: items,
        cssClass: 'e-custom-breadcrumb',
        itemTemplate: '#customTemplate',
        separatorTemplate: '<div class="e-custom-separator"></div>'
    }, '#both-template');

    new Breadcrumb({
        items: iconItems
    }, '#icons');

    new Breadcrumb({
        items: iconItems,
        beforeItemRender: (args: BreadcrumbBeforeItemRenderEventArgs) => {
            if(args.item.text !== 'Program Files') {
                args.element.classList.add('e-disabled');
            }
        }
    }, '#disabled');
};
