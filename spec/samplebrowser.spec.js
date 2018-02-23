define(["require", "exports", "@syncfusion/ej2-base", "../src/common/sampleList", "../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, sampleList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('sample browser', function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        var samples = sampleList_1.samplesList;
        beforeAll(function (done) {
            var ajax = new ej2_base_1.Ajax('../base/index.html', 'GET', true);
            ajax.send().then(function (value) {
                document.body.innerHTML = document.body.innerHTML + value.toString();
                require(['../src/common/index.min'], function () {
                    done();
                });
            });
        });
        describe('testing -', function () {
            beforeEach(function () {
                window.customError = function () {
                    return false;
                };
                spyOn(window, 'customError');
                window.addEventListener('error', window.customError);
            });
            afterEach(function () {
                window.customError.calls.reset();
            });
            var _loop_1 = function (control) {
                if (control.category !== 'ShowCase') {
                    control.samples.forEach(function (element) {
                        it('Control Name: ' + control.directory + ', Sample Name: ' + element.name, function (done) {
                            window.navigateSample = function () {
                                expect(window.customError).not.toHaveBeenCalled();
                                done();
                            };
                            window.location.href = '#/material/' + control.directory + '/' + element.url + '.html';
                        });
                    });
                }
            };
            for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
                var control = samples_1[_i];
                _loop_1(control);
            }
        });
    });
});
