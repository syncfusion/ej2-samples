import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Message default sample
 */
import { Message } from '@syncfusion/ej2-notifications';

(window as any).default = (): void => {
    loadCultureFiles();
    let msgDefault: Message = new Message({
        content: "Editing is restricted"
    });
    msgDefault.appendTo('#msg_default');

    let msgInfo: Message = new Message({
        content: "Please read the comments carefully",
        severity: "Info"
    });
    msgInfo.appendTo('#msg_info');

    let msgSuccess: Message = new Message({
        content: "Your message has been sent successfully",
        severity: "Success"
    });
    msgSuccess.appendTo('#msg_success');

    let msgWarning: Message = new Message({
        content: "There was a problem with your network connection",
        severity: "Warning"
    });
    msgWarning.appendTo('#msg_warning');

    let msgError: Message = new Message({
        content: "A problem occurred while submitting your data",
        severity: "Error"
    });
    msgError.appendTo('#msg_error');
};
