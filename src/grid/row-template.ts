import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { pizzaData } from './data-source';
import { ChipList } from '@syncfusion/ej2/buttons';

Grid.Inject(Page, Selection);
/**
 * row template Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: pizzaData,
        rowTemplate: '#rowtemplate',
        height: 335,
        width: 'auto',
        columns: [
            { headerText: 'PIZZA MENU', headerTextAlign: 'Center', field: 'Title', customAttributes: { class: 'e-pizza-cell' } },
        ]
    });
    grid.appendTo('#Grid');

    (<{chiptags?: Function}>window).chiptags = (tags: string[]): any => {
        const chipElement: HTMLDivElement = document.createElement('div');
        const chipList: ChipList = new ChipList({ chips: tags, cssClass: 'e-outline' }, chipElement);
        return chipList.element.outerHTML;
    };

};
