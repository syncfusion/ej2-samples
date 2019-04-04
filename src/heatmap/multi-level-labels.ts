import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Tooltip, ILoadedEventArgs, ICellEventArgs, HeatMapTheme, ITooltipEventArgs } from '@syncfusion/ej2-heatmap';
import * as data from './data.json';
HeatMap.Inject(Tooltip);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Product wise Monthly sales revenue for a e-commerce website',
            textStyle: {
                size: '15px', fontWeight: '500', fontStyle: 'Normal', fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['Laptop', 'Mobile', 'Gaming', 'Cosmetics', 'Fragrance', 'Watches', 'Handbags', 'Apparel',
                'Kitchenware', 'Furniture', 'Home Decor'],
            border: {
                width: 1,
                type: 'Rectangle',
                color: '#a19d9d'
            },
            textStyle: {
                color: 'black',

            },
            multiLevelLabels: [
                {
                    border: { type: 'Rectangle', color: '#a19d9d' },
                    textStyle: {
                        color: 'black',
                        fontWeight: 'Bold'
                    },
                    categories: [
                        { start: 0, end: 2, text: 'Electronics', },
                        { start: 3, end: 4, text: 'Beauty and personal care', },
                        { start: 5, end: 7, text: 'Fashion', },
                        { start: 8, end: 10, text: 'Household', },
                    ]
                },
            ]
        },
        yAxis: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            border: {
                width: 0
            },
            textStyle: {
                color: 'black'
            },
            isInversed: true,
            multiLevelLabels: [
                {
                    border: { type: 'Brace', color: '#a19d9d' },
                    textStyle: {
                        color: 'black',
                        fontWeight: 'Bold'
                    },
                    categories: [
                        { start: 0, end: 2, text: 'Q1' },
                        { start: 3, end: 5, text: 'Q2' },
                        { start: 6, end: 8, text: 'Q3' },
                        { start: 9, end: 11, text: 'Q4' }
                    ]
                },
            ]
        },
        paletteSettings: {
            palette: [{ color: '#F0ADCE' },
            { color: '#19307B' }
            ]
        },
        legendSettings: {
            visible: false
        },
        cellRender: (args: ICellEventArgs) => {
            args.displayText = '$ ' + (args.value as number / 10) + 'K';
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = [args.xLabel + ' | ' + args.yLabel + ' : $ ' + (args.value as number / 10) + 'K'];
        },
        cellSettings: {
            border: {
                width: 0
            }
        },
        dataSource: (data as any).multiLevelLabelData,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            selectedTheme = selectedTheme.toLowerCase();
            if (selectedTheme === 'highcontrast') {
                args.heatmap.xAxis.textStyle.color = 'White';
                args.heatmap.yAxis.textStyle.color = 'White';
                args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'White';
                args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'White';
            } else {
                args.heatmap.xAxis.textStyle.color = 'Black';
                args.heatmap.yAxis.textStyle.color = 'Black';
                args.heatmap.xAxis.multiLevelLabels[0].textStyle.color = 'Black';
                args.heatmap.yAxis.multiLevelLabels[0].textStyle.color = 'Black';
            }
        },
    });
    heatmap.appendTo('#container');
};