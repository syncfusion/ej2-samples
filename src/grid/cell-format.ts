import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Page, Selection, Column } from '@syncfusion/ej2-grids';

Grid.Inject(Sort, Page, Selection);

/**
 * Cell Formatting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let details: Object[] = [];

    for (let i: number = 1; i < 10; i++) {
        let date: Date = new Date('March 20, 2015');
        date.setDate(date.getDate() + i);
        details.push(
            {
                Number: 3233333.233876 / i, Currency: 3500044 / i,
                Date: date, Verified: !Math.floor(Math.random() * (1 - 0 + 1) + 0)
            });
    }

    let grid: Grid = new Grid({
        columns: [
            { field: 'Number', format: 'N2', textAlign: 'Right', width: 110 },
            { field: 'Currency', format: 'C2', textAlign: 'Right', width: 110 },
            { field: 'Date', format: 'yMd', textAlign: 'Right', width: 110 },
        ],
        dataSource: details,
        allowSelection: false,
    });
    grid.appendTo('#Grid');
    document.getElementById('Date').onchange = (args: Event) => {
        let column : Column = grid.getColumnByField((args.srcElement as HTMLSelectElement).id);
        column.format = (args.srcElement as HTMLSelectElement).value;
        grid.renderModule.refresh({});
    };
    document.getElementById('Currency').onchange = (args: Event) => {
        let column : Column = grid.getColumnByField((args.srcElement as HTMLSelectElement).id);
        column.format = (args.srcElement as HTMLSelectElement).value;
        grid.renderModule.refresh({});
    };
    document.getElementById('Number').onchange = (args: Event) => {
        let column : Column = grid.getColumnByField((args.srcElement as HTMLSelectElement).id);
        column.format = (args.srcElement as HTMLSelectElement).value;
        grid.renderModule.refresh({});
    };
};