import { loadCultureFiles } from '../common/culture-loader';
import { Chart, Category, ColumnSeries, Legend, StripLine, ILoadedEventArgs, ChartTheme, ILegendClickEventArgs, Selection, Tooltip, Zoom } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, Category, Legend, StripLine, Selection, Tooltip, Zoom);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, keyBootstrap4Colors, keyBootstrapdarkColors, keyFabricDark, pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluent2Colors, pointFluent2HighContrastColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwind3Colors, pointTailwind3DarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';

/**
 * Sample for Keyboard Navigaion chart
 */
(window as any).default = (): void => {
    loadCultureFiles();


    let FontColor: string = "#353535";
    let seriesIndex: number = 0;
    let Segments: number[][] = [[0, 5 ], [ 7, 12 ], [14, 19 ], [21, 26 ] ];

    function getStriplineValues(legendClickedName: string) {
        for (let i: number = 0; i < chart.series.length; i++) {
            let name: string = chart.series[i].name; 
            let visible: boolean = name === legendClickedName ? !chart.series[i].visible: chart.series[i].visible;
            if (seriesIndex > 3) {
                seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                chart.primaryYAxis.stripLines[0].visible = chart.primaryYAxis.stripLines[1].visible = visible;
                if (chart.primaryYAxis.stripLines[0].visible) {
                    chart.primaryYAxis.stripLines[0].segmentStart = chart.primaryYAxis.stripLines[1].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[0].segmentEnd  = chart.primaryYAxis.stripLines[1].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                chart.primaryYAxis.stripLines[2].visible = chart.primaryYAxis.stripLines[3].visible = visible;
                if (chart.primaryYAxis.stripLines[2].visible) {
                    chart.primaryYAxis.stripLines[2].segmentStart = chart.primaryYAxis.stripLines[3].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[2].segmentEnd = chart.primaryYAxis.stripLines[3].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                chart.primaryYAxis.stripLines[4].visible = chart.primaryYAxis.stripLines[5].visible = visible;
                if (chart.primaryYAxis.stripLines[4].visible) {
                    chart.primaryYAxis.stripLines[4].segmentStart = chart.primaryYAxis.stripLines[5].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[4].segmentEnd = chart.primaryYAxis.stripLines[5].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else {
                chart.primaryYAxis.stripLines[6].visible = chart.primaryYAxis.stripLines[7].visible = visible;
                if (chart.primaryYAxis.stripLines[6].visible) {
                    chart.primaryYAxis.stripLines[6].segmentStart = chart.primaryYAxis.stripLines[7].segmentStart = Segments[seriesIndex][0];
                    chart.primaryYAxis.stripLines[6].segmentEnd = chart.primaryYAxis.stripLines[7].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
        }
        chart.refresh();
    }

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: {
                width: 0
            },
            labelStyle: {
                size: "0px"
            },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        primaryYAxis: {
            title: "Sales in Percentage",
            labelFormat: "{value}%",
            maximum: 120,
            lineStyle: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            stripLines: [
                {
                    isSegmented: true, start: 33, end: 35.5,  visible: true, segmentStart:0, segmentEnd:5,
                },
                {
                    isSegmented:true , start:39, end:39.2, visible:true, text:"Jan - Mar" , segmentStart:0, segmentEnd:5, color:"transparent"
                },
                {
                    isSegmented:true , start:65, end:67.5, visible:true, segmentStart:7, segmentEnd:12,
                },
                {
                    isSegmented:true , start:70, end:70.2, visible:true, text:"Apr - Jun" , segmentStart:7, segmentEnd:12, color:"transparent"
                },
                {
                    isSegmented:true , start:65, end:67.5, visible:true , segmentStart:14, segmentEnd:19,
                },
                {
                    isSegmented:true , start:70, end:70.2, visible:true, text:"Jul - Sep" , segmentStart:14, segmentEnd:19, color:"transparent"
                },
                {
                    isSegmented:true , start:104, end:106.5, visible:true, segmentStart:21, segmentEnd:26,
                },
                {
                    isSegmented:true , start:109, end:109.2, visible:true, text:"Oct - Dec" , segmentStart:21, segmentEnd:26, color:"transparent"
                }
            ]
        },
        enableAnimation: false,
        enableSideBySidePlacement: false,
        selectionMode: "Point",
        selectionPattern: "DiagonalForward",
        width: Browser.isDevice ? '100%' : '75%',
        zoomSettings: {
            enableSelectionZooming: true
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { Month: 'Jan 15', Sales: 10 },
                    { Month: 'Jan 31', Sales: 15 },
                    { Month: 'Feb 15', Sales: 15 },
                    { Month: 'Feb 28', Sales: 20 },
                    { Month: 'March 15', Sales: 20 },
                    { Month: 'March 31', Sales: 25 },
                    { Month: 'March', Sales: null },
                ],
                name: 'Quarter 1',
                xName: 'Month',
                width: 2,
                yName: 'Sales',
            },
            {
                type: 'Column',
                dataSource: [
                    { Month: 'Apr 15', Sales: 36 },
                    { Month: 'Apr 30', Sales: 48 },
                    { Month: 'May 15', Sales: 43 },
                    { Month: 'May 31', Sales: 59 },
                    { Month: 'Jun 15', Sales: 35 },
                    { Month: 'Jun 30', Sales: 50 },
                    { Month: 'Jun', Sales: null },
                ],
                name: 'Quarter 2',
                xName: 'Month',
                width: 2,
                yName: 'Sales',
            },
            {
                type: 'Column',
                dataSource: [
                    { Month: 'Jul 15', Sales: 30 },
                    { Month: 'Jul 31', Sales: 45 },
                    { Month: 'Aug 15', Sales: 30 },
                    { Month: 'Aug 31', Sales: 55 },
                    { Month: 'Sep 15', Sales: 57 },
                    { Month: 'Sep 30', Sales: 60 },
                    { Month: 'Sep', Sales: null },
                ],
                name: 'Quarter 3',
                xName: 'Month',
                width: 2,
                yName: 'Sales',
            },
            {
                type: 'Column',
                dataSource: [
                    { Month: 'Oct 15', Sales: 60 },
                    { Month: 'Oct 31', Sales: 70 },
                    { Month: 'Nov 15', Sales: 70 },
                    { Month: 'Nov 30', Sales: 70 },
                    { Month: 'Dec 15', Sales: 90 },
                    { Month: 'Dec 31', Sales: 100 },
                ],
                name: 'Quarter 4',
                xName: 'Month',
                width: 2,
                yName: 'Sales',
            },
        ],

        //Initializing Chart title
        title: 'Quarterly Sales Chart',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        },
        legendClick(args: ILegendClickEventArgs) {
            seriesIndex = 0;
            getStriplineValues(args.series.name);
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
            FontColor = args.chart.theme.indexOf("dark") > -1 || args.chart.theme.indexOf("highcontrast") > -1 ? "#F3F2F1" : "#353535";
            let FillColors: string[];
            let TextColor: string;
            if (args.chart.theme === 'MaterialDark') {
                FillColors = pointMaterialDarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Material') {
                FillColors = pointMaterialColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === "Fabric" ) {
                FillColors = pointFabricColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme=== 'FabricDark') {
                FillColors = keyFabricDark;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Bootstrap5Dark') {
                FillColors = pointBootstrap5DarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Bootstrap4') {
                FillColors = keyBootstrap4Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'Bootstrap5') {
                FillColors = pointBootstrap5Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === "Bootstrap") {
                FillColors = pointBootstrapColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'BootstrapDark'){
                FillColors = keyBootstrapdarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'TailwindDark') {
                FillColors = pointTailwindDarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Tailwind') {
                FillColors = pointTailwindColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'Tailwind3Dark') {
                FillColors = pointTailwind3DarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Tailwind3') {
                FillColors = pointTailwind3Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme==="HighContrast") {
                FillColors = pointHighContrastColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Fluent') {
                FillColors = pointFluentColors;
                TextColor = '#000000'
            }
            else if (args.chart.theme === 'FluentDark') {
                FillColors = pointFluentDarkColors;
                 TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Material3') {
                FillColors = pointMaterial3Colors;
                 TextColor = "#000000";
            }
            else if (args.chart.theme === 'Material3Dark') {
                FillColors = pointMaterial3DarkColors;
                 TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Fluent2') {
                FillColors = pointFluent2Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
                FillColors = pointFluent2HighContrastColors;
                TextColor = "#FFFFFF";
            }
            else {
                FillColors = pointFluentColors;
                TextColor = "#FFFFFF";
            }
            args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
            args.chart.primaryYAxis.stripLines[1].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
            args.chart.primaryYAxis.stripLines[3].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
            args.chart.primaryYAxis.stripLines[5].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
            args.chart.primaryYAxis.stripLines[7].textStyle.color = TextColor;
        }
    });
    chart.appendTo('#container1');
};
