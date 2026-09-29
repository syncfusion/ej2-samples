import { loadCultureFiles } from '../common/culture-loader';

import { AIAssistView, PromptRequestEventArgs, TelemetryData, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { telemetrySuggestions  } from './promptResponseData';
import { getOpenAIModelAssistview } from '../common/ai-service';

/**
 * Telemetry sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let abortController: AbortController;
    let telemetryAIAssistView: AIAssistView = new AIAssistView({
        promptSuggestions: telemetrySuggestions,
        enableStreaming: true,
        promptRequest: onPromptRequest,
        stopRespondingClick: stopAIResponse,
        bannerTemplate: bannerContent,
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        },
        telemetrySettings: { enable: true }
    });
    telemetryAIAssistView.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        var telemetryData: TelemetryData | undefined;
        abortController = new AbortController();
        var result = await getOpenAIModelAssistview(args, abortController);
        if (result && result.usage) {
            // Map the usage details returned by the AI service to update the telemetry data.
            telemetryData = {
                model: result.model,
                inputTokens: result.usage.prompt_tokens,
                outputTokens: result.usage.completion_tokens,
                reasoningTokens: result.usage.completion_tokens_details.reasoning_tokens,
                cachedInputTokens: result.usage.prompt_tokens_details.cached_tokens
            };
        }
        telemetryAIAssistView.addPromptResponse(result.response, true, telemetryData);
        telemetryAIAssistView.promptSuggestions = telemetrySuggestions;
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            telemetryAIAssistView.prompts = [];
            telemetryAIAssistView.promptSuggestions = telemetrySuggestions;
            stopAIResponse();
        }
    }

    function bannerContent(): string {
        return `<div class="banner-content">
                    <div class="e-icons e-assistview-icon">
                    </div><h3>AI Telemetry</h3>
                    <i>Send a prompt or pick a suggestion to see telemetry metrics for the turn.</i>
                </div>`;
    }

    function stopAIResponse() {
        if (abortController) {
            abortController.abort();
        }
    }
};
