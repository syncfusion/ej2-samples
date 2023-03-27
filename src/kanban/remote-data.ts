import { loadCultureFiles } from '../common/culture-loader';
import { DataManager } from '@syncfusion/ej2-data';
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
/**
 * Kanban remote data sample
 */

let dataManger: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Kanban',
    crossDomain: true
});

(window as any).default = (): void => {
    loadCultureFiles();
    let kanbanObj: Kanban = new Kanban({      //Initialize Kanban control
        dataSource: dataManger,
        keyField: 'Status',
        allowDragAndDrop: false,
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Testing', keyField: 'Testing' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id'
        },
        dialogOpen: dialogOpen
    });
    kanbanObj.appendTo('#Kanban');      //Render initialized Kanban control
    function dialogOpen(args: DialogEventArgs): void {
        args.cancel = true;
    }
};
