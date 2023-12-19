import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, bootstrapColors, highContrastColors, materialColors, bootstarp5Colors, bootstarp5DarkColors, bootstrapDarkColors, tailwindColors, tailwindDarkColors, material3Colors, material3DarkColors, defaultColors, fluentColors } from './bullet-theme';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for bullet chart with local data.
 */

let data: Object[] = [
    {
        requiredStories: 20,
        completedStories: 25,
        name: 'David',
        color: "#7f84e8"
    },
    {
        requiredStories: 25,
        completedStories: 20,
        name: 'Asif',
        color: "#dd8abd"
    },
    {
        requiredStories: 15,
        completedStories: 10,
        name: 'Thomas',
        color: "#70ad47"
    },
    {
        requiredStories: 40,
        completedStories: 39,
        name: 'Rohit',
        color: "#f8b883"
    },
    {
        requiredStories: 35,
        completedStories: 40,
        name: 'Virat',
        color: "#e56590"
    },
    {
        requiredStories: 28,
        completedStories: 25,
        name: 'Jude',
        color: "#357cd2"
    },
    {
        requiredStories: 10,
        completedStories: 18,
        name: 'Warner',
        color: "#404041"
    },
    {
        requiredStories: 30,
        completedStories: 28,
        name: 'Malik',
        color: "#00bdae"
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
        valueFill: 'color',
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
            selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
            let color: string[];
            switch (args.bulletChart.theme) {
                case "Fabric":
                    color = fabricColors;
                    break;
                case "Bootstrap4":
                case "Bootstrap":
                    color = bootstrapColors;
                    break;
                case "HighContrastLight":
                case "HighContrast":
                    color = highContrastColors;
                    break;
                case "MaterialDark":
                    color = materialColors;
                    break;
                case "FabricDark":
                    color = fabricColors;
                    break;
                case "BootstrapDark":
                    color = bootstrapDarkColors;
                    break;
                case "Tailwind":
                    color = tailwindColors;
                    break;
                case "TailwindDark":
                    color = tailwindDarkColors;
                    break;
                case "Bootstrap5":
                    color = bootstarp5Colors;
                    break;
                case "Bootstrap5Dark":
                    color = bootstarp5DarkColors;
                    break;
                case "Fluent":
                case "FluentDark":
                    color = fluentColors;
                    break;
                case "Material3":
                    color = material3Colors;
                    break;
                case "Material3Dark":
                    color = material3DarkColors;
                    break;
                default:
                    color = defaultColors;
                    break;
                } 
                for (let i: number = 0; i < (args.bulletChart.dataSource as Object[]).length; i++) {
                    args.bulletChart.dataSource[i].color = color[i];
                }
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