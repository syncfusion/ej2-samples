import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, AreaSeries, ChartTheme, DateTime, RangeTooltip } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(DateTime, AreaSeries, RangeTooltip);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Default appearance of the range navigator
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];


this.renderChart = (datasrc: Object[]): void => {
            let range: RangeNavigator = new RangeNavigator(
                {
                    valueType: 'DateTime',
                    tooltip: { enable: true, displayMode: 'Always' },
                    value: [new Date('2017-09-01'), new Date('2018-02-01')],
                    labelFormat: 'MMM-yy',
                    navigatorStyleSettings: {
                        unselectedRegionColor: 'transparent',
                        selectedRegionColor: regionColor[themes.indexOf(theme)]
                    },

                    series: [
                        {
                            dataSource: datasrc,
                            xName: 'x', yName: 'y', type: 'Area', width: 2,
                            fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                            border: { width: 2, color: borderColor[themes.indexOf(theme)] }
                        }
                    ],
                    width: Browser.isDevice ? '100%' : '80%',
                    theme: theme
                }
            );
            range.appendTo('#container');

        };
(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: Object[];
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/default-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        datasrc = JSON.parse(data);
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        this.renderChart(datasrc);
    };
};