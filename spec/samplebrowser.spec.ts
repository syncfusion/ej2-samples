/**
 * sample browser Spec
 */
import { Ajax } from '@syncfusion/ej2-base';
import '../node_modules/es6-promise/dist/es6-promise';
import { samplesList } from '../src/common/sampleList';

interface MyWindow extends Window {
    customError: any;
    navigateSample: any;
}

declare let window: MyWindow;


describe('sample browser', (): void => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    let samples: any = samplesList;
    beforeAll((done: Function) => {
        let ajax: Ajax = new Ajax('../../base/index.html', 'GET', true);
        ajax.send().then((value: Object): void => {
            document.body.innerHTML = document.body.innerHTML + value.toString();
            require(
                ['../../src/common/index.min'],
                (): void => {
                    done();
                });
        });
    });
    describe('testing -', () => {

        beforeEach(() => {
            window.customError = (): boolean => {
                //console.log('called error');
                return false;
            };
            spyOn(window, 'customError');
            window.addEventListener('error', window.customError);
        });

        afterEach(() => {
            window.customError.calls.reset();
        });
        for (let control of samples) {
            if (control.category !== 'ShowCase') {
                control.samples.forEach((element: any) => {
                    it('Control Name: ' + control.directory + ', Sample Name: ' + element.name, (done: Function) => {
                        window.navigateSample = (): void => {
                            expect(window.customError).not.toHaveBeenCalled();
                            done();
                        };
                        window.location.href = '#' + control.directory + '/' + element.url + '.html';
                    });
                });
            }
        }
    });
});