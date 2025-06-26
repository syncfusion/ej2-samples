import { loadCultureFiles } from '../common/culture-loader';
import { IDataSet, PivotView } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { DatePicker } from '@syncfusion/ej2/calendars';
import { Button } from '@syncfusion/ej2-buttons';
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2/data';
import * as pivotData from './pivot-data/dateFilterData.json';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView External Data filtering Sample.
 */

let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let startDate: Date = new Date('2024-01-01');
    let endDate: Date = new Date('2024-12-01');
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            dataSource: [],
            expandAll: true,
            columns: [
                { name: 'Country' },
                { name: 'Product' }
            ],
            rows: [
                { name: 'OrderDate' }
            ],
            values: [
                { name: 'Amount', caption: 'Total Sales' }
            ],
            drilledMembers: [{name: 'Country',items: ['Canada']}],
            formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'OrderDate', format: 'dd/MM/yyyy', type: 'date' }],
            filters: [],
            groupSettings:[{name: 'OrderDate', groupInterval: ['Years', 'Months']}]
        },
        width: '100%',
        height: 500,
        load: function () {
            applyDateFilter();
        },
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');

    let startDatepicker: DatePicker = new DatePicker({
        placeholder: "Choose a start date",
        min: new Date(2019, 0, 1),
        max: new Date(2024, 10, 31),
        value: startDate,
        width: 200,
        format: 'MMM yyyy',
        start: 'Year',
        depth: 'Year',
        change: function (args) {
            startDate = args.value as Date;
        }
    });
    startDatepicker.appendTo('#start-datepicker');

    let endDatepicker: DatePicker = new DatePicker({
        placeholder: "Choose an end date",
        min: new Date(2019, 1, 1),
        max: new Date(2024, 11, 31),
        value: endDate,
        width: 200,
        format: 'MMM yyyy',
        start: 'Year',
        depth: 'Year',
        change: function (args) {
            endDate = args.value as Date;
        }
    });
    endDatepicker.appendTo('#end-datepicker');

    let applyBtn: Button = new Button({
        isPrimary: true,
    });
    applyBtn.appendTo('#apply');
    document.getElementById('apply').onclick = () => {
        applyDateFilter();
    };

    // Function to apply the date filtering
    function applyDateFilter() {
        if (startDate && endDate) {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            let pivotData = (Pivot_Data as any).map((item: any) => ({
                ...item,
                OrderDate: new Date(item.OrderDate),
            }));
            new DataManager({ json: pivotData, adaptor: new JsonAdaptor() }).executeQuery(
                new Query()
                    .where('OrderDate', 'greaterthanorequal', startDate)
                    .where('OrderDate', 'lessthanorequal', endDate)
            )
            .then((e) => {
                pivotObj.dataSourceSettings.dataSource = (e as any).result;
            });
        }
    };
};
