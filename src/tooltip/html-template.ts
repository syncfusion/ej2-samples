/**
 * Loading html template sample
 */

import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/* tslint:disable */
(window as any).default = () => {

  //Initialize Button component
  let button: Button = new Button({ cssClass: 'e-outline', isPrimary: true });
  //Render initialized Button component
  button.appendTo('#content');

  //Initialize Tooltip component
  let tooltip: Tooltip = new Tooltip({
    cssClass: 'e-tooltip-template-css',
    //Set tooltip open mode
    opensOn: 'Click',
    //Set tooltip content
    content: '<div id="democontent" class="democontent">' +
      '<h3 style="margin-top:10px">Eastern Bluebird</h3>' +
      '<img id="bird" src="./src/tooltip/images/bird.png"/>' +
      '<p>The <a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank"> Eastern Bluebird</a> ' +
      'is easily found in open fields and sparse woodland areas, including along woodland edges. These' +
      'are cavity-nesting birds and a pair of eastern bluebirds will raise 2-3 broods annually, with 2-8 light blue' +
      'or whitish eggs per brood.</p>' +
      '<hr style="margin:10px 0" />' +
      '<p>Eastern bluebirds can be very vocal in flocks.' +
      'Their calls include a rapid, mid-tone chatter and several long dropping pitch calls.</p>' +
      '<p>Source:<br/>' +
      '<a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank">https://en.wikipedia.org/wiki/Eastern_bluebird</a>' +
      '</p>' +
      '</div>',
    //Raise beforeRender event
    beforeOpen: onBeforeRender
  });
  //Render initialized Tooltip component
  tooltip.appendTo('#content');

  //beforRender event handler for Tooltip
  function onBeforeRender(args: TooltipEventArgs): void {
    let htmlcontent: any = document.getElementById('democontent');
    htmlcontent.style.display = 'block';
    tooltip.content = htmlcontent;
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
};
