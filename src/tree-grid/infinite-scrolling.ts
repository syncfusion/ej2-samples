import { loadCultureFiles } from '../common/culture-loader';
import { InfiniteScroll, TreeGrid } from '@syncfusion/ej2-treegrid';
import { virtualData, dataSource } from './data-source';
/**
 * infinitescrolling sample
 */
TreeGrid.Inject(InfiniteScroll);

(window as any).default = (): void => {
    loadCultureFiles();
    if (!virtualData.length) {
        dataSource();
    }
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: virtualData,
            enableInfiniteScrolling: true,
            treeColumnIndex: 1,
            childMapping: 'Crew',
            pageSettings: { pageSize: 50 },
            height: 400,
            columns: [
                { field: 'TaskID', headerText: 'Player Jersey', width: 140, textAlign: 'Right' },
                { field: 'FIELD1', headerText: 'Player Name', width: 140 },
                { field: 'FIELD2', headerText: 'Year', width: 120, textAlign: 'Right' },
                { field: 'FIELD3', headerText: 'Stint', width: 90, textAlign: 'Right' },
                { field: 'FIELD4', headerText: 'TMID', width: 90, textAlign: 'Right' },
                { field: 'FIELD5', headerText: 'LGID', width: 90, textAlign: 'Right' },
                { field: 'FIELD6', headerText: 'GP', width: 90, textAlign: 'Right' },
                { field: 'FIELD7', headerText: 'GS', width: 90, textAlign: 'Right' }
               ]
        });
    treegrid.appendTo('#TreeGrid');
};
