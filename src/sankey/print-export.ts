import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Sankey, SankeyHighlight, SankeyLegend, SankeyLoadedEventArgs, SankeyTooltip, SankeyExport, ExportType } from '@syncfusion/ej2-charts';
import { loadSankeyChartTheme } from './theme-color';

Sankey.Inject(SankeyHighlight, SankeyLegend, SankeyTooltip, SankeyExport);

(window as any).default = (): void => {

    loadCultureFiles();

    const nodes = [
        { id: 'Books' },
        { id: 'Clothing' },
        { id: 'Electronics' },
        { id: 'Furniture' },
        { id: 'Jewelry' },
        { id: 'Toys' },
        { id: 'Air' },
        { id: 'Ground' },
        { id: 'Sea' },
        { id: 'Asia' },
        { id: 'Europe' },
        { id: 'North America' },
        { id: 'South America' },
        { id: 'Delayed' },
        { id: 'Delivered' },
        { id: 'In Transit' }
    ];

    const links = [
        { sourceId: 'Books', targetId: 'Air', value: 18 },
        { sourceId: 'Books', targetId: 'Ground', value: 12 },
        { sourceId: 'Clothing', targetId: 'Air', value: 25 },
        { sourceId: 'Clothing', targetId: 'Ground', value: 15 },
        { sourceId: 'Clothing', targetId: 'Sea', value: 20 },
        { sourceId: 'Electronics', targetId: 'Air', value: 35 },
        { sourceId: 'Electronics', targetId: 'Ground', value: 22 },
        { sourceId: 'Electronics', targetId: 'Sea', value: 18 },
        { sourceId: 'Furniture', targetId: 'Ground', value: 28 },
        { sourceId: 'Furniture', targetId: 'Sea', value: 25 },
        { sourceId: 'Jewelry', targetId: 'Air', value: 12 },
        { sourceId: 'Jewelry', targetId: 'Ground', value: 8 },
        { sourceId: 'Toys', targetId: 'Ground', value: 15 },
        { sourceId: 'Toys', targetId: 'Sea', value: 22 },
        { sourceId: 'Air', targetId: 'Asia', value: 40 },
        { sourceId: 'Air', targetId: 'Europe', value: 30 },
        { sourceId: 'Air', targetId: 'North America', value: 20 },
        { sourceId: 'Ground', targetId: 'Europe', value: 35 },
        { sourceId: 'Ground', targetId: 'North America', value: 30 },
        { sourceId: 'Ground', targetId: 'South America', value: 15 },
        { sourceId: 'Ground', targetId: 'Asia', value: 20 },
        { sourceId: 'Sea', targetId: 'Asia', value: 25 },
        { sourceId: 'Sea', targetId: 'Europe', value: 15 },
        { sourceId: 'Sea', targetId: 'North America', value: 30 },
        { sourceId: 'Sea', targetId: 'South America', value: 15 },
        { sourceId: 'Asia', targetId: 'Delayed', value: 35 },
        { sourceId: 'Asia', targetId: 'Delivered', value: 40 },
        { sourceId: 'Asia', targetId: 'In Transit', value: 10 },
        { sourceId: 'Europe', targetId: 'Delivered', value: 65 },
        { sourceId: 'Europe', targetId: 'In Transit', value: 15 },
        { sourceId: 'North America', targetId: 'Delivered', value: 50 },
        { sourceId: 'North America', targetId: 'In Transit', value: 30 },
        { sourceId: 'South America', targetId: 'Delayed', value: 10 },
        { sourceId: 'South America', targetId: 'In Transit', value: 20 }
    ];

    const sankey: Sankey = new Sankey({
        width: '100%',
        height: '450',
        title: 'Supply Chain Management',
        subTitle: 'Source: OECD‑ITF Global Freight Data',
        background: 'transparent',
        nodes: nodes,
        links: links,
        linkStyle: {
            opacity: 0.4,
            curvature: 0.5,
            colorType: 'Source'
        },
        labelSettings: {
            visible: Browser.isDevice ? false : true
        },
        tooltip: {
            enable: true,
            nodeTemplate: '${name}: ${value}k shipments',
            linkTemplate: '${start.name}: ${start.out}k → ${target.name}: ${target.in}k shipments'
        },
        legendSettings: { visible: Browser.isDevice ? false : true },
        load: (args: SankeyLoadedEventArgs) => {
            loadSankeyChartTheme(args);
        }
    });

    sankey.appendTo('#sankey-print-export');

    const panel = document.getElementById('exportPanel')!;
    const shell = document.getElementById('chartShell')!;
    const chartHost = document.getElementById('chartHost')!;

    const dropdown = new DropDownList({
        dataSource: ['JPEG', 'PNG', 'SVG', 'PDF'],
        value: 'JPEG',
        width: '100%'
    });

    dropdown.appendTo('#fileTypeDropdown');

    function togglePanel(open: boolean) {

        if (open) {
            panel.removeAttribute('inert');
            panel.setAttribute('aria-hidden', 'false');
        } else {
            if (panel.contains(document.activeElement)) {
                (document.getElementById('btnExport') as HTMLButtonElement)?.focus();
            }
            panel.setAttribute('inert', '');
            panel.setAttribute('aria-hidden', 'true');
        }
        panel.classList.toggle('open', open);
        shell.classList.toggle('with-panel', open);

        if (Browser.isDevice) {
            chartHost.style.display = open ? 'none' : '';
            shell.classList.toggle('mobile-panel-open', open);
        }
        setTimeout(() => {
            refreshChart();
        }, 250);
    }

    function refreshChart() {
        const animation = sankey.animation;
        animation.enable = false;
        sankey.refresh();
        animation.enable = true;
    }
    document.getElementById('btnExport')!.onclick = () => {
        togglePanel(true);
        setTimeout(() => {
            (document.getElementById('expFileName') as HTMLInputElement)?.focus();
        }, 250);
    };
    document.getElementById('btnClosePanel')!.onclick = () => togglePanel(false);
    document.getElementById('btnCancelExport')!.onclick = () => togglePanel(false);

    document.getElementById('btnDoExport')!.onclick = () => {
        const fileNameInput = document.getElementById('expFileName') as HTMLInputElement;
        const fileName = (fileNameInput.value || 'Sankey').trim();
        sankey.export(dropdown.value as ExportType, fileName);
        togglePanel(false);
    };

    document.getElementById('btnPrint')!.onclick = () => {
       sankey.print();
    };

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        var panel = document.getElementById('exportPanel');
        if (e.key === 'Escape'&& e.keyCode === 27) {
            if (panel && panel.classList.contains('open')) {
                togglePanel(false);
            }
        }
    });
};