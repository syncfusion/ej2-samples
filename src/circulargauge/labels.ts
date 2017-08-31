/**
 * Default sample
 */
import { CircularGauge, Annotations, Position, TickModel } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
CircularGauge.Inject(Annotations);

this.default = (): void => {
    let isMajorTicks: boolean = true;
    let circulargauge: CircularGauge = new CircularGauge({
        axes: [{
            annotations: [{
                content: '<div id="content" style="color:#518C03;font-size:20px;font-family:Segoe UI;font-weight:semibold;">145</div>',
                angle: 0, radius: '0%', zIndex: '1',
            }],
            startAngle: 210, endAngle: 150,
            lineStyle: { width: 2, color: '#9E9E9E' },
            labelStyle: {
                position: 'Outside', autoAngle: true,
                font: { size: '10px', color: '#333333' }
            }, majorTicks: {
                position: 'Inside', color: 'black', width: 0.7, height: 10, interval: 20
            }, minorTicks: {
                position: 'Inside', color: 'black', height: 5, width: 0.7, interval: 10
            },
            radius: '75%', minimum: 0, maximum: 180,
            ranges: [{  start: 0, end: 145, color: '#8BC34A', radius: '60%' }],
            pointers: []
        }]
    });
    circulargauge.appendTo('#labels-container');
    let ticks: DropDownList; let tickPosition: DropDownList; let labelPosition: DropDownList;
    ticks = new DropDownList({
        index: 0, width: 100,
        change: () => {
            let value: string = ticks.value.toString();
            let tick: TickModel; isMajorTicks = value === 'major';
            if (isMajorTicks) {
                tick = circulargauge.axes[0].majorTicks;
            } else {
                tick = circulargauge.axes[0].minorTicks;
            }
            tickPosition.value = tick.position;
            (<HTMLInputElement>document.getElementById('tickOffset')).value = tick.offset.toString();
            (<HTMLInputElement>document.getElementById('tickHeight')).value = tick.height.toString();
            document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + tick.offset;
            document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + tick.height;
        }
    });
    ticks.appendTo('#Ticks');

    tickPosition = new DropDownList({
        index: 0, width: 100,
        change: () => {
            let value: string = tickPosition.value.toString();
            if (isMajorTicks) {
                circulargauge.axes[0].majorTicks.position = <Position>value;
            } else {
                circulargauge.axes[0].minorTicks.position = <Position>value;
            }
            circulargauge.refresh();
        }
    });
    tickPosition.appendTo('#tickposition');

    labelPosition = new DropDownList({
        index: 0, width: 100,
        change: () => {
            circulargauge.axes[0].labelStyle.position = <Position>labelPosition.value.toString();
            circulargauge.refresh();
        }
    });
    labelPosition.appendTo('#labelposition');

    document.getElementById('tickOffset').onpointermove = document.getElementById('tickOffset').ontouchmove =
        document.getElementById('tickOffset').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('tickOffset')).value, 10);
            if (isMajorTicks) {
                circulargauge.axes[0].majorTicks.offset = value;
            } else {
                circulargauge.axes[0].minorTicks.offset = value;
            }
            document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + value;
            circulargauge.refresh();
        };

    document.getElementById('tickHeight').onpointermove = document.getElementById('tickHeight').ontouchmove =
        document.getElementById('tickHeight').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('tickHeight')).value, 10);
            if (isMajorTicks) {
                circulargauge.axes[0].majorTicks.height = value;
            } else {
                circulargauge.axes[0].minorTicks.height = value;
            }
            document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + value;
            circulargauge.refresh();
        };

    document.getElementById('labelOffset').onpointermove = document.getElementById('labelOffset').ontouchmove =
        document.getElementById('labelOffset').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('labelOffset')).value, 10);
            circulargauge.axes[0].labelStyle.offset = value;
            document.getElementById('labelOffsetValue').innerHTML = 'Label Offset <span>&nbsp;&nbsp;&nbsp;' + value;
            circulargauge.refresh();
        };
};
