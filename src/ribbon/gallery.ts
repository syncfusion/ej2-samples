import { loadCultureFiles } from '../common/culture-loader';
import { Ribbon, ItemOrientation, RibbonItemSize, RibbonItemType, RibbonTabModel, RibbonColorPicker, DisplayMode, FileMenuSettingsModel, RibbonGroupButtonSelection, RibbonFileMenu, LauncherClickEventArgs, RibbonGallery, GallerySelectEventArgs } from '@syncfusion/ej2-ribbon';
import { ListView, SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";
import { MenuItemModel, MenuEventArgs } from "@syncfusion/ej2-navigations";
import { FilteringEventArgs, SelectEventArgs } from "@syncfusion/ej2-dropdowns";
import { Query } from "@syncfusion/ej2-data";
import { Toast } from '@syncfusion/ej2/notifications';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

Ribbon.Inject(RibbonFileMenu, RibbonColorPicker, RibbonGallery);

(window as any).default = (): void => {
    loadCultureFiles();
    let tabs: RibbonTabModel[] = [{
        header: "Home",        
        groups: [{
            id: 'clipboard',
            header: "Clipboard",
            showLauncherIcon: true,
            groupIconCss: 'e-icons e-paste',
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    disabled: true,
                    id: 'pastebtn',
                    splitButtonSettings: {
                        iconCss: 'e-icons e-paste',
                        items: [{ text: 'Keep Source Format' }, { text: 'Merge Format' }, { text: 'Keep Text Only' }],
                        content: 'Paste',
                        select:(args: MenuEventArgs) => { updateContent( "Paste -> " + args.item.text) },
                        click: () => { updateContent("Paste"); }
                    }
                }]
            }, {
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Cut',
                        iconCss: 'e-icons e-cut',
                        clicked: () => { updateContent("Cut"); enablePaste(); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {                    
                        content: 'Copy',
                        iconCss: 'e-icons e-copy',
                        clicked: () => { updateContent("Copy"); enablePaste(); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {                    
                        content: 'Format Painter',
                        iconCss: 'e-icons e-format-painter',
                        clicked: () => { updateContent("Format Painter") }
                    }
                }]
            }]
        }, {
            header: "Gallery",
            showLauncherIcon:true,
            groupIconCss: 'e-icons e-paste',
            collections: [{
                items: [{
                    type: RibbonItemType.Gallery,
                    gallerySettings: {
                        popupWidth: "544px",
                        itemCount: 3,
                        select: function (args: GallerySelectEventArgs) { updateContent("Gallery -> " + args.currentItem.content); },
                        groups: [{
                                itemWidth: '100',
                                itemHeight: '40',
                                header: 'Title and Headings',
                                items: [
                                    {
                                        content: 'Heading 1',
                                        cssClass: 'heading_1'
                                    },
                                    {
                                        content: 'Heading 2',
                                        cssClass: 'heading_2'
                                    }, {
                                        content: 'Heading 3',
                                        cssClass: 'heading_3'
                                    }, {
                                        content: 'Heading 4',
                                        cssClass: 'heading_4'
                                    }, {
                                        content: 'Title',
                                        cssClass: 'title'
                                    }, {
                                        content: 'Total',
                                        cssClass: 'total'
                                    }
                                ]
                            }, {
                                itemWidth: '100',
                                itemHeight: '40',
                                header: 'Data and Model',
                                items: [
                                    {
                                        content: 'Calculation',
                                        cssClass: 'calculation'
                                    },
                                    {
                                        content: 'Check Cell',
                                        cssClass: 'check-cell'
                                    }, {
                                        content: 'Hyperlink',
                                        cssClass: 'hyperlink'
                                    }, {
                                        content: 'Input',
                                        cssClass: 'input'
                                    }, {
                                        content: 'Linked Cell',
                                        cssClass: 'linked-cell'
                                    }, {
                                        content: 'Note',
                                        cssClass: 'note'
                                    }
                                ]
                            }, {
                                itemWidth: '100',
                                itemHeight: '40',
                                header: 'Good, Bad and Neutral',
                                items: [{
                                        content: 'Normal',
                                        cssClass: 'normal'
                                    }, {
                                        content: 'Bad',
                                        cssClass: 'bad'
                                    }, {
                                        content: 'Good',
                                        cssClass: 'good'
                                    }, {
                                        content: 'Neutral',
                                        cssClass: 'neutral'
                                    }
                                ]
                            }]
                    }
                }]
            }]
        }, , {
            header: "Voice",
            isCollapsible: false,
            groupIconCss: 'sf-icon-dictate',
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    splitButtonSettings: {
                        content: 'Dictate',
                        iconCss: 'sf-icon-dictate',
                        items: [{ text: 'Chinese' }, { text: 'English' }, { text: 'German' }, { text: 'French' }],
                        select:(args: MenuEventArgs) => {updateContent( "Dictate -> " + args.item.text)},
                        click: () => { updateContent("Dictate"); }
                    }
                }]
            }]
        }, {
            header: "Editor",
            isCollapsible: false,
            groupIconCss: 'sf-icon-editor',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        content: 'Editor',
                        iconCss:'sf-icon-editor',
                        clicked: () => { updateContent("Editor") }
                    }
                }]
            }]
        }, {
            header: "Reuse Files",
            isCollapsible: false,
            groupIconCss: 'sf-icon-reuse',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        iconCss:'sf-icon-reuse',
                        content: 'Reuse Files',
                        clicked: () => { updateContent("Reuse Files") }
                    }
                }]
            }]
        }]
    }, {
        header: 'Insert',
        groups: [{
            header: 'Tables',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    allowedSizes: RibbonItemSize.Large,
                    dropDownSettings: {
                        iconCss: 'e-icons e-table',
                        content: 'Table',
                        items: [
                            { text: 'Insert Table' }, { text: 'Draw Table' },
                            { text: 'Convert Table' }, { text: 'Excel SpreadSheet' }
                        ],
                        select:(args: MenuEventArgs) => {updateContent( "Table -> " + args.item.text)}
                    }
                }]
            }]
        }, {
            id: 'illustration',
            header: 'Illustrations',
            showLauncherIcon: true,
            orientation: ItemOrientation.Row,
            enableGroupOverflow: true,
            overflowHeader: 'Illustrations',
            groupIconCss: 'e-icons e-image',
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    id: 'pictureddl',
                    dropDownSettings: {
                        content: 'Pictures',
                        iconCss: 'e-icons e-image',
                        target: '#pictureList'                        
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Shapes',
                        iconCss:'sf-icon-shapes',
                        items: [{ text: 'Lines' }, { text: 'Rectangles' }, { text: 'Basic Arrows' }, { text: 'Basic Shapes' }, { text: 'FlowChart' }],
                        select:(args: MenuEventArgs) => {updateContent( "Shapes -> " + args.item.text)}
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: '3D Models',
                        iconCss:'sf-icon-3d-model',
                        clicked: () => { updateContent("3D Models") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-smart-art',
                        content: 'SmartArt',
                        clicked: () => { updateContent("SmartArt") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Chart',
                        iconCss:'sf-icon-chart',
                        clicked: () => { updateContent("Chart") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Screenshot',
                        iconCss:'sf-icon-screenshot',
                        clicked: () => { updateContent("Screenshot") }
                    }
                }]
            }]
        }, {
            id: 'header_footer',
            header: 'Header & Footer',
            showLauncherIcon: true,
            orientation: ItemOrientation.Column,
            groupIconCss: 'e-icons e-table',
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Header',
                        iconCss: 'e-icons e-header',
                        items: [{ text: 'Insert Header' }, { text: 'Edit Header' }, { text: 'Remove Header' }],
                        select:(args: MenuEventArgs) => {updateContent( "Header -> " + args.item.text)}
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        iconCss: 'e-icons e-footer',
                        content: 'Footer',
                        items: [{ text: 'Insert Footer' }, { text: 'Edit Footer' }, { text: 'Remove Footer' }],
                        select:(args: MenuEventArgs) => {updateContent( "Footer -> " + args.item.text)}
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Page Number',                    
                        iconCss: 'e-icons e-page-numbering',
                        items: [{ text: 'Insert Top of page' }, { text: 'Insert Bottom of page' }, { text: 'Format Page Number' }, { text: 'Remove Page Number' }],
                        select:(args: MenuEventArgs) => {updateContent( "Page Numbering -> " + args.item.text)}
                    }
                }]
            }]
        },
        {
            header: 'Comments',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        content: 'New Comment',
                        iconCss: 'e-icons e-comment-add',
                        clicked: () => { updateContent("New Comment") }
                    }
                }]
            }]
        }, {
            header: 'Links',
            groupIconCss: 'e-icons e-link',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    allowedSizes: RibbonItemSize.Large,
                    dropDownSettings: {
                        content: 'Link',
                        iconCss: 'e-icons e-link',
                        items: [{ text: 'Insert Link', iconCss: 'e-icons e-link' },
                        { text: 'Recent Links', iconCss: 'e-icons e-clock' },
                        { text: 'Bookmarks', iconCss: 'e-icons e-bookmark' }
                    ],
                    select:(args: MenuEventArgs) => {updateContent( "Link -> " + args.item.text)}
                    }
                }]
            }]
        }]
    }, {
        header: 'View',
        groups: [{
            header: 'Views',
            groupIconCss: 'e-icons e-print',
            orientation: ItemOrientation.Row,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-read',
                        content: 'Read Mode',
                        clicked: () => { updateContent("Read Mode") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Print Layout',
                        iconCss: 'e-print e-icons',
                        clicked: () => { updateContent("Print Layout") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-web-layout',
                        content: 'Web Layout',
                        clicked: () => { updateContent("Web Layout") }
                    }
                }]
            }]
        }, {
            header: 'Zoom',
            orientation: ItemOrientation.Row,
            groupIconCss: 'e-icons e-zoom-to-fit',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Zoom In',
                        iconCss: 'e-icons e-zoom-in',
                        clicked: () => { updateContent("Zoom In") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'e-icons e-zoom-out',
                        content: 'Zoom Out',
                        clicked: () => { updateContent("Zoom Out") }
                    }
                }]
            }]
        }, {
            header: 'Show',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: 'Ruler',
                        checked: false,
                        change: () => { updateContent("Ruler") }
                    }
                }, {
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        checked: false,
                        label: 'Gridlines',
                        change: () => { updateContent("Gridlines") }
                    }
                }, {
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: 'Navigation Pane',
                        checked: true,
                        change: () => { updateContent("Navigation Pane") }
                    }
                }]
            }]
        }, {
            header: 'Dark Mode',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        iconCss: 'sf-icon-mode',
                        content: 'Dark Mode',
                        clicked: () => { updateContent("Dark Mode") }
                    }
                }]
            }]
        }]
    }];
    let list: ListView = new ListView({
        showHeader: true,
        headerTitle: 'Insert Picture From',
        dataSource: ['This Device', 'Stock Images', 'Online Images'],
        select:(args: SelectListEventArgs) => {updateContent( "Pictures -> " + args.text)}
    });
    list.appendTo('#pictureList');
    let menuItems: MenuItemModel[] = [
        { text: 'New', iconCss:'e-icons e-file-new', id: 'new' }, 
        { text: 'Open', iconCss:'e-icons e-folder-open', id: 'open' },
        { text: 'Rename', iconCss:'e-icons e-rename', id: 'rename' },
        {
            text: 'Save as',
            iconCss:'e-icons e-save',
            id: 'save',
            items: [
                { text: 'Microsoft Word (.docx)', iconCss:'sf-icon-word', id: 'word' },
                { text: 'Microsoft Word 97-2003(.doc)', iconCss:'sf-icon-word', id: 'word97' },
                { text: 'Download as PDF', iconCss:'e-icons e-export-pdf', id: 'pdf' }
            ]            
        }
    ];
    let files: FileMenuSettingsModel = ({
        menuItems: menuItems,
        visible: true,
        select: (args: MenuEventArgs) => {
            if (args.item.id == "word" || args.item.id == "word97" || args.item.id == "pdf") {
                updateContent("File -> Save as -> " + args.item.text);
            } else {
                updateContent("File -> " + args.item.text);
            }
        }
    });
    let ribbon: Ribbon = new Ribbon({
        tabs: tabs,
        fileMenu: files,
        cssClass: 'ribbonGallery',
        launcherIconClick: (args: LauncherClickEventArgs) => {
            if (args.groupId == "clipboard") {
                updateContent("Clipboard LauncherIcon");
            }
            else if (args.groupId == "illustration") {
                updateContent("Illustration LauncherIcon");
            }
            else if (args.groupId == "header_footer") {
                updateContent("Header & Footer LauncherIcon");
            }
        }
    });
    ribbon.appendTo("#ribbon");

    let toast: Toast = new Toast({
        target: '#ribbonPlaceHolder',
        cssClass: 'e-toast-info',
        height: 25,
        width: 'auto',
        timeOut: 2000,
        newestOnTop: true,
        animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' }},
        position: { X: "Right" },
        showCloseButton: true
    });
    toast.appendTo('#toast');

    function updateContent(args: string){
        toast.show({ content : "Last clicked item is " + args });
    }

    let isPasteDisabled: boolean = true;
    function enablePaste() { 
        if (!isPasteDisabled) { return; }
        ribbon.enableItem('pastebtn')
        isPasteDisabled = false;
    }
};
