/*:
*
* @plugindesc Removes title screen window.
*
* @author All-KAPS
*
* @help
*
*/

(function (){

	var _Scene_Title_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
	    Scene_Base.prototype.create.call(this);
	    _Scene_Title_create.call(this);
	    this._commandWindow.opacity = 0;
	};
})();