//jGAT 3/31/17 BLOCK BUMP SCRIPT
//Complete system for interactive blocks (bouncing, coins, breakables, solid, and question)

	enum BlockType {
		blockBounce 		= 0,
		blockCoin			= 1,
		blockBreakable 		= 2,
		blockSolid			= 3,
		blockQuestion		= 4
	}

	enum PickUpType {
		pickupMushroomGrow	= 0,
		pickupMushroomLife	= 1,
		pickupFireFlower	= 2
	}

	enum BreakType {
		breakableGeometry	= 0,
		breakableParticles	= 1
	}

	var BlockState						: BlockType;
	var BlockStateAfter					: BlockType;
	var PickupState						: PickUpType;
	var BreakState						: BreakType;

	var blockCoinAmount					: int			= 3;
	var blockQuestionScrollSpeed		: float			= 0.5;

	var materialBlock1					: Material;						//brick block
	var materialBlock2					: Material;						//solid block
	var materialBlock3					: Material;						//piece block
	var materialBlock4					: Material;						//question block

	var pickupCoin						: Transform;
	var pickupMushroomGrow				: Transform;
	var pickupMushroomLife				: Transform;
	var pickupFireFlower				: Transform;
	var breakableGeometry				: Transform;
	var breakableParticles				: Transform;

	private var breakablePos			: Vector3; 
	private var pickupPos				: Vector3;
	private var coinPos					: Vector3;
	private var blockAni				: boolean 		= false;
	private var coinMove				: boolean		= false;
	private var blockCoinAmountReset	: int;

	private var BLOCK_ANI				: Animation;
	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;

	function Start (){
		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");

		blockCoinAmountReset = blockCoinAmount;

		coinPos 		= new Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z + 0.2);
		breakablePos 	= new Vector3(this.transform.position.x, this.transform.position.y + 0.25 , this.transform.position.z - 9);
		pickupPos 		= new Vector3(this.transform.position.x, this.transform.position.y + 0.45, this.transform.position.z - 0.1);

		BLOCK_ANI = GetComponent.<Animation>();
	}

	function Update (){

		switch(BlockState){
			case BlockState.blockBounce :
				GetComponent.<Renderer>().material = materialBlock1;
				if(blockAni){
					//GetComponent.<Animation>().Play("blockBounce");
					BLOCK_ANI.Play("blockBounce");
					aS.PlaySoundFXBlock(aS.marioBump, 0);
					blockAni = false;
				}
				break;
			case BlockState.blockCoin :
				GetComponent.<Renderer>().material = materialBlock1;
				if(blockAni){
					//GetComponent.<Animation>().Play("blockBounce");
					BLOCK_ANI.Play("blockBounce");
					Instantiate(pickupCoin, coinPos, this.transform.rotation);
					blockCoinAmount--;
					aS.PlaySoundFXBlock(aS.marioBump, 0);
					blockAni = false;
				}
				if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockBounce){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockCoin){
					BlockState = BlockStateAfter;
					BlockStateAfter = BlockStateAfter.blockBreakable;
				}
				if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockBreakable){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockSolid){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount == 0 && BlockStateAfter == BlockStateAfter.blockQuestion){
					BlockState = BlockStateAfter;
				}
				break;
			case BlockState.blockBreakable :
				GetComponent.<Renderer>().material = materialBlock1;
				if(blockAni){
					BLOCK_ANI.Play("blockBounce");
					if(BreakState == BreakState.breakableGeometry){
						Instantiate(breakableGeometry, breakablePos, this.transform.rotation);
					}
					if(BreakState == BreakState.breakableParticles){
						Instantiate(breakableParticles, this.transform.position, this.transform.rotation);
					}
					Destroy(transform.parent.gameObject); 
					blockAni = false;
				}
				break;
			case BlockState.blockSolid :
				GetComponent.<Renderer>().material = materialBlock2;
				if(blockAni){
					aS.PlaySoundFX(aS.marioBump, 0);
					blockAni = false;
				}
				break;
			case BlockState.blockQuestion :
				GetComponent.<Renderer>().material = materialBlock4;
				if(blockAni && PickupState == PickupState.pickupMushroomGrow){
					BLOCK_ANI.Play("blockBounce");
					Instantiate(pickupMushroomGrow, pickupPos, this.transform.rotation);
					aS.PlaySoundFXQb(aS.marioPowerUp, 0);
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				if(blockAni && PickupState == PickupState.pickupMushroomLife){
					BLOCK_ANI.Play("blockBounce");
					Instantiate(pickupMushroomLife, pickupPos, this.transform.rotation);
					aS.PlaySoundFXQb(aS.marioPowerUp, 0);
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				if(blockAni && PickupState == PickupState.pickupFireFlower){
					BLOCK_ANI.Play("blockBounce");
					Instantiate(pickupFireFlower, pickupPos, this.transform.rotation);
					aS.PlaySoundFXQb(aS.marioPowerUp, 0);
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				var offset	: float = Time.time * blockQuestionScrollSpeed;
				GetComponent.<Renderer>().material.mainTextureOffset = Vector2(offset, 0);
				break;
			default:
				break;
		}
	}

	//when mario bumps his head on the block
	function OnTriggerEnter( other : Collider ){
		if(other.tag == "collisionBoxHead"){
			//print("Head Hit");
			//plays the block animation
			blockAni = true; 
		}
	}

//finito
