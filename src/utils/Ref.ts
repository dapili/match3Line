/**
 * 一些游戏算法,仅做参考
 */
class Ref {
	private constructor() {
	}

	//二次贝赛尔曲线缓动
	private startX;
	private controlX;
	private targetX;

	public bezier() {
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ factor: 1 }, 1500);
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		// this.x = (1 - value) * (1 - value) * this.startX + 2 * value * (1 - value) * this.controlX + value * value * this.targetX;
		// this.y = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
	}

	//一个简单的镜头控制算法
	private _rolePosY; //角色实际位置
	private _cameraActPosY; //镜头活动位置

	get roleY(): number {
		return this._rolePosY;
	}

	set roleY(value: number) {
		this._rolePosY = value;
		this.setRoleY(this.getCamearY(this._rolePosY));
	}

	private setRoleY(cameraY: number) {
		// this.y = this._rolePosY - cameraY; //角色在屏幕上的位置
	}

	private getCamearY(rolePosY: number): number {
		let disY = this._rolePosY - this._cameraActPosY;
		if (disY >= 0) {
			return 0;
		} else {
			return disY;
		}
	}

	//基于时间的动画
	private _preTime;
	private _accTime;
	private _timeSlice;

	private timeAni(funs: Array<Function>): void {
		let cur = new Date().getTime();
		if (!this._preTime)
			this._preTime = cur;
		let passed = cur - this._preTime;
		this._accTime += passed;
		while (this._accTime > this._timeSlice) {
			funs.forEach(fun => {
				fun();
			});
			this._accTime -= this._timeSlice;
		}
		this._preTime = new Date().getTime();
	}

	//egret mc播放
	public egretMc() {
		var data = RES.getRes("abc.json");
		var txtr = RES.getRes("abc.png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("mc1"));

		mc1.addEventListener(egret.Event.LOOP_COMPLETE, (e: egret.Event) => {
			console.log(e.type);//输出3次
		}, this);
		mc1.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			console.log(e.type);//1次
		}, this);
	}

	//伪随机算法(线性同余法)
	public rand() {
		let x = [];
		x[0] = new Date().getTime();  // 随机种子(可以用日期产生)
		/* 保证m与a互质 */
		let m = Math.pow(2, 32);
		let a = 9;  // a = 4p + 1
		let b = 7;  // b = 2q + 1

		console.log(x[0]);
		/* 取前1w个数*/
		for (let i = 1; i < 10000; ++i) {
			x[i] = (a * x[i - 1] + b) % m;
			console.log(x[i]);

		}
	}

}