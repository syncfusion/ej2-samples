import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers, VirtualScroll } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Remote data Gantt sample
 */
Gantt.Inject(Selection, DayMarkers, VirtualScroll);
(window as any).default = (): void => {
    loadCultureFiles();
    let recordCount = '1000';
    let startLoadTime: Date;
    let endLoadTime: Date;
    let shouldCalculateLoadTime: boolean = true;
    const DLData = [
        { Text: '1,000 Rows', Value: '1000' },
        { Text: '2,500 Rows', Value: '2500' },
        { Text: '5,000 Rows', Value: '5000' }
    ];

    function loadGantt(count: string): DataManager {
        startLoadTime = new Date();
        return new DataManager({
            url: `https://services.syncfusion.com/js/production/api/GanttWebApiRemoteData?count=${count}`,
            adaptor: new WebApiAdaptor(),
            crossDomain: true
        });
    }
    const dropdown: DropDownList = new DropDownList({
        dataSource: DLData,
        fields: { text: 'Text', value: 'Value' },
        value: recordCount,
        change: (e: any) => {
            recordCount = e.value;
            shouldCalculateLoadTime = true;
            gantt.dataSource = loadGantt(recordCount);
        },
        placeholder: '1,000 Rows'
    });
    dropdown.appendTo('#rowDropdown');

    let gantt: Gantt = new Gantt(
        {
            dataSource: loadGantt(recordCount),
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            taskFields: {
                id: 'TaskId',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                parentID: 'ParentId',
                dependency: 'Predecessor'
            },
            columns: [
                { field: 'TaskId' },
                { field: 'TaskName', headerText: 'Project Activity', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate', headerText: 'Planned Start Date',width: 200 },
                { field: 'Duration', headerText: 'Duration' ,width: 160},
                { field: 'Progress', headerText: 'Completion (%)', width: 200 }
            ],
            splitterSettings:{
                columnIndex: 2
            },
            treeColumnIndex: 1,
            allowSelection: true,
            gridLines: 'Horizontal',
            enableVirtualization: true,
            enableTimelineVirtualization: true,
            highlightWeekends: true,
            timelineSettings: {
                timelineUnitSize: 50,
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                    format: 'dd'
                }
            },
            labelSettings: {
                rightLabel: 'TaskName',
                taskLabel: 'Progress'
            },
            includeWeekend: true,
            projectStartDate: new Date('12/29/2024'),
            projectEndDate: new Date('03/19/2025'),
            dataBound: () => {
                if (shouldCalculateLoadTime) {
                    endLoadTime = new Date();
                    if (startLoadTime && endLoadTime) {
                        const loadTime = (endLoadTime.getTime() - startLoadTime.getTime())/1000;
                        document.getElementById('loadTime')!.innerText = `${loadTime.toFixed(2)} sec`;
                    }
                    shouldCalculateLoadTime = false;
                }
            }
        }
    );
    gantt.appendTo('#RemoteData');
};

