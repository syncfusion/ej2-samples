import { loadCultureFiles } from '../common/culture-loader';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Bar Customization sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize Slider component
    let heightSlider: Slider = new Slider({
        // Set the value for slider
        value: 30,
        min: 0, max: 100
    });
    heightSlider.appendTo('#height_slider');

    // Initialize Slider component
    let gradientSlider: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 0, max: 100,
        // Set the intial range values for slider
        value: 50,
        type: 'MinRange'
    });
    gradientSlider.appendTo('#gradient_slider');

    let sliderTrack: any;
    let sliderHandle: any;

    // Initialize Slider component
    let dynamicColorSlider: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 0, max: 100,
        value: 20,
        type: 'MinRange',
        // Handler used for slider created event
        created: () => {
            sliderTrack = document.getElementById('dynamic_color_slider').querySelector('.e-range');
            sliderHandle = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
            (sliderHandle as HTMLElement).style.backgroundColor = 'green';
            (sliderTrack as HTMLElement).style.backgroundColor = 'green';
        },
        // Handler used for slider change event
        change: (args: SliderChangeEventArgs) => {
            if (args.value > 0 && args.value <= 25) {
                // Change handle and range bar color to green when
                (sliderHandle as HTMLElement).style.backgroundColor = 'green';
                (sliderTrack as HTMLElement).style.backgroundColor = 'green';
            } else if (args.value > 25 && args.value <= 50) {
                // Change handle and range bar color to royal blue
                (sliderHandle as HTMLElement).style.backgroundColor = 'royalblue';
                (sliderTrack as HTMLElement).style.backgroundColor = 'royalblue';
            } else if (args.value > 50 && args.value <= 75) {
                // Change handle and range bar color to dark orange
                (sliderHandle as HTMLElement).style.backgroundColor = 'darkorange';
                (sliderTrack as HTMLElement).style.backgroundColor = 'darkorange';
            } else if (args.value > 75 && args.value <= 100) {
                // Change handle and range bar color to red
                (sliderHandle as HTMLElement).style.backgroundColor = 'red';
                (sliderTrack as HTMLElement).style.backgroundColor = 'red';
            }
        }
    });
    dynamicColorSlider.appendTo('#dynamic_color_slider');
};