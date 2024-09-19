import { loadCultureFiles } from '../common/culture-loader';
/**
 * Tooltip api sample
 */
import { Tooltip } from '@syncfusion/ej2-popups';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
  //Initialize Button component
  let button: Button = new Button();
  //Render initialized Button component
  button.appendTo('#default');

  // defined the array of data
  let data: string[] = ['Hover', 'Click', 'Auto'];

  //Initialize CheckBox component
  let check: CheckBox = new CheckBox({
    checked: false,
    change: stickyChange
  });
  //Render initialized CheckBox component
  check.appendTo('#sticky');

  // initialize DropDownList component
  let dropDownListObject: DropDownList = new DropDownList({
    //set the data to dataSource property
    dataSource: data,
    // set placeholder to DropDownList input element
    placeholder: 'Select mode',
    // set change event for mode change in Tooltip
    change: onModeChange
  });
  // render initialized DropDownList
  dropDownListObject.appendTo('#ddlelement');

  // initialize the Numeric Textbox for height
  let height: NumericTextBox = new NumericTextBox({
    //set height for Tooltip
    value: 45,
    // set change event for height change in Tooltip
    change: onHeightChange
  });
  // render initialized Numeric Textbox
  height.appendTo('#height');

  // initialize the Numeric Textbox for width
  let width: NumericTextBox = new NumericTextBox({
    //set width for Tooltip
    value: 100,
    // set change event for width change in Tooltip
    change: onWidthChange
  });
  // render initialized Numeric Textbox
  width.appendTo('#width');

  //Initialize Tooltip component
  let tooltip: Tooltip = new Tooltip({
    //Set tooltip content
    content: 'Tooltip content',
    //Set open mode for Tooltip
    opensOn: 'Click',
    //Set tooltip position
    position: 'TopCenter',
    windowCollision: true
  });
  //Render initialized Tooltip component
  tooltip.appendTo('#default');

  //change event handler for height change in Tooltip
  function onHeightChange(args: any): void {
    tooltip.height = args.value;
    tooltip.refresh(tooltip.element);
  }

  //change event handler for width change in Tooltip
  function onWidthChange(args: any): void {
    tooltip.width = args.value;
    tooltip.refresh(tooltip.element);
  }

  //change event handler for mode change in Tooltip
  function onModeChange(args: any): void {
    tooltip.opensOn = args.value;
    tooltip.close();
  }

  //change event handler for sticky mode in Tooltip
  function stickyChange(args: any): void {
    tooltip.isSticky = args.checked;
    tooltip.close();
  }

  //Attached scroll and click event listners in right pane
  if (document.getElementById('right-pane')) {
    document.getElementById('right-pane').addEventListener('click', onClick);
    document.getElementById('right-pane').addEventListener('scroll', onScroll);
  }

  //scroll event handler to close Tooltip while perfomring page scroll
  function onScroll(args: any): void {
    if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
      tooltip.close();
    }
  }

  //click event handler to close Tooltip while navigating to other tabs in right pane
  function onClick(args: any): void {
    if (args.target.parentNode.className === 'e-tab-text') {
      if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
        tooltip.close();
      }
    }
  }

  //change event handler for content change
  document.querySelector('#tooltipContentValue').addEventListener('change', function (): void {
    tooltip.content = this.value;
    tooltip.refresh(tooltip.element);
  });
};
