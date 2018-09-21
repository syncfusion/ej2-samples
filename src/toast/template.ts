/**
 *  Toast template sample
 */
import { Toast, ToastOpenArgs, ToastCloseArgs, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { compile, Browser, closest } from '@syncfusion/ej2-base';

/* tslint:disable */

this.default = () => {
    //Initialize Toast component with HTML template
    let toastObj: Toast = new Toast({
        template: document.getElementById('template_toast_ele').innerHTML,
        position: !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' },
        target: !Browser.isDevice ? document.body : '#toast_template_target',
        extendedTimeout: 0,
        timeOut: 120000,
        open: onOpenToast, close: onToastClose, beforeOpen: onToastBeforeOpen
    });
    //Render initialized Toast component
    toastObj.appendTo('#toast_template');


    // Toast Mail DataSource
    let toastData: Object[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: './src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: './src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: './src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: './src/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: './src/toast/resource/michael.png' },
        }];

    //Toast Dynamic Template Initialization
    let toastObjEmail: Toast = new Toast({
        position: { X: 'Right' },
        newestOnTop: true,
        showCloseButton: true,
        timeOut: 0,
        animation: {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        },
    });
    //Render initialized Toast component
    toastObjEmail.appendTo('#toast_custom');
    let toastFlag: number = 0;

    // Toast Dynamic template with TemplateEngine compiler
    let cardTemplateFn: (data: object) => HTMLCollection = compile(document.getElementById('toastEmail_template').innerHTML.trim());

    setTimeout(
        () => {
            toastObjEmail.show({ template: cardTemplateFn(toastData[toastFlag])[0].outerHTML });
            ++toastFlag;
        }, 200);

    let btnEle: HTMLElement = document.getElementById('toast_mail_remainder');
    let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
    let snoozeFlag: boolean = false;

    document.onclick = (e: Event) => {
        let closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;

        if (e.target !== alarm && e.target !== btnEle && closestEle !== toastObj.element && closestEle !== toastObjEmail.element) {
            toastObj.hide('All');
            toastObjEmail.hide('All');
        }
    };

    btnEle.onclick = () => {
        toastObjEmail.show({ template: cardTemplateFn(toastData[toastFlag])[0].outerHTML , cssClass : toastFlag == 2 ? "camden" : toastFlag == 3 ? "chase": null });
        ++toastFlag;
        if (toastFlag === (toastData.length)) {
            toastFlag = 0;
        }
    };
    alarm.onclick = () => {
        toastObj.show();
    };
    let listObj: DropDownList = new DropDownList({
        // set the placeholder to DropDownList input element
        placeholder: 'Select a snooze time',
        // set the height of the popup element
        popupHeight: '200px',
        change: listChange
    });

    function listChange(e: ChangeEventArgs): void {
        snoozeFlag = true;
        toastObj.hide();
    }

    // Toast Open Event Function
    function onOpenToast(e: ToastOpenArgs): void {
        let dismisBtn: HTMLElement = document.getElementById('dismiss');
        let snooze: HTMLElement = document.getElementById('snooze');
        snooze.onclick = () => {
            snoozeFlag = true;
            toastObj.hide();
        };
        dismisBtn.onclick = () => {
            toastObj.hide();
        };
    }
    // Toast Close Event Function
    function onToastClose(e: ToastCloseArgs): void {
        alarm.style.display = 'inline-block';
        if (snoozeFlag) {
            toastObj.show({ timeOut: (parseInt(listObj.value.toString(), 10) * 60000) });
            snoozeFlag = false;
        }
    }
    // Toast BeforeOpen Event Function
    function onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        alarm.style.display = 'none';
        listObj.appendTo(<HTMLElement>e.element.querySelector('#snoozeDD'));
    }

    setTimeout(
        () => {
            toastObj.show();
        }, 200);
};

/* tslint:enable */