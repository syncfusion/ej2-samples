import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { datetimeCategoryData } from './stock-data';
import { DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme }
from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';
StockChart.Inject(DateTimeCategory, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

/**
 * Sample for DateTime Category Axis
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let stockChart: StockChart = new StockChart({
        chartArea: { border: { width: 0 } },
        primaryYAxis: {
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
        },
        primaryXAxis: { valueType: 'DateTimeCategory', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true }},
        series: [
            {
                dataSource: datetimeCategoryData,
                type: 'Spline'

            },
        ],
        tooltip: {
            enable: true, header: 'AAPL Stock Price', format: '${point.x}: <b>${point.y}</b>'
        },
        crosshair: {
            enable: true
        },
        title: 'AAPL Stock Price',
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        }
    });
    stockChart.appendTo('#container');
};