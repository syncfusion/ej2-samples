import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import {
    Schedule, Day, Week, WorkWeek, Month, Agenda,
    ICalendarExport, ICalendarImport, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';


Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, ICalendarExport, ICalendarImport, Resize, DragAndDrop);

/**
 * Schedule ICS Export and Import sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'],
        selectedDate: new Date(2019, 0, 10),
        eventSettings: { dataSource: data },
    });
    scheduleObj.appendTo('#Schedule');

    let buttonObj: Button = new Button();
    buttonObj.appendTo('#ics-export');
    buttonObj.element.onclick = () => scheduleObj.exportToICalendar();

    // Initialize Uploder component for import
    let uploadObj: Uploader = new Uploader({
        allowedExtensions: '.ics',
        cssClass: 'calendar-import',
        buttons: { browse: 'Choose file' },
        multiple: false,
        showFileList: false,
        selected: (args: SelectedEventArgs) => scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0])
    });
    uploadObj.appendTo('#ics-import');
};
