using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

public class AudioMixerHandler : MonoBehaviour {

	public AudioMixer mainMix;
	public Slider SoundEffects;
	public Slider SoundTrack;
	public Slider MasterVolume;
	private PauseMenuHandler pNG;
	private bool WaitingForMute = true;
	//button
	public GameObject muteAudioBtn;

	void Start(){
		GameObject pauseNavGUI = GameObject.Find ("PauseBtn");
		if(pauseNavGUI != null){
			pNG = pauseNavGUI.GetComponent<PauseMenuHandler> ();
		}
	}

	void Update(){
		if (AudioListener.volume == 0 && WaitingForMute) {
			WaitingForMute = false;
			SliderValuesToMute ();
		}
		if (AudioListener.volume == 1 && !WaitingForMute) {
			WaitingForMute = true;
			ClearAll ();
		}
	}

	private void SliderValuesToMute(){
		SoundEffects.value = -80;
		SoundTrack.value = -80;
		MasterVolume.value = -80;
	}

	public void SetMasterLvl(float MasterLvl){
		mainMix.SetFloat ("masterTrack", MasterLvl);
		if (MasterLvl < 15) {
			SoundTrack.value = MasterLvl;
		}

		if (MasterLvl < 2) {
			SoundEffects.value = MasterLvl;
		}

	}

	public void SetMusicLvl(float MusicLvl){
		mainMix.SetFloat ("musicTrack", MusicLvl);
	}

	public void SetSFXLvl(float sfxLvl){
		mainMix.SetFloat ("sfxTrack", sfxLvl);
		mainMix.SetFloat ("1upTrack", sfxLvl);
		mainMix.SetFloat ("blockTrack", sfxLvl);
		mainMix.SetFloat ("coinTrack", sfxLvl);
		mainMix.SetFloat ("fireFlowerTrack", sfxLvl);
		mainMix.SetFloat ("mushroomGrowTrack", sfxLvl);
		mainMix.SetFloat ("pipePortTrack", sfxLvl);
		mainMix.SetFloat ("qBlockTrack", sfxLvl);

	}
		

	public void ClearAll(){
		AudioListener.volume = 1;
		pNG.AUDIO_MUTED = false;
		muteAudioBtn.GetComponentInChildren<Text>().text = "Mute Audio";
		mainMix.ClearFloat ("masterTrack");
		MasterVolume.value = 2;
		mainMix.ClearFloat ("musicTrack");
		SoundTrack.value = 15;
		mainMix.ClearFloat ("sfxTrack");
		mainMix.ClearFloat ("1upTrack");
		mainMix.ClearFloat ("coinTrack");	
		mainMix.ClearFloat ("fireFlowerTrack");
		mainMix.ClearFloat ("mushroomGrowTrack");
		mainMix.ClearFloat ("pipePortTrack");
		mainMix.ClearFloat ("qBlockTrack");
		SoundEffects.value = 2;

	}


}
//finito