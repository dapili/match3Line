namespace unfsource {
	export class LayerUtil {
		public static readonly GAME = "game";
		public static readonly UI = "ui";
		public static readonly GUIDE = "guide";
		public static readonly ALERT = "alert";
		public static readonly NOTICE = "notice";
		public static readonly NET = "net";

		public constructor() {
		}

		private static create(name: string) {
			let dpc = new egret.DisplayObjectContainer();
			dpc.name = name;
			GameConfig.stage.addChild(dpc);
		}

		public static createAll() {
			this.create(this.GAME);
			this.create(this.UI);
			this.create(this.GUIDE);
			this.create(this.ALERT);
			this.create(this.NOTICE);
			this.create(this.NET);
		}

		public static addToLayer(dpo, layerName) {
			this.getLayerByName(layerName).addChild(dpo);
		}

		public static getLayerByName(name: string) {
			let dpo = GameConfig.stage.getChildByName(name);
			return dpo as egret.DisplayObjectContainer;
		}
	}
}