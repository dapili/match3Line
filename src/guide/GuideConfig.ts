class GuideConfig {
	// {
	// 		dialog: {
	// 			pos: "center",
	// 			msg: "主人，欢迎您的到来我是您的女仆小悠请多指教哦♪(^∇^*)",
	// 			offset: { x: 100, y: 100 }
	// 		},
	// 		arrow: { direct: "up", offset: { x: 100, y: 100 } },
	// 		scoop: { class: "Class", target: "Class.Button" },
	// 		bg: true,
	// 		class: "Class",
	// 		next: "scoop",
	// 		interrupt: true,
	// 		step: -1
	// 	}
	public steps = [
		{
			dialog: {
				pos: "center",
				msg: "主人，欢迎您的到来我是您的女仆小悠请多指教哦♪(^∇^*)",
				offset: { x: 100, y: 100 }
			},
			arrow: { direct: "up", offset: { x: 100, y: 100 } },
			scoop: { class: "Class", target: "Class.Button" },
			bg: true,
			class: "Class",
			next: "scoop",
			interrupt: true,
			step: -1
		},
	];

	private static _instance: GuideConfig;
	private constructor() {
	}
	public static get instance(): GuideConfig {
		if (!this._instance) {
			this._instance = new GuideConfig();
		}
		return this._instance;
	}


}