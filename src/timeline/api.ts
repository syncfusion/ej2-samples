import { loadCultureFiles } from '../common/culture-loader';
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Switch } from '@syncfusion/ej2/buttons';


/**
 *  Sample for Timeline API
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const travelItenary = [
        { date: "May 13, 2024", details: "Flight Booking: Reserving airline tickets", icon: "sf-icon-onward" },
        { date: "June 20, 2024", details: "Hotel Accommodation: Booking lodging for the trip", icon: "sf-icon-accomodation" },
        { date: "July 2, 2024", details: "Excursion Plans: Organized visits to popular attractions", icon: "sf-icon-explore" },
        { date: "Aug 14, 2024", details: "Return Journey: Flight Confirmation", icon: "sf-icon-return" }
    ];

    const timelineItems: TimelineItemModel[] = travelItenary.map(({ date, details, icon }) => ({
        dotCss: icon,
        content: date,
        oppositeContent: details
    }));

    /* Timeline control */
    const apiTimeline: Timeline = new Timeline({
        items: timelineItems,
    });
    apiTimeline.appendTo('#timeline');

    /* Orientation Dropdown */
    let orientationList: DropDownList = new DropDownList({
        index: 1,
        popupHeight: '200px',
        change: () => {
            apiTimeline.orientation = (orientationList.value as string);
        }
    });
    orientationList.appendTo('#timeline-orientation');

    /* Alignment Dropdown */
    let alignmentList: DropDownList = new DropDownList({
        index: 1,
        popupHeight: '200px',
        change: () => {
            apiTimeline.align = (alignmentList.value as string);
        }
    });
    alignmentList.appendTo('#timeline-alignment');

    /* Opposite switch */
    const oppositeSwitch: Switch = new Switch({
        checked: true,
        change: (args) => { handleTogglers(args, 'oppositeContent') }
    });
    oppositeSwitch.appendTo('#opposite');

    /* Icon switch */
    const iconSwitch: Switch = new Switch({
        checked: true,
        change: (args) => { handleTogglers(args, 'dotCss') }
    });
    iconSwitch.appendTo('#icon');

    /* Reverse switch */
    const reverseSwitch: Switch = new Switch({
        checked: false,
        change: (args) => {
            apiTimeline.reverse = args.checked
        }
    });
    reverseSwitch.appendTo('#reverse');

    const handleTogglers = (args: any, prop: string) => {
        apiTimeline.items.forEach((item, index) => {
            item[prop] = args.checked ? timelineItems[index][prop] : "";
        });
    };
};
