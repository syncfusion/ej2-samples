import { loadCultureFiles } from '../common/culture-loader';
import { InputObject, TextBox } from  '@syncfusion/ej2-inputs';
/**
 *   Sample for CSS input boxes.
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let inputobj1: TextBox = new TextBox({
        placeholder: 'First Name',
        floatLabelType: 'Auto'
    });
    inputobj1.appendTo('#firstname');
    let inputobj2: TextBox = new TextBox({
        placeholder: 'Last Name',
        floatLabelType: 'Auto',
        enableRtl: true
    });
    inputobj2.appendTo('#lastname');
    // custom code start
    let inputObject : InputObject = {};
    let input: NodeList = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group input');
    let inputIcon: NodeList  = document.querySelectorAll('.e-input-group-icon');
    for (let i: number = 0; i < input.length; i++) {
        //Focus Event binding for input component
        input[i].addEventListener('focus', () => {
            getParentNode(input[i] as HTMLElement).classList.add('e-input-focus');
        });
        //Blur Event binding for input component
        input[i].addEventListener('blur', () => {
            getParentNode(input[i] as HTMLElement).classList.remove('e-input-focus');
        });
    }
    for (let i: number = 0; i < inputIcon.length; i++) {
        inputIcon[i].addEventListener('mousedown',  function() : void {
            this.classList.add('e-input-btn-ripple');
        });
        inputIcon[i].addEventListener('mouseup',  function() : void {
            let ele: HTMLElement = this;
            setTimeout(
                () => {ele.classList.remove('e-input-btn-ripple'); },
                500);
        });
    }
    function getParentNode(element: HTMLInputElement | HTMLElement): HTMLElement {
        let parentNode: HTMLElement = <HTMLElement> element.parentNode;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            return <HTMLElement> parentNode.parentNode;
        }
        return parentNode;
    }
    // custom code end
};
