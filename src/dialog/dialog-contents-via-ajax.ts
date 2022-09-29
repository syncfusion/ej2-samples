import { loadCultureFiles } from '../common/culture-loader';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { Ajax } from '@syncfusion/ej2-base';
/**
 * Ajax  Dialog sample
 */
let innerContent: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
    + 'Much like its previous counter part, the Spring Creators Update, the release is set to deliver more features to Windows 10'
    + ' for both developers and users with particular emphasis this time around on app modernization, mixed reality'
    + 'and game development and software updates. App modernization is the term Microsoft used in its press event to encompass the'
    + 'features that will affect most Windows 10 users and developers. The updates primarily serve to make using Windows 10';
(window as any).default = (): void => {
    loadCultureFiles();
    // Rendering Dialog on AJAX success
        let dialogObj: Dialog = new Dialog({
            header: '<img class="img1" src="src/dialog/images/2.png" alt="Microsoft roadmap">' + 'What’s Coming from Microsoft this Fall',
            showCloseIcon: true,
            width: '500px',
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen,
            close: dialogClose,
            content: innerContent,
            buttons: [{
                click: dlgButtonClick,
                buttonModel: { content: 'More Details', isPrimary: true }
            }]
        });
        dialogObj.appendTo('#dialog');
        document.getElementById('dialogBtn').focus();

        // Button has been created to open the Dialog
        let button: Button = new Button({
        });
        button.appendTo('#dialogBtn');
        document.getElementById('dialogBtn').onclick = (): void => {
            dialogObj.show();
        };

        function dlgButtonClick(): void {
            if (this.btnObj[0].properties.content === 'More Details') {
            // Request to load AJAX content
            let ajax: Ajax = new Ajax('./src/dialog/blog.html', 'GET', true);
            ajax.send().then();
             // Rendering Dialog on AJAX success
            ajax.onSuccess = (data: string): void => {
               dialogObj.setProperties ({content: data});
            };
            dialogObj.buttons = [{click: dlgButtonClick, buttonModel: { content: 'Less Details', isPrimary: true }}];
            } else {
                dialogObj.content = innerContent;
                dialogObj.buttons = [{click: dlgButtonClick, buttonModel: { content: 'More Details', isPrimary: true }}];
            }
        }
        // 'Open' Button will be shown, if Dialog is closed
        function dialogClose(): void {
            document.getElementById('dialogBtn').style.display = 'block';
        }

        // 'Open' Button will be hidden, if Dialog is opened
        function dialogOpen(): void {
            document.getElementById('dialogBtn').style.display = 'none';
        }
};