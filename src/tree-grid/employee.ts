import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, ColumnModel, Page, Freeze, Sort, Filter } from '@syncfusion/ej2-treegrid';
import { employeeData } from './data-source';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';

/**
 * Employee Details TreeGrid sample
 */
TreeGrid.Inject(Page, Freeze, Sort, Filter);

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid;

    function getColumns(viewer: string): ColumnModel[] {
        let baseColumns: ColumnModel[] = [
            { field: 'ID', headerText: 'ID', width: 200, minWidth: 200, textAlign: 'Left', clipMode: 'EllipsisWithTooltip' },
            { field: 'Employee', template: '#employeeTemplate', headerTemplate: '#employeeHeaderTemplate', width: 320, clipMode: 'EllipsisWithTooltip' },
        ];

        switch (viewer) {
            case 'hr':
                return [
                    ...baseColumns,
                    { field: 'Location', template: '#flagTemplate', headerText: 'Location', width: 200, clipMode: 'EllipsisWithTooltip' },
                    { field: 'JoinDate', headerText: 'Date Joined', textAlign: 'Right', width: 185, format: { skeleton: 'yMd', type: 'date' }, clipMode: 'EllipsisWithTooltip' },
                    { field: 'Salary', headerText: 'Salary Per Month', format: 'c0', textAlign: 'Right', width: 210, clipMode: 'EllipsisWithTooltip' },
                    { field: 'Email', template: '#emailTemplate', headerText: 'Email', textAlign: 'Center', width: 200, clipMode: 'EllipsisWithTooltip' },
                ];
            case 'employee':
                return [
                    ...baseColumns,
                    {
                        field: 'Status',
                        template: (data: any) => {
                            const bgColor = data.Status === 'Available' ? '#ccffcc' : data.Status === 'Busy' ? '#ffd09d' : '#ffd7cc';
                            const color = data.Status === 'Available' ? '#00cc00' :  data.Status === 'Busy' ? '#ff8707': '#e60000';
                            return `
                            <div class="status-container" style="
                                display: inline-block;
                                background-color: ${bgColor};
                                color: ${color};
                                padding: 0 4px;
                                border-radius: 4px;
                                text-align: center;
                                font-size: 12px;
                            ">
                            ${data.Status}
                            </div>`;
                        },
                        headerText: 'Presence',
                        width: 200,
                        textAlign: 'Center',
                        clipMode: 'EllipsisWithTooltip'
                    },
                    { field: 'WorkMode', headerText: 'Work Mode', width: 230, clipMode: 'EllipsisWithTooltip' },
                    { field: 'Email', template: '#emailTemplate', headerText: 'Email', textAlign: 'Center', width: 200, clipMode: 'EllipsisWithTooltip' },
                ];
            case 'helpdesk':
                return [
                    ...baseColumns,
                      {
                        field: 'Status',
                        template: (data: any) => {
                            const bgColor = data.Status === 'Available' ? '#ccffcc' : data.Status === 'Busy' ? '#ffd09d' : '#ffd7cc';
                            const color = data.Status === 'Available' ? '#00cc00' :  data.Status === 'Busy' ? '#ff8707': '#e60000';
                            return `
                            <div class="status-container" style="
                                display: inline-block;
                                background-color: ${bgColor};
                                color: ${color};
                                padding: 0 4px;
                                border-radius: 4px;
                                text-align: center;
                                font-size: 12px;
                            ">
                            ${data.Status}
                            </div>`;
                        },
                        headerText: 'Presence',
                        width: 200,
                        textAlign: 'Center',
                        clipMode: 'EllipsisWithTooltip'
                    },
                    { field: 'LeaveAvailability', template: '#leaveAvailabilityTemplate', headerText: 'Leave Availability', textAlign: 'Center', width: 400, allowFiltering:false,clipMode: 'EllipsisWithTooltip' },
                    { field: 'LeaveCount', headerText: `Leave Taken in ${new Date().getFullYear()}`, textAlign: 'Center', width: 250, clipMode: 'EllipsisWithTooltip' },
                ];
            case 'pm':
                return [
                    ...baseColumns,
                    { field: 'Department', headerText: 'Department', width: 200, clipMode: 'EllipsisWithTooltip' },
                    { field: 'ProjectDetails', headerText: 'Project Details', width: 230, clipMode: 'EllipsisWithTooltip' },
                    { field: 'ProjectStatus', headerText: 'Project Status', width: 200, clipMode: 'EllipsisWithTooltip' },
                    { field: 'Email', template: '#emailTemplate', headerText: 'Email', textAlign: 'Center', width: 200, clipMode: 'EllipsisWithTooltip' },
                ];
            default:
                return baseColumns;
        }
    }

    function initTreeGrid(viewer: string) {
        if (treegrid) {
            treegrid.clearFiltering();
            treegrid.clearSorting();
            treegrid.columns = getColumns(viewer);
            treegrid.refreshColumns();
        } else {
            treegrid = new TreeGrid({
                dataSource: employeeData,
                childMapping: 'Children',
                treeColumnIndex: 0,
                columns: getColumns(viewer),
                height: 400,
                allowSorting: true,
                allowFiltering: true,
                filterSettings: {
                    type: 'Menu',
                    hierarchyMode: 'None',
                    mode: 'Immediate',
                },
                enableHover: true,
                gridLines: 'Both',
                pageSettings: { pageSize: 10 },
                queryCellInfo: queryCellInfo,
            });
            treegrid.appendTo('#EmployeeTreeGrid');
        }
    }

    document.getElementById('viewer').addEventListener('change', (e) => {
        const selectedRole = (e.target as HTMLSelectElement).value;
        initTreeGrid(selectedRole);
    });

    initTreeGrid('hr');

    const viewerRoles = [
        { id: 'hr', role: 'HR' },
        { id: 'employee', role: 'Employee' },
        { id: 'helpdesk', role: 'Help Desk' },
        { id: 'pm', role: 'Project Management' }
    ];

    const viewerDropdown: DropDownList = new DropDownList({
        dataSource: viewerRoles,
        fields: { text: 'role', value: 'id' },
        width: '200px',
        placeholder: 'Select Viewer Role',
        value: 'hr',
        change: (args) => {
            initTreeGrid(args.value as string);
        }
    });
    viewerDropdown.appendTo('#viewer');

    function queryCellInfo(args: QueryCellInfoEventArgs): void {
        if (args.column.field === 'LeaveAvailability') {
            const data = args.data as { LeaveAvailability: { casual: number, earned: number, sick: number } };
            const { casual, earned, sick } = data.LeaveAvailability;

            const casualEl = args.cell.querySelector('.bar.casual') as HTMLElement;
            const earnedEl = args.cell.querySelector('.bar.earned') as HTMLElement;
            const sickEl = args.cell.querySelector('.bar.sick') as HTMLElement;

            if (casualEl) updateBar(casualEl, casual);
            if (earnedEl) updateBar(earnedEl, earned);
            if (sickEl) updateBar(sickEl, sick);
        }
    }

    function updateBar(barEl: HTMLElement, value: number): void {
        const percent = (value / 12) * 100;

        barEl.innerHTML = `
            <div class="bar-fill" style="width:${percent}%;"></div>
            <div class="barlabel">${value}</div>
        `;

        const fillEl = barEl.querySelector('.bar-fill') as HTMLElement;
        fillEl.classList.remove('low', 'medium', 'high');

        if (value > 8) fillEl.classList.add('high');
        else if (value > 4) fillEl.classList.add('medium');
        else fillEl.classList.add('low');
    }
};