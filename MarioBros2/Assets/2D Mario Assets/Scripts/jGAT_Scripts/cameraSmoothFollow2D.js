//jGAT 3/30/17
//smooth camera follow

var cameraTarget				: GameObject;
var player						: GameObject;
var smoothTime					: float				= 0.1;
var cameraFollowX				: boolean			= true;
var cameraFollowY				: boolean			= true;
var cameraFollowHeight			: boolean			= false;
var cameraHeight				: float				= 2.5;
var velocity					: Vector2; 
var cameraZoom					: boolean			= true;
var cameraZoomMax				: float				= 4.0;
var cameraZoomMin				: float				= 2.5;
var cameraZoomTime				: float				= 0.03;
private var curPos				: float				= 0.0;
private var playerJumpHeight	: float				= 0.0;
private var thisTransform		: Transform;


function Start (){
	thisTransform = this.transform;
}

function Update (){
	if(cameraFollowX){
		thisTransform.position.x = Mathf.SmoothDamp(thisTransform.position.x, cameraTarget.transform.position.x,  velocity.x, smoothTime);
	}
	if(cameraFollowY){
		thisTransform.position.y = Mathf.SmoothDamp(thisTransform.position.y, cameraTarget.transform.position.y,  velocity.y, smoothTime);
	}
	if(!cameraFollowY && cameraFollowHeight){
		GetComponent.<Camera>().transform.position.y = cameraHeight;
	}
	var playerControls : playerControls = player.GetComponent("playerControls");
	if(cameraZoom){
		//get current y position of player from playerControls
		curPos = player.transform.position.y;
		//relation to players position and curPos and jumpHeight
		playerJumpHeight = curPos - playerControls.startPos;
		//adjust orthographic size from the camera = jumpHeight (Lerp)
		if(playerJumpHeight < 0){
			playerJumpHeight *= -1;
		}
		if(playerJumpHeight > cameraZoomMax){
			playerJumpHeight = cameraZoomMax;
		}
		this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize, playerJumpHeight + cameraZoomMin, Time.time * cameraZoomTime);
	}
}

//finito