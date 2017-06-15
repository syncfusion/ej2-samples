import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Dialog sample
 */
this.default = () => {
    let alertDialogObj: Dialog = new Dialog({
        header: 'Low Battery',
        content: '<div>10% of battery remaining</div>',
        showCloseIcon: false,
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'Dismiss', cssClass: 'e-flat', isPrimary: true }
        }],
        closeOnEscape: false,
        target: document.getElementById('target'),
        width: '250px',
        animationSettings: { effect: 'None' },
        open: dialogOpen,
        close: dialogClose
    });
    alertDialogObj.appendTo('#alertDialog');
    document.getElementById('alertBtn').focus();
    alertDialogObj.show();

    let confirmDialogObj: Dialog = new Dialog({
        header: 'Delete Multiple Items',
        content: '<span>Are you sure you want to permanently delete all of these items?</span>',
        showCloseIcon: true,
        closeOnEscape: false,
        buttons: [{
            click: confirmDlgBtnClick,
            buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true }
        },
        { click: confirmDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'No' } }],
        width: '400px',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen,
        close: dialogClose
    });
    confirmDialogObj.appendTo('#confirmDialog');
    let promptDialogObj: Dialog = new Dialog({
        header: 'Join Wi-Fi network',
        showCloseIcon: false,
        closeOnEscape: false,
        buttons: [{
            click: promptDlgBtnClick, buttonModel: { content: 'Connect', cssClass: 'e-flat', isPrimary: true }
        },
        {
            click: promptDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'Cancel' }
        }],
        width: '330px',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen,
        close: dialogClose
    });
    promptDialogObj.appendTo('#promptDialog');
    let alertBtn: Button = new Button({});
    alertBtn.appendTo('#alertBtn');
    document.getElementById('alertBtn').onclick = (): void => {
        alertDialogObj.show();
        dialogOpen();
    };
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
    let promptBtn: Button = new Button({});
    promptBtn.appendTo('#promptBtn');
    document.getElementById('promptBtn').onclick = (): void => {
        promptDialogObj.show();
        dialogOpen();
    };
    function dialogClose(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.remove('e-btn-hide');
    }
    function dialogOpen(): void {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.add('e-btn-hide');
    }
    document.getElementById('password').addEventListener('focus', function (): void {
        this.parentElement.classList.add('e-input-focus');
    });
    document.getElementById('password').addEventListener('blur', function (): void {
        this.parentElement.classList.remove('e-input-focus');
    });
};