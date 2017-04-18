///jGAT Barrier script to limit the players backward progression

	function OnTriggerExit( other : Collider ){
		if(other.tag == "Player"){
			this.gameObject.GetComponent.<Collider>().isTrigger = false;
		}
	}
