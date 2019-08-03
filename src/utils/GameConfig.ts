class GameConfig {
	public static stage: egret.Stage;
	public static stageW: number;
	public static stageH: number;

	public static gridRows: number = 8;
	public static gridCols: number = 7;

	public static isLog: boolean = true;

	public static sensitive: string; //敏感字符

	public static readonly window = {
		ejectUp: egret.Ease.sineIn,
		retractUp: egret.Ease.sineIn,
		ejectDown: egret.Ease.sineIn,
		retractDown: egret.Ease.sineIn,
		ejectLeft: egret.Ease.sineIn,
		retractLeft: egret.Ease.sineIn,
		ejectRight: egret.Ease.sineIn,
		retractRight: egret.Ease.sineIn,
	}

	public constructor() {

	}

	public static setStage(stage: egret.Stage) {
		this.stage = stage;
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;
	}

	public static get isNotch() {
		let whr = this.stageH / this.stageW;
		if (whr <= 18 / 9) { //普通屏
			return false;
		}
		else { //异形屏
			return true;
		}
	}
}