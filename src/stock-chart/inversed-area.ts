import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { aapl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
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
        primaryXAxis: { valueType: 'DateTime', isInversed: true, majorGridLines: { width: 0 }, crosshairTooltip: { enable: true }},
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            crosshairTooltip: { enable: true },
            majorTickLines: { color: 'transparent', height: 0 }, isInversed: true
        },
        chartArea: { border: { width: 0 } },

        series: [
            {
                dataSource: aapl, xName: 'x', yName: 'high', type: 'Area', opacity: 0.5, name: 'google'
            }
        ],
        seriesType : [],
        indicatorType : [],
        crosshair: { enable: true , lineType:'Both' },
        title: 'AAPL Stock Price',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
};