import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
    IAccTextRenderEventArgs, AccumulationSelection, AccumulationAnnotation,
    IAccLoadedEventArgs, Selection
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, Selection, PieSeries, AccumulationAnnotation, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Doughnut
 */

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let pie: AccumulationChart = new AccumulationChart({
        enableSmartLabels: true,
        selectionMode: 'Point',
        annotations: [{
            content: (Browser.isDevice) ? " " : "<div style='font-Weight:600;font-size:14px'>Browser<br>Market<br>Share</div>" ,
            region:"Series",
            x:"52%",
            y:"50%"
        }],
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Internet Explorer', y: 6.12,  },
                    { 'x': 'Chrome', y: 57.28, },
                    { 'x': 'Safari', y: 4.73,  },
                    { 'x': 'QQ', y: 5.96, },
                    { 'x': 'UC Browser', y: 4.37,  },
                    { 'x': 'Edge', y: 7.48,  },
                    { 'x': 'Others', y: 14.06,  }
                ],
                xName: 'x', yName: 'y', startAngle: 30,explodeIndex:0,explode:false,
                innerRadius: '43%',explodeOffset:'10%',radius:'80%',
                dataLabel: {
                    visible: true, position: 'Inside',
                    font: { fontWeight: '600', color: '#ffffff' }, name: 'y', connectorStyle: { length: '20px', type: 'Curve' }
                }
            }
        ],
        title:Browser.isDevice ? "Browser Market Share" : '',
        legendSettings: {
            visible: true, toggleVisibility: false,
            position:  Browser.isDevice ? 'Bottom' : 'Right', height: Browser.isDevice ? '20%' : '30%', width: Browser.isDevice ? '95%' :'20%',
            maximumLabelWidth: 66,
            textWrap:'Wrap',
        },
        enableBorderOnMouseMove:false,center:{ x: '50%', y: '50%'},
        textRender: (args: IAccTextRenderEventArgs) => {
            args.series.dataLabel.font.size = getFontSize(pie.initialClipRect.width);
            args.text = args.text + '%';
        },
        // Triggered animation complete, text render and load event
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            args.accumulation.legendSettings.position = Browser.isDevice ? 'Bottom' : 'Right';
        },
        tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',header:""  },
    });
    pie.appendTo('#donut-container'); 
    function getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    }
};