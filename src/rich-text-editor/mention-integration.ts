import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor mention integration sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);
import { Mention } from '@syncfusion/ej2-dropdowns';

(window as any).default = (): void => {
    loadCultureFiles();

    let emailData: { [key: string]: Object }[] = [
        { Name: "Selma Rose", Status: "active", Eimg: "2", EmailId: "selma@gmail.com" },
        { Name: "Maria", Status: "active", Eimg: "1", EmailId: "maria@gmail.com" },
        { Name: "Russo Kay", Status: "busy", Eimg: "8", EmailId: "russo@gmail.com" },
        { Name: "Robert", Status: "active", Eimg: "dp", EmailId: "robert@gmail.com" },
        { Name: "Camden Kate", Status: "active", Eimg: "9", EmailId: "camden@gmail.com" },
        { Name: "Garth", Status: "active", Eimg: "7", EmailId: "garth@gmail.com" },
        { Name: "Andrew James", Status: "away", Eimg: "pic04", EmailId: "james@gmail.com" },
        { Name: "Olivia", Status: "busy", Eimg: "5", EmailId: "olivia@gmail.com" },
        { Name: "Sophia", Status: "away", Eimg: "6", EmailId: "sophia@gmail.com" },
        { Name: "Margaret", Status: "active", Eimg: "3", EmailId: "margaret@gmail.com" }, 
	{ Name: "Ursula Ann", Status: "active", Eimg: "dp", EmailId: "ursula@gmail.com" },
        { Name: "Laura Grace", Status: "away", Eimg: "4", EmailId: "laura@gmail.com" },
        { Name: "Albert", Status: "active", Eimg: "pic03", EmailId: "albert@gmail.com" },
        { Name: "William", Status: "away", Eimg: "10", EmailId: "william@gmail.com" }
    ];

    let emailObj: Mention;
    let defaultRTE: RichTextEditor = new RichTextEditor({
        placeholder: 'Type @ and tag the name',
        actionBegin: (args) => {
            if (args.requestType === 'EnterAction' && emailObj.element.classList.contains('e-popup-open')) {
                args.cancel = true;
            }
        }
     });
    defaultRTE.appendTo('#mention_integration');

    // Initialize Mention component.
        emailObj = new Mention({
        dataSource: emailData,
        fields: { text: 'Name' },
        suggestionCount: 8,
        displayTemplate: '<a href=mailto:${EmailId} title=${EmailId}>@${Name}</a>',
        itemTemplate: '<table><tr><td><div id="mention-TemplateList"><img class="mentionEmpImage" src="src/rich-text-editor/images/${Eimg}.png" alt="employee" /><span class="e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom ${Status}"></span></div></td><td><span class="person">${Name}</span><span class="email">${EmailId}</span></td</tr></table>',
        popupWidth: '250px',
        popupHeight: '200px',
        target: defaultRTE.inputElement,
        allowSpaces: true

    });
    emailObj.appendTo('#mentionEditor');
};
