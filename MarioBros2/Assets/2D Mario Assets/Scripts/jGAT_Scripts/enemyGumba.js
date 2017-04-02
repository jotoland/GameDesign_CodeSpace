//jGAT 4/1/17	ENEMY GUMBA
// Control component enemy Gumba logic, options and properties

	enum GumbaState{
		moveLeft		= 0,
		moveRight		= 1,
		moveStop		= 2,
		jumpAir			= 3,
		enemyDie		= 4, 
		goHome			= 5
	}

	var bounceHit					: AudioClip;

	var gumbaState								= GumbaState.moveLeft;
	var chaseTarget					: Transform;
	var homePosition				: Transform;

	var attackRange					: float		= 1.0;
	var searchRange					: float		= 3.0;
	var returnHomeRange				: float		= 4.0;
	var moveSpeed					: float		= 20.0;
	var attackMoveSpeed				: float		= 35.0;
	var jumpSpeed					: float		= 3.0;
	var deathForce					: float		= 5.0;
	var changeDirectionDistance		: float		= 0.5;
	var gizmoToggle					: boolean	= true;

	private var AUDIO_SOURCE		: AudioSource;
	private var velocity			: Vector3	= Vector3.zero; 
	private var gravity				: float		= 20.0; 
	private var currentState;
	private var aniPlay;
	private var isRight				: boolean	= false;
	private var myTransform			: Vector3;
	private var resetMoveSpeed		: float		= 0.0;
	private var distanceToHome		: float		= 0.0;
	private var distanceToTarget	: float		= 0.0;
	private var controller			: CharacterController;

	function Start (){
		AUDIO_SOURCE = GetComponent.<AudioSource>();
		myTransform 		= this.transform.position;
		resetMoveSpeed 		= moveSpeed;
		linkToPlayerProperties = GetComponent("playerProperties");
		controller = GetComponent(CharacterController);
		aniPlay = GetComponent("aniSprite");

	}

	function Update (){
		distanceToTarget = Vector3.Distance(chaseTarget.position, this.transform.position);
		if(distanceToTarget <=  searchRange){
			ChasePlayer();
			if(distanceToTarget <= attackRange){
				ChasePlayer();
				moveSpeed = attackMoveSpeed;
			}else{
				ChasePlayer();
				moveSpeed = resetMoveSpeed;
			}
		}else{
			distanceToHome = Vector3.Distance(homePosition.position, this.transform.position);
			if(distanceToHome >= returnHomeRange){
				GoHome();
			}
		}

		if(controller.isGrounded){
			switch(gumbaState){
				case GumbaState.moveLeft :
					PatrolLeft();
					break;
				case GumbaState.moveRight :
					PatrolRight();
					break;
				case GumbaState.moveStop :
					if(isRight){
						IdleRight();	
					}else{
						IdleLeft();
					}
					break;
				case GumbaState.jumpAir :
					if(isRight){
						JumpRight();
					}else{
						JumpLeft();
					}
					break;
				case GumbaState.enemyDie :
					if(isRight){
						DieRight();
					}else{
						DieLeft();
					}
					break;
				case GumbaState.goHome :
					GoHome();
					break;
			}
		}
		velocity.y -= gravity * Time.deltaTime;
		controller.Move(velocity * Time.deltaTime);
	}

	function OnTriggerEnter(other : Collider){
		if(other.tag == "pathNode"){
			var linkToPathNode = other.GetComponent("pathNode");
			gumbaState = linkToPathNode.pathInstruction;
			if(linkToPathNode.overRideJump){
				jumpSpeed = linkToPathNode.jumpOverRide;
			}
		}
		if(other.tag == "collisionBoxFeet"){
			//print("marios feet hit head");
			var playerLink	: GameObject;
			playerLink = GameObject.Find("player");
			playerLink.GetComponent("playerControls").velocity.y = deathForce;
			AUDIO_SOURCE.clip = bounceHit;
			AUDIO_SOURCE.Play();
			var boxCollider = GetComponent.<BoxCollider>();
			if(boxCollider){
				boxCollider.size = Vector3.zero;
				Destroy(boxCollider);
				gumbaState = GumbaState.enemyDie;
			}else{
				Debug.Log("Could not load Box Collider");
			}
		}
		if(other.tag == "enemy"){
			if(other.GetComponent.<Collider>() != this.GetComponent.<Collider>()){
				print("ignoring Collsion");
				Physics.IgnoreCollision(other.GetComponent.<Collider>(), this.GetComponent.<Collider>());
				Physics.IgnoreCollision(other.GetComponent.<CharacterController>(), this.GetComponent.<CharacterController>());
			}
		}
	}

	function PatrolRight(){
		currentState = gumbaState;
		velocity.x = moveSpeed * Time.deltaTime;
		aniPlay.aniSprite(16, 16, 0, 6, 16, 24);
		isRight = true;
	}

	function PatrolLeft(){
		currentState = gumbaState;
		velocity.x = -moveSpeed * Time.deltaTime;
		aniPlay.aniSprite(16, 16, 0, 7, 16, 24);
		isRight = false;
	}

	function IdleRight(){
		currentState = gumbaState;
		velocity.x = 0;
		aniPlay.aniSprite(16, 16, 0, 0, 29, 24);
		isRight = true;
	}

	function IdleLeft(){
		currentState = gumbaState;
		velocity.x = 0;
		aniPlay.aniSprite(16, 16, 0, 2, 31, 24);
		isRight = false;
	}

	function JumpRight(){
		velocity.y = jumpSpeed;
		gumbaState = currentState;
		aniPlay.aniSprite(16, 16, 7, 8, 1, 24);
		isRight = true;
	}

	function JumpLeft(){
		velocity.y = jumpSpeed;
		gumbaState = currentState;
		aniPlay.aniSprite(16, 16, 7, 9, 1, 24);
		isRight = false;
	}

	function DieRight(){
		velocity.x = 0;
		yield WaitForSeconds(0.1);
		aniPlay.aniSprite(16, 16, 0, 10, 16, 24);
		yield WaitForSeconds(0.3);
		Destroy(this.gameObject);
	}

	function DieLeft(){
		velocity.x = 0;
		yield WaitForSeconds(0.1);
		aniPlay.aniSprite(16, 16, 0, 11, 16, 24);
		yield WaitForSeconds(0.3);
		Destroy(this.gameObject);
	}

	function ChasePlayer(){
		if(this.transform.position.x <= chaseTarget.position.x - changeDirectionDistance){
			gumbaState = GumbaState.moveRight;
		}
		if(this.transform.position.x >= chaseTarget.position.x + changeDirectionDistance){
			gumbaState = GumbaState.moveLeft;
		}
	}

	function GoHome(){
		if(this.transform.position.x <= homePosition.position.x){
			gumbaState = GumbaState.moveRight;

		}
		if(this.transform.position.x >= homePosition.position.x){
			gumbaState = GumbaState.moveLeft;
		}
	}

	//toggles gizmos for designer (debuging the range of AI walk/attack/go home)
	function OnDrawGizmos(){
		if(gizmoToggle){
			Gizmos.color = Color.red;
			Gizmos.DrawWireSphere(this.transform.position, attackRange);
			Gizmos.color = Color.blue;
			Gizmos.DrawWireSphere(this.transform.position, searchRange);
			Gizmos.color = Color.green;
			Gizmos.DrawWireSphere(homePosition.position, returnHomeRange);
		}

	}

//finito