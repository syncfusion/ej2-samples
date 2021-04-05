import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toast api sample
 */
import { Toast, ToastBeforeOpenArgs, ToastCloseArgs, ProgressDirectionType } from '@syncfusion/ej2-notifications';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Effect } from '@syncfusion/ej2-base';

/* tslint:disable */

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toast component
    let toastObj: Toast = new Toast({
        position: {
            X: 'Right', Y :'Bottom'
        }, beforeOpen: onBeforeOpen, newestOnTop: true, close: onclose
    });
    //Render initialized Toast component
    toastObj.appendTo('#toastApi');
    //Initialize Checkbox component and Rendering
    let checkBoxObj: CheckBox = new CheckBox({ label: 'Show Close Button', change: closeOnChange });
    checkBoxObj.appendTo('#closeButton');

    let checkBoxObj1: CheckBox = new CheckBox({ label: 'Show Progress Bar', change: OnProgressChange });
    checkBoxObj1.appendTo('#progressBar');

    let checkBoxObj2: CheckBox = new CheckBox({ label: 'Newest On Top', checked:true,  change: closeNewestOnChange });
    checkBoxObj2.appendTo('#newestOnTop');

    let checkBoxObj3: CheckBox = new CheckBox({ label: 'Prevent Duplicates', change: OnPrevDubChange });
    checkBoxObj3.appendTo('#prevDuplicates');

    let checkBoxObj4: CheckBox = new CheckBox({ label: 'Action Buttons', change: OnactionBtnChange });
    checkBoxObj4.appendTo('#actionButtons');

    let btnEleShow: HTMLElement = document.getElementById('toastBtnShow');
    let btnEleHide: HTMLElement = document.getElementById('toastBtnHide');
    let prevDuplicates: boolean = false;

    btnEleShow.onclick = () => { showToast(); };
    btnEleHide.onclick = () => { toastObj.hide('All'); };
    
    function onclose (e : ToastCloseArgs): void {
      if (e.toastContainer.childElementCount === 0) {
          btnEleHide.style.display = 'none';
      }
    }

    document.onclick = (e: Event) => {
        if (e.target !== btnEleShow) {
            toastObj.hide('All');
        }
    };

    function showToast(): void {
        let title: string = (<HTMLInputElement>document.getElementById('toast_input_title')).value;
        let content: string = (<HTMLInputElement>document.getElementById('toast_input_content')).value;
        if (title === '' && content === '') {
            content = 'You have created a Toast message';
        }
        let showDuration: number = parseInt((<HTMLInputElement>document.getElementById('showDuration')).value, 10);
        let hideDuration: number = parseInt((<HTMLInputElement>document.getElementById('hideDuration')).value, 10);
        let timeOut: number = parseInt((<HTMLInputElement>document.getElementById('timeOut')).value, 10);
        toastObj.show(
            {
                title: title, content: content, timeOut: timeOut,
                animation: {
                    show: { duration: showDuration },
                    hide: { duration: hideDuration }
                }
            });
    }

    //Initialize DropDownList component and Rendering
    let dropDownListShow: DropDownList = new DropDownList({
        placeholder: 'Select an Animation', change: showChange
    });
    dropDownListShow.appendTo('#ShowAnimation');
    showChange();

    //Initialize DropDownList component and Rendering
    let dropDownListHide: DropDownList = new DropDownList({
        placeholder: 'Select an Animation',
        change: hideChange
    });
    dropDownListHide.appendTo('#HideAnimation');
    hideChange();

    //Initialize DropDownList component and Rendering
    let dropDownListShowEase: DropDownList = new DropDownList({
        placeholder: 'Select an Easing',
        change: onShowEase
    });
    dropDownListShowEase.appendTo('#ShowEasing');

    let dropDownListProgressDirection: DropDownList = new DropDownList({
        placeholder: 'ProgressDirection',
        floatLabelType: 'Auto',
        change: onProgressDirectionChange
    });
    dropDownListProgressDirection.appendTo('#progressDirection');

    //Initialize DropDownList component and Rendering
    let dropDownListHideEase: DropDownList = new DropDownList({
        placeholder: 'Select an Easing',
        change: onHideEase
    });
    dropDownListHideEase.appendTo('#HideEasing');

    function onProgressDirectionChange() {
        toastObj.progressDirection = dropDownListProgressDirection.value.toString() as ProgressDirectionType;
    }

    function onShowEase(): void {
        toastObj.animation.show.easing = dropDownListShowEase.value.toString();
    }

    function onHideEase(): void {
        toastObj.animation.hide.easing = dropDownListHideEase.value.toString();
    }

    function showChange(): void {
        toastObj.animation.show.effect = <Effect>dropDownListShow.value;
    }

    function hideChange(): void {
        toastObj.animation.hide.effect = <Effect>dropDownListHide.value;
    }

    // Toast beforeOpen Event Function
    function onBeforeOpen(e: ToastBeforeOpenArgs): void {
        btnEleHide.style.display = 'inline-block';
        if (prevDuplicates) {
            e.cancel = preventDuplicate(e);
        }
    }

    // Toast preventDuplicate Function for toast title
    function preventDuplicate(e: ToastBeforeOpenArgs): boolean {
        let toastEle: HTMLElement = e.element;
        let toasts: NodeList = e.toastObj.element.children;
        for (let i: number = 0; i < toasts.length; i++) {
            let toastTitle: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-title');
            let toastMessage: HTMLElement = (toasts[i] as HTMLElement).querySelector('.e-toast-message');
            if (toastTitle && toastTitle.isEqualNode(toastEle.querySelector('.e-toast-title'))) {
                return true;
            }
            if (!toastTitle && toastMessage && toastMessage.isEqualNode(toastEle.querySelector('.e-toast-message'))) {
                return true;
            }
        }
        return false;
    }

    function closeOnChange(e: ChangeEventArgs): void {
        e.checked ? toastObj.showCloseButton = true : toastObj.showCloseButton = false;
    }
    function OnProgressChange(e: ChangeEventArgs): void {
        e.checked ? toastObj.showProgressBar = true : toastObj.showProgressBar = false;
    }
    function closeNewestOnChange(e: ChangeEventArgs): void {
        e.checked ? toastObj.newestOnTop = true : toastObj.newestOnTop = false;
    }
    function OnPrevDubChange(e: ChangeEventArgs): void {
        prevDuplicates = e.checked;
    }
    function onActionBtnClick(e: Event): void {
        alert('Action button is clicked');
    }
    function OnactionBtnChange(e: ChangeEventArgs): void {
        if (e.checked) {
            toastObj.buttons = [{ model: { content: '<div class="e-toast-btn"> Click Here </div>' }, click: onActionBtnClick }];
        } else { toastObj.buttons = []; }
    }
};


/* tslint:enable */