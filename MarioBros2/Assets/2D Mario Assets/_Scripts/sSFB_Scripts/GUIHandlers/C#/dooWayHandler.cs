using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class dooWayHandler : MonoBehaviour {
	private GameObject BossGumba;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		BossGumba = GameObject.Find ("prefab_player_Bossgumba");
		if (BossGumba == null) {
			DestroyObject (this.gameObject);
		}
	}
}
