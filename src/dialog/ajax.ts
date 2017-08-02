import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { Ajax } from '@syncfusion/ej2-base';
/**
 * Ajax  Dialog sample
 */

this.default = () => {

    let ajax: Ajax = new Ajax('./src/dialog/twitter.html', 'GET', true);
    ajax.send().then();
    ajax.onSuccess = (data: string): void => {
        let dialogObj: Dialog = new Dialog({
            header: 'Twitter',
            showCloseIcon: true,
            width: '500px',
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen,
            close: dialogClose,
            content: data
        });
        dialogObj.appendTo('#dialog');
        document.getElementById('dialogBtn').focus();
        let button: Button = new Button({
        });
        button.appendTo('#dialogBtn');
        document.getElementById('dialogBtn').onclick = (): void => {
            dialogObj.show();
        };

        function dialogClose(): void {
            document.getElementById('dialogBtn').style.display = 'block';
        }
        function dialogOpen(): void {
            document.getElementById('dialogBtn').style.display = 'none';
        }
    };
};