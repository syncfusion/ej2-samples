import { loadCultureFiles } from '../common/culture-loader';
import { Sidebar, Toolbar, NodeSelectEventArgs, TreeView, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
/**
 * Default sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    //Toolbar component Template elements.
    let folderEle: string = '<div class= "e-folder"><div class= "e-folder-name">Webmail</div></div>';
    let userNameEle: string = '<div><div class= "e-user-name">John</div></div>';
    let imageEle: string = '<div class= "image-container"><img height="36px" src="src/sidebar/images/user.svg" alt="John"></img></div>';
    //Initialization of ListView datasource. 
    let inboxData: { [key: string]: Object }[] = [
        { id: "1", text: "Albert Lives", subject: "Business dinner invitation", message: "Hello John," },
        { id: "2", text: "Ila Russo", subject: "Opening for Sales Manager", message: "Hello John," },
        { id: "3", text: "Garth Owen", subject: "Application for Sales Manager", message: "Hello John," },
        { id: "4", text: "Ursula Patterson", subject: "Software Programmer Application", message: "Hello John" },
        { id: "5", text: "Nichole Rivas", subject: "Annual Conference", message: "Hi John," }
    ];
    let sentItemData: { [key: string]: Object }[] = [
        { id: "11", text: "Gemma Roberson", subject: "Apology for long leave", message: "Hello Gemma Roberson," },
        { id: "12", text: "Ann Garza", subject: "Application for Sales Manager", message: "Hello Ann Garza," },
        { id: "13", text: "Alfonso Burnett", subject: "Anything I can help with", message: "Hello Alfonso Burnett," },
        { id: "14", text: "Rogan Espinoza", subject: "Needs assistant for Digital Marketing", message: "Hello Rogan Espinoza," },
        { id: "15", text: "Sierra Kerr", subject: "Request for transferring license", message: "Hi Sierra Kerr," }
    ];
    let draftsData: { [key: string]: Object }[] = [
        { id: "21", text: "Chaim Barber", subject: "We launched new Product!", message: "Hello Chaim Barber," },
        { id: "22", text: "Lara Knox", subject: "Request for meeting appointment", message: "Hello Lara Knox," },
        { id: "23", text: "Igor Mccoy", subject: "Thank you", message: "Hello Igor Mccoy," },
        { id: "24", text: "Patricia Boyle", subject: "Sales Team", message: "Hello Patricia Boyle," },
        { id: "25", text: "Zachery Peters", subject: "Today’s meeting schedule", message: "Hi Zachery Peters," }
    ];
    let deleteData: { [key: string]: Object }[] = [
        { id: "31", text: "Elijah Berry", subject: "Meeting with Sales manager", message: "Dear John," },
        { id: "32", text: "Cameran Newman", subject: "Business appointment request", message: "Hello John," },
        { id: "33", text: "Amity Slater", subject: "Business dinner invitation", message: "Hello John," },
        { id: "34", text: "Leo Cooley", subject: "Business appointment request", message: "Hi John," },
        { id: "35", text: "Halee Lindsey", subject: "Successful product launch party", message: "Hi John," }
    ];
    let outBoxData: { [key: string]: Object }[] = [
        { id: "41", text: "Willow Frye", subject: "Out of Office", message: "Hello Willow Frye," },
        { id: "42", text: "Regan Haney", subject: "Project Manager Interview", message: "Hello Regan Haney," },
        { id: "43", text: "Stella Calderon", subject: "Proposition for a new business", message: "Hello Stella Calderon," },
        { id: "44", text: "Xanthus Harmon", subject: "Performance appraisal meeting", message: "Dear Xanthus Harmon" },
        { id: "45", text: "Cheyenne Cline", subject: "Office Holiday", message: "Hi Cheyenne Cline," }
    ];
    //Initialization of TreeView datasource. 
    let treeData: { [key: string]: Object }[] = [
        { id: "1", name: "Favorites", hasChild: true, expanded: true },
        { id: "2", name: "Inbox", selected: true, pid: "1" },
        { id: "3", name: "Sent Items", pid: "1" },
        { id: "5", name: "John", hasChild: true, expanded: true },
        { id: "6", name: "Inbox", pid: "5" },
        { id: "7", name: "Drafts", pid: "5" },
        { id: "8", name: "Deleted Items", pid: "5" },
        { id: "9", name: "Sent Items", pid: "5" },
        { id: "12", name: "Outbox", pid: "5" },
    ]
    //ListView component template element specification.
    let listTemplate: string = '<div class="e-list-wrapper e-list-avatar e-list-multi-line">' +
                          '<span class="e-avatar e-avatar-circle e-icon sf-icon-profile"></span>' +
                          '<span class="e-list-item-header">${text}</span>' +
                          '<span class="e-list-content">${subject}</span>' +
                          '<span class="e-list-text">${message}</span>' +
                          '</div>';
    // Defines the rendering code blocks for the Toolbar component.
    let toolbarObj: Toolbar = new Toolbar({
        cssClass: "defaultToolbar",
        height: "50px",
        clicked: ToolbarCliked,
        items: [
            { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" },
            { template: folderEle, cssClass: "e-folder" },
            { align: 'Right', template: userNameEle },
            { cssClass: "e-custom", align: 'Right', template: imageEle }
        ]
    });
    toolbarObj.appendTo("#defaultToolbar");
    //Defines the rendering code blocks for the ListView component.
    let listObj: ListView = new ListView({
        cssClass: "e-list-template",
        dataSource: inboxData,
        fields: { id: "id", text: "text" },
        select: OnListSelect,
        template: listTemplate
    });
    listObj.appendTo("#listView");
    //Defines the rendering code blocks for the Sidebar component.
    let sideObj: Sidebar = new Sidebar({
        width: "260px",
        target: ".maincontent",        
        position: 'Left'
    });
    sideObj.appendTo("#defaultSidebar");
    //Defines the rendering code blocks for the TreeView component.
    let treeObj: TreeView = new TreeView({
        nodeSelecting: BeforeSelect,
        nodeSelected: OnSelect,
        fields: { dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" }
    });
    treeObj.appendTo("#defaultTree");
    // Specifies the event handler for the Toolbar clicked event.
    function ToolbarCliked(args: ClickEventArgs): void {
        if(args.item.tooltipText == "Menu") {
            sideObj.toggle();
        }
    }
    // Specifies the event handler for the ListView select event.
    function OnListSelect(args: SelectEventArgs): void {
        args.item.classList.remove("e-active");
    }
    // Specifies the event handler for the TreeView nodeSelecting event.
    function BeforeSelect(args: NodeSelectEventArgs): void {
        if (args.nodeData.text == "Favorites" || args.nodeData.text == "John") {
            args.cancel = true;
        }
    }
     // Specifies the event handler for the TreeView nodeSelected event.
    function OnSelect(args: NodeSelectEventArgs): void {
        if (args.nodeData.text == "Inbox")
        {
            listObj.dataSource = inboxData;
        }
        else if (args.nodeData.text == "Sent Items")
        {
            listObj.dataSource = sentItemData;
        }
        else if (args.nodeData.text == "Drafts")
        {
            listObj.dataSource = draftsData;
        }
        else if (args.nodeData.text == "Deleted Items")
        {
            listObj.dataSource = deleteData;
        }
        else if (args.nodeData.text == "Outbox")
        {
            listObj.dataSource = outBoxData;
        }
        listObj.dataBind();
    }
};
