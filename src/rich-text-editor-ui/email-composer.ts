import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Toast } from '@syncfusion/ej2-notifications';

RichTextEditorUI.Inject(SlashCommand);

(window as any).default = (): void => {
    loadCultureFiles();
    const editor: RichTextEditorUI = new RichTextEditorUI({
        placeholder: 'Compose your email...',
        slashCommandSettings: {
            enable: true
        },
        toolbarSettings: {
            items: ['Undo','Redo','|','Bold','Italic','Underline','Strikethrough','|','FontColor','BackgroundColor','|','Formats','Alignment','|','FontName','FontSize','|','NumberFormatList','BulletFormatList','|','Table','Image','Link','|','Subscript','Superscript']
        }
    });

    editor.appendTo('#editor');

    const emailData: { [key: string]: Object }[] = [
        { Name: 'Selma Rose', Eimg: '2', EmailId: 'selma@gmail.com' },
        { Name: 'Maria', Eimg: '1', EmailId: 'maria@gmail.com' },
        { Name: 'Russo Kay', Eimg: '8', EmailId: 'russo@gmail.com' },
        { Name: 'Robert', Eimg: 'dp', EmailId: 'robert@gmail.com' },
        { Name: 'Camden Kate', Eimg: '9', EmailId: 'camden@gmail.com' },
        { Name: 'Garth', Eimg: '7', EmailId: 'garth@gmail.com' },
        { Name: 'Andrew James', Eimg: 'pic04', EmailId: 'james@gmail.com' },
        { Name: 'Olivia', Eimg: '5', EmailId: 'olivia@gmail.com' },
        { Name: 'Sophia', Eimg: '6', EmailId: 'sophia@gmail.com' },
        { Name: 'Margaret', Eimg: '3', EmailId: 'margaret@gmail.com' },
        { Name: 'Ursula Ann', Eimg: 'dp', EmailId: 'ursula@gmail.com' },
        { Name: 'Laura Grace', Eimg: '4', EmailId: 'laura@gmail.com' },
        { Name: 'Albert', Eimg: 'pic03', EmailId: 'albert@gmail.com' },
        { Name: 'William', Eimg: '10', EmailId: 'william@gmail.com' }
    ];

    const itemTemplate = (data: { [key: string]: Object }): string => {
        const image: string = data.Eimg ? String(data.Eimg) : 'dp';
        return '<table class="mail-item"><tr>' +
        '<td><img class="mail-item-img" src="src/rich-text-editor-ui/images/' + image + '.png" alt="' + data.Name + '" /></td>' +
        '<td><span class="mail-item-name">' + data.Name + '</span>' +
        '<span class="mail-item-email">' + data.EmailId + '</span></td>' +
        '</tr></table>';
    };

    const valueTemplate = (data: { [key: string]: Object }): string => {
        const image: string = data.Eimg ? String(data.Eimg) : 'dp';
        return '<div class="mail-value">' +
        '<img class="mail-value-img" src="src/rich-text-editor-ui/images/' + image + '.png" alt="' + data.Name + '" />' +
        '<span class="mail-value-name">' + data.Name + '</span>' +
        '</div>';
    };

    const toRecipient: MultiSelect = new MultiSelect({
        dataSource: emailData,
        fields: {
            text: 'Name',
            value: 'EmailId'
        },
        mode: 'Box',
        allowFiltering: true,
        allowCustomValue: true,
        placeholder: 'Recipients',
        itemTemplate: itemTemplate,
        valueTemplate: valueTemplate
    });

    toRecipient.appendTo('#toRecipient');

    const ccRecipient: MultiSelect = new MultiSelect({
        dataSource: emailData,
        fields: {
            text: 'Name',
            value: 'EmailId'
        },
        mode: 'Box',
        allowFiltering: true,
        allowCustomValue: true,
        placeholder: 'Cc',
        itemTemplate: itemTemplate,
        valueTemplate: valueTemplate
    });

    ccRecipient.appendTo('#ccRecipient');

    const toast: Toast = new Toast({
        position: { X: 'Right', Y: 'Top' },
        showProgressBar: false,
        newestOnTop: true,
        timeOut: 2500,
        showCloseButton: true
    });

    toast.appendTo('#mailToast');

    const showToast = (title: string, message: string): void => {
        toast.show({
            title,
            content: message,
            cssClass: 'e-toast-success'
        });
    };

    const clearComposer = (): void => {
        toRecipient.value = [];
        toRecipient.dataBind();

        ccRecipient.value = [];
        ccRecipient.dataBind();

        const subjectInput: HTMLInputElement = document.getElementById('subject') as HTMLInputElement;
        if (subjectInput) {
            subjectInput.value = '';
        }
    };

    const sendButton = document.getElementById('sendMail');

    sendButton?.addEventListener('click', () => {
        clearComposer();
        editor.value="";
        editor.refresh();
        showToast('Mail Composer', 'Mail sent successfully.');
    });

    const discardButton = document.getElementById('discardMail');

    discardButton?.addEventListener('click', () => {
        clearComposer();
        editor.value="";
        editor.refresh();
        showToast('Mail Composer', 'Mail discarded. Composer cleared.');
    });
};
