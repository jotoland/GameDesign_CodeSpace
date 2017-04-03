//jGAT 3/31/17 FIREBALL SCRIPT
//Controls the speed and the bounce of the fireball
//Checks for collision events and decides what to do

	var smokePuff				: Transform;
	var moveSpeed				: float 		= 1.0;
	var bounceHeight			: float			= 0.25;
	var lifeSpan				: float			= 2.0;
	var hitPosition				: float			= 0.0;
	var bounceUp				: boolean 		= false;
	var heightDifference		: float			= 0.0;

	private var cameraLink		: GameObject;
	private var AUDIO_SOURCE	: AudioSource;

	function Start(){
		cameraLink = GameObject.Find("main_camera_hud");
		AUDIO_SOURCE = cameraLink.GetComponent.<AudioSource>();
		killFireball();
	}

	function Update (){
		if(bounceUp){
			//moves fireball up
			this.transform.Translate(moveSpeed * Time.deltaTime, 0.75 * Time.deltaTime, 0);
			//checking for max height
			heightDifference = this.transform.position.y - hitPosition;
			if(bounceHeight <= heightDifference){
				bounceUp = false;
			}
		}else{
			//send the fireball back down
			this.transform.Translate(moveSpeed * Time.deltaTime, -1.0 * Time.deltaTime, 0);
		}
	}

	function OnTriggerEnter( other : Collider ){
		//check for the envrionment variables that you want the fireball to bounce off of
		if(other.tag == "Untagged"){
			var hit : RaycastHit;
			if((Physics.Raycast(this.transform.position, Vector3(1,0,0), hit, 0.1)) ||
			 	(Physics.Raycast(this.transform.position, Vector3(-1,0,0), hit, 0.1))){
			 	Destroy(this.gameObject);
			}else{
				hitPosition = this.transform.position.y;
				bounceUp = true;
			}
		}
		if(other.tag == "enemy"){
			AUDIO_SOURCE.Play();
			particlePlay();
			Destroy(other.gameObject);
			Destroy(this.gameObject);
		}
		if(other.tag == "block"){
			//moveSpeed = moveSpeed * -1;
		}
	}

	function killFireball(){
		particlePlay();
		Destroy(this.gameObject, lifeSpan);
	}

	function particlePlay(){
		if(smokePuff){
			Instantiate(smokePuff, this.transform.position, this.transform.rotation);	
		}else{
			Debug.Log("Object not Loaded");
		}

	}


//finito