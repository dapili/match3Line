namespace unfsource {
	export class Tool {
		private static separator = "/////////////////////////////////////////////////";
		public constructor() {
		}

		public static trace(...args) {
			if (GameConfig.isLog) {
				let s = this.separator;
				console.log(s);
				args.forEach((arg, index) => {
					console.log(arg);
				});
				console.log(s);
			}
		}

		public static info(obj) {
			if (GameConfig.isLog) {
				console.info(obj);
			}
		}

		public static isSensitiveWord(str) {
			let pattern = new RegExp(GameConfig.sensitive, "g");
			if (pattern.test(str)) {
				return true;
			} else {
				return false;
			}
		}

		public static elAlert(msg, callBack?) {
			let elAlert = new EgretLikeAlert();
			elAlert.setMsg(msg, callBack);
			LayerUtil.addToLayer(elAlert, LayerUtil.ALERT);
		}

		/**
	 	 * 只转换中文到unicode
		 */
		public static str2utf8(str: String) {
			return str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function (newStr) {
				return "\\u" + newStr.charCodeAt(0).toString(16);
			});
		}

	}
}