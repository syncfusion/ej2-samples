import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI ,SlashCommand} from '@syncfusion/ej2-richtexteditor-ui';
import { INLINE_EDITING_CONTENT } from './inline-editing-content';

RichTextEditorUI.Inject(SlashCommand);

(window as any).default = (): void => {
    loadCultureFiles();
    const editor: RichTextEditorUI = new RichTextEditorUI({
        placeholder: 'Type something ...',
        value: INLINE_EDITING_CONTENT,
        toolbarSettings: {
            enable: false
        },
        quickToolbarSettings: {
            text: ['Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'FontColor', 'BackgroundColor', '|', 'Formats', 'Alignment', '|', 'Table' , 'Image' , 'Link', '|', 'FontName', 'FontSize','|', 'NumberFormatList', 'BulletFormatList','|','Subscript','Superscript']
        },
        slashCommandSettings: {
            enable: true,
        }
    });
    editor.appendTo('#editor');
};