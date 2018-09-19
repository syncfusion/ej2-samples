/**
 * RichTextEditor Embedly Integration
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
//import * as embedly from './lib/embedly';
import './embedly.js';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

this.default = (): void => {
   // embedly.embedly();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['|', 'Undo', 'Redo', '|',
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'SubScript', 'SuperScript', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', '|', 'Image', '|', 'SourceCode']
        },
        actionComplete: (args: any) => {
            if (args.requestType === 'Links') {
                if (args.elements[0] && args.elements[0].tagName === 'A') {
                    args.elements[0].classList.add('embedly-card');
                }
            }
        }
    });
    defaultRTE.appendTo('#defaultRTE');
};

