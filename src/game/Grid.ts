class Grid extends egret.DisplayObjectContainer {
	public static wh = 86;
	public static gap = 2;
	public static isMove = false;
	public gridX: number;
	public gridY: number;
	public type: number;
	private _img: eui.Image = new eui.Image();
	public constructor() {
		super();
		this.anchorOffsetX = this.anchorOffsetY = Grid.wh / 2;
		this._img.width = this._img.height = Grid.wh;
		this.addChild(this._img);
	}

	public getType() {

	}

	/**
	 * 红,绿,蓝三色
	 */
	// public setType(type: number) {
	// 	this.type = type;
	// 	switch (type) {
	// 		case 0:
	// 			this.draw(0xff0000);
	// 			break;
	// 		case 1:
	// 			this.draw(0x00ff00);
	// 			break;
	// 		case 2:
	// 			this.draw(0x0000ff);
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }

	public setType(type: number) {
		this.type = type;
		switch (type) {
			case 0:
				this._img.source = "black";
				break;
			case 1:
				this._img.source = "red";
				break;
			case 2:
				this._img.source = "green";
				break;
			case 3:
				this._img.source = "purple";
				break;
			case 4:
				this._img.source = "orange";
				break;
			default:
				break;
		}
	}

	private draw(color: number) {
		// let g = this.graphics;
		// g.clear();
		// g.beginFill(color);
		// g.drawRoundRect(0, 0, Grid.wh, Grid.wh, 20);
		// g.endFill();
	}
}