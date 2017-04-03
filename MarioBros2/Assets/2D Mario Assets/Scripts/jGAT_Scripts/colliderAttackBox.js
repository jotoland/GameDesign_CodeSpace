//jGAT  4/1/17 PLAYER COLLIDER ATTACK BOX (ATTACK COMPONENT)
//registers the attack zone

	var hitDistance					: float			= 4.0;
	var hitTime						: float			= 0.2;
	var hitSound					: AudioClip;
	var deadSound					: AudioClip;

	private var AUDIO_SOURCE		: AudioSource;
	private var playerLink			: GameObject;
	private var hitLeft				: boolean 		= false;
	private var hitRight			: boolean 		= false;
	private var changeState			: boolean 		= false;
	private var soundRate			: float			= 0.0;
	private var soundDelay			: float			= 0.0;
	private var pProp				: playerProperties;

	function Start(){
		playerLink = GameObject.Find("player");
		AUDIO_SOURCE = playerLink.GetComponent.<AudioSource>();
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
			PlaySoundFX(hitSound, 0);
			playerLink.transform.Translate(-hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
			yield WaitForSeconds(hitTime);
		}
	}

	function HitRight(){
		if(hitRight){
			PlaySoundFX(hitSound, 0);
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
				PlaySoundFX(deadSound, 0);
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

	function PlaySoundFX(soundName : AudioClip, soundDelay : float){
		if(!AUDIO_SOURCE.isPlaying && Time.time > soundRate){
			soundRate = Time.time + soundDelay;
			AUDIO_SOURCE.clip = soundName;
			AUDIO_SOURCE.Play();
			yield WaitForSeconds(AUDIO_SOURCE.clip.length);
		}
	}

//finito