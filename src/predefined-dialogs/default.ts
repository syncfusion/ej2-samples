import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import{DialogUtility} from '@syncfusion/ej2-popups';
/**
 * Default Dialog sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    var dialogObj: any;
    let alertBtn: Button = new Button({cssClass: 'e-danger'});
    alertBtn.appendTo('#alertBtn');
    document.getElementById('alertBtn').onclick = (): void => {
        document.getElementById("statusText").style.display="none";
            dialogObj = DialogUtility.alert({
            title: 'Low Battery',
            content: '10% of battery remaining',
            okButton: {click:alertBtnClick.bind(this)},
            position: { X: 'center', Y: 'center' },
            closeOnEscape: true
        });  
    }; 
    function alertBtnClick () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user closed the Alert dialog."
        document.getElementById("statusText").style.display="block";
    };

    let confirmBtn: Button = new Button({cssClass: 'e-success'});
    confirmBtn.appendTo('#confirmBtn');
    document.getElementById('confirmBtn').onclick = (): void => {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.confirm({
            title: ' Delete Multiple Items',
            content: "Are you sure you want to permanently delete these items?",
            okButton: { click:confirmOkAction.bind(this)},
            cancelButton: { click:confirmCancelAction.bind(this)},
            position: { X: 'center', Y: 'center' },
            closeOnEscape: true
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
        dialogObj= DialogUtility.confirm({
            title: 'Join Chat Group',
            content: '<p>Enter your name: </p><input id= "inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
            okButton: { click:promptOkAction.bind(this)},
            cancelButton: { click:promptCancelAction.bind(this)},
            position: { X: 'center', Y: 'center' },
            closeOnEscape: true
        });
    };
    function promptOkAction (){
        let value:string ;
        value = (document.getElementById("inputEle")as any).value;
        if (value==""){
            dialogObj.hide();
            document.getElementById("statusText").innerHTML = "	The user's input is returned as \" \" ";
            document.getElementById("statusText").style.display="block";

        }
        else{
            dialogObj.hide();
            document.getElementById("statusText").innerHTML="The user's input is returned as"+" "+value;
            document.getElementById("statusText").style.display="block";
        }
    }
    function promptCancelAction (){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the prompt dialog";
        document.getElementById("statusText").style.display="block";
    }
};