import { loadCultureFiles } from '../common/culture-loader';
import { StockChart } from '@syncfusion/ej2-charts';
import { aapl } from './stock-data';
import { DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries } from '@syncfusion/ej2-charts';
import { AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator } from '@syncfusion/ej2-charts';
import { MacdIndicator, RsiIndicator, Trendlines, SmaIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-charts';
import { TmaIndicator, RangeTooltip, Tooltip, Crosshair , IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
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
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } },
        primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent' }, crosshairTooltip: { enable: true }},
        series: [{
                dataSource: aapl, xName: 'x', yName: 'high', type: 'Spline', name: 'google', close: 'high'
            }],
        stockEvents: [
            {   date: new Date(2012, 3, 1), text: 'Q2', description: '2012 Quarter2', type: 'Flag',
                background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2012, 3, 20), text: 'Open', description: 'Markets opened', textStyle: { color: 'white' },
                background: '#f48a21', border: { color: '#f48a21' }
            },
            {
                date: new Date(2012, 6, 1), text: 'Q3', description: '2013 Quarter3', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2012, 9, 1), text: 'Q4', description: '2013 Quarter4', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2012, 7, 30), text: 'G', description: 'Google Stock',
                textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' }
            },
            {
                date: new Date(2012, 10, 1), text: 'Y', description: 'Yahoo Stock', type: 'Square',
                textStyle: { color: 'white' }, background: '#841391', border: { color: '#841391' }
            },
            {
                date: new Date(2012, 12, 0), text: 'Y2', description: 'Year 2013', type: 'Pin', showOnSeries: false,
                textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' }
            },
            {
                date: new Date(2013, 3, 1), text: 'Q2', description: '2013 Quarter2', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2013, 3, 20), text: 'Q2', description: 'Surge in Stocks', type: 'ArrowUp',
                textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' }
            },
            {
                date: new Date(2013, 6, 1), text: 'Q3', description: '2013 Quarter3', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2013, 9, 1), text: 'Q4', description: '2013 Quarter4', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2013, 12, 0), text: 'Y3', description: 'Year 2014', type: 'Pin', showOnSeries: false,
                textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' }
            },
            {
                date: new Date(2014, 3, 1), text: 'Q2', description: '2014 Quarter2', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2014, 6, 1), text: 'Q3', description: '2014 Quarter3',
                textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' }
            },
            {
                date: new Date(2014, 9, 1), text: 'Q4', description: '2014 Quarter4', type: 'Flag',
                textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' }
            },
            {
                date: new Date(2014, 12, 0), text: 'Y4', description: 'Year 2015', type: 'Pin', showOnSeries: false,
                textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' }
            },
            {
                date: new Date(2014, 2, 2), text: 'End', description: 'Markets closed', type: 'ArrowDown',
                textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' }
            },
            {
                date: new Date('2015-01-07'), text: 'A', description: 'Amazon Stock',
                textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' }
            },
            {
                date: new Date(2015, 1, 2), text: 'Q1', description: 'AAPL Stock',
                textStyle: { color: 'white' }, background: '#dd3c9f', border: { color: '#dd3c9f' }, type: 'Text'
            },
            {
                date: new Date(2015, 2, 12), text: 'Close', description: 'Markets closed',
                textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' }
            }
        ],
        seriesType : [], indicatorType : [], trendlineType: [],
        title: 'AAPL Stock Price', crosshair: { enable: true },
        load: (args: IStockChartEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    stockChart.appendTo('#container');
};