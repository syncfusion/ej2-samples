/**
 * Context Menu default sample
 */

import { ContextMenu, MenuAnimationSettings, BeforeItemRenderEventArgs, MenuItemModel,
ContextMenuModel } from '@syncfusion/ej2-navigations';
import { select, Browser } from '@syncfusion/ej2-base';

this.default = () => {
    let animationSettings: MenuAnimationSettings;
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

    let menuOptions: ContextMenuModel = {
        target: '#target',
        items: menuItems,
        animationSettings: animationSettings,
        beforeItemRender: (args: BeforeItemRenderEventArgs) => {
            if (args.data.text === 'Link') {
                args.item.classList.add('e-disabled');
            }
        }
    };

    let menuObj: ContextMenu = new ContextMenu(menuOptions, '#contextmenu');

    if (Browser.isDevice) {
        select('#target').textContent = 'Touch hold to open the ContextMenu';
        menuObj.animationSettings.effect = 'ZoomIn';
    } else {
        select('#target').textContent = 'Right click / Touch hold to open the ContextMenu';
        menuObj.animationSettings.effect = 'SlideDown';
    }
};