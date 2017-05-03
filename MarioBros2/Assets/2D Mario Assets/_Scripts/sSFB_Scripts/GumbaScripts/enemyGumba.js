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

	private var velocity			: Vector3	= Vector3.zero; 
	private var gravity				: float		= 20.0; 
	private var currentState;
	private var aniPlay				: aniSprite;
	private var isRight				: boolean	= false;
	private var myTransform			: Vector3;
	private var resetMoveSpeed		: float		= 0.0;
	private var distanceToHome		: float		= 0.0;
	private var distanceToTarget	: float		= 0.0;
	private var controller			: CharacterController;
	private var linkToPlayerProperties : playerProperties;
	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;
	private var bossGumba				: boolean = false;
	private var bossHealth				: int = 3;
	private var boxCollider				: BoxCollider;
	private var tempCollider			: BoxCollider;


	function Start (){
		boxCollider = GetComponent.<BoxCollider>();
		tempCollider = GetComponent.<BoxCollider>();
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");
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
			var linkToPathNode : pathNode = other.GetComponent("pathNode");
			if(linkToPathNode.pathInstruction == 0){
				gumbaState = 0;
			}else if(linkToPathNode.pathInstruction == 1){
				gumbaState = 1;
			}else if(linkToPathNode.pathInstruction == 2){
				gumbaState = 2;
			}else if(linkToPathNode.pathInstruction == 3){
				gumbaState = 3;
			}

			if(linkToPathNode.overRideJump){
				jumpSpeed = linkToPathNode.jumpOverRide;
			}
		}
		if(other.tag == "collisionBoxFeet"){
			print("marios feet hit head");
			if(this.gameObject.name == "prefab_player_Bossgumba"){
				print("Iam the boss enemy");
				bossGumba = true;
			}
			var playerLink	: GameObject;
			playerLink = GameObject.Find("player");
			var pControls : playerControls = playerLink.GetComponent("playerControls");
			pControls.velocity.y = deathForce;
			aS.PlaySoundFX(aS.marioStompGumba, 0);
			if(bossGumba){
         		if(bossHealth > 0){
         			bossHealth--;
         			if(boxCollider){
						boxCollider.size = Vector3.zero;
						for(var child : Transform in this.transform) {
             				child.gameObject.SetActive(false);
         				}
         			}else{
						Debug.Log("Could not load Box Collider");
					}
         		}else{
         			if(boxCollider){
						boxCollider.size = Vector3.zero;
						Destroy(boxCollider);
						for(var child : Transform in this.transform) {
             				GameObject.Destroy(child.gameObject);
         				}
         			}else{
						Debug.Log("Could not load Box Collider");
					}	
         		}
         	}else{
         		if(boxCollider){
					boxCollider.size = Vector3.zero;
					Destroy(boxCollider);
					for(var child : Transform in this.transform) {
             			GameObject.Destroy(child.gameObject);
         			}
         		}else{
					Debug.Log("Could not load Box Collider");
				}		
         	}
			gumbaState = GumbaState.enemyDie;
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
		if(bossGumba){
			print("bossHealth = " +bossHealth);
			if(bossHealth == 0){
				var doorWay : GameObject = GameObject.Find("DoorWay");
				if(doorWay){
					doorWay.SetActive(false);
				}
				Destroy(this.gameObject);
			}else{
				yield WaitForSeconds(1.5);
				boxCollider.size = new Vector3(0.3, 0.05, 3);
				for(var child : Transform in this.transform) {
             		child.gameObject.SetActive(true);
         		}
				gumbaState = GumbaState.moveRight;
			}
		}else{
			Destroy(this.gameObject);
		}

	}

	function DieLeft(){
		velocity.x = 0;
		yield WaitForSeconds(0.1);
		aniPlay.aniSprite(16, 16, 0, 11, 16, 24);
		yield WaitForSeconds(0.3);
		if(bossGumba){
			print("bossHealth = " +bossHealth);
			if(bossHealth == 0){
				var doorWay : GameObject = GameObject.Find("DoorWay");
				if(doorWay){
					doorWay.SetActive(false);
				}
				Destroy(this.gameObject);
			}else{
				yield WaitForSeconds(1.5);
				boxCollider.size = new Vector3(0.3, 0.05, 3);
				for(var child : Transform in this.transform) {
             		child.gameObject.SetActive(true);
         		}
				gumbaState = GumbaState.moveLeft;
			}
		}else{
			Destroy(this.gameObject);
		}
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
