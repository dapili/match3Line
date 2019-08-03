namespace unfsource {
	export class EgretLikeAlert extends eui.Component {
		private _btn: eui.Rect;
		private _msg: eui.Label;
		private _callBack: Function;

		public constructor() {
			super();
			this.drawBoard();
		}

		protected childrenCreated() {
			unfsource.DisplayUtil.addModel(this);
			this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
		}

		public setMsg(msg: string, callBack?: Function) {
			this._msg.text = msg;
			this._callBack = callBack;
		}

		private drawBoard() {
			let sp: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
			sp.touchEnabled = false;
			this.addChild(sp);

			let bgRect = new eui.Rect(450, 230, 0xf8fdff);
			sp.x = (GameConfig.stage.stageWidth - bgRect.width) / 2;
			sp.y = (GameConfig.stage.stageHeight - bgRect.height) / 2;
			bgRect.enabled = false;
			sp.addChild(bgRect);

			let headerBg = new eui.Rect(450, 45, 0x2c84d6);
			headerBg.enabled = false;
			sp.addChild(headerBg);

			let headerText = new eui.Label("提示");
			headerText.fontFamily = "SimHei";
			headerText.size = 30;
			headerText.x = 5;
			headerText.y = 8;
			headerText.touchEnabled = false;
			sp.addChild(headerText);

			this._btn = new eui.Rect(100, 50, 0x52b4f2);
			this._btn.x = 175;
			this._btn.y = 175;
			sp.addChild(this._btn);

			let btnText = new eui.Label("确定");
			btnText.fontFamily = "SimHei";
			btnText.size = 30;
			btnText.x = 175;
			btnText.y = 185;
			btnText.width = 100;
			btnText.textAlign = "center";
			btnText.touchEnabled = false;
			sp.addChild(btnText);

			let msgText = new eui.Label();
			msgText.fontFamily = "SimHei";
			msgText.textColor = 0x0;
			msgText.size = 24;
			msgText.x = 64;
			msgText.y = 90;
			msgText.width = 322;
			msgText.height = 70
			msgText.textAlign = "center";
			msgText.touchEnabled = false;
			sp.addChild(msgText);

			this._msg = msgText;
		}

		private onBtn(e: egret.TouchEvent) {
			this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn, this);
			if (this._callBack) {
				this._callBack();
			}
			this.parent.removeChild(this);
		}

	}
}