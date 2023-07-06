import { loadCultureFiles } from '../common/culture-loader';
import { Chart, AreaSeries, ILoadedEventArgs, ChartTheme, DateTime } from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { IPointRenderEventArgs } from '@syncfusion/ej2/charts';
import { Browser } from '@syncfusion/ej2/base';
Chart.Inject(AreaSeries, DateTime);
/**
 * Sample for Chart Performance
 */
 let selectedTheme: string = location.hash.split('/')[1];
 selectedTheme = selectedTheme ? selectedTheme : 'Material';
 let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
 selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
 let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
 let borderColor : string[] = ['#6355C7', '#8F80F4', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF'];
 let fill : string = 'url(#' + selectedTheme + '-gradient-chart)';

let chart: Chart;
let loaded: EmitType<ILoadedEventArgs>;
let dt1: number;
let dt2: number;
(window as any).default = (): void => { 
    loadCultureFiles();
    chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            intervalType: 'Years',
            valueType: 'DateTime',
            title: 'Years',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        },
          primaryYAxis: {
            interval: 2000,
            minimum: 0,
            maximum: 12000,
            title: 'Values',
            lineStyle:{width: 0},
            majorTickLines: {width:0}
        },
        chartArea: {
            border: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                name: 'Series1',
                type: 'Area',fill: fill,
                animation: { enable: false },border: { width: 2, color: borderColor[themes.indexOf(theme)]},
            }
        ],
        title:'Chart with 100k points',
        width: Browser.isDevice ? '100%' : '75%',
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let series1: Object[] = [];
              let point1: Object;
            let pts;
            let value = 0;
            for ( pts = 0; pts < 100000; pts++)
              {
                  if (pts % 3 == 0)
                  {
                      value -= (Math.random() *(100) / 3) * 4;
                  }
                  else if (pts % 2 == 0)
                  {
                     value += (Math.random() * ( 100) / 3) * 4;
                  }
                  if(value < 0)
                  {
                      value = value * -1;
                  }
                  if(value >= 12000)
                  {
                      value = Math.floor(Math.random() * 11000) + 1000;
                  }
                  point1 = {x: new Date(2005, 1, 1).setHours(pts) , y: value};
                  series1.push(point1);
                }
            chart.series[0].dataSource = series1;
            chart.series[0].xName = 'x';
            chart.series[0].yName = 'y';
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            args.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] }
        }
        
        // custom code end
    });
    chart.appendTo('#container');
   

};