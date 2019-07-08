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
        columns: 5,
    });
    dashboard.appendTo('#defaultLayout');
    let count: number = 8;
    document.getElementById('add').onclick = () => {
        let panel: PanelModel[] = [{
            'id': count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
            content: '<span id="close" class="e-template-icon e-clear-icon"></span><div class="text-align">' + count.toString() + '</div>'
        }];
        dashboard.addPanel(panel[0]);
        let closeIcon: HTMLElement = document.getElementById(count.toString() + '_layout').querySelector('.e-clear-icon');
        closeIcon.addEventListener('click', onCloseIconHandler);
        count = count + 1;
    };
    function onCloseIconHandler(event: any): void {
        if ((<HTMLElement>event.target).offsetParent) {
            dashboard.removePanel((<HTMLElement>event.target).offsetParent.id);
        }

    }
    let closeElement: any = document.querySelectorAll('.e-clear-icon');
    for (let i: number = 0; i < closeElement.length; i++) {
        closeElement[i].addEventListener('click', onCloseIconHandler);
    }
};
