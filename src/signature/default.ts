import { loadCultureFiles } from '../common/culture-loader';
import { Signature } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Signature sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let saveBtn: Button = new Button({disabled: true}, '#signsave');
    var clrBtn:Button = new Button({disabled: true}, '#signclear');
    let signature: Signature = new Signature({
        change: function() {
            if (!signature.isEmpty()) {
                saveBtn.disabled = false;
                clrBtn.disabled = false;
            }
        }
    });
    signature.appendTo('#signature');

    document.getElementById('signsave').onclick = (): void => {
        signature.save();
    };

    document.getElementById('signclear').onclick = function (e) {
        signature.clear();
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
            clrBtn.disabled = true;
        }
    };
};