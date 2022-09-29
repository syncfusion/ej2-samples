import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Message customization sample
 */
import { Message } from '@syncfusion/ej2-notifications';

(window as any).default = (): void => {
    loadCultureFiles();
    let msgLeft: Message = new Message({
        content: "Your license has been activated successfully",
        severity: "Success"
    });
    msgLeft.appendTo('#msg_content_left');

    let msgCenter: Message = new Message({
        content: "The license will expire today",
        cssClass: "e-content-center",
        severity: 'Warning'
    });
    msgCenter.appendTo('#msg_content_center');

    let msgRight: Message = new Message({
        content: "The license key is invalid",
        cssClass: "e-content-right",
        severity: 'Error'
    });
    msgRight.appendTo('#msg_content_right');

    let msgIcon: Message = new Message({
        cssClass: "custom"
    });
    msgIcon.appendTo('#msg_icon');
};
