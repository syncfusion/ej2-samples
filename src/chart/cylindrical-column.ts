import { loadCultureFiles } from '../common/culture-loader';
import { Chart, ColumnSeries, Category, DataLabel, Tooltip, ILoadedEventArgs, Legend } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip, Legend);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Cylindrical Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            majorGridLines: { width: 0 },
            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
            labelRotation: Browser.isDevice ? -45 : 0,
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            title: 'Total Renewable Power (TWh)',
            labelFormat: '{value}TWh',
            minimum: 150,
            maximum: 400,
            interval: 50,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', columnFacet: 'Cylinder', name: 'India', xName: 'year', yName: 'energy', columnSpacing: 0.3,
                dataSource: [
                    { year: '2017 - 18', energy: 228.0 },
                    { year: '2018 - 19', energy: 261.8 },
                    { year: '2019 - 20', energy: 294.3 },
                    { year: '2020 - 21', energy: 297.5 },
                    { year: '2021 - 22', energy: 322.6 },
                    { year: '2022 - 23', energy: 365.59 }
                ]
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Year-wise Renewable Energy Generation Trends in India',
        subTitle: 'Source: wikipedia.org',
        tooltip: {
            enable: true,
            header: '<b>${point.x}</b>',
            format: '${series.name}: <b>${point.y}</b>'
        },
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};