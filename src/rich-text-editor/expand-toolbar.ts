/**
 * RichTextEditor expand toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, ToolbarType, HtmlEditor} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor);

this.default = (): void => {
let defaultRTE: RichTextEditor = new RichTextEditor({
    toolbarSettings: {
        type: ToolbarType.Expand,
        items: ['|', 'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'SubScript', 'SuperScript', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', '|', 'Image', '|', 'SourceCode',
            '|', 'ClearFormat']
    },
    /* tslint:disable */
    value: `<div><img style="width:250px; height:350px; padding-right:20px; float:left;margin: 12px 22px" alt="Logo" src="./src/rich-text-editor/images/rte3.png" /></div>
    <div style="display:block">
    <p>Angular 2 is a massively popular JavaScript framework built to take advantage of component development in web apps.In Angular 2 Succinctly, author Joseph D. Booth will guide you through setting up a development environment,interacting with the Angular CLI, building Hello World, and more. By the end, you’ll know how to set up templates,compose components from those templates, and tie them all together with modules to deliver a cohesive web app.</p><p></p><p><b>Table of content</b></p>
    <ol style="list-style-type:disc; padding-top:10px">
    <li><p>Introduction</p></li>
    <li><p>Dev Environment</p></li>
    <li><p>Customization</p></li>
    <li><p>Your Environment</p></li>
    <li><p>Exploring Hello World</p></li></ol>
    </div>`
    /* tslint:enable */
});
defaultRTE.appendTo('#defaultRTE');
};
