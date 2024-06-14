import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { googl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme }
 from '@syncfusion/ej2-charts';
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
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            crosshairTooltip: { enable: true }
        },
        primaryYAxis: {
            labelFormat: 'n0',
            rangePadding: 'None',
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                dataSource: googl, type: 'HiloOpenClose', name: 'google',
                animation: { enable: true },
                xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close',
                bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
            }
        ],
        tooltip: { enable: true, shared: true, position: 'Nearest' },
        crosshair: {
            enable: true
        },
        tooltipRender : (args: ITooltipRenderEventArgs) => {
            if (args.text.split('<br/>')[4]) {
                let target : number = parseFloat(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
                let value : string = (target / 100000000).toFixed(1) + 'B';
                args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
            }
        },
        title: 'AAPL Stock Price',
        load: (args: IStockChartEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    stockChart.appendTo('#container');
};