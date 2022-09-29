import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import{DialogUtility} from '@syncfusion/ej2-popups';
/**
 * Default Dialog sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    var dialogObj: any;
    // Render the alert Dialog
    let alertBtn: Button = new Button({cssClass: 'e-danger'});
    alertBtn.appendTo('#alertBtn');
    document.getElementById('alertBtn').onclick = (): void => {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.alert({
            title: '',
            content: '<div class="new" style="display: flex;flex-direction: column;align-items: center;"><p><span class="circle-border"><span class="e-icons e-check" style="font-size: 30px; color: green; font-weight: 700;"></span></span></p><p><b style="font-size:25px; font-weight: 500 !important;">Good job!</b></p><p>You clicked the button!</p></div>',
            okButton: {  text: 'OK',click:alertBtnClick.bind(this)},
            position: { X: 'center', Y: 'center' },
            width:'240px',
        });
    }; 
    function alertBtnClick () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user closed the Alert dialog.";
        document.getElementById("statusText").style.display="block";
    };
    let confirmBtn: Button = new Button({cssClass: 'e-success'}
    );
    confirmBtn.appendTo('#confirmBtn');
    document.getElementById('confirmBtn').onclick = (): void => {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.confirm({
            title: ' Delete file',
            content: '<p ><span class= "e-icons e-changes-reject" style="float: left;padding-right: 10px;font-size: 25px;display: inline;"></span>Are you sure you want to permanently delete this file?</p><p class="fileEdit"><span class= "e-icons e-image" style="font-size: 60px;"></span><span>failed personas.png<br/>Item type:PNG File<br/>Dimenstion: 1384 * 782<br/>Size:374 KB<br/>Original Location: C:/Users/Images</span></p>',
            okButton: {text: 'YES', click:confirmOkAction.bind(this)},
            cancelButton: {text: 'No',click:confirmCancelAction.bind(this)},
            position: { X: 'center', Y: 'center' },
            width:'420px'
        });
    };
    let confirmOkAction = () => {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML=" The user confirmed the dialog box";
        document.getElementById("statusText").style.display="block";
    }
    let confirmCancelAction = () => {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the dialog box.";
        document.getElementById("statusText").style.display="block";
    }
    let promptBtn: Button = new Button({isPrimary: true});
    promptBtn.appendTo('#promptBtn');
    document.getElementById('promptBtn').onclick = (): void => {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.confirm({
            title: 'Join Wi-Fi network',
            content: '<table class="Table"><tbody><tr><td>SSID: <b>AndroidAP</b></td></tr><tr> <td>Password:</td> </tr> <tr> <td> <span class="e-input-group"> <input type="password" id="password" name="Required" class="e-input"> </span> </td> </tr> </tbody> </table> ',
            okButton: { text: 'OK',click:promptOkAction.bind(this)},
            cancelButton: { click:promptCancelAction.bind(this)},
            position: { X: 'center', Y: 'center' },
            width: '240px'
        });
    };
    function promptOkAction (){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = " The user confirmed the dialog box";
        document.getElementById("statusText").style.display="block";
    }
    function promptCancelAction (){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the prompt dialog";
        document.getElementById("statusText").style.display="block";
    }
    
};