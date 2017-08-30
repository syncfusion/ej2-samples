import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, IAccTextRenderEventArgs,
    chartMouseClick, IMouseEventArgs, Index, indexFinder, AccumulationDataLabel, AccumulationChartModel
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Drill down
 */
this.default = (): void => {
    let suvs: Object = [{ x: 'Toyota', y: 8 }, { x: 'Ford', y: 12 }, { x: 'GM', y: 17 }, { x: 'Renault', y: 6 }, { x: 'Fiat', y: 3 },
    { x: 'Hyundai', y: 16 }, { x: 'Honda', y: 8 }, { x: 'Maruthi', y: 10 }, { x: 'BMW', y: 20 }];

    let cars: Object = [{ x: 'Toyota', y: 7 }, { x: 'Chrysler', y: 12 }, { x: 'Nissan', y: 9 }, { x: 'Ford', y: 15 }, { x: 'Tata', y: 10 },
    { x: 'Mahindra', y: 7 }, { x: 'Renault', y: 8 }, { x: 'Skoda', y: 5 }, { x: 'Volkswagen', y: 15 }, { x: 'Fiat', y: 3 }];

    let pickups: Object = [{ x: 'Nissan', y: 9 }, { x: 'Chrysler', y: 4 }, { x: 'Ford', y: 7 }, { x: 'Toyota', y: 20 },
    { x: 'Suzuki', y: 13 }, { x: 'Lada', y: 12 }, { x: 'Bentley', y: 6 }, { x: 'Volvo', y: 10 }, { x: 'Audi', y: 19 }];

    let minivans: Object = [{ x: 'Hummer', y: 11 }, { x: 'Ford', y: 5 }, { x: 'GM', y: 12 }, { x: 'Chrysler', y: 3 }, { x: 'Jaguar', y: 9 },
    { x: 'Fiat', y: 8 }, { x: 'Honda', y: 15 }, { x: 'Hyundai', y: 4 }, { x: 'Scion', y: 11 }, { x: 'Toyota', y: 17 }];

    let clickInstance: AccumulationChartModel = {
        series: [{ type: 'Pie', dataSource: suvs, xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Outside' } }],
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y + ' %';
        },
        enableSmartLabels: true,
        tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.pie.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    };
    let pointClick: EmitType<IMouseEventArgs> = (args: IMouseEventArgs) => {
        let index: Index = indexFinder(args.target);
        if (document.getElementById(pie.element.id + '_Series_' + index.series + '_Point_' + index.point)) {
            let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
            if (tooltip) { tooltip.remove(); }
            pie.destroy(); pie.removeSvg();
            pie = null;
            switch (index.point) {
                case 0:
                    clickInstance.series[0].dataSource = suvs;
                    clickInstance.title = 'Automobile Sales in the SUV segment';
                    document.getElementById('text').innerHTML = 'SUV';
                    break;
                case 1:
                    clickInstance.series[0].dataSource = cars;
                    clickInstance.title = 'Automobile Sales in the Car segment';
                    document.getElementById('text').innerHTML = 'Car';
                    break;
                case 2:
                    clickInstance.series[0].dataSource = pickups;
                    clickInstance.title = 'Automobile Sales in the Pickup segment';
                    document.getElementById('text').innerHTML = 'Pickup';
                    break;
                case 3:
                    clickInstance.series[0].dataSource = minivans;
                    clickInstance.title = 'Automobile Sales in the Minivan segment';
                    document.getElementById('text').innerHTML = 'Minivan';
                    break;
            }
            pie = new AccumulationChart(clickInstance);
            pie.appendTo('#container');
            document.getElementById('category').style.visibility = 'visible';
            document.getElementById('symbol').style.visibility = 'visible';
            document.getElementById('text').style.visibility = 'visible';
        }
    };
    let instance: AccumulationChartModel = {
        series: [
            {
                dataSource: [
                    { x: 'SUV', y: 25 }, { x: 'Car', y: 37 }, { x: 'Pickup', y: 15 },
                    { x: 'Minivan', y: 23 }
                ],
                dataLabel: {
                    visible: true, position: 'Inside', connectorStyle: { type: 'Curve', length: '10%' },
                    font: { size: '14px', color: 'white' }
                },
                radius: '70%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '0%',
                explode: true, explodeOffset: '10%', explodeIndex: 2,
            }
        ],
        enableSmartLabels: false,
        legendSettings: { visible: false }, chartMouseClick: pointClick,
        textRender: (args: IAccTextRenderEventArgs) => {
            args.text = args.point.x + ' ' + args.point.y + ' %';
        },
        tooltip: { enable: false, format: '${point.x} <br> ${point.y} %' },
        title: 'Automobile Sales by Category',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.pie.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    };
    let pie: AccumulationChart = new AccumulationChart(instance);
    pie.appendTo('#container');
    document.getElementById('category').onclick = (e: MouseEvent) => {
        let tooltip: Element = document.getElementsByClassName('e-tooltip-wrap')[0];
        if (tooltip) { tooltip.remove(); }
        pie.destroy(); pie.removeSvg();
        pie = null; pie = new AccumulationChart(instance);
        pie.appendTo('#container');
        (e.target as HTMLButtonElement).style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    };
};