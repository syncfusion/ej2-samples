import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { Sidebar, SidebarType } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
enableRipple(false);

/**
 * Sidebar properties sample.
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Specifies the toggle button for Sidebar open/close.
    let togglesidebar: Button = new Button({ 
        cssClass: 'e-primary inline-element right',
        isToggle: true
    });
    togglesidebar.appendTo('#togglesidebar');

    //Specifies the position Toggle button for Sidebar open/close.
    let positionBtn: Button = new Button({ 
        cssClass: 'e-primary inline-element right',
        isToggle: true,
        content: "Left"
    });
    positionBtn.appendTo('#positionBtn');

    // Specifies the document Toggle button for Sidebar open/close.
    let docBtn: Button = new Button({ 
        cssClass: 'e-primary inline-element right',
        isToggle: true,
        content: "False",
    });
    docBtn.appendTo('#documentElement');

    // Specifies the document Toggle button for Sidebar open/close.
    let backDropElement: Button = new Button({ 
        cssClass: 'e-primary inline-element right',
        isToggle: true,
        content: "False",
    });
    backDropElement.appendTo('#backDropElement');

    //Defines the rendering code blocks for the Dropdown List component.
    let dropdownObj: DropDownList = new DropDownList({
        //set the value by specifying the index
        index: 3,
        popupHeight: "200px",
        cssClass: "e-textbox right",
        // bind the change event.
        change: OnChange
    });
    dropdownObj.appendTo('#types');

    //Initialization of Sidebar component. 
    let sidebarObj: Sidebar = new Sidebar({
        width: "220px",
        target: ".maincontent",
        closeOnDocumentClick: false,
        showBackdrop: false,

    })
    sidebarObj.appendTo("#apiSidebar");
    //Specifies the click event for hamburger.
    document.getElementById('hamburger').onclick = (): void => {
        ToggleBtnClick();
    };
    //Specifies the click event for position.
    document.getElementById('positionBtn').onclick = (): void => {
        PositionBtnClick();
    };
    //Specifies the click event for document click option.
    document.getElementById('documentElement').onclick = (): void => {
        DocBtnClick();
    };
    //Specifies the click event for document click option.
    document.getElementById('backDropElement').onclick = (): void => {
        BackBtnClick();
    };
    //Specifies the click event for sidebar close.
    document.getElementById('close').onclick = (): void => {
        sidebarObj.hide();
    };
    //Specifies the click event for sidebar close.
    document.getElementById('togglesidebar').onclick = (): void => {
        sidebarObj.toggle();
    };
    function BackBtnClick(): void {
        if (backDropElement.content == "True") {
            backDropElement.content = "False";
            sidebarObj.showBackdrop = false;
        } else {
            backDropElement.content = "True";
            sidebarObj.showBackdrop = true;
        }
    }
    function ToggleBtnClick(): void {
        sidebarObj.toggle();
    }
    function PositionBtnClick(): void {
        if (positionBtn.content == "Right") {
            positionBtn.content = "Left";
            sidebarObj.position = "Left";
        } else {
            positionBtn.content = "Right";
            sidebarObj.position = "Right";
        }
        sidebarObj.dataBind();
    }
    function DocBtnClick(): void {
        if (docBtn.content == "False") {
            docBtn.content = "True";
            sidebarObj.closeOnDocumentClick = true;
        } else {
            docBtn.content = "False";
            sidebarObj.closeOnDocumentClick = false;
        }
        sidebarObj.dataBind();
    }
    //Specifies the event handler for the dropdown list change event.
    function OnChange(args: ChangeEventArgs): void {
        sidebarObj.type = <SidebarType>args.value;
        sidebarObj.dataBind();
    }
};
