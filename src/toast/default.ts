import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toast default sample
 */
import { Toast, ToastCloseArgs} from '@syncfusion/ej2-notifications';

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toast component
    let toastObj: Toast = new Toast({
        position: {
            X: 'Right'
        },
        close: onclose,
        beforeOpen: onBeforeOpen,

    });

    let btnEleShow: HTMLElement = document.getElementById('toastBtnShow');
    let btnEleHide: HTMLElement = document.getElementById('toastBtnHide');

    document.onclick = (e: Event) => {
        if (e.target !== btnEleShow) {
            toastObj.hide('All');
        }
    };

    btnEleShow.onclick = () => {
        toastObj.show();
    };

    btnEleHide.onclick = () => {
        toastObj.hide('All');
    };

    function onclose(e : ToastCloseArgs): void {
      if (e.toastContainer.childElementCount === 0 ) {
          btnEleHide.style.display = 'none';
      }
    }

    function onBeforeOpen(): void {
        btnEleHide.style.display = 'inline-block';
    }

    //Render initialized Toast component
    toastObj.appendTo('#toast_default');
    setTimeout(
        () => {
            toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM-10:30 AM',
                icon: 'e-meeting'
            });
    },  200);
};