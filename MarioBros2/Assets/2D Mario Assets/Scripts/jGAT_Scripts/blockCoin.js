//jGAT 3/31/17 COIN SETUP FOR BLOCKS
//Creates a coin when it gets bumped

	var coinValue				: int				= 2;
	var coinParticle			: Transform;
	var playerGameObject;
	var hudGameObject;
	var coinAlive				: boolean			= false;

	private var AUDIO_SOURCE	: AudioSource;
	private var coinTime		: float				= 0.2;

	function Start (){
		coinAlive = true;
		hudGameObject		= GameObject.FindWithTag("hud");
		playerGameObject 	= GameObject.FindWithTag("Player");
	}

	function Update (){
		var aniPlay = GetComponent("aniSprite");
		aniPlay.aniSprite(16, 2, 0, 0, 21, 12);
		this.transform.Translate(0, Time.deltaTime * 5, 0);
		if(coinAlive){
			KillCoin();
			coinAlive = false;
		}
	}

	function KillCoin(){
		yield WaitForSeconds(coinTime);
		Instantiate(coinParticle, this.transform.position, this.transform.rotation);
		AddToCoins();
		Destroy(this.gameObject);
	}

	function AddToCoins(){
		var hudConnect = hudGameObject.GetComponent("hudController");
		hudConnect.coin  += coinValue;

		var playerConnect = playerGameObject.GetComponent("playerProperties");
		playerConnect.coins += coinValue;
	}

//finito
