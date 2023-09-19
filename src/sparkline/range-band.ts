// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Default Spark with Grid sample
 */
import { Grid, Selection } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { getInstance } from '@syncfusion/ej2-base';
import { products } from './data-source';
import { Sparkline, SparklineModel } from '@syncfusion/ej2-charts';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
Grid.Inject(Selection);
import { ISparklineLoadEventArgs, SparklineTheme } from '@syncfusion/ej2-charts/index';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
export let sparkload: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
};
// custom code end
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
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let grid: Grid = new Grid({
        dataSource: new DataManager(products as JSON[]).executeLocal(new Query()),
        allowSelection: false,
        enableHover: true,
        height: 400,
        columns: [
            { field: 'name', headerText: 'Name', textAlign: 'Right', width: 50 },
            { headerText: '2010', template: '#columnTemplate1', textAlign: 'Center', width: 100 },
            { headerText: '2011', template: '#columnTemplate2', textAlign: 'Center', width: 100 },
        ],
    });
    grid.appendTo('#Grid');
    let sparkline: SparklineModel = {
        height: '50px',
        width: '150px', load: sparkload,
        lineWidth: 2,
        fill: '#0d3c9b',
        dataSource: lineData[0] as Number[],
        rangeBandSettings: [
            {
                startRange: 1, endRange: 3, color: '#bfd4fc'
            }
        ]
    };
    setTimeout(() => {
        for (let i: number = 1; i < 6; i++) {
            let first: Sparkline = new Sparkline(sparkline);
            first.dataSource = lineData[i] as number[];
            first.appendTo('#sparkline2010' + i);
            let second: Sparkline = new Sparkline(sparkline);
            second.dataSource = lineData[i + 5] as number[];
            second.appendTo('#sparkline2011' + i);
        }
        // custom code start
        // tslint:disable:align
        // custom code start
    }, 500);
    // code for property panel
    let sliderChange1: EmitType<SliderChangeEventArgs>;
    let sliderChange2: EmitType<SliderChangeEventArgs>;
    let slider1: Slider = new Slider(
    {
        value: 1,
        change: sliderChange1,
        max: 6, min: 0, type: 'MinRange',
    },
    '#range-min');
    let slider2: Slider = new Slider(
    {
        value: 3,
        change: sliderChange2,
        max: 6, min: 0, type: 'MinRange',
    },
    '#range-max');
    slider1.change = sliderChange1 = (e: SliderChangeEventArgs) => {
        changeRangeMin(e.value);
    };
    slider2.change = sliderChange2 = (e: SliderChangeEventArgs) => {
        changeRangeMax(e.value);
    };
    let changeRangeMin: Function = (min: number): void => {
        for (let i: number = 1; i < 6; i++) {
            let first: Sparkline = getInstance('#sparkline2010' + i, Sparkline) as Sparkline;
            let second: Sparkline = getInstance('#sparkline2011' + i, Sparkline) as Sparkline;
            first.rangeBandSettings[0].startRange = min;
            second.rangeBandSettings[0].startRange = min;
            first.refresh();
            second.refresh();
            document.getElementById('rmin').innerHTML = min.toString();
        }
    };
    let changeRangeMax: Function = (max: number): void => {
        for (let i: number = 1; i < 6; i++) {
            let first: Sparkline = getInstance('#sparkline2010' + i, Sparkline) as Sparkline;
            let second: Sparkline = getInstance('#sparkline2011' + i, Sparkline) as Sparkline;
            first.rangeBandSettings[0].endRange = max;
            second.rangeBandSettings[0].endRange = max;
            first.refresh();
            second.refresh();
            document.getElementById('rmax').innerHTML = max.toString();
        }
    };
};