import { loadCultureFiles } from '../common/culture-loader';
import { Grid, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { columnSpanData, ColumnSpanDataType } from './data-source';

/**
 * Grid Column spanning sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: columnSpanData,
            queryCellInfo: QueryCellEvent,
            gridLines: 'Both',
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', isPrimaryKey: true, textAlign: 'Right', width: 150 },
                { field: 'EmployeeName', headerText: 'Employee Name', width: 200 },
                { field: '9:00', headerText: '9.00 AM', width: 120 },
                { field: '9:30', headerText: '9.30 AM', width: 120 },
                { field: '10:00', headerText: '10.00 AM', width: 120 },
                { field: '10:30', headerText: '10.30 AM', width: 120 },
                { field: '11:00', headerText: '11.00 AM', width: 120 },
                { field: '11:30', headerText: '11.30 AM', width: 120 },
                { field: '12:00', headerText: '12.00 PM', width: 120 },
                { field: '12:30', headerText: '12.30 PM', width: 120 },
                { field: '2:30', headerText: '2.30 PM', width: 120 },
                { field: '3:00', headerText: '3.00 PM', width: 120 },
                { field: '3:30', headerText: '3.30 PM', width: 120 },
                { field: '4:00', headerText: '4.00 PM', width: 120 },
                { field: '4:30', headerText: '4.30 PM', width: 120 },
                { field: '5:00', headerText: '5.00 PM', width: 120 }
            ],
            width: 'auto',
            height: 'auto',
            allowTextWrap: true,
        });
    grid.appendTo('#Grid');
};

function QueryCellEvent(args: QueryCellInfoEventArgs): void {
    let data: ColumnSpanDataType = args.data as ColumnSpanDataType;
    switch (data.EmployeeID) {
        case 10001:
            if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:30') {
                args.colSpan = 2;
            } else if (args.column.field === '11:00') {
                args.colSpan = 3;
            }
            break;
        case 10002:
            if (args.column.field === '9:30' || args.column.field === '2:30' ||
                args.column.field === '4:30') {
                args.colSpan = 3;
            } else if (args.column.field === '11:00') {
                args.colSpan = 4;
            }
            break;
        case 10003:
            if (args.column.field === '9:00' || args.column.field === '11:30') {
                args.colSpan = 3;
            } else if (args.column.field === '10:30' || args.column.field === '3:30' ||
                args.column.field === '4:30' || args.column.field === '2:30') {
                args.colSpan = 2;
            }
            break;
        case 10004:
            if (args.column.field === '9:00') {
                args.colSpan = 3;
            } else if (args.column.field === '11:00') {
                args.colSpan = 4;
            } else if (args.column.field === '4:00' || args.column.field === '2:30') {
                args.colSpan = 2;
            }
            break;
        case 10005:
            if (args.column.field === '9:00') {
                args.colSpan = 4;
            } else if (args.column.field === '11:30') {
                args.colSpan = 3;
            } else if (args.column.field === '3:30' || args.column.field === '4:30' || args.column.field === '2:30') {
                args.colSpan = 2;
            }
            break;
        case 10006:
            if (args.column.field === '9:00' || args.column.field === '4:30' ||
                args.column.field === '2:30' || args.column.field === '3:30') {
                args.colSpan = 2;
            } else if (args.column.field === '10:00' || args.column.field === '11:30') {
                args.colSpan = 3;
            }
            break;
        case 10007:
            if (args.column.field === '9:00' || args.column.field === '3:00' || args.column.field === '10:30') {
                args.colSpan = 2;
            } else if (args.column.field === '11:30' || args.column.field === '4:00') {
                args.colSpan = 3;
            }
            break;
        case 10008:
            if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '2:30') {
                args.colSpan = 3;
            } else if (args.column.field === '4:00') {
                args.colSpan = 2;
            }
            break;
        default:
            extendQueryCellEvent(args, data.EmployeeID);
    }
}

function extendQueryCellEvent(args: QueryCellInfoEventArgs, value: number): void {
    switch (value) {
        case 10009:
            if (args.column.field === '9:00' || args.column.field === '11:30') {
                args.colSpan = 3;
            } else if (args.column.field === '4:30' || args.column.field === '2:30') {
                args.colSpan = 2;
            }
            break;
        case 100010:
            if (args.column.field === '9:00' || args.column.field === '2:30' ||
                args.column.field === '4:00' || args.column.field === '11:30') {
                args.colSpan = 3;
            } else if (args.column.field === '10:30') {
                args.colSpan = 2;
            }
            break;
    }
}
