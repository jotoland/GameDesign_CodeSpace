//jGAT 3/29/17
//Spawn Save player location setup
//Descripton: Saves the player location (save points along the way for spawning after death)
	var mainCamera								: GameObject;
	var startPoint								: Transform;

	private	var soundRate						: float 		= 0.0;
	private var soundDelay						: float 		= 0.0;
	@HideInInspector var curSavePosition		: Vector3;
	private var loseLife						: boolean		= false;
	private var pProp							: playerProperties;

	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function Start (){
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
		pProp = GetComponent("playerProperties");
		if(startPoint != null){
			this.transform.position = startPoint.position;
		}
	}


	function Update(){
		if(loseLife){
			loseLife = false;
			pProp.lives -= 1;
		}
	}


	function OnTriggerEnter(other : Collider){
		if(other.tag == "savePoint"){
			curSavePosition = this.transform.position;
			
		}
		if(other.tag == "killbox"){
			var player : GameObject = GameObject.Find("player");
			var pControl : playerControls = player.GetComponent("playerControls");
			var cameraSmoothFollowScript : cameraSmoothFollow2D = mainCamera.GetComponent("cameraSmoothFollow2D");
			cameraSmoothFollowScript.enabled = false;
			GetComponent.<Renderer>().enabled = false;
			pControl.gravity = 0.0;
			GetComponent.<CharacterController>().enabled = false;
			aS.PlaySoundFX(aS.marioDie, 0);
			loseLife = true;
			yield WaitForSeconds(aS.marioDie.length);
			pProp.playerState = PlayerState.MarioSmall;
			pProp.changeMario = true;
			if(pProp.lives == 0){
				return;
			}else{
				GetComponent.<Renderer>().enabled = true;
				cameraSmoothFollowScript.enabled = true;
				transform.position = curSavePosition;
				pControl.gravity = 20.0;
				GetComponent.<CharacterController>().enabled = true;
			}
		
		}
	}

//finito
