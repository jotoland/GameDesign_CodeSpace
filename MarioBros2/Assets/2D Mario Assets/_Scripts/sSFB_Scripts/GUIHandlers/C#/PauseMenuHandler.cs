﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class PauseMenuHandler : MonoBehaviour {

	private GameObject pauseMenuBox;
	private GameObject jumpBtn;
	private GameObject joyStick;
	private GameObject runBtn;
	private GameObject mobileControls;
	public GameObject muteAudioBtn;

	private bool GAME_PAUSED;
	public bool AUDIO_MUTED;



	// Use this for initialization
	void Start () {
		
		GAME_PAUSED = false;
		AUDIO_MUTED = false;
		pauseMenuBox = GameObject.Find ("PauseMenuBox");
		mobileControls = GameObject.Find ("jGAT_MobileControls");
		if (mobileControls) {
			jumpBtn = mobileControls.transform.GetChild (0).gameObject;
			joyStick = mobileControls.transform.GetChild (1).gameObject;
			runBtn = mobileControls.transform.GetChild (2).gameObject;
		}
		pauseMenuBox.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void MuteAudio(){
		if (AUDIO_MUTED) {
			AudioListener.volume = 1;
			muteAudioBtn.GetComponentInChildren<Text>().text = "Mute Audio";
			AUDIO_MUTED = false;
		} else {
			AudioListener.volume = 0;
			muteAudioBtn.GetComponentInChildren<Text>().text = "Unmute";
			AUDIO_MUTED = true;
		}
	}

	public void PauseBtn(){
		if (GAME_PAUSED) {
			this.gameObject.GetComponentInChildren<Text>().text = "Pause";
			pauseMenuBox.SetActive (false);
			if (mobileControls) {
				jumpBtn.GetComponent<Image> ().enabled = true;
				joyStick.GetComponent<Image> ().enabled = true;
				runBtn.GetComponent<Image> ().enabled = true;
			}
			Time.timeScale = 1;
			AudioListener.pause = false;
			GAME_PAUSED = false;
		} else {
			this.gameObject.GetComponentInChildren<Text>().text = "Play";
			if (mobileControls) {
				jumpBtn.GetComponent<Image> ().enabled = false;
				joyStick.GetComponent<Image> ().enabled = false;
				runBtn.GetComponent<Image> ().enabled = false;
			}
			pauseMenuBox.SetActive (true);
			Time.timeScale = 0;
			AudioListener.pause = true;
			GAME_PAUSED = true;
		}
	}

	public void ExitBtn(){
		Application.Quit ();
		StopEditorPlayback ();
	}

	void StopEditorPlayback(){
		#if UNITY_EDITOR
		UnityEditor.EditorApplication.isPlaying = false;
		#endif
	}

	public void JohnsWorldBtn(){
		SceneManager.LoadScene ("jGAT_World_1");
	}

	public void RichardsWorldBtn(){
		SceneManager.LoadScene ("Richard's world");
	}

	public void RachelsWorldBtn(){
		SceneManager.LoadScene ("Rachel_world");
	}


}
