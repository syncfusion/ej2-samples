/**
 * Data Sample Gauge
 */
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export function gauge1(): CircularGauge {
    let gauge1: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        axes: [{
            annotations: [{
                content: '#germany',
                angle: 180, zIndex: '1',
                radius: '30%'
            }, {
                content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">Germany</div>',
                angle: 180, zIndex: '1',
                radius: '65%'
            }],
            startAngle: 230,
            endAngle: 130,
            majorTicks: { width: 0 },
            lineStyle: { width: 0 },
            minorTicks: { width: 0 },
            labelStyle: { font: { size: '0' } },
            ranges: [{
                start: 0, end: 50,
                startWidth: 15, endWidth: 15,
                color: '#EC121C'
            }, {
                start: 50, end: 100,
                startWidth: 15, endWidth: 15,
                color: '#45EA0C'
            }],
            pointers: [{
                value: 75, radius: '60%',
                animation: { enable: false },
                color: '#777777', pointerWidth: 5,
                cap: {
                    radius: 6,
                    border: { width: 0 },
                    color: '#777777'
                },
                needleTail: {
                    length: '25%',
                    color: '#777777'
                }
            }]
        }]
    });
    return gauge1;
}
export function gauge2(): CircularGauge {
    let gauge2: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        axes: [{
            annotations: [{
                content: '#usa',
                angle: 180, zIndex: '1',
                radius: '30%'
            }, {
                content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">USA</div>',
                angle: 180, zIndex: '1',
                radius: '65%'
            }],
            startAngle: 230,
            endAngle: 130,
            majorTicks: { width: 0 },
            lineStyle: { width: 0 },
            minorTicks: { width: 0 },
            labelStyle: { font: { size: '0' } },
            ranges: [{
                start: 0, end: 50,
                startWidth: 15, endWidth: 15,
                color: '#EC121C'
            }, {
                start: 50, end: 100,
                startWidth: 15, endWidth: 15,
                color: '#45EA0C'
            }],
            pointers: [{
                value: 60, radius: '60%',
                animation: { enable: false },
                color: '#777777', pointerWidth: 5,
                cap: {
                    radius: 6,
                    border: { width: 0 },
                    color: '#777777'
                },
                needleTail: {
                    length: '25%',
                    color: '#777777'
                }
            }]
        }]
    });
    return gauge2;
}
export function gauge3(): CircularGauge {
    let gauge3: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        axes: [{
            annotations: [{
                content: '#uk',
                angle: 180, zIndex: '1',
                radius: '30%'
            }, {
                content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">UK</div>',
                angle: 180, zIndex: '1',
                radius: '65%'
            }],
            startAngle: 230,
            endAngle: 130,
            majorTicks: { width: 0 },
            lineStyle: { width: 0 },
            minorTicks: { width: 0 },
            labelStyle: { font: { size: '0' } },
            ranges: [{
                start: 0, end: 50,
                startWidth: 15, endWidth: 15,
                color: '#EC121C'
            }, {
                start: 50, end: 100,
                startWidth: 15, endWidth: 15,
                color: '#45EA0C'
            }],
            pointers: [{
                value: 25, radius: '60%',
                animation: { enable: false },
                color: '#777777', pointerWidth: 5,
                cap: {
                    radius: 6,
                    border: { width: 0 },
                    color: '#777777'
                },
                needleTail: {
                    length: '25%',
                    color: '#777777'
                }
            }]
        }]
    });
    return gauge3;
}