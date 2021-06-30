import { TextBox } from '@syncfusion/ej2-inputs';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Spreadsheet, CellRenderEventArgs, BeforeSelectEventArgs } from '@syncfusion/ej2-spreadsheet';

/**
 * Cell template
 */
// custom code start
/* tslint:disable:max-func-body-length */
// custom code end
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Spreadsheet component
    let spreadsheet: Spreadsheet = new Spreadsheet({
        showRibbon: false,
        showFormulaBar: false,
        allowOpen: false,
        allowSave: false,
        allowEditing: false,
        selectionSettings: {
        mode: 'None'
        },
        scrollSettings: {
            isFinite: true
        },
        sheets: [{
            rowCount: 40,
            showGridLines: false,
            name: 'Registration Form',
            rows: [{
                height: 55,
                cells: [{
                    index: 1,
                    value: 'Interview Registration Form',
                    style: {
                        fontSize: '12pt',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        textDecoration: 'underline'
                    }
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Name'
                }],
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Date of Birth:'
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Gender:'
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Year of Experience:'
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Areas of Interest:'
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Mobile Number:'
                }]
            }, {
                height: 45,
                cells: [{
                    index: 1,
                    value: 'Email:'
                }]
            }, {
                height: 82,
                cells: [{
                    index: 1,
                    value: 'Address:'
                }]
            }],
            columns: [{
                index: 1,
                width: 190
            }, {
                width: 350
            }],
            ranges: [{
                template: '<input />',
                address: 'C2:C3'
            }, {
                template: '<div><input type="radio" name="gender" value="male" /><input type="radio" name="gender" value="female"/></div>',
                address: 'C4'
            }, {
                template: '<input />',
                address: 'C5:C8'
            }, {
                template: '<textarea rows="3"/>',
                address: 'C9'
            }, {
                template: '<button class="e-btn e-flat" style="float:right">Add</button>',
                address: 'C11'
            }]
        }],
        beforeCellRender: (args: CellRenderEventArgs) => {
            //Initializing input components before cell rendering
            if (spreadsheet.activeSheetIndex === 0) {
                let target: HTMLInputElement = args.element.firstElementChild as HTMLInputElement;
                switch (args.address) {
                    case 'B1':
                        (args.element as HTMLTableCellElement).colSpan = 2;
                        break;
                    case 'C2':
                        new TextBox({ placeholder: 'Name' }, target);
                        break;
                    case 'C3':
                        new DatePicker({ placeholder: 'DOB',  }, target);
                        break;
                    case 'C4':
                        new RadioButton({ label: 'Male' }, args.element.firstElementChild.firstElementChild as HTMLInputElement);
                        new RadioButton({ label: 'Female' }, args.element.firstElementChild.lastElementChild as HTMLInputElement);
                        break;
                    case 'C5':
                        let experience: string[] =  ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
                        new DropDownList(
                            { placeholder: 'Experience', dataSource: experience},  target );
                        break;
                    case 'C6':
                        let languages: string[] = ['JAVA', 'C#', 'SQL'];
                        new MultiSelect(
                            { showClearButton: false, placeholder: 'Areas of Interest', dataSource: languages }, target);
                        break;
                    case 'C7':
                        new TextBox({ placeholder: 'Mobile Number' }, target);
                        break;
                    case 'C8':
                        new TextBox({ placeholder: 'Email'}, target);
                        break;
                    case 'C9':
                        new TextBox(null, target);
                        break;
                }
            }
        },
        created: () => {
            //Applies format to specified range
            spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
        }
    });
    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadsheet');
};
// custom code start
/* tslint:enable:max-func-body-length */
// custom code end
