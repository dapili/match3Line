class Guide extends egret.DisplayObjectContainer {
	private _alpha: number = 0.7;
	private _container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
	private _empty: egret.Shape = new egret.Shape();
	private _renderTexture: egret.RenderTexture = new egret.RenderTexture();
	private _scoopBmp: egret.Bitmap = new egret.Bitmap();
	private _bg: egret.Shape = new egret.Shape();

	private static _instance: Guide;
	public static get instance(): Guide {
		if (!this._instance) {
			this._instance = new Guide();
		}
		return this._instance;
	}

	private constructor() {
		super();
		this.touchEnabled = true;

		this.initBg();
		this.hideBg();
		this.initScoop();
		this.hideScoop();
	}

	private initBg() {
		this._bg.graphics.beginFill(0x0, this._alpha);
		this._bg.graphics.drawRect(0, 0, GameConfig.stageW, GameConfig.stageH);
		this._bg.graphics.endFill();
		this.addChild(this._bg);
	}

	private showBg() {
		this._bg.visible = true;
	}

	private hideBg() {
		this._bg.visible = false;
	}

	private initScoop() {
		let bg: egret.Shape = new egret.Shape();
		bg.graphics.beginFill(0x0, this._alpha);
		bg.graphics.drawRect(0, 0, GameConfig.stage.stageWidth, GameConfig.stage.stageHeight);
		bg.graphics.endFill();
		this._container.addChild(bg);

		this._empty.blendMode = egret.BlendMode.ERASE;
		this._container.addChild(this._empty);

		this._renderTexture.drawToTexture(this._container);
		this._scoopBmp.texture = this._renderTexture;
		this.addChild(this._scoopBmp);
		this._scoopBmp.pixelHitTest = true;
	}

	private setScoop(p: egret.Point, target) {
		this._empty.graphics.clear();
		this._empty.graphics.beginFill(0x0, 1);
		this._empty.graphics.drawRect(p.x, p.y, target.width, target.height);
		this._empty.graphics.endFill();

		this._renderTexture.drawToTexture(this._container);
		this._scoopBmp.texture = this._renderTexture;
	}

	private showScoop() {
		this._scoopBmp.visible = true;
	}

	private hideScoop() {
		this._scoopBmp.visible = false;
	}

}
