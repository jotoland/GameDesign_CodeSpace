//jGAT SHOW GIZMO HELPER
//Displays the location of path nodes inside the scene

	var imageGizmo				: Texture;

	function OnDrawGizmos(){
		if(!imageGizmo){
			Gizmos.DrawIcon(this.transform.position, "IconDefault");
		}else{
			Gizmos.DrawIcon(this.transform.position, imageGizmo.name);
		}
	}

//finito

