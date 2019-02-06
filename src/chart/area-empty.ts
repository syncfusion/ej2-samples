import { loadCultureFiles } from '../common/culture-loader';
import { Chart, Category, AreaSeries, Legend, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, Category, Legend);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series with Empty Point
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary Axes
        primaryXAxis: {
            valueType: 'Category',
            interval: 2,
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },
        primaryYAxis:
        {
            title: 'Rates',
            labelFormat: '{value}M',
            lineStyle: { width: 0},
            majorTickLines: { width: 0}
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Area',
                dataSource: [{ x: '2002', y: 2 }, { x: '2003', y: 1.7 }, { x: '2004', y: 1.8 }, { x: '2005', y: 2.1 },
                { x: '2006', y: 2.3 }, { x: '2007', y: 1.7 }, { x: '2008', y: 1.5 }, { x: '2009', y: 1.8 },
                { x: '2010', y: 2 }, { x: 2011, y: 3.1 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'France',
                opacity: 0.8
            }, {
                type: 'Area',
                dataSource: [{ x: '2002', y: 2.2 }, { x: '2003', y: 3.4 }, { x: '2004', y: 2.8 }, { x: '2005', y: null },
                { x: '2006', y: null }, { x: '2007', y: 2.5 }, { x: '2008', y: 2.9 }, { x: '2009', y: 3.8 },
                { x: '2010', y: 1.4 }, { x: 2011, y: 3.1 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'US',
                opacity: 0.8,
            },
        ],
        //Initializing Chart title
        title: 'Inflation Rate',
        width: Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/dark/i, 'Dark').replace(/light/i, 'Light');
        }
    });
    chart.appendTo('#container');
};