//jGAT 3/31/17 COIN SETUP FOR BLOCKS
//Creates a coin when it gets bumped

	var coinValue				: int				= 2;
	var coinParticle			: Transform;
	var playerConnect			: playerProperties;
	var hudConnect				: hudController;
	var coinAlive				: boolean			= false;

	private var coinTime		: float				= 0.2;

	function Start (){
		coinAlive = true;
	}

	function Update (){
		var aniPlay : aniSprite = GetComponent("aniSprite");
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
		var hud : GameObject = GameObject.Find("hud");
		var hConnect : hudController = hud.GetComponent("hudController");
		var player : GameObject = GameObject.Find("player");
		var pConnect : playerProperties = player.GetComponent("playerProperties");
		hConnect.coin  += coinValue;
		pConnect.coins += coinValue;
	}

//finito
