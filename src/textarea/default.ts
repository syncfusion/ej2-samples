import { TextArea } from  '@syncfusion/ej2-inputs';
/**
 *   Sample for input textarea.
 */
(window as any).default = () => {
    let outlineTextArea: TextArea = new TextArea({
        placeholder: 'Outlined',
        cssClass: 'e-outline',
        floatLabelType: 'Auto'
    });
    outlineTextArea.appendTo('#outlined');
    let filledTextArea: TextArea = new TextArea({
        placeholder: 'Filled',
        cssClass: 'e-filled',
        floatLabelType: 'Auto',
    });
    filledTextArea.appendTo('#filled');
    let inputobj1: TextArea = new TextArea({
        placeholder: 'Enter your comments',
        floatLabelType: 'Auto'
    });
    inputobj1.appendTo('#default');
    // custom code start
    let input: NodeList = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group textarea');
    for (let index: number = 0; index < input.length; index++) {
        //Focus Event binding for textarea component
        input[index].addEventListener('focus', () => {
            getParentNode(input[index] as HTMLElement).classList.add('e-input-focus');
        });
        //Blur Event binding for textarea component
        input[index].addEventListener('blur', () => {
            getParentNode(input[index] as HTMLElement).classList.remove('e-input-focus');
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
