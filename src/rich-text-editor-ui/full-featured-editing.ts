import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI ,SlashCommand} from '@syncfusion/ej2-richtexteditor-ui';
import { FULL_FEATURED_CONTENT } from './full-featured-content';

RichTextEditorUI.Inject(SlashCommand);

const hostUrl: string = 'https://services.syncfusion.com/js/production/';

(window as any).default = (): void => {
    loadCultureFiles();
    let editor: RichTextEditorUI = new RichTextEditorUI({
        value: FULL_FEATURED_CONTENT,
        toolbarSettings: {
            items: [ 'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'InlineCode', '|', 'Link', 'Image', 'Table', 'CodeBlock', 'HorizontalLine', 'Quote', '|', 'Formats', 'Alignment', 'Callout', '|', 'BulletFormatList', 'NumberFormatList', 'Checklist', '|', 'Outdent', 'Indent', '|', 'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|', 'LowerCase', 'UpperCase', '|', 'Superscript', 'Subscript', '|', 'ClearFormat']
        },
        quickToolbarSettings: {
            text: ['Bold', 'Italic', 'Underline', 'Strikethrough', 'BackgroundColor', 'FontColor', '|', 'Formats', '|', 'Link', 'Table', 'Image', 'ClearFormat']
        },
        slashCommandSettings: {
            enable: true,
        },
        imageSettings: {
            uploadUrl: hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
            imageUrl: hostUrl + 'RichTextEditor/'
        },
        placeholder:'Type something...'
    });
    editor.appendTo('#editor');
};