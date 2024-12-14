import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip);

/**
 * Smart labels for Pie sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
         //Initializing Sereis
        series: [
            {
                dataSource: [
                    { 'x': 'USA', y: 46, text: Browser.isDevice ? 'USA: 46' : 'United States of America: 46' },
                    { 'x': 'China', y: 26, text: 'China: 26' },
                    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
                    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
                    { 'x': 'Kazakhstan', y: 3, text: Browser.isDevice ? 'KZ: 3' : 'Kazakhstan: 3' },
                    { 'x': 'New Zealand', y: 4, text: Browser.isDevice ? 'NZ: 4' : 'New Zealand: 4' },
                    { 'x': 'South Korea', y: 9, text: Browser.isDevice ? 'KR: 9' : 'South Korea: 9' },
                    { 'x': 'Great Britain', y: 27, text: Browser.isDevice ? 'GB: 27' : 'Great Britain: 27' },
                    { 'x': 'Switzerland', y: 3, text: Browser.isDevice ? 'CH: 3' : 'Switzerland: 3' },
                    { 'x': 'Australia', y: 8, text: Browser.isDevice ? 'ASTL: 8' : 'Australia: 8' },
                    { 'x': 'Netherlands', y: 8, text: Browser.isDevice ? 'NL: 8' : 'Netherlands: 8' },
                    { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
                    { 'x': 'Uzbekistan', y: 4, text: Browser.isDevice ? 'Uzbekistan: <br> 4' : 'Uzbekistan: 4' },
                    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
                    { 'x': 'France', y: 10, text: 'France: 10' },
                    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
                    { 'x': 'Argentina', y: 3, text: Browser.isDevice ? 'AR: 3' : 'Argentina: 3' },
                    { 'x': 'South Africa', y: 2, text: Browser.isDevice ? 'SA: 2' : 'South Africa: 2' },
                    { 'x': 'North Korea', y: 2, text: Browser.isDevice ? 'KP: 2' : 'North Korea: 2' }
                ],
                xName: 'x',
                yName: 'y',
                startAngle: 60,
                innerRadius: '0%',
                dataLabel: {
                    visible: true, position: 'Outside',
                    connectorStyle: { type: 'Curve', length: '20px' }, name: 'text',
                    font:  {fontWeight: '600' }
                }, radius: Browser.isDevice ? "40%" : "70%",
            }
        ],
        enableBorderOnMouseMove: false,
        legendSettings: {
            visible: false
        },
        //Initializing Tooltip
        tooltip: { enable: true, format:'<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>', enableHighlight: true },
        //Initializing Title
        title: 'Rio Olympics Gold',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    pie.appendTo('#container');
};