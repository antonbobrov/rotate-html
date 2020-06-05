import '../styles/index.scss';

import htmlRotate from '../../../src/index';


const elements = document.querySelectorAll("*[data-rotation]");
elements.forEach(el => {

    let rotation = el.getAttribute("data-rotation");
    if (rotation) {

        rotation = parseInt(rotation);

        const fitHeightAttr = el.getAttribute("data-fitParentHeight");

        htmlRotate({
            selector: el,
            rotate: rotation,
            fitParentHeight: fitHeightAttr ? true : false
        });

    }


})