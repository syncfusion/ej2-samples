import { loadCultureFiles } from '../common/culture-loader';
import { DashboardLayout, PanelModel } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import panelData from './panels-data';
/**
 *  Sample for Predefined Layout functionalities
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let panels: object = panelData;
    let headerCount: number = 1;
    let dashboardObject: DashboardLayout = new DashboardLayout({
        cellSpacing: [10, 10],
        columns: 6,
        panels: [{
            'sizeX': 4, 'sizeY': 3, 'row': 0, 'col': 0,
            header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
            content: '<div class="panel-content">Content Area</div>'
        },
        {
            'sizeX': 2, 'sizeY': 3, 'row': 0, 'col': 4,
            header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
            content: '<div class="panel-content">Content Area</div>'
        },
        {
            'sizeX': 6, 'sizeY': 2, 'row': 3, 'col': 0,
            header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
            content: '<div class="panel-content">Content Area</div>'
        }]
    });
    dashboardObject.appendTo('#dynamicLayout');

    let btnInstance: Button = new Button();
    btnInstance.appendTo('#reset');
    btnInstance.element.onclick = () => {
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        initializeTemplate(<HTMLElement>selectedElement[0]);
    };
    document.getElementById('template').onclick = (args: any) => {
        let target: any = args.target;
        let selectedElement: any = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        if ((<HTMLElement>target).className === 'image-pattern-style') {
            initializeTemplate(<HTMLElement>args.target);
        }
        (<HTMLElement>target).classList.add('e-selected-style');
    };
    function initializeTemplate(element: HTMLElement): void {
        let updatedpanels: PanelModel[] = [];
        let index: number = parseInt(element.getAttribute('data-id'), 10) - 1;
        let panel: any = Object.keys(panels[index]).map((panelIndex: string) => {
            return panels[index][panelIndex];
        });
        for (let i: number = 0; i < panel.length; i++) {
            let panelModelValue: PanelModel = {
                id: i.toString(),
                row: panel[i].row,
                col: panel[i].col,
                sizeX: panel[i].sizeX,
                sizeY: panel[i].sizeY,
                header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
                content: '<div class="panel-content">Content Area</div>'
            };
            updatedpanels.push(panelModelValue);
        }
        dashboardObject.panels = updatedpanels;
    }
};
