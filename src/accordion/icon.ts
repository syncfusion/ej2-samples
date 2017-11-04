/**
 * Accordion Icon Sample
 */
import { Accordion } from '@syncfusion/ej2-navigations';

this.default = () => {
    //Initialize Accordion component
    let acrdnObj: Accordion = new Accordion({
        items: [
            { header: 'Athletics', iconCss: 'e-athletics e-acrdn-icons', content: '#athletics', expanded: true },
            { header: 'Water Games', iconCss: 'e-water-game e-acrdn-icons', content: '#water_games' },
            { header: 'Racing', iconCss: 'e-racing-games e-acrdn-icons', content: '#racing_games' },
            { header: 'Indoor Games', iconCss: 'e-indoor-games e-acrdn-icons', content: '#indoor_games' }
        ]
    });
    //Render initialized Accordion component
    acrdnObj.appendTo('#Accordion_icon');
};