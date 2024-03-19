/**
 * Pie sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable
// custom code end
import { TreeMap, ILoadedEventArgs, IResizeEventArgs, TreeMapTooltip, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { AccumulationChart, PieSeries, DataLabel, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { continentData } from './treemap-data/continent-data';
AccumulationChart.Inject(AccumulationChart, PieSeries, DataLabel, AccumulationTooltip);
TreeMap.Inject(TreeMapTooltip);
import { TreeMapTheme, ILoadEventArgs, ITreeMapTooltipRenderEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
let chartCollection: AccumulationChart[] = [];
let count: number = 0;
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {        
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
    };
    // custom code end
    let treemap: TreeMap = new TreeMap({
        // custom code start
        load: treemapload,
        // custom code end
        // AccumulationChart rendering
        loaded: (args: ILoadedEventArgs) => {
            let template: Element = document.getElementById(args.treemap.element.id + '_Label_Template_Group');
            if (template) {
                for (let i: number = 0; i < template.childElementCount; i++) {
                    AccumulationChartRender((<Element>template.childNodes[i].childNodes[0]).id);
                }
                count = 0;
            }
        },
        // chart size changes
        resize: (args: IResizeEventArgs) => {
            for (let i: number = 0; i < chartCollection.length; i++) {
                chartCollection[i].destroy();
            }
        },
        //show the tooltip in Level one
        tooltipRendering: (args: ITreeMapTooltipRenderEventArgs) => {
            //tslint:disable-next-line
            if (args.item['groupIndex'] !== 1 ) {
                args.cancel = true;
            }
        },
        tooltipSettings: {
            visible: true,
            format: ' ${Gender} : ${Population}',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        titleSettings: {
            text: 'Population of the continents based on gender and age group - 2011',
            textStyle: { size: '15px', fontFamily: 'Segoe UI' }
        },
        format: 'n', useGroupingSeparator: true,
        dataSource: continentData,
        weightValuePath: 'Population',
        leafItemSettings: {
            labelPath: 'Gender',
            fill: '#A1317D',
            showLabels: false,
            labelStyle: {
                fontFamily: 'Segoe UI'
            },
            border: { color: 'black', width: 0.5 },
            labelFormat: '${Gender} : ${Population}',
            templatePosition: 'Center',
            labelTemplate: '<div style="height:{{:PieHeight}};width:{{:PieWidth}};" id ={{:Id}}></div>',
        },
        levels: [
            {
                groupPath: 'Continent', fill: '#7E2361', border: { color: 'black', width: 1, },
                headerAlignment: 'Center', groupGap: 0, headerStyle: { size: '14px'}
            }
        ]
    });
    treemap.appendTo('#container');
};

// custom code start
/* tslint:disable:no-string-literal */
// custom code end
export function AccumulationChartRender(id: string): void {
    let chartData: object = getData();
    let dataSource: object[] = chartData['data'];
    let name: string = chartData['name'];
    let chart: AccumulationChart = new AccumulationChart({
        background: 'transparent',
        tooltip: {
            enable: true,
            format: '${point.x} : ${point.y}%'
        },
        series: [
            {
                explode: true,
                explodeIndex: 0,
                explodeOffset: '20%',
                name: name,
                palettes: ['#1E1E1E', '#00BDAE', '#FFFFFF'],
                dataSource: dataSource,
                dataLabel: {
                    visible: true
                },
                type: 'Pie',
                xName: 'x',
                yName: 'y'
            }
        ]
    });
    chart.appendTo('#' + id);
    chartCollection.push(chart);
}

export function getData(): object {
    let dataSource: object[];
    let dataName: string;
    if (count === 0) {
        dataSource = [
            { 'x': '0-15 years', y: 40.8 }, { 'x': '15-64 years', y: 56.2 },
            { 'x': 'Above 64 years', y: 3.0 }
        ];
        dataName = 'Asia';
    } else if (count === 1) {
        dataSource = [
            { 'x': '0-15 years', y: 15.5 }, { 'x': '15-64 years', y: 12.9 },
            { 'x': 'Above 64 years', y: 41.4 }
        ];
        dataName = 'Asia';
    } else if (count === 2) {
        dataSource = [
            { 'x': '0-15 years', y: 25.1 }, { 'x': '15-64 years', y: 67.8 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'Africa';
    } else if (count === 3) {
        dataSource = [
            { 'x': '0-15 years', y: 15.3 }, { 'x': '15-64 years', y: 68.4 },
            { 'x': 'Above 64 years', y: 16.3 }
        ];
        dataName = 'Africa';
    } else if (count === 4) {
        dataSource = [
            { 'x': '0-15 years', y: 22.8 }, { 'x': '15-64 years', y: 65.9 },
            { 'x': 'Above 64 years', y: 11.4 }
        ];
        dataName = 'Europe';
    } else if (count === 5) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'Europe';
    } else if (count === 6) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'South America';
    } else if (count === 7) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'South America';
    } else if (count === 8) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'Oceania';
    } else if (count === 9) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'Oceania';
    } else if (count === 10) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'North America';
    } else if (count === 11) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'North America';
    } else if (count === 12) {
        dataSource = [
            { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
            { 'x': 'Above 64 years', y: 7.1 }
        ];
        dataName = 'South America';
    }
    count++;
    return new Object({ name: dataName, data: dataSource });
}
