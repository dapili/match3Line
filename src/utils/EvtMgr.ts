namespace unfsource {
	export class EvtMgr extends egret.EventDispatcher {
		public readonly START_GAME: string = "start_game";
		public readonly END_GAME: string = "end_game";
		public readonly PAUSE_GAME: string = "pause_game";
		public readonly RESUME_GAME: string = "resume_game";
		public readonly RESET_GAME: string = "reset_game";

		private static _instance: EvtMgr;
		private constructor() {
			super();
		}

		public static get instance(): EvtMgr {
			if (!EvtMgr._instance)
				EvtMgr._instance = new EvtMgr();
			return EvtMgr._instance;
		}

		/**
		 * data=>'{foo: "bar"}'
		 */
		public emit(evt: string, data?: any): void {
			this.dispatchEventWith(evt, true, data);
		}

	}
}