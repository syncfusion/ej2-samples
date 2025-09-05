import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, Edit, Filter, Sort, Page } from '@syncfusion/ej2-treegrid';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * empty record template sample
 */

TreeGrid.Inject(Toolbar, Edit, Filter, Sort, Page);

(window as any).default = (): void => {
    loadCultureFiles();

    // Define data sources for dropdowns to avoid inline repetition
    const priorityDataSource = [
        { priority: "Low" },
        { priority: "Medium" },
        { priority: "High" },
        { priority: "Critical" }
    ];

    const statusDataSource = [
        { status: "Open" },
        { status: "Inprogress" },
        { status: "Review-Request" },
        { status: "Review-Reject" },
        { status: "Closed" }
    ];

    // Initialize TreeGrid with empty data
    const treegrid: TreeGrid = new TreeGrid({
        dataSource: [],
        childMapping: 'subtasks',
        treeColumnIndex: 1,
        emptyRecordTemplate: '#emptytemplate',
        toolbar: ['Add', 'Delete', 'Update', 'Cancel', 'Search'],
        editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'Menu' },
        columns: [
            {
                field: 'taskID',
                headerText: 'Task ID',
                type: 'number',
                textAlign: 'Right',
                isPrimaryKey: true,
                validationRules: { required: true, min: 0 },
                width: 100
            },
            {
                field: 'taskName',
                headerText: 'Task Name',
                type: 'string',
                textAlign: 'Left',
                validationRules: { required: true },
                width: 120,
                clipMode: "EllipsisWithTooltip"
            },
            {
                field: 'priority',
                headerText: 'Priority',
                type: 'string',
                editType: 'dropdownedit',
                edit: { params: { dataSource: priorityDataSource } }, // Reference defined variable
                textAlign: 'Left',
                width: 100
            },
            {
                field: 'assignee',
                headerText: 'Assignee',
                type: 'string',
                textAlign: 'Left',
                width: 100
            },
            {
                field: 'status',
                headerText: 'Status',
                type: 'string',
                textAlign: 'Left',
                editType: 'dropdownedit',
                edit: { params: { dataSource: statusDataSource } }, // Reference defined variable
                width: 100
            },
            {
                field: 'duration',
                headerText: 'Duration in Days',
                type: 'number',
                editType: "numericedit",
                textAlign: 'Right',
                width: 140
            },
        ],
        dataBound: function () {
            // Check if the grid has no data records
            const isGridEmpty = treegrid.flatData.length === 0;
            if (treegrid.searchSettings.key === '' || treegrid.searchSettings.key === undefined) {
                treegrid.toolbarModule.enableItems([treegrid.element.id + '_gridcontrol_searchbar'], !isGridEmpty);
            }

            // Toggle filter menu icons based on whether the grid is empty and no filters are applied
            const filterMenuDivs: NodeListOf<HTMLElement> = treegrid?.element.querySelectorAll('.e-filtermenudiv');
            filterMenuDivs.forEach((div: HTMLElement) => {
                if (isGridEmpty && treegrid?.grid.filterSettings.columns.length === 0) {
                    div.classList.add('e-disabled');
                    div.style.cursor = 'default';
                } else {
                    div.classList.remove('e-disabled');
                    div.style.removeProperty('cursor');
                }
            });
        },
        actionComplete: onActionComplete,
    });
    treegrid.appendTo('#TreeGrid');

    // Handler for action complete events to manage search bar and filter dialog visibility
    function onActionComplete(args: any) {
        // Enable search bar after clearing filter if data is present
        if (args.action === 'clearFilter' && treegrid.flatData.length !== 0) {
            treegrid.toolbarModule.enableItems([treegrid.element.id + '_gridcontrol_searchbar'], true);
        }
        // Disable search bar after deleting all records
        else if ((args.requestType === 'delete' || args.requestType === 'searching') && treegrid.flatData.length === 0 && treegrid.searchSettings.key === '') {
            treegrid.toolbarModule.enableItems([treegrid.element.id + '_gridcontrol_searchbar'], false);
        }
        // Toggle filter dialog visibility when opening filter on an empty grid view
        if (args.requestType === 'filterAfterOpen' && treegrid.flatData.length === 0) {
            if (args.filterModel.filterSettings.columns.length > 0 &&
                args.filterModel.filterSettings.columns.some((col: any) => col.field === args.columnName)) {
                args.filterModel.dlgObj.show();
            } else {
                args.filterModel.dlgObj.hide();
            }
        }
    };
}