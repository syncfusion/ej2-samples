import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar, Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { TextBox } from '@syncfusion/ej2-inputs';
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

/**
 * Sidebar with TreeView sample.
 */

// Initialization of Sidebar.
(window as any).default = (): void => {
    loadCultureFiles();
    //Toolbar component template element specification.
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Navigation Pane</div></div>';
    //Defines the rendering code blocks for the Toolbar component.
    let toolbarObj: Toolbar = new Toolbar({
        clicked: ToolbarCliked,
        items: [
            { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" },
            { template: folderEle }
        ]
    });
    toolbarObj.appendTo("#resToolbar");
    //Defines the rendering code blocks for the Sidebar component.
    let sidebarMenu: Sidebar = new Sidebar({
        width: '290px',
        target: '.main-content',
        mediaQuery: '(min-width: 600px)',
        isOpen: true
    });
    sidebarMenu.appendTo('#sideTree');
    //Defines the rendering code blocks for the Textbox component.
    let inputObj: TextBox = new TextBox({
        placeholder: "Search..."
    });
    inputObj.appendTo("#resSearch");
    // Initialization of TreeView datasource with iconCss.
    let data: { [key: string]: Object }[] = [
        {
            nodeId: '01', nodeText: 'Installation', iconCss: 'icon-microchip icon',
        },
        {
            nodeId: '02', nodeText: 'Deployment', iconCss: 'icon-thumbs-up-alt icon',
        },
        {
            nodeId: '03', nodeText: 'Quick Start', iconCss: 'icon-docs icon',
        },
        {
            nodeId: '04', nodeText: 'Components', iconCss: 'icon-th icon',
            nodeChild: [
                { nodeId: '04-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '04-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '05', nodeText: 'API Reference', iconCss: 'icon-code icon',
            nodeChild: [
                { nodeId: '05-01', nodeText: 'Calendar', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-02', nodeText: 'DatePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-03', nodeText: 'DateTimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-04', nodeText: 'DateRangePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-05', nodeText: 'TimePicker', iconCss: 'icon-circle-thin icon' },
                { nodeId: '05-06', nodeText: 'SideBar', iconCss: 'icon-circle-thin icon' }
            ]
        },
        {
            nodeId: '06', nodeText: 'Browser Compatibility', iconCss: 'icon-chrome icon'
        },
        {
            nodeId: '07', nodeText: 'Upgrade Packages', iconCss: 'icon-up-hand icon'
        },
        {
            nodeId: '08', nodeText: 'Release Notes', iconCss: 'icon-bookmark-empty icon'
        },
        {
            nodeId: '09', nodeText: 'FAQ', iconCss: 'icon-help-circled icon'
        },
        {
            nodeId: '10', nodeText: 'License', iconCss: 'icon-doc-text icon'
        }
    ];

    //Initialization of TreeView.
    let mainTreeView: TreeView = new TreeView({
        cssClass: "main-treeview",
        fields: { dataSource: data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: "iconCss" },
        expandOn: 'Click'
    });

    mainTreeView.appendTo('#mainTree');

    // Specifies the event handler for the Toolbar clicked event.
    function ToolbarCliked(args: ClickEventArgs): void {
        if (args.item.tooltipText === 'Menu') {
            sidebarMenu.toggle();
        }
    }
};
