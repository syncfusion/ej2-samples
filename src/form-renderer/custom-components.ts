import { loadCultureFiles } from '../common/culture-loader';
import { FormRenderer } from '@syncfusion/ej2-form-renderer';
import { contactForm } from './datasource';

(window as any).default = (): void => {
    loadCultureFiles();

    let formRenderer: FormRenderer = new FormRenderer({
        schema: contactForm,
        customWidgetSettings: [
            {
                templateId: 'textboxTemplate',
                template: textboxTemplate
            },
            {
                templateId: 'emailTemplate',
                template: emailTemplate
            },
            {
                type: 'dropdown',
                template: dropdownTemplate
            },
            {
                type: 'textarea',
                template: textareaTemplate
            },
            {
                type: 'checkbox',
                template: checkboxTemplate
            },
            {
                type: 'button',
                template: submitButtonTemplate
            }
        ]
    });
    formRenderer.appendTo('#form-renderer-control');

    function textboxTemplate(args: any) {
        const textbox: HTMLElement = document.createElement('input');
        textbox.id = 'form-renderer-control-' + args.fieldData.id;
        textbox.className = 'e-input';
        (textbox as HTMLInputElement).name = args.fieldData.name;
        (textbox as HTMLInputElement).type = 'text';
        (textbox as HTMLInputElement).placeholder = args.fieldData.placeholder;
        textbox.addEventListener('change', (event: Event) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLInputElement).value); });
        textbox.addEventListener('blur', (event: FocusEvent) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLInputElement).value); });
        return textbox;
    }

    function emailTemplate(args: any) {
        const textbox: HTMLElement = document.createElement('input');
        textbox.id = 'form-renderer-control-' + args.fieldData.id;
        textbox.className = 'e-input';
        (textbox as HTMLInputElement).name = args.fieldData.name;
        (textbox as HTMLInputElement).type = args.fieldData.textboxType;
        (textbox as HTMLInputElement).placeholder = args.fieldData.placeholder;
        textbox.addEventListener('change', (event: Event) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLInputElement).value); });
        textbox.addEventListener('blur', (event: FocusEvent) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLInputElement).value); });
        return textbox;
    }

    function dropdownTemplate(args: any) {
        const selectElement: HTMLElement = document.createElement('select');
        selectElement.className = 'fr-dropdown';
        selectElement.id = 'form-renderer-control-' + args.fieldData.id;
        (selectElement as HTMLSelectElement).name = args.fieldData.name;
        for(let i = 0; i < args.fieldData.options.length; i++) {
            let optionElement: HTMLElement = document.createElement('option');
            (optionElement as HTMLOptionElement).value = args.fieldData.options[i].value;
            (optionElement as HTMLOptionElement).text =  args.fieldData.options[i].text
            selectElement.appendChild(optionElement);
        }
        return selectElement;
    }

    function textareaTemplate(args: any) {
        const textarea: HTMLElement = document.createElement('textarea');
        textarea.id = 'form-renderer-control-' + args.fieldData.id;
        textarea.className = 'e-input';
        (textarea as HTMLTextAreaElement).name = args.fieldData.name;
        (textarea as HTMLTextAreaElement).minLength = args.fieldData.minLength;
        (textarea as HTMLTextAreaElement).maxLength = args.fieldData.maxLength;
        (textarea as HTMLTextAreaElement).rows = args.fieldData.rows;
        (textarea as HTMLTextAreaElement).placeholder = args.fieldData.placeholder;
        textarea.addEventListener('change', (event: Event) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLTextAreaElement).value); });
        textarea.addEventListener('blur', (event: FocusEvent) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLTextAreaElement).value); });
        return textarea;
    }

    function checkboxTemplate(args: any) {
        const label: HTMLElement = document.createElement('label');
        label.style.cssText = 'font-size: 14px; font-weight: 500;';
        (label as HTMLLabelElement).htmlFor = 'form-renderer-control-' + args.fieldData.id;
        const checkbox: HTMLElement = document.createElement('input');
        checkbox.style.cssText = 'margin-right: 10px; height: 15px; width:15px;';
        checkbox.id = 'form-renderer-control-' + args.fieldData.id;
        (checkbox as HTMLInputElement).name = args.fieldData.name;
        (checkbox as HTMLInputElement).type = 'checkbox';
        checkbox.addEventListener('change', (event: Event) => { formRenderer.setFieldValue(args.fieldData.id, (event.target as HTMLTextAreaElement).value); });
        label.appendChild(checkbox);
        const textNode: any = document.createTextNode(args.fieldData.label);
        label.appendChild(textNode);
        return label;
    }

    function submitButtonTemplate(args: any) {
        return '<button class="e-btn e-primary" id="form-renderer-control-' + args.fieldData.id +'" name="' + args.fieldData.name +'" type="' + args.fieldData.buttonType +'">' + args.fieldData.label +'</button>';
    }
};