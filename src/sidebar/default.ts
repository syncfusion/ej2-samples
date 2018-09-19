import { RadioButton } from '@syncfusion/ej2-buttons';
import { Sidebar } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
/**
 * Default sample
 */
this.default = (): void => {

    // Sidebar Initialization
    let defaultSidebar: Sidebar = new Sidebar();
    defaultSidebar.appendTo('#default-sidebar');
    //end of Sidebar initialization

    //radio button initialization
    let leftbutton: RadioButton = new RadioButton({ label: 'Left', name: 'state', checked: true, change: positionChange });
    leftbutton.appendTo('#left');

    let rightbutton: RadioButton = new RadioButton({ label: 'Right', name: 'state', change: positionChange });
    rightbutton.appendTo('#right');

    //open new tab

    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/default/index.html');

    // Toggle(Open/Close) the Sidebar
    document.getElementById('toggle').onclick = (): void => {
        defaultSidebar.toggle();
    };

    // Close the Sidebar
    document.getElementById('close').onclick = (): void => {
        defaultSidebar.hide();
    };

    document.getElementById('hamburger').onclick = (): void => {
        defaultSidebar.show();
    };

    // change the Sidebar position
    function positionChange(args: any): void {
        defaultSidebar.position = (args.event.target.id === 'left') ? 'Left' : 'Right';
        if (args.event.target.id === 'right') {
            document.getElementById('hamburger').classList.add('e-rtl');
        }
        if (args.event.target.id === 'left') {
            document.getElementById('hamburger').classList.remove('e-rtl');
        }
    }

};
