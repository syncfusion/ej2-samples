import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { ConfirmDialogArgs, DialogEffect } from '@syncfusion/ej2/popups';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Default Dialog sample
 */
 (window as any).default = (): void => {
    loadCultureFiles();

    var dialogArgs : ConfirmDialogArgs = {
        title: ' Delete Multiple Items',
        content: "Are you sure you want to permanently delete these items?",
        position: { X: 'center', Y: 'center' },
        animationSettings: { effect: 'Zoom',duration: 400},
        width:'420px'
    }

    let confirmbtn: Button = new Button({cssClass: 'e-success'});
    confirmbtn.appendTo('#confirmBtn');
    document.getElementById('confirmBtn').onclick= () => {
        DialogUtility.confirm(dialogArgs);
    }
    let animationObj:DropDownList = new DropDownList({
        index: 2,     
        placeholder: 'Animation effect',     
        popupHeight: '200px',  
        floatLabelType:'Always',  
        change: () => { valueChange();  }
    });
    animationObj.appendTo('#effectDropdown');    
    function valueChange(){
        let effect:DialogEffect = animationObj.value as DialogEffect;
        dialogArgs.animationSettings.effect = effect;
    };
};
