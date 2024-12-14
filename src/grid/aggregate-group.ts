import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Aggregate, Group, Sort, Filter } from '@syncfusion/ej2-grids';
import { energyData } from './data-source';

Grid.Inject(Page, Group, Aggregate, Sort, Filter);
/**
 * Aggregates
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: energyData, 
            allowSorting: true,
            allowMultiSorting:true,
            allowFiltering: true,
            allowGrouping:true,
            gridLines:'Vertical',
            enableHover: false,
            groupSettings:{columns:["ConsumptionCategory"],showGroupedColumn:true,showDropArea:false},
            filterSettings: { type: 'Excel' },
            height:300,
            columns: [
                { field: 'ID', headerText: 'ID', textAlign: 'Right', isPrimaryKey: true, visible: false },
                { field: 'Month', headerText: 'Month', textAlign: 'Right', clipMode:'EllipsisWithTooltip', width: 120, format: 'yMd', type:'date' },
                { headerText: 'Category', field: 'ConsumptionCategory', width: 130, clipMode:'EllipsisWithTooltip' },
                { headerTemplate: "#energyTemplate", textAlign: 'Center', columns: [
                        { field: 'EnergyConsumed', headerText: 'Consumed', width: 150, textAlign: 'Right', clipMode:'EllipsisWithTooltip' },
                        { field: 'EnergyProduced', headerText: 'Produced', width: 300, textAlign: 'Right' },
                    ] },
                { field: 'WeatherCondition', headerText: 'Weather', width: 120, clipMode:'EllipsisWithTooltip' },
                { field: 'EnergyPrice', headerText: 'Price ($)', format: 'C2', width: 130, clipMode:'EllipsisWithTooltip', textAlign: 'Right' },
            ],
            aggregates: [{
                columns: [{
                        type: 'Sum',
                        field: 'EnergyProduced',
                        format: 'N2',
                        footerTemplate: 'Total Energy Produced: ${Sum} KWh'
                    }]
            },
            {
                columns: [{
                        type: 'Sum',
                        field: 'EnergyProduced',
                        format: 'N2',
                        groupFooterTemplate: 'Total Energy Produced: ${Sum} KWh'
                    }]
            },
            {
                columns: [{
                        type: 'Average',
                        field: 'EnergyProduced',
                        format: 'N2',
                        footerTemplate: 'Average Energy Produced: ${Average} KWh'
                    }]
            },
            {
                columns: [{
                        type: ["Min","Max"],
                        field: 'EnergyProduced',
                        format: 'N2',
                        groupCaptionTemplate: '<div class="e-grid-group-caption-temp"><span class="e-minimum">Min: ${Min}</span><span>||</span> <span class="e-maximum"> Max : ${Max}</span></div> '
                    }]
            }
        ],
    });
    grid.appendTo('#group-aggregate-grid');
};

