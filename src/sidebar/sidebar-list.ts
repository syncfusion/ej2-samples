import { Sidebar } from '@syncfusion/ej2-navigations';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
/**
 * Sidebar-Menu sample
 */
this.default = (): void => {

    // Sidebar Initialization
    let sidebarInstance: Sidebar = new Sidebar({
        width: '250px',
        type: 'Over'
    });
    sidebarInstance.appendTo('#sidebar-menu');
    //end of Sidebar initialization

    let dataList: { [key: string]: Object }[] = [
        { text: 'Home' },
        { text: 'About' },
        { text: 'Careers' },
        { text: 'FAQs' },
        { text: 'Blog' },
        { text: 'Uses' },
        { text: 'Contact' }
    ];

    //Initialize the ListView component
    let listviewInstance: ListView = new ListView({
        dataSource: dataList,
        fields: { tooltip: 'text' },
        select: onSelect
    });
    listviewInstance.appendTo('#menulist');

    // open new tab
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/sidebar-list/index.html');

    // Expand the Sidebar
    document.getElementById('hamburger').onclick = (): void => {
        sidebarInstance.show();
    };

    // Close the Sidebar
    document.getElementById('close').onclick = (): void => {
        sidebarInstance.hide();
    };

    function onSelect(args: SelectEventArgs): void {
        //Listview select event handler
        (<HTMLElement>document.querySelector('.textArea')).textContent = args.text + ' Page Content';
        sidebarInstance.hide();
    }
};
