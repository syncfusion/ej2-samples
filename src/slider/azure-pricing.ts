import { loadCultureFiles } from '../common/culture-loader';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * Cloud pricing slider sample
 */
enableRipple(false);
let proceessorElem: HTMLElement;
let memoryElem: HTMLElement;
let storageElem: HTMLElement;
let elemValue: HTMLElement;
let finalValue: number;
let discountValue: number;

(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable-next-line:max-func-body-length
    let objElements: string[] = ['#xSmallBtn', '#smallBtn', '#mediumBtn', '#largeBtn', '#xLargeBtn'];
    let buttonObj: any = { obj: Button, prop: { cssClass: 'e-info', isPrimary: true } };
    //Processor Slider

    //cPanel Check Box
    let panelCheckBox: CheckBox = new CheckBox({
        checked: false,
        label: 'Not required cPanel included',
        change: sliderValueChange
    });
    panelCheckBox.appendTo('#cPanel');

    //Discount Check Box
    let discountCheckBox: CheckBox = new CheckBox({
        checked: false,
        label: '12 Months <span class = "offer" > Save 25%.</span> Pay Monthly',
        change: sliderValueChange
    });

    discountCheckBox.appendTo('#discount');
    let processorSlider: Slider = new Slider({
        min: 1,
        max: 16,
        value: 4,
        change: onChangeProcessor,
        created: onCreateProcessor
    });
    processorSlider.appendTo('#processor-slider');

    //Memory Slider
    let memorySlider: Slider = new Slider({
        max: 12,
        min: 1,
        value: 4,
        change: onChangeMemory,
        created: onCreateMemory
    });

    memorySlider.appendTo('#memory-slider');

    //Storage Slider
    let storageSlider: Slider = new Slider({
        min: 10,
        max: 500,
        value: 300,
        step: 10,
        change: onChangeStorage,
        created: onCreateStorage
    });
    storageSlider.appendTo('#storage-slider');

    //Signup Button
    let button: Button = new Button({ isPrimary: true });
    button.appendTo('#btn');

    //Render price range buttons
    for (let i: number = 0; i < objElements.length; i++) {
        buttonObj.obj = new Button(buttonObj.prop);
        buttonObj.obj.appendTo(objElements[i]);
    }

    // Render price Dialog
    let alertDialogObj: Dialog = new Dialog({
        content: '<div id = "dialog-content"><div id = "dialog-header">Cloud Price Details</div>' +
            '<div id="processorDialog"><span id="processorPriceName">Processor Price</span><span id="processorPrice"></span></div>' +
            '<div id="MemoryDialog"><span id="memoryPriceName">Memory Price</span><span id="memoryPrice"></span></div>' +
            '<div id="StorgeDialog"><span id="storgePriceName">Storge Price</span><span id="storgePrice"></span></div>' +
            '<div id="CloudDialog"><span id="cloudPriceName">Estimated Price</span><span id="cloudPrice"></span></div></div>',
        showCloseIcon: false,
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'Close', isPrimary: true }
        }],
        closeOnEscape: false, width: '360px',
        target: document.getElementById('pricing-slider'),
        animationSettings: { effect: 'None' },
        visible: false
    });
    alertDialogObj.appendTo('#alertDialog');

    //Sets processor value
    function onCreateProcessor(args: any): void {
        document.getElementById('processor').innerHTML = processorSlider.value + '  ' + 'CORE';
    }
    //Sets memory value
    function onCreateMemory(args: any): void {
        document.getElementById('memory').innerHTML = memorySlider.value + '  ' + 'GB';
    }
    //Sets storage value
    function onCreateStorage(args: any): void {
        document.getElementById('storage').innerHTML = storageSlider.value + '  ' + 'GB';
        sliderValueChange();
    }

    //Processor Slider value change method
    function onChangeProcessor(args: SliderChangeEventArgs): void {
        onChange(document.getElementById('processor'), <number>args.value, 'CORE');
    }

    //Memory Slider value change method
    function onChangeMemory(args: SliderChangeEventArgs): void {
        onChange(document.getElementById('memory'), <number>args.value, 'GB');
    }

    //Storage Slider value change method
    function onChangeStorage(args: SliderChangeEventArgs): void {
        onChange(document.getElementById('storage'), <number>args.value, 'GB');
    }
    //common method for Slider value change
    function onChange(elem: HTMLElement, value: number, notation: string): void {
        elem.innerText = value + '  ' + notation;
        sliderValueChange();
    }

    //method to calculate monthly cloud price based on slider value
    function sliderValueChange(): void {
        elemValue = document.getElementById('value');
        let porcessorValue: number = <number>processorSlider.value;
        let memoryValue: number = <number>memorySlider.value;
        let storageValue: number = <number>storageSlider.value;
        //formula to calculate cloud price based on slider value
        finalValue = Number(((((porcessorValue * memoryValue) * 1000) + ((porcessorValue * memoryValue) * storageValue)
            + ((porcessorValue * memoryValue) * 100)) / 12).toFixed(2));
        if ((document.getElementById('cPanel') as any).ej2_instances[0].checked) {
            finalValue = Number((finalValue - 10).toFixed(2));
        }
        if ((document.getElementById('discount') as any).ej2_instances[0].checked) {
            finalValue = Number((finalValue - ((finalValue * 25) / 100)).toFixed(2));
        }
        elemValue.innerText = finalValue.toString();
    }

    //common method to change the slider value
    function sliderPriceValue(processor: number, memory: number, storage: number): void {
        processorSlider.value = processor;
        memorySlider.value = memory;
        storageSlider.value = storage;
    }

    //change the slider value based on workload
    document.getElementById('xSmallBtn').onclick = (e: Event) => {
        sliderPriceValue(1, 1, 10);
    };
    document.getElementById('smallBtn').onclick = (e: Event) => {
        sliderPriceValue(1, 2, 10);
    };
    document.getElementById('mediumBtn').onclick = (e: Event) => {
        sliderPriceValue(4, 4, 300);
    };
    document.getElementById('largeBtn').onclick = (e: Event) => {
        sliderPriceValue(12, 6, 100);
    };
    document.getElementById('xLargeBtn').onclick = (e: Event) => {
        sliderPriceValue(8, 12, 300);
    };

    //Show price dialog
    document.getElementById('btn').onclick = (e: Event) => {
        let processorPrice: HTMLElement = document.getElementById('processorPrice');
        onChange(processorPrice, <number>processorSlider.value, 'CORE');
        let memoryPrice: HTMLElement = document.getElementById('memoryPrice');
        onChange(memoryPrice, <number>processorSlider.value, 'GB');
        let storgePrice: HTMLElement = document.getElementById('storgePrice');
        onChange(storgePrice, <number>storageSlider.value, 'GB');
        let cloudPrice: HTMLElement = document.getElementById('cloudPrice');
        cloudPrice.innerText = '$' + finalValue;
        sliderValueChange();
        alertDialogObj.show();
    };

    //hide price dialog
    function alertDlgBtnClick(): void {
        alertDialogObj.hide();
    }
};