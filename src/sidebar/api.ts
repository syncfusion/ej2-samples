import { Button } from '@syncfusion/ej2-buttons';
import { Sidebar, SidebarType } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
enableRipple(false);

/**
 * Sidebar properties sample
 */
this.default = (): void => {

    // Sidebar initialization
    let sidebar: Sidebar = new Sidebar();
    sidebar.appendTo('#default-sidebar');


    // Toggle button for Sidebar open/close.
    let togglesidebar: Button = new Button({ cssClass: 'e-info', isToggle: true });
    togglesidebar.appendTo('#togglesidebar');

    // Toggle the Sidebar
    togglesidebar.element.onclick = (): void => {
        sidebar.toggle();
    };

    // Toggle button for Postion property
    let positionButton: Button = new Button({ cssClass: 'e-info', isToggle: true });
    positionButton.appendTo('#positionbutton');

    // Toggle button for closeOnDocumentClick property
    let documentclick: Button = new Button({ cssClass: 'e-info', isToggle: true });
    documentclick.appendTo('#documentclick');

    // Toggle button for backdrop property
    let backdrop: Button = new Button({ cssClass: 'e-info', isToggle: true });
    backdrop.appendTo('#backdrop');

    //Toggle button click event handler
    positionButton.element.onclick = (): void => {
        if (positionButton.element.classList.contains('e-active')) {
            positionButton.content = 'Left';
            sidebar.position = 'Right';
            document.getElementById('hamburger').classList.add('e-rtl');
        } else {
            positionButton.content = 'Right';
            sidebar.position = 'Left';
            document.getElementById('hamburger').classList.remove('e-rtl');
        }
    };

    documentclick.element.onclick = (): void => {
        if (documentclick.element.classList.contains('e-active')) {
            documentclick.content = 'False';
            //enable the closeOnDocumentClick property
            sidebar.closeOnDocumentClick = true;
        } else {
            documentclick.content = 'True';
            //disable the closeOnDocumentClick property
            sidebar.closeOnDocumentClick = false;
        }
    };

    backdrop.element.onclick = (): void => {
        if (backdrop.element.classList.contains('e-active')) {
            backdrop.content = 'False';
            //enable the backdrop property
            sidebar.showBackdrop = true;
        } else {
            backdrop.content = 'True';
            //disable the backdrop property
            sidebar.showBackdrop = false;
        }
    };

    let dropdownInstance: DropDownList = new DropDownList({
        //set the value by specifying the index
        index: 3,
        placeholder: 'Select a type',
        popupHeight: '200px',
        cssClass: 'right',
        // bind the change event
        change: onChange
    });
    dropdownInstance.appendTo('#types');

    // open new tab
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/api/index.html');

    // Close the Sidebar
    document.getElementById('close').onclick = (): void => {
        sidebar.hide();
    };

    //open the sidebar
    document.getElementById('hamburger').onclick = (): void => {
        sidebar.show();
    };

    //Dropdown list change event handler
    function onChange(args: ChangeEventArgs): any {
        sidebar.type = <SidebarType>args.value;
    }
};
