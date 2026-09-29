import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

(window as any).default = (): void => {
    loadCultureFiles();
    const editor: RichTextEditorUI = new RichTextEditorUI({
        placeholder: 'Type or paste content here to try the API methods...',
        toolbarSettings: {
            items: [
                'Bold', 'Italic', 'Underline', '|',
                'FontColor', 'BackgroundColor', '|',
                'Formats', '|',
                'NumberFormatList', 'BulletFormatList', '|',
                'Undo', 'Redo'
            ]
        }
    });
    editor.appendTo('#editor');

    const output: HTMLElement = document.getElementById('methods-output') as HTMLElement;
    const log = (value: unknown): void => {
        const text: string = value === undefined || value === null
            ? String(value)
            : typeof value === 'string'
                ? value
                : JSON.stringify(value);
        output.textContent = `${text}`;
    };

    (document.getElementById('btn-getHtml') as HTMLButtonElement).onclick = (): void => {
        log(editor.getHtml());
    };
    (document.getElementById('btn-getText') as HTMLButtonElement).onclick = (): void => {
        log(editor.getText());
    };
    
    (document.getElementById('btn-getDocument') as HTMLButtonElement).onclick = (): void => {
        log(editor.getDocument());
    };
    (document.getElementById('btn-focus') as HTMLButtonElement).onclick = (): void => {
        editor.focusIn();
        log('editor focused');
    };
    (document.getElementById('btn-blur') as HTMLButtonElement).onclick = (): void => {
        editor.focusOut();
        log('editor blurred');
    };
};
