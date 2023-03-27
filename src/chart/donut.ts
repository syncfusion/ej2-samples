import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
import { IPointRenderEventArgs } from '@syncfusion/ej2/charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip);
/**
 * Sample for Doughnut chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let seriesColor : string[] = ['#FFE066', "#FAB666", "#F68F6A", "#F3646A", "#CC555A", "#9C4649"];
    let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme==='fluent')
        {
          args.fill = seriesColor[args.point.index % 10];
        }
        else if(selectedTheme==='bootstrap5')
        {
          args.fill = seriesColor[args.point.index % 10];
        }
        if (selectedTheme.indexOf('dark') > -1) {
            if (selectedTheme.indexOf('material') > -1) {
                args.border.color = '#303030';
            }
            else if (selectedTheme.indexOf('bootstrap5') > -1) {
                args.border.color = '#212529';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('fabric') > -1) {
                args.border.color = '#201f1f';
            }
            else if (selectedTheme.indexOf('fluent') > -1) {
                args.border.color = '#252423';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('tailwind') > -1) {
                args.border.color = '#1F2937';
            }
            else {
                args.border.color = '#222222';
            }
        }
        else if (selectedTheme.indexOf('highcontrast') > -1) {
            args.border.color = '#000000';
        }
        else {
            args.border.color = '#FFFFFF';
        }
    };
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Chrome', y: 61.3, text: Browser.isDevice? 'Chrome:<br> 61.3%' : 'Chrome: 61.3%' },
                { x: 'Safari', y: 24.6, text: Browser.isDevice? 'Safari:<br> 24.6%' : 'Safari: 24.6%' },
                { x: 'Edge', y: 5.0, text: 'Edge: 5.00%' },
                { x: 'Samsung Internet', y: 2.7, text: Browser.isDevice? 'Samsung<br> Internet: 2.7%' : 'Samsung Internet: 2.7%' },
                { x: 'Firefox', y: 2.6, text: Browser.isDevice? 'Firefox:<br> 2.6%' : 'Firefox: 2.6%' },
                { x: 'Others', y: 3.6, text: Browser.isDevice? 'Others:<br> 3.6%' : 'Others: 3.6%' }
                ], border: { width: 1 },
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Outside',
                    font: {
                        fontWeight: '600',
                    },
                    connectorStyle:{length:'20px', type: 'Curve'}
                },
                xName: 'x',
                yName: 'y', startAngle: Browser.isDevice ? 30 : 62, radius: Browser.isDevice ? '40%' : '75%',
                innerRadius: '65%', name: 'Project'
            }
        ],
        enableSmartLabels: true,
        centerLabel:{
            text : 'Mobile<br>Browsers<br>Statistics',
            hoverTextFormat: '${point.x} <br> Browser Share <br> ${point.y}%',
            textStyle: {
                fontWeight: '600',
                size: Browser.isDevice ? '8px' : '15px'
            },
          },
        enableBorderOnMouseMove:false,
        legendSettings: {
            visible: false, position: 'Top'
        },
        pointRender: pointRender,
         // custom code start
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
         // custom code end
    });
    pie.appendTo('#container');
};
