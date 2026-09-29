import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Edit, Toolbar, VirtualScroll, AdvancedFilter, EditEventArgs, Column, LoadEventArgs } from '@syncfusion/ej2-grids';
import { ticketdata } from './data-source';
Grid.Inject(Sort, Edit, Toolbar, VirtualScroll, AdvancedFilter);

const initialAdvancedFilterRule = {
    condition: 'and',
    rules: [{
        field: 'Status',
        label: 'Status',
        type: 'string',
        operator: 'notequal',
        value: 'done'
    }]
};
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: ticketdata,
        enableVirtualization: true,
        allowSorting: true,
        height: 400,
        rowHeight: 45,
        load: function (args: LoadEventArgs) {
            if (args) {
                args.enableSeamlessScrolling = true;
            }
        },
        pageSettings: { pageSize: 50 },
        allowAdvancedFiltering: true,
        toolbar: ['Edit', 'Delete', 'AdvancedFilter'],
        editSettings: { allowEditing: true, allowDeleting: true, mode: 'Dialog'},
        actionBegin: function (args: EditEventArgs) {
            if (args.requestType === 'beginEdit' || args.requestType === 'add') {
                for (let i = 0; i < grid.columns.length; i++) {
                    const column = grid.columns[i] as Column;
                    const field = column.field as string;
                    if (field === 'Title' || field === 'TypeofRequest' || field === 'CreatedDate') {
                        column.visible = false;
                    }
                }
            }
            if (args.requestType === 'save' || args.requestType === 'cancel') {
                for (let i = 0; i < grid.columns.length; i++) {
                    const column = grid.columns[i] as Column;
                    const field = column.field as string;
                    if (field === 'Title' || field === 'TypeofRequest' || field === 'CreatedDate') {
                        column.visible = true;
                    }
                }
            }
        },
        advancedFilterSettings: {
            queryBuilderSettings: {
                rule: initialAdvancedFilterRule
            }
        },
        columns: [
            { field: 'TicketID', headerText: 'Ticket ID', textAlign: 'Right', width: 120, isPrimaryKey: true },
            { field: 'Title', headerText: 'Title', width: 260, allowEditing: false },
            { field: 'TypeofRequest', headerText: 'Type', width: 150, allowEditing: false },
            { field: 'Assignee', headerText: 'Assignee', width: 150, editType: 'dropdownedit' },
            { field: 'Priority', headerText: 'Priority', width: 130, editType: 'dropdownedit' },
            { field: 'Status', headerText: 'Status', width: 130, editType: 'dropdownedit' },
            { field: 'CreatedDate', headerText: 'Created Date', width: 140,textAlign: 'Right',format: 'yMd',allowEditing: false },
            { field: 'DueDate', headerText: 'Due Date', width: 140 ,textAlign: 'Right', format: 'yMd', editType: 'datepickeredit',}
        ]
    })
    grid.appendTo('#Grid');
};
