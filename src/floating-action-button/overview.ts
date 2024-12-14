import { loadCultureFiles } from '../common/culture-loader';
import { Fab } from "@syncfusion/ej2-buttons";
import { Grid, Edit } from '@syncfusion/ej2-grids';

(window as any).default = (): void => {
    loadCultureFiles();

    /**
     * Grid component rendered to add it as target for FAB.
     */
    Grid.Inject(Edit);
    let orders = [];

    for (let i = 1; i < 10; i++) {
        orders.push({
            "OrderID": 10589 + i, 
            "CustomerID": ["VINET", "TOMSP", "SUPRD", "CHOPS", "RICSU"][Math.floor(Math.random() * 5)],
            "Freight": (10.35 * i).toFixed(2), 
            "ShippingCountry": ["France", "Brazil", "Switzerland", "Germany"][Math.floor(Math.random() * 4)]
        });
    }

    let grid: Grid = new Grid(
        {
            dataSource: orders,
            editSettings: { allowAdding: true, mode: 'Dialog' },
        });
    grid.appendTo('#Grid');


    /**
     * FAB rendered with add icon and targeted to Grid component.
     */
    let fabObj: Fab = new Fab({
        iconCss: 'e-icons e-plus',
        target: '#target'
    })
    fabObj.appendTo('#fab')

    fabObj.element.onclick = () => {
        grid.addRecord();
    }

};
