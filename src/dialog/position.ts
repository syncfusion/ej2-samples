import { Dialog } from '@syncfusion/ej2-popups';
import { RadioButton } from '@syncfusion/ej2-buttons';
/**
 * Position Dialog sample
 */
this.default = () => {
    let dialog: Dialog = new Dialog({
        // Set Dialog position
        position: { X: 'center', Y: 'center' },
        // Disable the Esc key option to hide the Dialog
        closeOnEscape: false,
        // Enables the close icon button in header
        showCloseIcon: true,
        // Enables the header
        header: 'Choose a Dialog Position',
        // The dialog shows within the target element
        target: document.getElementById('target'),
        // Dialog width
        width: '452px',
        open: dialogOpen,
        close: dialogClose,
        //Dialog footerTemplate
        footerTemplate: '<span id="posvalue" style="float:left;margin-left:8px;padding:10px;">Position: { X: "Center", Y: "Center" }</span>'

    });

    // Render initialized Dialog
    dialog.appendTo('#dialog');

    let onChangeHandler: any = (args: any) => {
    dialog.position.X = args.value.split(' ')[0];
    dialog.position.Y = args.value.split(' ')[1];
    let txt: string[] = args.event.target.parentElement.querySelector('.e-label').innerText.split(' ');
    document.getElementById('posvalue').innerHTML = 'Position: { X: "' + txt[0] + '", Y: "' + txt[1] + '" }';
    };

    let radioButton: RadioButton = new RadioButton({label: 'Left Top', value: 'left top', change: onChangeHandler });
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({label: 'Center Top', value: 'center top', change: onChangeHandler});
    radioButton.appendTo('#radio2');

    radioButton = new RadioButton({label: 'Right Top', value: 'right top', change: onChangeHandler});
    radioButton.appendTo('#radio3');

    radioButton = new RadioButton({label: 'Left Center', value: 'left center', change: onChangeHandler});
    radioButton.appendTo('#radio4');

    radioButton = new RadioButton({label: 'Center Center', value: 'center center', change: onChangeHandler, checked: true});
    radioButton.appendTo('#radio5');

    radioButton = new RadioButton({label: 'Right Center', value: 'right center', change: onChangeHandler});
    radioButton.appendTo('#radio6');

    radioButton = new RadioButton({label: 'Left Bottom', value: 'left bottom', change: onChangeHandler});
    radioButton.appendTo('#radio7');

    radioButton = new RadioButton({label: 'Center Bottom', value: 'center bottom', change: onChangeHandler});
    radioButton.appendTo('#radio8');

    radioButton = new RadioButton({label: 'Right Bottom', value: 'right bottom', change: onChangeHandler});
    radioButton.appendTo('#radio9');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialog.show();
    };

    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }
};