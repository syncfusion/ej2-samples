import { loadCultureFiles } from '../common/culture-loader';
import { InfiniteScroll, Grid } from '@syncfusion/ej2-grids';
import { Button } from '@syncfusion/ej2-buttons';
import { virtualData, dataSource } from './data-source';
/**
 * infiniteScrolling sample
 */
Grid.Inject(InfiniteScroll);

(window as any).default = (): void => {
    loadCultureFiles(); let genarateData: Button = new Button({}, '#genarate');
    let data: Object[] = [];
    genarateData.element.onclick = () => {
        if (!data.length) {
            dataSource(); grid.dataSource = data = virtualData;
        }
    };
    let grid: Grid = new Grid(
        {
            dataSource: [],
            enableInfiniteScrolling: true,
            height: 410,
            pageSettings: {pageSize: 50},
            columns: [
                { field: 'FIELD1', headerText: 'Player Name', width: 140 },
                { field: 'FIELD2', headerText: 'Year', width: 120, textAlign: 'Right' },
                { field: 'FIELD3', headerText: 'Stint', width: 120, textAlign: 'Right' },
                { field: 'FIELD4', headerText: 'TMID', width: 120, textAlign: 'Right' },
                { field: 'FIELD5', headerText: 'LGID', width: 120, textAlign: 'Right' },
                { field: 'FIELD6', headerText: 'GP', width: 120, textAlign: 'Right' },
                { field: 'FIELD7', headerText: 'GS', width: 120, textAlign: 'Right' }]
        });
    grid.appendTo('#Grid');
};
