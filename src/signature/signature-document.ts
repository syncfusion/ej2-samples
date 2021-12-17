import { loadCultureFiles } from '../common/culture-loader';
import { Dialog } from '@syncfusion/ej2-popups';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Signature } from '@syncfusion/ej2-inputs';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { Uploader, RemovingEventArgs, SelectedEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Signature Usecase sample
 */

// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let signfontStyle: any = [{ FontName: 'Brush Script MT' }, { FontName: 'Helvetica' }, { FontName: 'Times New Roman' },
    { FontName: 'Open Sans' }];
    let signature: Signature = new Signature({ isReadOnly: true });
    signature.appendTo('#signature');

    let dialog: Dialog = new Dialog({
        header: 'Signature',
        cssClass: 'e-sign-dlg',
        showCloseIcon: true,
        content: '<div id="element"></div>',
        target: document.body,
        width: '570px',
        visible: false,
        open: openDialog,
        position: {
            X: 'center',
            Y: '100'
        },
        footerTemplate: '<div class="e-disclaimer">I understand that this is a legal representation of my signature</div>' +
        '<button class="e-btn e-btn-clear" style="float: left;" id="btnClear">Clear</button>' +
        '<button class="e-btn e-btn-cancel" id="btnCancel">Cancel</button>' +
        '<button class="e-btn e-btn-create e-primary" id="btnCreate">Save & Use</button>'
    });
    dialog.appendTo('#dialog');

    function openDialog(): void {
        let tabElem: HTMLElement = document.getElementById('element') as HTMLElement;
        if (!tabElem.classList.contains('e-control')) {
            let tabObj: Tab = new Tab({
                selected: (args: SelectEventArgs): void => {
                    handleSelectEvent(args);
                },
                items: [
                    {
                        header: { 'text': 'Type' },
                        content: '<div id="type_appearance"><input id="signtext_box" type="text"/><div id="type_content"></div></div>'
                    },
                    {
                        header: { 'text': 'Draw' },
                        content: '<div id="draw_appearance"><canvas id="main_signature" style="width:100%;" height=197></canvas></div>'
                    },
                    {
                        header: { 'text': 'Upload' },
                        content: '<div id="upload_appearance"><input id="file_upload" type="file"/>' +
                        '<div id="upload_content" style="display: none;"><canvas id="upload_signature" height=203 style="width:100%;">' +
                        '</canvas></div></div>'
                    }
                ],
            });
            tabObj.appendTo('#element');
            document.getElementById('btnClear').addEventListener('click', clearHandler);
            document.getElementById('btnCancel').addEventListener('click', cancelHandler);
            document.getElementById('btnCreate').addEventListener('click', createHandler);
            typeContent();
        }
    }

    function drawContent(): void {
        let canvasElem: HTMLCanvasElement = document.getElementById('main_signature') as HTMLCanvasElement;
        if (canvasElem.classList.contains('e-control')) {
            signature = getComponent(canvasElem, 'signature');

        } else {
            signature = new Signature({ change: signChange });
            signature.appendTo('#main_signature');
        }
        document.getElementById('btnClear').innerText = 'CLEAR';
        refreshFooter(signature);
    }

    function typeContent(): void {
        let inputElem: HTMLInputElement = document.getElementById('signtext_box') as HTMLInputElement;
        if (inputElem.classList.contains('e-control')) {
            for (let i: number = 0; i < signfontStyle.length; i++) {
                signature = getComponent(document.getElementById('font_signature' + (i + 1)), 'signature');
                signature.draw(inputElem.value, signfontStyle[i].FontName);
            }
        } else {
            let inputobj: any = new TextBox({
                placeholder: 'Your name',
                value: 'Signature',
                input: inputHanlder
            });
            inputobj.appendTo('#signtext_box');
            let fontDiv: HTMLElement = document.getElementById('type_content');
            let fontSignature: HTMLCanvasElement; let tableElem: HTMLTableElement;
            let divElem: HTMLElement;
            let trElem: HTMLTableRowElement; let tdElem: HTMLTableCellElement;
            tableElem = document.createElement('table');
            for (let i: number = 1; i <= signfontStyle.length; i++) {
                if (i % 2 === 1) {
                    trElem = document.createElement('tr');
                }
                tdElem = document.createElement('td');
                divElem = document.createElement('div');
                fontSignature = document.createElement('canvas');
                fontSignature.id = 'font_signature' + i + '';
                fontSignature.style.height = '100%';
                fontSignature.style.width = '100%';
                divElem.classList.add('e-font-sign');
                divElem.appendChild(fontSignature);
                tdElem.appendChild(divElem); trElem.appendChild(tdElem);
                if (i % 2 === 0) {
                    tableElem.appendChild(trElem);
                }
                if (i === 1) {
                    divElem.classList.add('e-selected-item');
                }
            }
            fontDiv.appendChild(tableElem);
        }
        for (let i: number = 0; i < signfontStyle.length; i++) {
            signature = new Signature({isReadOnly: true, change: signChange});
            signature.appendTo('#font_signature' + (i + 1));
            signature.draw(inputElem.value, signfontStyle[i].FontName);
            signature.element.parentElement.addEventListener('click', fontClickHandler);
        }
        document.getElementById('btnClear').innerText = 'CLEAR';
        refreshFooter(signature);
    }

    function uploadContent(): void {
        let uploadElem: HTMLInputElement = document.getElementById('file_upload') as HTMLInputElement;
        let canvasElem: HTMLCanvasElement = document.getElementById('upload_signature') as HTMLCanvasElement;
        if (!uploadElem.classList.contains('e-control')) {
            let uploadObj: Uploader = new Uploader({
                asyncSettings: {
                    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
                    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
                },
                removing: onFileRemove,
                selected: onSelect
            });
            uploadObj.appendTo('#file_upload');
        }
        if (canvasElem.classList.contains('e-control')) {
            signature = getComponent(canvasElem, 'signature');
            refreshFooter(signature);
        }
        document.getElementById('btnClear').innerText = 'REMOVE';
        refreshFooter(signature);
    }

    function clearHandler(): void {
        let activeItem: HTMLElement = document.querySelector('.e-dlg-content .e-item.e-active') as HTMLElement;
        if (activeItem.querySelectorAll('#draw_appearance').length) {
            signature = getComponent(document.getElementById('main_signature'), 'signature');
            signature.clear();
        } else if (activeItem.querySelectorAll('#type_appearance').length) {
            (document.getElementById('signtext_box') as HTMLInputElement).value = '';
            for (let i: number = 0; i < signfontStyle.length; i++) {
                signature = getComponent(document.getElementById('font_signature' + (i + 1)), 'signature');
                signature.clear();
            }
        } else {
            signature = getComponent(document.getElementById('upload_signature'), 'signature');
            signature.destroy();
            document.getElementById('upload_content').style.display = 'none';
            (document.querySelector('#upload_appearance .e-upload') as HTMLElement).style.display = 'block';
        }
        document.getElementById('btnClear').classList.add('e-disabled');
        document.getElementById('btnCreate').classList.add('e-disabled');
    }

    function cancelHandler(): void {
        dialog.hide();
    }

    function createHandler(): void {
        signature = getComponent(document.getElementById('signature'), 'signature');
        let activeItem: HTMLElement = document.querySelector('.e-dlg-content .e-item.e-active') as HTMLElement;
        if (activeItem.querySelectorAll('#draw_appearance').length) {
            let signature1: Signature = getComponent(document.getElementById('main_signature'), 'signature');
            signature.load(signature1.getSignature(), signature1.element.width, signature1.element.height);
        } else if (activeItem.querySelectorAll('#type_appearance').length) {
            let signature1: Signature = getComponent(document.querySelector('.e-selected-item .e-signature') as HTMLElement, 'signature');
            signature.load(signature1.getSignature(), signature1.element.width, signature1.element.height);
        }
        dialog.hide();
    }

    function signChange(): void {
        document.getElementById('btnClear').classList.remove('e-disabled');
        document.getElementById('btnCreate').classList.remove('e-disabled');
    }

    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }

    function onSelect(args: SelectedEventArgs) : void {
        document.getElementById('upload_content').style.display = 'block';
        (document.querySelector('#upload_appearance .e-upload') as HTMLElement).style.display = 'none';
        let signature: Signature = new Signature({change: signChange});
        signature.appendTo('#upload_signature');
        refreshFooter(signature);
    }

    function handleSelectEvent(e: SelectEventArgs): void {
        if (e.selectedIndex === 0) {
            typeContent();
        } else if (e.selectedIndex === 1) {
            drawContent();
        } else if (e.selectedIndex === 2) {
            uploadContent();
        }
    }

    function refreshFooter(signature: Signature): void {
        if (signature.isEmpty()) {
            document.getElementById('btnClear').classList.add('e-disabled');
            document.getElementById('btnCreate').classList.add('e-disabled');
        } else {
            document.getElementById('btnClear').classList.remove('e-disabled');
            document.getElementById('btnCreate').classList.remove('e-disabled');
        }
    }

    function inputHanlder(): void {
        let canvasElem: HTMLCanvasElement; let signPad: Signature;
        let textBox: any = document.getElementById('signtext_box');
        for (let i: number = 0; i < signfontStyle.length; i++) {
            canvasElem = document.getElementById('font_signature' + ( i + 1)) as HTMLCanvasElement;
            signPad = getComponent(canvasElem, 'signature');
            signPad.draw(textBox.value, signfontStyle[i].FontName);
        }
        if (!signPad.isEmpty()) {
            document.getElementById('btnClear').classList.remove('e-disabled');
            document.getElementById('btnCreate').classList.remove('e-disabled');
        }
    }

    function fontClickHandler(args: any): void {
        let fontColl: NodeListOf<HTMLElement> = document.querySelectorAll('.e-font-sign');
        for (let i: number = 0; i < fontColl.length; i++) {
            fontColl[i].classList.remove('e-selected-item');
        }
        args.currentTarget.classList.add('e-selected-item');
    }

    document.getElementById('signature-control').onclick = (): void => {
        dialog.show();
    };

    document.getElementById('sendButton').onclick = (): void => {
        let canvasElem: HTMLCanvasElement = document.getElementById('signature') as HTMLCanvasElement;
        let signPad: Signature = getComponent(canvasElem, 'signature');
        if (signPad.isEmpty()) {
            canvasElem.classList.add('e-selected-item');
        } else {
            canvasElem.classList.remove('e-selected-item');
            signPad.clear();
        }
    };
};