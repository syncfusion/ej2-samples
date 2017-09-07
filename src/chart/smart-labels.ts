import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, IAccLoadedEventArgs } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel);

/**
 * Smart labels for Pie sample
 */
this.default = (): void => {
    let pie: AccumulationChart = new AccumulationChart({
        series: [
            {
                dataSource: [
                    { 'x': 'China', y: 26, text: 'China: 26' },
                    { 'x': 'Russia', y: 19, text: 'Russia: 19' },
                    { 'x': 'Germany', y: 17, text: 'Germany: 17' },
                    { 'x': 'Japan', y: 12, text: 'Japan: 12' },
                    { 'x': 'France', y: 10, text: 'France: 10' },
                    { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
                    { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
                    { 'x': 'Italy', y: 8, text: 'Italy: 8' },
                    { 'x': 'Australia', y: 8, text: 'Australia: 8' },
                    { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
                    { 'x': 'Hungary', y: 8, text: 'Hungary: 8' },
                    { 'x': 'Brazil', y: 7, text: 'Brazil: 7' },
                    { 'x': 'Spain', y: 7, text: 'Spain: 7' },
                    { 'x': 'Kenya', y: 6, text: 'Kenya: 6' },
                    { 'x': 'Jamaica', y: 6, text: 'Jamaica: 6' },
                    { 'x': 'Croatia', y: 5, text: 'Croatia: 5' },
                    { 'x': 'Cuba', y: 5, text: 'Cuba: 5' },
                    { 'x': 'NewZealand', y: 4, text: 'New Zealand: 4' },
                    { 'x': 'Canada', y: 4, text: 'Canada: 4' },
                    { 'x': 'Uzbekistan', y: 4, text: 'Uzbekistan: 4' },
                    { 'x': 'Kazakhstan', y: 3, text: 'Kazakhstan: 3' },
                    { 'x': 'Colombia', y: 3, text: 'Colombia: 3' },
                    { 'x': 'Switzerland', y: 3, text: 'Switzerland: 3' },
                    { 'x': 'Iran', y: 3, text: 'Iran: 3' },
                    { 'x': 'Greece', y: 3, text: 'Greece: 3' },
                    { 'x': 'Argentina', y: 3, text: 'Argentina: 3' },
                    { 'x': 'Denmark', y: 2, text: 'Denmark: 2' },
                    { 'x': 'Sweden', y: 2, text: 'Sweden: 2' },
                    { 'x': 'South Africa', y: 2, text: 'South Africa: 2' },
                    { 'x': 'Ukraine', y: 2, text: 'Ukraine: 2' },
                    { 'x': 'Serbia', y: 2, text: 'Serbia: 2' },
                    { 'x': 'Poland', y: 2, text: 'Poland: 2' },
                    { 'x': 'North Korea', y: 2, text: 'North Korea: 2' },
                    { 'x': 'Belgium', y: 2, text: 'Belgium: 2' },
                    { 'x': 'Thailand', y: 2, text: 'Thailand: 2' },
                    { 'x': 'Slovakia', y: 2, text: 'Slovakia`: 2' }
                ],
                xName: 'x',
                yName: 'y',
                startAngle: 0,
                endAngle: 360,
                innerRadius: '0%',
                dataLabel: {
                    visible: true, position: 'Outside',
                    border : { width: 1, color: 'black'},
                    connectorStyle: { length: '10%' }, name: 'text',
                },
            }
        ],
        legendSettings: {
            visible: true,
            position: 'Right',
            border: { width: 1, color: 'black' },
            height: '70%',
            width: '12%'
        },
        title: 'Rio Olympics Gold',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.accumulation.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
            if (args.accumulation.availableSize.width < 400) {
                args.accumulation.legendSettings.visible = false;
            } else {
                args.accumulation.legendSettings.visible = true;
            }
        }
    });
    pie.appendTo('#container');
};