//Spawn Save player location setup
//Descripton: Saves the player location (save points along the way for spawning after death)

	var startPoint					: Transform;
	var soundDie					: AudioClip;
	private	var soundRate			: float = 0.0;
	private var soundDelay			: float = 0.0;
	private var curSavePosition		: Vector3;


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
			playSoundFX(soundDie, 0);
			transform.position = curSavePosition;

		}
	}

	function Start (){
		if(startPoint != null){
			this.transform.position = startPoint.position;
		}

	}
//finito
