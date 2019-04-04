import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, VirtualScroll } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView VirtualScrolling Sample.
 */
PivotView.Inject(VirtualScroll);

let customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
let city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
let date1: number;
let date2: number;
let isInit: boolean;
let dt: number = 0;
let data: Function = (count: number) => {
    let result: Object[] = [];
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
            Year: "FY " + (dt + 2013),
            CustomerName: customername[Math.round(Math.random() * customername.length)] || customername[0],
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 4 == 1) {
            dt = 0;
        }
    }
    return result;
};

(window as any).default = (): void => {
    loadCultureFiles();
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            data: [],
            enableSorting: false,
            expandAll: true,
            formatSettings: [{ name: 'Price', format: 'C0' }],
            rows: [{ name: 'ProductID' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }],
        },
        width: 860,
        height: 300,
        enableVirtualization: true,
        gridSettings: { columnWidth: 140 },
        dataBound: (args: any): void => {
            if (date1 && isInit) {
                date2 = new Date().getTime();
                document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
            }
            isInit = false;
            button.disabled = true;
            document.getElementById('popup').style.display = 'none';
        },
    });
    pivotGridObj.appendTo('#PivotView');

    let button: Button = new Button({ isPrimary: true, cssClass: 'e-info' });
    button.appendTo('#load');

    function show() {
        document.getElementById('popup').style.display = 'inline-block';
    }

    button.element.onclick = (): void => {
        show();
        isInit = true;
        pivotGridObj.dataSource.data = data(100000) as IDataSet[];
        date1 = new Date().getTime();
    };
};
