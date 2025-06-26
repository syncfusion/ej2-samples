import { loadCultureFiles } from '../common/culture-loader';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { CheckBoxSelection, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
MultiSelect.Inject(CheckBoxSelection);


/**
 * Default image editor sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    // File extensions data
    const fileExtensionsList = [
        { Name: "JPEG", Value: ".jpeg" },
        { Name: "JPG", Value: ".jpg" },
        { Name: "PNG", Value: ".png" },
        { Name: "SVG", Value: ".svg" },
        { Name: "WebP", Value: ".webp" },
        { Name: "BMP", Value: ".bmp" }
    ];

    // Initial values
    let minFileSize = 1; // 1 KB
    let maxFileSize = 100; // 100 KB
    let allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp, .bmp";
    let units: { text: string }[] = [{ text: 'KB' }, { text: 'MB' }];
    let defaultUnit: string = 'KB';

    let minFileNumeric: NumericTextBox = new NumericTextBox({
        width: '150px',
        value: minFileSize,
        min: 1,
        change: function (args: any) {
            minFileSize = args.value;
            updateUploadSettings();
        }
    });
    minFileNumeric.appendTo('#minFileSize');


    let maxFileNumeric: NumericTextBox = new NumericTextBox({
        width: '150px',
        value: maxFileSize,
        min: 1,
        change: function (args: any) {
            maxFileSize = args.value;
            updateUploadSettings();
        }
    });
    maxFileNumeric.appendTo('#maxFileSize');

    // initialize MultiSelect component
    let msObject: MultiSelect = new MultiSelect({
        dataSource: fileExtensionsList,
        width: '210px',
        fields: { text: 'Name', value: 'Value' },
        mode: 'CheckBox',
        showSelectAll: true,
        value: allowedExtensions.split(', '),
        change: function (args: any) {
            if (args.value.length === 0) {
                allowedExtensions = ".jpeg, .jpg, .png, .svg, .webp, .bmp";
              } else {
                allowedExtensions = args.value.join(', ');
              }
            updateUploadSettings();
        }
    });
    // render initialized MultiSelect
    msObject.appendTo('#allowedExtensions');

    // Initialize Image Editor
    let imageEditorObj: ImageEditor = new ImageEditor({
        uploadSettings: {
            minFileSize: minFileSize,
            maxFileSize: maxFileSize,
            allowedExtensions: allowedExtensions
        },
        created: function () {
            updateUploadSettings();
        }
    });
    imageEditorObj.appendTo('#imageeditor');

    // Update Image Editor Upload Settings
    function updateUploadSettings() {
        imageEditorObj.uploadSettings = {
            minFileSize: convertToBytes(minFileSize),
            maxFileSize: convertToBytes(maxFileSize),
            allowedExtensions: allowedExtensions
        };
        imageEditorObj.update();
    }

    const drpDownBtn = new DropDownButton({
        content: defaultUnit,
        items: units,
        select: ({ item }: { item: { text: string } }) => updateUnit(item.text),
        beforeItemRender: ({ item, element }: { item: { text: string }, element: HTMLElement }) => {
            if (item.text === defaultUnit) element.classList.add('e-selected');
        }
    });
    drpDownBtn.appendTo('#dropdownbtn');
    
    function updateUnit(unit: string): void {
        drpDownBtn.content = defaultUnit = unit;
        updateUploadSettings();
    }
    
    function convertToBytes(value: number): number {
        return value * (defaultUnit === 'MB' ? 1024 * 1024 : 1024);
    }
};
