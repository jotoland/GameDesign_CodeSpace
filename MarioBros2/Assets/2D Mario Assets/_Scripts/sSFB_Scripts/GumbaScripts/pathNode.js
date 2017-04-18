//jGAT 4/1/17 PATH NODE HELPER
//Helps control the logic of the gumba enemy

	enum PathInstruction{
		moveLeft	= 0,
		moveRight	= 1,
		moveStop 	= 2,
		jumpAir 	= 3
	}

	enum ChangeTo{
		moveLeft		= 0,
		moveRight		= 1,
		moveStop		= 2,
		jumpAir			= 3,
		removeTrigger	= 4
	}

	var pathInstruction 						= PathInstruction.moveStop;
	var changePathInstructionTo	: boolean		= false;
	var changeTo								= ChangeTo.moveRight;
	var overRideJump			: boolean		= false;
	var removeOnTrigger			: boolean		= false;
	var jumpOverRide			: float 		= 8.0;
	var triggerCountDown		: int			= 2;
	var removeTimeCountDown		: float			= 1.0;

	private var getChangeTo		: int;



	function OnTriggerEnter(other : Collider){
		if(other.tag == "enemy"){
			//print("gumba entered");
			if(changePathInstructionTo){
				if(triggerCountDown <= 0){
					if(changeTo == ChangeTo.removeTrigger){
						Destroy(this.gameObject, removeTimeCountDown);
					}else{
						getChangeTo = changeTo;
						pathInstruction = getChangeTo;
					}
				}else{
					triggerCountDown--;
				}
			}
			if(removeOnTrigger){
				Destroy(this.gameObject, removeTimeCountDown);
			}
		}
	}

//finito
