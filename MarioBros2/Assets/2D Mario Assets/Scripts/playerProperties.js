//Player Properties Component
//Description: Set and Stores pickups and state of player

	@script AddComponentMenu("WalkerBoys/Actor/Player Properties Script")
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
	var projectileFire			: GameObject;
	var projectileSocketRight	: Transform;
	var projectileSocketLeft	: Transform;

	var materialMarioStandard	: Material;
	var materialMarioFire		: Material;

	var changeMario				: boolean		= false;
	var hasFire					: boolean		= false;

	private var coinLife		: int			= 20;
	private var canShoot		: boolean		= false;

	function Update(){
		var playerControls = GetComponent("playerControls");
		if(changeMario){
			SetPlayerState();
		}
		if(canShoot){
			var clone;
			var rb;
			//fires a fire ball to the left when player is facing left
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 0){
				clone = Instantiate(projectileFire, projectileSocketLeft.transform.position, transform.rotation);
				rb = clone.GetComponent("Rigidbody");
				rb.AddForce(-90, 0, 0);
			}
			//fire ball to the right
			if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 1){
				clone = Instantiate(projectileFire, projectileSocketRight.transform.position, transform.rotation);
				rb = clone.GetComponent("Rigidbody");
				rb.AddForce(90, 0, 0);
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
		var playerControls = GetComponent("playerControls");
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
				transform.localScale = new Vector3(1.0, 1.0, 1.0);
				Destroy(gameObject);
				changeMario = false;
				break;
		}
	}

//finito


