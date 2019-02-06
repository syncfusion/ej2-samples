import { loadCultureFiles } from '../common/culture-loader';
/**
 * InPlaceEditor Form Sample
 */

import { InPlaceEditor, Rte, MultiSelect, ActionEventArgs, RenderMode } from '@syncfusion/ej2-inplace-editor';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
InPlaceEditor.Inject(Rte, MultiSelect);

//tslint:disable: max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable-next-line:max-line-length
    let multiData: string[] = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
    let titleObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        emptyText: 'Enter your question title',
        name: 'Title',
        value: 'Succinctly E-Book about TypeScript',
        validationRules: {
            Title: { required: [true, 'Enter valid title'] },
        },
        model: {
            placeholder: 'Enter your question title'
        }
    });
    titleObj.appendTo('#inplace_title_editor');
    let tagObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        value: ['TypeScript', 'JavaScript'],
        type: 'MultiSelect', emptyText: 'Enter your tags',
        actionSuccess: (e: ActionEventArgs) => {
            e.value = chipCreation(e.value.split(','));
        }, name: 'Tag',
        popupSettings: { model: { width: 'auto' } },
        validationRules: {
            Tag: { required: [true, 'Enter valid tags'] },
        },
        model: {
            mode: 'Box',
            dataSource: multiData,
            placeholder: 'Enter your tags'
        }
    });
    tagObj.appendTo('#inplace_tag_editor');
    let rteObj: InPlaceEditor = new InPlaceEditor({
        mode: 'Inline',
        submitOnEnter: false, type: 'RTE',
        editableOn: 'EditIconClick',
        popupSettings: {
            model: {
                width: (<HTMLElement>document.querySelector('#inplace-editor-control.form-layout')).offsetWidth
            }
        },
        // tslint:disable-next-line:max-line-length
        value: 'The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.',
        name: 'rte',
        validationRules: {
            rte: { required: [true, 'Enter valid comments'] }
        },
        emptyText: 'Enter your comment',
        model: {
            toolbarSettings: {
                enableFloating: false,
                items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                    'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
            }
        }
    });
    rteObj.appendTo('#inplace_comment_editor');
    chipOnCreate();
    function chipOnCreate(): void {
        tagObj.element.querySelector('.e-editable-value').innerHTML = chipCreation(tagObj.value as string[]);
    }
    function chipCreation(data: string[]): string {
        let value: string = '<div class="e-chip-list">';
        [].slice.call(data).forEach((val: string) => {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
    }
    let editorMode: DropDownList = new DropDownList({
        width: '90%',
        change: changeEditorMode
    });
    // render initialized DropDownList component
    editorMode.appendTo('#editorMode_form');

    function changeEditorMode(e: DropDownChangeArgs): void {
        let mode: RenderMode = e.itemData.value as RenderMode;
        titleObj.mode = mode;
        titleObj.dataBind();
        tagObj.mode = mode;
        tagObj.dataBind();
        rteObj.mode = mode;
        rteObj.dataBind();
    }
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }
    function onScroll(args: any): void {
        if (editorMode.value === 'Inline') { return; }
        if (titleObj && (titleObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            titleObj.enableEditMode = false;
        }
        if (tagObj && (tagObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            tagObj.enableEditMode = false;
        }
        if (rteObj && (rteObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            rteObj.enableEditMode = false;
        }
    }
};
