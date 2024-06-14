import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { chartData } from './indicator-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Multiple series in stock chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let stockChart: StockChart = new StockChart({
    chartArea : {border : {width : 0}},
    primaryXAxis: { valueType: 'DateTime',  majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }},
    primaryYAxis: { lineStyle: {  color : 'transparent' }, crosshairTooltip: { enable: true },
                    majorTickLines: { color : 'transparent', height: 0 }},
    series: [
        {
            dataSource: chartData, xName: 'date', type: 'Line'
        }
    ],
    enableSelector : false,
    tooltip: { enable: true },
    crosshair: {
        enable: true, lineType:'Both'
    },
    load: (args: IStockChartEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    }
   });
    stockChart.appendTo('#container');
};