import { loadCultureFiles } from '../common/culture-loader';
import { CarouselButtonVisibility, Carousel } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Switch } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

   const carouselObj: Carousel = new Carousel({
      cssClass: 'api-carousel',
      interval: 3000,
      items: [
         { template: '#itemTemplate1' },
         { template: '#itemTemplate2' },
         { template: '#itemTemplate3' },
         { template: '#itemTemplate4' },
         { template: '#itemTemplate5' }
      ],
   });
   carouselObj.appendTo('#carousel');

   const showButtons: DropDownList = new DropDownList({
      change: (args: ChangeEventArgs) => {
         carouselObj.buttonsVisibility = args.value as CarouselButtonVisibility;
         carouselObj.dataBind();
      }
   });
   showButtons.appendTo('#showButtons');

   const interval: DropDownList = new DropDownList({
      change: (args: ChangeEventArgs) => {
         carouselObj.interval = args.value as number;
         carouselObj.dataBind();
      }
   });
   interval.appendTo('#interval');

   const showIndicators: Switch = new Switch({
      checked: true,
      change: function (args) {
         carouselObj.showIndicators = args.checked;
         carouselObj.dataBind();
      }
   });
   showIndicators.appendTo('#showIndicators');

   const showPlayButton: Switch = new Switch({
      checked: false,
      change: function (args) {
         carouselObj.showPlayButton = args.checked;
         carouselObj.dataBind();
      }
   });
   showPlayButton.appendTo('#showPlayButton');

   const autoPlay: Switch = new Switch({
      checked: true,
      change: function (args) {
         carouselObj.autoPlay = args.checked;
         carouselObj.dataBind();
      }
   });
   autoPlay.appendTo('#autoPlay');

   const infiniteLoop: Switch = new Switch({
      checked: true,
      change: function (args) {
         carouselObj.loop = args.checked;
         carouselObj.dataBind();
      }
   });
   infiniteLoop.appendTo('#loop');
};
