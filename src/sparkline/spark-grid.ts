// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Default Spark with Grid sample
 */
import { Grid, Selection } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { orderdata } from './data-source';
import { Sparkline } from '@syncfusion/ej2-charts';
Grid.Inject(Selection);

import { ISparklineLoadEventArgs, SparklineTheme } from '@syncfusion/ej2-charts/index';
// custom code start
export let sparkload: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Fluent2';
    args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
};
// tslint:disable:no-any
// custom code end
export let winloss: EmitType<Object> = () => {
    let windata: number[] = [];
    let r: number;
    for (let i: number = 1; i <= 12; i++) {
        r = Math.random();
        if (r <= 0.2) {
            windata.push(-Math.random() * 10);
        } else {
            windata.push(Math.random() * 10);
        }
    }
    return windata;
};
export let lineData: Object[] = [
    [0, 6, 4, 1, 3, 2, 5],
    [5, 4, 6, 3, 1, 2, 0],
    [6, 4, 0, 3, 2, 5, 1],
    [4, 6, 3, 0, 1, 2, 5],
    [3, 5, 6, 4, 0, 1, 2],
    [1, 3, 4, 2, 5, 0, 6],
    [2, 4, 0, 3, 5, 6, 1],
    [5, 4, 6, 3, 1, 2, 0],
    [0, 6, 4, 1, 3, 2, 5],
    [6, 4, 0, 3, 2, 5, 1],
    [4, 6, 3, 0, 1, 2, 5],
    [3, 5, 6, 4, 0, 1, 2],
    [1, 3, 4, 2, 5, 0, 6],
    [2, 4, 0, 3, 5, 6, 1],
    [5, 4, 6, 3, 1, 2, 0],
    [0, 6, 4, 1, 3, 2, 5],
    [6, 4, 0, 3, 2, 5, 1],
    [4, 6, 3, 0, 1, 2, 5],
    [2, 4, 0, 3, 5, 6, 1],
    [3, 5, 6, 4, 0, 1, 2],
    [1, 3, 4, 2, 5, 0, 6]
];
export let columnData: Object[] = [
    [0, 6, -4, 1, -3, 2, 5],
    [5, -4, 6, 3, -1, 2, 0],
    [6, 4, 0, 3, -2, 5, 1],
    [4, -6, 3, 0, 1, -2, 5],
    [3, 5, -6, -4, 0, 1, 2],
    [1, -3, 4, -2, 5, 0, 6],
    [2, 4, 0, -3, 5, -6, 1],
    [5, 4, -6, 3, 1, -2, 0],
    [0, -6, 4, 1, -3, 2, 5],
    [6, 4, 0, -3, 2, -5, 1],
    [4, 6, -3, 0, 1, 2, 5],
    [3, -5, -6, 4, 0, 1, 2],
    [1, 3, -4, -2, 5, 0, 6],
    [2, -4, 0, -3, 5, 6, 1],
    [5, 4, -6, 3, 1, -2, 0],
    [0, 6, 4, -1, -3, 2, 5],
    [6, -4, 0, -3, 2, 5, 1],
    [4, 6, -3, 0, -1, 2, 5],
    [6, 4, 0, -3, 2, -5, 1],
    [3, 5, 6, -4, 0, 1, 2],
    [1, 3, -4, 2, -5, 0, 6]
];
export let getSparkData: Function = (type: string, count: number) => {
    if (type === 'line') {
        return lineData[count];
    } else {
        return columnData[count];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: new DataManager(orderdata as JSON[]).executeLocal(new Query().take(20)),
        allowSelection: false,
        enableHover: true,
        height: 400,
        columns: [
            { field: 'EmployeeID', headerText: 'ID', textAlign: 'Right', width: 40 },
            { field: 'CustomerID', headerText: 'Name', width: 60 },
            { field: 'OrderDate', headerText: 'Order Date', width: 65, format: 'yMd', textAlign: 'Right' },
            { field: 'ShipCountry', headerText: 'Ship Country', width: 70 },
            { headerText: 'Tax per annum', template: '#columnTemplate1', textAlign: 'Center', width: 100 },
            { headerText: 'One Day Index', template: '#columnTemplate2', textAlign: 'Center', width: 100 },
            { headerText: 'Year GR', template: '#columnTemplate3', textAlign: 'Center', width: 100 }
        ],
    });
    grid.appendTo('#Grid');
    setTimeout(() => {
        for (let i: number = 1; i < 21; i++) {
            let line: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                lineWidth: 2,
                valueType: 'Numeric',
                fill: '#3C78EF',
                dataSource: getSparkData('line', i)
            });
            line.appendTo('#spkline' + i);
            let column: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                type: 'Column',
                valueType: 'Numeric',
                fill: '#3C78EF',
                negativePointColor: '#f7a816',
                dataSource: getSparkData('column', i)
            });
            column.appendTo('#spkarea' + i);
            let winloss: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                type: 'WinLoss',
                valueType: 'Numeric',
                fill: '#3C78EF',
                tiePointColor: 'darkgray',
                negativePointColor: '#f7a816',
                dataSource: getSparkData('column', i)
            });
            winloss.appendTo('#spkwl' + i);
        }
        // tslint:disable-next-line:align
    }, 500);
};