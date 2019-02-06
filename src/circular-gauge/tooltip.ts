import { loadCultureFiles } from '../common/culture-loader';
/**
 * Tooltip sample
 */
import { CircularGauge, ITooltipRenderEventArgs, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { GaugeTooltip } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(GaugeTooltip);

(window as any).default = (): void => {
    loadCultureFiles();
    let circulargauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        title: 'Tooltip Customization',
        titleStyle: { size: '15px', color: 'grey' },
        axes: [{
            radius: '90%',
            minimum: 0,
            maximum: 120,
            startAngle: 240,
            endAngle: 120,
            lineStyle: { width: 0 },
            majorTicks: { color: 'white', offset: -5, height: 12 },
            minorTicks: { width: 0 },
            labelStyle: { useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Roboto' } },
            pointers: [{
                value: 70,
                radius: '60%',
                color: '#33BCBD',
                cap: { radius: 10, border: { color: '#33BCBD', width: 5 } },
                animation: { enable: true, duration: 1500 }
            }],
            ranges: [{
                start: 0,
                end: 50,
                startWidth: 10, endWidth: 10,
                radius: '102%',
                color: '#3A5DC8',
            }, {
                start: 50,
                end: 120,
                radius: '102%',
                startWidth: 10, endWidth: 10,
                color: '#33BCBD',
            }]
        }],
        tooltip: {
            enable: true,
            enableAnimation: false
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
           let imageName: string = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? 'range1' : 'range3');
           let borderColor: string = ((args.pointer.currentValue >= 0 && args.pointer.currentValue <= 50) ? '#3A5DC8' : '#33BCBD');
           args.tooltip.template = '<div id="templateWrap" style="border:2px solid ' + borderColor +
           '"><img src="src/circular-gauge/images/' + imageName + '.png"/><div class="des" style="color: ' +
           borderColor + '"><span>${value} MPH</span></div></div>';
        },
        enablePointerDrag: true
    });
    circulargauge.appendTo('#tooltip-container');
};
