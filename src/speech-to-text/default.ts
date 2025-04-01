import { loadCultureFiles } from '../common/culture-loader';
import { SpeechToText, TextArea } from '@syncfusion/ej2-inputs';
import { Button, Switch } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

(window as any).default = () => {
    loadCultureFiles();
    var isSupportedBrowser = true;

    // Initialize Speech to Text component
    let speechToTextObj: SpeechToText = new SpeechToText({
        transcriptChanged: onTranscriptChange,
        onStart: onListeningStart,
        onStop: onListeningStop,
        onError: onErrorHandler
    });
    speechToTextObj.appendTo('#speech-to-text');

    // Initialize TextArea for output
    let textareaObj: TextArea = new TextArea({
        rows: 10,
        resizeMode: 'None',
        cssClass: 'e-outline',
        placeholder: 'Transcribed text will appear here...',
        input: function() { toggleCopyButtonState(); }
    });
    textareaObj.appendTo('#output-textarea');

    // Initialize DropDownList for styling options
    let stylingDDLObj: DropDownList = new DropDownList({
        change: (args) => {
            speechToTextObj.cssClass = args.value;
        }
    });
    stylingDDLObj.appendTo('#stt-styling-ddl');

    // Initialize DropDownList for language options
    let langDDLObj: DropDownList = new DropDownList({
        change: (args) => {
            speechToTextObj.lang = args.value;
        }
    });
    langDDLObj.appendTo('#stt-lang-ddl');

    // Initialize Switch for interim results
    let interimSwitchObj: Switch = new Switch({
        checked: true,
        change: (args) => {
            speechToTextObj.allowInterimResults = args.checked;
        }
    });
    interimSwitchObj.appendTo('#interim-switch');

    // Initialize Switch for tooltip
    let tooltipSwitchObj: Switch = new Switch({
        checked: true,
        change: (args) => {
            speechToTextObj.showTooltip = args.checked;
        }
    });
    tooltipSwitchObj.appendTo('#tooltip-switch');

    // Initialize Switch for icon with text
    let iconWithTextSwitchObj: Switch = new Switch({
        change: (args) => {
            speechToTextObj.buttonSettings = {
                content: args.checked ? 'Start Listening' : '',
                stopContent: args.checked ? 'Stop Listening' : ''
            };
        }
    });
    iconWithTextSwitchObj.appendTo('#icon-with-text-switch');

    // Event handler for transcript change
    function onTranscriptChange(args: any) {
        if (!args.isInterimResult)
            args.transcript += ' ';

        textareaObj.value = args.transcript;
        toggleCopyButtonState();
    }

    // Event handler for listening start
    function onListeningStart() {
        if (isSupportedBrowser) {
            if (textareaObj.value)
                speechToTextObj.transcript = textareaObj.value + '\n';

            updateStatus('Listening... Speak now...');
        } else {
            updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        langDDLObj.enabled = false;
        interimSwitchObj.disabled = true;
    }

    // Event handler for listening stop
    function onListeningStop(args: any) {
        if (isSupportedBrowser) {
            if (args.isInteracted)
            updateStatus('Click the mic button to start speaking...');
        } else {
            updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        langDDLObj.enabled = true;
        interimSwitchObj.disabled = false;
    }

    // Event handler for errors
    function onErrorHandler(args: any) {
        updateStatus(args.errorMessage);

        if (args.error === 'unsupported-browser')
            isSupportedBrowser = false;
    }

     // Function to updates the speech recognition status message
    function updateStatus(status: string) {
        (document.querySelector('.speech-recognition-status') as HTMLElement).innerText = status;
    }

    function toggleCopyButtonState () {
        var copyButton = document.getElementById('transcript-copy-button') as HTMLButtonElement;
        var hasText = textareaObj.element.value.trim() !== '';
        copyButton.disabled = hasText ? false : true;
    }

     // Event listener for copy button
    (document.getElementById('transcript-copy-button') as HTMLElement).addEventListener('click', function() {
        let copyText = textareaObj.value;
        let copyBtnElem = this;

        if (copyText && navigator.clipboard) {
            navigator.clipboard.writeText(copyText).then(() => {
                copyBtnElem.innerText = 'Copied!';
                setTimeout(() => {
                    copyBtnElem.innerText = 'Copy';
                }, 1000);
            }).catch((err) => {
                console.error('Clipboard write failed', err);
            });
        }
    });

    // Event listener for clear button
    (document.getElementById('transcript-clear-button') as HTMLElement).addEventListener('click', () => {
        textareaObj.value = textareaObj.element.value = speechToTextObj.transcript = '';
        toggleCopyButtonState();
    });

};