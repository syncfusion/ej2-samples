import { loadCultureFiles } from '../common/culture-loader';
import { Carousel } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { addClass, removeClass, createElement } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();

    const carouselData = [
        { imageUrl: 'src/carousel/images/google-pixel-6-pro.png', title: 'Google Pixel', model: 'Pixel 6 Pro', brand: 'Google', releaseDate: 'Oct 28, 2021', ram: '12GB', rom: '128GB', platform: 'Android', version: 12 },
        { imageUrl: 'src/carousel/images/iphone-13-pro.png', title: 'iPhone', model: 'iPhone 13 Pro', brand: 'Apple', releaseDate: 'Sept 14, 2021', ram: '4GB', rom: '128GB', platform: 'iOS', version: 15 },
        { imageUrl: 'src/carousel/images/nokia-xr-20.png', title: 'Nokia', model: 'XR-20', brand: 'Nokia', releaseDate: 'Oct 30, 2021', ram: '6GB', rom: '128GB', platform: 'Android', version: 11 },
        { imageUrl: 'src/carousel/images/one-plus-9-pro.png', title: 'OnePlus', model: 'OP9 Pro', brand: 'OnePlus', releaseDate: 'March 23, 2021', ram: '8GB', rom: '128GB', platform: 'OxygenOS based on Android', version: 11 },
        { imageUrl: 'src/carousel/images/samsung-s21-fe.png', title: 'Samsung', model: 'S21 FE', brand: 'Samsung', releaseDate: 'Jan 27, 2021', ram: '8GB', rom: '128GB', platform: 'Samsung One UI 4.0 based on Android', version: 12 }
    ];
    const carouselObj: Carousel = new Carousel({
        cssClass: 'overview-carousel',
        width: 'calc(100% - 10rem)',
        buttonsVisibility: 'Hidden',
        showIndicators: false,
        dataSource: carouselData,
        itemTemplate: '#itemTemplate',
        slideChanging: function (args) {
            const indicators = [].slice.call(document.querySelectorAll('.indicator'));
            removeClass(indicators, 'active-indicator');
            addClass([indicators[args.nextIndex]], 'active-indicator');
        }
    });
    carouselObj.appendTo('#carousel');
    const previousBtn = new Button({ cssClass: 'e-flat e-round', iconCss: 'e-icons e-arrow-left' }, '#previousBtn');
    previousBtn.element.onclick = function () { carouselObj.prev(); };

    const nextBtn = new Button({ cssClass: 'e-flat e-round', iconCss: 'e-icons e-arrow-right' }, '#nextBtn');
    nextBtn.element.onclick = function () { carouselObj.next(); };

    const playPauseBtn = new Button({ cssClass: 'e-flat e-round', iconCss: 'e-icons e-pause', isToggle: true }, '#playPauseBtn');
    playPauseBtn.element.onclick = function () {
        setTimeout(() => {
            carouselObj.autoPlay = !playPauseBtn.element.classList.contains('e-active');
            carouselObj.dataBind();
            playPauseBtn.iconCss = playPauseBtn.element.classList.contains('e-active') ? 'e-icons e-play' : 'e-icons e-pause';
            playPauseBtn.dataBind();
        });
    };

    const indicatorOne = new Button({ cssClass: 'e-flat e-round' }, '#indicatorBtnOne');
    indicatorOne.element.addEventListener('click', function () { onIndicatorClick(0) });
    const indicatorTwo = new Button({ cssClass: 'e-flat e-round' }, '#indicatorBtnTwo');
    indicatorTwo.element.addEventListener('click', function () { onIndicatorClick(1) });
    const indicatorThree = new Button({ cssClass: 'e-flat e-round' }, '#indicatorBtnThree');
    indicatorThree.element.addEventListener('click', function () { onIndicatorClick(2) });
    const indicatorFour = new Button({ cssClass: 'e-flat e-round' }, '#indicatorBtnFour');
    indicatorFour.element.addEventListener('click', function () { onIndicatorClick(3) });
    const indicatorFive = new Button({ cssClass: 'e-flat e-round' }, '#indicatorBtnFive');
    indicatorFive.element.addEventListener('click', function () { onIndicatorClick(4) });

    function onIndicatorClick(index: number) {
        carouselObj.selectedIndex = index;
        carouselObj.dataBind();
    }
};
