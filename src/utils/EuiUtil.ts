namespace unfsource {
	export class EuiUtil {
		public constructor() {
		}

		public static scrollToBottom(scroller: eui.Scroller) {
			scroller.viewport.validateNow();
			if (scroller.viewport.scrollV + scroller.viewport.contentHeight >= scroller.height) {
				scroller.viewport.scrollV = scroller.viewport.contentHeight - scroller.height;
			}
		}
	}
}