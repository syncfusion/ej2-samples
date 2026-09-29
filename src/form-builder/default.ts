import { loadCultureFiles } from '../common/culture-loader';
import { FormBuilder } from '@syncfusion/ej2-form-builder';

(window as any).default = (): void => {
    loadCultureFiles();

    let formBuilder: FormBuilder = new FormBuilder({
    schema: {
        "properties": {
        },
        "layout": [
        ],
        "settings": {
            "name": "Untitled Form",
            "width": "100%"
        }
    }
});
    formBuilder.appendTo('#form-builder-control');
};