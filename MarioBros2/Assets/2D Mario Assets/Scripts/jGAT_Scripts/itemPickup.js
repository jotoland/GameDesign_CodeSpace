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

	private var playerGameObject		: GameObject;
	private var hudGameObject			: GameObject;
	var extraLifeEnabled				: boolean		= false;




	function Start (){
		playerGameObject = GameObject.FindWithTag("Player");
		hudGameObject = GameObject.FindWithTag("hud");
	}

	function Update (){

	}

	function OnTriggerEnter( other : Collider ){
		if(other.tag == "collisionBoxBody"){
			//print("Player collided!");
			var pProp = playerGameObject.GetComponent("playerProperties");
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
		var hudConnect = hudGameObject.GetComponent("hudController");

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
				hudConnect.coin += pickupValue;
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

	function playSoundFX(soundName, soundDelay){
	if(!GetComponent.<AudioSource>().isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		GetComponent.<AudioSource>().clip = soundName;
		GetComponent.<AudioSource>().Play();
	}

}


//finito