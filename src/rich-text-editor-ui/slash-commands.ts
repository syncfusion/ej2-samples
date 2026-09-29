import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI, SlashCommand} from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

(window as any).default = (): void => {
    loadCultureFiles();
    const formatRTE: RichTextEditorUI = new RichTextEditorUI({
        slashCommandSettings: {
            enable: true,
        },
        placeholder: 'Type "/" and choose format.'
    });
    formatRTE.appendTo('#editor');
};
