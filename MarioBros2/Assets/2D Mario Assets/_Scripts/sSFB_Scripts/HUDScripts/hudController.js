//jGAT
// Hud Coin and Life Component
// controls GUI coin additions and player life additoins;

var livesFont1 					: GameObject;					// holds a sprite sheet - should be a number sheet 0-9
var coinFont1 					: GameObject;					// holds a sprite sheet - should be a number sheet 0-9
var coinFont2 					: GameObject;					// holds a sprite sheet - should be a number sheet 0-9
var coinFont3 					: GameObject;					// holds a sprite sheet - should be a number sheet 0-9
var pointFont1					: GameObject;
var pointFont2					: GameObject;
var pointFont3					: GameObject;
var pointFont4					: GameObject;

private var index				: int			= 0;
@HideInInspector var coin		: int 			= 0;
@HideInInspector var point		: int			= 0;

function aniSprite ( spriteObject : GameObject, columnSize : int, rowSize : int, colFrameStart : int, rowFrameStart : int, totalFrames : int, type:String, index : int){
	
	var font1 = ( index % 10 );							// font1 position coins
	var font2 = ( ( index - font1 ) / 10 ) % 10;		// font2 position coins
	var font3 = ( ( index - font1 ) / 100 ) % 10;		// font3 position coins
	var font4 = (  index % 10 );						// font4 position lives

	if ( type == "font1" ) index = font1;				// check for which sprite sheet to use - font1
	if ( type == "font2" ) index = font2;				// check for which sprite sheet to use - font2
	if ( type == "font3" ) index = font3;				// check for which sprite sheet to use - font3
	if ( type == "font4" ) index = font4;				// check for which sprite sheet to use - font4
	
	var size = Vector2 ( 1.0 / columnSize, 1.0 / rowSize );	// find scale to show on poly 

	var u = index % columnSize;								// u cord separated from v, to find just the column and mod it
	var v = index / columnSize;								// v finds location on row based on columnSize count
	
	var offset = Vector2 ( ( u + colFrameStart ) * size.x, ( 1.0 - size.y ) - ( v + rowFrameStart ) * size.y );	// offset uv's
	
	spriteObject.GetComponent(Renderer).material.mainTextureOffset = offset; 	// apply the offset amount to the correct sprite sheet object
	spriteObject.GetComponent(Renderer).material.mainTextureScale  = size; 		// apply the scale amount to the correct sprite sheet object
}

function aniSpritePoints ( spriteObject : GameObject, columnSize : int, rowSize : int, colFrameStart : int, rowFrameStart : int, totalFrames : int, type:String, index : int){
	
	var font1 = ( index % 10 );							// font1 position coins
	var font2 = ( ( index - font1 ) / 10 ) % 10;		// font2 position coins
	var font3 = ( ( index - font1 ) / 100 ) % 10;		// font3 position coins
	var font4 = ( ( index - font1 ) / 1000 ) % 10;		// font4 position lives

	if ( type == "font1" ) index = font1;				// check for which sprite sheet to use - font1
	if ( type == "font2" ) index = font2;				// check for which sprite sheet to use - font2
	if ( type == "font3" ) index = font3;				// check for which sprite sheet to use - font3
	if ( type == "font4" ) index = font4;				// check for which sprite sheet to use - font4
	
	var size = Vector2 ( 1.0 / columnSize, 1.0 / rowSize );	// find scale to show on poly 

	var u = index % columnSize;								// u cord separated from v, to find just the column and mod it
	var v = index / columnSize;								// v finds location on row based on columnSize count
	
	var offset = Vector2 ( ( u + colFrameStart ) * size.x, ( 1.0 - size.y ) - ( v + rowFrameStart ) * size.y );	// offset uv's
	
	spriteObject.GetComponent(Renderer).material.mainTextureOffset = offset; 	// apply the offset amount to the correct sprite sheet object
	spriteObject.GetComponent(Renderer).material.mainTextureScale  = size; 		// apply the scale amount to the correct sprite sheet object
}

function Update (){
	var player : GameObject = GameObject.Find("player");
	var pProp : playerProperties = player.GetComponent("playerProperties");
	var lives = pProp.lives;

	if (coinFont1 != null) 	aniSprite ( coinFont1, 10, 1, 0, 0, 10, "font1", coin );	// animated font sprite - type: font1
	if (coinFont2 != null) 	aniSprite ( coinFont2, 10, 1, 0, 0, 10, "font2", coin );	// animated font sprite - type: font2
	if (coinFont3 != null) 	aniSprite ( coinFont3, 10, 1, 0, 0, 10, "font3", coin );	// animated font sprite - type: font3
	if (livesFont1 != null) aniSprite ( livesFont1, 10, 1, 0, 0, 10, "font4", lives );	// animated font sprite - type: font4	

	if (pointFont1 != null) 	aniSpritePoints ( pointFont1, 10, 1, 0, 0, 10, "font1", point );	// animated font sprite - type: font1
	if (pointFont2 != null) 	aniSpritePoints ( pointFont2, 10, 1, 0, 0, 10, "font2", point );	// animated font sprite - type: font2
	if (pointFont3 != null) 	aniSpritePoints ( pointFont3, 10, 1, 0, 0, 10, "font3", point );	// animated font sprite - type: font3
	if (pointFont4 != null) 	aniSpritePoints ( pointFont4, 10, 1, 0, 0, 10, "font4", point );	// animated font sprite - type: font4

}

//finito