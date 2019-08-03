namespace unfsource {
	export class AudioMgr {
		private _shopBgm: egret.Sound;
		private _shopBgmChannel: egret.SoundChannel;

		private static _instance: AudioMgr;
		private constructor() {
			this._shopBgm = RES.getRes("SBGM_LP_190111_mp3");
		}

		public static get instance(): AudioMgr {
			if (!this._instance)
				this._instance = new AudioMgr();
			return this._instance;
		}

		public playShopBgm() {
			AudioMgr.instance._shopBgmChannel && AudioMgr.instance.stopShopBgm();
			AudioMgr.instance._shopBgmChannel = AudioMgr.instance._shopBgm.play(0, 0);
		}

		public stopShopBgm() {
			AudioMgr.instance._shopBgmChannel.stop();
		}
	}
}