import { LinearGauge, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    document.getElementById('horizontal').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = '450px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = '150px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
        }
    };
    document.getElementById('vertical').onclick = (e: Event) => {
        document.getElementById('container1').className = document.getElementById('container2').className =
        document.getElementById('container3').className = document.getElementById('container4').className = "col-xs-5 col-sm-5 col-lg-3 col-md-3";
        gauge1.width = gauge2.width = gauge3.width = gauge4.width = '200px';
        gauge1.height = gauge2.height = gauge3.height = gauge4.height = '350px';
        gauge1.orientation = gauge2.orientation = gauge3.orientation = gauge4.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
        }
    };

    let gauge1: LinearGauge = new LinearGauge({
        title: 'Outside ticks',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499',
            size: '15px'
        },
        width:'150px',
        height:'350px',
        background:'transparent',
        axes: [{
            line: {
                width: 5
            },
            ranges: [{
                color: '#C4C7C5',
            }],
            pointers: [{
                width: 0,
            }],
            majorTicks: {
                interval: 20, height: 7, width: 1, position: 'Outside'
            },
            minorTicks: {
                interval: 10, height: 3, position: 'Outside'
            },
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }
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
        title: 'Cross ticks',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499',
            size: '15px'
        },
        background:'transparent',
        width:'150px',
        height:'350px',
        axes: [{
            ranges: [{
                color: '#C4C7C5',
            }],
            line: {
                width: 5
            },
            pointers: [{
                width: 0,
            }],
            majorTicks: {
                interval: 20, height: 7, width: 1, position: 'Cross'
            },
            minorTicks: {
                interval: 10, height: 3, position: 'Cross'
            },
            minimum: 0,
            maximum: 100,
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
    gauge2.appendTo('#gauge2');

    let gauge3: LinearGauge = new LinearGauge({
        title: 'Inside ticks',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499',
            size: '15px'
        },
        background:'transparent',
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            ranges: [{
                color: '#C4C7C5',
            }],
            pointers: [
                {
                    width: 0,
                }
            ],
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            isInversed: true,
            majorTicks: {
                interval: 20, height: 7, width: 1, position: 'Inside'
            },
            minorTicks: {
                interval: 10, height: 3, position: 'Inside'
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
    gauge3.appendTo('#gauge3');

    let gauge4: LinearGauge = new LinearGauge({
        title: 'Ticks with offset',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499',
            size: '15px'
        },
        background:'transparent',
        width:'150px',
        height:'350px',
        axes: [{
            line: {
                width: 5
            },
            ranges: [{
                color: '#C4C7C5',
            }],
            majorTicks: {
                interval: 20,
                height: 7,
                width: 1,
                position: 'Inside',
                offset: 10
            },
            minorTicks: {
                interval: 10,
                height: 3,
                position: 'Inside',
                offset: 10
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
};
