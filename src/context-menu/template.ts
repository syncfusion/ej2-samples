import { loadCultureFiles } from '../common/culture-loader';
/**
 * Context Menu default sample
 */

import { ContextMenu, MenuEventArgs, MenuItemModel,
ContextMenuModel } from '@syncfusion/ej2-navigations';
import { select, Browser } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();

    //ContextMenu items definition
    let menuItems: any = [
        {
            answerType: 'Selection',
            description: "Choose from options",
            iconCss: 'e-icons e-list-unordered'
        },
        {
            answerType: 'Yes / No',
            description: "Select Yes or No",
            iconCss: 'e-icons e-check-box',
        },
        {
            answerType: 'Text',
            description: "Type own answer",
            iconCss: 'e-icons e-caption',
            items: [
                {
                    answerType: 'Single line',
                    description: "Type answer in a single line",
                    iconCss: 'e-icons e-text-form'
                },
                {
                    answerType: 'Multiple line',
                    description: "Type answer in multiple line",
                    iconCss: 'e-icons e-text-wrap'
                }
            ]
        },
        {
            answerType: 'None',
            iconCss: 'e-icons e-mouse-pointer',
            description: "No answer required"
        },
    ];

    //ContextMenu model definition
    let menuOptions: ContextMenuModel = {
        target: '#contextmenutarget',
        items: menuItems,
        itemTemplate: "#cmenuTemplate",
        beforeOpen: (args: { element: HTMLElement }) => {
            if (args.element.classList.contains('e-ul')) {
                args.element.classList.add('e-contextMenu-template')
            }
        }
    };

    let menuObj: ContextMenu = new ContextMenu(menuOptions, '#contextmenu');

    if (Browser.isDevice) {
        select('#contextmenutarget').textContent = 'Right-click or touch and hold to open the Context Menu and select the answer type';
        menuObj.animationSettings.effect = 'ZoomIn';
    } else {
        select('#contextmenutarget').textContent = 'Right click/Touch hold to open the Context Menu and select the answer type';
        menuObj.animationSettings.effect = 'SlideDown';
    }
};