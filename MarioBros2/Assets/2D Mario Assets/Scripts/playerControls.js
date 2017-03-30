//John G. Toland 3/21/14

	function Start ()
	{

	}

	var walkSpeed 						: float = 1.5;				
	var runSpeed 						: float = 2.0;				
	var fallSpeed 						: float = 2.0;				
	var walkJump 						: float = 6.5;
	var runJump 						: float = 9.0;
	var crouchJump 						: float = 10.0;
	var gravity 						: float = 20.0;
	var startPos						: float = 0.0;
	var moveDirection					: int 	= 1;
	private var velocity 				: Vector3 = Vector3.zero;
	private var jumpCount				: int = -1;
	private var downWardForce			: float = 1.0;

	var particleJump					: Transform;


	var soundJump						: AudioClip;
	var soundCrouchJump					: AudioClip;
	private var soundRate				: float = 0.0;
	private var soundDelay				: float = 0.0;


	function playSoundFX(soundName, soundDelay){
		if(!GetComponent.<AudioSource>().isPlaying && Time.time > soundRate){
			soundRate = Time.time + soundDelay;
			GetComponent.<AudioSource>().clip = soundName;
			GetComponent.<AudioSource>().Play();
			yield WaitForSeconds(GetComponent.<AudioSource>().clip.length);
		}
	}

	function Update(){
		var particleSpawn : Vector3 = new Vector3 (transform.position.x, transform.position.y -.5, transform.position.z);

		var aniPlay = GetComponent("aniSprite");
		//aniPlay.aniSprite( 16, 16, 0, 1, 16, 12);
		var controller : CharacterController = GetComponent(CharacterController);
		//we are grounded, so recalculate
		//move direction directly from axes
		if(controller.isGrounded){
			jumpCount = -1;
			velocity = Vector3(Input.GetAxis("Horizontal"),0,0);
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
			if(velocity.x < 0 && Input.GetButton("Fire1") ){
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16, 16, 0, 5, 16, 24);
			}
			//run right
			if(velocity.x > 0 && Input.GetButton("Fire1") ){
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16, 16, 0, 4, 16, 24);
			}
			//crouching left and right
			if(velocity.x == 0 && Input.GetAxis("Vertical") < 0){
				//stop player from moving
				velocity.x = 0;
				//crouch left
				if(moveDirection == 0){
					aniPlay.aniSprite(16, 16, 0, 9, 16, 24);
					//crouch right
				}else{
					aniPlay.aniSprite(16, 16, 0, 8, 16, 24);
				}
			}
			//walk jump
			if(Input.GetButtonDown("Jump") && (!Input.GetButton("Fire1") || 
				Input.GetButtonDown("Fire1") && velocity.x == 0) && Input.GetAxis("Vertical") >= 0){
				Instantiate(particleJump, particleSpawn, transform.rotation);
				jumpCount = 0;
				velocity.y = walkJump;
				playSoundFX(soundJump, 0);
			}
			//run jump
			if(Input.GetButtonDown("Jump") && Input.GetButton("Fire1") && velocity.x !=0){
				Instantiate(particleJump, particleSpawn, transform.rotation);
				jumpCount = 1;
				velocity.y = runJump;
				playSoundFX(soundJump, 0);
			}
			//crouch jump
			if(Input.GetButtonDown("Jump") && velocity.x == 0 && Input.GetAxis("Vertical") < 0){
				Instantiate(particleJump, particleSpawn, transform.rotation);
				jumpCount = 2;
				velocity.y = crouchJump;
				playSoundFX(soundCrouchJump, 0);
			}
		}
		if(!controller.isGrounded){
			velocity.x = Input.GetAxis("Horizontal");
			if(Input.GetButtonUp("Jump")){
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
