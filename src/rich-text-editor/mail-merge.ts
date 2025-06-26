import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor mail merge sample
 */
import {
    RichTextEditor,
    Toolbar,
    Link,
    Image,
    HtmlEditor,
    QuickToolbar,
    Table,
    PasteCleanup,
    ActionCompleteEventArgs,
    ActionBeginEventArgs,
} from '@syncfusion/ej2-richtexteditor';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Mention } from '@syncfusion/ej2-dropdowns';

RichTextEditor.Inject(
    Toolbar,
    Link,
    Image,
    HtmlEditor,
    QuickToolbar,
    Table,
    PasteCleanup
);

(window as any).default = (): void => {
    loadCultureFiles();

    const rteValue: string = `<p>Dear <span contenteditable="false" class="e-mention-chip"><span>{{FirstName}}</span></span> <span contenteditable="false" class="e-mention-chip"><span>{{LastName}}</span></span>,</p>
<p>We are thrilled to have you with us! Your unique promotional code for this month is: <span contenteditable="false" class="e-mention-chip"><span>{{PromoCode}}</span></span>.</p>
<p>Your current subscription plan is: <span contenteditable="false" class="e-mention-chip"><span>{{SubscriptionPlan}}</span></span>.</p>
<p>Your customer ID is: <span contenteditable="false" class="e-mention-chip"><span>{{CustomerID}}</span></span>.</p>
<p>Your promotional code expires on: <span contenteditable="false" class="e-mention-chip"><span>{{ExpirationDate}}</span></span>.</p>
<p>Feel free to browse our latest offerings and updates. If you need any assistance, don't hesitate to contact us at <a href="mailto:{{SupportEmail}}"><span contenteditable="false" class="e-mention-chip"><span>{{SupportEmail}}</span></span></a> or call us at <span contenteditable="false" class="e-mention-chip"><span>{{SupportPhoneNumber}}</span></span>.</p>
<p>Best regards,<br>The <span contenteditable="false" class="e-mention-chip"><span>{{CompanyName}}</span></span> Team</p>`;

    const textToValueMap: { [key: string]: string } = {
        'First Name': 'FirstName',
        'Last Name': 'LastName',
        'Support Email': 'SupportEmail',
        'Company Name': 'CompanyName',
        'Promo Code': 'PromoCode',
        'Support Phone Number': 'SupportPhoneNumber',
        'Customer ID': 'CustomerID',
        'Expiration Date': 'ExpirationDate',
        'Subscription Plan': 'SubscriptionPlan',
    };

    const dropdownContent: string = ` <span style="display:inline-flex;">
    <span class="e-rte-dropdown-btn-text">Insert Field</span>
    </span>`;

    const mergeData: any = [
        { text: 'First Name', value: 'FirstName' },
        { text: 'Last Name', value: 'LastName' },
        { text: 'Support Email', value: 'SupportEmail' },
        { text: 'Company Name', value: 'CompanyName' },
        { text: 'Promo Code', value: 'PromoCode' },
        { text: 'Support Phone Number', value: 'SupportPhoneNumber' },
        { text: 'Customer ID', value: 'CustomerID' },
        { text: 'Expiration Date', value: 'ExpirationDate' },
        { text: 'Subscription Plan', value: 'SubscriptionPlan' },
    ];

    const placeholderData: { [key: string]: string } = {
        FirstName: 'John',
        LastName: 'Doe',
        PromoCode: 'ABC123',
        SubscriptionPlan: 'Premium',
        CustomerID: '123456',
        ExpirationDate: '2024-12-31',
        SupportEmail: 'support@example.com',
        SupportPhoneNumber: '+1-800-555-5555',
        CompanyName: 'Example Inc.',
    };

    function onActionBegin(args: ActionBeginEventArgs) {
        if (
            args.requestType === 'EnterAction' &&
            mentionObj.element.classList.contains('e-popup-open')
        ) {
            args.cancel = true;
        }
    }

    function actionCompleteHandler(e: ActionCompleteEventArgs): void {
        if (e.requestType === 'SourceCode') {
            mailMergeEditor.getToolbar().querySelector('#merge_data').parentElement.classList.add('e-overlay');
            mailMergeEditor.getToolbar().querySelector('#insertField').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            mailMergeEditor.getToolbar().querySelector('#merge_data').parentElement.classList.remove('e-overlay');
            mailMergeEditor.getToolbar().querySelector('#insertField').parentElement.classList.remove('e-overlay');
        }
    }

    function onDropDownClose() {
        if (mailMergeEditor) {
            mailMergeEditor.focusIn();
        }
    }

    function onItemSelect(args: MenuEventArgs): void {
        if (args.item.text != null) {
            const value = textToValueMap[args.item.text];
            const trimmedValue = value.trim();
            mailMergeEditor.formatter.editorManager.nodeSelection.restore();
            mailMergeEditor.executeCommand(
                'insertHTML',
                `<span contenteditable="false" class="e-mention-chip"><span>{{${trimmedValue}}}</span></span>&nbsp;`,
                { undo: true }
            );
        }
    }

    function onClickHandler(args: any): void {
        if (mailMergeEditor) {
            let editorContent = mailMergeEditor.value;
            let mergedContent = replacePlaceholders(editorContent, placeholderData);
            if ((mailMergeEditor as any).formatter.getUndoRedoStack().length === 0) {
                (mailMergeEditor as any).formatter.saveData();
            }
            mailMergeEditor.value = mergedContent;
            (mailMergeEditor as any).formatter.saveData();
        } else {
            console.log('MailMergeEditor is not initialized.');
        }
    }

    function replacePlaceholders(
        template: string,
        data: { [key: string]: string }
    ): string {
        return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            const value = data[key.trim()];
            const result = value !== undefined ? value : match;
            return result;
        });
    }

    const mailMergeEditor: RichTextEditor = new RichTextEditor({
        value: rteValue,
        toolbarSettings: {
            items: [
                'Bold',
                'Italic',
                'Underline',
                '|',
                'Formats',
                'Alignments',
                'OrderedList',
                'UnorderedList',
                '|',
                'CreateLink',
                'Image',
                'CreateTable',
                '|',
                { tooltipText: 'Merge Data', template: '#merge_data', command: 'Custom' },
                { tooltipText: 'Insert Field', template: '#insertField', command: 'Custom' },
                'SourceCode',
                '|',
                'Undo',
                'Redo',
            ],
        },
        actionBegin: onActionBegin,
        actionComplete: actionCompleteHandler,
        saveInterval: 1,
    });
    mailMergeEditor.appendTo('#mailMergeEditor');

    let insertField: DropDownButton = new DropDownButton({
        items: [
            { text: 'First Name' },
            { text: 'Last Name' },
            { text: 'Support Email' },
            { text: 'Company Name' },
            { text: 'Promo Code' },
            { text: 'Support Phone Number' },
            { text: 'Customer ID' },
            { text: 'Expiration Date' },
            { text: 'Subscription Plan' },
        ],
        content: dropdownContent,
        select: onItemSelect,
        close: onDropDownClose
    });
    insertField.appendTo('#insertField');
    document.getElementById('merge_data')?.addEventListener('click', onClickHandler);

    const mentionObj: Mention = new Mention({
        dataSource: mergeData,
        target: '#mailMergeEditor',
        mentionChar: '{{',
        fields: { text: 'text' },
        allowSpaces: true,
        popupWidth: '250px',
        popupHeight: '200px',
        displayTemplate: '<span> {{${value}}} </span>',
    });
    mentionObj.appendTo('#mentionField');

};
