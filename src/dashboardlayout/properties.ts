import { DashboardLayout, PanelModel } from '@syncfusion/ej2-layouts';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';


/**
 *  Sample for properties
 */
(window as any).default = (): void => {
    let dashboardObject: DashboardLayout = new DashboardLayout({
        allowResizing: true,
        cellSpacing: [10, 10],
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
    let cellspacing: TextBox = new TextBox({
        placeholder: 'Ex: 10',
        floatLabelType: 'Never',
        change: valueChange,
        type: 'number',
        value: '10',
    });
    cellspacing.appendTo('#cellspacing');
    let floatObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    floatObj.appendTo('#floating');
    let pushObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    pushObj.appendTo('#pushing');
    let resizeObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    resizeObj.appendTo('#resizing');
    function valueChange(args: any): void {
        if (args.event.currentTarget.id === 'cellspacing') {
            dashboardObject.cellSpacing = [parseInt(this.element.value, 10), parseInt(this.element.value, 10)];
        }
    }
    function onChange(args: any): void {
        if (args.event.currentTarget.id === 'floating') {
            if (args.checked) {
                dashboardObject.allowFloating = true;
            } else {
                dashboardObject.allowFloating = false;
            }
        }
        if (args.event.currentTarget.id === 'resizing') {
            if (args.checked) {
                dashboardObject.allowResizing = true;
            } else {
                dashboardObject.allowResizing = false;
            }
        }
    }

    document.getElementById('remove').onclick = () => {
        for (let i: number = dashboardObject.panels.length - 1; i < dashboardObject.panels.length; i++) {
            dashboardObject.removePanel(dashboardObject.panels[dashboardObject.panels.length - 1 - i].id);
        }
    };
    let count: number = 4;
    document.getElementById('add').onclick = () => {
        let panel: PanelModel[] = [{
            'id': count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
            header: '<div>Panel' + count.toString() + '</div>', content: '<div></div>'
        }];
        count = count + 1;
        dashboardObject.addPanel(panel[0]);
    };
};
