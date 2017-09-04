import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccTextRenderEventArgs } from '@syncfusion/ej2-charts';
import { IAccPointRenderEventArgs, IAccLoadedEventArgs, AccumulationDataLabel } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Club Point
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
                ],
                animation: { enable: true },
                dataLabel: {
                    visible: true,
                    position: 'Outside',
                    connectorStyle: { type: 'Line', length: '2%', color: 'transparent' },
                    font: {
                        size: '14px'
                    }
                },
                radius: '70%',
                xName: 'x',
                yName: 'y',
                groupTo: '6',
                startAngle: 0,
                endAngle: 360,
                innerRadius: '0%',
            }
        ],
        pointRender: (args: IAccPointRenderEventArgs) => {
            if ((args.point.x as string).indexOf('Others') > -1) {
                args.fill = '#D3D3D3';
            }
        },
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y;
        },
        tooltip: { enable: true, format: '${point.x} <br> ${point.y} Medals' },
        title: 'Rio Olympics Gold',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.pie.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    pie.appendTo('#container');
    function clubchange(value: number): void {
        pie.series[0].groupTo = value.toString();
        pie.series[0].animation.enable = false;
        document.getElementById('clubvalue').innerHTML = value.toString();
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('clubpoint').onpointermove = document.getElementById('clubpoint').ontouchmove =
        document.getElementById('clubpoint').onchange = (e: Event) => {
            clubchange(+(document.getElementById('clubpoint') as HTMLInputElement).value);
        };
};