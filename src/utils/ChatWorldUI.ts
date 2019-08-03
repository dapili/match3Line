class ChatWorldUI extends eui.Component {
	private textInput: eui.TextInput;
	private _me: any;
	private _other: any;

	private _url = "wss://wechat.xiaoyougame.com:8021";
	private _ws: WebSocket;
	private _wss: Array<WebSocket> = [];
	private _preTime;
	private _overTime = 8000;
	private _timer: egret.Timer = new egret.Timer(5000);
	private _heartMsg = '{"msgtype": 1003,"data": {"msg": "heart"}}';

	private static _instance: ChatWorldUI;
	private constructor() {
		super();

		this.initWs();
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this._timer.start();
	}

	public static get instance(): ChatWorldUI {
		if (!this._instance) {
			this._instance = new ChatWorldUI();
		}
		return this._instance;
	}

	private onTimer(e: egret.Event) {
		this._ws.send(this._heartMsg);

		let now = new Date().getTime();
		if (!this._preTime) {
			this._preTime = now;
		}
		else if (now - this._preTime > this._overTime) { //超时
			this._ws.close();
			this.initWs();
		}
	}

	private pubChanChat(data) {
		if (this._ws.readyState == 1) {
			let msg: any = '{"msgtype": 1001,"data": {"msg": "' + this.textInput.text + '"}}';
			this._ws.send(msg);
			this.textInput.text = "";
		}
		else {
			unfsource.Tool.elAlert("聊天室断开连接,稍后重试");
		}
	}

	private initWs() {
		for (let i = this._wss.length - 1; i > -1; i--) {
			if (this._wss[i].readyState == 3 || this._wss[i].readyState == 2) {
				this._wss.splice(i, 1);
			}
			else {
				this._wss[i].close();
			}
		}

		if (this._wss.length == 0) {
			this._ws = new WebSocket(this._url);
			this._wss.push(this._ws);
			this._ws.onopen = this.wsOpen.bind(this);
			this._ws.onmessage = this.wsMessage.bind(this);
			this._ws.onerror = this.wsError.bind(this);
			this._ws.onclose = this.wsClose.bind(this);
		}
	}

	private wsOpen(e) {
		unfsource.Tool.trace("ws建立连接");
		let msg: any = '{"msgtype": 1000,"data": {"token": "' + Player.access_token + '"}}';
		this._ws.send(msg);
	}

	private wsMessage(e) {
		let obj = JSON.parse(e.data);
		switch (obj.msgtype) {
			case 1000:
				unfsource.Tool.trace("ws登入聊天室");
				this._me = obj.data.userinfo;
				this._ws.send(this._heartMsg);
				break;
			case 1001:
				break;
			case 1002:
				obj = JSON.parse(obj.data);
				this._other = obj;
				if (obj.sender == this._me.openid) {
					this._other.isMe = true;
				}
				else {
					this._other.isMe = false;
				}
				unfsource.Tool.trace(this._other);
				break;
			case 1003:
				this._preTime = new Date().getTime();
				break;
			default:
				break;
		}
	}

	private wsError(e) {
		unfsource.Tool.trace("ws发生错误");
		this._ws.close();
	}

	private wsClose(e) {
		unfsource.Tool.trace("ws关闭连接");
	}

}