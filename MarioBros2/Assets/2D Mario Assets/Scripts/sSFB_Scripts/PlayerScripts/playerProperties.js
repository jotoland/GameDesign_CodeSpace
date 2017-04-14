import UnityEngine.UI;
import UnityEngine.SceneManagement;
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
	var GameOverText			: Text;
	var BackGround				: Image;
	var flashSpeed				: float			= 5.0;
	var flashColor				: Color			= new Color(0.0, 0.0, 0.0, 1.0);
	var flashTextColor			: Color			= new Color(1.0, 0.0, 0.0, 1.0);
	var projectileSocketRight	: Transform;
	var projectileSocketLeft	: Transform;

	var materialMarioStandard	: Material;
	var materialMarioFire		: Material;

	var changeMario				: boolean		= false;
	var hasFire					: boolean		= false;

	private var coinLife		: int			= 20;
	private var canShoot		: boolean		= false;
	@HideInInspector var dead	: boolean		= false;

	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function Start (){
 		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
	}

	function Update(){
		var playerControls : playerControls = GetComponent("playerControls");
		PlayerLives();
		if(changeMario){
			SetPlayerState();
		}
		if(canShoot){
			var clone : GameObject;

			//fires a fire ball to the left when player is facing left
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 0){
				clone = Instantiate(projectileFire, projectileSocketLeft.transform.position, transform.rotation);
				var projectileFireballScript : projectileFireball = clone.GetComponent("projectileFireball");
				aS.PlaySoundFX(aS.fireballSpawn, 0);
				projectileFireballScript.moveSpeed = -2.0;
			}
			//fire ball to the right
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 1){
				clone = Instantiate(projectileFire, projectileSocketRight.transform.position, transform.rotation);
				var projectileFireballScript2 : projectileFireball = clone.GetComponent("projectileFireball");
				aS.PlaySoundFX(aS.fireballSpawn, 0);
				projectileFireballScript2.moveSpeed = 2.0;
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
		var playerControls : playerControls = GetComponent("playerControls");
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
				var smoothFollowScript : cameraSmoothFollow2D = mainCamera.GetComponent("cameraSmoothFollow2D");
				smoothFollowScript.enabled = false;
				yield WaitForSeconds(0.5);
				GetComponent.<CharacterController>().enabled = false;
				aS.PlaySoundFX(aS.marioDie, 0);
				yield WaitForSeconds(aS.marioDie.length);
				if(dead){
					lives--;
					dead = false;
					if(lives > 0){
						smoothFollowScript.enabled = true;
						GetComponent.<CharacterController>().enabled = true;
						playerControls.gravity = 20.0;
						var spawnSaveSetupScript : spawnSaveSetup = GetComponent("spawnSaveSetup");
						this.transform.position = spawnSaveSetupScript.curSavePosition;
					}
					playerState = PlayerState.MarioSmall;
					changeMario = true;
				}
				changeMario = false;
				break;
		}
	}


	function PlayerLives(){
		if(lives == 0){
			yield WaitForSeconds(1);
			BackGround.color = Color.Lerp(BackGround.color,  flashColor, flashSpeed * Time.deltaTime);
			GameOverText.color = Color.Lerp(GameOverText.color, flashTextColor, flashSpeed * Time.deltaTime);
			yield WaitForSeconds(6);
			SceneManager.LoadScene("jGAT_WelcomeScene");
		}
	}

//finito


