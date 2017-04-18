//jGAT 3/31/17 BREAKABLES COMPONENT
//Sound to play and adding a little force

	var breakableTime			: float			= 2.5;
	var soundBumpBreak			: AudioClip;
	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function FixedUpdate(){
		GetComponent.<Rigidbody>().AddForce(Vector3.up * 250);
		BreakableWait();
		GetComponent.<Rigidbody>().AddForce(Vector3.up * -200);
		Destroy(this.gameObject, breakableTime);
	}

	function BreakableWait(){
		yield WaitForSeconds(breakableTime);
	}

	function Start(){
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
		
		aS.PlaySoundFXBlock(aS.marioBreakBlock, 0);
	}

//finito