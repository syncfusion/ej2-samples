import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toast types sample
 */
import { Toast, ToastModel, ToastCloseArgs } from '@syncfusion/ej2-notifications';

/* tslint:disable:max-line-length  */

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toast component
    let toastObj: Toast = new Toast({
        position: {
            X: 'Right' },
        close: onclose,
        beforeOpen: onBeforeOpen
    });

    //Render initialized Toast component
    toastObj.appendTo('#toast_type');
    let toasts: ToastModel[] = [
        { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
        { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
        { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
        { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }];

    setTimeout(
        () => {
            toastObj.show(toasts[3]);
    },  200);

    let infoBtn: HTMLElement = document.getElementById('info_Toast');
    let warnBtn: HTMLElement = document.getElementById('warning_Toast');
    let successBtn: HTMLElement = document.getElementById('success_Toast');
    let errorBtn: HTMLElement = document.getElementById('error_Toast');

    document.onclick = (e: Event) => {
        if (e.target !== infoBtn && e.target !== warnBtn && e.target !== successBtn && e.target !== errorBtn   ) {
          toastObj.hide('All');
        }
    };

    let hideBtn: HTMLElement = document.getElementById('hideToast');

    function onclose (e: ToastCloseArgs): void {
     if (e.toastContainer.childElementCount === 0 ) {
         hideBtn.style.display = 'none';
     }
    }

    function onBeforeOpen (): void {
      hideBtn.style.display = 'inline-block';
    }

    hideBtn.onclick = () => {
        toastObj.hide('All');
    };
    infoBtn.onclick = () => {
        toastObj.show(toasts[3]);
    };
    warnBtn.onclick = () => {
        toastObj.show(toasts[0]);
    };
    successBtn.onclick = () => {
        toastObj.show(toasts[1]);
    };
    errorBtn.onclick = () => {
        toastObj.show(toasts[2]);
    };
};

/* tslint:enable:max-line-length  */