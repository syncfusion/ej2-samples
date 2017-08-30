/**
 * Default sample
 */
import { CircularGauge, Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);
this.default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        axes: [{
            lineStyle: { width: 10, color: 'transparent' },
            labelStyle: {
                position: 'Inside', useRangeColor: false,
                font: { size: '12px', color: '#424242', fontFamily: 'Roboto', fontStyle: 'Regular' }
            }, majorTicks: { height: 10, offset: 5, color: '#9E9E9E' }, minorTicks: { height: 0 },
            annotations: [{
                content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>',
                radius: '30%', angle: 0
            }, {
                content: '<div><span style="font-size:24px; color:#424242; font-family:Regular">65 MPH</span></div>',
                radius: '40%', angle: 180
            }],
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 120, radius: '80%',
            ranges: [{ start: 0, end: 40, color: '#30B32D' }, { start: 40, end: 80, color: '#FFDD00' },
            { start: 80, end: 120, color: '#F03E3E' }],
            pointers: [{ value: 65, radius: '60%', color: '#757575', pointerWidth: 8,
                cap: { radius: 7, color: '#757575' }, needleTail: { length: '18%' }
            }]
        }]
    });
    circulargauge.appendTo('#range-container');

    document.getElementById('start').onpointermove = document.getElementById('start').ontouchmove =
        document.getElementById('start').onchange = () => {
            let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
            let min: number = parseInt((<HTMLInputElement>document.getElementById('start')).value, 10);
            document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' + min;
            circulargauge.axes[0].ranges[index].start = min;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('end').onpointermove = document.getElementById('end').ontouchmove =
        document.getElementById('end').onchange = () => {
            let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
            let max: number = parseInt((<HTMLInputElement>document.getElementById('end')).value, 10);
            document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' + max;
            circulargauge.axes[0].ranges[index].end = max;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('startWidth').onpointermove = document.getElementById('startWidth').ontouchmove =
        document.getElementById('startWidth').onchange = () => {
            let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
            let startWidth: number = parseInt((<HTMLInputElement>document.getElementById('startWidth')).value, 10);
            document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' + startWidth;
            circulargauge.axes[0].ranges[index].startWidth = startWidth;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('endWidth').onpointermove = document.getElementById('endWidth').ontouchmove =
        document.getElementById('endWidth').onchange = () => {
            let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
            let endWidth: number = parseInt((<HTMLInputElement>document.getElementById('endWidth')).value, 10);
            document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' + endWidth;
            circulargauge.axes[0].ranges[index].endWidth = endWidth;
            circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
        };

    document.getElementById('rangeColor').onchange = () => {
        let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
        circulargauge.axes[0].ranges[index].color = (<HTMLInputElement>document.getElementById('rangeColor')).value;
        circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
    };

    document.getElementById('enable').onchange = () => {
        let useRangeColor: boolean = (<HTMLInputElement>document.getElementById('enable')).checked;
        circulargauge.axes[0].labelStyle.useRangeColor = useRangeColor;
        circulargauge.axes[0].majorTicks.useRangeColor = useRangeColor;
        circulargauge.axes[0].minorTicks.useRangeColor = useRangeColor;
        circulargauge.axes[0].pointers[0].animation.enable = false; circulargauge.refresh();
    };

    document.getElementById('rangeSelect').onchange = () => {
        let index: number = +(<HTMLInputElement>document.getElementById('rangeSelect')).value;
        (<HTMLInputElement>document.getElementById('rangeColor')).value = circulargauge.axes[0].ranges[index].color;
        (<HTMLInputElement>document.getElementById('endWidth')).value = circulargauge.axes[0].ranges[index].endWidth.toString();
        document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' +
            circulargauge.axes[0].ranges[index].endWidth;
        (<HTMLInputElement>document.getElementById('startWidth')).value = circulargauge.axes[0].ranges[index].startWidth.toString();
        document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' +
            circulargauge.axes[0].ranges[index].startWidth;
        (<HTMLInputElement>document.getElementById('end')).value = circulargauge.axes[0].ranges[index].end.toString();
        document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' +
            circulargauge.axes[0].ranges[index].end;
        (<HTMLInputElement>document.getElementById('start')).value = circulargauge.axes[0].ranges[index].start.toString();
        document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' +
            circulargauge.axes[0].ranges[index].start;
    };
};
