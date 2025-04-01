import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, Legend, DataLabel, Tooltip, ILoadedEventArgs, ITooltipRenderEventArgs, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip, Highlight);
import { Browser } from '@syncfusion/ej2-base';
import { getElement, IAxisLabelClickEventArgs, IMouseEventArgs, IPointRenderEventArgs, Series } from '@syncfusion/ej2/charts';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrap5Colors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, pointMaterial3Colors, pointMaterial3DarkColors, pointFluent2Colors, pointFluent2HighContrastColors, pointFluent2DarkColors, pointTailwind3Colors, pointTailwind3DarkColors, loadChartTheme } from './theme-color';
/**
 * Sample for Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data = [{
        y: 4778,
        drilldown: 'Asia'
    },
    {

        y: 1481,
        drilldown: 'Africa'
    },
    {

        y: 746,
        drilldown: 'Europe'
    },
    {

        y: 379,
        drilldown: 'North America'
    },
    {

        y: 46,
        drilldown: 'Oceania'
    }];
    let clicked = false;
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', labelStyle: {
                color: 'blue'
            }, interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate90', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            title: 'Population (in Millions)', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, interval: 1000
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'drilldown', width: 2, yName: 'y', name: 'Population',
                dataSource: data, cornerRadius: { topLeft: 5, topRight: 5 },
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Outer'
                    }
                }
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Top Populated Continents of 2023', 
        subTitle: 'A Look at Population Rankings and Trends in 2023',
        tooltip: {
            enable: true, header: "<b>Population - 2023</b>",
            format: '${point.x}: ${point.y}M'
        },
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            args.text = args.text.replace(/\d+/g, (num: string) =>
                Number(num).toLocaleString('en-US')
            );
        },
        loaded: (args: ILoadedEventArgs) => {
            if (clicked) {
                for (let i = 0; i <= 6; i++) {
                    var axisLabel = document.getElementById(`drilldown0_AxisLabel_${i}`);
                    if (axisLabel) {
                        axisLabel.classList.add('no-underline');
                    }
                    const seriesElement = document.getElementById(`drilldown_Series_0_Point_${i}`);
                    if (seriesElement) {
                        seriesElement.classList.add('no-underline');
                    }
                }
            }
        },
        pointRender: (args: IPointRenderEventArgs) => {
            if (!clicked) {
                let theme: string = loadChartTheme().toLowerCase();
                if (theme && theme.indexOf('fabric') > -1) {
                    args.fill = pointFabricColors[args.point.index % 10];;
                } else if (theme === 'materialdark') {
                    args.fill = pointMaterialDarkColors[args.point.index % 10];;
                } else if (theme === 'material') {
                    args.fill = pointMaterialColors[args.point.index % 10];
                } else if (theme === 'bootstrap5dark') {
                    args.fill = pointBootstrap5DarkColors[args.point.index % 10];
                } else if (theme === 'bootstrap5') {
                    args.fill = pointBootstrap5Colors[args.point.index % 10];
                } else if (theme === 'bootstrap') {
                    args.fill = pointBootstrapColors[args.point.index % 10];
                } else if (theme === 'bootstrap4') {
                    args.fill = pointBootstrapColors[args.point.index % 10];
                } else if (theme === 'bootstrapdark') {
                    args.fill = pointBootstrapColors[args.point.index % 10];
                } else if (theme === 'highcontrast') {
                    args.fill = pointHighContrastColors[args.point.index % 10];
                } else if (theme === 'fluentdark') {
                    args.fill = pointFluentDarkColors[args.point.index % 10];
                } else if (theme === 'fluent') {
                    args.fill = pointFluentColors[args.point.index % 10];
                } else if (theme === 'tailwinddark') {
                    args.fill = pointTailwindDarkColors[args.point.index % 10];
                } else if (theme === 'tailwind') {
                    args.fill = pointTailwindColors[args.point.index % 10];
                }
                else if (theme === 'material3') {
                    args.fill = pointMaterial3Colors[args.point.index % 10];
                }
                else if (theme === 'material3dark') {
                    args.fill = pointMaterial3DarkColors[args.point.index % 10];
                }
                else if (theme === 'fluent2') {
                    args.fill = pointFluent2Colors[args.point.index % 10];
                }
                else if (theme === 'fluent2highcontrast') {
                    args.fill = pointFluent2HighContrastColors[args.point.index % 10];
                }
                else if (theme === 'fluent2dark') {
                    args.fill = pointFluent2DarkColors[args.point.index % 10];
                }
                else if (theme === 'tailwind3dark') {
                    args.fill = pointTailwind3DarkColors[args.point.index % 10];
                }
                else if (theme === 'tailwind3') {
                    args.fill = pointTailwind3Colors[args.point.index % 10];
                }
            }

        },
        pointClick: (args: IPointRenderEventArgs) => {
            args.series.fill = args.point.color;
            if (args.point.index !== 6) {
                args.series.yAxis.interval = null;
                if (!args.series.chart.theme.includes('Dark') && args.series.chart.theme !== 'HighContrast' && args.series.chart.theme !== 'Fluent2HighContrast') {
                    args.series.chart.primaryXAxis.labelStyle.color = "black";
                }
                else if (args.series.chart.theme === 'Material3Dark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
                }
                else if (args.series.chart.theme === 'FluentDark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
                }
                else if (args.series.chart.theme === 'Fluent2Dark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#ADADAD";
                }
                else if (args.series.chart.theme === 'Bootstrap5Dark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
                }
                else if (args.series.chart.theme === 'TailwindDark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
                }
                else if (args.series.chart.theme === 'Tailwind3Dark') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
                }
                else if (args.series.chart.theme === 'HighContrast') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#969696";
                }
                else if (args.series.chart.theme === 'Fluent2HighContrast') {
                    args.series.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
                }
                if (!clicked) {
                    document.getElementById("text").innerHTML = <string>args.point.x;
                    document.getElementById("category").style.visibility = "visible";
                    document.getElementById("symbol").style.visibility = "visible";
                    document.getElementById("text").style.visibility = "visible";
                    if (args.point.index === 0) {
                        args.series.chart.title = "Top Populated Countries of Asia - 2023";
                        args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.series.chart.series[0].dataSource = [{
                                y: 1422,
                                drilldown: 'China'
                            },
                            {
                                y: 1438,
                                drilldown: 'India'
                            },
                            {
                                y: 278,
                                drilldown: 'Indonesia'
                            },
                            {
                                y: 240,
                                drilldown: 'Pakistan'
                            },
                            {
                                y: 173,
                                drilldown: 'Bangladesh'
                            },
                            {
                                y: 125,
                                drilldown: 'Japan'
                            },
                            {
                                y: 117,
                                drilldown: 'Philippines'
                            },
                            {
                                y: 99,
                                drilldown: 'Vietnam'
                            }
                        ];
                    }
                    if (args.point.index === 1) {
                        args.series.chart.title = "Top Populated Countries of Africa - 2023";
                        args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.series.chart.series[0].dataSource = [{
                                y: 223,
                                drilldown: 'Nigeria'
                            },
                            {
                                y: 126,
                                drilldown: 'Ethiopia'
                            },
                            {
                                y: 113,
                                drilldown: 'Egypt'
                            },
                            {
                                y: 68,
                                drilldown: 'Tanzania'
                            },
                            {
                                y: 60,
                                drilldown: 'South Africa'
                            },
                            {
                                y: 55,
                                drilldown: 'Kenya'
                            },
                            {
                                y: 48,
                                drilldown: 'Uganda'
                            }
                        ];
                    }
                    if (args.point.index === 2) {
                        args.series.chart.title = "Top Populated Countries of Europe - 2023";
                        args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.series.chart.series[0].dataSource = [{
                                y: 143,
                                drilldown: 'Russia'
                            },
                            {
                                y: 84,
                                drilldown: 'Germany'
                            },
                            {
                                y: 67,
                                drilldown: 'United Kingdom'
                            },
                            {
                                y: 65,
                                drilldown: 'France'
                            },
                            {
                                y: 59,
                                drilldown: 'Italy'
                            },
                            {
                                y: 47,
                                drilldown: 'Spain'
                            }
                        ];
                    }
                    if (args.point.index === 3) {
                        args.series.chart.title = "Top Populated Countries of North America - 2023";
                        args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.series.chart.series[0].dataSource = [{
                                y: 339,
                                drilldown: 'United States'
                            },
                            {
                                y: 127,
                                drilldown: 'Mexico'
                            },
                            {
                                y: 39,
                                drilldown: 'Canada'
                            },
                            {
                                y: 19,
                                drilldown: 'Guatemala'
                            },
                            {
                                y: 10,
                                drilldown: 'Honduras'
                            },
                            {
                                y: 6,
                                drilldown: 'El Salvador'
                            },
                            {
                                y: 6,
                                drilldown: 'Nicaragua'
                            },
                            {
                                y: 5,
                                drilldown: 'Costa Rica'
                            }
                        ];
                    }
                    if (args.point.index === 4) {
                        args.series.chart.title = "Top Populated Countries of Oceania - 2023";
                        args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        clicked = true;
                        args.series.chart.series[0].dataSource = [{
                                y: 26,
                                drilldown: 'Australia'
                            },
                            {
                                y: 9,
                                drilldown: 'Papua New Guinea'
                            },
                            {
                                y: 5,
                                drilldown: 'New Zealand'
                            }
                        ];
                    }
                }
            }
        },
        chartMouseClick: (args: IMouseEventArgs) => {
            if (args.target.indexOf('category') > -1) {
                chart.series[0].dataSource = data;
            }
        },
        axisLabelClick: (args: IAxisLabelClickEventArgs) => {
            if (args.axis.name === "primaryXAxis") {
                args.chart.series[0].fill = (args.chart.series[0] as Series).points[args.index].color;

                if (args.index !== 6) {
                    args.chart.primaryYAxis.interval = null;
                    if (!args.chart.theme.includes('Dark') && args.chart.theme !== 'HighContrast' && args.chart.theme !== 'Fluent2HighContrast') {
                        args.chart.primaryXAxis.labelStyle.color = "black";
                    }
                    else if (args.chart.theme === 'Material3Dark') {
                        args.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
                    }
                    else if (args.chart.theme === 'FluentDark') {
                        args.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
                    }
                    else if (args.chart.theme === 'Fluent2Dark') {
                        args.chart.primaryXAxis.labelStyle.color = "#ADADAD";
                    }
                    else if (args.chart.theme === 'Bootstrap5Dark') {
                        args.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
                    }
                    else if (args.chart.theme === 'TailwindDark') {
                        args.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
                    }
                    else if (args.chart.theme === 'Tailwind3Dark') {
                        args.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
                    }
                    else if (args.chart.theme === 'HighContrast') {
                        args.chart.primaryXAxis.labelStyle.color = "#969696";
                    }
                    else if (args.chart.theme === 'Fluent2HighContrast') {
                        args.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
                    }
                    if (!clicked) {
                        document.getElementById("text").innerHTML = args.text;
                        document.getElementById("category").style.visibility = "visible";
                        document.getElementById("symbol").style.visibility = "visible";
                        document.getElementById("text").style.visibility = "visible";

                        if (args.index === 0) {
                            args.chart.title = "Top Populated Countries of Asia - 2023";
                            args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                            clicked = true;
                            args.chart.series[0].dataSource = [{
                                y: 1422,
                                drilldown: 'China'
                            },
                            {
                                y: 1438,
                                drilldown: 'India'
                            },
                            {
                                y: 278,
                                drilldown: 'Indonesia'
                            },
                            {
                                y: 240,
                                drilldown: 'Pakistan'
                            },
                            {
                                y: 173,
                                drilldown: 'Bangladesh'
                            },
                            {
                                y: 125,
                                drilldown: 'Japan'
                            },
                            {
                                y: 117,
                                drilldown: 'Philippines'
                            },
                            {
                                y: 99,
                                drilldown: 'Vietnam'
                            }
                            ]
                        }
                        if (args.index === 1) {
                            args.chart.title = "Top Populated Countries of Africa - 2023";
                            args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                            clicked = true;
                            args.chart.series[0].dataSource = [{
                                y: 223,
                                drilldown: 'Nigeria'
                            },
                            {
                                y: 126,
                                drilldown: 'Ethiopia'
                            },
                            {
                                y: 113,
                                drilldown: 'Egypt'
                            },
                            {
                                y: 68,
                                drilldown: 'Tanzania'
                            },
                            {
                                y: 60,
                                drilldown: 'South Africa'
                            },
                            {
                                y: 55,
                                drilldown: 'Kenya'
                            },
                            {
                                y: 48,
                                drilldown: 'Uganda'
                            }
                            ]
                        }
                        if (args.index === 2) {
                            args.chart.title = "Top Populated Countries of Europe - 2023";
                            args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                            clicked = true;
                            args.chart.series[0].dataSource = [{
                                y: 143,
                                drilldown: 'Russia'
                            },
                            {
                                y: 84,
                                drilldown: 'Germany'
                            },
                            {
                                y: 67,
                                drilldown: 'United Kingdom'
                            },
                            {
                                y: 65,
                                drilldown: 'France'
                            },
                            {
                                y: 59,
                                drilldown: 'Italy'
                            },
                            {
                                y: 47,
                                drilldown: 'Spain'
                            }
                            ]
                        }
                        if (args.index === 3) {
                            args.chart.title = "Top Populated Countries of North America - 2023";
                            args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                            clicked = true;
                            args.chart.series[0].dataSource = [{
                                y: 339,
                                drilldown: 'United States'
                            },
                            {
                                y: 127,
                                drilldown: 'Mexico'
                            },
                            {
                                y: 39,
                                drilldown: 'Canada'
                            },
                            {
                                y: 19,
                                drilldown: 'Guatemala'
                            },
                            {
                                y: 10,
                                drilldown: 'Honduras'
                            },
                            {
                                y: 6,
                                drilldown: 'El Salvador'
                            },
                            {
                                y: 6,
                                drilldown: 'Nicaragua'
                            },
                            {
                                y: 5,
                                drilldown: 'Costa Rica'
                            }
                            ]
                        }
                        if (args.index === 4) {
                            args.chart.title = "Top Populated Countries of Oceania - 2023";
                            args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                            clicked = true;
                            args.chart.series[0].dataSource = [{
                                y: 26,
                                drilldown: 'Australia'
                            },
                            {
                                y: 9,
                                drilldown: 'Papua New Guinea'
                            },
                            {
                                y: 5,
                                drilldown: 'New Zealand'
                            }
                            ]
                        }

                    }
                }
            }
        }
    });
    chart.appendTo('#drilldown');
    (getElement('category') as HTMLElement).onclick = (e: MouseEvent) => {
        chart.title = "Top Populated Continents of 2023";
        chart.subTitle = "A Look at Population Rankings and Trends in 2023";
        chart.primaryXAxis.labelStyle.color = "blue";
        chart.primaryYAxis.interval = 1000;
        chart.series[0].dataSource = data;
        clicked = false;
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        (getElement('symbol') as HTMLElement).style.visibility = 'hidden';
        (getElement('text') as HTMLElement).style.visibility = 'hidden';
    };
};