import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar, Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
/**
 * Sidebar-List sample.
 */
(window as any).default = (): void => {
    loadCultureFiles();
    //Toolbar component template element specification.
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Language</div></div>';
    //ListView component template element specification.
    let listTemplate: string = '<div class="list-wrapper"><span class="${pic} e-avatar e-avatar-xsmall e-avatar-circle"></span>'
                                + '<span class="text e-text-content">${text}</span></div>';
    //Initialization of ListView datasource. 
    let ListData: { [key: string]: Object }[] = [
        { id: "1", text: "JavaScript", pic: "javascript", 
            description: "JavaScript (JS) is an interpreted computer programming language. " +
            "It was originally implemented as part of web browsers so that client-side scripts " + 
            "could interact with the user, control the browser, communicate asynchronously, and " +
            "alter the document content that was displayed. However, it has recently " +
            "become common in both game development and the creation of desktop applications." },
        { id: "2", text: "TypeScript", pic: "typescript", 
            description: "It is a typed superset of JavaScript that compiles to plain JavaScript. " + 
            "TypeScript is an open-source, object-oriented programing language. It contains all elements of JavaScript " + 
            "It is a language designed for large-scale JavaScript application development, which can be executed on any " + 
            "browser, any Host, and any Operating System. TypeScript is a language as well as a set of tools." +
            " TypeScript is the ES6 version of JavaScript with some additional features." },
        { id: "3", text: "Angular", pic: "angular", 
            description: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript."
            + " Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript" +
            " libraries that you import into your applications." },
        { id: "4", text: "React", pic: "react",
            description: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces." +
            " It lets you compose complex UIs from small and isolated pieces of code called “components”." +
            " It can also render on the server using Node." },
        { id: "5", text: "Vue", pic: "vue", 
            description: "A progressive framework for building user interfaces. It is incrementally adoptable." +
            " The core library is focused on the view layer only and is easy to pick up and integrate with other" +
            " libraries or existing projects. On the other hand, Vue is also perfectly capable of powering" +
            " sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries." }
    ];
    //Specifies the rendering code blocks for the Toolbar component. 
    let toolbarObj: Toolbar = new Toolbar({
        clicked: ToolbarCliked,
        items: [
            { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" },
            { template: folderEle }
        ]
    });
    toolbarObj.appendTo("#listToolbar");
    //Specifies the rendering code blocks for the Sidebar component. 
    let sidebarObj: Sidebar = new Sidebar({
        width: "250px",
        target: ".maincontent",
        type: "Auto",
        isOpen: true
    });
    sidebarObj.appendTo("#listSidebar");
    //Specifies the rendering code blocks for the ListView component. 
    let listObj: ListView = new ListView({
        dataSource: ListData,
        cssClass: "e-template-list",
        fields: { id: "id", text: "text" },
        template: listTemplate,
        select: OnSelect
    });
    listObj.appendTo("#listSidebarList");
    // Specifies the event handler for the Toolbar clicked event.
    function ToolbarCliked(args: ClickEventArgs): void {
        if(args.item.tooltipText == "Menu") {
            sidebarObj.toggle();
        }
    }
    // Specifies the event handler for the ListView select event.
    function OnSelect(args: SelectEventArgs): void {
        document.getElementById("listContent").innerHTML =(<any>args.data).description;
    }
};
