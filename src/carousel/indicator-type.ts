import { loadCultureFiles } from '../common/culture-loader';
import { Carousel } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();

   const defaultCarouselObj: Carousel = new Carousel({
      cssClass: 'indicator-type',
      items: [
         { template: '<div class="e-slide">Slide 1</div>' },
         { template: '<div class="e-slide">Slide 2</div>' },
         { template: '<div class="e-slide">Slide 3</div>' },
         { template: '<div class="e-slide">Slide 4</div>' },
         { template: '<div class="e-slide">Slide 5</div>' }
      ],
      indicatorsType: "Default",
      autoPlay: false
   });
   defaultCarouselObj.appendTo('#default-carousel');

   const dynamicCarouselObj: Carousel = new Carousel({
      cssClass: 'indicator-type',
      items: [
         { template: '<div class="e-slide">Slide 1</div>' },
         { template: '<div class="e-slide">Slide 2</div>' },
         { template: '<div class="e-slide">Slide 3</div>' },
         { template: '<div class="e-slide">Slide 4</div>' },
         { template: '<div class="e-slide">Slide 5</div>' }
      ],
      indicatorsType: "Dynamic",
      autoPlay: false
   });
   dynamicCarouselObj.appendTo('#dynamic-carousel');

   const fractionCarouselObj: Carousel = new Carousel({
      cssClass: 'indicator-type',
      items: [
         { template: '<div class="e-slide">Slide 1</div>' },
         { template: '<div class="e-slide">Slide 2</div>' },
         { template: '<div class="e-slide">Slide 3</div>' },
         { template: '<div class="e-slide">Slide 4</div>' },
         { template: '<div class="e-slide">Slide 5</div>' }
      ],
      indicatorsType: "Fraction",
      autoPlay: false
   });
   fractionCarouselObj.appendTo('#fraction-carousel');

   const progressCarouselObj: Carousel = new Carousel({
      cssClass: 'indicator-type',
      items: [
         { template: '<div class="e-slide">Slide 1</div>' },
         { template: '<div class="e-slide">Slide 2</div>' },
         { template: '<div class="e-slide">Slide 3</div>' },
         { template: '<div class="e-slide">Slide 4</div>' },
         { template: '<div class="e-slide">Slide 5</div>' }
      ],
      indicatorsType: "Progress",
      autoPlay: false
   });
   progressCarouselObj.appendTo('#progress-carousel');
};
