import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { TitleBar } from './title-bar';
import * as data from './data-toolbar-customization.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    let container: DocumentEditorContainer = new DocumentEditorContainer({
        serviceUrl: hostUrl, enableToolbar: true, height: '590px', documentEditorSettings: { showRuler: true, colorPickerSettings: { mode: 'Palette', modeSwitcher: true, showButtons: true } }
    });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Color Picker Customization';
    titleBar.updateDocumentTitle();
    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };
    //checked state.
    let pickerRadiobutton: RadioButton = new RadioButton({
        label: 'Picker', name: 'state', value: 'Picker', change: () => {
            if (pickerRadiobutton.checked) {
                container.documentEditorSettings.colorPickerSettings = { mode: 'Picker'};
            }
        }
    });
    pickerRadiobutton.appendTo('#radiobutton1');

    //unchecked state.
    let paletteRadiobutton: RadioButton = new RadioButton({
        label: 'Palette', name: 'state', checked: true, value: 'Palette', change: () => {
            if (paletteRadiobutton.checked) {
                container.documentEditorSettings.colorPickerSettings = { mode: 'Palette'};
            }
        }
    });
    paletteRadiobutton.appendTo('#radiobutton2');

    let checkbox: CheckBox = new CheckBox({
        label: 'Show Buttons', checked: true, change: (args) => {
            container.documentEditorSettings.colorPickerSettings = {showButtons : args.checked  };
        }
    });

    // Render initialized CheckBox.
    checkbox.appendTo('#checkbox');
    let modeCheckbox: CheckBox = new CheckBox({
        label: 'Mode Switcher', checked: true, change: (args) => {
             container.documentEditorSettings.colorPickerSettings = { modeSwitcher: args.checked };
        }
    });

    // Render initialized CheckBox.
    modeCheckbox.appendTo('#mode');
};