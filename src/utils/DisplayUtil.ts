namespace unfsource {
	export class DisplayUtil {
		public constructor() {
		}

		public static setRectMask(dpo: egret.DisplayObject, scaleX: number) {
			if (dpo.mask) {
				dpo.mask.width * scaleX;
				dpo.mask = dpo.mask; //未测试是否可行
			}
			else {
				let mask = new egret.Shape();
				mask.graphics.beginFill(0);
				mask.graphics.drawRect(dpo.x, dpo.y, dpo.width * scaleX, dpo.height);
				mask.graphics.endFill();
				dpo.parent.addChild(mask);
				dpo.mask = mask;
			}
		}

		public static setCircleMask(dpo: egret.DisplayObject) {
			let r = dpo.width / 2;
			let mask = new egret.Shape();
			mask.graphics.beginFill(0);
			mask.graphics.drawCircle(dpo.x + r, dpo.y + r, r);
			mask.graphics.endFill();
			dpo.parent.addChild(mask);
			dpo.mask = mask;
		}

		public static addModel(dpc: egret.DisplayObjectContainer) {
			let model = new egret.Shape();
			model.graphics.beginFill(0x0, 0.6);
			model.graphics.drawRect(0, 0, dpc.stage.stageWidth, dpc.stage.stageHeight);
			model.graphics.endFill();
			dpc.addChildAt(model, 0);
		}

		/**
		 * off (255范围)
		 */
		public static addBrightnessFlilter(dpo: egret.DisplayObject, off: number) {
			var colorMatrix = [
				1, 0, 0, 0, off,
				0, 1, 0, 0, off,
				0, 0, 1, 0, off,
				0, 0, 0, 1, 0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			dpo.filters = [colorFlilter];
		}

		public static visibleFalse(arr: Array<egret.DisplayObject>) {
			for (let i = 0; i < arr.length; i++) {
				arr[i].visible = false;
			}
		}

		public static visibleTrue(arr: Array<egret.DisplayObject>) {
			for (let i = 0; i < arr.length; i++) {
				arr[i].visible = true;
			}
		}

		public static twDest(dpo: egret.DisplayObject, dest: egret.Point, tweenFun: Function, callBack?) {
			let timeSlice = 300;
			egret.Tween.removeTweens(dpo);
			egret.Tween.get(dpo).to({ x: dest.x, y: dest.y }, timeSlice, tweenFun)
				.call(() => {
					if (callBack) {
						callBack();
					}
					egret.Tween.removeTweens(dpo);
				});
		}

		public static twLoop(sp: egret.Point, ep: egret.Point, dpo) {
			let timeSlice = 500;
			egret.Tween.removeTweens(dpo);
			egret.Tween.get(dpo, { loop: true })
				.to({ x: ep.x, y: ep.y }, timeSlice)
				.to({ x: sp.x, y: sp.y }, timeSlice)
		}

		public static twCircle(dpo) {
			let timeSlice = 500;
			egret.Tween.removeTweens(dpo);
			egret.Tween.get(dpo, { loop: true })
				.to({ rotation: 360 }, timeSlice)
		}

		/**
		 * 果冻效果
		 */
		public static jello(dpo, callBack?) {
			egret.Tween.removeTweens(dpo);
			var tw = egret.Tween.get(dpo);
			tw.to({ scaleX: 0.8, scaleY: 1.3 }, 100, egret.Ease.bounceIn)
				.to({ scaleX: 1.1, scaleY: 1 }, 100, egret.Ease.bounceOut)
				.to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backIn)
				.call(() => {
					egret.Tween.removeTweens(dpo);
					if (callBack) callBack();
				});
		}
	}
}