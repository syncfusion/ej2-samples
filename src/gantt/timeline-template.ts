import { loadCultureFiles } from '../common/culture-loader';
import { Internationalization } from '@syncfusion/ej2-base';
import { Gantt,Selection} from '@syncfusion/ej2-gantt';
import { timelineTemplateData } from './data-source';

/**
 * Tasklabel Template Gantt sample
 */
Gantt.Inject(Selection);

// Create an Internationalization instance
const intlObj = new Internationalization();

(<{ weekDate?: Function }>window).weekDate = (dateString: any) => {
    const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    const date = gantt.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
    return intlObj.formatDate(date, { skeleton: 'E' });
};
(<{ formatDate?: Function }>window).formatDate = (dateString: any) => {
    const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    const date = gantt.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
    return intlObj.formatDate(date, { skeleton: 'd' });
};

(<{ imageString?: Function }>window).imageString = (date: Date) => {
    const gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    const imageDate = gantt.locale === 'ar' ? parseArabicDate(date) : parseDateString(date);
    return "src/gantt/images/"+ imageDate.getDay() +".svg" ;

};

function convertArabicNumeralsToWestern(arabicNumerals: any) {
    const arabicToWesternMap: { [key: string]: string }  = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
    return arabicNumerals.replace(/[\u0660-\u0669]/g, (match: string) => arabicToWesternMap[match]);
}

function parseArabicDate(arabicDateString: any) {
    // To convert the 'arabicDateString' Arabic Date to ISO Date format
    const normalizedDate = convertArabicNumeralsToWestern(arabicDateString);
    const parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function parseDateString(dateString: any) {
    // Check if the date string is in the format "DD.MM.YYYY"
    if (dateString.includes('.')) {
        var parts = dateString.split('.');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
        var year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    // Fallback to default date parsing
    return new Date(dateString);
}

(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: timelineTemplateData,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency:'Predecessor',
                child: 'subtasks'
            },
            splitterSettings: {
                columnIndex: 1
            },
            treeColumnIndex: 1,
            allowSelection: true,
            showColumnMenu: false,
            timelineSettings: {
                topTier: {
                    unit: 'Day',
                },
                timelineUnitSize: 200,
            },
            labelSettings: {
                leftLabel: 'TaskName',
                taskLabel: 'Progress'
            },
            columns: [
                { field: 'TaskID', headerText: 'Task ID' ,visible: false},
                { field: 'TaskName', headerText: 'Task Name', width: 300},
                { field: 'StartDate', headerText: 'Start Date'},
                { field: 'Duration', headerText: 'Duration'},
                { field: 'Progress', headerText: 'Progress'},
            ],
            height: '550px',
            allowUnscheduledTasks: true,
            projectStartDate: new Date('03/31/2024'),
            projectEndDate: new Date('04/23/2024'),
            timelineTemplate:"#TimelineTemplates"
        });
    gantt.appendTo('#Timeline');
};
