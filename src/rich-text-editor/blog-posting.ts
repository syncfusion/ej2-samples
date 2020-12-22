import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Blog-post sample
 */
import { RichTextEditor, Link, Image, HtmlEditor, Toolbar, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { Button } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined as isNOU} from '@syncfusion/ej2-base';
RichTextEditor.Inject(Link, Image, HtmlEditor, Toolbar, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();
    let button1: Button = new Button({ isPrimary: true });
    button1.appendTo('#rteSubmit');

    let button2: Button = new Button();
    button2.appendTo('#rteCancel');

    let defaultRTE: RichTextEditor = new RichTextEditor({ placeholder: 'Write a reply' });
    defaultRTE.appendTo('#defaultRTE');
    let buttonEle: HTMLElement = document.getElementById('rteSubmit');
    let cancelEle: HTMLElement = document.getElementById('rteCancel');
    cancelEle.addEventListener('click', (e: any) => {
        let answerElement: Element = defaultRTE.contentModule.getEditPanel();
        answerElement.innerHTML = '';
        defaultRTE.value = '';
        defaultRTE.dataBind();
        defaultRTE.refresh();
    });
    let empCount: number = 0;
    buttonEle.addEventListener('click', (e: any) => {
        let answerElement: HTMLElement = defaultRTE.contentModule.getEditPanel() as HTMLElement;
        let comment: string = answerElement.innerHTML;
        let empList: string[] = ['emp1', 'emp2', 'emp3'];
        let nameListList: string[] = ['Anne Dodsworth', 'Janet Leverling', 'Laura Callahan'];
        if (comment !== null && comment.trim() !== '' && (answerElement.innerText.trim() !== '' ||
        !isNOU(answerElement.querySelector('img')) || !isNOU(answerElement.querySelector('table')))) {
            let answer: HTMLElement = document.querySelector('.answer');
            let cloneAnswer: HTMLElement = answer.cloneNode(true) as HTMLElement;
            let authorName: HTMLElement = cloneAnswer.querySelector('.authorname');
            let logo: HTMLElement = cloneAnswer.querySelector('.logos');
            logo.classList.remove('logos');
            if (empCount < 3) {
                logo.classList.add(empList[empCount]);
                authorName.innerHTML = nameListList[empCount];
                empCount++;
            } else {
                logo.classList.add('logo');
                authorName.innerHTML = 'User';
            }
            let timeZone: HTMLElement = cloneAnswer.querySelector('.detailsAnswer');
            let day: string = getMonthName(new Date().getMonth()) + ' ' + new Date().getDate();
            let hr: string = new Date().getHours() + ':' + new Date().getMinutes();
            if (new Date().getHours() > 12) {
                hr = hr + ' PM';
            } else {
                hr = hr + ' AM';
            }
            timeZone.innerHTML = 'Answered on ' + day + ', ' + new Date().getFullYear() + ' ' + hr;
            let postContent: HTMLElement = cloneAnswer.querySelector('.posting');
            postContent.innerHTML = comment;
            let postElement: HTMLElement = document.querySelector('.answerSection');
            postElement.appendChild(cloneAnswer);
            let countEle: HTMLElement = document.querySelector('.answerCount');
            let count: number = parseInt(countEle.innerHTML, null);
            count = count + 1;
            countEle.innerHTML = count.toString() + ' Answers';
            answerElement.innerHTML = '';
            defaultRTE.value = '';
            defaultRTE.dataBind();
            defaultRTE.refresh();
        }
    });
    function getMonthName(index: number): string {
        let month: string[] = [];
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        return month[index];
    }
};