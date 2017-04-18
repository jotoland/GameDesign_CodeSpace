import UnityEngine.UI;
import UnityEngine.SceneManagement;
//jGAT 3/29/17
//Spawn Save player location setup
//Descripton: Saves the player location (save points along the way for spawning after death)
	var mainCamera								: GameObject;
	var startPoint								: Transform;
	var VictoryText								: Text;
	var BackGround								: Image;
	var yellow 									: Color = new Color(0.0, 0.0, 0.0, 1.0);
	var black 									: Color = new Color(1.0, 0.0, 0.0, 1.0);
	private	var soundRate						: float 		= 0.0;
	private var soundDelay						: float 		= 0.0;
	private var flashSpeed						: float			= 5.0;
	@HideInInspector var curSavePosition		: Vector3;
	private var loseLife						: boolean		= false;
	private var pProp							: playerProperties;

	private var audioCam						: GameObject;
	private var aS								: soundFXHandler;
	private var player 							: GameObject;
	private var pControl 						: playerControls;
	private var cameraSmoothFollowScript 		: cameraSmoothFollow2D;
	private var MadeItToTheStage				: boolean		= false;


	function Start (){
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
		pProp = GetComponent("playerProperties");
		player = GameObject.Find("player");
		pControl = player.GetComponent("playerControls");
		cameraSmoothFollowScript = mainCamera.GetComponent("cameraSmoothFollow2D");
		if(startPoint != null){
			//aS.PlaySoundFXQb(aS.marioStartSaying, 0.5f);
			this.transform.position = startPoint.position;
		}
	}


	function Update(){
		if(loseLife){
			loseLife = false;
			pProp.lives -= 1;
		}
		if(MadeItToTheStage){
			MarioOnStage();
		}
	}


	function OnTriggerEnter(other : Collider){
		if(other.tag == "savePoint"){
			curSavePosition = this.transform.position;
			
		}
		if(other.tag == "VictoryStage"){
			var actor : GameObject = GameObject.Find("jGAT_actor");
			var themeMusic : AudioSource = actor.GetComponent.<AudioSource>();
			themeMusic.Stop();
			aS.PlaySoundFX(aS.levelCompletionSound, 1);
			aS.PlaySoundFXQb(aS.marioFinishSaying, 8);
			GetComponent.<CharacterController>().enabled = false;
			cameraSmoothFollowScript.enabled = false;
			pControl.enabled = false;
			yield WaitForSeconds(3);
			VictoryText.text = "Victory!";
			MadeItToTheStage = true;
		
		}
		if(other.tag == "killbox"){

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

	function MarioOnStage(){
			BackGround.color = Color.Lerp(BackGround.color,  black, flashSpeed * Time.deltaTime);
			VictoryText.color = Color.Lerp(VictoryText.color, yellow, flashSpeed * Time.deltaTime);
			yield WaitForSeconds(9);
			SceneManager.LoadScene("jGAT_WelcomeScene");
	}

//finito
