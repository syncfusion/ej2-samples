import { loadCultureFiles } from '../common/culture-loader';
import { PivotView } from '@syncfusion/ej2-pivotview';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView Default Sample.
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let customerName: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
        'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
    let city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
        'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
    let date1: number;
    let date2: number;
    let isInit: boolean = true;
    function data(count: number): any {
        let result: Object[] = [];
        let dt: number = 0;
        for (let i: number = 1; i < (count + 1); i++) {
            dt++;
            let round: string;
            let toString: string = i.toString();
            if (toString.length === 1) {
                round = '0000' + (i);
            }
            else if (toString.length === 2) {
                round = '000' + i;
            }
            else if (toString.length === 3) {
                round = '00' + i;
            } else if (toString.length === 4) {
                round = '0' + i;
            } else {
                round = toString;
            }
            result.push({
                ProductID: 'PRO-' + round,
                City: city[Math.round(Math.random() * city.length)] || city[0],
                Year: "FY " + (dt + 2021),
                CustomerName: customerName[Math.round(Math.random() * customerName.length)] || customerName[0],
                Price: Math.round(Math.random() * 5000) + 5000,
                Sold: Math.round(Math.random() * 80) + 10,
            });
            if (dt / 4 == 1) {
                dt = 0;
            }
        }
        return result;
    };
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            dataSource: data(10000),
            enableSorting: false,
            expandAll: true,
            formatSettings: [{ name: 'Price', format: 'C0' }],
            rows: [{ name: 'ProductID' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }],
        },
        width: '100%',
        height: 300,
        enableVirtualization: true,
        gridSettings: { columnWidth: 120 },
        dataBound: function () {
            if (this.dataSourceSettings.dataSource.length > 0) {
                if (date1 && isInit) {
                    date2 = new Date().getTime();
                    document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
                }
                isInit = false;
            }
            if (Browser.isDevice && pivotObj && pivotObj.enableRtl) {
                document.querySelector('.control-section').classList.add('e-rtl');
            }
        },
        load: function () {
            if (isInit) {
                date1 = new Date().getTime();
            }
        }
    });
    pivotObj.appendTo('#PivotView');
    let listObj: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select a Data Range',
        popupHeight: '240px',
        width: '240px',
        change: function (args: ChangeEventArgs) {
            (<any>listObj).closePopup();
            isInit = true;
            pivotObj.dataSourceSettings.dataSource = data(Number(args.value));
            date1 = new Date().getTime();
        }
    });
    listObj.appendTo('#ddl');
};
