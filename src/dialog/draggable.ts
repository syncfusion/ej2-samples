import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Draggable Dialog sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the confirmation Dialog
    let confirmDialogObj: Dialog = new Dialog({
        header: 'Drag Me!!!',
        content: '<span>This is a dialog with draggable support.</span>',
        showCloseIcon: true, closeOnEscape: false, width: '300px',
        allowDragging: true, isModal: true,
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen, close: dialogClose
    });
    confirmDialogObj.appendTo('#confirmDialog');

    // Create Button to open the confirmation Dialog
    let confirmBtn: Button = new Button({});
    confirmBtn.appendTo('#confirmBtn');
    document.getElementById('confirmBtn').onclick = (): void => {
        confirmDialogObj.show();
        dialogOpen();
    };

    function confirmDlgBtnClick(): void {
        confirmDialogObj.hide();
    }

    // Buttons will be shown when Dialog is closed
    function dialogClose(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
    }
    // Buttons will be hidden when Dialog is opened
    function dialogOpen(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.add('e-btn-hide');
    }
};