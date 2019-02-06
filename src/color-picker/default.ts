import { loadCultureFiles } from '../common/culture-loader';
import { ColorPicker } from '@syncfusion/ej2-inputs';

/**
 * Default ColorPicker sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let colorPicker: ColorPicker = new ColorPicker({}, '#color-picker');
};
