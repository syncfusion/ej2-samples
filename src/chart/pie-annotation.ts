import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, AreaSeries, DateTime, Legend, ILoadedEventArgs, Selection, IAxisLabelRenderEventArgs,
    ChartAnnotation, ChartTheme, Tooltip} from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, Legend, Selection, ChartAnnotation, Tooltip);
import { annotateData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';


let selectedTheme: string = location.hash.split('/')[1];
 selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
 let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
 selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
 let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark'];
 let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
 let fill : string = 'url(#' + selectedTheme + '-gradient-chart)';
/**
 * Sample for annotation in chart
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 }, labelFormat: 'n2', title: "Distance",
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Speed (KM/H)', lineStyle: { width: 0 }, minimum: 50, maximum: 400, 
            minorTickLines: { width: 0 }
        },
        annotations:  [
            {
                content : '<div class="first-box-bottom" > Senna S </div>', x:'0.360', y:'80' , coordinateUnits:'Point'
            },
            {
                content : '<div class="second-box-bottom" > Descida do Lego </div>',  x:'1.400', y:'130' , coordinateUnits:'Point'
            },
            {
                content :  '<div class="third-box-bottom" > Ferradura </div>', x:'2.100', y:'200' , coordinateUnits:'Point'
            },
            {
                content :'<div class="box-left" > Curva do Sol </div>', x:'0.85', y:'155' , coordinateUnits:'Point'
            },
            {
                content :'<div class="box-top-left" > Reta Oposta </div>', x:'0.700', y:'292'  ,coordinateUnits:'Point'
            },
            {
                content : '<div class="box-bottom" > Bico de Pato </div>',  x:'2.750', y:'80' , coordinateUnits:'Point'
            },
            {
                content : '<div class="box-top" > Mergulho </div>', x:'3.136', y:'284' , coordinateUnits:'Point'
            },
            {
                content :  Browser.isDevice ? '' :'<div class="third-box-bottom" > Junção </div>',  x:'3.270', y:'98' , coordinateUnits:'Point'
            },
            {
                content : Browser.isDevice ? '' :'<div class="box-top" > Subida dos <br /> Boxes </div>', x:'3.800', y:'312' , coordinateUnits:'Point'
            },
            {
                content : Browser.isDevice ? '' :'<div style="font-family: sans-serif" > Max, accelertion <br /> 5.00 g at 5th gear </div>', x:'1.65', y:'300' , coordinateUnits:'Point'
            },
            {
                content : Browser.isDevice ? '' :'<div style="font-family: sans-serif" > Max, accelertion <br /> 4.58 g at 5th gear </div>', x:'2.60', y:'250' ,coordinateUnits:'Point'
            }
        ],
        //Initializing Series
        series: [
            { type: 'Area', xName: 'Distance',  yName: 'Speed', dataSource: annotateData, border: { width: 2.5 , color: '#000000' },
            marker: { height: 7, width: 7, fill: 'rgb(247, 206, 105,0.7)'}, animation: { enable: false }
        },
        ],
        chartArea: { border: { width: 0 } }, title: 'Speed Data Plot for Interlagos Circuit',
        //Initializing Selection
        width: Browser.isDevice ? '100%' : '90%',
        tooltip:{ 
            enable: true,
            shared: true,
            header: '' ,
            enableMarker: false,
            format: 'Distance: ${point.x} KM <br> ${point.y} KM/H',
            fill: 'white',
            opacity: 1,
            border:{ color: 'rgb(247, 206, 105)', width: 2 }, textStyle:{ color: 'black'}}, 
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            if (selectedTheme.match('Dark')) {
                args.chart.series[0].fill = 'url(#dark-gradient-chart)'; 
            }
            else {
                args.chart.series[0].fill = 'url(#gradient-chart)';  
            }
            //FillColor = IsDarkTheme ? "url(#dark-gradient-chart)" : "url(#gradient-chart)";
        },
        legendSettings: { visible: true, toggleVisibility: false },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'primaryXAxis') { args.text = args.text + ' KM'; }
        },
        //Initializing Annotation
    });
    chart.appendTo('#container');
};