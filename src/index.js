import element from "./element";

/**
 * @typedef Prop
 * @property { string | HTMLElement } [selector=#html-rotate] The selector of the element.
 * @property { bumber } [rotate=-90] Rotation angle.
 * @property { boolean } [updateOnResize=true] Update sizes on resize.
 * @property { boolean } [fitParentHeight=false] Make width of the wrapper equal to height of the outer's parent.
 */

/**
 * @typedef Returns
 * @property {Function} update
 * @property {Function} destroy
 */



/**
 * @author Anthony Bobrov {@link https://github.com/antonbobrov/rotate-html| GitHub}
 * 
 * Rotate your HTML blocks vertically
 * @param {Prop} prop 
 * @returns { Returns } Returns methods.
 */
function htmlRotate(prop = {}) {
    


    // extend properties
    const DEFAULT_PROP = {
        selector: '#html-rotate',
        rotate: -90,
        updateOnResize: true,
        fitParentHeight: false
    };
    prop = Object.assign(DEFAULT_PROP, prop);



    // get the element to be rotated
    const outer = element(prop.selector);
    if (!(outer instanceof HTMLElement)) {
        return false;
    }

    // create a wrapper
    const wrap = document.createElement("div");
    wrap.style.display = 'inline-block';
    // move children
    while (outer.childNodes.length > 0) {
        wrap.appendChild(outer.childNodes[0]);
    }
    outer.appendChild(wrap);

    // rotate the block
    update();

    // set resize
    const resizeCallback = update.bind(this);
    window.addEventListener("resize", resizeCallback);



    // calculate sizes and rotate the block
    function update() {

        // get parent for fit-sizes
        const parent = outer.parentElement;

        // apply outer styles
        outer.style.position = 'relative';

        // rotate inner content
        wrap.style.position = 'absolute';
        wrap.style.display = 'inline-block';
        wrap.style.transform = `rotate(${getRotationAngle()}deg)`;
        if (prop.fitParentHeight) {
            wrap.style.width = parent.clientHeight + 'px';
        }
        else {
            wrap.style.whiteSpace = 'nowrap';
        }

        // get content sizes
        const width = wrap.clientWidth;
        const height = wrap.clientHeight;

        // apply new sizes to the outer
        outer.style.height = width + 'px';
        outer.style.width = height + 'px';
        // and the wrapper
        wrap.style.top = (width - height) / 2 + 'px';
        wrap.style.left = (height - width) / 2 + 'px';

    }

    function getRotationAngle() {
        if (prop.rotate === 90 || prop.rotate === -90) {
            return prop.rotate;
        }
        return -90;
    }



    // destroy the element
    function destroy() {

        window.removeEventListener("resize", resizeCallback);

        while (wrap.childNodes.length > 0) {
            outer.appendChild(wrap.childNodes[0]);
        }
        wrap.remove();

        outer.style.height = '';
        outer.style.width = '';

    }



    return {
        update: update.bind(this),
        destroy: destroy.bind(this)
    };


    
}

export default htmlRotate;