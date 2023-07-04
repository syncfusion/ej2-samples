import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, Crosshair, DateTime, Legend, Tooltip,Category,ChartAnnotation, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip, Category,Crosshair, ChartAnnotation);

/**
 * Sample for Line Series with Dashed Line
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            interval: 1,
            labelRotation: Browser.isDevice ? -45 : 0,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
            majorTickLines: {width : 0},
            minorTickLines: {width: 0}
        },
        primaryYAxis:
        {
            labelFormat: '{value}k',
            rangePadding: 'None',
            lineStyle: { width: 0 },
            minimum: 0,
            maximum: 300,
            interval: 50,
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        annotations: [{
            content:  "<div>Actual</div>",
            region:"Series",
            x:"15%",
            y:"55%",
        }, {
            content:  "<div>Forecast</div>",
            region:"Series",
            x:"65%",
            y:"30%",
        }],
        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: [
                    { x: 'Jan', y: 100 },
                    { x: 'Feb', y: 110 },
                    { x: 'Mar', y: 125 },
                    { x: 'Apr', y: 150 },
                    { x: 'May', y: 140 },
                    { x: 'Jun', y: 160 },
                ],
                xName: 'x', width: 2, marker:{ visible: false, width: 7, height: 7 },
                yName: 'y'
            },
            {
              type: 'Line',
              dataSource: [
                  { x: 'Jun', y: 160 },
                  { x: 'Jul', y: 170 },
                  { x: 'Aug', y: 180 },
                  { x: 'Sep', y: 190 },
                  { x: 'Oct', y: 200 },
                  { x: 'Nov', y: 230 },
                  { x: 'Dec', y: 270 },
              ],
              xName: 'x', width: 2, marker: {
                  visible: false,
                  width: 10,
                  height: 10,
                  shape: 'Diamond',
              },
              dashArray: '10',
              yName: 'y'
          }
        ],
        //Initializing Chart title
        title: 'Fruits Production Statistics',
        /**
         * Initialize the user interaction feature tooltip and crosshair
         */
        tooltip: {
            enable: true,
            shared: true,
            format: '${point.x} : <b>${point.y}</b>',
            header: '<b>Fruits Production</b>'
        },
        crosshair: {
            enable: false,
            line: {
                color: 'rgba(204,214,235,0.25)',
                width: Browser.isDevice ? 50 : 20,
            },
            lineType: 'Vertical'
        },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let annotationColor = 'light';
        args.chart.annotations[0].content = '<div style="color:black; font-weight:bold;">Actual</div>';
        args.chart.annotations[1].content = '<div style="color:black; font-weight:bold;">Forecast</div>';
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        if (selectedTheme && selectedTheme.indexOf('fabric-dark') > -1) {
          annotationColor = 'dark'
        } else if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
          annotationColor = 'light'
        } else if (selectedTheme === 'material-dark') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'material') {
          annotationColor = 'light'
        } else if (selectedTheme === 'bootstrap5-dark') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'bootstrap5') {
          annotationColor = 'light'
        } else if (selectedTheme === 'bootstrap-dark') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'bootstrap') {
          annotationColor = 'light'
        } else if (selectedTheme === 'highcontrast') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'fluent-dark') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'fluent') {
          annotationColor = 'light'
        } else if (selectedTheme === 'tailwind-dark') {
          annotationColor = 'dark'
        } else if (selectedTheme === 'tailwind') {
          annotationColor = 'light'
        }
        else if (selectedTheme === 'material3-dark') {
          annotationColor = 'dark';
        }
        else if (selectedTheme === 'material3') {
          annotationColor = 'light';
        } else {
          annotationColor = 'light'
        }
        if (annotationColor == 'light') {
          args.chart.annotations[0].content = '<div style="color:black; font-weight:bold;">Actual</div>';
          args.chart.annotations[1].content = '<div style="color:black; font-weight:bold;">Forecast</div>';
        }
        else {
          args.chart.annotations[0].content = '<div style="color:whitesmoke; font-weight:bold;">Actual</div>';
          args.chart.annotations[1].content = '<div style="color:whitesmoke; font-weight:bold;">Forecast</div>';
        }
        },
    });
    chart.appendTo('#container');
};