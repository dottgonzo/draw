export default class Pointer {
    constructor(pointerId, options) {
        this.size = 0;
        this.hashMap = new Map();
        this.pos1 = {
            x: -1,
            y: -1,
        };
        this.pos0 = {
            x: -1,
            y: -1,
        };
        this.isClicked = false;
        pointerId = pointerId;
        if (options?.onEmpty)
            this.onEmpty = options.onEmpty;
    }
    // Static Methodst
    get(pointerId) {
        return this.hashMap.get(pointerId);
    }
    destruct(pointerId) {
        this.removePointer(pointerId);
    }
    addPointer(pointer) {
        this.hashMap.set(pointer.pointerId, pointer);
        this.size += 1;
    }
    removePointer(pointerId) {
        if (this.hashMap.get(pointerId)) {
            this.hashMap.delete(pointerId);
            this.size -= 1;
            if (this.size == 0 && this.onEmpty) {
                this.onEmpty();
            }
        }
    }
    release() {
        this.isClicked = false;
        this.pos0.y = -1;
        this.pos0.x = -1;
    }
    set(pos) {
        this.pos1.x = pos.x;
        this.pos1.y = pos.y;
    }
}
//# sourceMappingURL=Pointer.js.map