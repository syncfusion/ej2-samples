import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor } from '@syncfusion/ej2-blockeditor';
import * as data from './blockData.json';

type TemplateItem = {
  index?: string;
  icon?: string;
  name?: string;
  blocks?: any[];
};

(window as any).default = (): void => {
  loadCultureFiles();

  const blocksFromJson = (data as any)["blockTemplate"];
  const templates: TemplateItem[] = (blocksFromJson?.[0]?.page) || [];

  const headerTitleEl = document.querySelector('.selectedTitle') as HTMLElement | null;
  const cardsContainer = document.getElementById('cards-container') as HTMLElement | null;

  const blockEditorInstance: BlockEditor = new BlockEditor({ height: '500px' });
  blockEditorInstance.appendTo('#block-editor');
  blockEditorInstance.focusIn();

  let selectedCardId: string | null = null;

  function setHeaderTitle(icon?: string, name?: string): void {
    if (!headerTitleEl) return;
    headerTitleEl.textContent = `${icon || ''}${name || 'Untitled'}`;
  }

  function updateActiveCard(): void {
    if (!cardsContainer) return;
    const cards = cardsContainer.querySelectorAll('.template-card') as NodeListOf<HTMLElement>;
    cards.forEach((card) => {
      const idx = card.dataset.index ?? '';
      card.classList.toggle('active', idx === (selectedCardId ?? ''));
    });
  }

  function loadPage(templateData: TemplateItem | undefined): void {
    if (!templateData) return;

    selectedCardId = templateData.index ?? null;
    setHeaderTitle(templateData.icon, templateData.name);

    // Render the blocks
    blockEditorInstance.renderBlocksFromJson(templateData.blocks ?? [], true);

    updateActiveCard();

  }

  function checkIfScrollable(): void {
    if (!cardsContainer) return;
    const needsScroll = cardsContainer.scrollWidth > cardsContainer.clientWidth + 20;
    cardsContainer.classList.toggle('scrollable', needsScroll);
  }

  if (cardsContainer) {
    const cards = cardsContainer.querySelectorAll('.template-card') as NodeListOf<HTMLElement>;
    cards.forEach((card, index) => {
      const templateData = templates[index];
      if (!templateData) return;

      const idx = String(index);
      card.dataset.index = idx;
      if (!templateData.index) templateData.index = idx;

      card.addEventListener('click', () => {
        blockEditorInstance.focusIn();
        loadPage(templateData);
      });
    });
  }
  // Initial load: first template (Blank Page)
  if (templates.length > 0) {
    loadPage(templates[1]);
  }

  // Observe and resize handling
  let resizeObserver: ResizeObserver | undefined;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      checkIfScrollable();
    });
    resizeObserver.observe(document.body);
  }
  window.addEventListener('resize', checkIfScrollable);
  checkIfScrollable();
};