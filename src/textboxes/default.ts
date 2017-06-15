/**
 *   Sample for CSS input boxes with customized material animation effects.
 */
this.default = () => {
    let input: NodeList = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group input');
    let inputIcon: NodeList  = document.querySelectorAll('.e-input-group-icon');
    for (let i: number = 0; i < input.length; i++) {
        input[i].addEventListener('focus', function() : void {
            this.parentNode.classList.add('e-input-focus');
        });
        input[i].addEventListener('blur', function() : void {
            this.parentNode.classList.remove('e-input-focus');
        });
    }
    for (let i: number = 0; i < inputIcon.length; i++) {
        inputIcon[i].addEventListener('mousedown',  function() : void {
            this.classList.add('e-input-btn-ripple');
        });
        inputIcon[i].addEventListener('mouseup',  function() : void {
            let ele: HTMLElement = this;
            setTimeout(
                () => {ele.classList.remove('e-input-btn-ripple'); },
                500);
        });
    }
};