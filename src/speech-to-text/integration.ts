import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { loadCultureFiles } from '../common/culture-loader';
import { SpeechToText, TranscriptChangedEventArgs } from '@syncfusion/ej2-inputs';
import { Toast } from '@syncfusion/ej2-notifications';

(window as any).default = () => {
    loadCultureFiles();

    // Initialize Toast notification for errors
    var toastObj : Toast = new Toast({
        position: {
            X: 'Right'
        },
        target: '.integration-control-section',
        cssClass: 'e-toast-danger'
    });
    toastObj.appendTo('#stt-toast');

    // Initialize AI AssistView component
    let aiAssistViewObj: AIAssistView = new AIAssistView({
        promptRequest: onPromptRequest,
        footerTemplate: "#footerContent",
        bannerTemplate: "#bannerContent",
        toolbarSettings: {
            items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
            itemClicked: toolbarItemClicked
        }
    });
    aiAssistViewObj.appendTo('#aiAssistView');

    // Initialize Speech-to-Text component
    let speechToTextObj : SpeechToText = new SpeechToText({
        transcriptChanged: onTranscriptChange,
        onStop: onListeningStop,
        created: onCreated,
        onError: onErrorHandler,
        cssClass: 'e-flat'
    });
    speechToTextObj.appendTo('#speechToText');

     // Handles AI prompt requests
    function onPromptRequest(): void {
        setTimeout(() => {
            aiAssistViewObj.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service.');
            toggleButtons();
        }, 2000);
    }

     // Handles toolbar button clicks
    function toolbarItemClicked(args: any): void {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.prompts = [];
        }
    }

    // Handles actions when speech listening stops
    function onListeningStop() {
        toggleButtons();
    }

    function onTranscriptChange(args: any): void {
        (document.querySelector('#assistview-footer') as HTMLElement).innerText = args.transcript;
    }

    // Handles actions after component creation
    function onCreated(): void {
        let assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        let sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;

        sendButton.addEventListener('click', sendIconClicked);
        assistviewFooter.addEventListener('input', toggleButtons);

        assistviewFooter.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                    sendIconClicked();
                    e.preventDefault(); // Prevent the default behavior of the Enter key
                }
        });

        toggleButtons();
    }

    // Toggles the visibility of the send and speech-to-text buttons
    function toggleButtons(): void {
        let assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        let sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;
        let speechButton = document.querySelector('#speechToText') as HTMLElement;

        let hasText = assistviewFooter.innerText.trim() !== '';
        sendButton.classList.toggle('visible', hasText);
        speechButton.classList.toggle('visible', !hasText);

        if (!hasText && (assistviewFooter.innerHTML === '<br>' || !assistviewFooter.innerHTML.trim())) {
            assistviewFooter.innerHTML = '';
        }
    }

    // Handles send button click event
    function sendIconClicked(): void {
        var assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        aiAssistViewObj.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    }

    // Handles errors and displays toast notifications
    function onErrorHandler(args: any) {
        toastObj.content = args.errorMessage;
        if (args.error === 'unsupported-browser') {
            speechToTextObj.disabled = true;
            toastObj.show({ timeOut: 0 });
        } else {
            toastObj.show({ timeOut: 5000 });
        }
    }

};
