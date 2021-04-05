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
    let menuItems: MenuItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'e-cm-icons e-cut'
        },
        {
            text: 'Copy',
            iconCss: 'e-cm-icons e-copy'
        },
        {
            text: 'Paste',
            iconCss: 'e-cm-icons e-paste',
            items: [
                {
                    text: 'Paste Text',
                    iconCss: 'e-cm-icons e-pastetext'
                },
                {
                    text: 'Paste Special',
                    iconCss: 'e-cm-icons e-pastespecial'
                }
            ]
        },
        {
            separator: true
        },
        {
            text: 'Link',
            iconCss: 'e-cm-icons e-link'
        },
        {
            text: 'New Comment',
            iconCss: 'e-cm-icons e-comment'
        }];

    //ContextMenu model definition
    let menuOptions: ContextMenuModel = {
        target: '#contextmenutarget',
        items: menuItems,
        // Event triggers while rendering each menu item where “Link” menu item is disabled
        beforeItemRender: (args: MenuEventArgs) => {
            if (args.item.text === 'Link') {
                args.element.classList.add('e-disabled');
            }
        }
    };

    let menuObj: ContextMenu = new ContextMenu(menuOptions, '#contextmenu');

    if (Browser.isDevice) {
        select('#contextmenutarget').textContent = 'Touch hold to open the ContextMenu';
        menuObj.animationSettings.effect = 'ZoomIn';
    } else {
        select('#contextmenutarget').textContent = 'Right click/Touch hold to open the ContextMenu';
        menuObj.animationSettings.effect = 'SlideDown';
    }
};