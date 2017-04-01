//jGAT 3/31/17
//Coin Rotation Component
//Call coin sprite for rotation animation

	private var rotationCoinSpeed : float = 20.0;

	function Update ()
	{
		var aniPlay = GetComponent("aniSprite");
		aniPlay.aniSprite(16, 2, 0, 0, 21, rotationCoinSpeed);
	}

//finito