import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor insert emoticons sample
 */
import { RichTextEditor, Toolbar, Link, NodeSelection, Image, QuickToolbar, HtmlEditor , EmojiPicker, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { Tab } from '@syncfusion/ej2-navigations';
RichTextEditor.Inject(Toolbar, Link, Image, QuickToolbar, HtmlEditor, EmojiPicker, PasteCleanup, Table, Video, Audio);

//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let emojiPickerRTE:RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
            'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'EmojiPicker',
            '|', 'Undo', 'Redo'] 
        }}
    );
    emojiPickerRTE.appendTo('#emojiPickerRTE');
};
