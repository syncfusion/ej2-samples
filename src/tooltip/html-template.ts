import { loadCultureFiles } from '../common/culture-loader';
/**
 * Loading html template sample
 */
import { Browser } from '@syncfusion/ej2-base'
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/* tslint:disable */
(window as any).default = (): void => {
    loadCultureFiles();

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
    content: `<div id="democontent" class="democontent">
			<div class="info">
				<h3 style="margin-top:10px">Eastern Bluebird
				</h3>
        <hr style="margin: 9px 0px"/>
        <div id="bird" style="float:right"><img src="./src/tooltip/images/bird.png"
						 alt="" width="125" height="125"/></div>
				</div>
					<div>The
            <a href="https://en.wikipedia.org/wiki/Eastern_bluebird" target="_blank"> Eastern Bluebird</a>
            is easily found in open fields and sparse woodland areas, including along woodland edges.</div>
		</div>`,
    //Set tooltip position
    position: 'BottomCenter',
    //Set tooltip height
    height: Browser.isDevice ? '60%' : 'Auto',
    windowCollision: true
  });
  //Render initialized Tooltip component
  tooltip.appendTo('#content');

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
