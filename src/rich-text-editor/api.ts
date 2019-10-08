import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor API sample
 */
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultAPI: RichTextEditor = new RichTextEditor({
        showCharCount: true,
        maxLength: 1000,
    });
    defaultAPI.appendTo('#defaultRTE');

    let maxLength: NumericTextBox = new NumericTextBox({
        value: 1000,
        min: 555,
        max: 2000,
        format: 'n0',
        change: (e: ChangeEventArgs) => {
            defaultAPI.maxLength = maxLength.value;
        }
    });
    maxLength.appendTo('#maxlength');
    let readonly: CheckBox = new CheckBox({
        // set false for disable the checked state at initial rendering
        checked: false,
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultAPI.readonly = (args as any).checked;
        }
    });
    readonly.appendTo('#readonly');
    let enable: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultAPI.enabled = (args as any).checked;
        }
    });
    enable.appendTo('#enable');
    let enablehtml: CheckBox = new CheckBox({
        // set false for disable the checked state at initial rendering
        checked: false,
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultAPI.enableHtmlEncode = (args as any).checked;
        }
    });
    enablehtml.appendTo('#enablehtml');
    document.getElementById('getVal').onclick = () => {
        alert(defaultAPI.value);
    };
    document.getElementById('selectHtml').onclick = () => {
        alert(defaultAPI.getSelection());
    };
    document.getElementById('selectall').onclick = () => {
        defaultAPI.selectAll();
    };
};
