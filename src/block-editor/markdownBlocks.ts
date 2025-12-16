import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor } from '@syncfusion/ej2-blockeditor';
import {
  Breadcrumb, BreadcrumbItemModel,
  Sidebar, TreeView, NodeSelectEventArgs, Toolbar
} from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { MarkdownConverter } from "@syncfusion/ej2-markdown-converter";


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
      mdFile: './src/block-editor/Team Sessions.md',
      selected: true,
      expanded: true,
      children: [
        { id: '1', name: 'Meeting minutes.md', mdFile: './src/block-editor/Meeting minutes.md' },
        { id: '2', name: 'Brain storming.md', mdFile: './src/block-editor/Brain storming.md' },
        { id: '3', name: 'Retrospective.md', mdFile: './src/block-editor/Retrospective.md' }
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

  // Toolbar with templates
  const toolbar = new Toolbar({
    items: [
      { align: 'Left', template: '#breadcrumb' as any }
    ]
  });
  toolbar.appendTo('#toolbar');

  // Sidebar
  const sidebar = new Sidebar({
    enableDock: true,
    width: '220px',
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
        loadContent('./src/block-editor/Team Sessions.md');
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
        closeBtnEl.style.left = '202px';
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
    height: '597px',
    inlineToolbarSettings: {
      popupWidth: '180px',
      enable: true,
      items: inlineToolbarItems,
    },
    commandMenuSettings: BlockcommandMenu,
    blocks: []
  });
  blockEditor.appendTo('#block-editor');

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
    loadContent('./src/block-editor/Team Sessions.md');
    breadcrumbItems = [{ text: 'Team' }, { text: 'Team Sessions' }];
    breadcrumb.items = breadcrumbItems;
    breadcrumb.dataBind();
  }, 100);
};