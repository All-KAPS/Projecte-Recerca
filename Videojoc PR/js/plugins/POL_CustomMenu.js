/*:
*
* @plugindesc Custom Menu
* 
* @author All-P
*
* @help
*/

(function(){

	var _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		_Scene_Menu_create.call(this);
		/*
		this._statusWindow
		this._commandWindow
		this._goldWindow
		*/

		this._commandWindow.x = 0; //this._statusWindow.width;
		this._commandWindow.y = 0;

		this._statusWindow.x = 0;
		this._statusWindow.y = this._commandWindow.height;

		this._goldWindow.x = 0;
		this._goldWindow.y = this._statusWindow.y + this._statusWindow.height;
		};

	// ----------------------
	// MENU STATUS
	//-----------------------
	Window_MenuStatus.prototype.windowWidth = function() {
	    return Graphics.boxWidth;
	};

	Window_MenuStatus.prototype.windowHeight = function() {
	    return Graphics.boxHeight - this.fittingHeight(4);
	};

	Window_MenuStatus.prototype.numVisibleRows = function() {
	    return 2;
	};

	Window_MenuStatus.prototype.maxCols = function() {
	    return 1;
	};

	// ----------------------
	// MENU COMMAND
	//-----------------------

	Window_MenuCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
	};

	Window_MenuCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
	};

	Window_MenuCommand.prototype.numVisibleRows = function() {
	    return this.maxItems() / 4;
	};

	Window_MenuCommand.prototype.maxCols = function() {
	    return 4;
	};

	// ----------------------
	// MENU GOLD
	//-----------------------

	Window_Gold.prototype.windowWidth = function() {
    return Graphics.width;
};
})();