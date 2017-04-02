//jGAT 3/29/17
//Spawn Save player location setup
//Descripton: Saves the player location (save points along the way for spawning after death)
	var mainCamera					: GameObject;
	var startPoint					: Transform;
	var soundDie					: AudioClip;
	private	var soundRate			: float 		= 0.0;
	private var soundDelay			: float 		= 0.0;
	private var curSavePosition		: Vector3;
	private var loseLife			: boolean		= false;
	private var pProp;

	function playSoundFX(soundName, soundDelay){
		if(!GetComponent.<AudioSource>().isPlaying && Time.time > soundRate){
			soundRate = Time.time + soundDelay;
			GetComponent.<AudioSource>().clip = soundName;
			GetComponent.<AudioSource>().Play();
			yield WaitForSeconds(GetComponent.<AudioSource>().clip.length);
		}
	}

	function OnTriggerEnter(other : Collider){
		if(other.tag == "savePoint"){
			curSavePosition = this.transform.position;
			
		}
		if(other.tag == "killbox"){
			mainCamera.GetComponent("cameraSmoothFollow2D").enabled = false;
			playSoundFX(soundDie, 0);
			loseLife = true;
			yield WaitForSeconds(4);
			GetComponent.<Renderer>().enabled = false;
			pProp.playerState = PlayerState.MarioSmall;
			pProp.changeMario = true;
			if(pProp.lives == 0){
				return;
			}else{
				GetComponent.<Renderer>().enabled = true;
				mainCamera.GetComponent("cameraSmoothFollow2D").enabled = true;
			}
			transform.position = curSavePosition;
		}
	}

	function Start (){
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

//finito
