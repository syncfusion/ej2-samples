import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, AreaSeries, ChartTheme, DateTime, RangeTooltip } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(DateTime, AreaSeries, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';

/**
 * Default appearance of the range navigator
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3','material3dark'];
let borderColor : string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
let regionColor : string[] = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)' ];


(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: Object[];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/default-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on FETCH success
    fetchApi.onSuccess = (data: Object[]): void => {
        datasrc = data;
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        let range: RangeNavigator = new RangeNavigator(
            {
                valueType: 'DateTime',
                tooltip: { enable: true, displayMode: 'Always' },
                value: [new Date('2017-09-01'), new Date('2018-02-01')],
                labelFormat: 'MMM-yy',
                navigatorStyleSettings: {
                    unselectedRegionColor: 'transparent',
                    selectedRegionColor: regionColor[themes.indexOf(theme.toLowerCase())]
                },

                series: [
                    {
                        dataSource: datasrc,
                        xName: 'x', yName: 'y', type: 'Area', width: 2,
                        fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                        border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                    }
                ],
                width: Browser.isDevice ? '100%' : '80%',
                theme: theme
            }
        );
        range.appendTo('#container');
    };
};