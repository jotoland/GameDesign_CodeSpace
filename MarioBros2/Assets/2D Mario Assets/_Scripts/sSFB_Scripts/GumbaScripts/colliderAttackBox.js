//jGAT  4/1/17 PLAYER COLLIDER ATTACK BOX (ATTACK COMPONENT)
//registers the attack zone

	var hitDistance					: float			= 4.0;
	var hitTime						: float			= 0.2;

	private var playerLink			: GameObject;
	private var hitLeft				: boolean 		= false;
	private var hitRight			: boolean 		= false;
	private var changeState			: boolean 		= false;
	private var soundRate			: float			= 0.0;
	private var soundDelay			: float			= 0.0;
	private var pProp				: playerProperties;
	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function Start(){
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
		playerLink = GameObject.Find("player");
		pProp = playerLink.GetComponent("playerProperties");

	}

	function Update(){
		HitLeft();
		HitRight();
		HitDead();
		ChangePlayerState();
	}

	function OnTriggerEnter(other : Collider){
		if(other.tag == "enemyCollisionLeft"){
			//print("Left collision");
			hitLeft = true;
		}
		if(other.tag == "enemyCollisionRight"){
			//print("Right collision");
			hitRight = true;
		}
	}

	function OnTriggerExit(other : Collider){
		if(other.tag == "enemyCollisionLeft"){
			//print("Left collision");
			yield WaitForSeconds(hitTime);
			hitLeft = false;
			changeState = true;
		}
		if(other.tag == "enemyCollisionRight"){
			//print("Right collision");
			yield WaitForSeconds(hitTime);
			hitRight = false;
			changeState = true;
		}
	}

	function HitLeft(){
		if(hitLeft){
			aS.PlaySoundFX(aS.marioInjured, 0);
			playerLink.transform.Translate(-hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
			yield WaitForSeconds(hitTime);
		}
	}

	function HitRight(){
		if(hitRight){
			aS.PlaySoundFX(aS.marioInjured, 0);
			playerLink.transform.Translate(hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
			yield WaitForSeconds(hitTime);
		}
	}

	function HitDead(){
		if((hitRight || hitLeft) && pProp.playerState == 1){
			changeState = true;
		}
	}

	function ChangePlayerState(){
		if(changeState){
			if(pProp.playerState == 0){								// if MarioDead --> playerState checks for lives
				pProp.playerState = PlayerState.MarioSmall;
				pProp.changeMario = true;
			}else if(pProp.playerState == 1){						// if MarioSmall
				pProp.dead = true;							
				pProp.playerState = PlayerState.MarioDead;
				pProp.changeMario = true;
			}else if(pProp.playerState == 2){						// if MarioLarge
				pProp.playerState = PlayerState.MarioSmall;
				pProp.changeMario = true;
			}else if(pProp.playerState == 3){						// if MarioFire
				pProp.playerState = PlayerState.MarioLarge;
				pProp.changeMario = true;
			}
			changeState = false;
		}
	}


//finito