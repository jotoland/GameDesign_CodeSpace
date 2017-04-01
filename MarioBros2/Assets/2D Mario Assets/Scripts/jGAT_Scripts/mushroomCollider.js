//jGAT 3/31/17 MUSHROOM COLLIDER DIRECTION
//Checks for collisions if so then the tag name must be 'block' or 'mushroom' (direction changes)

	var mushroomDirection		: boolean = true;

	function OnTriggerEnter(other : Collider){
		if(other.tag == "block" || other.tag == "pickup_mushroom"){
			mushroomDirection = !mushroomDirection;
		}
	}

//finito