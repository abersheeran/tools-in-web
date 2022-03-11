export function autoHeight(element: HTMLElement) {
    element.style.height = 'auto';
    element.scrollTop = 0; //防抖动
    element.style.height = element.scrollHeight + 2 + 'px';
}
