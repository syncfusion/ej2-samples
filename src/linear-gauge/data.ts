/**
 * Thermometer linear gauge
 */
import { loadCultureFiles } from '../common/culture-loader';
import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
(window as any).default = (): void => {
    loadCultureFiles();
    let gauge1: LinearGauge = new LinearGauge(firstGauge(), '#container1');
    let gauge2: LinearGauge = new LinearGauge(secondGauge(), '#container2');
    let gauge3: LinearGauge = new LinearGauge(thirdGauge(), '#container3');
};
// code for linear gauge one
export function firstGauge(): LinearGauge {
    let gauge1: LinearGauge = new LinearGauge({
        // custom code start
        load: (args1: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args1.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (args1.gauge.theme.toLowerCase().indexOf('dark') > 1 || args1.gauge.theme.toLowerCase() === 'highcontrast') {
                args1.gauge.annotations[1].content = '<div id="running" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="src/linear-gauge/images/running1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Running</p></div>';
            }
        },
        // custom code end
        orientation: 'Horizontal',
        container: {
            width: 30,
            border: {
                width: 0
            },
            offset: 30
        },
        axes: [{
            line: {
                offset: 30
            },
            labelStyle: {
                offset: 50,
                font: {
                    fontFamily: 'Segoe UI'
                }
            },
            pointers: [{
                value: 10,
                placement: 'Near',
                offset: -60,
                height: 10,
                width: 10,
                markerType: 'Triangle'
            }],
            ranges: [
                {
                    start: 0,
                    end: 10,
                    startWidth: 30,
                    endWidth: 30,
                    color: '#30b32d'
                }
            ]
        }],
        annotations: [
            {
                content: '<div id="title" style="width:300px;"> <img style="float:left" src'
                    + '="src/linear-gauge/images/exercise-tracking.svg"/><p style="font-size:18px;color:#4285F4;' +
                    'float:left;margin-left:12px;margin-top:4px; font-family:Segoe UI;">Exercise Tracking </p></div>',
                axisIndex: 0, zIndex: '1',
                axisValue: 0,
                x: 150,
                y: -180
            },
            {
                content: '<div id="running" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge' +
                    '/images/running.svg" /></span><p style="float:left;margin-left:10px;font-family:Segoe UI;">Running</p></div>',
                axisIndex: 0, zIndex: '1',
                axisValue: 0,
                x: 50,
                y: -130
            },
            {
                content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px; font-family:Segoe UI;">10 MPH</p></div>',
                axisIndex: 0, zIndex: '1',
                axisValue: 10,
                y: -65
            }
        ]
    });
    return gauge1;
}
// code for linear gauge two
export function secondGauge(): LinearGauge {
    let gauge2: LinearGauge = new LinearGauge({
        load: (args2: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args2.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (args2.gauge.theme.toLowerCase().indexOf('dark') > 1 || args2.gauge.theme.toLowerCase() === 'highcontrast') {
                args2.gauge.annotations[0].content = '<div id="cycle" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="src/linear-gauge/images/cycling1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Cycling</p></div>';
            }
        },
        orientation: 'Horizontal',
        container: {
            width: 30,
            border: {
                width: 0
            },
            offset: -50
        },
        axes: [{
            line: {
                offset: 30
            },
            labelStyle: {
                offset: 50,
                font: {
                    fontFamily: 'Segoe UI'
                }
            },
            pointers: [{
                value: 28,
                height: 10,
                width: 10,
                placement: 'Near',
                offset: -60,
                markerType: 'Triangle'
            }],
            ranges: [
                {
                    start: 0,
                    end: 28,
                    startWidth: 30,
                    endWidth: 30,
                    color: '#30b32d'
                }
            ]
        }],
        annotations: [{
            content: '<div id="cycle" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge'
                + '/images/cycling.svg" /></span><p style="float:left;margin-left:10px; font-family:Segoe UI;">Cycling</p></div>',
            axisIndex: 0, zIndex: '1',
            axisValue: 0,
            x: 50,
            y: -110
        },
        {
            content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px; font-family:Segoe UI;">28 MPH</p></div>',
            axisIndex: 0,
            axisValue: 28, zIndex: '1',
            y: -70
        }]
    });
    return gauge2;
}
// code for linear gauge three
export function thirdGauge(): LinearGauge {
    let gauge3: LinearGauge = new LinearGauge({
        load: (args3: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args3.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (args3.gauge.theme.toLowerCase().indexOf('dark') > 1 || args3.gauge.theme.toLowerCase() === 'highcontrast') {
                args3.gauge.annotations[0].content = '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;' +
                    'float:left" src="src/linear-gauge/images/walking1.svg" /></span><p style="float:left;' +
                    'margin-left:10px;">Walking</p></div>';
            }
        },
        orientation: 'Horizontal',
        container: {
            width: 30,
            border: {
                width: 0
            },
            offset: -90
        },
        axes: [{
            maximum: 10,
            line: {
                offset: 30
            },
            labelStyle: {
                format: '{value}k',
                offset: 50,
                font: {
                    fontFamily: 'Segoe UI'
                }
            },
            pointers: [{
                value: 2,
                height: 10,
                width: 10,
                placement: 'Near',
                offset: -60,
                markerType: 'Triangle'
            }],
            ranges: [
                {
                    start: 0,
                    end: 2,
                    startWidth: 30,
                    endWidth: 30,
                    color: '#30b32d'
                }
            ]
        }],
        annotations: [{
            content: '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/' +
                'linear-gauge/images/walking.svg" /></span><p style="float:left;margin-left:10px; font-family:Segoe UI;">Walking</p></div>',
            axisIndex: 0,
            axisValue: 0, zIndex: '1',
            x: 50,
            y: -120
        },
        {
            content: '<div id="pointerText" style="width:100px;"><p style="font-size:15px;font-family:Segoe UI;">2000 Steps</p></div>',
            axisIndex: 0,
            axisValue: 2.2, zIndex: '1',
            y: -65
        }]
    });
    return gauge3;
}