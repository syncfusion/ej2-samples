/**
 * Default sample
 */
import { CircularGauge, Annotations, Position, TickModel } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

this.default = (): void => {
    let isMajorTicks: boolean = true;
    let circulargauge: CircularGauge = new CircularGauge({
        margin: {
            left: 0, right: 0, top: 0, bottom: 0
        },
        axes: [{
            annotations: [{
                content: '<div id="content" style="color:#518C03;font-size:20px;font-family:Segoe UI;font-weight:semibold;">145</div>',
                angle: 0, radius: '0%', zIndex: '1',
            }],
            startAngle: 210, endAngle: 150,
            lineStyle: {
                width: 2, color: '#9E9E9E'
            },
            labelStyle: {
                position: 'Outside', autoAngle: true,
                font: {
                    size: '10px', color: '#333333'
                }
            }, majorTicks: {
                position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20
            }, minorTicks: {
                position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10
            },
            radius: '75%', minimum: 0, maximum: 180,
            ranges: [{
                start: 0, end: 145,
                color: '#8BC34A', radius: '60%'
            }],
            pointers: []
        }]
    });
    circulargauge.appendTo('#labels-container');

    document.getElementById('Ticks').onchange = () => {
        let value: string = (<HTMLInputElement>document.getElementById('Ticks')).value;
        let tick: TickModel; isMajorTicks = value === 'major';
        if (isMajorTicks) {
            tick = circulargauge.axes[0].majorTicks;
        } else {
            tick = circulargauge.axes[0].minorTicks;
        }
        (<HTMLInputElement>document.getElementById('tickposition')).value = tick.position;
        (<HTMLInputElement>document.getElementById('tickOffset')).value = tick.offset.toString();
        (<HTMLInputElement>document.getElementById('tickHeight')).value = tick.height.toString();
        document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + tick.offset;
        document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + tick.height;
    };

    document.getElementById('tickposition').onchange = () => {
        let value: string = (<HTMLInputElement>document.getElementById('tickposition')).value;
        if (isMajorTicks) {
            circulargauge.axes[0].majorTicks.position = <Position>value;
        } else {
            circulargauge.axes[0].minorTicks.position = <Position>value;
        }
        circulargauge.refresh();
    };

    document.getElementById('labelposition').onchange = () => {
        let value: string = (<HTMLInputElement>document.getElementById('labelposition')).value;
        circulargauge.axes[0].labelStyle.position = <Position>value;
        circulargauge.refresh();
    };

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
