import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationChart, AccumulationLegend, PieSeries,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, AccumulationTooltip
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
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
                    { x: 'USA', y: 40, text: Browser.isDevice ? 'USA: 40' : 'United States of America: 40' },
                    { x: 'China', y: 40, text: 'China: 40' },
                    { x: 'Japan', y: 20, text: 'Japan: 20' },
                    { x: 'Australia', y: 18, text: Browser.isDevice ? 'AU: 18' : 'Australia: 18' },
                    { x: 'France', y: 16, text: 'France: 16' },
                    { x: 'Netherlands', y: 15, text: Browser.isDevice ? 'NL: 15' : 'Netherlands: 15' },
                    { x: 'Great Britain', y: 14, text: Browser.isDevice ? 'GB: 14' : 'Great Britain: 14' },
                    { x: 'South Korea', y: 13, text: Browser.isDevice ? 'SK: 13' : 'South Korea: 13' },
                    { x: 'Germany', y: 12, text: Browser.isDevice ? 'GE: 12' : 'Germany: 12' },
                    { x: 'Italy', y: 12, text: 'Italy: 12' },
                    { x: 'NewZealand', y: 10, text: Browser.isDevice ? 'NZ: 10' : 'New Zealand: 10' },
                    { x: 'Canada', y: 9, text: Browser.isDevice ? 'CA: 9' : 'Canada: 9' },
                    { x: 'Uzbekistan', y: 8, text: Browser.isDevice ? 'UZB: 8' : 'Uzbekistan: 8' },
                    { x: 'Hungary', y: 6, text: Browser.isDevice ? 'HU: 6' : 'Hungary: 6' },
                    { x: 'Kenya', y: 4, text: Browser.isDevice ? 'KE: 4' : 'Kenya: 4' },
                    { x: 'Georgia', y: 3, text: Browser.isDevice ? 'GE: 3' : 'Georgia: 3' },
                    { x: 'North Korea', y: 2, text: Browser.isDevice ? 'NK: 2' : 'North Korea: 2' },
                    { x: 'Hong Kong', y: 2, text: Browser.isDevice ? 'HK: 2' : 'South Africa: 2' }
                ],
                xName: 'x',
                yName: 'y',
                name: 'RIO',
                startAngle: 60,
                innerRadius: '0%',
                dataLabel: {
                    visible: true, position: 'Outside', textWrap: Browser.isDevice ? 'Wrap' : 'Normal',
                    connectorStyle: { type: 'Curve', length: Browser.isDevice ? '2px' : '20px' }, name: 'text',
                    font:  {fontWeight: '600', size: Browser.isDevice ? '7px' : '12px' }
                }, radius: Browser.isDevice ? "40%" : "65%",
            }
        ],
        enableBorderOnMouseMove: false,
        enableSmartLabels: true,
        legendSettings: {
            visible: false
        },
        //Initializing Tooltip
        tooltip: { enable: true, format:'<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>', enableHighlight: true, header:'' },
        //Initializing Title
        title: 'Summer Olympics 2024 - Gold Medals',
        subTitle: 'Source: wikipedia.org',
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    }); 
    pie.appendTo('#container');
};