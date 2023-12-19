import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { chartData } from './indicator-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries, StockLegend } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator } from '@syncfusion/ej2-charts';
import { IAxisLabelRenderEventArgs , IStockChartEventArgs, ChartTheme, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, ColumnSeries, Crosshair, ITooltipRenderEventArgs } from '@syncfusion/ej2-charts';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries, StockLegend);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator, Export);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, ColumnSeries);

/**
 * Sample for Area Series with Empty Point
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let stockChart: StockChart = new StockChart({
        rows: [{ height: '30%' }, { height: '70%' }],
        chartArea: { border: { width: 0 } },
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }},
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 }
        },
        axes: [{
            name: 'yAxis1', rowIndex: 1, opposedPosition: true, labelPosition: 'Inside',
            tickPosition: 'Inside',
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent' }
        }],
        series: [
            {
                dataSource: chartData,
                type: 'Candle', yAxisName: 'yAxis1', name: 'Apple Inc'
            },
            {
                dataSource: chartData,
                type: 'Column', yName: 'volume', enableTooltip: false,  name: 'Volume'
            }
        ],
        legendSettings: { visible: true },
        crosshair: { enable: true },
        tooltip: { enable: true , format:'High : <b>${point.high}</b><br/>Low :<b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>'},
        tooltipRender : (args: ITooltipRenderEventArgs) => {
            if (args.text.split('<br/>')[4]) {
                let target : number = parseFloat(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
                let value : string = (target / 100000000).toFixed(1) + 'B';
                args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
            }
        },
        axisLabelRender : (args : IAxisLabelRenderEventArgs) => {
            let text : number = parseFloat(args.text);
            if (args.axis.name === 'primaryYAxis') {
                args.text = text / 100000000 + 'B';
            }
        },
        title: 'AAPL Historical',
        load: (args: IStockChartEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    stockChart.appendTo('#container');
};