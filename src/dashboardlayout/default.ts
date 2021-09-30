import { loadCultureFiles } from '../common/culture-loader';
import { DashboardLayout, PanelModel } from '@syncfusion/ej2-layouts';

/**
 *  Sample for default functionalities
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dashboard: DashboardLayout = new DashboardLayout({
        cellSpacing: [10, 10],
        allowResizing: true,
        columns: 4,
    });
    dashboard.appendTo('#defaultLayout');
    let count: number = 8;
    document.getElementById('add').onclick = () => {
        let panel: PanelModel[] = [{
            'id': count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
            content: '<span id="close" class="e-template-icon e-clear-icon"></span><div class="text-align">' + count.toString() + '</div>'
        }];
        count = count + 1;
        dashboard.addPanel(panel[0]);
    };
    function onCloseIconHandler(): void {
        if ((<HTMLElement>event.target).closest('.e-panel')) {
            dashboard.removePanel((<HTMLElement>event.target).closest('.e-panel').id);
        }

    }
    let closeElement: any = document.querySelectorAll('.e-clear-icon');
    for (let i: number = 0; i < closeElement.length; i++) {
        closeElement[i].addEventListener('click', onCloseIconHandler);
    }
};
