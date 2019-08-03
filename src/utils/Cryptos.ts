namespace unfsource {
	class Cryptos {
		private static key = "i2H2m1HuUofKWArw";

		public constructor() {
		}

		public static encrypt(word) {
			var key = CryptoJS.enc.Utf8.parse(this.key);
			var srcs = CryptoJS.enc.Utf8.parse(word);

			var encrypted = CryptoJS.AES.encrypt(srcs, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			return encrypted.toString();
		}

		public static decrypt(word) {
			var key = CryptoJS.enc.Utf8.parse(this.key);

			var decrypt = CryptoJS.AES.decrypt(word, key, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});

			return CryptoJS.enc.Utf8.stringify(decrypt).toString();
		}
	}
}

declare let CryptoJS;