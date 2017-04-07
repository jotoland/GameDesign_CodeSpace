//jGAT 4/3/17 POLE POINT SCRIPT CALCULATES POINTS 

	enum PointPosition {
		A = 0,
		B = 1,
		C = 2,
		D = 3,
		E = 4,
		F = 5,
		G = 6,
		H = 7
	}
	var countDelay						: float = 0.01;
	var pointPosition					: PointPosition;

	private var pole					: GameObject;

	private var pointPosValue			: int;
	var player							: GameObject;
	private var pControls				: playerControls;
	private var pProp					: playerProperties;
	private var charCon 				: CharacterController;

	private var hud						: GameObject;
	private var hControls				: hudController;


	function Start(){
		pole = GameObject.Find("prefab_pole_WIN");

		//player = GameObject.Find("player");
		pControls = player.GetComponent("playerControls");
		pProp = player.GetComponent("playerProperties");
		charCon = player.GetComponent.<CharacterController>();

		hud = GameObject.Find("hud");
		hControls = hud.GetComponent("hudController");
	}

	function OnTriggerEnter(other : Collider){
		if(other.tag == "socketRight"){
			//print("Mario");
			player.transform.position.x = this.transform.position.x - 0.1;
			charCon.enabled = false;

			switch(pointPosition){
				case PointPosition.A:
					print("A");
					pointPosValue = 100;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.B:
					print("B");
					pointPosValue = 90;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.C:
					print("C");
					pointPosValue = 80;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.D:
					print("D");
					pointPosValue = 70;
					countDelay += countDelay;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.E:
					print("E");
					pointPosValue = 60;
					countDelay += countDelay*2;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.F:
					print("F");
					pointPosValue = 50;
					countDelay += countDelay*3;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.G:
					print("G");
					pointPosValue = 40;
					countDelay += countDelay*4;
					updatePointsHUD(countDelay);
					break;
				case PointPosition.H:
					print("H");
					pointPosValue = 30;
					countDelay += countDelay*5;
					updatePointsHUD(countDelay);
					break;
			}
			print("countDelay " + countDelay);
		}
	}

	function updatePointsHUD(delay : float){
		for(var i:int = 1; i<=pointPosValue; i++){
			hControls.point = i;
			yield WaitForSeconds(delay);
		}
		marioJumpOffPole();
	}

	function marioJumpOffPole(){
		for(var child : Transform in pole.transform) {
             GameObject.Destroy(child.gameObject);
        }
		//yield WaitForSeconds(0.7);
		print("Jump off Mario");
		charCon.enabled = true;
		pControls.gravity = 20.0;
		pControls.moveDirection = 1;
		pControls.velocity.y = 6.0;
		player.transform.position.x = this.transform.position.x + 0.5;

	}




//finitio
