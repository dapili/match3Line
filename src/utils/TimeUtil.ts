namespace unfsource {
	export class TimeUtil {
		public constructor() {
		}

		public static getFormatTime(time: number) {
			let second = time % 60;
			let minute = Math.floor(time / 60) % 60;
			let hour = Math.floor(time / 3600);

			let sstr = second > 9 ? second : "0" + second;
			let mstr = minute > 9 ? minute : "0" + minute;
			let hstr = hour > 9 ? hour : "0" + hour;

			return hstr + ":" + mstr + ":" + sstr;
		}
	}
}