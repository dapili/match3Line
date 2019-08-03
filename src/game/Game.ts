class Game extends eui.Component {
	private group: eui.Group;
	private _isMove: boolean;
	private _grids: Array<any>;
	private _readyGrids: Array<Grid> = [];
	private _line: egret.Shape = new egret.Shape();
	private _needMoveObj: Object = {};
	private _isDrag: boolean;
	private _twGrids: Array<Grid> = [];
	private _type = 3;
	public constructor() {
		super();
		this.skinName = "game";
		this.init();
	}

	private init() {
		this.addChild(this._line);
	}

	protected childrenCreated() {
		for (let i = 0; i < GameConfig.gridRows; i++) {
			for (let j = 0; j < GameConfig.gridCols; j++) {
				let type = u.MathUtil.getRandom(0, this._type);
				let grid = new Grid();
				grid.setType(type);
				this.group.addChild(grid);
				grid.x = Grid.wh / 2 + j * (Grid.wh + Grid.gap);
				grid.y = Grid.wh / 2 + i * (Grid.wh + Grid.gap);
				grid.gridX = j;
				grid.gridY = i;
			}
		}
		this.group.width = GameConfig.gridCols * Grid.wh + (GameConfig.gridCols - 1) * Grid.gap;
		this.group.height = GameConfig.gridRows * Grid.wh + (GameConfig.gridRows - 1) * Grid.gap;
		this._grids = this.group.$children;

		this.group.touchChildren = false;
		this.group.touchEnabled = true;

		this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupTouchBegin, this);
		this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGroupTouchMove, this);
		GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

	}

	private onGroupTouchBegin(e: egret.TouchEvent) {
		if (Grid.isMove) return;
		let localX = e.stageX - this.group.x;
		let localY = e.stageY - this.group.y;
		let grid: Grid = this.getGrid(localX, localY);
		if (grid) {
			this._readyGrids.length = 0;
			this._readyGrids.push(grid);
			this._isDrag = true;
		}
	}

	private getGrid(byX: number, byY: number) {
		let grids = this._grids;
		let len = grids.length;
		let gridX = Math.floor(byX / (Grid.wh + Grid.gap));
		let gridY = Math.floor(byY / (Grid.wh + Grid.gap));
		let grid: Grid;
		for (let i = 0; i < len; i++) {
			if (gridX == grids[i].gridX && gridY == grids[i].gridY) {
				grid = grids[i];
				break;
			}
		}
		return grid;
	}

	private onGroupTouchMove(e: egret.TouchEvent) {
		if (!this._isDrag) return;
		let rgs = this._readyGrids;
		let localX = e.stageX - this.group.x;
		let localY = e.stageY - this.group.y;
		let grid: Grid = this.getGrid(localX, localY);
		if (!grid) return;
		let len = rgs.length;
		let last = rgs[len - 1];
		let index = rgs.indexOf(grid);
		if (index == -1 && grid.type == last.type) {
			if ((grid.gridX == last.gridX && Math.abs(grid.gridY - last.gridY) == 1) ||
				(grid.gridY == last.gridY && Math.abs(grid.gridX - last.gridX) == 1)) {
				rgs.push(grid);
			}
		}
		else if (index == len - 2 && index != -1) { //玩家打算后退一格
			rgs.splice(index + 1);
			len = rgs.length;
		}
		else if (index == 0 && rgs.length == 1) {
			rgs.length = 1;
			len = rgs.length;
		}
		// u.Tool.trace(rgs.length);

		let line = this._line.graphics;
		line.clear();
		line.lineStyle(4, 0xffff00);
		for (let i = 0; i < len; i++) {
			let g = rgs[i];
			if (i == 0) {
				line.moveTo(g.x + this.group.x, g.y + this.group.y);
			}
			else {
				line.lineTo(g.x + this.group.x, g.y + this.group.y);
			}
		}
	}

	private onTouchEnd(e: egret.TouchEvent) {
		if (Grid.isMove) return;
		this._isDrag = false;
		this._line.graphics.clear();
		let rgs = this._readyGrids;
		let len = rgs.length;
		let obj = this._needMoveObj;
		this.resetNeedObj();
		if (rgs.length >= 3) {
			for (let i = 0; i < len; i++) {
				let grid = rgs[i];
				if (!obj[grid.gridX]) {
					obj[grid.gridX] = -1;
				}
				else {
					obj[grid.gridX]--;
				}
				grid.gridY = obj[grid.gridX];
				egret.Tween.get(grid).to({ scaleX: 1.08, scaleY: 1.08 }, 80).to({ scaleX: 0, scaleY: 0 }, 80).call(() => {
					grid.scaleX = grid.scaleY = 1;
					grid.y = (Grid.wh + Grid.gap) * grid.gridY + grid.anchorOffsetY;
					grid.visible = false;
					let type = u.MathUtil.getRandom(0, this._type);
					grid.setType(type);
				})
			}

		}
		rgs.length = 0;

		setTimeout(() => {
			this.moveDown();
		}, 180);
		// u.Tool.trace(Object.keys(obj));

	}

	private moveDown() {
		let grids = this._grids;
		grids.sort((a: Grid, b: Grid) => {
			let va = a.gridX * 100 + a.gridY;
			let vb = b.gridX * 100 + b.gridY;
			if (va < vb) {
				return -1;
			}
			else if (va > vb) {
				return 1;
			}
			else {
				return 0;
			}
		})
		// u.Tool.info(grids);

		let twGrids = this._twGrids;
		let gLen = grids.length;
		for (let i = 0; i < gLen; i++) {
			let grid: Grid = grids[i];
			let gridY: number = i % GameConfig.gridRows;
			if (grid.gridY == gridY) { //已经重置了gridY,开启了缓动,不用重复缓动;
				continue;
			}
			if (grid.gridY < 0) {
				grid.y += Grid.wh * grid.gridY;
				grid.visible = true;
			}
			let gy = Grid.wh / 2 + gridY * (Grid.wh + Grid.gap);
			let dest = gy - grid.y;
			let time = Math.pow((Grid.wh * 6 / dest + dest / 12), 1) * 10;
			if (grid.y != gy) {
				// u.Tool.trace("dest", dest);
				Grid.isMove = true;
				u.Tool.trace(`time_${time}`);
				egret.Tween.get(grid).to({ y: gy }, time).call(() => {
					Grid.isMove = false;
					grid.gridY = gridY;
				}); 
				if (twGrids.indexOf(grid) == -1) {
					twGrids.push(grid);
				}
			}
		}

	}

	private resetNeedObj() {
		let obj = this._needMoveObj;
		let keys = Object.keys(obj);
		let keyLen = keys.length;
		for (let i = 0; i < keyLen; i++) {
			obj[keys[i]] = 0;
		}
	}
}