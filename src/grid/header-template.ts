import { loadCultureFiles } from '../common/culture-loader';
import { Grid } from '@syncfusion/ej2-grids';
import { employeeDetail } from './data-source';
import { ChipList } from '@syncfusion/ej2-buttons';

/**
 * Default Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: employeeDetail,
            height: 400,
            queryCellInfo: queryCellInfo,
            columns: [
                {
                    headerText: 'Image', textAlign: 'Center',
                    template: '#template', width: 180, headerTemplate: '#employeeImageTemplate'
                },
                { field: 'EmployeeID', headerText: 'ID', width: 160 },
                { field: 'Name', headerText: 'Name', width: 120 },
                { field: 'MailID', headerText: 'Email ID', width: 150, template:'#mailIDTemplate', headerTemplate: '#mailIDHeaderTemplate'},
                { field: 'AssetKit', headerText: 'Asset Kit', width: 180, template: '#assetTemplate', headerTemplate: '#assetHeaderTemplate'},
                { field: 'AssetKitDistribution', headerText: 'Assigned Date', width: 170, headerTemplate: '#datetemplate', format: 'yMd', textAlign: 'Right' },
                { field: 'Location', headerText: 'Location', width: 200, template: '#locationTemplate', headerTemplate: '#locationHeaderTemplate' },
                { field: 'PhoneNumber', headerText: 'Contact No', width: 180, textAlign: 'Right', headerTemplate: '#phoneHeaderTemplate'},
            ]
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
