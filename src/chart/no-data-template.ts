import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, LineSeries, Category, ChartTheme,
     Tooltip, ILoadedEventArgs
} from '@syncfusion/ej2-charts';
import { Button } from '@syncfusion/ej2-buttons';
import { loadChartTheme } from './theme-color';

/**
 * Sample for No Data Template
 */

Chart.Inject(LineSeries, Category, Tooltip);

(window as any).default = (): void => {
    loadCultureFiles();

    const chartData: any[] = [
        { Month: 'January', Value: 19173 },
        { Month: 'February', Value: 17726 },
        { Month: 'March', Value: 19874 },
        { Month: 'April', Value: 19391 },
        { Month: 'May', Value: 20072 },
        { Month: 'June', Value: 19233 }
    ];

    let checked: boolean = false;
    let selectedTheme: string;

    const chart: Chart = new Chart({
        title: 'Milk Production in US - 2025',
        subTitle: 'Source: nass.usda.gov',
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0},
        },
        primaryYAxis: {
            title: 'Production (in million pounds)',
            titleStyle: { fontWeight: '600' },
            majorTickLines: { width: 0},
            lineStyle: {width: 0}
        },
        chartArea: {
            border: { width: 0 },
        },
        series: [{
            dataSource: [],
            xName: 'Month',
            yName: 'Value',
            type: 'Line',
            width: 2,
            marker: {
                visible: true, width: 7, height: 7
            }
        }],
        tooltip: {
            enable: true,
            header: 'Milk Production',
            format: '${point.x} : <b>${point.y}M</b>'
        },
        noDataTemplate: `
            <div id="noDataTemplateContainer" class="light-bg">
                <div class="template-align">
                    <img src="src/chart/images/no-data.png" alt="No Data"/>
                </div>
                <div class="template-align">
                    <p style="font-size: 15px; margin: 10px 0 0;"><strong>No data available to display.</strong></p>
                </div>
                <div class="template-align">
                    <button id="loadDataBtn" style="margin-top: 15px;"></button>
                </div>
            </div>
        `,

        load: (args: ILoadedEventArgs): void => {
            selectedTheme = loadChartTheme(args);
        },

        loaded: (args: ILoadedEventArgs) => {
            const noDataDiv: HTMLElement | null = document.getElementById("noDataTemplateContainer");
            if (noDataDiv) {
                noDataDiv.className = selectedTheme.indexOf("Dark") > -1 || selectedTheme.indexOf("HighContrast") > -1 ? 'dark-bg' : 'light-bg';
            }
            const btnElem: HTMLElement | null = document.getElementById('loadDataBtn');
            if (btnElem) {
                const loadBtn: Button = new Button({
                    content: 'Load Data',
                    iconCss: 'e-icons e-refresh',
                    cssClass: 'e-outline',
                    isPrimary: false
                });
                loadBtn.appendTo(btnElem);

                loadBtn.element.onclick = (): void => {
                    checked = !checked;
                    if (checked) {
                        chart.series[0].dataSource = chartData;

                        const values = chartData.map(d => d.Value);
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const range = max - min;
                        chart.primaryYAxis.minimum = Math.floor(min - range * 0.1);
                        chart.primaryYAxis.maximum = Math.ceil(max + range * 0.1);
                        chart.primaryYAxis.interval = Math.ceil(range / 5);
                    }
                    chart.refresh();
                };
            }
        }
    });

    chart.appendTo('#container');
};
