
import { PivotView, SummaryTypes, FieldList } from '@syncfusion/ej2-pivotview';
import { renewableEnergy } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
PivotView.Inject(FieldList);

/**
 * PivotView Aggregation Sample.
 */

this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            data: renewableEnergy,
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
        }, showFieldList: true,
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

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
        for (let vCnt: number = 0; vCnt < pivotGridObj.dataSource.values.length; vCnt++) {
            if (pivotGridObj.dataSource.values[vCnt].name === fieldName) {
                pivotGridObj.dataSource.values[vCnt].type = summaryType;
                isAvail = (<any>pivotGridObj.dataSource.values[vCnt]).properties ? false : true;
            }
        }
        if (isAvail) {
            pivotGridObj.updateDataSource();
        }
    }
};
