import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Filter, Sort, Reorder } from '@syncfusion/ej2-treegrid';
import { countries } from './data-source';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { addClass } from '@syncfusion/ej2-base';

/**
 * TreeGrid Overview sample
 */
TreeGrid.Inject(Filter, Sort, Reorder);
(window as any).default = (): void => {
    loadCultureFiles();
    let treeGridObj: TreeGrid = new TreeGrid({
        dataSource: countries,
        childMapping: 'states',
        height: 400,
        allowReordering: true,
        allowFiltering: true,
        allowSorting: true,
        filterSettings: { type: 'Excel' },
        queryCellInfo: queryCellInfo,
        columns: [
            {
                field: 'name', headerText: 'Province', template: '#flagtemplate',
                filter: { type: 'Excel', itemTemplate: '#flagtemplate' }, width: 195
            },
            { field: 'population', headerText: 'Population (Million)', valueAccessor: populationValue, textAlign: 'Right', width: 188 },
            { field: 'gdp', headerText: 'GDP Rate %', template: '#gdptemplate', allowFiltering: false, width: 120 },
            {
                field: 'rating', headerText: 'Credit Rating', customAttributes: { class: 'ratingCircle' },
                template: '#ratingtemplate', width: 150
            },
            {
                field: 'unemployment', headerText: 'Unemployment Rate', allowFiltering: false,
                template: '#unemploymentTemplate', width: 170
            },
            { field: 'coordinates', headerText: 'Coordinates', allowSorting: false, template: '#locationtemplate', width: 220 },
            { field: 'area', headerText: 'Area', template: '#areatemplate', width: 140 },
            { field: 'timezone', headerText: 'Time Zone', template: '#timezonetemplate', width: 150 }
        ]
    });
    treeGridObj.appendTo('#TreeGrid');

    (<{utcZone?: Function}>window).utcZone = (data: any) => {
        let img: HTMLImageElement = document.createElement('img');
        img.src = 'src/tree-grid/images/__Normal.png';
        img.style.filter = "brightness(150%)";
        if (data.timezone.indexOf('-') !== -1) {
            img.className = 'negativeTimeZone';
        }
        return img.outerHTML;
     };

    function populationValue(field: string, data: Object): number {
        return data[field] / 1000000;
    }

    function queryCellInfo(args: QueryCellInfoEventArgs): void {
        if (args.column.field === 'gdp') {
            if (args.data[args.column.field] < 2) {
                args.cell.querySelector('.statustxt').classList.add('e-lowgdp');
                args.cell.querySelector('.statustemp').classList.add('e-lowgdp');
            }
        }
        if (args.column.field === 'rating') {
            if (args.column.field === 'rating') {
                for (let i: number = 0; i < args.data[args.column.field]; i++) {
                    args.cell.querySelectorAll('span')[i].classList.add('checked');
                }
            }
        }
        if (args.column.field === 'unemployment') {
            if (args.data[args.column.field] <= 4) {
                addClass([args.cell.querySelector('.bar')], ['progressdisable']);
            }
            (args.cell.querySelector('.bar')as HTMLElement).style.width = args.data[args.column.field] * 10 + '%';
            args.cell.querySelector('.barlabel').textContent = args.data[args.column.field] + '%';
        }
    }
};