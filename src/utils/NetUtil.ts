namespace unfsource {
	class NetUtil {
		public static threeUrl = "https://wxgame.xiaoyougame.com/eli/"
		public constructor() {
		}

		public static getResponseData(event) {
			var request = <egret.HttpRequest>event.currentTarget;
			let res = request.response;
			if (res == "") {
				return "";
			}
			else {
				return JSON.parse(res);
			}
		}
		/**
		 * params存在传递json字符串,否则传null;
		 */
		public static sendPostRequest(url: string, params: any, success: Function, fail: Function) {
			this.getRequest(url, params, success, fail, egret.HttpMethod.POST);
		}

		private static getRequest(url: string, params: any, success: Function, fail: Function, type: string) {
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			request.open(url, type);
			//设置响应头
			if (params) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			}
			else {
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			request.send(params);
			request.addEventListener(egret.Event.COMPLETE, success, this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, fail, this);
			// request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this); //侦听进度
		}

		public static sendGetRequest(url: string, success: Function, fail: Function): void {
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			request.open(url, egret.HttpMethod.GET);
			request.send();

			request.addEventListener(egret.Event.COMPLETE, success, this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, fail, this);
		}

		public static sendDeleteRequest(url: string, params: any, success: Function, fail: Function) {
			this.getRequest(url, params, success, fail, "DELETE");
		}

		//范例
		private success(event: egret.Event): void {
			var request = <egret.HttpRequest>event.currentTarget;
			console.log("data : ", request.response);
		}

		private fail(event: egret.IOErrorEvent): void {
			console.log("error : " + event);
		}

		private onProgress(event: egret.ProgressEvent): void {
			console.log("progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
		}

		public static wxSendGetRequest(url: string, success: (res) => void, fail: (res) => void, complete?: (res) => void) {
			wx.request({
				url: url,
				data: {},
				header: {},
				method: "GET",
				dataType: null,
				success: success,
				fail: fail,
				complete: complete
			});
		}

		public static wxSendPostRequest(url: string, data = {}, success: (res) => void, fail: (res) => void, complete?: (res) => void) {
			this.getWxRequest(url, data, success, fail, "POST", complete);
		}

		private static getWxRequest(url: string, data = {}, success: (res) => void, fail: (res) => void, type: string, complete?: (res) => void) {
			wx.request({
				url: url,
				data: data,
				header: {},
				method: type,
				dataType: null,
				success: success,
				fail: fail,
				complete: complete
			});
		}

		public static wxSendDeleteRequest(url: string, data = {}, success: (res) => void, fail: (res) => void, complete?: (res) => void) {
			this.getWxRequest(url, data, success, fail, "DELETE", complete);
		}

		public static ajaxPost(url, data, cb) {
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				dataType: "json",
				success: cb
			});
		}
	}
}

declare var $;