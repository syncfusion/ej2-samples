import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, FunnelSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel, IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
AccumulationChart.Inject(AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Funnel chart
 */
(window as any).default = (): void => { 
    loadCultureFiles();
    let data: object[] = [
        { x: "Hired", y: 50, text: "Hired: 50" },
        { x: "Personal Interview", y: 58, text: Browser.isDevice ? "Personal <br> Interview: 58" :  "Personal Interview: 58" },
        { x: "Telephonic Interview", y: 85, text: "Telephonic <br> Interview: 85" },
        { x: "Screening", y: 105, text: "Screening: 105" },
        { x: "Initial Validation", y: 145, text: Browser.isDevice ? "Initial <br> Validation: 145" : "Initial Validation: 145" },
        { x: "Candidates Applied", y: 250, text: "Candidates Applied: 250" },];
    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Funnel', dataSource: data, xName: 'x', yName: 'y',
            neckWidth: '15%',
            neckHeight: '18%',
            gapRatio:0.03,
            width:'45%',
            height:'80%',
            name: '2017 Population',
            dataLabel: {
                visible: true, position: 'Inside',
                name: 'text', font: { fontWeight: '600' }, connectorStyle: {length:'20px'}
            },
            explode: false,
        }],
        legendSettings: {visible: false},
        //Initializing tooltip
        tooltip: { enable: false, format: '${point.x} : <b>${point.y}</b>' },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
        //Initializing Chart title
        title:'Recruitment Process' ,
    });
    chart.appendTo('#container');
   
};