import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { EDITOR_CONTENT } from './basic-editing-content';

(window as any).default = (): void => {
    loadCultureFiles();
    const editor: RichTextEditorUI = new RichTextEditorUI({
        toolbarSettings: {
            items: ['Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Subscript', 'Superscript', '|', 'FontColor', 'BackgroundColor',  '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table' , '|', 'NumberedList', 'BulletList', '|', 'Quote', 'ClearFormat']
        },
        value: EDITOR_CONTENT,
        placeholder: 'Type something.'
    });
    editor.appendTo('#editor');
};