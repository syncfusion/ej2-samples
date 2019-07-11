import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar } from '@syncfusion/ej2-navigations';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * Sidebar Dock sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    // Sidebar initialization
    let dockBar: Sidebar = new Sidebar({
        width: '220px',
        dockSize: '72px',
        enableDock: true
    });
    dockBar.appendTo('#dockSidebar');

    //radio button initialization
    let leftbutton: RadioButton = new RadioButton({ label: 'Left', name: 'state', checked: true, change: positionChange });
    leftbutton.appendTo('#left');

    let rightbutton: RadioButton = new RadioButton({ label: 'Right', name: 'state', change: positionChange });
    rightbutton.appendTo('#right');

    //open new tab
    let URL: any = location.href.replace(location.search, '');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/docking-sidebar/index.html');

    function positionChange(args: any): void {
        dockBar.position = (args.event.target.id === 'left') ? 'Left' : 'Right';
    }

    //switch the expand and collapse state
    document.getElementById('toggle').onclick = (): void => {
        dockBar.toggle();
    };
};