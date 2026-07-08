import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection } from '@syncfusion/ej2-gantt';
import { baselineTemplateData } from './data-source';

/**
 * Baseline Template Gantt sample
 */

Gantt.Inject(Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    
    let ganttChart: Gantt = new Gantt({
        dataSource: baselineTemplateData,
        allowSorting: true,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            baselineStartDate: 'BaselineStartDate',
            baselineEndDate: 'BaselineEndDate',
            dependency: 'Predecessor',
            child: 'subtasks'
        },
        baselineTemplate: baselineTemplate,     
        splitterSettings: {
            columnIndex: 3,
        },
        tooltipSettings: {
            showTooltip: false,
        },
        allowSelection: true,
        renderBaseline: true,
        rowHeight: 60,
        taskbarHeight: 20,
        gridLines: "Both",
        showColumnMenu: false,
        highlightWeekends: true,
        timelineSettings: {
            topTier: {
                unit: 'Month',
                format: 'MMMM yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            }
        },
        columns: [
            { field: 'TaskID', headerText: 'ID', textAlign: 'Left' },
            { field: 'TaskName', width: '270px', headerText: 'Name' },
            { field: 'BaselineStartDate', headerText: 'Baseline Start Date', width:'180px' },
            { field: 'BaselineDuration',headerText: 'Baseline Duration', width:'180px' },
            { field: 'BaselineStartDate1', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline1 Start Date', width:'180px' },
            { field: 'BaselineDuration1', headerText: 'Baseline1 Duration', width:'180px' },
            { field: 'BaselineStartDate2', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline2 Start Date', width:'180px' },
            { field: 'BaselineDuration2', headerText: 'Baseline2 Duration', width:'180px' }
        ],
        labelSettings: {
            rightLabel: 'TaskName'
        },
        height: '550px',
        allowUnscheduledTasks: true,
        projectStartDate: new Date('05/01/2024'),
        projectEndDate: new Date('05/30/2024')
    });
    ganttChart.appendTo('#BaselineTemplate');
    
    function baselineTemplate(props: any): string {
        if (props.hasChildRecords || (props.data && props.data.hasChildRecords)) {
            return '';
        }

        const g = props.taskData;
        const gp = g.ganttProperties;

        const chart = ganttChart.chartRowsModule;

        const baselineTop = chart.baselineTop;
        const baselineHeight = chart.baselineHeight;
        const taskBarHeight = chart.taskBarHeight;
        const milestoneHeight = chart.milestoneHeight;
        const milestoneMarginTop = chart.milestoneMarginTop;

        const rowHeight = ganttChart.rowHeight;
        const renderBaseline = ganttChart.renderBaseline;
        const enableRtl = ganttChart.enableRtl;

        const gap = 9;
        const baselineGap = 4; // spacing between baselines

        function getLeft(date: any): number {
            return ganttChart.dataOperation.getTaskLeft(
                new Date(date),
                false,
                gp.calendarContext
            );
        }

        function getWidth(start: any, duration: number): number {
            if (!start || duration == null || duration === 0) return 0;

            // ✅ ADD CALENDAR DAYS (NOT WORKING DAYS)
            const end = new Date(start);
            end.setDate(end.getDate() + duration);

            const leftStart = ganttChart.dataOperation.getTaskLeft(
                new Date(start),
                false,
                gp.calendarContext
            );

            const leftEnd = ganttChart.dataOperation.getTaskLeft(
                end,
                false,
                gp.calendarContext
            );

            return leftEnd - leftStart;
        }

        function render(start: any, duration: number, index: number): string {
            if (!start) return '';

            const left = getLeft(start);
            const width = getWidth(start, duration);

            // ✅ ===== MILESTONE BASELINE (EXACT ENGINE LOGIC) =====
            if (duration === 0) {
                const size = renderBaseline ? taskBarHeight : (taskBarHeight - 10);
                const baselineMilestoneHeight = renderBaseline ? 5 : 2;

                const leftPos = enableRtl
                    ? (left - (milestoneHeight / 2) + 3)
                    : (left - (milestoneHeight / 2) + 1);

                const marginTop =
                    (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight) +
                    2 +
                    (index * baselineGap); // ✅ shift per baseline

                return '<div class="e-baseline-gantt-milestone-container" style="position:absolute;' +
                    'width:' + size + 'px;' +
                    'height:' + size + 'px;' +
                    'transform:rotate(45deg);' +
                    (enableRtl ? 'right:' : 'left:') + leftPos + 'px;' +
                    'margin-top:' + marginTop + 'px;">' +
                    '</div>';
            }

            // ✅ ===== NORMAL BASELINE BAR =====
            return '<div class="e-baseline-bar" role="term" style="position:absolute;' +
                (enableRtl ? 'right:' : 'left:') + left + 'px;' +
                'margin-top:' + (baselineTop + (index * gap)) + 'px;' +
                'width:' + width + 'px;' +
                'height:' + baselineHeight + 'px;"></div>';
        }

        return (
            '<div class="custom-multi-baseline">' +
            render(g.taskData.BaselineStartDate, g.taskData.BaselineDuration, 0) +
            render(g.taskData.BaselineStartDate1, g.taskData.BaselineDuration1, 1) +
            render(g.taskData.BaselineStartDate2, g.taskData.BaselineDuration2, 2) +
            '</div>'
        );
    }
};
