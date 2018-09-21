import { RangeNavigator, AreaSeries, DateTime, LineSeries, ChartTheme, RangeTooltip } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(AreaSeries, DateTime, LineSeries, RangeTooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for multi level labels without series
 */

let data: object[] = [];
let value: number = 0; let point: object = {};
for (let j: number = 1; j < 1090; j++) {
    value += (Math.random() * 10 - 5);
    value = value < 0 ? Math.abs(value) : value;
    point = { x: new Date(2000, 0, j), y: value, z: value + 10 };
    data.push(point);
}
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
this.default = (): void => {
    let range: RangeNavigator = new RangeNavigator(
        {
            labelPosition: 'Outside',
            tooltip: { enable: true, displayMode: 'Always' },
            valueType: 'DateTime',
            intervalType: 'Quarter',
            animationDuration: 500,
            enableGrouping: true,
            groupBy: 'Years',
            value: [new Date('2001-01-01'), new Date('2002-01-01')],
            dataSource: data, xName: 'x', yName: 'y',
            width: Browser.isDevice ? '100%' : '80%',
            theme: theme
        }
    );
    range.appendTo('#container');
};