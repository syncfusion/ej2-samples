import { loadCultureFiles } from '../common/culture-loader';
import { TextBox } from  '@syncfusion/ej2-inputs';

/**
 *   Adornments TextBox sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let prependTextbox: TextBox = new TextBox({
        placeholder: 'Enter your Name',
        floatLabelType: 'Auto',
        cssClass: 'e-prepend-textbox',
        prependTemplate: '<span class="e-icons e-user"></span><span class="e-input-separator"></span>',
    });
    prependTextbox.appendTo('#prepend');

    let appendTextbox: TextBox = new TextBox({
        placeholder: 'Password',
        floatLabelType: 'Auto',
        cssClass: 'e-eye-icon',
        appendTemplate: '<span class="e-input-separator"></span><span id="text-icon" class="e-icons e-eye"></span>',
        created: () => {
            let textIcon: HTMLElement = document.querySelector('#text-icon') as HTMLElement;
            if (textIcon) {
                textIcon.addEventListener('click', function() {
                    if (appendTextbox.type === 'text') {
                        appendTextbox.type = 'Password';
                        textIcon.className = 'e-icons e-eye-slash';
                    } else {
                        appendTextbox.type = 'text';
                        textIcon.className = 'e-icons e-eye';
                    }
                    appendTextbox.dataBind();
                });
            }
        }
    });
    appendTextbox.appendTo('#append');

    let iconTextbox: TextBox = new TextBox({
        placeholder: 'Enter the Mail Address',
        floatLabelType: 'Auto',
        cssClass: 'e-icon-textbox',
        prependTemplate: '<span class="e-icons e-people"></span><span class="e-input-separator"></span>',
        appendTemplate: '<span>.com</span><span class="e-input-separator"></span><span id="delete-text" class="e-icons e-trash"></span>',
        created: () => {
            let deleteIcon: HTMLElement = document.querySelector('#delete-text') as HTMLElement;
            if (deleteIcon) {
                deleteIcon.addEventListener('click', function() {
                    iconTextbox.value = '';
                    iconTextbox.dataBind();
                });
            }
        }
    });
    iconTextbox.appendTo('#iconTextbox');
};