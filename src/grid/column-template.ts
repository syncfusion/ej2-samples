import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Sort, Filter, Column, IFilterCreate } from '@syncfusion/ej2-grids';
import { employeeDetail } from './data-source';
import { ChipList } from '@syncfusion/ej2/buttons';
import { createElement } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Selection, Sort, Filter);
/**
 * column template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dropInstance: MultiSelect;
    let operators: Object = {
        stringOperator: [
            { value: 'contains', text: 'Contains' },
            { value: 'doesnotcontain', text: 'Does Not Contains' }
        ],
    };
    let filter = {
        type: 'Menu',
        ui: {
            create: (args: IFilterCreate) => {
                let flValInput: HTMLElement = createElement('input', {
                    className: 'flm-input',
                });
                args.target.appendChild(flValInput);
                let dropdownData: string[] = ['Phone', 'Mouse', 'Laptop', 'Keyboard', 'Headset', 'Tablet', 'Projector', 'Printer', 'Calculator'];
                dropInstance = new MultiSelect({
                    dataSource: dropdownData,
                    placeholder: 'Select a value',
                    popupHeight: '200px',
                    allowFiltering: true,
                    mode: 'Box',
                });
                dropInstance.appendTo(flValInput);
            },
            write: (args: any) => {
                if (args.filteredValue && args.filteredValue.length > 0) {
                    (dropInstance as MultiSelect).value = args.filteredValue.split(', ');
                }
            },
            read: (args: { column: Column; operator: string; fltrObj: Filter }) => {
                grid.removeFilteredColsByField(args.column.field);
                if ((dropInstance.value as string[]).length) {
                    args.fltrObj.filterByColumn(
                        args.column.field,
                        args.operator,
                        (dropInstance.value as string[]).sort().join(', ')
                    );
                }
            },
        },
    };
    let grid: Grid = new Grid({
        dataSource: employeeDetail,
        height: 400,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'CheckBox', operators: operators },
        queryCellInfo: queryCellInfo,
        columns: [
            {
                headerText: 'Image', textAlign: 'Center',
                template: '#template', width: 180
            },
            { field: 'EmployeeID', headerText: 'ID', width: 160 },
            { field: 'Name', headerText: 'Name', width: 120 },
            { field: 'MailID', headerText: 'Email ID', width: 150, template: '#mailIDTemplate' },
            { field: 'Designation', headerText: 'Designation', width: 160 },
            { field: 'DateOfJoining', headerText: 'Date Joined', width: 170, format: 'yMd', textAlign: 'Right', type:'date' },
            { field: 'Team', headerText: 'Team(s)', width: 160 },
            { field: 'ReportTo', headerText: 'Reporter', width: 120 },
            { field: 'EmployeeAvailability', headerText: 'Availability', width: 150, template: '#statusTemplate' },
            { field: 'YearOfExperience', headerText: 'Experience', width: 180 },
            { field: 'AssetKit', headerText: 'Asset Kit', width: 180, filter: filter, template: '#assetTemplate' },
            { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: 170, format: 'yMd', textAlign: 'Right', type:'date' },
            { field: 'Location', headerText: 'Location', width: 150, template: '#locationTemplate' },
            { field: 'PhoneNumber', headerText: 'Contact No', width: 150, textAlign: 'Right' },
        ],
    });
    grid.appendTo('#Grid');

    function queryCellInfo(args:any) {
        if (args.column.field === 'AssetKit') {
            var assetValue = args.data[args.column.field].split(',');
            const asset: ChipList = new ChipList({
                chips: assetValue
            });
            asset.appendTo(args.cell.querySelector('#assetElement'));
        }
    }

    (<{statusTemplate?: Function}>window).statusTemplate = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        if (e.EmployeeAvailability === 'Available') {
            span.className = 'statustxt e-availablecolor';
            span.textContent = 'Available';
            div.className = 'statustemp e-availablecolor';
        } else {
            span.className = 'statustxt e-nonavailablecolor';
            span.textContent = 'Not Available';
            div.className = 'statustemp e-nonavailablecolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };

    (<{employeeTemplate?: Function}>window).employeeTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'image';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/' + e.EmployeeID.replace('Emp100','') + '.png';
        imgElement.alt = e.EmployeeID;
        divElement.appendChild(imgElement);
        return divElement.outerHTML;
    };
};