import { LinearGauge, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
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

    let gauge1: LinearGauge = new LinearGauge({
        title: 'Default axis',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            pointers: [{
                width: 0,
            }],
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
    gauge1.appendTo('#gauge1');

    let gauge2: LinearGauge = new LinearGauge({
        height: '350px',
        width:'150px',
        title: 'Edge style',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },   
        background:'transparent',     
        container: {
            width: 20,
            roundedCornerRadius: 10,
            type: 'RoundedRectangle',
            border: { width: 1 }
        },
        axes: [{
            line: {
                width: 0
            },
            pointers: [{
                width: 0,
            }],
            majorTicks: {
                interval: 20, height: 7, width: 1
            },
            minorTicks: {
                interval: 10, height: 3
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { font: { fontFamily: 'inherit' }, useRangeColor: true }
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
    gauge2.appendTo('#gauge2');

    let gauge3: LinearGauge = new LinearGauge({
        height: '350px',
        width:'150px',
        title: 'Range color for axis',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        axes: [{
            line: {
                width: 0
            },
            pointers: [
                {
                    width: 0,
                }
            ],
            ranges: [{
                start: 0,
                end: 30,
                color: '#F45656',
                startWidth: 5, endWidth: 5,
                offset: -5
            }, {
                start: 30,
                end: 60,
                color: '#FFC93E',
                startWidth: 5, endWidth: 5,
                offset: -5
            }, {
                start: 60,
                end: 100,
                color: '#0DC9AB',
                startWidth: 5, endWidth: 5,
                offset: -5
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
            labelStyle: { useRangeColor: true, font: { fontFamily: 'inherit' } }
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
    gauge3.appendTo('#gauge3');

    let gauge4: LinearGauge = new LinearGauge({
        height: '350px',
        width:'150px',
        title: 'Inversed axis',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
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
            pointers: [
                {
                    width: 0
                }
            ],

            minimum: 0,
            maximum: 100,
            isInversed: true,
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
    gauge4.appendTo('#gauge4');

    let gauge5: LinearGauge = new LinearGauge({
        height: '350px',
        width:'150px',
        title: 'Opposed axis',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        axes: [{
            line: {
                width: 5
            },
            majorTicks: {
                interval: 20,
                height: 7,
                width: 1,
                position: 'Outside'
            },
            minorTicks: {
                interval: 10,
                height: 3,
                position: 'Outside'
            },
            labelStyle: {
                position: 'Outside',
                font: { fontFamily: 'inherit' }
            },
            pointers: [
                {
                    width: 0
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
    gauge5.appendTo('#gauge5');
};