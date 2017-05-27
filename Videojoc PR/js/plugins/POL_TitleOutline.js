/*:
*
* @plugindesc Changes the outline color and width.
*
* @author All-P
*
* @param color
* @desc Title outline color.
* @default black
*
* @param width
* @desc Title outline width.
* @default 8

* @help
* Changes the outline color and width.
* Why would you need more help?
*
*/


(function(){

	var parameters = PluginManager.parameters('POL_TitleOutline');

	var color = String(parameters['color']);
	var width = Number(parameters['width']);

	Scene_Title.prototype.drawGameTitle = function() {
	    var x = 20;
	    var y = Graphics.height / 4;
	    var maxWidth = Graphics.width - x * 2;
	    var text = $dataSystem.gameTitle;
	    this._gameTitleSprite.bitmap.outlineColor = color;
	    this._gameTitleSprite.bitmap.outlineWidth = width;
	    this._gameTitleSprite.bitmap.fontSize = 72;
	    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
	};

})();