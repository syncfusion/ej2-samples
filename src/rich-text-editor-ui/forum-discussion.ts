import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { ListView } from '@syncfusion/ej2-lists';

interface IComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    time: string;
}

(window as any).default = (): void => {
    loadCultureFiles();
    let userAvatar: string = 'src/rich-text-editor-ui/images/1.png';
    let userName: string = 'Selma Rose';

    const editor: RichTextEditorUI = new RichTextEditorUI({
        placeholder: 'Write your comment...',
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'BulletFormatList', 'NumberFormatList', '|', 'Link', 'Undo', 'Redo']
        }
    });
    editor.appendTo('#editor');

    let comments: IComment[] = [
        {
            id: 1,
            author: 'Jane Smith',
            avatar: 'src/rich-text-editor-ui/images/2.png',
            content: 'Has anyone tried the new <b>rich text editor</b>? I love how clean the toolbar looks now.',
            date: 'Sep 3, 2026',
            time: '02:10 PM'
        },
        {
            id: 2,
            author: 'Mark Johnson',
            avatar: 'src/rich-text-editor-ui/images/3.png',
            content: 'I am also enjoying the updated UI. The <i>inline editing</i> experience feels really smooth!',
            date: 'Sep 3, 2026',
            time: '10:24 AM'
        }
    ];
    let listView: ListView = new ListView({
        dataSource: comments as any,
        template: (data: IComment): string => `
            <div class="comment-item">
                <img class="comment-avatar" src="${data.avatar}" alt="${data.author}">
                <div class="comment-body">
                    <div class="comment-actions">
                        <button class="e-btn e-icons e-copy e-icon-btn e-flat e-small action-btn copy-btn" title="Copy"></button>
                        <button class="e-btn e-icons e-trash e-icon-btn e-flat e-small action-btn delete-btn" title="Delete"></button>
                    </div>
                    <div class="comment-header">
                        <span class="comment-author">${data.author}</span>
                        <span class="comment-time">commented on ${data.date} at ${data.time}</span>
                    </div>
                    <div class="comment-text">${data.content}</div>
                </div>
            </div>`
    });
    listView.appendTo('#commentsList');

    let clearEditor = (): void => {
        editor.value = '';
        editor.refresh();
    };

    document.getElementById('updateBtn').addEventListener('click', (): void => {
        let content: string = editor.getHtml();
        if (!content || !content.replace(/<[^>]*>/g, '').trim()) {
            return;
        }
        let now: Date = new Date();
        comments = [{
            id: now.getTime(),
            author: userName,
            avatar: userAvatar,
            content: content,
            date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }, ...comments];
        listView.dataSource = comments as any;
        clearEditor();
    });

    document.getElementById('discardBtn').addEventListener('click', (): void => {
        clearEditor();
    });

    document.getElementById('commentsList').addEventListener('click', (e: MouseEvent): void => {
        let target: HTMLElement = (e.target as HTMLElement).closest('.action-btn') as HTMLElement;
        if (!target) { return; }
        let item: HTMLElement = target.closest('.e-list-item') as HTMLElement;
        let id: number = Number(item.getAttribute('data-uid'));
        let comment: IComment | undefined = comments.find((c: IComment) => c.id === id);
        if (!comment) { return; }

        if (target.classList.contains('copy-btn')) {
            navigator.clipboard.writeText(comment.content.replace(/<[^>]*>/g, ''));
        } else if (target.classList.contains('delete-btn')) {
            comments = comments.filter((c: IComment) => c.id !== id);
            listView.dataSource = comments as any;
        }
    });
};
