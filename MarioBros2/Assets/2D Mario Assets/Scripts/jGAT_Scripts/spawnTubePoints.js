//jGAT 3/31/17 	SPAWN_TUBE_POINTS
// Provides the porting from one tube to another

	var timeToPort					: float			= 2.0;
	var tubePortalTo				: Transform;
	var soundTube					: AudioClip;

	private var moveDown			: boolean		= false;
	private var moveUp				: boolean		= false;

	function OnTriggerStay(other : Collider){
		if(other.tag == "Player"){
			if(Input.GetAxis ("Vertical") < 0){
				//print("player pushing down");
				var marioControls 	= other.GetComponent("playerControls");
				var marioBody		= other.gameObject;
				var sprite 		 	= other.GetComponent("aniSprite");

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
					marioControls.playSoundFX(soundTube, 0);
					yield WaitForSeconds(0.2);
					marioBody.GetComponent.<Renderer>().enabled = false;
					marioBody.GetComponent.<Collider>().enabled = false;
					yield WaitForSeconds(timeToPort);
					marioBody.transform.position = tubePortalTo.transform.position;
					moveDown = false;
					moveUp = true;
				}
				if(moveUp){
					yield WaitForSeconds(1);
					marioControls.playSoundFX(soundTube, 0);
					marioControls.gravity = 0.0;
					marioBody.GetComponent.<Renderer>().enabled = true;
					marioBody.GetComponent.<Collider>().enabled = true;
					marioBody.transform.Translate(0, 4 * Time.deltaTime, 0);
					yield WaitForSeconds(0.3);
					marioControls.gravity = 20.0;
					marioControls.enabled = true;
					moveUp = false;
				}
			}
		}
	}

//finito