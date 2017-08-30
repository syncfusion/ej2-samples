/**
 * Circulargauge
 */
import { CircularGauge, ILoadedEventArgs, IAxisLabelRenderEventArgs, IResizeEventArgs } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

let gauge1StartAngle: number = 200;
let gauge1EndAngle: number = 365;
let gauge2StartAngle: number = 110;
let gauge2EndAngle: number = 180;
let gauge3StartAngle: number = 0;
let gauge3EndAngle: number = 70;
let gauge1Interval: number = 1;
let gauge1FontSize: string = '14px';
let gauge1Radius: string = '95%';
let subGauge1Radius: string = '95%';
let subGauge2Radius: string = '75%';
let tickWidth: number = 3;
let annotationContent: string = '<div><span>RPM <br/>X 1000</span></div>';
let annotationRadius: string = '40%';
let annotationAngle: number = 200;
let centerX: string = '47%';
let centerY: string = '50%';
let fuelRadius: string = '40%';
let gauge1LineWidth: number = 3;
let cloudAngle: number = 10;
let tickHeight: number = 10;
export function gauge(): CircularGauge {

    let gauge: CircularGauge = new CircularGauge({
        axes: [
            {
                lineStyle: { width: 0 },
                labelStyle: {
                    position: 'Inside', format: '####', font: { size: '14px', color: '#565656' }
                }, majorTicks: {
                    width: 3, height: 15, color: '#565656', interval: 20
                }, minorTicks: {
                    width: 2, height: 10, color: '#565656'
                },
                minimum: 0, maximum: 220, radius: '100%',
                startAngle: 240, endAngle: 120,
                pointers: [
                    {
                        value: 0, radius: '65%',
                        pointerWidth: 8,
                        cap: { color: '#FF9200', radius: 9, border: { width: 0, color: '#FF7A00' } },
                        needleTail: { length: '20%', color: '#FF9200' },
                        color: '#FF9200',
                        animation: {
                            enable: true
                        }
                    }
                ]
            }, {
                lineStyle: { width: 3, color: 'url(#bordercolor)' },
                startAngle: 0,
                endAngle: 0,
                radius: '90%',
                labelStyle: {
                    font: { size: '0px', color: 'blue' }
                }, majorTicks: {
                    height: 0,
                }, minorTicks: {
                    height: 0,
                }, pointers: [],
                annotations: [{
                    zIndex: '1', angle: 270,
                    radius: '100%'
                }, {
                    zIndex: '1', angle: 90,
                    radius: '110%'
                }, {
                    zIndex: '1', angle: 90,
                    radius: '110%'
                }, {
                    zIndex: '1', angle: 180,
                    radius: '40%', content: '0 KM/H'
                }]
            }
        ],
        load: (args: ILoadedEventArgs) => {
            let width: number = args.gauge.element.offsetWidth;
            let height: number = args.gauge.element.offsetHeight;
            if (width < 700) {
                gauge1StartAngle = 310; gauge1EndAngle = 50;
                gauge2StartAngle = 10; gauge2EndAngle = 90;
                gauge3StartAngle = 270; gauge3EndAngle = 350;
                gauge1Interval = 2; gauge1FontSize = '10px';
                gauge1Radius = '70%'; subGauge1Radius = '85%';
                subGauge2Radius = '65%'; centerX = '50%';
                centerY = '30%'; cloudAngle = 300;
                annotationContent = '<div style="font-size: 8px;"><span>RPM X 1000</span></div>';
                annotationAngle = 180; fuelRadius = '-25%';
                annotationRadius = '10';
                tickWidth = 2; tickHeight = 8;
                gauge1LineWidth = 0;
                args.gauge.axes[1].annotations[0].radius = '110%';
                args.gauge.axes[1].annotations[0].angle = 180;
                args.gauge.axes[1].annotations[1].radius = '20%';
                args.gauge.axes[1].annotations[1].angle = 40;
                args.gauge.axes[1].annotations[2].radius = '20%';
                args.gauge.axes[1].annotations[2].angle = 320;
                args.gauge.axes[1].annotations[0].content = '<div id="rpm" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
                args.gauge.axes[1].annotations[1].content = '<div id="fuel" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
                args.gauge.axes[1].annotations[2].content = '<div id="battery" style="width:' + 200 + 'px;height:' + 200 + 'px;"></div>';
            } else {
                width = (width / 3) + 25;
                args.gauge.axes[1].annotations[0].content =
                    '<div id="rpm" style="width:' + width + 'px;height:' + width + 'px;"></div>';
                args.gauge.axes[1].annotations[1].content =
                    '<div id="fuel" style="width:' + width + 'px;height:' + width + 'px;"></div>';
                args.gauge.axes[1].annotations[2].content =
                    '<div id="battery" style="width:' + width + 'px;height:' + width + 'px;"></div>';
            }
        },
        resized: (args: IResizeEventArgs) => {
            location.reload();
        }
    });
    return gauge;
}

export function gauge1(): CircularGauge {

    let gauge: CircularGauge = new CircularGauge({
        centerX: centerX,
        centerY: centerY,
        axes: [
            {
                annotations: [
                    {
                        content: annotationContent,
                        angle: annotationAngle,
                        radius: annotationRadius
                    }
                ],
                lineStyle: {
                    width: 3,
                    color: 'url(#bordercolor)'
                },
                startAngle: gauge1StartAngle,
                endAngle: gauge1EndAngle,
                labelStyle: {
                    font: {
                        size: gauge1FontSize,
                        fontFamily: 'Roboto',
                        fontWeight: 'Medium',
                        color: '#231F20'
                    }
                }, majorTicks: {
                    width: 3, height: 10, color: '#565656', interval: gauge1Interval
                }, minorTicks: {
                    width: 2, height: 5, color: '#565656'
                },
                minimum: 0,
                maximum: 6,
                radius: gauge1Radius,
                pointers: [{
                    color: '#FF7A00',
                    cap: { radius: 5, color: 'FF7A00', border: { color: '#FF7A00', width: 0 } },
                    radius: '60%',
                    pointerWidth: 5,
                    value: 1,
                    animation: { duration: 0 }
                }]
            }, {
                lineStyle: {
                    width: gauge1LineWidth,
                    color: 'url(#bordercolor)'
                },
                radius: '90%',
                pointers: [],
                labelStyle: { font: { size: '0px' } },
                majorTicks: {
                    height: 0
                }, minorTicks: {
                    height: 0
                }, startAngle: 156, endAngle: 24
            }
        ]
    });
    return gauge;
}

export function gauge2(): CircularGauge {

    let gauge: CircularGauge = new CircularGauge({
        axes: [
            {
                lineStyle: {
                    width: tickWidth === 2 ? 0 : 3,
                    color: '#565656'
                },
                startAngle: gauge2StartAngle,
                endAngle: gauge2EndAngle,
                labelStyle: {
                    useRangeColor: true,
                    font: {
                        fontFamily: 'Roboto',
                        fontWeight: 'Medium',
                        color: '#231F20'
                    }
                }, majorTicks: {
                    width: tickWidth === 2 ? tickWidth : 5,
                    height: tickHeight === 8 ? tickHeight : 15,
                    interval: 40,
                    useRangeColor: true
                }, minorTicks: {
                    height: tickHeight,
                    width: tickWidth,
                    useRangeColor: true,
                    interval: 10
                },
                minimum: 70,
                maximum: 110,
                radius: subGauge2Radius,
                ranges: [{
                    start: 70,
                    end: 70,
                    color: '#F03E3E',
                    startWidth: 0, endWidth: 0
                }, {
                    start: 71,
                    end: 109,
                    color: '#565656',
                    startWidth: 0, endWidth: 0
                }, {
                    start: 110,
                    end: 110,
                    color: 'green',
                    startWidth: 0, endWidth: 0
                }],
                pointers: [{
                    color: '#757575',
                    type: 'Marker',
                    cap: { radius: 5, color: 'white', border: { color: 'Teal', width: 2 } },
                    markerShape: 'Triangle',
                    markerWidth: 10,
                    markerHeight: 10,
                    radius: '90%',
                    pointerWidth: 5,
                    value: 90,
                    animation: { duration: 500 }
                }],
                annotations: [{
                    radius: fuelRadius,
                    content: '#fuelContent',
                    angle: 180
                }]
            }
        ],
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            args.text = args.value === 70 ? 'F' : 'E';
        }
    });
    return gauge;
}
export function gauge3(): CircularGauge {

    let gauge: CircularGauge = new CircularGauge({
        axes: [
            {
                lineStyle: {
                    width: tickWidth === 2 ? 0 : 3,
                    color: '#565656'
                },
                startAngle: gauge3StartAngle,
                endAngle: gauge3EndAngle,
                labelStyle: {
                    useRangeColor: true,
                    font: {
                        fontFamily: 'Roboto',
                        fontWeight: 'Medium',
                        color: '#231F20'
                    }
                }, majorTicks: {
                    width: tickWidth,
                    height: tickHeight,
                    interval: 40,
                    useRangeColor: true
                }, minorTicks: {
                    height: tickHeight - 3,
                    width: tickWidth,
                    useRangeColor: true,
                    interval: 10
                },
                minimum: 70,
                maximum: 110,
                radius: subGauge1Radius,
                ranges: [{
                    start: 70,
                    end: 70,
                    color: '#F03E3E',
                    startWidth: 0, endWidth: 0
                }, {
                    start: 71,
                    end: 109,
                    color: '#565656',
                    startWidth: 0, endWidth: 0
                }, {
                    start: 110,
                    end: 110,
                    color: 'green',
                    startWidth: 0, endWidth: 0
                }],
                pointers: [{
                    color: '#757575',
                    type: 'Marker',
                    cap: { radius: 5, color: 'white', border: { color: 'Teal', width: 2 } },
                    markerShape: 'Triangle',
                    markerWidth: 10,
                    markerHeight: 10,
                    radius: '90%',
                    pointerWidth: 5,
                    value: 90,
                    animation: { duration: 500 }
                }],
                annotations: [{
                    radius: '50%',
                    content: '#tool',
                    angle: cloudAngle
                }]
            }, {
                lineStyle: {
                    width: gauge1LineWidth,
                    color: 'url(#bordercolor)'
                },
                pointers: [],
                radius: '90%',
                labelStyle: { font: { size: '0px' } },
                majorTicks: {
                    height: 0
                }, minorTicks: {
                    height: 0
                }, startAngle: 333, endAngle: 207
            }
        ],
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            args.text = args.value === 70 ? 'C' : 'H';
        }
    });
    return gauge;
}