/**
 * sample browser Spec
 */
 /* tslint:disable */ 
import { Ajax } from '@syncfusion/ej2-base';
import '../node_modules/es6-promise/dist/es6-promise';
import { samplesList } from '../src/common/sampleList';

interface MyWindow extends Window {
    customError: any;
    onerror: any;
    navigateSample: any;
    console: any;
}

declare let window: MyWindow;


describe('sample browser', (): void => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    let samples: any = samplesList;
    beforeAll((done: Function) => {
        let ajax: Ajax = new Ajax('../base/index.html', 'GET', true);
        ajax.send().then((value: Object): void => {
            document.body.innerHTML = document.body.innerHTML + value.toString();
            require(
                ['../src/common/index.min'],
                (): void => {
                    done();
                });
        });
    });
    describe('testing -', () => {

        beforeEach(() => {
            window.customError = (): boolean => {
                return false;
            };
            window.onerror = (message: any, file: any, line: any, column: any, errorObj: any): boolean => {
                window.console.log(message);
                window.console.log('at   ' + file + '   line: ' + line + '   column: ' + column);
                return false;
            };
            spyOn(window, 'customError');
            window.addEventListener('error', window.customError);
        });

        afterEach(() => {
            window.customError.calls.reset();
        });
        
        for (let control of samples) {
            if (control.category !== 'ShowCase' && control.name !== 'Stock Chart') {
                control.samples.forEach((element: any, index: number) => {
                    it(' ', (done: Function) => {
                        window.navigateSample = (): void => {
                            expect(window.customError).not.toHaveBeenCalled();
                            done();
                        };
                        window.location.href = '#/material/' + control.directory + '/' + element.url + '.html';
                        window.console.log(window.location.href);
                    });

                });

            }
        }
    });
});