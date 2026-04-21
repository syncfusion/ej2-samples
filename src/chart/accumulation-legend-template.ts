import { IAccLoadedEventArgs, IAccTooltipRenderEventArgs } from '@syncfusion/ej2/charts';
import { ILegendClickEventArgs, ILegendRenderEventArgs } from '@syncfusion/ej2-charts';
import { AccumulationChart, AccumulationDataLabel, PieSeries, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-charts';
import { loadAccumulationChartTheme } from './theme-color';
import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2/base';

// Inject required modules
AccumulationChart.Inject(AccumulationDataLabel, PieSeries, AccumulationLegend, AccumulationTooltip);

const data: any[] = [
    { x: 'United States', y: 29.55, image: 'United States', text: Browser.isDevice ? 'USA: 29.55%' : 'United States: 29.55%', description: '13.4M barrels per day', tooltip: '13.4M' },
    { x: 'Saudi Arabia',  y: 23.83, text: Browser.isDevice ? 'SAU: 23.83%' : 'Saudi Arabia: 23.83%', image: 'Saudi Arabia', description: '10.8M barrels per day', tooltip: '10.8M' },
    { x: 'Russia', y: 23.69, text: Browser.isDevice ? 'RUS: 23.69%' : 'Russia: 23.69%', image: 'Russia', description: '10.8M barrels per day', tooltip: '10.8M' },
    { x: 'Canada', y: 12.12, text: Browser.isDevice ? 'CAN: 12.12%' : 'Canada: 12.12%', image: 'Canada', description: '5.5M barrels per day', tooltip: '5.5M' },
    { x: 'China', y: 10.83, text: Browser.isDevice ? 'CHN: 10.83%' : 'China: 10.83%', image: 'China', description: '4.9M barrels per day', tooltip: '4.9M' }
];

(window as any).default = (): void => {
    loadCultureFiles();
    const chart: AccumulationChart = new AccumulationChart({
        title: 'Top 5 Oil Producing Countries (2023)',
        subTitle: 'Source: Wikipedia.org',
        titleStyle: {
            position: 'Custom',
            x: Browser.isDevice ? 150 : 492,
            y: 22.75
        },

        series: [
            {
                type: 'Pie',
                dataSource: data,
                xName: 'x',
                yName: 'y',
                animation: { enable: false },
                tooltipMappingName: 'tooltip',
                border: { color: '#ffffff', width: 1 },
                radius: Browser.isDevice ? '65%' : '70%',
                innerRadius: '0%',
                dataLabel: {
                    visible: true,
                    position: Browser.isDevice ? 'Inside' : 'Outside',
                    name: Browser.isDevice ? '' : 'text',
                    format: Browser.isDevice ? '{value}%' : '',
                    enableRotation: Browser.isDevice ? true : false,
                    font: { size: Browser.isDevice ? '8px' : '12px', fontWeight: '600' },
                    connectorStyle: { type: 'Line' }
                }
            }
        ],

        tooltip: {
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Production: <b>${point.tooltip}</b> barrels/day'
        },
        enableBorderOnMouseMove: false,
        legendSettings: {
            visible: true,
            width: Browser.isDevice ? '35%' : '20%',
            position: 'Right',
            itemPadding: 15,
            template:
                '<div class="legend-template" style="display:flex; align-items:flex-start; gap:' + (Browser.isDevice ? '6px' : '8px') + '; opacity:1; max-width:' + (Browser.isDevice ? '160px' : '280px') + '; box-sizing:border-box;">' +
                    '<img class="e-legend-img" src="" width="' + (Browser.isDevice ? '24' : '36') + '" height="' + (Browser.isDevice ? '24' : '36') + '" style="flex:0 0 ' + (Browser.isDevice ? '24px' : '36px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + ';" />' +
                    '<div style="display:flex; flex-direction:column; min-width:0; text-align:left;">' +
                    '<span class="e-legend-label" style="font-weight:600; font-size:' + (Browser.isDevice ? '10px' : '13px') + '; color:LABEL_COLOR; line-height:' + (Browser.isDevice ? '12px' : '18px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
                    '<span class="e-legend-desc" style="font-size:' + (Browser.isDevice ? '10px' : '12px') + '; margin-top:' + (Browser.isDevice ? '0px' : '2px') + '; line-height:' + (Browser.isDevice ? '12px' : '15px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + (Browser.isDevice ? '130px' : '220px') + ';"></span>' +
                    '</div>' +
                    '</div>'
        },
        legendRender: (args: ILegendRenderEventArgs) => {
            let desc: any = data.find(function (d) { return d.x === args.text; }).description;
            let matchedPoint: any = (chart.series[0] as any).points.find(function (p: any) { return p.x === args.text; });
            let opacity: any = matchedPoint && !matchedPoint.visible ? '0.5' : '1';
            args.template = args.template
                .replace('opacity:1;', 'opacity:' + opacity + ';')
                .replace('LABEL_COLOR', args.fill)
                .replace('src=""', 'src="src/chart/images/' + args.text + '.png"')
                .replace('></span>', '>' + args.text + '</span>')
                .replace(/<span class="e-legend-desc"([^>]*)><\/span>/, '<span class="e-legend-desc"$1>' + desc + '</span>');
        },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });

    chart.appendTo('#container');
};
