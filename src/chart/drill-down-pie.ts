import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, getElement, AccumulationChart, AccumulationLegend, PieSeries,
    AccumulationTooltip, IAccLoadedEventArgs, IAccTextRenderEventArgs,
    chartMouseClick, IMouseEventArgs, Index, indexFinder, AccumulationDataLabel,
    AccumulationChartModel, AccumulationAnnotation
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation);
/**
 * Sample fro Drill Down in Pie chart
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let AsiaPacific: Object = [{ x: 'China', y: 66.7 }, { x: 'Japan', y: 17.8 }, { x: 'India', y: 11.1 }, { x: 'South Korea', y: 3.3 }, { x: 'Others', y: 1.1 }];
    let Europe: Object = [{ x: 'Germany', y: 32 }, { x: 'UK', y: 20 }, { x: 'France', y: 16 }, { x: 'Italy', y: 12 }, { x: 'Spain', y: 8 }, { x: 'Others', y: 12 }];
    let NorthAmerica: Object = [{ x: 'USA', y: 75 }, { x: 'Canada', y: 15 }, { x: 'Mexico', y: 10 }];
    let LatinAmerica: Object = [{ x: 'Brazil', y: 57.1 }, { x: 'Argentina', y: 21.4 }, { x: 'Chile', y: 14.3 }, { x: 'Others', y: 7.1 }];
    let MiddleEastAfrica: Object = [{ x: 'South Africa', y: 33.3 }, { x: 'Egypt', y: 26.7 }, { x: 'UAE', y: 23.3 }, { x: 'Others', y: 16.7 }];
    let clickInstance: AccumulationChartModel = {
        series: [{
            type: 'Pie', dataSource: AsiaPacific, xName: 'x', yName: 'y',
            dataLabel: { visible: true, font: { fontWeight: '600' }, position: Browser.isDevice ? 'Inside' : 'Outside', enableRotation: Browser.isDevice ? true : false, connectorStyle: { type: 'Curve' , length: Browser.isDevice ? '5%' : '10%'}}, innerRadius: '40%', radius: '80%'
        }
        ], textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y + '%';
        }, annotations: [{
            content: '<div id="back" style="cursor:pointer;padding:3px;width:30px; height:30px;">' +
            '<img src="./src/chart/images/back.png" id="back" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
        }], chartMouseClick: (args: IMouseEventArgs) => {
            if (args.target.indexOf('back') > -1) {
                let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
                if (tooltip) { tooltip.remove(); }
                pie.destroy(); pie.removeSvg(); pie = null; pie = new AccumulationChart(instance);
                pie.series[0].animation.enable = false;
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
            let selectedTheme: string = loadAccumulationChartTheme(args);
            if (selectedTheme === 'highcontrast' || selectedTheme === 'fluent2-highcontrast') {
                args.accumulation.annotations[0].content = '#white' ;
                args.accumulation.series[0]!.dataLabel!.font!.color = "white";
            }
            if (args.accumulation.theme.indexOf('Dark') > -1){
                args.accumulation.annotations[0].content = '#white' ;
                args.accumulation.series[0]!.dataLabel!.font!.color = "white";
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
                    clickInstance.series[0].dataSource = AsiaPacific; getElement('text').innerHTML = 'Asia-Pacific';
                    clickInstance.title = 'Automobile Sales in the Asia-Pacific region';
                    break;
                case 1:
                    clickInstance.series[0].dataSource = Europe; getElement('text').innerHTML = 'Europe';
                    clickInstance.title = 'Automobile Sales in the Europe region';
                    break;
                case 2:
                    clickInstance.series[0].dataSource = NorthAmerica; getElement('text').innerHTML = 'North America';
                    clickInstance.title = 'Automobile Sales in the North America region';
                    break;
                case 3:
                    clickInstance.series[0].dataSource = LatinAmerica; getElement('text').innerHTML = 'Latin America';
                    clickInstance.title = 'Automobile Sales in the Latin America region';
                    break;
                case 4:
                    clickInstance.series[0].dataSource = MiddleEastAfrica; getElement('text').innerHTML = ' Middle East & Africa region';
                    clickInstance.title = 'Automobile Sales in the Middle East & Africa region';
                    break;
            }
            pie = new AccumulationChart(clickInstance); 
            let selectedTheme: string = location.hash.split('/')[1];
            if (selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) {
                pie.annotations = [{
                    content: '<div id= "white" style="cursor:pointer;padding:3px;width:30px; height:30px;"><img src="./src/chart/images/white.png" id="back" alt="White Icon"/><div>', region: 'Series', x: '50%', y: '50%'
                }];
            }
            else {
                pie.annotations = [{
                    content: '<div id="back" style="cursor:pointer; padding: 3px; width: 30px; height: 30px;">' + '<img src="./src/chart/images/back.png" id="imgback" alt="Back Icon"/>', region: 'Series', x: '50%', y: '50%'
                }];
            }
            pie.series[0].animation.enable = false;
            pie.series[0].startAngle = -30;
            pie.series[0].endAngle = 330;
            pie.appendTo('#container');
            (<HTMLElement>getElement('symbol')).style.visibility = 'visible';
            (<HTMLElement>getElement('category')).style.visibility = 'visible';
            (<HTMLElement>getElement('text')).style.visibility = 'visible';
            pie.series[0].radius = '80%';
            pie.series[0].dataLabel.font.size = Browser.isDevice ? '6px' : '12px';
        }
    };
    let instance: AccumulationChartModel = {
        series: [
            {
                dataSource: [{ x: 'Asia-Pacific', y: 45 }, { x: 'Europe', y: 25 }, { x: 'North America', y: 25 }, {x: 'Latin America', y: 7}, { x: 'Middle East & Africa', y: 3 }],
                dataLabel: {
                    visible: true, position: 'Outside', enableRotation : false,
                    connectorStyle: { type: 'Curve', length: Browser.isDevice ? '5%' : '10%' }, font: { fontWeight: '600', color: 'black', size: Browser.isDevice ? '6px' : '12px' }},
                radius: '70%', xName: 'x', yName: 'y', startAngle: -30, endAngle: 330, innerRadius: '0%', borderRadius: 3, border: {color: '#ffffff', width: 1} }
        ], enableSmartLabels: false, legendSettings: { visible: false }, chartMouseClick: pointClick,
        textRender: (args: IAccTextRenderEventArgs) => { args.text = args.point.x + ' ' + args.point.y + '%'; },
        tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' },
        title: 'Automobile Sales by Region - 2023', subTitle: 'Source: wikipedia.org', enableBorderOnMouseMove:false,
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = loadAccumulationChartTheme(args);
            if (selectedTheme === 'highcontrast' || selectedTheme === 'fluent2-highcontrast') {
                args.accumulation.series[0]!.dataLabel!.font!.color = "white";
            }
            if (args.accumulation.theme.indexOf('Dark') > -1){
                args.accumulation.series[0]!.dataLabel!.font!.color = "white";
            }
        }
    };
    let pie: AccumulationChart = new AccumulationChart(instance); pie.appendTo('#container');
    (getElement('category') as HTMLElement).onclick = (e: MouseEvent) => {
        let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
        if (tooltip) { tooltip.remove(); }
        pie.destroy(); pie.removeSvg(); pie = null; pie = new AccumulationChart(instance);
        pie.series[0].animation.enable = false;
        pie.appendTo('#container');
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        (getElement('symbol') as HTMLElement).style.visibility = 'hidden';
        (getElement('text') as HTMLElement).style.visibility = 'hidden';
    };
};