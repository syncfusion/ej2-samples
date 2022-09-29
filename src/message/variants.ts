import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Message variant sample
 */
import { Message } from '@syncfusion/ej2-notifications';

(window as any).default = (): void => {
    loadCultureFiles();
    let msgDefault: Message = new Message({});
    msgDefault.appendTo('#msg_default');

    let msgInfo: Message = new Message({
        severity: "Info"
    });
    msgInfo.appendTo('#msg_info');

    let msgSuccess: Message = new Message({
        severity: "Success"
    });
    msgSuccess.appendTo('#msg_success');

    let msgWarning: Message = new Message({
        severity: "Warning"
    });
    msgWarning.appendTo('#msg_warning');

    let msgError: Message = new Message({
        severity: "Error"
    });
    msgError.appendTo('#msg_error');

    let msgDefaultOutlined: Message = new Message({
        variant: "Outlined"
    });
    msgDefaultOutlined.appendTo('#msg_default_outlined');

    let msgInfoOutlined: Message = new Message({
        severity: "Info",
        variant: "Outlined"
    });
    msgInfoOutlined.appendTo('#msg_info_outlined');

    let msgSuccessOutlined: Message = new Message({
        severity: "Success",
        variant: "Outlined"
    });
    msgSuccessOutlined.appendTo('#msg_success_outlined');

    let msgWarningOutlined: Message = new Message({
        severity: "Warning",
        variant: "Outlined"
    });
    msgWarningOutlined.appendTo('#msg_warning_outlined');

    let msgErrorOutlined: Message = new Message({
        severity: "Error",
        variant: "Outlined"
    });
    msgErrorOutlined.appendTo('#msg_error_outlined');

    let msgDefaultFilled: Message = new Message({
        variant: "Filled"
    });
    msgDefaultFilled.appendTo('#msg_default_filled');

    let msgInfoFilled: Message = new Message({
        severity: "Info",
        variant: "Filled"
    });
    msgInfoFilled.appendTo('#msg_info_filled');

    let msgSuccessFilled: Message = new Message({
        severity: "Success",
        variant: "Filled"
    });
    msgSuccessFilled.appendTo('#msg_success_filled');

    let msgWarningFilled: Message = new Message({
        severity: "Warning",
        variant: "Filled"
    });
    msgWarningFilled.appendTo('#msg_warning_filled');

    let msgErrorFilled: Message = new Message({
        severity: "Error",
        variant: "Filled"
    });
    msgErrorFilled.appendTo('#msg_error_filled');
};
