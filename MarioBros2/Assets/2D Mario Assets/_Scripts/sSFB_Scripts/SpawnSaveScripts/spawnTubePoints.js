
import UnityStandardAssets.CrossPlatformInput;
//jGAT 3/31/17 	SPAWN_TUBE_POINTS
// Provides the porting from one tube to another

	var timeToPort					: float			= 2.0;
	var tubePortalTo				: Transform;

	private var moveDown			: boolean		= false;
	private var moveUp				: boolean		= false;

	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function Start (){
 		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
	}

	function OnTriggerStay(other : Collider){
		if(other.tag == "Player" && !this.gameObject.CompareTag("backFromUnderWorld")){
			if(CrossPlatformInputManager.GetAxis ("Vertical") < 0){
				if(this.gameObject.CompareTag("underWorldTubeUp")){
					var actor : GameObject = GameObject.Find("jGAT_actor");
					var soundTrack : AudioSource = actor.GetComponent.<AudioSource>();
				}
				var marioControls 	: playerControls = other.GetComponent("playerControls");
				var marioBody		: GameObject = other.gameObject;
				var sprite 		 	: aniSprite = other.GetComponent("aniSprite");

				if(marioControls.moveDirection == 0){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 9, 16, 24);
				}
				if(marioControls.moveDirection == 1){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 8, 16, 24);
				}
				marioControls.enabled = false;
				moveDown = true;
				if(moveDown){
					marioBody.transform.Translate(0, -5 * Time.deltaTime, 0);
					aS.PlaySoundFX(aS.pipePort, 0);
					yield WaitForSeconds(0.2);
					marioBody.GetComponent.<Renderer>().enabled = false;
					marioBody.GetComponent.<Collider>().enabled = false;
					yield WaitForSeconds(timeToPort);
					marioBody.transform.position = tubePortalTo.transform.position;
					moveDown = false;
					moveUp = true;
					if(this.gameObject.CompareTag("underWorldTubeUp")){
						soundTrack.Stop();
					}
				}
				if(moveUp){
					yield WaitForSeconds(1);
					aS.PlaySoundFX(aS.pipePort, 0);
					marioControls.gravity = 0.0;
					marioBody.GetComponent.<Renderer>().enabled = true;
					marioBody.GetComponent.<Collider>().enabled = true;
					marioBody.transform.Translate(0, 4 * Time.deltaTime, 0);
					yield WaitForSeconds(0.3);
					marioControls.gravity = 20.0;
					marioControls.enabled = true;
					moveUp = false;
					if(this.gameObject.CompareTag("underWorldTubeUp")){
						soundTrack.clip = aS.worldOneMusic;
						yield WaitForSeconds(.3);
						soundTrack.Play();
					}
				}
			}
		}
	}

//finito