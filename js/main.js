'use strict'

// Initialise application
Board.init('board');
Pen.init(Board.ctx);
FloatingButton.init();
FloatingButton.onClick = Board.clearMemory.bind(Board);
Pointer.onEmpty = _.debounce(Board.storeMemory.bind(Board), 1500);

// Attach event listener
const pointerDown = function pointerDown(e) {
  console.dir(e);
  if (e.pointerType !== Pen.type) {
    console.log('Not a pen event');
    console.log(e.pointerType);
    return;
  }
  // Initialise pointer
  const pointer = new Pointer(e.pointerId);
  pointer.set(Board.getPointerPos(e));
  // Get function type
  Pen.setFuncType(e);
  if (Pen.funcType === Pen.funcTypes.menu) Board.clearMemory();
  else drawOnCanvas(e, pointer, Pen);
}
const pointerMove = function pointerMove(e) {
  if (Pen.funcType && (Pen.funcType.indexOf(Pen.funcTypes.draw) !== -1)) {
    const pointer = Pointer.get(e.pointerId);
    drawOnCanvas(e, pointer, Pen);
  }
}
const pointerCancel = function pointerLeave(e) {
  Pointer.destruct(e.pointerId);
}
Board.dom.addEventListener('pointerdown', pointerDown);
Board.dom.addEventListener('pointermove', pointerMove);
Board.dom.addEventListener('pointerup', pointerCancel);
Board.dom.addEventListener('pointerleave', pointerCancel);

// Draw method
function drawOnCanvas(e, pointerObj, Pen) {
  if (pointerObj) {
    pointerObj.set(Board.getPointerPos(e));
    Pen.setPen(Board.ctx, e);

    if (pointerObj.pos0.x < 0) {
      pointerObj.pos0.x = pointerObj.pos1.x - 1;
      pointerObj.pos0.y = pointerObj.pos1.y - 1;
    }
    Board.ctx.beginPath();
    Board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y)
    Board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
    Board.ctx.closePath();
    Board.ctx.stroke();

    pointerObj.pos0.x = pointerObj.pos1.x;
    pointerObj.pos0.y = pointerObj.pos1.y;
  }
}
