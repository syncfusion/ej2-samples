// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { Maps, Marker, ILoadEventArgs, ILoadedEventArgs, IResizeEventArgs, MapsTheme, Legend, MapAjax } from '@syncfusion/ej2-maps';
import { AccumulationChart, PieSeries, DataLabel, AccumulationTooltip } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationChart, PieSeries, DataLabel, AccumulationTooltip);
Maps.Inject(Marker, Legend);
/**
 * Dynamic Pie
 */
// custom code start
//tslint:disable:max-func-body-length
// custom code end
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        loaded: (args: ILoadedEventArgs) => {
            let markers: Element = document.getElementById(args.maps.element.id + '_LayerIndex_0_Markers_Template_Group');
            if (markers) {
                for (let i: number = 0; i < markers.childElementCount; i++) {
                    AccumulationChartRender((<Element>markers.childNodes[i].childNodes[0]).id);
                }
                count = 0;
            }
        },
        resize: (args: IResizeEventArgs) => {
            for (let i: number = 0; i < chartCollection.length; i++) {
                chartCollection[i].destroy();
            }
        },
        titleSettings: {
            text: 'Top 6 largest countries age group details',
            textStyle: {
                size: '16px'
            }
        },
        legendSettings: {
            visible: true,
            position: 'Bottom'
        },
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeSettings: {
                    fill: '#E5E5E5',
                    colorMapping: [
                        {
                            from: 0, to: 4, color: '#634D6F', label: '0-14 years',
                        },
                        {
                            from: 5, to: 14, color: '#B34D6D', label: '15-24 years'
                        },
                        {
                            from: 15, to: 59, color: '#557C5C', label: '25-54 years'
                        },
                        {
                            from: 60, to: 100, color: '#5E55E2', label: '55-64 years'
                        }
                    ]
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<div id="pieChart1" style="height:70px;width:70px;"></div>',
                        dataSource: [
                            { 'latitude': 61.938950426660604, 'longitude': 97.03125 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '  <div id="pieChart2" style="height:70px;width:70px;">',
                        dataSource: [
                            { 'latitude': 57.70414723434193, 'longitude': -114.08203125 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="pieChart3" style="top:10px;left:10px;height:70px;width:70px;"></div>',
                        dataSource: [
                            { 'latitude': 39.90973623453719, 'longitude': -103.0078125 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="pieChart4" style="height:70px;width:70px;"></div>',
                        dataSource: [
                            { 'latitude': 35.746512259918504, 'longitude': 102.216796875 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="pieChart5" style="height:70px;width:70px;"></div>',
                        dataSource: [
                            { 'latitude': -8.667918002363107, 'longitude': -52.55859375 }
                        ],
                        animationDuration: 0
                    },
                    {
                        visible: true,
                        template: '<div id="pieChart6" style="height:70px;width:70px;"></div>',
                        dataSource: [
                            { 'latitude': -23.725011735951796, 'longitude': 132.978515625 }
                        ],
                        animationDuration: 0
                    }
                ]
            }
        ]
    });
    maps.appendTo('#container');
};
let chartCollection: AccumulationChart[] = [];
let count: number = 0;
// custom code start
/* tslint:disable:no-string-literal */
// custom code end
export function AccumulationChartRender(id: string): void {
    let chartData: any = getData();
    let dataSource: object[] = chartData['data'];
    let name: string = chartData['name'];
    let chart: AccumulationChart = new AccumulationChart({
        background: 'transparent',
        width: '70',
        height: '70',
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
                palettes: ['#634D6F', '#B34D6D', '#557C5C', '#5E55E2', '#7C744D'],
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
            { 'x': '0-14 years', y: 16 }, { 'x': '15-24 years', y: 11.5 },
            { 'x': '25-54 years', y: 45.9 }, { 'x': '55-64 years', y: 13.5 },
        ];
        dataName = 'Russia';
    } else if (count === 1) {
        dataSource = [
            { 'x': '0-14 years', y: 15.5 }, { 'x': '15-24 years', y: 12.9 },
            { 'x': '25-54 years', y: 41.4 }, { 'x': '55-64 years', y: 13.3 },
        ];
        dataName = 'Canada';
    } else if (count === 2) {
        dataSource = [
            { 'x': '0-14 years', y: 20 }, { 'x': '15-24 years', y: 13.7 },
            { 'x': '25-54 years', y: 40.2 }, { 'x': '55-64 years', y: 12.3 },
        ];
        dataName = 'USA';
    } else if (count === 3) {
        dataSource = [
            { 'x': '0-14 years', y: 17.2 }, { 'x': '15-24 years', y: 15.4 },
            { 'x': '25-54 years', y: 46.9 }, { 'x': '55-64 years', y: 11.3 },
        ];
        dataName = 'China';
    } else if (count === 4) {
        dataSource = [
            { 'x': '0-14 years', y: 24.2 }, { 'x': '15-24 years', y: 16.7 },
            { 'x': '25-54 years', y: 43.6 }, { 'x': '55-64 years', y: 8.2 },
        ];
        dataName = 'Brazil';
    } else if (count === 5) {
        dataSource = [
            { 'x': '0-14 years', y: 18.1 }, { 'x': '15-24 years', y: 13.4 },
            { 'x': '25-54 years', y: 42 }, { 'x': '55-64 years', y: 11.8 },
        ];
        dataName = 'Australia';
    }
    count++;
    return new Object({ name: dataName, data: dataSource });
}