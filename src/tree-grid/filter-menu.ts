import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Page, Filter } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page, Filter );

/**
 * Menu Filter TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let type: { [key: string]: Object }[] = [
        { id: 'Menu', type: 'Menu' },
        { id: 'Excel', type: 'Excel' }
    ];

    let mode: { [key: string]: Object }[] = [
        { id: 'Parent', mode: 'Parent' },
        { id: 'Child', mode: 'Child' },
        { id: 'Both', mode: 'Both' },
        { id: 'None', mode: 'None' },
    ];
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowFiltering: true,
            filterSettings: { type: 'Menu'},
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 120 },
                { field: 'taskName', headerText: 'Task Name', width: 220 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 140, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 120 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
    let dropDownType: DropDownList = new DropDownList({
        dataSource: type,
        popupWidth: '100%',
        width:'100px',
        fields: { text: 'type', value: 'id' },
        value: 'Menu',
        change: (e: ChangeEventArgs) => {
            let type: any = <string>e.value;
            treegrid.filterSettings.type = type;
            treegrid.clearFiltering();
        }
    });
    dropDownType.appendTo('#filtertype');
    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        popupWidth: '100%',
        width:'100px',
        fields: { text: 'mode', value: 'id' },
        value: 'Parent',
        change: (e: ChangeEventArgs) => {
            let mode: any = <string>e.value;
            treegrid.filterSettings.hierarchyMode = mode;
            treegrid.clearFiltering();
        }
    });
    dropDownMode.appendTo('#mode');
};