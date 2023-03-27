import { DashboardLayout, PanelModel } from '@syncfusion/ej2-layouts';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';


/**
 *  Sample for properties
 */
(window as any).default = (): void => {
    let dashboardObject: DashboardLayout = new DashboardLayout({
        allowResizing: true,
        cellSpacing: [10, 10],
        columns: 6,
        panels: [{
            'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
            header: '<div>Panel 1</div>', content: '<div></div>'
        },
        {
            'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2,
            header: '<div>Panel 2</div>', content: '<div></div>'
        },
        {
            'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4,
            header: '<div>Panel 3</div>', content: '<div></div>'
        },
        {
            'sizeX': 4, 'sizeY': 2, 'row': 2, 'col': 0,
            header: '<div>Panel 4</div>', content: '<div></div>'
        },
        {
            'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 4,
            header: '<div>Panel 5</div>', content: '<div></div>'
        }]
    });
    dashboardObject.appendTo('#dynamicLayout');
    let cellspacing: NumericTextBox = new NumericTextBox({
        placeholder: 'Ex: 10',
        floatLabelType: 'Never',
        change: valueChange,
        value: 10,
        min: 1,
        max: 20
    });
    cellspacing.appendTo('#cellspacing');
    let floatObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    floatObj.appendTo('#floating');
    let pushObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    pushObj.appendTo('#pushing');
    let resizeObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    resizeObj.appendTo('#resizing');
    function valueChange(args: any): void {
        dashboardObject.cellSpacing = [parseInt(args.value, 10), parseInt(args.value, 10)];
    }
    function onChange(args: any): void {
        let targetElement = args.event.target;
        let previousElement = targetElement.previousElementSibling;
        let nextElement = targetElement.nextElementSibling;
        if ((previousElement !== null && previousElement.id === 'floating') || nextElement !== null && nextElement.previousElementSibling.id === 'floating') {
            dashboardObject.allowFloating = args.checked;
         }
         if ((previousElement !== null && previousElement.id === 'resizing') || nextElement !== null && nextElement.previousElementSibling.id === 'resizing') {
            dashboardObject.allowResizing = args.checked;
         }
    }

    document.getElementById('remove').onclick = () => {
        if (dashboardObject.panels.length > 0) {
            for (let i: number = dashboardObject.panels.length - 1; i < dashboardObject.panels.length; i++) {
                dashboardObject.removePanel(dashboardObject.panels[dashboardObject.panels.length - 1 - i].id);
            }
        }
    };
    let count: number = 5;
    document.getElementById('add').onclick = () => {
        count = count + 1;
        let panel: PanelModel[] = [{
            'id': count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
            header: '<div>Panel ' + count.toString() + '</div>', content: '<div></div>'
        }];
        dashboardObject.addPanel(panel[0]);
    };
};
