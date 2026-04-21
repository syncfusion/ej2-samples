import { loadCultureFiles } from '../common/culture-loader';
import { Sankey, SankeyHighlight, SankeyLegend, SankeyLoadedEventArgs, SankeyTooltip, SankeyExport } from '@syncfusion/ej2-charts';
import { loadSankeyChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2/base';

Sankey.Inject(SankeyHighlight, SankeyLegend, SankeyTooltip, SankeyExport);

/**
 * Sample demonstrating vertical Sankey chart
 * showing U.S. greenhouse gas emissions by economic sector (2022 data, MMT CO₂e)
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const nodes = [
        { id: 'Transportation' },
        { id: 'Industry' },
        { id: 'Commercial' },
        { id: 'Residential' },
        { id: 'Agriculture' },
        { id: 'Road (Cars/Trucks)' },
        { id: 'Aviation & Other Transport' },
        { id: 'Direct Emissions' },
        { id: 'Indirect Electricity Use' },
        { id: 'Atmosphere (Gross Emissions)' }
    ];

    const links = [
        { sourceId: 'Transportation', targetId: 'Road (Cars/Trucks)', value: 1482 },
        { sourceId: 'Transportation', targetId: 'Aviation & Other Transport', value: 326 },
        { sourceId: 'Industry', targetId: 'Direct Emissions', value: 1416 },
        { sourceId: 'Industry', targetId: 'Indirect Electricity Use', value: 457 },
        { sourceId: 'Commercial', targetId: 'Indirect Electricity Use', value: 600 },
        { sourceId: 'Residential', targetId: 'Indirect Electricity Use', value: 500 },
        { sourceId: 'Agriculture', targetId: 'Direct Emissions', value: 664 },
        { sourceId: 'Road (Cars/Trucks)', targetId: 'Atmosphere (Gross Emissions)', value: 1482 },
        { sourceId: 'Aviation & Other Transport', targetId: 'Atmosphere (Gross Emissions)', value: 326 },
        { sourceId: 'Direct Emissions', targetId: 'Atmosphere (Gross Emissions)', value: 2080 },
        { sourceId: 'Indirect Electricity Use', targetId: 'Atmosphere (Gross Emissions)', value: 1557 }
    ];

    const sankey: Sankey = new Sankey({
        width: '90%',
        height: '650px',
        title: Browser.isDevice ? 'U.S. Greenhouse Gas Emissions' : 'U.S. Greenhouse Gas Emissions by Economic Sector (2022)',
        subTitle: 'Source: EPA 2022 GHG Inventory',
        orientation: 'Vertical',
        nodes: nodes,
        links: links,
        linkStyle: {
            opacity: 0.5,
            curvature: 0.55,
            colorType: 'Source'
        },
        nodeStyle: {
            width: 30,
            padding: 8,
            opacity: 1
        },
        labelSettings: {
            visible: Browser.isDevice ? false : true
        },
        tooltip: {
            enable: true,
            nodeTemplate: '${name}: ${value} MMT CO₂e',
            linkTemplate:Browser.isDevice ? '${start.name}: ${start.out} MMT CO₂e → <br/> ${target.name}: ${target.in} MMT CO₂e' : '${start.name}: ${start.out} MMT CO₂e → ${target.name}: ${target.in} MMT CO₂e',
        },
        legendSettings: Browser.isDevice ? { visible: false } : { visible: true, position: 'Right', margin: { left: 100 } },
        load: (args: SankeyLoadedEventArgs) => {
            loadSankeyChartTheme(args);
        }
    });

    sankey.appendTo('#sankey-orientation');
};