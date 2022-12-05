export default class Pointer {
	size = 0;
	hashMap: Map<string,Pointer> = new Map()
	pos1 = {
		x: -1,
		y: -1,
	};
	pos0 = {
		x: -1,
		y: -1,
	};
	isClicked = false;
	pointerId!: string;
	// var Pointer = function Pointer(pointerId) {
	// 	this.pointerId = pointerId;
	// 	this.pos1 = {
	// 		x: -1,
	// 		y: -1,
	// 	};
	// 	this.pos0 = {
	// 		x: -1,
	// 		y: -1,
	// 	};
	// 	this.isClicked = false;

	// 	Pointer.addPointer(this);
	// };
	onEmpty!: Function;

	constructor(pointerId: string, options?: { onEmpty?: Function }) {
		pointerId = pointerId;
		if (options?.onEmpty) this.onEmpty = options.onEmpty;
	}

	// Static Methodst
	get(pointerId:string) {
		return this.hashMap.get(pointerId)
	}
	destruct(pointerId:string) {
		this.removePointer(pointerId);
	}
	addPointer(pointer:Pointer) {
		this.hashMap.set(pointer.pointerId,pointer)
		this.size += 1;
	}
	removePointer(pointerId:string) {
		if (this.hashMap.get(pointerId)) {
			this.hashMap.delete(pointerId)
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
	set(pos:{x:number,y:number}) {
		this.pos1.x = pos.x;
		this.pos1.y = pos.y;
	}
}
