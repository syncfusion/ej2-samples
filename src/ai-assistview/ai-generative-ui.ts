import { loadCultureFiles } from '../common/culture-loader';
import { AIAssistView, PromptRequestEventArgs, ToolbarItemClickedEventArgs } from "@syncfusion/ej2-interactive-chat";
import { Browser } from '@syncfusion/ej2/base';
import { Chart } from '@syncfusion/ej2/charts';
import { Grid } from '@syncfusion/ej2/grids';
import { generativeSuggestions, promptsData, toolSystemPrompt } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Generative UI sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const aiAssistViewInst = new AIAssistView({
        bannerTemplate: '#bannerContent',
        promptSuggestionsHeader: "Suggested Prompts",
        promptSuggestions: generativeSuggestions,
        enableStreaming: true,
        showClearButton: true,
        prompts: promptsData,
        toolbarSettings: {
            items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
            itemClicked: toolbarItemClicked
        },
        promptRequest: onPromptRequest
    });

    function weatherTemplate(args: any): string {
        const defaults = {
            location: 'Unknown Location',
            temperature: '--',
            condition: '--',
            humidity: '--',
            windSpeed: '--'
        };
        const data = Object.assign({}, defaults, args);
        
        return `<div tabindex="0" class="e-card" id="weather_card" role="button">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">${data.location}</div>
                    <div class="e-card-sub-title">${data.condition}</div>
                </div>
            </div>
            <div class="e-card-header weather_report">
                <div class="e-card-header-image"></div>
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">${data.temperature}</div>
                    <div class="e-card-sub-title">Humidity: ${data.humidity}</div>
                    <div class="e-card-sub-title">Wind: ${data.windSpeed}</div>
                </div>
            </div>
        </div>`;
    }

    // Registering generative tool UI
    aiAssistViewInst.registerToolUI({
        toolName: 'weather-card',
        template: weatherTemplate
    });
    //Registering chart component
    aiAssistViewInst.registerToolUI({
        toolName: 'chart-tool',
        template: '<div class="chartContainer"></div>',
        handler: function (container, args) {
            const chartArgs: any = args as any;
            const chartConfig = {
                dataSource: chartArgs.dataSource || chartArgs.data || [],
                xField: chartArgs.xField || chartArgs.xName,
                yField: chartArgs.yField || chartArgs.yName,
                chartType: chartArgs.chartType || chartArgs.type || 'Line'
            };
            if (chartConfig.chartType === 'Pie' || chartConfig.chartType === 'Doughnut') {
                chartConfig.chartType = 'Line';
            }
            const chart = new Chart({
                title: chartArgs.title || '',
                primaryXAxis: { valueType: 'Category', title: chartArgs.xAxisTitle || chartConfig.xField, labelIntersectAction: 'Rotate45' },
                primaryYAxis: { title: chartArgs.yAxisTitle || chartConfig.yField },
                tooltip: { enable: chartArgs.enableTooltip !== false },
                legendSettings: { visible: chartArgs.enableLegend !== false },
                series: [{
                    type: chartConfig.chartType,
                    dataSource: chartConfig.dataSource,
                    xName: chartConfig.xField,
                    yName: chartConfig.yField,
                    marker: { visible: true }
                }]
            });
            const chartElement: HTMLElement = container.querySelector('.chartContainer') as HTMLElement;
            chart.appendTo(chartElement);
        }
    });
    // Registering grid component
    aiAssistViewInst.registerToolUI({
        toolName: 'grid-tool',
        template: '<div class="gridContainer"></div>',
        handler: function (container, args) {
            const data: any = (args as any).data || [];
            const columns = (args as any).columns || (data.length ? Object.keys(data[0]).map(function (field) {
                return {
                    field: field,
                    headerText: field,
                    width: 150
                };
            }) : []);
            const grid = new Grid({
                dataSource: data,
                columns: columns,
                allowPaging: false,
                pageSettings: { pageSize: 8 },
                width: 'fit-content'
            });
            const gridElement: HTMLElement = container.querySelector('.gridContainer') as HTMLElement;
            grid.appendTo(gridElement);
        }
    });

    aiAssistViewInst.appendTo('#aiAssistView');

    async function onPromptRequest(args: PromptRequestEventArgs) {
        try {
            const aiArgs: any = {
                prompt: args.prompt,
                systemPrompt: toolSystemPrompt
            };
            const abortController: AbortController = new AbortController();
            const reply: any = await getAIResponse(aiArgs, abortController);
            const jsonText: any = reply.response || '{}';
            const aiData = JSON.parse(jsonText);
            
            aiAssistViewInst.addPromptResponse({ blocks: aiData.blocks || [{ blockType: 'text', content: "We could not reach the AI service; please try again later." }] });
        } catch (error) {
            aiAssistViewInst.addPromptResponse("We could not reach the AI service; please try again later.");
        }
    }

    function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = generativeSuggestions;
        }
    }
};
