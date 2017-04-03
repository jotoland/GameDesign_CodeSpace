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
	var soundItemPickup					: AudioClip;
	var soundDelay						: float			= 0.0;
	var soundRate						: float			= 0.0;

	var pProp							: playerProperties;
	var hudConnect						: hudController;
	var extraLifeEnabled				: boolean		= false;




	function Start (){

	}

	function Update (){

	}

	function OnTriggerEnter( other : Collider ){
		if(other.tag == "collisionBoxBody"){
			//print("Player collided!");
			var player : GameObject = GameObject.Find("player");
			var pProp : playerProperties = player.GetComponent("playerProperties");
			ApplyPickup(pProp);
			GetComponent.<Renderer>().enabled = false;
			if(itemParticle){
				Instantiate(itemParticle, this.transform.position, this.transform.rotation);
			}
			if(soundItemPickup){
				playSoundFX(soundItemPickup, 0);
			}
			if(extraLifeEnabled){
				extraLifeEnabled = false;
				pProp.lives += pickupValue;
			}
			this.gameObject.transform.Translate(2, -20, 0);
			Destroy(this.gameObject, 1f);
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

	function playSoundFX(soundName : AudioClip, soundDelay : float){
	if(!GetComponent.<AudioSource>().isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		GetComponent.<AudioSource>().clip = soundName;
		GetComponent.<AudioSource>().Play();
	}

}


//finito