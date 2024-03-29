import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, AreaSeries, DateTime, IChangedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
RangeNavigator.Inject(AreaSeries, DateTime);
import { Browser } from '@syncfusion/ej2-base';
import { Grid } from '@syncfusion/ej2-grids';

/**
 * Sample range navigator with filter functionalities
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: object[];
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    // tslint:disable-next-line:no-function-expression
    xhttp.onreadystatechange = function (): void {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            datasrc = JSON.parse(xhttp.responseText);
            datasrc.map((data: Object) => {
                // tslint:disable-next-line:no-string-literal
                data['HireDate'] = new Date(data['HireDate']);
            });
            let grid: Grid = new Grid({
                height: '350',
                width: Browser.isDevice ? '100%' : '80%',
                columns: [
                    { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Center' },
                    { field: 'FirstName', headerText: 'Name', textAlign: 'Center' },
                    { field: 'Title', headerText: 'Title', textAlign: 'Center' },
                    {
                        field: 'HireDate', headerText: 'Hire Date', textAlign: 'Center',
                        format: { skeleton: 'yMd', type: 'date' }
                    }
                ],
            });
            grid.appendTo('#grid');
            let range: RangeNavigator = new RangeNavigator(
                {
                    animationDuration: 500,
                    width: Browser.isDevice ? '100%' : '80%',
                    value: [new Date(1992, 5, 1), new Date(1993, 4, 1)],
                    valueType: 'DateTime',
                    allowSnapping: true,
                    intervalType: 'Quarter',
                    enableGrouping: true,
                    groupBy: 'Years',
                    enableDeferredUpdate: true,
                    dataSource: datasrc, xName: 'HireDate', yName: 'yValue',
                    changed: (args: IChangedEventArgs) => {
                        grid.dataSource = datasrc.filter((data: { [key: string]: Object }): Boolean => {
                            return (data.HireDate >= new Date(+args.start) && data.HireDate <= new Date(+args.end));
                        });
                        grid.refresh();
                    },
                    theme: theme
                }
            );
            range.appendTo('#container');

        }
    };
    xhttp.open('GET', location.origin + location.pathname + 'src/rangenavigator/data-source/grid-data.json', true);
    xhttp.send();
};