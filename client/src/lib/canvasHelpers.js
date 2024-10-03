export function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    return ctx;
}

export function resizeCanvas(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

export function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}