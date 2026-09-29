import { Chart } from "@syncfusion/ej2-charts/src/chart/chart";

async function fingerPrint(): Promise<string | null> {
  try {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 300;
    canvas.style.display = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    const size = 24;
    const diamondSize = 28;
    const gap = 4;
    const startX = 30;
    const startY = 30;
    const blue = "#1A3276";
    const orange = "#F28C00";

    const colorMap: string[][] = [
      ["blue", "blue", "diamond"],
      ["blue", "orange", "blue"],
      ["blue", "blue", "blue"]
    ];

    const drawSquare = (x: number, y: number, color: string): void => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
    };

    const drawDiamond = (centerX: number, centerY: number, size: number, color: string): void => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size / 2);
      ctx.lineTo(centerX + size / 2, centerY);
      ctx.lineTo(centerX, centerY + size / 2);
      ctx.lineTo(centerX - size / 2, centerY);
      ctx.closePath();
      ctx.fill();
    };

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const type = colorMap[row][col];
        const x = startX + col * (size + gap);
        const y = startY + row * (size + gap);
        if (type === "blue") drawSquare(x, y, blue);
        else if (type === "orange") drawSquare(x, y, orange);
        else if (type === "diamond") drawDiamond(x + size / 2, y + size / 2, diamondSize, orange);
      }
    }

    ctx.font = "20px Arial";
    ctx.fillStyle = blue;
    ctx.textBaseline = "middle";
    ctx.fillText("Syncfusion", startX + 3 * (size + gap) + 20, startY + size + gap);

    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath(); ctx.arc(50, 200, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath(); ctx.arc(100, 200, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.beginPath(); ctx.arc(75, 250, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(200, 200, 75, 0, Math.PI * 2, true);
    ctx.arc(200, 200, 25, 0, Math.PI * 2, true);
    ctx.fill("evenodd");

    const sha256 = async (str: string): Promise<string> => {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => ('0' + b.toString(16)).slice(-2)).join('');
    };
    const visitorID = await sha256(canvas.toDataURL());
    document.body.removeChild(canvas); // Clean up the canvas element
    return visitorID;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
}

export const serverAIRequest = async (settings: any): Promise<any> => {
    try {
        const visitorId = await fingerPrint();
        let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitorId,
                messages: settings
            })
        })
        let result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok');
        }
        result.response = result.response.replace('END_INSERTION', '');
        return result.response;
    } catch (error) {
        if (error.message.includes('token limit')) {
            document.querySelector('.banner-message').innerHTML = error.message;
            document.querySelector('.sb-token-header').classList.remove('sb-hide');
        }
        else if (error.message.includes('Failed to fetch')) {
            console.warn("To test these samples locally, configure and use your own API key.");
        }
        else {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
};

export const getOpenAiModelRTE = async (subQuery: string, promptQuery: string): Promise<any> => {
    try {
        const visitorId = await fingerPrint();
        // Make a POST request to the /api/rte endpoint with the required data.
        let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/rte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitorId,
                subQuery,
                promptQuery
            })
        });

        let result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok');
        }
        return result.response;
    } catch (error) {
        if (error.message.includes('token limit')) {
            document.querySelector('.banner-message').innerHTML = error.message;
            document.querySelector('.sb-token-header').classList.remove('sb-hide');
        }
        else if (error.message.includes('Failed to fetch')) {
            console.warn("To test these samples locally, configure and use your own API key.");
        } 
        else {
            console.error('There was a problem with your fetch operation:', error);
        }  
    }
};

export const OpenAiModelKanban = async (promptQuery: string): Promise<any> => {
    try {
        const visitorId = await fingerPrint();
        let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/kanban', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitorId,
                promptQuery
            })
        })
        let result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok');
        }
        result.response = result.response.replace('END_INSERTION', '');
        return result.response;
    } catch (error) {
        if (error.message.includes('token limit')) {
            document.querySelector('.banner-message').innerHTML = error.message;
            document.querySelector('.sb-token-header').classList.remove('sb-hide');
        }
        else if (error.message.includes('Failed to fetch')) {
            console.warn("To test these samples locally, configure and use your own API key.");
        }
        else {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
};

export async function getUserID(): Promise<string> {
    return fingerPrint();
}

function getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() ?? '';
}

function isTextFile(fileName: string) {
    const textExtensions: string[] = ['txt', 'md', 'css', 'html', 'json', 'xml', 'js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'h', 'cs', 'rb', 'php', 'csv', 'readme', 'doc', 'docx'];
    const ext = getFileExtension(fileName);
    return textExtensions.includes(ext);
}

function isImageFile(fileName: string) {
    const imageExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const ext = getFileExtension(fileName);
    return imageExtensions.includes(ext);
}

async function getFileContext( attachedFiles: any ): Promise<any> {

    const fileContents: any = [];

    const filePromises: Promise<void>[] = attachedFiles.map(
        (file: any) =>
            new Promise<void>((resolve, reject) => {
                if (!file.rawFile) {
                    resolve();
                    return;
                }
                const reader = new FileReader();
                const fileName = file.name;
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const fileType: 'text' | 'image' | 'binary' = isTextFile(fileName) ? 'text' : isImageFile(fileName) ? 'image' : 'binary';
                    fileContents.push({
                        name: fileName,
                        type: file.type,
                        fileType,
                        content: e.target?.result ?? null
                    });
                    resolve();
                };
                reader.onerror = () => {
                    reject(
                        new Error(`Error reading file: ${fileName}`)
                    );
                };
                if (isTextFile(fileName)) {
                    reader.readAsText(file.rawFile);
                } else {
                    reader.readAsDataURL(file.rawFile);
                }
            })
    );
    await Promise.all(filePromises);
    return fileContents;
}

export async function getOpenAIModelAssistview(args: any, abortController: AbortController): Promise<any> {
    try {
        let fileContents: any = [];
        let aiPrompt: string = args.prompt;
        if (args.attachedFiles && args.attachedFiles.length > 0) {
            fileContents = await getFileContext(args.attachedFiles);
            let attachedFileContext: string = 'Attached Files:\n';
            fileContents.forEach((file: any) => {
                attachedFileContext += '\n--- File: ' + file.name + ' (Type: ' + file.type + ', File Type: ' + file.fileType + ') ---\n';

                if (file.fileType === 'text') {
                    attachedFileContext += file.content + '\n';
                } else if (file.fileType === 'image') {
                    attachedFileContext += '[Image file: ' + file.name + ' - Base64 encoded data available]\n';
                    attachedFileContext += file.content + '\n';
                } else {
                    attachedFileContext += '[Binary file: ' + file.name + ' - Please process this file]\n';
                    attachedFileContext += file.content.substring(0, 500) + '...\n';
                }
            });
            aiPrompt = attachedFileContext + '\n\nUser Prompt: ' + args.prompt;
        }

        const userID: string | null = await getUserID();
        if (!userID) {
            return { response: 'Failed to generate user ID. Please try again later.' };
        }
        const systemPrompt: string = args.systemPrompt || 'You are a helpful assistant.';
        const requestBody: any = {
            visitorId: userID,
            messages: {
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: aiPrompt }
                ]
            }
        };
        if (fileContents && fileContents.length > 0) {
            requestBody.fileContents = fileContents;
        }
        const response: Response = await fetch(AI_SERVICE_URL + '/api/assistview', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            signal: abortController ? abortController.signal : undefined
        });
        if (!response.ok) {
            const errorData: { error?: string } = await response.json();
            throw new Error(errorData.error || ("HTTP Error " + response.status));
        }
        // Handle plain-text responses (e.g., moderated input) that do not return usage details.
        const result: any = await response.json().catch(
            async (): Promise<any> => {
                return { response: await response.text() };
            }
        );
        const aiResponse: string = result.response ? result.response.replace('END_INSERTION', '') : 'We could not reach the AI service; please try again later.';
        // Return the response along with the model and usage details returned by the AI service.
        return { response: aiResponse, model: result.model, usage: result.usage };
    } catch (error: any) {
        if (error.name === "AbortError") {
            return null;
        } else if (error.message && error.message.indexOf("token limit") !== -1) {
            return { response: error.message };
        }
        return { response: 'We could not reach the AI service; please try again later.' };
    }
};

export async function getAIResponse(args: any, abortController: any): Promise<any> {
    try {
        let aiPrompt: any = args.prompt;
        let fileContents: any = [];
        if (args.attachedFiles && args.attachedFiles.length > 0) {
            fileContents = await getFileContext(args.attachedFiles);
            let attachedFileContext = 'Attached Files:\n';
            fileContents.forEach(function(file: any) {
                attachedFileContext += '\n--- File: ' + file.name + ' (Type: ' + file.type + ', File Type: ' + file.fileType + ') ---\n';
                
                if (file.fileType === 'text') {
                    attachedFileContext += file.content + '\n';
                } else if (file.fileType === 'image') {
                    attachedFileContext += '[Image file: ' + file.name + ' - Base64 encoded data available]\n';
                    attachedFileContext += file.content + '\n';
                } else {
                    attachedFileContext += '[Binary file: ' + file.name + ' - Please process this file]\n';
                    attachedFileContext += file.content.substring(0, 500) + '...\n';
                }
            });
            aiPrompt = attachedFileContext + '\n\nUser Prompt: ' + args.prompt;
        }
        const userID = await getUserID();
        if (!userID) {
            return 'Failed to generate user ID. Please try again later.';
        }
        const abortSignal = abortController ? abortController.signal : undefined;
        var systemPrompt = args.systemPrompt || 'You are a helpful assistant.';
        let requestBody: any = {
            visitorId: userID,
            messages: {
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: aiPrompt }
                ]
            },
            fileContents: [] as any[]
        };
        if (fileContents && fileContents.length > 0) {
            requestBody.fileContents = fileContents;
        }
        const response = await fetch(AI_SERVICE_URL + '/api/chat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            signal: abortSignal
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || ("HTTP Error " + response.status));
        }
        const result = await response.json();
        if (args.systemPrompt) {
            return result;
        }
        if (result && result.response) {
            const aiResponse = result.response.replace('END_INSERTION', '');
            return aiResponse;
        }
    } catch (error: any) {
        if (error.name === "AbortError") {
            return null;
        } else if (error.message && error.message.indexOf("token limit") !== -1) {
            const bannerElement = document.querySelector(".banner-message");
            if (bannerElement) { bannerElement.innerHTML = error.message; }
            const headerElement = document.querySelector(".sb-header1");
            if (headerElement) { headerElement.classList.remove("sb-hide"); }
            return error.message;
        }
        else if (error.message.includes('Failed to fetch')) {
            console.warn("To test these samples locally, configure and use your own API key.");
        }
        return 'We could not reach the AI service; please try again later.';
    }
};


/* Startr Chart Code */

export async function fetchAI (prompt: string, chart: Chart, state: object, raw: any[]) {
    try {
        const response = await serverAIRequest({
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: JSON.stringify(raw) }
            ]
        });

        return typeof response === 'string'
            ? JSON.parse(response)
            : response;

    } catch (e) {
        console.error('fetchAI error:', e);
        return {
            props: {
                series: [{
                    dataSource: raw
                }]
            }
        };
    }
};

export function executeChartAction (data: any, chart: Chart, includedProps?: object) {
  if (data?.props) {
    chart.setProperties(data.props, false);
  }
};

type ChartPoint = { date: Date; high: number; low: number; open: number; close: number };

export async function fetchStockChartAI(
  userPrompt: string,
  chart: Chart,
  chartState: any,
  originalData: ChartPoint[],
): Promise<any> {
  const schema = generateChartSchema('Chart');

  const systemPrompt = `
Return ONLY the cleaned/forecast lines in "yyyy-MM-dd:High:Low:Open:Close".
We will set series[0].dataSource from your lines. Do not change chart configuration.

Current chart state: ${JSON.stringify(chartState)}
Schema (for reference): ${JSON.stringify(schema)}
`;

  const aiOutput = await serverAIRequest({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  if (!aiOutput) {
    return { props: {}, explanation: 'Empty AI output', confidence: 0 };
  }

  const cleanedText =
    aiOutput.includes('```') ? aiOutput.split('```')[1].trim() : aiOutput.trim();

  const parsed = parseLinesToPoints(cleanedText, originalData);

  return {
    props: {
      series: [{ dataSource: parsed }],
    },
    includedProps: ['DataSource'],
    ignoreProps: schema.ignoreProps.default,
    explanation: 'Appended 35 realistic OHLC rows to dataSource for forecasting.',
    confidence: 0.95,
  };
}

function parseLinesToPoints(text: string, original: ChartPoint[]): ChartPoint[] {
  const lines = text.split('\n').filter(l => l.trim().length);
  const out: ChartPoint[] = [];
  for (const line of lines) {
    const [stamp, highStr, lowStr, openStr, closeStr] = line.split(':').map(s => s.trim());
    if (!stamp || !highStr || !lowStr || !openStr || !closeStr) continue;

    const [y, M, d] = stamp.split('-').map(n => parseInt(n, 10));
    const date = new Date(y, M - 1, d);
    const high = parseFloat(highStr);
    const low = parseFloat(lowStr);
    const open = parseFloat(openStr);
    const close = parseFloat(closeStr);
    if ([high, low, open, close].some(v => Number.isNaN(v))) continue;

    out.push({ date, high, low, open, close });
  }
  return [...original, ...out];
}

export const generateChartSchema = (componentType = 'Chart') => ({
  title: 'Syncfusion Universal AI Response (Chart)',
  type: 'object',
  props: {
    componentType: { type: 'string', const: componentType },
    properties: { type: 'object', properties: {} },
  },
  includedProps: {
    type: 'array',
    items: { type: 'string' },
    default: ['DataSource'],
  },
  ignoreProps: {
    type: 'array',
    items: { type: 'string' },
    default: [
      'primaryXAxis',
      'primaryYAxis',
      'legendSettings',
      'chartArea',
      'series.type',
      'theme',
      'palettes',
      'tooltip',
      'locale',
      'enableRtl',
      'cssClass',
      'created',
      'destroyed',
      'height',
      'width',
    ],
  },
  explanation: { type: 'string' },
  confidence: { type: 'number', minimum: 0, maximum: 1 },
   required: ['props', 'explanation', 'includedProps', 'ignoreProps', 'confidence'],
  additionalProperties: true
})

function getRandomLeadIn(): string {
  const lines = [
        "Here's the chart based on your request:",
        "Your data visualization is ready:",
        "Generated chart as per your input:",
        "This chart illustrates the information you asked for:",
        "Here's what your data looks like in chart form:",
        "Hope this chart helps you see the trends clearly!",
        "Transformed your idea into a visual story:",
        "Turning numbers into visuals—here's your chart!"
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

export const fetchAIForAssistViewPayload = async function (text: any): Promise<any> {
    var isChart = isChartRequest(text);
    var cfg = await fetchAIConfig(text);
    (cfg.series || []).forEach(function (s) { s.visible = true; });
    var leadIn = isChart
        ? getRandomLeadIn()
        : "Here's a sample chart - include the keyword 'chart' (or 'graph', 'plot', 'pie', 'line', etc.) to describe the kind of visualisation you want.";
    return { Text: leadIn, CHART: true, ChartConfig: cfg };
};

// -----------------------------------------------------------------------
// Keyword detection
// -----------------------------------------------------------------------
function isChartRequest(text: any): boolean {
    if (!text) return false;
    var t = String(text).toLowerCase();
    var keywords = [
        'chart', 'graph', 'plot', 'visualize', 'visualization', 'data',
        'statistics', 'bar', 'pie', 'line', 'area', 'column', 'doughnut',
        'comparison', 'track', 'compare', 'display'
    ];
    for (var i = 0; i < keywords.length; i++) {
        if (t.indexOf(keywords[i]) >= 0) return true;
    }
    return false;
}

async function fetchAIConfig(text: string | undefined): Promise<ChartConfig> {
    if (!text) return generateDefaultChartConfig('');

    const schema = generateChartSchema('chart');
    const systemPrompt = buildChartSystemPrompt();
    let raw: string | undefined;
    try {
        raw = await serverAIRequest({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text }
        ],
        schema
        });
    } catch {
        raw = undefined;
    }

    if (!raw) return generateDefaultChartConfig(text);

    // Extract JSON from possibly fenced text
    const extractJson = (s: string): string | undefined => {
        const fenceJson = s.match(/```json\s*([\s\S]*?)```/i)?.[1]?.trim();
        if (fenceJson) return fenceJson;
        const fenceAny = s.match(/```\s*([\s\S]*?)```/i)?.[1]?.trim();
        if (fenceAny) return fenceAny;
        const first = s.indexOf('{');
        const last = s.lastIndexOf('}');
        if (first !== -1 && last !== -1 && last > first) return s.slice(first, last + 1).trim();
        return undefined;
    };

    const jsonStr = extractJson(raw);
    if (!jsonStr) return generateDefaultChartConfig(text);

    let data: any;
    try {
        data = JSON.parse(jsonStr);
    } catch {
        return generateDefaultChartConfig(text);
    }

    // Pull both envelopes if present
    const props = data?.props ?? {};
    const properties = data?.properties ?? {};
    // Also support older shapes
    const pFallback =
        data?.props?.properties ??
        data?.properties ??
        data?.props ??
        data;

    let series: any[] = Array.isArray(pFallback?.series) ? pFallback.series : [];

    if (!series.length) return generateDefaultChartConfig(text);

    const seriesTypes = new Set(series.map((s: any) => String(s?.type ?? '').toLowerCase()));
    let chartType: 'cartesian' | 'circular' | undefined =
        pFallback?.chartType && (pFallback.chartType === 'cartesian' || pFallback.chartType === 'circular')
        ? pFallback.chartType
        : undefined;

    if (!chartType) {
        // `seriesTypes` is a `Set<string>`; spread iteration isn't supported
        // under the project's `target: es5` tsconfig, so use `Array.from`.
        const anyCircular = Array.from(seriesTypes).some(t => t === 'pie' || t === 'doughnut' || t === 'donut');
        chartType = anyCircular ? 'circular' : 'cartesian';
    }

    const cfg: ChartConfig = {
        chartType,
        title: props?.title ?? pFallback?.title ?? 'Chart',
        showLegend: (typeof props?.legend === 'boolean' ? props.legend : undefined) ??
                    (pFallback?.showLegend !== undefined ? !!pFallback.showLegend : true),
        sideBySidePlacement: !!pFallback?.sideBySidePlacement,
        series
    };

    if (chartType === 'cartesian') {
        const xTitle = props?.xAxis[0].title;
        const yTitle = props?.yAxis[0].title;
        cfg.xAxis = Array.isArray(pFallback?.xAxis) && pFallback.xAxis.length
        ? pFallback.xAxis
        : [{ type: 'category', title: xTitle, labelRotation: 0 }];
        cfg.yAxis = Array.isArray(pFallback?.yAxis) && pFallback.yAxis.length
        ? pFallback.yAxis
        : [{ type: 'numerical', title: yTitle, min: 0 }];
    }

    return cfg;
}

function buildChartSystemPrompt(): string {
  return `
You are a data visualization assistant.
Return ONLY JSON with this envelope and field names:
- Must include "props" and "properties".
- "properties" MUST include "series": array of series objects.
- Do NOT return "properties.data".
        ### Supported Chart Types
        - **Chart Type**: Only 'cartesian' or 'circular'
        - **Series Types**: Line, Column, Spline, Area, Pie, Doughnut
Shape:
{
  "props": {
    "chartType": "cartesian | circular",
    "title": "<Chart Title>",
    "showLegend": true,
    "sideBySidePlacement": true | false,
    "xAxis": [ { "type": "category | numerical | datetime | logarithmic", "title": "xvalue", "labelRotation": 0 } ],
    "yAxis": [ { "type": "numerical | logarithmic", "title": "yvalue", "min": 0 } ]
  },
  "properties": {
    "series": [
      {
        "type": "line | column | spline | area | pie | doughnut",
        "name": "<Series Name>",
        "dataSource": [   { "xvalue": "North", "yvalue": 100 },
                { "xvalue": "South", "yvalue": 80 },
                { "xvalue": "East", "yvalue": 60 },
                { "xvalue": "West", "yvalue": 90 } ],
        "tooltip": true | false
      }
    ]
  }
}
Rules:
- Infer chartType from keywords.
- Title: Derive a meaningful title from the user input.
- For cartesian charts, include xAxis and yAxis.
- Use xvalue/yvalue pairs in dataSource.
- Default showLegend to true.
- Data Source: Always include 'xvalue' and 'yvalue' pairs.
- Return ONLY JSON, no code fences.
`.trim();
}

// Local ChartConfig interface (was previously imported as a default from
// `../frontend/smart-chart-functional`, which made it a self-reference and
// a value, not a type - the build error said:
//   'ChartConfig' refers to a value, but is being used as a type here.
export interface ChartConfig {
  chartType: 'cartesian' | 'circular';
  title: string;
  showLegend: boolean;
  sideBySidePlacement?: boolean;
  series: any[];
  xAxis?: any[];
  yAxis?: any[];
}

function generateDefaultChartConfig(text: string | undefined): ChartConfig {
  const lower = (text || '').toLowerCase();

  if (lower.includes('pie') || lower.includes('doughnut')) {
    return { chartType: 'circular', title: 'Sample Pie Chart', showLegend: true, series: [{
      type: 'pie', name: 'Market Share', tooltip: true,
      dataSource: [{ xvalue: 'A', yvalue: 40 }, { xvalue: 'B', yvalue: 30 }, { xvalue: 'C', yvalue: 20 }, { xvalue: 'D', yvalue: 10 }]
    }] };
  }
  if (lower.includes('line') || lower.includes('trend')) {
    return { chartType: 'cartesian', title: 'Sample Line Chart', showLegend: true,
      xAxis: [{ type: 'category', title: 'Time Period' }], yAxis: [{ type: 'numerical', title: 'Values' }],
      series: [{ type: 'line', name: 'Trend Data', tooltip: true,
        dataSource: [{ xvalue: 'Q1', yvalue: 21 }, { xvalue: 'Q2', yvalue: 24 }, { xvalue: 'Q3', yvalue: 36 }, { xvalue: 'Q4', yvalue: 38 }] }] };
  }
  if (lower.includes('area')) {
    return { chartType: 'cartesian', title: 'Sample Area Chart', showLegend: true,
      xAxis: [{ type: 'category', title: 'Months' }], yAxis: [{ type: 'numerical', title: 'Revenue' }],
      series: [{ type: 'area', name: 'Revenue', tooltip: true,
        dataSource: [{ xvalue: 'Jan', yvalue: 10 }, { xvalue: 'Feb', yvalue: 20 }, { xvalue: 'Mar', yvalue: 30 }, { xvalue: 'Apr', yvalue: 40 }, { xvalue: 'May', yvalue: 50 }, { xvalue: 'Jun', yvalue: 60 }] }] };
  }
  return { chartType: 'cartesian', title: 'Sample Column Chart', showLegend: true, sideBySidePlacement: true,
    xAxis: [{ type: 'category', title: 'Categories' }], yAxis: [{ type: 'numerical', title: 'Values' }],
    series: [{ type: 'column', name: 'Sales Data', tooltip: true,
      dataSource: [{ xvalue: 'Jan', yvalue: 35 }, { xvalue: 'Feb', yvalue: 28 }, { xvalue: 'Mar', yvalue: 34 }],
    }]
  };
}



/* End Chart Code */

export const AI_SERVICE_URL: string = 'https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net'