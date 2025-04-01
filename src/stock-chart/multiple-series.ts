import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { goog, googl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries,
StockLegend, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTime, StockLegend, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for Multiple series in stock chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let stockChart: StockChart = new StockChart({
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }},
        primaryYAxis: {
            interval: 40, lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
            crosshairTooltip: { enable: true }
        },
        chartArea: { border: { width: 0 } },
        indicatorType : [],
        trendlineType : [],
        seriesType : ['Line', 'Hilo', 'HiloOpenClose', 'Spline', 'Candle'],
        series: [
            {
                dataSource: goog, xName: 'x', yName: 'close', type: 'Spline', name: 'GOOG'
            },
            {
                dataSource: googl, xName: 'x', yName: 'close', type: 'Spline', name: 'GOOGL'
            },
        ],
        crosshair: {
            enable: true,
            lineType: 'Both'
        },
        legendSettings: {
            visible: true
        },
        title: 'Multiple Series',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
};