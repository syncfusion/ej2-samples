import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, AreaSeries, ChartTheme, DateTime, RangeTooltip } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(DateTime, AreaSeries, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { borderColor, loadRangeNavigatorTheme, regionColor, themes } from './theme-colors';

/**
 * Default appearance of the range navigator
 */

let theme: ChartTheme = loadRangeNavigatorTheme();

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