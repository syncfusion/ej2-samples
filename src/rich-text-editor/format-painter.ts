import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditor, HtmlEditor, Toolbar, QuickToolbar, FormatPainter, Link, Image, Table } from "@syncfusion/ej2-richtexteditor";
import { TextBox, FocusOutEventArgs } from "@syncfusion/ej2-inputs";

RichTextEditor.Inject(HtmlEditor, Toolbar, QuickToolbar, FormatPainter ,Table, Link, Image);

(window as any).default = (): void => {
    loadCultureFiles();

    let formatPainterRTE:RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['FormatPainter','Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'SuperScript', 'SubScript', '|',
                'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
                'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image', '|', 'Undo', 'Redo','SourceCode', 'FullScreen'] 
        }}
    );
    formatPainterRTE.appendTo('#formatPainterRTE');

    let allowedFormatInput: TextBox = new TextBox({
        placeholder: `span; strong; em; sup, sub; code;`,
        floatLabelType: 'Never',
        cssClass : 'e-outline',
        blur: setAllowedFormats
    });
    allowedFormatInput.appendTo('#allowedFormatInput');

    let deniedFormatInput: TextBox = new TextBox({
        placeholder: `span(important)[title]{background-color,color};`,
        floatLabelType: 'Never',
        cssClass : 'e-outline',
        blur: setdeniedFormats
    });
    deniedFormatInput.appendTo('#deniedFormatInput');

    function setAllowedFormats (e: FocusOutEventArgs): void  {
        formatPainterRTE.formatPainterSettings.allowedFormats = e.value;
    }
    function setdeniedFormats (e: FocusOutEventArgs): void  {
        formatPainterRTE.formatPainterSettings.deniedFormats = e.value;
    }
};