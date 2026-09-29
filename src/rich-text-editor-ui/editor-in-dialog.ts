import { loadCultureFiles } from '../common/culture-loader';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

(window as any).default = (): void => {
    loadCultureFiles();
    let editorObj: RichTextEditorUI;

    let dialogObj: Dialog = new Dialog({
        header: 'Compose Message',
        target: document.querySelector('.sample-container') as HTMLElement,
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        width: '600px',
        height: '300px',
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'Send', isPrimary: true }
        }, {
            click: dlgCancel,
            buttonModel: { content: 'Cancel' }
        }],
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#editorDialog');

    // Initialize RTE inside Dialog
    function initializeEditor(): void {
        if (!editorObj) {
            let contentDiv: HTMLElement = document.createElement('div');
            contentDiv.id = 'dialogEditorContent';
            let dialogContent: HTMLElement = document.querySelector('#editorDialog .e-dlg-content') as HTMLElement;
            if (dialogContent) {
                dialogContent.appendChild(contentDiv);
                editorObj = new RichTextEditorUI({
                    placeholder: 'Write your message...',
                    toolbarSettings: {
                        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'BulletFormatList', 'NumberFormatList', '|', 'Link', 'Undo', 'Redo']
                    }
                });
                editorObj.appendTo('#dialogEditorContent');
            }
        }
    }

    let button: Button = new Button({});
    button.appendTo('#dialogBtn');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    function dlgButtonClick(): void {
        let content: string = editorObj.getHtml();
        if (content && content.replace(/<[^>]*>/g, '').trim()) {
            alert('Message sent:\n\n' + content.replace(/<[^>]*>/g, ''));
            editorObj.value = '';
            editorObj.dataBind();
            dialogObj.hide();
        }
    }

    function dlgCancel(): void {
        if (editorObj) {
            editorObj.value = '';
            editorObj.dataBind();
        }
        dialogObj.hide();
    }

    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
        
        // Add IDs to dialog elements for styling
        setTimeout((): void => {
            let dialogElement: HTMLElement = document.querySelector('#editorDialog .e-dialog') as HTMLElement;
            if (dialogElement && !dialogElement.id) {
                dialogElement.id = 'mainDialog';
            }
            let dialogHeader: HTMLElement = document.querySelector('#editorDialog .e-dlg-header') as HTMLElement;
            if (dialogHeader && !dialogHeader.id) {
                dialogHeader.id = 'dialogHeader';
            }
            let dialogContent: HTMLElement = document.querySelector('#editorDialog .e-dlg-content') as HTMLElement;
            if (dialogContent && !dialogContent.id) {
                dialogContent.id = 'dialogContent';
            }
            let dialogFooter: HTMLElement = document.querySelector('#editorDialog .e-footer-content') as HTMLElement;
            if (dialogFooter && !dialogFooter.id) {
                dialogFooter.id = 'dialogFooter';
            }
        }, 0);
        
        initializeEditor();
        if (editorObj) {
            editorObj.focusIn();
        }
    }
};
