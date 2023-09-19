import { LinearGauge, ILoadEventArgs, LinearGaugeTheme, IPointerDragEventArgs, Gradient } from '@syncfusion/ej2-lineargauge';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let gauge1: LinearGauge = new LinearGauge({
        dragStart: function (args) {
            if (args.pointerIndex == 1) {
                gauge1.axes[0].pointers[0].animationDuration = 0;
                gauge1.axes[0].pointers[1].animationDuration = 0;
            }
        },
        dragEnd: function (args) {
            if (args.pointerIndex == 1) {
                gauge1.axes[0].pointers[0].animationDuration = 1500;
                gauge1.axes[0].pointers[1].animationDuration = 1500;
            }
        },
        dragMove(args: IPointerDragEventArgs): void {
            if (args.pointerIndex == 1) {
                gauge1.setPointerValue(0, 0, args.currentValue);
            }
        },
        title: 'Inverted triangle',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        height: '350px',
        width:'150px',
        background:'transparent',
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 5,
                value: 40,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                type: 'Bar',
                offset: 12,
                color: '#0074E3',
                animationDuration: 1500
            }, {
                width: 15,
                value: 40,
                height: 15,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Triangle',
                animationDuration: 1500
            }
            ],
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge1.appendTo('#gaugeTriangle');

    let gauge2: LinearGauge = new LinearGauge({
        dragStart: function (args) {
            if (args.pointerIndex == 1) {
                gauge2.axes[0].pointers[0].animationDuration = 0;
                gauge2.axes[0].pointers[1].animationDuration = 0;
            }
        },
        dragEnd: function (args) {
            if (args.pointerIndex == 1) {
                gauge2.axes[0].pointers[0].animationDuration = 1500;
                gauge2.axes[0].pointers[1].animationDuration = 1500;
            }
        },
        dragMove(args: IPointerDragEventArgs): void {
            if (args.pointerIndex == 1) {
                gauge2.setPointerValue(0, 0, args.currentValue);
            }
        },
        height: '350px',
        width:'150px',
        title: 'Circle',
        background:'transparent',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 5,
                value: 20,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                type: 'Bar',
                offset: 12,
                color: '#0074E3',
                animationDuration: 1500
            }, {
                width: 15,
                value: 20,
                height: 15,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Circle',
                animationDuration: 1500
            }
            ],
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge2.appendTo('#gaugeCircle');

    let gauge3: LinearGauge = new LinearGauge({
        dragStart: function (args) {
            if (args.pointerIndex == 1) {
                gauge3.axes[0].pointers[0].animationDuration = 0;
                gauge3.axes[0].pointers[1].animationDuration = 0;
            }
        },
        dragEnd: function (args) {
            if (args.pointerIndex == 1) {
                gauge3.axes[0].pointers[0].animationDuration = 1500;
                gauge3.axes[0].pointers[1].animationDuration = 1500;
            }
        },
        dragMove(args: IPointerDragEventArgs): void {
            if (args.pointerIndex == 1) {
                gauge3.setPointerValue(0, 0, args.currentValue);
            }
        },
        height: '350px',
        width:'150px',
        title: 'Diamond',
        background:'transparent',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 5,
                value: 50,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                type: 'Bar',
                offset: 12,
                color: '#0074E3',
                animationDuration: 1500
            }, {
                width: 15,
                value: 50,
                height: 15,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Diamond',
                animationDuration: 1500
            }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            labelStyle: { font: { fontFamily: 'inherit' } }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge3.appendTo('#gaugeDiamond');

    let gauge4: LinearGauge = new LinearGauge({
        dragStart: function (args) {
            if (args.pointerIndex == 1) {
                gauge4.axes[0].pointers[0].animationDuration = 0;
                gauge4.axes[0].pointers[1].animationDuration = 0;
            }
        },
        dragEnd: function (args) {
            if (args.pointerIndex == 1) {
                gauge4.axes[0].pointers[0].animationDuration = 1500;
                gauge4.axes[0].pointers[1].animationDuration = 1500;
            }
        },
        dragMove(args: IPointerDragEventArgs): void {
            if (args.pointerIndex == 1) {
                gauge4.setPointerValue(0, 0, args.currentValue);
            }
        },
        background:'transparent',
        height: '350px',
        width:'150px',
        title: 'Rectangle',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        axes: [{
            line: {
                width: 5
            },
            majorTicks: {
                interval: 20,
                height: 7,
                width: 1
            },
            minorTicks: {
                interval: 10,
                height: 3
            },
            labelStyle: {
                font: { fontFamily: 'inherit' }
            },
            pointers: [{
                width: 5,
                value: 30,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                type: 'Bar',
                offset: 12,
                color: '#0074E3',
                animationDuration: 1500
            }, {
                width: 15,
                value: 30,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Rectangle',
                animationDuration: 1500
            }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge4.appendTo('#gaugeRectangle');

    let gauge5: LinearGauge = new LinearGauge({
        dragStart: function (args) {
            if (args.pointerIndex == 1) {
                gauge5.axes[0].pointers[0].animationDuration = 0;
                gauge5.axes[0].pointers[1].animationDuration = 0;
            }
        },
        dragEnd: function (args) {
            if (args.pointerIndex == 1) {
                gauge5.axes[0].pointers[0].animationDuration = 1500;
                gauge5.axes[0].pointers[1].animationDuration = 1500;
            }
        },
        dragMove(args: IPointerDragEventArgs): void {
            if (args.pointerIndex == 1) {
                gauge5.setPointerValue(0, 0, args.currentValue);
            }
        },
        height: '350px',
        width:'150px',
        title: 'Multiple pointers',
        background:'transparent',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        axes: [{
            line: {
                width: 5
            },
            majorTicks: {
                interval: 20,
                height: 7,
                width: 1
            },
            minorTicks: {
                interval: 10,
                height: 3
            },
            labelStyle: {
                font: { fontFamily: 'inherit' }
            },
            pointers: [{
                width: 5,
                value: 10,
                height: 5,
                enableDrag: true,
                placement: 'Near',
                type: 'Bar',
                offset: 12,
                color: '#0074E3',
                animationDuration: 1500
            }, {
                width: 15,
                value: 10,
                height: 15,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Triangle',
                animationDuration: 1500
            }, {
                width: 15,
                value: 100,
                height: 15,
                enableDrag: true,
                placement: 'Near',
                markerType: 'Diamond',
                animationDuration: 1500
            }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge5.appendTo('#gaugeMultiple');

    document.getElementById('horizontal').onclick = (e: Event) => {
        document.getElementById('containerBox').style.padding = "0%";
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className =
        document.getElementById('container5').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = gauge5.width = '450px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = gauge5.height = '150px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = gauge5.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
        }
    };
    document.getElementById('vertical').onclick = (e: Event) => {
        document.getElementById('containerBox').style.padding = "4%";
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className =
        document.getElementById('container5').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = gauge5.width = '200px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = gauge5.height = '350px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = gauge5.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
        }
    };
}