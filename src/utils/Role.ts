/**
 * 游戏角色属性
 */
class Role {
	public level: number;
	public money: number;
	public gold: number;
	public diamond: number;

	private static _instance: Role;
	private constructor() {
	}

	public static get instance(): Role {
		if (!this._instance) {
			this._instance = new Role();
		}
		return this._instance;
	}
}