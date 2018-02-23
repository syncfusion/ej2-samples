import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Template Dialog sample
 * <div class="e-tile-small-col-2">
 */
let icontemp: string = '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">' + 'Send</button>';
let headerimg: string = '<img class="img2" src="src/dialog/images/1.png" alt="header image">';
let message: string = 'Greetings Nancy! When will you share me the source files of the project?';
this.default = () => {
    let sendbutton: Button = new Button();
    let proxy: any = this;
    let dialog: Dialog = new Dialog({
        header: headerimg + '<div title="Nancy" class="e-icon-settings e-icons" style="padding: 3px;"> Nancy </div>',
        footerTemplate: ' <input id="inVal" class="e-input" type="text" placeholder="Enter your message here!"/>' + icontemp,
        showCloseIcon: true,
        content: '<div class="dialogContent"><span class="dialogText">' + message + '</span></div>',
        target: document.getElementById('container'),
        width: '42%',
        open: dialogOpen,
        close: dialogClose,
        height: '86%',
    });
    dialog.appendTo('#dialog');
    sendbutton.appendTo('#sendButton');
    document.getElementById('targetButton').onclick = (): void => {
        dialog.show();
    };
    (document.getElementById('sendButton')as HTMLElement).onkeydown = (e: any) => {
        if (e.keyCode === 13) { updateTextValue(); }
    };

    (document.getElementById('inVal')as HTMLElement).onkeydown = (e: any) => {
        if (e.keyCode === 13) { updateTextValue(); }
    };

    document.getElementById('sendButton').onclick = (): void => {
        updateTextValue();
    };

    function updateTextValue () : void {
        let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
        let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
        let dialogTextWrap : HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
            enteredVal.value = '';
        }
    }
    function dialogClose(): void {
        document.getElementById('targetButton').style.display = 'block';
    }

    function dialogOpen(): void {
        document.getElementById('targetButton').style.display = 'none';
    }
};
