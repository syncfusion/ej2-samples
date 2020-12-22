import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Resize Dialog sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the Resize Dialog
    let resizeDialogObj: Dialog = new Dialog({
        header: 'Resize Me',
        content: '<span>This is a dialog with resizable support.</span>',
        showCloseIcon: true, closeOnEscape: false, width: '300px',
        enableResize: true,
        resizeHandles: ['All'],
        allowDragging: true,
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen, close: dialogClose
    });
    resizeDialogObj.appendTo('#resizeDialog');

    // Create Button to open the resize Dialog
    let resizeBtn: Button = new Button({});
    resizeBtn.appendTo('#resizeBtn');
    document.getElementById('resizeBtn').onclick = (): void => {
        resizeDialogObj.show();
        dialogOpen();
    };

    // Buttons will be shown when Dialog is closed
    function dialogClose(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
    }
    // Buttons will be hidden when Dialog is opened
    function dialogOpen(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.add('e-btn-hide');
    }
};