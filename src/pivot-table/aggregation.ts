import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, SummaryTypes, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
import * as rData from './pivot-data/rData.json';
enableRipple(false);
PivotView.Inject(FieldList);

/**
 * PivotView Aggregation Sample.
 */

/* tslint:disable */
let data: IDataSet[] = (rData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            expandAll: false,
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' },
                { name: 'Quarter', caption: 'Quarter Year' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Units (GWh)' },
                { name: 'ProCost', caption: 'Cost (MM)' }
            ],
            filters: []
        },
        load: (): void => {
            groupDate();
        },
        showFieldList: true,
        width: '100%',
        height: 290,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let balanceDropDown: DropDownList = new DropDownList({
        placeholder: 'Cost',
        floatLabelType: 'Auto',
        change: (args: ChangeEventArgs) => {
            setSummaryType('ProCost', args.value as SummaryTypes);
        }
    });
    balanceDropDown.appendTo('#pricedrpdwn');

    let summaryDropDown: DropDownList = new DropDownList({
        placeholder: 'Units',
        floatLabelType: 'Auto',
        change: (args: ChangeEventArgs) => {
            setSummaryType('PowUnits', args.value as SummaryTypes);
        }
    });
    summaryDropDown.appendTo('#freightdrpdwn');

    function setSummaryType(fieldName: string, summaryType: SummaryTypes): void {
        let isAvail: boolean = false;
        for (let vCnt: number = 0; vCnt < pivotObj.dataSourceSettings.values.length; vCnt++) {
            if (pivotObj.dataSourceSettings.values[vCnt].name === fieldName) {
                pivotObj.dataSourceSettings.values[vCnt].type = summaryType;
                isAvail = true;
            }
        }
        if (isAvail) {
            pivotObj.updateDataSource();
        }
    }

    function groupDate(): void {
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
        pivotObj.dataSourceSettings.dataSource = data;
    }
};
