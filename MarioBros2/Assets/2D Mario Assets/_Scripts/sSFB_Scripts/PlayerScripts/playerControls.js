
import UnityStandardAssets.CrossPlatformInput;
//jGAT 3/21/14

var walkSpeed 						: float = 1.5;				
var runSpeed 						: float = 4.0;				
var fallSpeed 						: float = 2.0;				
var walkJump 						: float = 6.5;
var runJump 						: float = 9.0;
var crouchJump 						: float = 10.0;
var gravity 						: float = 20.0;
var startPos						: float = 0.0;
var moveDirection					: int 	= 1;
@HideInInspector var velocity 		: Vector3 = Vector3.zero;
private var jumpCount				: int = -1;
private var downWardForce			: float = 1.0;

var particleJump					: Transform;

private var audioCam				: GameObject;
private var aS						: soundFXHandler;

function Start (){
	Time.timeScale = 1;
	AudioListener.pause = false;
 	audioCam = GameObject.Find("main_camera_and_hud");
 	aS = audioCam.GetComponent("soundFXHandler");
}

function Update(){
	var particleSpawn : Vector3 = new Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);

	var aniPlay : aniSprite = GetComponent("aniSprite");
	//aniPlay.aniSprite( 16, 16, 0, 1, 16, 12);
	var controller : CharacterController = GetComponent(CharacterController);

	//we are grounded, so recalculate
	//move direction directly from axes
	if(controller.isGrounded){
		jumpCount = -1;
		startPos = transform.position.y;
		velocity = Vector3(CrossPlatformInputManager.GetAxis("Horizontal"),0,0);
		//move direction is zero on right hand side
		if(velocity.x == 0 && moveDirection == 1){
			//animation sprite for idling to the right
			aniPlay.aniSprite(16, 16, 0, 0, 16, 12);
		}
		//move direction is zero on left hand side
		if(velocity.x == 0 && moveDirection == 0){
			//animation sprite for idling to the left
			aniPlay.aniSprite(16, 16, 0, 1, 16, 12);
		}
		//walk left
		if(velocity.x < 0){
			velocity.x *= walkSpeed;
			aniPlay.aniSprite(16, 16, 0, 3, 10, 15);
		}
		//walk right
		if(velocity.x > 0){
			velocity.x *= walkSpeed;
			aniPlay.aniSprite(16, 16, 0, 2, 10, 15);
		}
		//run left
		if(velocity.x < 0 && CrossPlatformInputManager.GetButton("Fire1") && moveDirection == 0){
			velocity.x *= runSpeed;
			aniPlay.aniSprite(16, 16, 0, 5, 16, 24);
		}
		//run right
		if(velocity.x > 0 && CrossPlatformInputManager.GetButton("Fire1") && moveDirection == 1){
			velocity.x *= runSpeed;
			aniPlay.aniSprite(16, 16, 0, 4, 16, 24);
		}
		//crouching left and right
		if(CrossPlatformInputManager.GetAxis("Vertical") < 0){
			//stop player from moving
			velocity.x = 0;
			//crouch left
			if(moveDirection == 0){
				aniPlay.aniSprite(16, 16, 0, 9, 16, 24);
				//crouch right
			}
			if(moveDirection == 1){
				aniPlay.aniSprite(16, 16, 0, 8, 16, 24);
			}
		}
		//walk jump
		if(CrossPlatformInputManager.GetButtonDown("Jump") && (!CrossPlatformInputManager.GetButton("Fire1") || 
			CrossPlatformInputManager.GetButtonDown("Fire1") && velocity.x == 0) && CrossPlatformInputManager.GetAxis("Vertical") >= 0){
			Instantiate(particleJump, particleSpawn, transform.rotation);
			jumpCount = 0;
			velocity.y = walkJump;
			aS.PlaySoundFX(aS.marioJump, 0);
		}
		//run jump
		if(CrossPlatformInputManager.GetButtonDown("Jump") && CrossPlatformInputManager.GetButton("Fire1") && velocity.x !=0){
			Instantiate(particleJump, particleSpawn, transform.rotation);
			jumpCount = 1;
			velocity.y = runJump;
			aS.PlaySoundFX(aS.marioJump, 0);
		}
		//crouch jump
		if(CrossPlatformInputManager.GetButtonDown("Jump") && velocity.x == 0 && CrossPlatformInputManager.GetAxis("Vertical") < 0){
			Instantiate(particleJump, particleSpawn, transform.rotation);
			jumpCount = 2;
			velocity.y = crouchJump;
			aS.PlaySoundFX(aS.marioCrouchJump, 0);
		}
	}

	if(!controller.isGrounded){
		velocity.x = CrossPlatformInputManager.GetAxis("Horizontal");
		if(CrossPlatformInputManager.GetButtonUp("Jump")){
			velocity.y = velocity.y - fallSpeed;
		}
		if(moveDirection == 0){
			//standard jump
			switch(jumpCount){
			case 0:
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16, 16, 11, 3, 4, 12);
				break;
			case 1:
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16, 16, 11, 3, 4, 12);
				break;
			case 2:
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16, 16, 12, 11, 4, 12);
				break;
			}
		}
		if(moveDirection == 1){
			//standard jump
			switch(jumpCount){
			case 0:
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16, 16, 11, 2, 4, 12);
				break;
			case 1:
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16, 16, 11, 2, 4, 12);
				break;
			case 2: 
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16, 16, 12, 10, 4, 12);
				break;
			}
		}
	}

	//appyling the direction
	if(velocity.x < 0){
		moveDirection = 0;
	}
	if(velocity.x > 0){
		moveDirection = 1;
	}
	//mario hit his head on something
	if(controller.collisionFlags == CollisionFlags.Above){
		velocity.y = 0;
		velocity.y -= downWardForce;
	}

	//Apply gravity
	velocity.y -= gravity * Time.deltaTime;
	//move the controller
	controller.Move(velocity * Time.deltaTime);
	 
}

//finito
