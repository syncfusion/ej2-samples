import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for bullet chart with local data.
 */

let data: Object[] = [
    {
        requiredStories: 20,
        completedStories: 25,
        name: 'David'
    },
    {
        requiredStories: 25,
        completedStories: 20,
        name: 'Asif'
    },
    {
        requiredStories: 15,
        completedStories: 10,
        name: 'Thomas'
    },
    {
        requiredStories: 40,
        completedStories: 39,
        name: 'Rohit'
    },
    {
        requiredStories: 35,
        completedStories: 40,
        name: 'Virat'
    },
    {
        requiredStories: 28,
        completedStories: 25,
        name: 'Jude'
    },
    {
        requiredStories: 10,
        completedStories: 18,
        name: 'Warner'
    },
    {
        requiredStories: 30,
        completedStories: 28,
        name: 'Malik'
    }
];

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: data,
        valueField: 'completedStories',
        targetField: 'requiredStories',
        categoryField: 'name',
        animation: { enable: false },
        valueFill: '#304560',
        targetColor: '#304560',
        ranges: [
            { end: 25, opacity: 1, color: '#DBE7F3' },
            { end: 37, opacity: 1, color: '#BBCEE7' },
            { end: 45, opacity: 1, color: '#96B2D7' }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');;
        },
        height: '400',
        minimum: 5, maximum: 45, interval: 5,
        minorTickLines: { width: 0},
        title: 'Sprint Planning',
        subtitle: 'Estimated in story points',
        titlePosition: 'Top',
    });
    chart.appendTo('#localData');
};