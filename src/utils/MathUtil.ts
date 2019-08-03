namespace unfsource {
	export class MathUtil {
		public constructor() {
		}

		/**
		* 弧度转角度
		*/
		public static r2d(r: number): number {
			return r * 180 / Math.PI;
		}

		/**
		 * 角度转弧度
		 */
		public static d2r(d: number): number {
			return d / 180 * Math.PI;
		}

		/**
		 * 获得由起点指向目标点的旋转角度
		 */
		public static getAngelStartToEnd(start: egret.Point, end: egret.Point): number {
			let r = Math.atan2(end.y - start.y, end.x - start.x);
			return MathUtil.r2d(r) + 90;
		}

		/**
		 * 获得两数组的交集
		 */
		public static getInterArr(a: Array<any>, b: Array<any>) {
			let result = [];
			for (let i = 0; i < a.length; i++) {
				for (let j = 0; j < b.length; j++) {
					if (a[i] == b[j] && result.indexOf(a[i]) == -1) {
						result.push(a[i]);
					}
				}
			}
			return result
		}

		/**
		 * 获得两数组的并集
		 */
		public static getUnionArr(a: Array<any>, b: Array<any>) {
			let result = a.concat(b);
			return MathUtil.getUniqeArr(result);
		}

		/**
		 * 获得无重复无素的数组
		 */
		public static getUniqeArr(a: Array<any>) {
			let result = [];
			for (let i = 0; i < a.length; i++) {
				if (result.indexOf(a[i]) == -1) {
					result.push(a[i]);
				}
			}
			return result
		}

		public static getRandom(min: number, max: number): number {
			let sum = Math.floor(Math.random() * (max - min + 1)) + min;
			return sum;
		}

	}
}