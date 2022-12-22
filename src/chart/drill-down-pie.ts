import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, getElement, AccumulationChart, AccumulationLegend, PieSeries,
    AccumulationTooltip, IAccLoadedEventArgs, IAccTextRenderEventArgs,
    chartMouseClick, IMouseEventArgs, Index, indexFinder, AccumulationDataLabel,
    AccumulationChartModel, AccumulationAnnotation
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2/base';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation);
/**
 * Sample fro Drill Down in Pie chart
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let suvs: Object = [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
    { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }];
    let cars: Object = [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
    { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }];
    let pickups: Object = [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
    { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }];
    let minivans: Object = [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
    { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }];
    let clickInstance: AccumulationChartModel = {
        series: [{
            type: 'Pie', dataSource: suvs, xName: 'x', yName: 'y',
            dataLabel: { visible: true, position: Browser.isDevice ? 'Inside' : 'Outside', enableRotation:true, connectorStyle: { type: 'Curve' , length: '20px'}}, innerRadius: '30%', 
        }
        ], textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y + ' %';
        }, annotations: [{
            content: '<div id="back" style="cursor:pointer;padding:3px;width:30px; height:30px;">' +
            '<img src="./src/chart/images/back.png" id="back" />', region: 'Series', x: '50%', y: '50%'
        }], chartMouseClick: (args: IMouseEventArgs) => {
            if (args.target.indexOf('back') > -1) {
                let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
                if (tooltip) { tooltip.remove(); }
                pie.destroy(); pie.removeSvg(); pie = null; pie = new AccumulationChart(instance);
                pie.appendTo('#container');
                (getElement('category') as HTMLButtonElement).style.visibility = 'hidden';
                (getElement('symbol') as HTMLElement).style.visibility = 'hidden';
                (<HTMLElement>getElement('text')).style.visibility = 'hidden';
            }
        },
        legendSettings: { visible: false }, enableSmartLabels: true,
        tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' },
        enableBorderOnMouseMove:false,
         // custom code start
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (selectedTheme === 'highcontrast') {
                args.accumulation.annotations[0].content = '#white' ;
            }
            if (args.accumulation.theme.indexOf('Dark') > -1){
                args.accumulation.annotations[0].content = '#white' ;
            }
        }
         // custom code end
    };
    let pointClick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (getElement(pie.element.id + '_Series_' + index.series + '_Point_' + index.point)) {
            let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
            if (tooltip) { tooltip.remove(); }
            pie.destroy(); pie.removeSvg(); pie = null;
            switch (index.point) {
                case 0:
                    clickInstance.series[0].dataSource = suvs; getElement('text').innerHTML = 'SUV';
                    clickInstance.title = 'Automobile Sales in the SUV Segment';
                    break;
                case 1:
                    clickInstance.series[0].dataSource = cars; getElement('text').innerHTML = 'Car';
                    clickInstance.title = 'Automobile Sales in the Car Segment';
                    break;
                case 2:
                    clickInstance.series[0].dataSource = pickups; getElement('text').innerHTML = 'Pickup';
                    clickInstance.title = 'Automobile Sales in the Pickup Segment';
                    break;
                case 3:
                    clickInstance.series[0].dataSource = minivans; getElement('text').innerHTML = 'Minivan';
                    clickInstance.title = 'Automobile Sales in the Minivan Segment';
                    break;
            }
            pie = new AccumulationChart(clickInstance); pie.appendTo('#container');
            (<HTMLElement>getElement('symbol')).style.visibility = 'visible';
            (<HTMLElement>getElement('category')).style.visibility = 'visible';
            (<HTMLElement>getElement('text')).style.visibility = 'visible';
            pie.series[0].radius = Browser.isDevice ? '90%' : '80%';
        }
    };
    let instance: AccumulationChartModel = {
        series: [
            {
                dataSource: [{ x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 }, { x: 'Minivan', y: 23 }],
                dataLabel: {
                    visible: true, position: 'Inside', enableRotation : false,
                    font: { fontWeight: '600', color: 'white' }},
                radius: '70%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '0%',
                explode: false }
        ], enableSmartLabels: false, legendSettings: { visible: false }, chartMouseClick: pointClick,
        textRender: (args: IAccTextRenderEventArgs) => { args.text = args.point.x + ' ' + args.point.y + ' %'; },
        tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' },
        title: 'Automobile Sales by Category',  enableBorderOnMouseMove:false,
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    };
    let pie: AccumulationChart = new AccumulationChart(instance); pie.appendTo('#container');
    (getElement('category') as HTMLElement).onclick = (e: MouseEvent) => {
        let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
        if (tooltip) { tooltip.remove(); }
        pie.destroy(); pie.removeSvg(); pie = null; pie = new AccumulationChart(instance);
        pie.appendTo('#container');
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        (getElement('symbol') as HTMLElement).style.visibility = 'hidden';
        (getElement('text') as HTMLElement).style.visibility = 'hidden';
    };
};