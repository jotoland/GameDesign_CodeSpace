	//jGAT 3/30/17
	//when the player gets to the border we will make something happen

	var cameraTarget					: GameObject;
	var player							: GameObject;
	var cameraHeight					: float			= 0.0;
	var smoothTime						: float			= 0.2;
	var borderX							: float			= 2.0;
	var borderY							: float			= 2.0;

	//camera speed
	private var velocity				: Vector2;
	private var moveScreenRight			: boolean 		= false;
	private var moveScreenLeft			: boolean 		= false;


	function Start (){
		cameraHeight = this.GetComponent.<Camera>().transform.position.y;
	}

	function FixedUpdate (){
		var moveDir = player.GetComponent("playerControls");
		if(cameraTarget.transform.position.x > this.GetComponent.<Camera>().transform.position.x + borderX && moveDir.moveDirection == 1){
			moveScreenRight = true;
		}
		if(moveScreenRight){
			this.GetComponent.<Camera>().transform.position.x = Mathf.SmoothDamp(this.GetComponent.<Camera>().transform.position.x, this.GetComponent.<Camera>().transform.position.x + borderX, velocity.y, smoothTime);

		}else if(moveScreenLeft){
			this.GetComponent.<Camera>().transform.position.x = Mathf.SmoothDamp(this.GetComponent.<Camera>().transform.position.x, this.GetComponent.<Camera>().transform.position.x - borderX, velocity.y, smoothTime);
		}
		if(cameraTarget.transform.position.x < GetComponent.<Camera>().transform.position.x - borderX && moveDir.moveDirection == 1){
			moveScreenRight = false;
		}
		if(cameraTarget.transform.position.x < GetComponent.<Camera>().transform.position.x - borderX && moveDir.moveDirection == 0){
			moveScreenLeft = true;
		} 
		if(cameraTarget.transform.position.x > GetComponent.<Camera>().transform.position.x + borderX && moveDir.moveDirection == 0){
			moveScreenLeft = false;
		}
	}

//finito