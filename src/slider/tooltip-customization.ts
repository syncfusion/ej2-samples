import { loadCultureFiles } from '../common/culture-loader';
import { Slider, SliderTickEventArgs, SliderTooltipEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Ticks Customization sample
 */
let timeObj: any;
let outObj: any;

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    timeObj = new Slider({
        // Set slider minimum and maximum values
        // new Date(Year, Month, day, hours, minutes, seconds, millseconds)
        min: new Date(2013, 6, 13, 11).getTime(), max: new Date(2013, 6, 13, 23).getTime(),
        // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
        step: 3600000 / 6,
        // Set the initial range values for slider
        value: [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()],
        // Bind Tooltip change event for custom formatting
        tooltipChange: tooltipChangeHandler,
        // Initialize tooltip with placement
        tooltip: {
            placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
        },
        created: (args: any) => {
            timeObj.keyUp({ keyCode: 9, target: timeObj.secondHandle });
            timeObj.secondHandle.focus();
        },
        // Bind ticks event for custom formatting
        renderingTicks: renderingTicksHandler,
        // Initialize ticks with placement, largestep, smallstep
        ticks: {
            placement: 'After',
            // 3 * 3600000 milliseconds = 3 Hour
            largeStep: 3 * 3600000,
            smallStep: 3600000, showSmallTicks: true
        },
        // Set the type to render range slider
        type: 'Range'
    });
    timeObj.appendTo('#default');

    outObj = new Slider({
        // Set slider minimum and maximum values
        // new Date(Year, Month, day, hours, minutes, seconds, millseconds)
        min: new Date(2013, 6, 13, 11).getTime(), max: new Date(2013, 6, 13, 23).getTime(),
        // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
        step: 3600000 / 6,
        // Set the initial range values for slider
        value: new Date(2013, 6, 13, 17).getTime(),
        // Bind Tooltip change event for custom formatting
        tooltipChange: tooltipChangeHandler,
        // Initialize tooltip with placement
        tooltip: {
            placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
        },
        // Bind ticks event for custom formatting
        renderingTicks: renderingTicksHandler,
        // Initialize ticks with placement, largestep, smallstep
        ticks: {
            placement: 'After',
            // 3 * 3600000 milliseconds = 3 Hour
            largeStep: 3 * 3600000,
            smallStep: 3600000, showSmallTicks: true
        },
        // Set the type to render range slider
        type: 'MinRange'
    });
    outObj.appendTo('#out');

    function tooltipChangeHandler(args: SliderTooltipEventArgs): void {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf('-') !== -1) {
            let totalMiliSeconds: string[] = args.text.split(' ');
            // First part is the first handle value
            let firstPart: string = totalMiliSeconds[0];
            // Second part is the second handle value
            let secondPart: string = totalMiliSeconds[2];

            firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
            secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
            // Assigning our custom text to the tooltip value.
            args.text = firstPart + ' - ' + secondPart;
        } else {
            args.text = 'Until ' + new Date(Number(args.text)).toLocaleTimeString('en-us', custom);
        }
    }

    function renderingTicksHandler(args: SliderTickEventArgs): void {
        let totalMiliSeconds: number = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom: { [key: string]: string } = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    }

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }
    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        timeObj.refreshTooltip();
        outObj.refreshTooltip();
    }
};