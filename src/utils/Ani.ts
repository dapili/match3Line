namespace unfsource {
	/**
	 * 简易帧动画
	 */
	export class Ani extends egret.DisplayObjectContainer {
		private _img: eui.Image;
		private _imgUrl: string;
		private _totalFps: number;
		private _time: number; //毫秒;
		private _count: number = 0; //当前第几帧
		private _t: number = 0; //tick计数
		private _isZeroStart: boolean;
		private _callBack: Function;

		public constructor(imgUrl: string, totalFps: number, time: number, isZeroStart: boolean = true, callBack?: Function) {
			super();
			this._img = new eui.Image();
			this.addChild(this._img);

			this._imgUrl = imgUrl;
			this._time = time;
			this._isZeroStart = isZeroStart;
			this._callBack = callBack;

			this.initFpsCount();
			if (this._isZeroStart) {
				this._totalFps = totalFps;
			}
			else {
				this._totalFps = totalFps + 1;
			}
		}

		/**
		 * touch事件
		 */
		public enable(bool: boolean) {
			this.touchEnabled = bool;
			this.touchChildren = bool;
		}

		/**
		 * 初始化当前帧
		 */
		private initFpsCount() {
			if (this._isZeroStart) {
				this._count = 0;
			}
			else {
				this._count = 1;
			}
		}

		public playOnce() {
			egret.startTick(this.runOnce, this);
		}

		private runOnce(): boolean {
			this.setCount();
			if (this._count == this._totalFps) {
				this.stopOnce();
				if (this._callBack) {
					this._callBack();
				}
			}
			else {
				this.setImgUrl();
			}
			return false;
		}

		private setCount() {
			this._t++;
			let s = Math.floor(this._time / 16.7 / this._totalFps);
			this._t %= s;
			if (this._t == 0) {
				this._count++;
			}
		}

		private stopOnce() {
			egret.stopTick(this.runOnce, this);
			this._t = 0;
			this.initFpsCount();
		}

		private setImgUrl() {
			this._img.source = this._imgUrl + (this._count > 9 ? this._count : "0" + this._count);
		}

		public playLoop() {
			egret.startTick(this.runLoop, this);
		}

		private runLoop(): boolean {
			this.setCount();
			if (this._count == this._totalFps) {
				this.initFpsCount();
			}
			this.setImgUrl();
			return false;
		}

		public stopLoop() {
			egret.stopTick(this.runLoop, this);
			this._t = 0;
			this.initFpsCount();
		}

		public setAnchorOffsetXy(x: number, y: number) {
			this.anchorOffsetX = x;
			this.anchorOffsetY = y;
		}

	}
}