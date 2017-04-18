
import UnityStandardAssets.CrossPlatformInput;
//jGAT 3/31/17 	SPAWN_TUBE_POINTS
// Provides the porting from one tube to another

	var timeToPort					: float			= 2.0;
	var tubePortalTo				: Transform;

	private var showUp				: boolean		= false;
	private var enterUp				: boolean		= false;
	private var porting				: boolean 		= false;
	private var moveDown			: boolean		= false;

	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;
	private var marioControls 			: playerControls;
	private var marioBody				: GameObject;
	private var sprite 		 			: aniSprite;

	function Start (){
 		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");

	}

	function OnTriggerEnter(other : Collider){
		if(other.CompareTag("Player") && !this.gameObject.CompareTag("skyTubeDown")){
			if(CrossPlatformInputManager.GetAxis("Vertical") > 0){
				marioControls = other.GetComponent("playerControls");
				marioBody = other.gameObject;
				sprite = other.GetComponent("aniSprite");
				if(marioControls.moveDirection == 0){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 1, 16, 24);
				}
				if(marioControls.moveDirection == 1){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 0, 16, 24);
				}
				marioControls.enabled = false;
				enterUp = true;
				if(enterUp){
					marioBody.transform.Translate(0, 5 * Time.deltaTime, 0);
					aS.PlaySoundFXQb(aS.pipePort, 0);
					yield WaitForSeconds(0.2);
					marioBody.GetComponent.<Renderer>().enabled = false;
					marioBody.GetComponent.<Collider>().enabled = false;
					yield WaitForSeconds(timeToPort);
					marioBody.transform.position = tubePortalTo.transform.position;
					enterUp = false;
					showUp = true;
				}
				if(showUp){
					yield WaitForSeconds(1);
					aS.PlaySoundFX(aS.pipePort, 0);
					marioControls.gravity = 0.0;
					marioBody.GetComponent.<Renderer>().enabled = true;
					marioBody.GetComponent.<Collider>().enabled = true;
					marioBody.transform.Translate(0, 16 * Time.deltaTime, 0);
					yield WaitForSeconds(.3);
					marioControls.gravity = 20.0;
					marioControls.enabled = true;
					showUp = false;
				}
			}

		}
	}

	function OnTriggerStay(other : Collider){
		if(other.CompareTag("Player") && 
		(this.gameObject.CompareTag("skyTubeDown")||this.gameObject.CompareTag("underWorldTubeDown")) 
		&& !showUp){
			if(CrossPlatformInputManager.GetAxis ("Vertical") < 0){
				if(this.gameObject.CompareTag("underWorldTubeDown")){
					var actor : GameObject = GameObject.Find("jGAT_actor");
					var soundTrack : AudioSource = actor.GetComponent.<AudioSource>();
				}
				marioControls = other.GetComponent("playerControls");
				marioBody = other.gameObject;
				sprite = other.GetComponent("aniSprite");
				if(marioControls.moveDirection == 0){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 9, 16, 24);
				}
				if(marioControls.moveDirection == 1){
					marioControls.velocity.x = 0;
					sprite.aniSprite(16, 16, 0, 8, 16, 24);
				}
				porting = true;
				marioControls.enabled = false;
				moveDown = true;
				if(moveDown && porting){
					marioBody.transform.Translate(0, -5 * Time.deltaTime, 0);
					aS.PlaySoundFX(aS.pipePort, 0);
					yield WaitForSeconds(0.2);
					marioBody.GetComponent.<Renderer>().enabled = false;
					marioBody.GetComponent.<Collider>().enabled = false;
					yield WaitForSeconds(timeToPort);
					marioBody.transform.position = tubePortalTo.transform.position;
					porting = false;
					if(this.gameObject.CompareTag("underWorldTubeDown")){
						soundTrack.Stop();
					}
				}
				if(moveDown && !porting){
					yield WaitForSeconds(1);
					aS.PlaySoundFX(aS.pipePort, 0);
					marioControls.gravity = 0.0;
					marioBody.GetComponent.<Renderer>().enabled = true;
					marioBody.GetComponent.<Collider>().enabled = true;
					marioBody.transform.Translate(0, -1 * Time.deltaTime, 0);
					yield WaitForSeconds(0.3);
					marioControls.gravity = 20.0;
					marioControls.enabled = true;
					moveDown = false;
					if(this.gameObject.CompareTag("underWorldTubeDown")){
						soundTrack.clip = aS.underWorldMusic;
						soundTrack.Play();
					}
				}
			}
		}
	}