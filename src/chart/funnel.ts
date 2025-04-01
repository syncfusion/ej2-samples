import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, FunnelSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel, AccumulationTheme, IAccPointRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme, funnelPointRender } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Funnel chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: object[] = [
        { x: "Candidates Applied", y: 170, text: "Applications Received: 170" },
        { x: "Initial Validation", y: 145, text: "Initial Validation: 145" },
        { x: "Screening", y: 105, text: Browser.isDevice ? "Screening <br> Completed: 105" : "Screening Completed: 105" },
        { x: "Telephonic Interview", y: 85, text: Browser.isDevice ? "Phone <br> Interview: 85" : "Phone Interview: 85" },
        { x: "Personal Interview", y: 58, text: Browser.isDevice ? "Final <br> Interview: 58" : "Final Interview: 58" },
        { x: "Hired", y: 30, text: "Final <br> Selections: 30" }
    ];
    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Funnel', dataSource: data, xName: 'x', yName: 'y',
            name: '2017 Population',
            dataLabel: {
                visible: true, position: 'Inside',
                name: 'text', font: { fontWeight: '600', size: Browser.isDevice ? '11px' : '13px' }, connectorStyle: { length: '20px' }
            },
            explode: false,
            funnelMode: 'Trapezoidal'
        }],
        legendSettings: { visible: false },
        //Initializing tooltip
        tooltip: { enable: false, format: '${point.x} : <b>${point.y}</b>' },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        },
        pointRender: (args: IAccPointRenderEventArgs) => {
            funnelPointRender(args);
        },
        //Initializing Chart title
        title: 'Recruitment Funnel: From Application to Hiring',
        width: Browser.isDevice ? '100%' : '75%'
    });
    chart.appendTo('#container');

};