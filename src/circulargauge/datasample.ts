/**
 * Data sample
 */
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2, gauge3 } from './datasample-gauge';
import { Grid } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';

this.default = (): void => {
    let orderData: Object[] = [
        {
            'Country': 'Germany',
            'Sales': 500,
            'Target': 400,
            'vsTarget': 300
        }, {
            'Country': 'USA',
            'Sales': 1000,
            'Target': 600,
            'vsTarget': 360
        }, {
            'Country': 'UK',
            'Sales': 600,
            'Target': 700,
            'vsTarget': -100
        }
    ];
    let germany: CircularGauge = new CircularGauge(gauge1(), '#container1');
    let usa: CircularGauge = new CircularGauge(gauge2(), '#container2');
    let uk: CircularGauge = new CircularGauge(gauge3(), '#container3');
    let data: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(15));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            columns: [
                { field: 'Country', headerText: 'Country', width: 80 },
                { field: 'Sales', headerText: 'Sales $', width: 80 },
                { field: 'Target', headerText: 'Target $', width: 80 },
                { field: 'vsTarget', headerText: 'vs Target', width: 80 }
            ]
        });
    grid.appendTo('#container5');

    this.toolTipInterval1 = setInterval(
        (): void => {
            if (document.getElementById('container5')) {
                let value1: number = Math.round(Math.random() * (90 - 55) + 55);
                let value2: number = Math.round(Math.random() * (75 - 60) + 60);
                let value3: number = Math.round(Math.random() * (40 - 10) + 10);
                let gridData1: number = 4 * value1;
                let gridData2: number = 6 * value2;
                let gridData3: number = 7 * value3;
                let orderData: Object[] = [
                    {
                        'Country': 'Germany',
                        'Sales': 500,
                        'Target': 400,
                        'vsTarget': gridData1
                    }, {
                        'Country': 'USA',
                        'Sales': 1000,
                        'Target': 600,
                        'vsTarget': gridData2
                    }, {
                        'Country': 'UK',
                        'Sales': 600,
                        'Target': 700,
                        'vsTarget': -gridData3
                    }
                ];
                let data: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(3));

                grid.dataSource = data;
                grid.refresh();

                germany.axes[0].pointers[0].animation.enable = true;
                usa.axes[0].pointers[0].animation.enable = true;
                uk.axes[0].pointers[0].animation.enable = true;
                germany.setPointerValue(0, 0, value1);
                usa.setPointerValue(0, 0, value2);
                uk.setPointerValue(0, 0, value3);
                germany.setAnnotationValue(0, 0, '#germany');
                usa.setAnnotationValue(0, 0, '#usa');
                uk.setAnnotationValue(0, 0, '#uk');


            } else {
                clearInterval(this.toolTipInterval1);
            }
        },
        2000);
};
