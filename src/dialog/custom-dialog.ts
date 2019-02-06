import { loadCultureFiles } from '../common/culture-loader';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Dialog sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Render the alert Dialog 
    let alertDialogObj: Dialog = new Dialog({
        header: 'Low Battery',
        content: '<div>10% of battery remaining</div>',
        showCloseIcon: false,
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'Dismiss', isPrimary: true }
        }],
        closeOnEscape: false, width: '250px', visible: false,
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen, close: dialogClose
    });
    alertDialogObj.appendTo('#alertDialog');
    document.getElementById('alertBtn').focus();
    // Render the confirmation Dialog
    let confirmDialogObj: Dialog = new Dialog({
        header: 'Delete Multiple Items',
        visible: false,
        content: '<span>Are you sure you want to permanently delete these items ?</span>',
        showCloseIcon: true, closeOnEscape: false, width: '400px',
        buttons: [{
            click: confirmDlgBtnClick,
            buttonModel: { content: 'Yes', isPrimary: true }
        },
        { click: confirmDlgBtnClick, buttonModel: { content: 'No' } }],
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen, close: dialogClose
    });
    confirmDialogObj.appendTo('#confirmDialog');
    // Render the prompt Dialog 
    let promptDialogObj: Dialog = new Dialog({
        header: 'Join Wi-Fi network',
        visible: false,
        showCloseIcon: false, closeOnEscape: false,
        buttons: [{
            click: promptDlgBtnClick, buttonModel: { content: 'Connect', isPrimary: true }
        },
        {
            click: promptDlgBtnClick, buttonModel: { content: 'Cancel' }
        }],
        width: '330px',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen, close: dialogClose
    });
    promptDialogObj.appendTo('#promptDialog');
    // Create Button to open the alert Dialog
    let alertBtn: Button = new Button({});
    alertBtn.appendTo('#alertBtn');
    document.getElementById('alertBtn').onclick = (): void => {
        alertDialogObj.show();
        dialogOpen();
    };
    // Create Button to open the confirmation Dialog
    let confirmBtn: Button = new Button({});
    confirmBtn.appendTo('#confirmBtn');
    document.getElementById('confirmBtn').onclick = (): void => {
        confirmDialogObj.show();
        dialogOpen();
    };
    function alertDlgBtnClick(): void {
        alertDialogObj.hide();
    }
    function confirmDlgBtnClick(): void {
        confirmDialogObj.hide();
    }
    function promptDlgBtnClick(): void {
        promptDialogObj.hide();
    }
    // Create Button to open the prompt Dialog
    let promptBtn: Button = new Button({});
    promptBtn.appendTo('#promptBtn');
    document.getElementById('promptBtn').onclick = (): void => {
        promptDialogObj.show();
        dialogOpen();
    };
    // Buttons will be shown when Dialog is closed
    function dialogClose(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.remove('e-btn-hide');
    }
    // Buttons will be hidden when Dialog is opened
    function dialogOpen(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.add('e-btn-hide');
    }
    // Styles will be added, while password field of prompt Dialog has been focused
    document.getElementById('password').addEventListener('focus', function (): void {
        this.parentElement.classList.add('e-input-focus');
    });
    // Styles will be removed, while password field of prompt Dialog has been focused out
    document.getElementById('password').addEventListener('blur', function (): void {
        this.parentElement.classList.remove('e-input-focus');
    });
};