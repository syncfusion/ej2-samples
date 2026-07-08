import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor } from '@syncfusion/ej2-blockeditor';
import {
  Breadcrumb, BreadcrumbItemModel,
  Sidebar, TreeView, NodeSelectEventArgs, Toolbar
} from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { MarkdownConverter } from "@syncfusion/ej2-markdown-converter";
let turndownService: any = null;

type TreeNode = {
  id: string;
  name: string;
  mdFile?: string;
  selected?: boolean;
  expanded?: boolean;
  children?: TreeNode[];
};

(window as any).default = (): void => {
  loadCultureFiles();

  let breadcrumbItems: BreadcrumbItemModel[] = [{ text: 'Team' }];
  const data: TreeNode[] = [
    {
      id: 'Team_Sessions',
      name: 'Team Sessions',
      mdFile: 'https://ej2.syncfusion.com/demos/src/block-editor/Team%20Sessions.md',
      selected: true,
      expanded: true,
      children: [
        { id: '1', name: 'Meeting minutes.md', mdFile: 'https://ej2.syncfusion.com/demos/src/block-editor/Meeting%20minutes.md' },
        { id: '2', name: 'Brain storming.md', mdFile: 'https://ej2.syncfusion.com/demos/src/block-editor/Brain%20storming.md' },
        { id: '3', name: 'Retrospective.md', mdFile: 'https://ej2.syncfusion.com/demos/src/block-editor/Retrospective.md' }
      ]
    }
  ];

  function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.id === id) return n;
      if (n.children && n.children.length) {
        const found = findNodeById(n.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  function formatBreadcrumbText(name: string): string {
    return name && name.endsWith('.md') ? name.replace(/\.md$/i, '') : name;
  }

  // Breadcrumb
  const breadcrumb = new Breadcrumb({
    items: breadcrumbItems,
    separatorTemplate: '<span class="e-icons e-chevron-right"></span>'
  });
  breadcrumb.appendTo('#breadcrumb');

  // Download button
  const downloadBtn = new Button({
    iconCss: 'e-icons e-download',
    cssClass: 'downloadbutton'
  });
  downloadBtn.appendTo('#downloadBtn');

  // Turndown will be loaded dynamically via script tags (matches the JS sample)
  function loadExternalFile(): void {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/turndown/dist/turndown.js';
    script.onload = () => {
      const pluginScript = document.createElement('script');
      pluginScript.src = 'https://unpkg.com/turndown-plugin-gfm/dist/turndown-plugin-gfm.js';
      pluginScript.onload = () => {
        try {
          const TurndownCtor = (window as any).TurndownService || (window as any).turndown || (window as any).default;
          turndownService = new TurndownCtor({
            codeBlockStyle: 'fenced',
            emDelimiter: '_',
            bulletListMarker: '-',
            headingStyle: 'atx'
          });
          const plugin = (window as any).gfm || (window as any).turndownPluginGfm || (window as any).turndownPluginGfm;
          if (plugin) {
            if (typeof plugin === 'function') (turndownService as any).use(plugin);
            else if (plugin.gfm) (turndownService as any).use(plugin.gfm);
            else (turndownService as any).use(plugin);
          }
        } catch (e) {
          try { turndownService = new ((window as any).TurndownService)(); } catch (e2) { turndownService = null; }
        }
      };
      head.appendChild(pluginScript);
    };
    head.appendChild(script);
  }

  // Toolbar with templates
  const toolbar = new Toolbar({
    items: [
      { align: 'Left', template: '#breadcrumb' as any },
      { align: 'Right', template: '#downloadBtn' as any }
    ]
  });
  toolbar.appendTo('#toolbar');

  // Sidebar
  const sidebar = new Sidebar({
    enableDock: true,
    width: '240px',
    dockSize: '33px',
    enableGestures: false,
    mediaQuery: '(min-width: 600px)',
    target: '.blockeditor-marked',
    isOpen: false,
    open: onOpen,
    close: onClose
  });
  sidebar.appendTo('#sidebar-treeview');

  const closeBtnEl = document.getElementById('left-toc-closebtn');

  if (closeBtnEl && window.innerWidth < 600) {
    closeBtnEl.style.left = '18px';
    closeBtnEl.classList.add('expand-mode');
  }

  // TreeView
  const treeview = new TreeView({
    fields: {
      dataSource: data as any,
      id: 'id',
      text: 'name',
      child: 'children'
    },
    expandOn: 'Click',
    nodeSelected: (args: NodeSelectEventArgs) => {
      const selectedId = (args as any).nodeData && (args as any).nodeData.id as string | undefined;
      if (!selectedId) return;

      if (selectedId === 'Team_Sessions') {
        breadcrumbItems = [{ text: 'Team' }, { text: 'Team Sessions' }];
        breadcrumb.items = breadcrumbItems;
        breadcrumb.dataBind();
        loadContent('https://ej2.syncfusion.com/demos/src/block-editor/Team%20Sessions.md');
        return;
      }

      const selectedNode = findNodeById(data, selectedId);
      if (selectedNode && selectedNode.mdFile) {
        loadContent(selectedNode.mdFile);
        const parentId = (args as any).nodeData.parentID as string | undefined;
        const isUnderTeamSessions = !!parentId && parentId === 'Team_Sessions';

        if (isUnderTeamSessions) {
          breadcrumbItems = [
            { text: 'Team' },
            { text: 'Team Sessions' },
            { text: formatBreadcrumbText(selectedNode.name) }
          ];
        } else {
          breadcrumbItems = [
            { text: 'Team' },
            { text: formatBreadcrumbText(selectedNode.name) }
          ];
        }
        breadcrumb.items = breadcrumbItems;
        breadcrumb.dataBind();
      }
    }
  });
  treeview.appendTo('#main-treeview');

  function onOpen(): void {
    setTimeout(() => {
      treeview.expandAll();
      if (closeBtnEl) {
        closeBtnEl.style.left = '225px';
        closeBtnEl.classList.remove('expand-mode');
      }
      (treeview.element as HTMLElement).style.display = 'block';
    });
  }

  function onClose(): void {
    if (closeBtnEl) {
      closeBtnEl.style.left = '18px';
      closeBtnEl.classList.add('expand-mode');
    }
    (treeview.element as HTMLElement).style.display = 'none';
  }

  if (closeBtnEl) {
    closeBtnEl.addEventListener('click', () => {
      sidebar.toggle();
    });
  }
  const BlockcommandMenu = {
    popupWidth: '298px',
    popupHeight: '400px',
    // Custom command items
    commands: [
      {
        id: 'bullet-list-command',
        type: 'BulletList',
        groupBy: 'General',
        label: 'Bullet List',
        tooltip: 'Create a bullet list',
        iconCss: 'e-icons e-list-unordered',
        shortcut: `Ctrl+Shift+8`
      },
      {
        id: 'numbered-list-command',
        type: 'NumberedList',
        groupBy: 'General',
        label: 'Numbered List',
        tooltip: 'Create a numbered list',
        iconCss: 'e-icons e-list-ordered',
        shortcut: `Ctrl+Shift+9`
      },
      {
        id: 'divider-command',
        type: 'Divider',
        groupBy: 'General',
        label: 'Divider',
        tooltip: 'Add a horizontal line',
        iconCss: 'e-icons e-be-divider',
        shortcut: `Ctrl+Shift+-`
      },
      {
        id: 'code-command',
        type: 'Code',
        groupBy: 'Insert',
        label: 'Code',
        tooltip: 'Insert a code block',
        iconCss: 'e-icons e-insert-code',
        shortcut: `Ctrl+Alt+k`
      },
      {
        id: 'table-command',
        type: 'Table',
        groupBy: 'Insert',
        label: 'Table',
        tooltip: 'Insert a table block',
        iconCss: 'e-icons e-table-2',
        shortcut: `Ctrl+Alt+T`
      },
      {
        id: 'paragraph-command',
        type: 'Paragraph',
        groupBy: 'Text Styles',
        label: 'Paragraph',
        tooltip: 'Add a paragraph',
        iconCss: 'e-icons e-be-paragraph',
        shortcut: `Ctrl+Alt+P`
      },
      {
        id: 'heading1-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 1',
        tooltip: 'Page title or main heading',
        iconCss: 'e-icons e-be-h1',
        shortcut: `Ctrl+Alt+1`
      },
      {
        id: 'heading2-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 2',
        tooltip: 'Section heading',
        iconCss: 'e-icons e-be-h2',
        shortcut: `Ctrl+Alt+2`
      },
      {
        id: 'heading3-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 3',
        tooltip: 'Subsection heading',
        iconCss: 'e-icons e-be-h3',
        shortcut: `Ctrl+Alt+3`
      },
      {
        id: 'heading4-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 4',
        tooltip: 'Smaller heading for nested content',
        iconCss: 'e-icons e-be-h4',
        shortcut: `Ctrl+Alt+4`
      },
      {
        id: 'quote-command',
        type: 'Quote',
        groupBy: 'Text Styles',
        label: 'Quote',
        tooltip: 'Insert a quote block',
        iconCss: 'e-icons e-blockquote',
        shortcut: `Ctrl+Alt+Q`
      }
    ],
  }

  // Block Editor
  const inlineToolbarItems = ['Bold', 'Italic', 'Underline', 'Strikethrough'];

  const blockEditor: BlockEditor = new BlockEditor({
    height: '602px',
    inlineToolbarSettings: {
      popupWidth: '180px',
      enable: true,
      items: inlineToolbarItems,
    },
    commandMenuSettings: BlockcommandMenu,
    blocks: []
  });
  blockEditor.appendTo('#block-editor');
  // Load turndown and its plugin dynamically (mirrors markdownBlocks copy.js)
  loadExternalFile();

  // Download current editor content as Markdown
  function downloadMarkdown(): void {
    let htmlContent = '';
    try {
      htmlContent = (blockEditor as any).getDataAsHtml();
    } catch (e) {
      return;
    }
    const markdown = turndownService.turndown(htmlContent || '');
    let fileName = 'document.md';
    const lastCrumb = breadcrumbItems && breadcrumbItems[breadcrumbItems.length - 1] && (breadcrumbItems[breadcrumbItems.length - 1].text as string | undefined);
    if (lastCrumb) {
      const safe = (lastCrumb as string).replace(/[\\/:*?"<>|]+/g, '').trim() || 'document';
      fileName = `${safe}.md`;
    }
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    try {
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  // Wire download handler to the button element
  if (downloadBtn.element) {
    downloadBtn.element.addEventListener('click', downloadMarkdown);
  }

  function loadContent(mdFile: string): void {
  fetch(mdFile)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${mdFile}: ${res.status}`);
      return res.text();
    })
    .then(md => MarkdownConverter.toHtml(md))
    .then(html => blockEditor.parseHtmlToBlocks(html as string))
    .then(blocks => blockEditor.renderBlocksFromJson(blocks, true))
    .catch(() => {
      blockEditor.renderBlocksFromJson([{
        id: 'load-error',
        type: 'Paragraph',
        content: [{ type: 'Text', content: 'Failed to load or parse the markdown file.' }]
      }], true);
    });
}

  // Initial content load
  setTimeout(() => {
    loadContent('https://ej2.syncfusion.com/demos/src/block-editor/Team%20Sessions.md');
    breadcrumbItems = [{ text: 'Team' }, { text: 'Team Sessions' }];
    breadcrumb.items = breadcrumbItems;
    breadcrumb.dataBind();
  }, 100);
};