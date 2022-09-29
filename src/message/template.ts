import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Message template sample
 */
import { Message } from '@syncfusion/ej2-notifications';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();
    let showButton: Button = new Button({ content: 'Show pull request', cssClass: "e-outline e-primary e-success msg-hidden" });
    showButton.appendTo('#btn');
    showButton.element.onclick = (): void => {
        msgTemplate.visible = true;
        showButton.element.classList.add('msg-hidden');
    }
    let msgTemplate: Message = new Message({
        severity: "Success",
        closed: () => {
            showButton.element.classList.remove('msg-hidden');
        }
    });
    msgTemplate.appendTo('#msg_template');

    let button: Button = new Button({ cssClass: 'e-link', content: 'Dismiss' });
    button.appendTo('#closeBtn');
    button.element.onclick = (): void => {
        msgTemplate.visible = false;
    }

    let commitButton: Button = new Button({ cssClass: 'e-link', content: 'View commit' });
    commitButton.appendTo('#commitBtn');
};
