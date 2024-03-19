import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor inline toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);

(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        inlineMode: {
            enable: true,
            onSelection: true
        },
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline',
                'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
                'CreateLink']
        },
        format: {
            width: 'auto'
        },
        fontFamily: {
            width: 'auto'
        }
    });
    defaultRTE.appendTo('#defaultRTE');

    let select: CheckBox = new CheckBox({
        // set true for disable the checked state at initial rendering
        checked: true,
        label: 'Show on Selection',
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultRTE.inlineMode.onSelection = (args as any).checked;
            defaultRTE.dataBind();
        }
    });
    select.appendTo('#select');
};
