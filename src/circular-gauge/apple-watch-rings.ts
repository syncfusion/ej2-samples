import { CircularGauge, Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge1: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        },
        width: '400px',
        height: '400px',
        background:'transparent',
        axes: [{
            annotations: [{
                description:'The Gauge is indicated with a red arrow',
                angle: 8, radius: '80%', zIndex: '1',
                content: '<div id="annotation1"><img style="width:22px;height:22px;" alt="Red arrow" src="src/circular-gauge/images/image1.svg" /></div>'
            }, {
                description:'The Gauge is indicated with a green arrow',
                angle: 11, radius: '58%', zIndex: '1',
                content: '<div id="annotation2"><img style="width:20px;height:20px;" alt="Green arrow" src="src/circular-gauge/images/image2.svg" /></div>'
            }, {
                description:'The Gauge is indicated with a blue arrow',
                angle: 16, radius: '36%', zIndex: '1',
                content: '<div id="annotation3"><img style="width:22px;height:22px;" alt="Blue arrow" src="src/circular-gauge/images/image3.svg" /></div>'
            }],
            startAngle: 0, endAngle: 360,
            lineStyle: { width: 0 },
            labelStyle: {
                position: 'Inside', useRangeColor: true,
                format:'Red {value} %',
                font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
            }, majorTicks: { height: 0, }, minorTicks: { height: 0 },
            minimum: 0, maximum: 100,
            ranges: [{
                start: 0, end: 100,
                radius: '90%',
                startWidth: 40, endWidth: 40,
                color: '#fa114f', opacity: 0.2
            },
            {
                start: 0, end: 100,
                radius: '68%',
                startWidth: 40, endWidth: 40,
                color: '#99ff01', opacity: 0.2
            },
            {
                start: 0, end: 100,
                radius: '46%',
                startWidth: 40, endWidth: 40,
                color: '#00d8fe', opacity: 0.2
            }],
            pointers: [{
                roundedCornerRadius: 25,
                description:'RangeBar pointer value :65',
                value: 65,
                type: 'RangeBar',
                radius: '90%',
                color: '#fa114f',
                animation: { enable: true },
                pointerWidth: 40
            },
            {
                roundedCornerRadius: 25,
                value: 43,
                description:'RangeBar pointer value :43',
                type: 'RangeBar',
                radius: '68%',
                color: '#99ff01',
                animation: { enable: true },
                pointerWidth: 40
            },
            {
                roundedCornerRadius: 25,
                value: 58,
                description:'RangeBar pointer value: 58',
                type: 'RangeBar',
                radius: '46%',
                color: '#00d8fe',
                animation: { enable: true },
                pointerWidth: 40
            }]
        }]
    });
    circulargauge1.appendTo('#gauge1');

    let circulargauge2: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            if (selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) {
                args.gauge.axes[0].annotations[0].content =
                    '<div class="annotation4"><img alt="Arrow placed within the small red gauge" style="width:17px;height:17px;" src="src/circular-gauge/images/image4.svg" /></div>';
            }
            // custom code end
        },
        height: '65px',
        width: '65px',
        axes: [{
            annotations: [{
                description:'The small gauge is indicated with a red arrow',
                angle: 0, radius: '0%', zIndex: '1',
                content: '<div class="annotation4"><img style="width:17px;height:17px;margin-top: 2px;margin-left: 2px;" alt="Arrow placed within the small red gauge" src="src/circular-gauge/images/image1.svg" /></div>'
            }],
            startAngle: 0, endAngle: 360,
            lineStyle: { width: 0 },
            labelStyle: {
                format:'red {value}',
                position: 'Inside', useRangeColor: true,
                font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
            },
            majorTicks: { height: 0, }, minorTicks: { height: 0 },
            minimum: 0, maximum: 100,
            ranges: [{
                start: 0, end: 100,
                radius: '100%',
                startWidth: 8, endWidth: 8,
                color: '#fa114f', opacity: 0.2
            }],
            pointers: [{
                roundedCornerRadius: 5,
                description:'RangeBar pointer value:65',
                value: 65,
                type: 'RangeBar',
                radius: '100%',
                color: '#fa114f',
                animation: { enable: true },
                pointerWidth: 8
            }]
        }]
    });
    circulargauge2.appendTo('#gauge2');

    let circulargauge3: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            if (selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) {
                args.gauge.axes[0].annotations[0].content =
                    '<div class="annotation5"><img alt="Arrow placed within the small green gauge" style="width:15px;height:15px;" src="src/circular-gauge/images/image5.svg" /></div>';
            }
            // custom code end
        },
        height: '65px',
        width: '65px',
        axes: [{
            annotations: [{
                description:'The small gauge is indicated with a green arrow',
                angle: 0, radius: '0%', zIndex: '1',
                content: '<div class="annotation5"><img alt="Arrow placed within the small green gauge" style="width:15px;height:15px;margin-top: 3px;margin-left: 1px;" src="src/circular-gauge/images/image2.svg" /></div>'
            }],
            startAngle: 0, endAngle: 360,
            lineStyle: { width: 0 },
            labelStyle: {
                format:'green {value}',
                position: 'Inside', useRangeColor: true,
                font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
            },
            majorTicks: { height: 0, }, minorTicks: { height: 0 },
            minimum: 0, maximum: 100,
            ranges: [{
                start: 0, end: 100,
                radius: '100%',
                startWidth: 8, endWidth: 8,
                color: '#99ff01', opacity: 0.2
            }],
            pointers: [{
                roundedCornerRadius: 5,
                description:'RangeBar pointer value : 43',
                value: 43,
                type: 'RangeBar',
                radius: '100%',
                color: '#99ff01',
                animation: { enable: true },
                pointerWidth: 8
            }]
        }]
    });
    circulargauge3.appendTo('#gauge3');

    let circulargauge4: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            if (selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) {
                args.gauge.axes[0].annotations[0].content =
                    '<div class="annotation6"><img alt="Arrow placed within the small blue gauge" style="width:17px;height:17px;" src="src/circular-gauge/images/image6.svg" /></div>';
            }
            // custom code end
        },
        height: '65px',
        width: '65px',
        axes: [{
            annotations: [{
                description:'The small gauge is indicated with a blue arrow',
                angle: 0, radius: '0%', zIndex: '1',
                content: '<div class="annotation6"><img alt="Arrow placed within the small blue gauge" style="width:17px;height:17px;" src="src/circular-gauge/images/image3.svg" /></div>'
            }],
            startAngle: 0, endAngle: 360,
            lineStyle: { width: 0 },
            labelStyle: {
                format:'blue {value}',
                position: 'Inside', useRangeColor: true,
                font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
            },
            majorTicks: { height: 0, }, minorTicks: { height: 0 },
            minimum: 0, maximum: 100,
            ranges: [{
                start: 0, end: 100,
                radius: '100%',
                startWidth: 8, endWidth: 8,
                color: '#00d8fe', opacity: 0.2
            }],
            pointers: [{
                roundedCornerRadius: 5,
                description:'RangeBar pointer value : 58',
                value: 58,
                type: 'RangeBar',
                radius: '100%',
                color: '#00d8fe',
                animation: { enable: true },
                pointerWidth: 8
            }]
        }]
    });
    circulargauge4.appendTo('#gauge4');
};