import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar, Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
enableRipple(true);
/**
 * Sidebar with menubar sample.
 */
(window as any).default = (): void => {
    loadCultureFiles();
    //Toolbar component template element specification.
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
    //Initialization of Toolbar component.
    let toolbarObj: Toolbar = new Toolbar({
        clicked: ToolbarCliked,
        items: [
            { prefixIcon: "icon-menu", tooltipText: "Menu" },
            { template: folderEle }
        ]
    });
    toolbarObj.appendTo("#menuToolbar");
    let sidebarMenu: Sidebar = new Sidebar({
        target: ".main-content",
        width: "220px",
        dockSize: "50px",
        enableDock: true,
        isOpen: true,
        type: 'Auto'
    });
    sidebarMenu.appendTo('#menuSidebar');
    // Defines the Main Menu Items. 
    let mainMenuItems: MenuItemModel[] = [
        {
            text: 'Overview',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Home' },
                { text: 'About' },
                { text: 'Contact' }
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
            text: 'Info',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Personal info' },
                { text: 'Contact info' }
            ]
        },
        {
            text: 'Comments',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'All Comments' },
                { text: 'Add Comments' },
                { text: 'Delete Comments' }
            ]
        },
        {
            text: 'Bookmarks',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'Show all bookmarks' },
                { text: 'Bookmark this item' }
            ]
        },
        {
            text: 'Users ',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Mobile User' },
                { text: 'Laptop User' },
                { text: 'Desktop User' }
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
        }
    ];
    // Initialization of main-menubar.
    let mainMenuObj: Menu = new Menu({ 
        items: mainMenuItems,
        orientation: 'Vertical',
        cssClass: 'dock-menu',
    }, "#dockMenu");
    // Specifies the event handler for the Toolbar clicked event.
    function ToolbarCliked(args: ClickEventArgs): void {
        if(args.item.tooltipText == "Menu") {
            sidebarMenu.toggle();
        }
    }
};
