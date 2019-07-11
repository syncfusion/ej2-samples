import { loadCultureFiles } from '../common/culture-loader';

import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { textdata, getSparkData } from './data-source';
import { EmitType } from '@syncfusion/ej2-base';
import { Sparkline, ISparklineLoadEventArgs, SparklineTheme } from '@syncfusion/ej2-charts';
import { RowDataBoundEventArgs, getObject } from '@syncfusion/ej2-grids';


/**
 * column template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let grid: TreeGrid = new TreeGrid({
        dataSource: textdata,
        childMapping: 'Children',
        treeColumnIndex: 0,
        rowDataBound: (args: RowDataBoundEventArgs) : void => {
            let data: string = getObject('EmployeeID', args.data);
            let spkline: HTMLElement = args.row.querySelector('#spkline' + data);
            let spkarea: HTMLElement = args.row.querySelector('#spkarea' + data);
            let spkwl: HTMLElement = args.row.querySelector('#spkwl' + data);
            let line: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                lineWidth: 2,
                valueType: 'Numeric',
                fill: '#3C78EF',
                dataSource: getSparkData('line', +data)
            });
            line.appendTo(spkline);
            let column: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                type: 'Column',
                valueType: 'Numeric',
                fill: '#3C78EF',
                negativePointColor: '#f7a816',
                dataSource: getSparkData('column', +data)
            });
            column.appendTo(spkarea);
            let winloss: Sparkline = new Sparkline({
                height: '50px',
                width: '150px', load: sparkload,
                type: 'WinLoss',
                valueType: 'Numeric',
                fill: '#3C78EF',
                tiePointColor: 'darkgray',
                negativePointColor: '#f7a816',
                dataSource: getSparkData('column', +data)
            });
            winloss.appendTo(spkwl);
        },
        rowHeight: 83,
        columns: [
            { field: 'EmpID', headerText: 'Employee ID', width: 95 },
            { field: 'Name', headerText: 'Name', width: 110 },
            { field: 'DOB', headerText: 'DOB', width: 90, textAlign: 'Right', format: 'yMd' },
            {
                headerText: 'Tax per annum', textAlign: 'Center',
                template: '#columnTemplate1', width: 90
            },
            {
                headerText: 'One day index', textAlign: 'Center',
                template: '#columnTemplate2', width: 90
            },
            {
                headerText: 'Year GR', textAlign: 'Center',
                template: '#columnTemplate3', width: 120
            },
        ],
        width: 'auto',
        height: 359
    });
    grid.appendTo('#Grid');
    // custom code start
    let sparkload: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
};





