import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { Kanban, DialogEventArgs, dialogOpen} from '@syncfusion/ej2-kanban';
import { DatePicker } from '@syncfusion/ej2-calendars';

/**
 * Kanban Card template Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanPizzaData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Category',
        columns: [
            { headerText: 'Menu', keyField: 'Menu' },
            { headerText: 'Order', keyField: 'Order' },
            { headerText: 'Ready to Serve', keyField: 'Ready to Serve' },
            { headerText: 'Delivered', keyField: 'Delivered,Served' }
        ],
        cardSettings: {
           headerField: 'Id',
           template: '#cardTemplate'            
        },
        dialogSettings: {
            template: '#dialogTemplate'
        },
        dialogClose:onDialogClose,
        dialogOpen: onDialogOpen
        
    });
    let categoryData: string[] = ['Menu', 'Order', 'Ready to Serve', 'Delivered','Served'];
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
            function onDialogOpen(args: DialogEventArgs): void {
                if (args.requestType !== 'Delete') {
                    let curData: { [key: string]: Object } = args.data as { [key: string]: Object };
                    let filledTextBox: TextBox = new TextBox({});
                    filledTextBox.appendTo(args.element.querySelector('#Id') as HTMLInputElement);
                    let numericObj: NumericTextBox = new NumericTextBox({
                        value: curData.Estimate as number, placeholder: 'Estimate'
                    });
                    numericObj.appendTo(args.element.querySelector('#Estimate') as HTMLInputElement);

                let categoryDropObj: DropDownList = new DropDownList({
                    value: curData.Category as string, popupHeight: '300px',
                    dataSource: categoryData, fields: { text: 'Category', value: 'Category' }, placeholder: 'Category'
                });
                categoryDropObj.appendTo(args.element.querySelector('#Category') as HTMLInputElement);

                let titleObj: TextBox = new TextBox({
                    placeholder: 'Title',
                    
                });
                titleObj.appendTo(args.element.querySelector('#Title') as HTMLInputElement);
                
                let sizeObj: TextBox = new TextBox({
                    placeholder: 'Size',
                });
                sizeObj.appendTo(args.element.querySelector('#Size') as HTMLInputElement);
    
                let textareaObj: TextBox = new TextBox({
                    placeholder: 'Description',
                    multiline:true
                });
                textareaObj.appendTo(args.element.querySelector('#Description') as HTMLInputElement);
                
                let datepicker: DatePicker = new DatePicker({
                    value: curData.Date as Date, 
                    format: 'MM/dd/yyyy',
                });
                datepicker.appendTo(args.element.querySelector('#datepicker') as HTMLInputElement);
            }
        }
            function  onDialogClose(args: DialogEventArgs) {
                if(args.element.querySelector('#datepicker') as any)
                {
                    args.data.Date =(args.element.querySelector('#datepicker') as any).ej2_instances[0].value.toLocaleString('es-PR').split(" ")[0];
                }
       }
};