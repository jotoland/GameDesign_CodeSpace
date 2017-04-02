//jGAT 3/29/17
//Player Properties Component
//Description: Set and Stores pickups and state of player
@script AddComponentMenu("jGAT/Actor/Player Properties Script");

	//enumeration
	enum PlayerState
	{
		MarioDead 	= 0,
		MarioSmall 	= 1,
		MarioLarge 	= 2,
		MarioFire 	= 3
	}

	var playerState 			=	PlayerState.MarioSmall;

	var lives					: int			= 3;
	var keys					: int			= 0;
	var coins					: int			= 0;
	var mainCamera				: GameObject;
	var projectileFire			: GameObject;
	var projectileSocketRight	: Transform;
	var projectileSocketLeft	: Transform;

	var materialMarioStandard	: Material;
	var materialMarioFire		: Material;

	var changeMario				: boolean		= false;
	var hasFire					: boolean		= false;
	var fireballSound			: AudioClip;
	var soundDie				: AudioClip;

	private var coinLife		: int			= 20;
	private var canShoot		: boolean		= false;
	private var dead			: boolean		= false;
	private var AUDIO_SOURCE	: AudioSource;

	private var soundDelay		: float			= 0.0;
	private var soundRate		: float			= 0.0;

	function Start(){
		AUDIO_SOURCE = GetComponent.<AudioSource>();
	}

	function Update(){
		var playerControls = GetComponent("playerControls");
		PlayerLives();
		if(changeMario){
			SetPlayerState();
		}
		if(canShoot){
			var clone;
			var rb;
			//fires a fire ball to the left when player is facing left
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 0){
				clone = Instantiate(projectileFire, projectileSocketLeft.transform.position, transform.rotation);
				PlaySoundFX(fireballSound, 0);
				clone.GetComponent("projectileFireball").moveSpeed = -2.0;
			}
			//fire ball to the right
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 1){
				clone = Instantiate(projectileFire, projectileSocketRight.transform.position, transform.rotation);
				PlaySoundFX(fireballSound, 0);
				clone.GetComponent("projectileFireball").moveSpeed = 2.0;
			}
		}else{
			return;
		}
	}

	function AddKey(numKey : int){
		keys += numKey;
	}

	function AddCoin(numCoin : int){
		coins += numCoin;
	}

	function SetPlayerState(){
		var playerControls = GetComponent("playerControls");
		var characterController = GetComponent(CharacterController);

		switch(playerState){
			case PlayerState.MarioSmall	:
				//print("mario small");
				transform.GetComponent.<Renderer>().material = materialMarioStandard;
				playerControls.gravity = 0.0;
				transform.Translate(0, 0.2, 0);
				transform.localScale = new Vector3(1.0, 0.75, 1.0);
				characterController.height = 0.45;
				playerControls.gravity = 20.0;
				canShoot = false;
				changeMario = false;
				break;
			case PlayerState.MarioLarge	:
				//print("Mario large");
				transform.GetComponent.<Renderer>().material = materialMarioStandard;
				playerControls.gravity = 0.0;
				transform.Translate(0, 0.2, 0);
				transform.localScale = new Vector3(1.0, 1.0, 1.0);
				characterController.height = 0.5;
				playerControls.gravity = 20.0;
				canShoot = false;
				changeMario = false;
				break;
			case PlayerState.MarioFire	:
				//print("mario fire");
				transform.GetComponent.<Renderer>().material = materialMarioFire;
				playerControls.gravity = 0.0;
				transform.Translate(0, 0.2, 0);
				transform.localScale = new Vector3(1.0, 1.0, 1.0);
				characterController.height = 0.5;
				playerControls.gravity = 20.0;
				canShoot = true;
				changeMario = false;
				break;
			case PlayerState.MarioDead	:
				//print("mario dead");
				playerControls.gravity = 0.0;
				this.transform.Translate(0, 3 * Time.deltaTime, 0);
				this.transform.position.z = -1;
				mainCamera.GetComponent("cameraSmoothFollow2D").enabled = false;
				yield WaitForSeconds(0.5);
				GetComponent.<CharacterController>().enabled = false;
				PlaySoundFX(soundDie, 0);
				yield WaitForSeconds(3);
				GetComponent.<CharacterController>().enabled = true;
				playerControls.gravity = 20.0;
				if(dead){
					lives--;
					dead = false;
					if(lives > 0){
						this.transform.position = GetComponent("spawnSaveSetup").curSavePosition;
					}
					playerState = PlayerState.MarioSmall;
					changeMario = true;
				}
				changeMario = false;
				break;
		}
	}

	function PlaySoundFX(soundName, soundDelay){
		if(!AUDIO_SOURCE.isPlaying && Time.time > soundRate){
			soundRate = Time.time + soundDelay;
			AUDIO_SOURCE.clip = soundName;
			AUDIO_SOURCE.Play();
			yield WaitForSeconds(AUDIO_SOURCE.clip.length);
		}
	}

	function PlayerLives(){
		if(lives == 0){
			Application.LoadLevel("2D Mario Screen Lose");
		}
	}

//finito


