import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Dialog sample
 */

let rtlContent: string = '<div>انقر فوق موافق للمتابعة أو انقر فوق عدم الموافقة على إلغاء التثبيت والانتهاء.</div>';

this.default = () => {
    let dialogObj: Dialog = new Dialog({
        header: 'الحوار',
        content: rtlContent,
        showCloseIcon: true,
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'يوافق على', cssClass: 'e-flat', isPrimary: true }
        },
        {
            click: dlgButtonClick,
            buttonModel: { content: 'تعارض', cssClass: 'e-flat' }
        }],
        target: document.getElementById('target'),
        width: '300px',
        showOnInit: false,
        enableRtl: true,
        open: dialogOpen,
        close: dialogClose,
        animationSettings: { effect: 'Zoom' }
    });
    dialogObj.appendTo('#dialog');
    document.getElementById('dialogBtn').focus();
    dialogObj.show();
    let button: Button = new Button({
    });
    button.appendTo('#dialogBtn');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };
    function dlgButtonClick(): void {
        dialogObj.hide();
    }

    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }
    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }
};