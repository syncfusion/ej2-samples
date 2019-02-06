import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Toast position sample
 */
import { Toast, ToastCloseArgs } from '@syncfusion/ej2-notifications';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { RadioButton, ChangeEventArgs as CheckBoxChange } from '@syncfusion/ej2-buttons';
import { Browser } from '@syncfusion/ej2-base';

/* tslint:disable */

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Toast component
    let toastObj: Toast = new Toast({
        title: 'Matt sent you a friend request',
        content: 'You have a friend request yet to accept.',
        icon: 'e-laura',
        target: document.body,
        position: { X: 'Right', Y: 'Bottom' },
        close: onclose,
        beforeOpen: onBeforeOpen
    });

    if (!Browser.isDevice) {
        toastObj.width = 350;
        toastObj.dataBind();
    }

    let listObj: DropDownList = new DropDownList({
        index: 5,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a position',
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
        change: valueChange
    });
    listObj.appendTo('#position');

    //Initialize RadioButton component and Rendering
    let radioButton: RadioButton = new RadioButton({ label: 'Target', name: 'toast', value: 'Target', change: checkboxChange });
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({ label: 'Global', name: 'toast', value: 'Global', checked: true, change: checkboxChange1 });
    radioButton.appendTo('#radio2');

    radioButton = new RadioButton({ label: 'Position', name: 'toastPos', value: 'Position', checked: true, change: checkboxChange2 });
    radioButton.appendTo('#dropdownRadio');

    radioButton = new RadioButton({ label: 'Custom', name: 'toastPos', value: 'Custom', change: checkboxChange3 });
    radioButton.appendTo('#customRedio');

    let initialWid: string = toastObj.width.toString();

    //Render initialized Toast component
    toastObj.appendTo('#toast_pos');
    toastShow(200);

    function toastShow(timeOutDelay: number): void {
        setTimeout(
            () => {
                toastObj.show();
         }, timeOutDelay);
    }

    let btnEle: HTMLElement = document.getElementById('show_Toast');
    btnEle.onclick = () => {
        if (customFlag) {
            setcustomPosValue();
        }
        toastObj.show();
    };

    let hideBtn: HTMLElement = document.getElementById('hideTosat');
    hideBtn.onclick = () => {
        toastObj.hide('All');
    };

    document.onclick = (e: Event) => {
        if (e.target !== btnEle && toastObj.target === document.body) {
            toastObj.hide('All');
        }
    };

    function onclose(e: ToastCloseArgs): void {
     if (e.toastContainer.childElementCount === 0) {
         hideBtn.style.display = 'none';
     }
    }

    function onBeforeOpen(): void {
      hideBtn.style.display = 'inline-block';
    }

    let customFlag: boolean = false;

    function checkboxChange(e: CheckBoxChange): void {
        if (this.checked) {
            toastObj.hide('All');
            toastObj.target = '#toast_pos_target';
            toastShow(1000);
        }
    }

    function checkboxChange1(e: CheckBoxChange): void {
        if (this.checked) {
            toastObj.hide('All');
            toastObj.target = document.body;
            toastShow(1000);
        }
    }

    function checkboxChange2(e: CheckBoxChange): void {
        if (this.checked) {
            toastObj.hide('All');
            document.getElementById('dropdownChoose').style.display = 'table-cell';
            document.getElementById('customChoose').style.display = 'none';
            setToastPosValue(listObj.value.toString()); customFlag = false; toastShow(1000);
        }
    }

    function checkboxChange3(e: CheckBoxChange): void {
        if (this.checked) {
            toastObj.hide('All');
            document.getElementById('dropdownChoose').style.display = 'none';
            document.getElementById('customChoose').style.display = 'table-cell';
            setcustomPosValue(); customFlag = true; toastShow(1000);
        }
    }

    //Setting Toast Custom Position
    function setcustomPosValue(): void {
        toastObj.width = initialWid;
        toastObj.position.X = parseInt((<HTMLInputElement>document.getElementById('xPos')).value, 10);
        toastObj.position.Y = parseInt((<HTMLInputElement>document.getElementById('yPos')).value, 10);
    }

    //Setting Toast Position
    function setToastPosValue(value: string): void {
        toastObj.width = initialWid;
        switch (value) {
            case 'topleft':
                toastObj.position.X = 'Left'; toastObj.position.Y = 'Top'; break;
            case 'topright':
                toastObj.position.X = 'Right'; toastObj.position.Y = 'Top'; break;
            case 'topcenter':
                toastObj.position.X = 'Center'; toastObj.position.Y = 'Top'; break;
            case 'topfullwidth':
                toastObj.width = '100%'; toastObj.position.X = 'Center'; toastObj.position.Y = 'Top'; break;
            case 'bottomleft':
                toastObj.position.X = 'Left'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomright':
                toastObj.position.X = 'Right'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomcenter':
                toastObj.position.X = 'Center'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomfullwidth':
                toastObj.width = '100%'; toastObj.position.X = 'Center'; toastObj.position.Y = 'Bottom'; break;
        }
    }

    function valueChange(e: ChangeEventArgs): void {
        toastObj.hide('All'); setToastPosValue(e.value.toString()); toastShow(1000);
    }
};

/* tslint:enable */