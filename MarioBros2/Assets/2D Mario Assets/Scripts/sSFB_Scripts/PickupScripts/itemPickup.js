//jGAT  03/30/17 Pickup Script
@script AddComponentMenu("jGAT/Interactive/Pickup Script");

	enum PickupType{
		Grow			= 0,
		Key				= 1,
		Coin			= 2,
		Fireball		= 3,
		ExtraLife		= 4,
		GameTime		= 5
	}

	var pickupType										= PickupType.Grow;
	var pickupValue						: int			= 1;
	var itemParticle					: Transform;
	var soundDelay						: float			= 0.0;
	var soundRate						: float			= 0.0;

	var pProp							: playerProperties;
	var hudConnect						: hudController;
	var extraLifeEnabled				: boolean		= false;



	private var audioCam				: GameObject;
	private var aS						: soundFXHandler;


	function Start (){
 		audioCam = GameObject.Find("main_camera_and_hud");
 		aS = audioCam.GetComponent("soundFXHandler");

	}


	function Update (){

	}

	function OnTriggerEnter( other : Collider ){
		if(other.tag == "collisionBoxBody" || other.tag == "socketRight" || other.tag == "socketLeft" ||
		 	other.tag == "collisionBoxFeet" || other.tag == "collisionBoxHead"){
			//print("Player collided!");
			var player : GameObject = GameObject.Find("player");
			var pProp : playerProperties = player.GetComponent("playerProperties");
			ApplyPickup(pProp);
			GetComponent.<Renderer>().enabled = false;
			if(itemParticle){
				Instantiate(itemParticle, this.transform.position, this.transform.rotation);
			}
			if(this.tag == "pickup_mushroom"){
				aS.PlaySoundFXGrow(aS.marioPowerUp, 0);
			}else if(this.tag == "pickup_fire"){
				aS.PlaySoundFXFire(aS.marioPowerUp, 0);
			}else if(this.tag == "pickup_extra_life"){
				aS.PlaySoundFX1UP(aS.mario1UP, 0);
			}
			if(extraLifeEnabled){
				extraLifeEnabled = false;
				pProp.lives += pickupValue;
			}
			this.gameObject.transform.Translate(2, -20, 0);
			Destroy(this.gameObject, 3f);
		}
	}

	function ApplyPickup( playerStatus : playerProperties ){
		var hud : GameObject = GameObject.Find("hud");
		var hConnect : hudController = hud.GetComponent("hudController");  
		switch(pickupType){
			case PickupType.Grow:
				if(playerStatus.playerState != PlayerState.MarioFire){
					playerStatus.playerState = PlayerState.MarioLarge;
					playerStatus.changeMario = true;
				}
				break;
			case PickupType.Key:
				playerStatus.AddKey(pickupValue);
				break;
			case PickupType.Coin:
				playerStatus.AddCoin(pickupValue);
				hConnect.coin += pickupValue;
				break;
			case PickupType.Fireball:
				playerStatus.playerState = PlayerState.MarioFire;
				playerStatus.hasFire = true;
				playerStatus.changeMario = true;
				break;
			case PickupType.ExtraLife:
				extraLifeEnabled = true;
				break;
			case PickupType.GameTime:
				//playerStatus.AddTime(pickupValue);
				break;
		}
	}


//finito