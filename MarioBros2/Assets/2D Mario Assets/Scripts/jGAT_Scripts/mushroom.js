//jGAT mushroom pickup Script
//Setup for Grow and 1up
//Controls the mushroom movement and sets the bounce direction
//tags 'blocks' and 'mushrooms'

	var mushroomDirection				: GameObject;
	var mushroomSpeed					: float = 1.0;

	function Update (){
		moveDirection = mushroomDirection.GetComponent("mushroomCollider").mushroomDirection;

		if(moveDirection){
			mushroomSpeed = 1.0;

		}
		if(!moveDirection){
			mushroomSpeed = -1.0;
		}

		this.transform.Translate(mushroomSpeed * Time.deltaTime, 0, 0);
	}

//finito
