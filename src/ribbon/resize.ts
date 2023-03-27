import { loadCultureFiles } from '../common/culture-loader';
import { Ribbon, ItemOrientation, RibbonItemSize, RibbonItemType, RibbonTabModel, DisplayMode, FileMenuSettingsModel, RibbonFileMenu, LauncherClickEventArgs, RibbonColorPicker } from '@syncfusion/ej2-ribbon';
import { FilteringEventArgs, SelectEventArgs } from "@syncfusion/ej2-dropdowns";
import { Slider, SliderChangeEventArgs } from "@syncfusion/ej2-inputs";
import { Query } from '@syncfusion/ej2-data';
import { ListView, SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";
import { MenuItemModel } from "@syncfusion/ej2-navigations";
import { MenuEventArgs } from '@syncfusion/ej2/splitbuttons';
import { Toast } from '@syncfusion/ej2/notifications';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

Ribbon.Inject(RibbonFileMenu, RibbonColorPicker);

Ribbon.Inject(RibbonFileMenu);

(window as any).default = (): void => {
    loadCultureFiles();
    let fontStyle: string[] = ['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Courier New', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Windings'
    ];
    let fontSize: string[] = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72', '96'];
    let tabs: RibbonTabModel[] = [{
        header: "Home",
        groups: [{
            id: 'clipboard',
            header: "Clipboard",
            groupIconCss: 'e-icons e-paste',
            showLauncherIcon: true,
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    disabled: true,
                    id: 'pastebtn',
                    splitButtonSettings: {
                        content: 'Paste',
                        iconCss: 'e-icons e-paste',
                        items: [{ text: 'Keep Source Format' }, { text: 'Merge format' }, { text: 'Keep text only' }],
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
                }]
            }, {
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Copy',                    
                        iconCss: 'e-icons e-copy',
                        clicked: () => { updateContent("Copy"); enablePaste(); }
                    }
                }]
            }, {
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Format Painter',                    
                        iconCss: 'e-icons e-format-painter',
                        clicked: () => { updateContent("Format Painter") }
                    }
                }]
            }]
        }, {
            header: "Font",
            orientation: ItemOrientation.Row,
            groupIconCss: 'e-icons e-bold',
            isCollapsible: false,
            enableGroupOverflow: true,
            cssClass: 'font-group',
            collections: [{
                items: [{
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: fontStyle,
                        index: 2,
                        allowFiltering: true,
                        width: '150px',
                        change:(args: SelectEventArgs ) => {updateContent( "Font Style -> " + args.itemData.text)}
                    }
                }, {
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: fontSize,
                        index: 4,
                        width: '65px',
                        allowFiltering: true,
                        change:(args: SelectEventArgs ) => {updateContent( "Font Size -> " + args.itemData.text)}
                    }
                }]
            }, {
                items: [{
                        type: RibbonItemType.ColorPicker,
                        allowedSizes: RibbonItemSize.Small,
                        displayOptions: DisplayMode.Simplified,
                        colorPickerSettings: {
                            value: '#123456',
                            change:(args: ColorPickerEventArgs) => {updateContent( args.currentValue.hex + ' color')}
                        }
                    },{
                        type: RibbonItemType.Button,
                        allowedSizes: RibbonItemSize.Small,
                        buttonSettings: {
                            content: 'Bold',
                            iconCss: 'e-icons e-bold',
                            isToggle: true,
                            clicked: () => { updateContent("Bold") }
                        }
                    }, {
                        type: RibbonItemType.Button,
                        allowedSizes: RibbonItemSize.Small,
                        buttonSettings: {
                            content: 'Italic',
                            iconCss: 'e-icons e-italic',
                            isToggle: true,
                            clicked: () => { updateContent("Italic") }
                        }
                    }, {
                        type: RibbonItemType.Button,
                        allowedSizes: RibbonItemSize.Small,
                        buttonSettings: {
                            content: 'Underline',
                            iconCss: 'e-icons e-underline',
                            isToggle: true,
                            clicked: () => { updateContent("Underline") }
                        }
                    },{
                        type: RibbonItemType.Button,
                        allowedSizes: RibbonItemSize.Small,
                        buttonSettings: {
                            content: 'Strikethrough',
                            iconCss: 'e-icons e-strikethrough',
                            isToggle: true,
                            clicked: () => { updateContent("Strikethrough") }
                        }
                    }, {
                        type: RibbonItemType.Button,
                        allowedSizes: RibbonItemSize.Small,
                        buttonSettings: {
                            content: 'Change Case',
                            iconCss: 'e-icons e-change-case',
                            isToggle: true,
                            clicked: () => { updateContent("Change Case") }
                        }
                    }
                ]
            }]
        }, {
            header: "Editing",
            groupIconCss: 'e-icons e-edit',
            orientation: ItemOrientation.Row,
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    splitButtonSettings: {
                        content: 'Find',
                        iconCss: 'e-icons e-search',
                        items: [{ text: 'Find', iconCss: 'e-icons e-search' },
                        { text: 'Advanced find', iconCss: 'e-icons e-search' },
                        { text: 'Go to', iconCss: 'e-icons e-arrow-right' }],
                        select:(args: MenuEventArgs) => {updateContent( "Find -> " + args.item.text)},
                        click: () => { updateContent("Find"); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Replace',
                        iconCss: 'e-icons e-replace',
                        clicked: () => { updateContent("Replace") }
                    }
                }, {
                    type: RibbonItemType.SplitButton,
                    splitButtonSettings: {
                        content: 'Select',
                        iconCss: 'e-icons e-mouse-pointer',
                        items: [{ text: 'Select All' },
                        { text: 'Select Objects' }],
                        select:(args: MenuEventArgs) => {updateContent( "Select -> " + args.item.text)},
                        click: () => { updateContent("Select"); }
                    }
                }]
            }]
        }, {
            header: "Voice",
            isCollapsible: false,
            groupIconCss: 'sf-icon-dictate',
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    disabled: true,
                    splitButtonSettings: {
                        content: 'Dictate',
                        iconCss: 'sf-icon-dictate',
                        items: [{ text: 'Chinese' }, { text: 'English' }, { text: 'German' }, { text: 'French' }],
                        select:(args: MenuEventArgs) => {updateContent( "Dictate -> " + args.item.text)},
                        click: () => { updateContent("Dictate"); }
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
                        content: 'Table',
                        iconCss: 'e-icons e-table',
                        items: [
                            { text: 'Insert Table' }, { text: 'Draw Table' },
                            { text: 'Convert Table' }, { text: 'Excel SpreadSheet' }
                        ],
                        select:(args: MenuEventArgs) => {updateContent( "Table -> " + args.item.text)}
                    }
                }]
            }]
        }, {
            id  : 'illustration',
            header: 'Illustrations',
            showLauncherIcon: true,
            orientation: ItemOrientation.Row,
            enableGroupOverflow: true,
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
                        iconCss:'sf-icon-shapes',
                        content: 'Shapes',
                        items: [{ text: 'Lines' }, { text: 'Rectangles' }, { text: 'Basic Arrows' }, { text: 'Basic Shapes' }, { text: 'FlowChart' }],
                        select:(args) => {updateContent( "Shapes -> " + args.item.text)}
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
                        content: 'SmartArt',
                        iconCss: 'sf-icon-smart-art',
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
                        content: 'Footer',
                        iconCss: 'e-icons e-footer',
                        items: [{ text: 'Insert Footer' }, { text: 'Edit Footer' }, { text: 'Remove Footer' }],
                        select:(args: MenuEventArgs) => {updateContent( "Footer -> " + args.item.text)}
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Page Number',                    
                        iconCss: 'e-icons e-page-numbering',
                        items: [{ text: 'Insert Top of page' }, { text: 'Insert Bottom of page' }, { text: 'Format Page Number' }, { text: 'Remove Page Number' }],
                        select:(args: MenuEventArgs) => {updateContent( "Page Number -> " + args.item.text)}
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
                        iconCss: 'e-icons e-comment-add',
                        content: 'New Comment',
                        clicked: () => { updateContent("New Comment") }
                    }
                }]
            }]
        }, {
            header: 'Link',
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
            orientation: ItemOrientation.Row,
            groupIconCss: 'e-icons e-print',
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
                    displayOptions: DisplayMode.Auto,
                    buttonSettings: {
                        iconCss: 'e-print e-icons',
                        content: 'Print Layout',
                        clicked: () => { updateContent("Print Layout") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    displayOptions:DisplayMode.Overflow,
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
                        iconCss: 'e-icons e-zoom-in',
                        content: 'Zoom In',
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
                        label: 'Gridlines',
                        checked: false,
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
        dataSource: ['This device', 'Stock Images', 'Online Images'],
        select:(args: SelectListEventArgs) => {updateContent( "Pictures -> " + args.text)}
    });
    list.appendTo('#pictureList');
    let menuItems: MenuItemModel[] = [
        { text: 'New', iconCss:'e-icons e-file-new' }, 
        { text: 'Open', iconCss:'e-icons e-folder-open' },
        { text: 'Rename', iconCss:'e-icons e-rename' },
        {
            text: 'Save as',
            iconCss:'e-icons e-save',
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
    let container: HTMLElement = document.getElementById('ribbonContainer');
    let slider: Slider = new Slider({
        min: 350,
        max: container.offsetWidth,
        value: container.offsetWidth,
        change: onChange
    });
    slider.appendTo('#ribbonSlider');

    let ribbon: Ribbon = new Ribbon({
        tabs: tabs,
        fileMenu: files,
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

    function onChange(args: SliderChangeEventArgs) {
        container.style.width = args.value + 'px';
        ribbon.refreshLayout();
    }
    window.addEventListener("resize", function() {
        container.style.width = '100%';
        slider.max = container.offsetWidth;
        slider.value = container.offsetWidth;
        ribbon.refreshLayout();
    });
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