//jGAT 3/31/17 BREAKABLES COMPONENT
//Sound to play and adding a little force

	var breakableTime			: float			= 2.5;
	var soundBumpBreak			: AudioClip;
	private var AUDIO_SOURCE	: AudioSource;

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
		AUDIO_SOURCE = GetComponent.<AudioSource>();
		AUDIO_SOURCE.clip = soundBumpBreak;
		AUDIO_SOURCE.Play();
	}

//finito