import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, DetailsView, NavigationPane, Toolbar } from '@syncfusion/ej2-filemanager';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
FileManager.Inject(Toolbar, NavigationPane, DetailsView);

(window as any).default = (): void => { 
    loadCultureFiles();
    const actionItems: ItemModel[] = [
        { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Download', iconCss: 'e-icons e-download' },
        { text: 'Refresh', iconCss: 'e-icons e-refresh' },
        { text: 'Delete', iconCss: 'e-icons e-trash' },
    ];
    const hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    const fileManager = new FileManager({
        ajaxSettings: {
            url: `${hostUrl}api/FileManager/FileOperations`,
            uploadUrl: `${hostUrl}api/FileManager/Upload`,
            downloadUrl: `${hostUrl}api/FileManager/Download`,
            getImageUrl: `${hostUrl}api/FileManager/GetImage`
        },
        cssClass: 'e-fm-template-sample',
        height: '600px',
        detailsViewSettings: {
            columns: [
                {
                    field: "name",
                    headerText: "Name",
                    template: (item: any) => {
                        return `<div>${item.name}</div>`;
                    }
                },
                {
                    field: 'size',
                    headerText: 'Size', 
                    template: (item: any) => {
                        return `<div>${item.isFile ? formatSize(item.size) : "-"}</div>`;
                    }
                },
                {
                    field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a'
                },
                {
                    headerText: "Actions",
                    template: (item: any) => {
                        return `
                            <div class="action-ddb" data-name="${item.name}" data-isFile="${item.isFile}"></div>
                        `;
                    }
                }
            ]
        },
        largeIconsTemplate: (item: any): string => {
            const formattedDate = item.dateCreated
                ? new Date(item.dateCreated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                : '';
            const iconClass = getFileIconCssClass(item);
            const backgroundClass = getBackgroundCss(item);
            const iconHtml = item.isFile ? `<div class="${iconClass}"></div>` : '';
            return `
                <div class="custom-icon-card">
                    <div class="file-header">
                        <div class="left-info">
                            ${iconHtml}
                            <div class="file-name" title="${item.name}">${item.name}</div>
                        </div>
                        <div class="action-ddb" data-name="${item.name}" data-isFile="${item.isFile}"></div>
                    </div>
                    <div class="${backgroundClass}" title="${item.name}"></div>
                    <div class="file-formattedDate">Created on ${formattedDate}</div>
                </div>
            `;
        },
        navigationPaneTemplate: (item: any): string => {
            const iconClass = getIconsForFolders(item);
            return `
                <div class="e-nav-pane-node" style="display: inline-flex; align-items: center;">
                    <span class="e-icons ${iconClass}"></span>
                    <span class="folder-name" style="margin-left:8px;">${item.name}</span>
                </div>
            `;
        },
        menuOpen: (args: any) => {
            args.cancel = true;
        },
        fileLoad: (args: any) => {
            const validModules = ['DetailsView', 'LargeIconsView'];

            if (validModules.indexOf(args.module) !== -1) {
                const actionBtn = args.element.querySelector('.action-ddb') as HTMLElement;

                if (actionBtn && !actionBtn.hasAttribute('data-ddb-initialized')) {
                    wireDropDownButton(actionBtn);
                }
            }
        },
    });

    fileManager.appendTo('#filemanager');

    function wireDropDownButton(hostEl: HTMLElement) {
        const fileName = hostEl.getAttribute('data-name') || '';
        const isFile = (hostEl.getAttribute('data-isfile') || 'false') === 'true';
        const items = isFile ? actionItems.filter((i) => i.text !== 'Open') : actionItems;
        const ddb = new DropDownButton({
            items: items,
            cssClass: 'e-caret-hide filemanager-dropdown-button',
            select: (args) => {
                const action = args.item.text || '';
                onActionSelect(action, { name: fileName, isFile });
            },
            iconCss: 'e-icons e-more-vertical-1',
        });
        ddb.appendTo(hostEl);
        hostEl.setAttribute('data-ddb-initialized', 'true');
    }

    function onActionSelect(action: string, item: { name: string; isFile: boolean }) {
        switch (action) {
            case 'Open':
                fileManager.openFile(item.name);
                break;
            case 'Download':
                fileManager.downloadFiles([item.name]);
                break;
            case 'Refresh':
                fileManager.refreshFiles();
                break;
            case 'Delete':
                fileManager.deleteFiles([item.name]);
                break;
            default:
                break;
        }
    }

    function formatSize(bytes: number): string {
        if (!bytes) return "0 B";
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        let i = 0;
        while (bytes >= 1024 && i < sizes.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${sizes[i]}`;
    }

    function getBackgroundCss(item: any): string {
        const NamedFileBackgrounds: Record<string, string> = {
            "Adam.png": "background-Adam",
            "Andrew.png": "background-Andrew",
            "Ellie.png": "background-Ellie",
            "Jameson.png": "background-Jameson",
            "John.png": "background-John",
            "Josie.png": "background-Josie",
            "Apple pie.png": "background-Applepie",
            "Bread.png": "background-Bread",
            "Doughnut.png": "background-Doughnut",
            "Nuggets.png": "background-Nuggets",
            "Sugar cookie.png": "background-Sugarcookie",
            "bird.jpg": "background-bird",
            "sea.jpg": "background-sea",
            "seaview.jpg": "background-seaview",
            "snow.jpg": "background-snow",
            "snowfall.jpg": "background-snowfall"
        };

        const ExtensionBackgrounds: Record<string, string> = {
            "jpg": "background-jpg",
            "jpeg": "background-jpg",
            "png": "background-png",
            "pptx": "background-pptx",
            "pdf": "background-pdf",
            "mp4": "background-video",
            "mp3": "background-audio",
            "docx": "background-doc",
            "txt": "background-txt",
            "xlsx": "background-xlsx"
        };

        if (!item.isFile) return "file-icon background-folder";
        if (NamedFileBackgrounds[item.name]) return `file-icon ${NamedFileBackgrounds[item.name]}`;
        const ext = item.name.split('.').pop() || '';
        return `file-icon ${ExtensionBackgrounds[ext] || "background-default"}`;
    }

    function getIconsForFolders(item: any): string {
        const iconMap: Record<string, string> = {
            Files: 'e-folder',
            Documents: 'e-file-document',
            Downloads: 'e-download',
            Pictures: 'e-thumbnail',
            Music: 'e-file-format',
            Videos: 'e-video',
            Employees: 'e-export-png',
            Food: 'e-export-png',
            Nature: 'e-export-png'
        };
        return iconMap[item.name] || 'e-folder';
    }

    function getFileIconCssClass(item: any): string {
        if (!item.isFile) return "";

        const extensionMap: Record<string, string> = {
            jpg: "image",
            jpeg: "image",
            png: "image",
            gif: "image",
            mp3: "music",
            wav: "music",
            mp4: "video",
            avi: "video",
            doc: "doc",
            docx: "docx",
            ppt: "pptx",
            pptx: "pptx",
            xls: "xlsx",
            xlsx: "xlsx",
            txt: "txt",
            js: "js",
            css: "css",
            html: "html",
            exe: "exe",
            msi: "msi",
            php: "php",
            xml: "xml",
            zip: "zip",
            rar: "rar",
            pdf: "pdf"
        };

        const extension = (item.name.split('.').pop() || "").toLowerCase();
        const iconType = extensionMap[extension] || "unknown";
        return `e-list-icon e-fe-${iconType}`;
    }
};
