//=============================================================================
// Bobstah Plugins
// BOB_BattleStatusEx.js
// Version: 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.BOB_BattleStatusEx = true;

var Bobstah = Bobstah || {};
Bobstah.BattleStatusEx = Bobstah.BattleStatusEx || {};

//=============================================================================
 /*:
 * @plugindesc Provides a new basic layout for the battle scene.
 * @author Bobstah
 *
 * ============================================================================
 * Params
 * ============================================================================
 * @param ---FACES---
 * @param Draw Faces
 * @desc If 1, we will draw a sliver of the actor's face in the status window.
 * @default 1
 *
 * @param Face X Offset
 * @desc X coordinate offset for face drawing. Only used if Draw Faces is 1.
 * @default 0
 *
 * @param Face Y Offset
 * @desc Y coordinate offset for face drawing. Only used if Draw Faces is 1.
 * @default 1
 *
 * @param Face Width
 * @desc Width for face drawing. Only used if Draw Faces is 1.
 * @default 144
 * 
 * @param Face Height
 * @desc X coordinate offset for face drawing. Only used if Draw Faces is 1.
 * @default 34
 *
 * @param ---NAMES---
 * @param Draw Names
 * @desc If 1, we will draw the actor's name in the status window.
 * @default 1
 *
 * @param Name X Offset
 * @desc X coordinate offset for name drawing. Only used if Draw Names is 1.
 * @default 0
 *
 * @param Name Y Offset
 * @desc Y coordinate offset for name drawing. Only used if Draw Names is 1.
 * @default 0
 *
 * @param Name Width
 * @desc Width for name drawing. Only used if Draw Names is 1.
 * @default 150
 *
 * @param ---ICONS---
 * @param Icon Width Offset
 * @desc X coordinate offset for draw buff/state icons.
 * @default -156
 *
 * @param ---SKILL WINDOW---
 * @param Adjust Skill Window
 * @desc If 1, place the skill window on the right. If 0, do nothing.
 * @default 1
 *
 * @param Skill Window Anchor
 * @desc What window to anchor the skill window to. Valid: help. (Expanding later)
 * @default help
 * 
 * @param Skill Window Width
 * @desc The width of the skill window.
 * @default 350
 *
 * @param Skill Window Width Offset
 * @desc The offset of the skill window width.
 * @default 50
 *
 * @param ---ITEM WINDOW---
 * @param Adjust Item Window
 * @desc If 1, place the item window on the right. If 0, do nothing.
 * @default 1
 *
 * @param Item Window Anchor
 * @desc What window to anchor the item window to. Valid: help. (Expanding later)
 * @default help
 * 
 * @param Item Window Width
 * @desc The width of the item window.
 * @default 350
 *
 * @param Item Window Width Offset
 * @desc The offset of the item window width.
 * @default 50
 *
 * @param ---Gauges---
 * @param Gauges Behind
 * @desc If 0, draw gauges above actor names and faces. If 1, draw gauges below actor names and faces. If 2, use battle defaults.
 * @default 1
 *
 * @param ---ATB---
 * @param ATB Plugin
 * @desc If using Ellye's Simple ATB, set this to ellye.
 * @default none
 *
 * @param ATB Gauge Style
 * @desc Draw a Vertical or Horizontal ATB gauge.
 * @default vertical
 * 
 * @param ATB Vertical Align
 * @desc Where to draw the ATB gauge in the anchor. Valid: top, bottom.
 * @default bottom
 *
 * @param ATB Gauge Anchor
 * @desc Where to anchor the ATB gauge. Valid: face, name
 * @default face
 *
 * @param ATB Gauge Width
 * @desc If 0, use the default vertical or horizontal setting. If not, override.
 * @default 15
 *
 * @param ATB Gauge Height
 * @desc If 0, use the default vertical or horizontal setting. If not, override.
 * @default 0
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin introduces a new basic battle layout that is somewhat
 * customizable. Inspired by Anon "Withlove" at /rpgmg/.
 *
 * You can use the notetag <BattleFace> to change the face graphic
 * of a battler depending on state. More states will be added as
 * time goes on. See the Notetags section for more information.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * Actor
 *  <BattleFace state: index, graphic>
 *  State is the actor's current state in battle. See the
 *      states section for more info.
 *  Index is the index of the face in the faceset. It starts
 *      at 0 and goes to 7 by default. The first face in a faceset
 *      is 0 and the last one is 7.
 *  Graphic is the filename of the faceset to use for this face. It
 *      must be located in the img/faces folder.
 *
 * ============================================================================
 * States
 * ============================================================================
 * The following states are valid:
 * Inputting - When the actor is selecting a command
 * Waiting - When the actor is waiting to act after selecting a command.
 * Undecided - When the actor has not yet chosen an action this round.
 * 
 * If you're using an ATB, you gain can use the following states:
 * casting
 *
 * ============================================================================
 * Examples
 * ============================================================================
 * Let's set an actor to have three face sets, using a file
 * called myNewFaces.png:
 * <BattleFace Inputting: 1, myNewFaces>
 * <BattleFace Waiting: 1, myNewFaces>
 * <BattleFace Undecided: 1, myNewFaces>
 * <BattleFace Casting: 1, myNewFaces>
 *
 * You do not need to include the extension in the face file name.
 */
 
//=============================================================================
// Parameter Variables
//=============================================================================

Bobstah.Parameters = PluginManager.parameters('BOB_BattleStatusEx');
Bobstah.Param = Bobstah.Param || {};

Bobstah.Param.BattleStatusEx_DrawFaces = Number(Bobstah.Parameters['Draw Faces']);
Bobstah.Param.BattleStatusEx_DrawNames = Number(Bobstah.Parameters['Draw Names']);
Bobstah.Param.BattleStatusEx_FaceX = Number(Bobstah.Parameters['Face X Offset']);
Bobstah.Param.BattleStatusEx_FaceY = Number(Bobstah.Parameters['Face Y Offset']);
Bobstah.Param.BattleStatusEx_FaceWidth = Number(Bobstah.Parameters['Face Width']);
Bobstah.Param.BattleStatusEx_FaceHeight = Number(Bobstah.Parameters['Face Height']);
Bobstah.Param.BattleStatusEx_NameX = Number(Bobstah.Parameters['Name X Offset']);
Bobstah.Param.BattleStatusEx_NameY = Number(Bobstah.Parameters['Name Y Offset']);
Bobstah.Param.BattleStatusEx_NameWidth = Number(Bobstah.Parameters['Name Width']);
Bobstah.Param.BattleStatusEx_IconWidth = Number(Bobstah.Parameters['Icon Width Offset']);
Bobstah.Param.BattleStatusEx_SkillAdjust = Number(Bobstah.Parameters['Adjust Skill Window']);
Bobstah.Param.BattleStatusEx_SkillAnchor = Bobstah.Parameters['Skill Window Anchor'].toLowerCase();
Bobstah.Param.BattleStatusEx_SkillWidth = Number(Bobstah.Parameters['Skill Window Width']);
Bobstah.Param.BattleStatusEx_SkillWidthOffset = Number(Bobstah.Parameters['Skill Window Width Offset']);
Bobstah.Param.BattleStatusEx_ItemAdjust = Number(Bobstah.Parameters['Adjust Item Window']);
Bobstah.Param.BattleStatusEx_ItemAnchor = Bobstah.Parameters['Item Window Anchor'].toLowerCase();
Bobstah.Param.BattleStatusEx_ItemWidth = Number(Bobstah.Parameters['Item Window Width']);
Bobstah.Param.BattleStatusEx_ItemWidthOffset = Number(Bobstah.Parameters['Item Window Width Offset']);
Bobstah.Param.BattleStatusEx_GaugesBehind = Number(Bobstah.Parameters['Gauges Behind']);
//ATB options
Bobstah.Param.BattleStatusEx_ATB = Bobstah.Parameters['ATB Plugin'].toLowerCase();
Bobstah.Param.BattleStatusEx_ATBGaugeStyle = Bobstah.Parameters['ATB Gauge Style'].toLowerCase();
Bobstah.Param.BattleStatusEx_ATBGaugeVAlign = Bobstah.Parameters['ATB Vertical Align'].toLowerCase();
Bobstah.Param.BattleStatusEx_ATBGaugeAnchor = Bobstah.Parameters['ATB Gauge Anchor'].toLowerCase();
Bobstah.Param.BattleStatusEx_ATBGaugeWidth = Number(Bobstah.Parameters['ATB Gauge Width']);
Bobstah.Param.BattleStatusEx_ATBGaugeHeight = Number(Bobstah.Parameters['ATB Gauge Height']);
Bobstah.Param.BattleStatusEx_ATBGaugeBehind = Number(Bobstah.Parameters['ATB Gauge Behind']);

switch (Bobstah.Param.BattleStatusEx_ATB) {
	case "ellye":
		//Load other ATB Plugin parameters
		var ellyeParameters = $plugins.filter(function(p) {
			return p.description.contains('<Ellye ATB>');
		})[0].parameters; //Thanks to Iavra
		Bobstah.Param.BattleStatusEx_ATBCastName = String(ellyeParameters['Cast Gauge Name']) || "";
}


//=============================================================================
// Plugin Functions
//=============================================================================
Bobstah.BattleStatusEx.createFacesObject = function() {
	var obj = {};
	return obj;
}

Bobstah.BattleStatusEx.createFaceNode = function(state, index, file) {
	file = file || null;
	var obj = {
		'actionState': state,
		'file': file,
		'index': index
	}
	return obj;
};

Bobstah.BattleStatusEx.createDrawNode = function(drawType, x, y, width, height) {
	var obj = {
		'drawType': drawType || 0,
		'x': x || 0,
		'y': y || 0,
		'w': width || 0,
		'h': height || 0
	}
	return obj;
}

//=============================================================================
// DataManager
//=============================================================================
Bobstah.BattleStatusEx.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.BattleStatusEx.DataManager_isDatabaseLoaded.call(this)) return false;
	DataManager.processBobstahBattleFaces($dataActors);
	
	return true;
};

DataManager.processBobstahBattleFaces = function(group) {
	var faceregex = /<BattleFace\s+(\S+)\s*:\s*(\d+),\s*(\S+)\s*>/ig;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		obj.battleFaces = obj.battleFaces || Bobstah.BattleStatusEx.createFacesObject();
		var faceData = null;
		
		while (faceData = faceregex.exec(obj.note)) {
			var state = faceData[1].toLowerCase();
			var index = Number(faceData[2]);
			var file = faceData[3];
			
			obj.battleFaces[state] = Bobstah.BattleStatusEx.createFaceNode(state, index, file);
		}
	}
};

//=============================================================================
// Game_Actor
//=============================================================================
Bobstah.BattleStatusEx.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	var res = Bobstah.BattleStatusEx.GameActor_setup.call(this, actorId);
	this.battleFaces = $dataActors[actorId].battleFaces;
	for (var state in this.battleFaces) {
		var face = this.battleFaces[state];
		ImageManager.loadFace(face.file);
	}
	return res;
};

Bobstah.BattleStatusEx.GameActor_faceName = Game_Actor.prototype.faceName;
Game_Actor.prototype.faceName = function() {
	if (typeof(this.battleFaces) !== "undefined") {
		var state = this._actionState;
		switch (Bobstah.Param.BattleStatusEx_ATB) {
			case 'ellye':
				if (this.castName() !== Bobstah.Param.BattleStatusEx_ATBCastName) {
					if (typeof(this.battleFaces['casting'] !== "undefined")) {
						state = 'casting';
					}
				}
			
			default:
				if (state.length !== 0) {
					if (typeof(this.battleFaces[state]) !== "undefined") {
						return this.battleFaces[state].file;
					}
				}
			break;
		}
		
	}
	return Bobstah.BattleStatusEx.GameActor_faceName.call(this);
};

Bobstah.BattleStatusEx.GameActor_faceIndex = Game_Actor.prototype.faceIndex;
Game_Actor.prototype.faceIndex = function() {
	if (typeof(this.battleFaces) !== "undefined") {
		var state = this._actionState;
		switch (Bobstah.Param.BattleStatusEx_ATB) {
			case 'ellye':
				if (this.castName() !== Bobstah.Param.BattleStatusEx_ATBCastName) {
					if (typeof(this.battleFaces['casting'] !== "undefined")) {
						state = 'casting';
					}
				}
			
			default:
				
				if (state.length !== 0) {
					if (typeof(this.battleFaces[state]) !== "undefined") {
						return this.battleFaces[state].index;
					}
				}
			break;
		}
	}
	return Bobstah.BattleStatusEx.GameActor_faceIndex.call(this);
};

//=============================================================================
// Window_Base
//=============================================================================
Window_Base.prototype.drawVerticalGauge = function(x, y, width, height, rate, color1, color2) {
	var fillH = 1-Math.floor(height * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, y, width, height, this.gaugeBackColor());
    this.contents.gradientFillRect(x, y+height, width, fillH, color1, color2);
};

//=============================================================================
// Window_BattleStatus
//=============================================================================
Bobstah.BattleStatusEx.WindowBattleStatus_drawItem = Window_BattleStatus.prototype.drawItem;
Window_BattleStatus.prototype.drawItem = function(index) {
	this._exDrawing = {};
	var actor = $gameParty.battleMembers()[index];
	this._index = index;
	this.computeDraws(this.basicAreaRect(index), actor);
	if (Bobstah.Param.BattleStatusEx_GaugesBehind === 1) {
		this.drawGaugeArea(this.gaugeAreaRect(index), actor);
		this.drawBasicArea(this.basicAreaRect(index), actor);
	} else if (Bobstah.Param.BattleStatusEx_GaugesBehind === 0) {
		this.drawBasicArea(this.gaugeAreaRect(index), actor);
		this.drawGaugeArea(this.basicAreaRect(index), actor);
	} else {
		Bobstah.BattleStatusEx.WindowBattleStatus_drawItem.call(this, index);
	}
};

Window_BattleStatus.prototype.computeDraws = function(rect, actor) {
	var curX = rect.x;
	var curY = rect.y;
	this._exDrawing[this._index] = [];
	var draw = this._exDrawing[this._index];
	if (Bobstah.Param.BattleStatusEx_ATB !== 'none') {
		if (Bobstah.Param.BattleStatusEx_ATBGaugeAnchor === 'face') {
			curX += this.exSetATBGaugeDraws(draw, curX, curY, Bobstah.Param.BattleStatusEx_FaceWidth, Bobstah.Param.BattleStatusEx_FaceHeight);
		}
	}
	if (Bobstah.Param.BattleStatusEx_DrawFaces === 1) {
		curX += Bobstah.Param.BattleStatusEx_FaceX;
		draw.push(Bobstah.BattleStatusEx.createDrawNode('face', curX, curY + Bobstah.Param.BattleStatusEx_FaceY, Bobstah.Param.BattleStatusEx_FaceWidth,Bobstah.Param.BattleStatusEx_FaceHeight));
		curX += Bobstah.Param.BattleStatusEx_FaceWidth;
	}
	
	if (Bobstah.Param.BattleStatusEx_ATB !== 'none') {
		if (Bobstah.Param.BattleStatusEx_ATBGaugeAnchor === 'name') {
			curX += this.exSetATBGaugeDraws(draw, curX, curY, Bobstah.Param.BattleStatusEx_FaceWidth, Bobstah.Param.BattleStatusEx_FaceHeight);
		}
	}
	if (Bobstah.Param.BattleStatusEx_DrawNames === 1) {
		draw.push(Bobstah.BattleStatusEx.createDrawNode('name', curX, curY + Bobstah.Param.BattleStatusEx_NameY, Bobstah.Param.BattleStatusEx_NameWidth));
		curX += Bobstah.Param.BattleStatusEx_NameX + Bobstah.Param.BattleStatusEx_NameWidth;
	}
	draw.push(Bobstah.BattleStatusEx.createDrawNode('icons', curX, curY, rect.width + Bobstah.Param.BattleStatusEx_IconWidth));
}

Bobstah.BattleStatusEx.WindowBattleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
	var draw = this._exDrawing[this._index];
	var actor = $gameParty.battleMembers()[this._index];
	for (var i = 0; i < draw.length; i++) {
		var node = draw[i];
		switch (node.drawType) {
			case 'face':
				this.drawActorFace(actor, node.x, node.y, node.w, node.h);
			break;
			
			case 'name':
				this.drawActorName(actor, node.x, node.y, node.w);
			break;
			
			case 'icons':
				this.drawActorIcons(actor, node.x, node.y, node.w);
			break;
		}
	}
}

Window_BattleStatus.prototype.drawBasicAreaOld = function(rect, actor) {
	var curX = rect.x;
	var curY = rect.y;
	if (Bobstah.Param.BattleStatusEx_ATB !== 'none') {
		if (Bobstah.Param.BattleStatusEx_ATBGaugeAnchor === 'face') {
			curX += this.exATBGauge(actor, curX, curY, Bobstah.Param.BattleStatusEx_FaceWidth, Bobstah.Param.BattleStatusEx_FaceHeight);
		}
	}
	if (Bobstah.Param.BattleStatusEx_DrawFaces === 1) {
		console.log('Drawing face at '+curX + Bobstah.Param.BattleStatusEx_FaceX+','+rect.y + Bobstah.Param.BattleStatusEx_FaceY);
		this.drawActorFace(actor, curX + Bobstah.Param.BattleStatusEx_FaceX, rect.y + Bobstah.Param.BattleStatusEx_FaceY, Bobstah.Param.BattleStatusEx_FaceWidth, Bobstah.Param.BattleStatusEx_FaceHeight);
		curX += Bobstah.Param.BattleStatusEx_FaceX + Bobstah.Param.BattleStatusEx_FaceWidth;
	}
	
	if (Bobstah.Param.BattleStatusEx_ATB !== 'none') {
		if (Bobstah.Param.BattleStatusEx_ATBGaugeAnchor === 'name') {
			curX += this.exATBGauge(actor, curX, curY, Bobstah.Param.BattleStatusEx_NameWidth, Bobstah.Param.BattleStatusEx_FaceHeight);
		}
	}
	if (Bobstah.Param.BattleStatusEx_DrawNames === 1) {
		this.drawActorName(actor, curX + Bobstah.Param.BattleStatusEx_NameX, curY + Bobstah.Param.BattleStatusEx_NameY, Bobstah.Param.BattleStatusEx_NameWidth);
		curX += Bobstah.Param.BattleStatusEx_NameX + Bobstah.Param.BattleStatusEx_NameWidth;
	}
	
	this.drawActorIcons(actor, curX, curY, rect.width + Bobstah.Param.BattleStatusEx_IconWidth);
};

Bobstah.BattleStatusEx.WindowBasttleStatus_drawActorName = Window_BattleStatus.prototype.drawActorName;
Window_BattleStatus.prototype.drawActorName = function(actor, x, y, width) {
    if (Bobstah.Param.BattleStatusEx_ATB === "none") { return Bobstah.BattleStatusEx.WindowBasttleStatus_drawActorName.call(this, actor, x, y, width); }
	width = width || 168;
    this.changeTextColor(this.hpColor(actor));
	switch (Bobstah.Param.BattleStatusEx_ATB) {
		case "ellye":
			if (actor.castName() !== Bobstah.Param.BattleStatusEx_ATBCastName) {
				this.changeTextColor(this.systemColor());
				var name = actor.castName();
			} else {
				var name = actor.name();
			}
		break;
		
		default:
			var name = actor.name();
		break;
	}
    this.drawText(name, x, y, width);
};

//=============================================================================
// Window_BattleSkill
//=============================================================================
Bobstah.BattleStatusEx.WindowBattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
	if (Bobstah.Param.BattleStatusEx_SkillAdjust === 1) {
		var nx = (x === 0 ? (Graphics.boxWidth - Bobstah.Param.BattleStatusEx_SkillWidth) - Bobstah.Param.BattleStatusEx_SkillWidthOffset : x);
		var nw =  Bobstah.Param.BattleStatusEx_SkillWidth;
		var res = Bobstah.BattleStatusEx.WindowBattleSkill_initialize.call(this, nx, y, nw, height);
		return res;
	} else {
		return Bobstah.BattleStatusEx.WindowBattleSkill_initialize.call(this, x, y, width, height);
	}
};

Bobstah.BattleStatusEx.WindowBattleSkill_setHelpWindow = Window_BattleSkill.prototype.setHelpWindow;
Window_BattleSkill.prototype.setHelpWindow = function (helpWindow) {
	var res = Bobstah.BattleStatusEx.WindowBattleSkill_setHelpWindow.call(this, helpWindow);
	if (Bobstah.Param.BattleStatusEx_SkillAdjust === 0) { return res; }
	if (Bobstah.Param.BattleStatusEx_SkillAnchor === "help") {
		var ny = helpWindow.y + helpWindow.height;
		this.y = ny;
	}
	return res;
};

Bobstah.BattleStatusEx.WindowBattleSkill_maxCols = Window_BattleSkill.prototype.maxCols;
Window_BattleSkill.prototype.maxCols = function() {
    if (Bobstah.Param.BattleStatusEx_SkillAdjust === 0) { return Bobstah.BattleStatusEx.WindowBattleSkill_maxCols.call(this); }
	return 1;
};

//=============================================================================
// Window_BattleItem
//=============================================================================
Bobstah.BattleStatusEx.WindowBattleItem_initialize = Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(x, y, width, height) {
	if (Bobstah.Param.BattleStatusEx_ItemAdjust === 1) {
		var nx = (x === 0 ? (Graphics.boxWidth - Bobstah.Param.BattleStatusEx_ItemWidth) - Bobstah.Param.BattleStatusEx_ItemWidthOffset : x);
		var nw =  Bobstah.Param.BattleStatusEx_ItemWidth;
		var res = Bobstah.BattleStatusEx.WindowBattleItem_initialize.call(this, nx, y, nw, height);
		return res;
	} else {
		return Bobstah.BattleStatusEx.WindowBattleItem_initialize.call(this, x, y, width, height);
	}
};

Bobstah.BattleStatusEx.WindowBattleItem_setHelpWindow = Window_BattleItem.prototype.setHelpWindow;
Window_BattleItem.prototype.setHelpWindow = function (helpWindow) {
	var res = Bobstah.BattleStatusEx.WindowBattleItem_setHelpWindow.call(this, helpWindow);
	if (Bobstah.Param.BattleStatusEx_SkillAdjust === 0) { return res; }
	if (Bobstah.Param.BattleStatusEx_SkillAnchor === "help") {
		var ny = helpWindow.y + helpWindow.height;
		this.y = ny;
	}
	return res;
};

Bobstah.BattleStatusEx.WindowBattleItem_maxCols = Window_BattleSkill.prototype.maxCols;
Window_BattleItem.prototype.maxCols = function() {
    if (Bobstah.Param.BattleStatusEx_SkillAdjust === 0) { return Bobstah.BattleStatusEx.WindowBattleItem_maxCols.call(this); }
	return 1;
};

//=============================================================================
// General ATB Integration
//=============================================================================
if (Bobstah.Param.BattleStatusEx_ATB !== 'none') {
	//=============================================================================
	// Window_BattleStatus
	//=============================================================================
	Window_BattleStatus.prototype.drawBobstahATBGauge = function(x, y, width, height, rate, color1, color2) {
		var height = height || 6;
		var fillW = Math.floor(width * rate);
		var gaugeY = this.lineHeight() - 8;
		this.contents.fillRect(x, y, width, height, this.gaugeBackColor());
		this.contents.gradientFillRect(x, y, fillW, height, color1, color2);
	};
	
	Window_BattleStatus.prototype.setBobstahATB = function(atbX, atbY, atbW, atbH) {
		this._exAtbX = atbX;
		this._exAtbY = atbY;
		this._exAtbW = atbW;
		this._exAtbH = atbH;
		this._exAtbReady = true;
	}
	
	Window_BattleStatus.prototype.exSetATBGaugeDraws = function(draw, x, y, aW, aH) {
		var atbWidth = (Bobstah.Param.BattleStatusEx_ATBGaugeWidth === 0 ? aW : Bobstah.Param.BattleStatusEx_ATBGaugeWidth);
		var atbHeight = (Bobstah.Param.BattleStatusEx_ATBGaugeHeight === 0 ? aH : Bobstah.Param.BattleStatusEx_ATBGaugeHeight);
		var atbY = (Bobstah.Param.BattleStatusEx_ATBGaugeVAlign === 'bottom' ? (y + aH) - atbHeight : y);
		switch (Bobstah.Param.BattleStatusEx_ATB) {
			case "ellye":
				draw.push(Bobstah.BattleStatusEx.createDrawNode('atb', x, atbY, atbWidth, atbHeight));
				
			default:
				return (Bobstah.Param.BattleStatusEx_ATBGaugeBehind === 0 ? atbWidth : 0);
		}
	};
	
	Window_BattleStatus.prototype.exATBGauge = function(actor, x, y, aW, aH) {
		var atbWidth = (Bobstah.Param.BattleStatusEx_ATBGaugeWidth === 0 ? aW : Bobstah.Param.BattleStatusEx_ATBGaugeWidth);
		var atbHeight = (Bobstah.Param.BattleStatusEx_ATBGaugeHeight === 0 ? aH : Bobstah.Param.BattleStatusEx_ATBGaugeHeight);
		var atbY = (Bobstah.Param.BattleStatusEx_ATBGaugeVAlign === 'bottom' ? (y + aH) - atbHeight : y);
		switch (Bobstah.Param.BattleStatusEx_ATB) {
			case "ellye":
				this.setBobstahATB(x, atbY, atbWidth, atbHeight);
				
			default:
				return (Bobstah.Param.BattleStatusEx_ATBGaugeBehind === 0 ? atbWidth : 0);
		}
	};
}

//=============================================================================
// Ellye ATB Integration - Check for most recent version!
//=============================================================================
if (typeof(Window_Base.prototype.drawActorATBGauge) !== "undefined") {
	//=============================================================================
	// Window_Base
	//=============================================================================
	Bobstah.BattleStatusEx.WindowBase_drawActorATBGauge = Window_Base.prototype.drawActorATBGauge;
	Window_Base.prototype.drawActorATBGauge = function(x, y, width, ratio, color1, color2, text, text_x, text_y, text_width)
	{
		var draw = this._exDrawing[this._index];
		var node = null;
		for (var i = 0; i < draw.length; i++) {
			var temp = draw[i];
			if (temp.drawType === 'atb') { node = temp; break; }
		}
		if (node === null) { 
			return Bobstah.BattleStatusEx.WindowBase_drawActorATBGauge.call(this, x, y, width, ratio, color1, color2, text, text_x, text_y, text_width);
		}
		
		if (Bobstah.Param.BattleStatusEx_ATBGaugeStyle === 'vertical') {
			this.drawVerticalGauge(node.x, node.y, node.w, node.h, ratio, color1, color2);
		} else if (Bobstah.Param.BattleStatusEx_ATBGaugeStyle === 'horizontal') {
			this.drawBobstahATBGauge(node.x, node.y, node.w, node.h, ratio, color1, color2);
		}
		node = null;
	};
}