import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, IChangedEventArgs, Logarithmic, DateTime } from '@syncfusion/ej2-charts';
import { ChartTheme } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(Logarithmic, DateTime);
import { GetDateTimeData } from './data-service';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator without series
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    let range: RangeNavigator = new RangeNavigator(
        {
            valueType: 'DateTime',
            intervalType: 'Months',
            labelFormat: 'MMM',
            animationDuration: 500,
            value: [new Date('2018-06-01'), new Date('2018-07-01')],
            dataSource: GetDateTimeData(new Date('2018-01-01'), new Date('2019-01-01')),
            xName: 'x', yName: 'y',
            width: Browser.isDevice ? '100%' : '80%', theme: theme,
            navigatorStyleSettings: {
                thumb: {
                    type: 'Rectangle'
                },
            },
            changed: ((args: IChangedEventArgs) => {
                let currentDate: Date = new Date(+args.start);
                let workingDaysCount: number = 0;
                let holidaysDaysCount: number = 0;
                while (currentDate <= new Date(+args.end)) {
                    if (currentDate.getDay() > 0 && currentDate.getDay() <= 5) {
                        workingDaysCount++;
                    } else {
                        holidaysDaysCount++;
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                document.getElementById('workingcount').innerHTML = ' ' + workingDaysCount;
                document.getElementById('weekendcount').innerHTML = ' ' + holidaysDaysCount;
            }),
        }
    );
    range.appendTo('#datetime');
};