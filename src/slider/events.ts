import { loadCultureFiles } from '../common/culture-loader';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Default sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize Slider component
    let minRangeObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render minRange slider
        type: 'MinRange',
        // Initialize ticks with placement, largestep, smallstep
        ticks: { placement: 'Both', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Initialize tooltip with placement and showOn
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' },
        // create event for slider
        created: onCreated,
        // change event for slider
        change: onChange,
        // changed event for slider
        changed: onChanged
    });
    minRangeObj.appendTo('#minrange');
    //Clears the event log details
    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };
    //Handler for create event trace
    function onCreated(): void {
        appendElement('Slider control has been <b>created</b><hr>');
    }
    //Handler for change event trace
    function onChange(args: SliderChangeEventArgs): void {
        appendElement('Slider value is <b>changing</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Handler for changed event trace
    function onChanged(args: SliderChangeEventArgs): void {
        appendElement('Slider value has been <b>changed</b> from ' + args.previousValue + '  to  ' + args.value + '<hr>');
    }
    //Display event log
    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let slider: Slider[] = [minRangeObj];
        slider.forEach((slider: any) => {
            // Refreshing each slider tooltip object position
            slider.refreshTooltip();
        });
    }
};