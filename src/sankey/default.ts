import { loadCultureFiles } from '../common/culture-loader';
import { Sankey, SankeyHighlight, SankeyLegend, SankeyLoadedEventArgs, SankeyTooltip, SankeyExport } from '@syncfusion/ej2-charts';
import { loadSankeyChartTheme } from './theme-color';
import { Browser } from '@syncfusion/ej2/base';

Sankey.Inject(SankeyHighlight, SankeyLegend, SankeyTooltip, SankeyExport);

/**
 * Sample demonstrating default Sankey chart
 * showing California energy consumption flow in 2023 (TBtu)
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const nodes = [
        { id: 'Electricity Generation', offset: -120 },
        { id: 'Residential', offset: 38 },
        { id: 'Commercial', offset: 36 },
        { id: 'Industrial', offset: 34 },
        { id: 'Transportation', offset: 32 },
        { id: 'Rejected Energy', offset: -40 },
        { id: 'Energy Services' },
        { id: 'Solar' },
        { id: 'Nuclear' },
        { id: 'Wind' },
        { id: 'Geothermal' },
        { id: 'Natural Gas' },
        { id: 'Coal' },
        { id: 'Biomass' },
        { id: 'Petroleum', offset: -10 }
    ];

    const links = [
        { sourceId: 'Solar', targetId: 'Electricity Generation', value: 454 },
        { sourceId: 'Nuclear', targetId: 'Electricity Generation', value: 185 },
        { sourceId: 'Wind', targetId: 'Electricity Generation', value: 47.8 },
        { sourceId: 'Geothermal', targetId: 'Electricity Generation', value: 40 },
        { sourceId: 'Natural Gas', targetId: 'Electricity Generation', value: 800 },
        { sourceId: 'Coal', targetId: 'Electricity Generation', value: 28.7 },
        { sourceId: 'Biomass', targetId: 'Electricity Generation', value: 50 },
        { sourceId: 'Electricity Generation', targetId: 'Residential', value: 182 },
        { sourceId: 'Natural Gas', targetId: 'Residential', value: 400 },
        { sourceId: 'Petroleum', targetId: 'Residential', value: 50 },
        { sourceId: 'Electricity Generation', targetId: 'Commercial', value: 351 },
        { sourceId: 'Natural Gas', targetId: 'Commercial', value: 300 },
        { sourceId: 'Electricity Generation', targetId: 'Industrial', value: 641 },
        { sourceId: 'Natural Gas', targetId: 'Industrial', value: 786 },
        { sourceId: 'Biomass', targetId: 'Industrial', value: 563 },
        { sourceId: 'Petroleum', targetId: 'Industrial', value: 300 },
        { sourceId: 'Electricity Generation', targetId: 'Transportation', value: 20 },
        { sourceId: 'Natural Gas', targetId: 'Transportation', value: 51 },
        { sourceId: 'Biomass', targetId: 'Transportation', value: 71 },
        { sourceId: 'Petroleum', targetId: 'Transportation', value: 2486 },
        { sourceId: 'Residential', targetId: 'Rejected Energy', value: 432 },
        { sourceId: 'Commercial', targetId: 'Rejected Energy', value: 351 },
        { sourceId: 'Industrial', targetId: 'Rejected Energy', value: 972 },
        { sourceId: 'Transportation', targetId: 'Rejected Energy', value: 1920 },
        { sourceId: 'Residential', targetId: 'Energy Services', value: 200 },
        { sourceId: 'Commercial', targetId: 'Energy Services', value: 300 },
        { sourceId: 'Industrial', targetId: 'Energy Services', value: 755 },
        { sourceId: 'Transportation', targetId: 'Energy Services', value: 637 }
    ];

    const sankey: Sankey = new Sankey({
        width: '90%',
        height: Browser.isDevice ? '600px' : '450px',
        title: 'California Energy Consumption in 2023',
        subTitle: 'Source: Lawrence Livermore National Laboratory',
        nodes: nodes,
        links: links,
        linkStyle: {
            opacity: 0.6,
            curvature: 0.55,
            colorType: 'Source'
        },
        labelSettings: {
              visible: Browser.isDevice ? false : true
        },
        tooltip: {
            enable: true,
            nodeTemplate: '${name}: ${value} TBtu',
            linkTemplate: Browser.isDevice ? '${start.name}: ${start.out} TBtu → <br/> ${target.name}: ${target.in} TBtu' : '${start.name}: ${start.out} TBtu → ${target.name}: ${target.in} TBtu'
        },
        legendSettings: { 
            visible: true, 
            position: 'Bottom', 
            itemPadding: 8 
        },
        load: (args: SankeyLoadedEventArgs) => {
            loadSankeyChartTheme(args);
        }
    });

    sankey.appendTo('#sankey-container');
};