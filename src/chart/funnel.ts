import {
    AccumulationChart, AccumulationLegend, FunnelSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel, IAccResizeEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Funnel chart
 */
this.default = (): void => {
    let data: object[] = [{ x: 'Renewed', y: 18.20, text: '18.20%' },
    { x: 'Subscribed', y: 27.3, text: '27.3%' },
    { x: 'Support', y: 55.9, text: '55.9%' },
    { x: 'Downloaded', y: 76.8, text: '76.8%' },
    { x: 'Visited', y: 100, text: '100%' }];

    let chart: AccumulationChart = new AccumulationChart({
        //Initializing Chart Series
        series: [{
            type: 'Funnel', dataSource: data, xName: 'x', yName: 'y', width: '60%', height: '80%',
            neckWidth: '15%', gapRatio: 0.03, neckHeight: '18%',
            dataLabel: {
                name: 'text', visible: true, position: 'Inside', font: {
                    fontWeight: '600'
                }
            }, explode: true,
        }],
        legendSettings: { toggleVisibility: false },
        //Initializing tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' },
        enableAnimation: false,
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            if (args.accumulation.availableSize.width < args.accumulation.availableSize.height) {
                args.accumulation.series[0].width = '80%';
                args.accumulation.series[0].height = '70%';
            }
        },
        resized: (args: IAccResizeEventArgs) => {
            let bounds: ClientRect = document.getElementById('container').getBoundingClientRect();
            if (bounds.width < bounds.height) {
                args.accumulation.series[0].width = '80%';
                args.accumulation.series[0].height = '70%';
            } else {
                args.accumulation.series[0].width = '60%';
                args.accumulation.series[0].height = '80%';
            }
        },
        //Initializing Chart title
        title: 'Website Visitors',
    });
    chart.appendTo('#container');
    function neckWidth(value: number): void {
        chart.series[0].neckWidth = value + '%';
        document.getElementById('neckWidth').innerHTML = value + '%';
        chart.removeSvg();
        chart.refreshSeries();
        chart.refreshChart();
    }
    document.getElementById('chartneckwidth').onpointermove = document.getElementById('chartneckwidth').ontouchmove =
    document.getElementById('chartneckwidth').onchange = (e: Event) => {
        neckWidth(+(document.getElementById('chartneckwidth') as HTMLInputElement).value);
    };
    function neckHeight(value: number): void {
        chart.series[0].neckHeight = value + '%';
        document.getElementById('neckHeight').innerHTML = value + '%';
        chart.removeSvg();
        chart.refreshSeries();
        chart.refreshChart();
    }
    document.getElementById('chartneckheight').onpointermove = document.getElementById('chartneckheight').ontouchmove =
    document.getElementById('chartneckheight').onchange = (e: Event) => {
        neckHeight(+(document.getElementById('chartneckheight') as HTMLInputElement).value);
    };
};