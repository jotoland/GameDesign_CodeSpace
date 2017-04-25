
var PAUSED : boolean = false;

function Start () {
	
}

function Update () {
	
}


function GameIsPaused(){
	var camera : GameObject = GameObject.Find("main_camera_and_hud");
	var cameraScript : cameraSmoothFollow2D = camera.GetComponent("cameraSmoothFollow2D");
	if(PAUSED){
		cameraScript.enabled = true;
		PAUSED = false;
	}else{
		cameraScript.enabled = false;
		PAUSED = true;
	}
	

}