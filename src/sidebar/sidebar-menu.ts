import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
enableRipple(true);
/**
 * Sidebar with menubar sample
 */

// Sidebar initialization
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let sidebarMenu: Sidebar = new Sidebar({
        width: '220px',
        mediaQuery: '(min-width: 600px)',
        target: '.main-content',
        dockSize: '50px',
        enableDock: true
    });
    sidebarMenu.appendTo('#sidebar-menu');
    // Toggle the Sidebar
    document.getElementById('hamburger').onclick = (): void => {
        sidebarMenu.toggle();
    };
    // open new tab
    let URL: any = location.href.replace(location.search, '');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-menu/index.html');
    // MainMenuItems definition
    let mainMenuItems: MenuItemModel[] = [
        {
            text: 'Overview',
            iconCss: 'icon-globe icon',
            items: [
                { text: 'All Data' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Notification',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'Message' },
                { text: 'Facebook' },
                { text: 'Twitter' }
            ]
        },
        {
            text: 'Comments',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'Category1' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Bookmarks',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'All Comments' },
                { text: 'Add Comments' },
                { text: 'Delete Comments' }
            ]
        },
        {
            text: 'Images',
            iconCss: 'icon-picture icon',
            items: [
                { text: 'Add Name' },
                { text: 'Add Mobile Number' },
                { text: 'Add Imaage' },
            ]
        },
        {
            text: 'Users ',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Mobile1' },
                { text: 'Mobile2' },
                { text: 'Telephone' }
            ]
        },
        {
            text: 'Settings',
            iconCss: 'icon-eye icon',
            items: [
                { text: 'Change Profile' },
                { text: 'Add Name' },
                { text: 'Add Details' }
            ]
        },
        {
            text: 'Info',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Facebook' },
                { text: 'Mobile' },
            ]
        }
    ];
    // main-menubar initialization
    let mainMenuObj: Menu =
        new Menu({ items: mainMenuItems, orientation: 'Vertical', cssClass: 'dock-menu' }, '#main-menubar');
          // AccountMenuItem definition
    let accountMenuItem: MenuItemModel[] = [
        {
            text: 'Account',
            items: [
                { text: 'Profile' },
                { text: 'Sign out' },
            ]
        }
    ];
    // horizontal-menubar initialization
    let horizontalMenuobj: Menu =
        new Menu({ items: accountMenuItem, orientation: 'Horizontal', cssClass: 'dock-menu' }, '#horizontal-menubar');
    };
