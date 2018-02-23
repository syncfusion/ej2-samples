import { Slider } from '@syncfusion/ej2-inputs';

/**
 * Thumb Customization sample
 */

this.default = () => {
    // Initialize Slider component
    let squareSlider: Slider = new Slider({
        // Set the value for slider
        value: 30,
        min: 0, max: 100
    });
    squareSlider.appendTo('#square_slider');

    // Initialize Slider component
    let circleSlider: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set slider minimum and maximum values
        min: 0, max: 100
    });
    circleSlider.appendTo('#circle_slider');

    // Initialize Slider component
    let ovalSlider: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set slider minimum and maximum values
        min: 0, max: 100
    });
    ovalSlider.appendTo('#oval_slider');

    // Initialize Slider component
    let imageSlider: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set slider minimum and maximum values
        min: 0, max: 100,

        ticks: { placement: 'After' }

    });
    imageSlider.appendTo('#image_slider');
};