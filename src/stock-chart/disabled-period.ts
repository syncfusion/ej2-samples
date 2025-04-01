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
        chartArea: { border: { width: 0 } },
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 },
                        crosshairTooltip: { enable: true }
                      },
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 }
        },
        series: [
            {
                dataSource: aapl, xName: 'x', yName: 'open', type: 'Area', fill: 'url(#gradient-chart)'
            }
        ],
        tooltip: { enable: true },
        crosshair: {
            enable: true
        },
        enablePeriodSelector: false,
        load: (args: IStockChartEventArgs) => {
            let selectedTheme: string = loadStockChartTheme(args);
            args.stockChart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
        }
    });
    stockChart.appendTo('#container');
};