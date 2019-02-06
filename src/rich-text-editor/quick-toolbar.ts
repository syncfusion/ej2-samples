import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor default sample
 */
import { RichTextEditor, Toolbar, Link, Image, created, QuickToolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, QuickToolbar, HtmlEditor);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            image: [
                 'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '|', 'Display', 'AltText', 'Dimension',
                {
                    tooltipText: 'Rotate Left',
                    template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-roatate-left"></span>'
                },
                {
                    tooltipText: 'Rotate Right',
                    template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-roatate-right"></span>'
                }
            ]
        },
        created: oncreate
    });
    defaultRTE.appendTo('#defaultRTE');

    function oncreate(): void {
        document.getElementById('rteImageID').onclick = (e: Event) => {
            let rotateLeft: HTMLElement = document.getElementById('roatateLeft');
            let rotateRight: HTMLElement = document.getElementById('roatateRight');
            rotateLeft.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
                imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            };
            rotateRight.onclick = (e: Event) => {
                let imgEle: HTMLElement = document.getElementById('rteImageID');
                let transform: number = parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
                imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            };
        };
    }
};
