export function getElementSize($element) {
    let { top = 0, right = 0, bottom = 0, left = 0 } = $element?.getBoundingClientRect() || {};

    return {
        top,
        right,
        bottom,
        left,
        width: right - left,
        height: bottom - top
    };
};