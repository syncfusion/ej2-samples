import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Overview Sample
 */
import { RichTextEditor, Toolbar, Link, Image, MarkdownEditor, Table } from '@syncfusion/ej2-richtexteditor';
import { MarkdownFormatter } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import * as Marked from 'marked';
import { Mention } from '@syncfusion/ej2-dropdowns';

RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor, Table);

let textArea: HTMLTextAreaElement;
let mdsource: HTMLElement;

(window as any).default = (): void => {
    loadCultureFiles();

    let markdownMention: RichTextEditor = new RichTextEditor({
        height: '250px',
        placeholder : "Enter your text here...",
        formatter: new MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.'} }),
        toolbarSettings: {
            items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
            'UnorderedList', 'SuperScript', 'SubScript', '|', 'CreateLink', 'Image', 'CreateTable', '|',
           { tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
               '<span class="e-btn-icon e-md-preview e-icons"></span></button>' }, '|', 'Undo', 'Redo']

        },
        editorMode: 'Markdown',
        value:'Hello [@Maria](mailto:maria@gmail.com)\n\nWelcome to the mention integration with markdown editor demo. Type @ character and tag user from the suggestion list.',
        created: () => {
            textArea = markdownMention.contentModule.getEditPanel() as HTMLTextAreaElement;
            textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
                markDownConversion();
            });
            mdsource = document.getElementById('preview-code');
            mdsource.addEventListener('click', (e: MouseEvent) => {
                fullPreview();
                if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                    markdownMention.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                        'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
                } else {
                    markdownMention.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                        'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
                }
            });
        }
    });
    function markDownConversion(): void {
        if (mdsource.classList.contains('e-active')) {
            let id: string = markdownMention.getID() + 'html-view';
            let htmlPreview: HTMLElement = markdownMention.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked((markdownMention.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    function fullPreview(): void {
        let id: string = markdownMention.getID() + 'html-preview';
        let htmlPreview: HTMLElement = markdownMention.element.querySelector('#' + id);
        let previewTextArea: HTMLElement = markdownMention.element.querySelector('.e-rte-content') as HTMLElement;
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            previewTextArea.style.overflow = 'hidden';
        } else {
            mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
                previewTextArea.style.overflow = 'auto';
            }
            if (previewTextArea.style.overflow === 'hidden') {
                previewTextArea.style.overflow = 'auto';
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked((markdownMention.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    markdownMention.appendTo('#markdownMention');
    const emailData: MentionUser[] = [
        { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
        { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
        { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
        { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
        { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
        { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
        { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
        { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
        { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
        { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
        { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
        { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
        { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
        { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
    ];
    const mention: Mention = new Mention({
        dataSource: emailData as unknown as { [key: string]: Object }[],
        fields: { text: 'name' },
        displayTemplate: '[@${name}](mailto:${email})',
        itemTemplate: '#editorMentionListTemplate',
        popupWidth: '250px',
        popupHeight: '200px',
        sortOrder: 'Ascending',
        target: markdownMention.inputElement,
        allowSpaces: true,
      });
      mention.appendTo('#editorMention');
      interface MentionUser {
        name: string;
        initial: string;
        email: string;
        color: string;
        bgColor: string;
      }
};