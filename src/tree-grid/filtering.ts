import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Column, Page, Filter } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page, Filter );

/**
 * Filtering TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let mode: { [key: string]: Object }[] = [
        { id: 'Parent', mode: 'Parent' },
        { id: 'Child', mode: 'Child' },
        { id: 'Both', mode: 'Both' },
        { id: 'None', mode: 'None' },
    ];
    let dropDownFilter: DropDownList;
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowFiltering: true,
            filterSettings: { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' },
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                {field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90,
                 filterBarTemplate: {
                    create: (args: { element: Element, column: Column }) => {
                        let dd: HTMLInputElement = document.createElement('input');
                        dd.id = 'duration';
                        return dd;
                    },
                    write: (args: { element: Element, column: Column }) => {
                        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
                        dropDownFilter = new DropDownList({
                            dataSource: dataSource,
                            value: 'All',
                            change: (e: ChangeEventArgs) => {
                                let valuenum: any = +e.value;
                                let id: any = <string>dropDownFilter.element.id;
                                let value: any = <string>e.value;
                                if ( value !== 'All') {
                                    treegrid.filterByColumn( id, 'equal', valuenum );
                                } else {
                                    treegrid.removeFilteredColsByField(id);
                                }
                            }
                        });
                        dropDownFilter.appendTo('#duration');
                 } } }
            ]
        });
    treegrid.appendTo('#Grid');
    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        popupWidth: '100%',
        fields: { text: 'mode', value: 'id' },
        value: 'Parent',
        change: (e: ChangeEventArgs) => {
            let mode: any = <string>e.value;
            treegrid.filterSettings.hierarchyMode = mode;
            treegrid.clearFiltering();
            dropDownFilter.value = 'All';
        }
    });
    dropDownMode.appendTo('#mode');
};