import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toast default sample
 */
import { Toast, ToastOpenArgs, ToastCloseArgs } from '@syncfusion/ej2-notifications';
import { Browser, Touch, SwipeEventArgs, closest, isNullOrUndefined, Animation, AnimationModel } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toast component
    let toastObj: Toast = new Toast({
        title: 'device demo Toast', width: '100%', target: '#toast_action_center_target', timeOut: 0, open: toastOpen, close: toastClose,
    });
    if (!Browser.isDevice) {
        document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
    } else {
        document.getElementsByClassName('notification_panel')[0].classList.add('e-visbile-layer'); }
    let downSwipe: boolean = false; let toastHeight: number = 0;
    let notificationPanel: HTMLElement = document.querySelector('.notification_panel') as HTMLElement;
    this.touchModule = new Touch(notificationPanel, { swipe: touchSwipeHandler });
    function toastOpen(e: ToastOpenArgs): void {
        let toastTarget: HTMLElement = (<HTMLElement>e.toastObj.element.parentElement);
        let height: number = parseFloat((window.getComputedStyle(e.element)).marginBottom);
        toastTarget.style.height = (height + toastTarget.offsetHeight + e.element.offsetHeight) + 'px';
        let expandIcon: any = e.element.querySelector('.toast-date .expand'); }
    document.getElementById('collapseAll').onclick = (e: Event) => {
        let toastTarget: HTMLElement = document.getElementById('toast_action_center_target');
        let actionNotify: HTMLElement = document.getElementById('action_notify');
        let animate: AnimationModel = {
            name: 'FadeZoomOut',
            begin: () => { actionNotify.style.display = 'none'; document.getElementById('swipe_indicator').style.display = 'block'; },
            end: () => { toastTarget.style.display = 'none'; }
        };
        new Animation(animate).animate(toastTarget); };
    document.getElementById('clearAll').onclick = (e: Event) => {
        toastObj.animation.hide.effect = 'SlideRightOut'; toastObj.hide('All'); };
    function toastClose(e: ToastCloseArgs): void {
        let toastTarget: HTMLElement = document.getElementById('toast_action_center_target');
        let actionNotify: HTMLElement = document.getElementById('action_notify');
        if (e.toastContainer.childElementCount === 0) {
            actionNotify.style.display = 'none'; toastTarget.style.display = 'none';
            document.getElementById('swipe_indicator').style.display = 'block';
        } else {
            toastTarget.style.height = (toastTarget.offsetHeight - toastHeight) + 'px'; } }
    function touchSwipeHandler(e: SwipeEventArgs): void {
        let direction: string = e.swipeDirection;
        switch (direction) {
            case 'Down':
              toastSwipeDownShow(); break;
            case 'Up':
                downSwipe = false; toastObj.animation.hide.effect = 'FadeZoomOut'; toastObj.hide('All'); break;
            case 'Left':
            case 'Right':
                let target: HTMLElement = e.originalEvent.target as HTMLElement;
                if (!target.classList.contains('e-toast')) {
                    target = closest(target, '.e-toast') as HTMLElement; }
                if (!isNullOrUndefined(target)) {
                    toastObj.animation.hide.effect = direction === 'Left' ? 'SlideLeftOut' : 'SlideRightOut';
                    toastObj.hide(target);
                    toastHeight = target.offsetHeight + parseInt(window.getComputedStyle(target).marginRight, 10); }
                break;
        }
    }
    function toastSwipeDownShow(): void {
        toastShow(); downSwipe = true;
    }
    function toastShow(): void {
        let notificationPanel: any = document.querySelector('.notification_panel');
        let deviceNotification: any = document.querySelector('.device_notification');
        let toastTarget: HTMLElement = document.getElementById('toast_action_center_target');
        let actionNotify: HTMLElement = document.getElementById('action_notify');
        actionNotify.style.display = 'block';
        toastTarget.style.display = 'block';
        if (toastObj.element.childElementCount === 0) {
            toastTarget.style.height = (deviceNotification.offsetHeight + 10) + 'px';
            toastObj.show({ template: '#toast_message_template' });
            toastObj.show({ template: '#toast_message_template2' });
            toastObj.show({ template: '#toast_message_template3' });
        }
        document.getElementById('swipe_indicator').style.display = 'none';
    }
    //Render initialized Toast component
    toastObj.appendTo('#toast_action_center');
    setTimeout(
        () => {
            toastSwipeDownShow();
     }, 200);
};
