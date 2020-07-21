import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, IDataOptions } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { enableRipple, isNullOrUndefined } from '@syncfusion/ej2-base';
import { csvdata } from './pivot-data/csvData';
import * as localData from './pivot-data/rData.json';
enableRipple(false);
/**
 * PivotView sample for Local data source.
 */
/* tslint:disable */
let data: IDataSet[] = (localData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();

    let jsonReport: IDataOptions = {
        dataSource: groupDate(data),
        type: 'JSON',
        expandAll: false,
        enableSorting: true,
        formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
        drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
        rows: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'HalfYear', caption: 'Half Year' },
            { name: 'Quarter', caption: 'Quarter' }
        ],
        columns: [
            { name: 'EnerType', caption: 'Energy Type' },
            { name: 'EneSource', caption: 'Energy Source' }
        ],
        values: [
            { name: 'PowUnits', caption: 'Units (GWh)' },
            { name: 'ProCost', caption: 'Cost (MM)' }
        ],
        filters: []
    };

    let csvReport: IDataOptions = {
        type: 'CSV',
        expandAll: false,
        enableSorting: true,
        formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
        drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
        rows: [
            { name: 'Region' },
            { name: 'Country' }
        ],
        columns: [
            { name: 'Item Type' },
            { name: 'Sales Channel' }
        ],
        values: [
            { name: 'Total Cost' },
            { name: 'Total Revenue' },
            { name: 'Total Profit' }
        ],
        filters: []
    };
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: jsonReport,
        height: 290,
        width: '100%',
        gridSettings: { columnWidth: 120 }
    });
    pivotObj.appendTo('#PivotView1');

    let contentDropDown: DropDownList = new DropDownList({
        placeholder: 'Content Type',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'JSON') {
                pivotObj.dataSourceSettings = jsonReport;
            } else if (args.value === 'CSV') {
                csvReport.dataSource = getCSVData();
                pivotObj.dataSourceSettings = csvReport;
            }
        }
    });
    contentDropDown.appendTo('#contenttype');

    function getCSVData(): string[][] {
        let dataSource: string[][] = [];
        let jsonObject: string[] = csvdata.split(/\r?\n|\r/);
        for (let i: number = 0; i < jsonObject.length; i++) {
            if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== '') {
                dataSource.push(jsonObject[i].split(','));
            }
        }
        return dataSource;
    }

    function groupDate(data: IDataSet[]): IDataSet[] {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        return data;
    }
};
