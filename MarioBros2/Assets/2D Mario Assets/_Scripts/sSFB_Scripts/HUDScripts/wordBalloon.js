import UnityEngine.SceneManagement;
import UnityStandardAssets.CrossPlatformInput;
// Word Balloon Component
// Walker Boys (www.walkerboystudio.com)
// March 19, 2011
// Description: Simple example of a word balloon system - and ability to 'switch' between word balloons
// Instruction: Assign two sprite (GameObjects) word balloons and a sound file in the inspector

var player            			: playerControls;							// get playerControls.js script from player
var wordBalloon1      			: GameObject;								// word balloon gameObject
var wordBalloon2      			: GameObject;								// word balloon gameObject
var wordBalloonSound			: AudioClip;								// audio file for final word balloon gone
private var wordBalloonStart  	: boolean 		= false;					// enable first word balloon
private var wordBalloonNext   	: boolean 		= false;					// enable next word balloon 
private var currentScene		: Scene;
public var menu					: GameObject;
public var mobileControls		: GameObject;
public var pauseBtn				: GameObject;
private var joyStick			: GameObject;
private var jumpBtn				: GameObject;
private var runBtn				: GameObject;

private var aS					: soundFXHandler;
private var audioCam			: GameObject;
private var GAME_PAUSED			: boolean = false;

function Start ()															// initialize
{
	wordBalloon1.GetComponent(Renderer).enabled = false;									// set balloon render state to false (hide)
	wordBalloon2.GetComponent(Renderer).enabled = false;
	audioCam = GameObject.Find("main_camera_and_hud");
	aS = audioCam.GetComponent("soundFXHandler");									// set balloon render state to false (hide)
	currentScene = SceneManager.GetActiveScene();

	if (mobileControls) {
			jumpBtn = mobileControls.transform.GetChild (0).gameObject;
			joyStick = mobileControls.transform.GetChild (1).gameObject;
			runBtn = mobileControls.transform.GetChild (2).gameObject;
	}
}
function Update ()															// loop
{
	if ( wordBalloonStart )													// if balloon start true
	{
		wordBalloon1.GetComponent(Renderer).enabled = true;								// set balloon render state to true (unhide)
		wordBalloon2.GetComponent(Renderer).enabled = false;								// set balloon render state to false (hide)
		if ( CrossPlatformInputManager.GetButtonUp ( "Fire1" ) )								// check for button press
		{
			wordBalloon1.GetComponent(Renderer).enabled = false;							// set balloon render state to false (hide)
			wordBalloonNext = true;											// enable next word balloon
			wordBalloonStart = false;										// turn off starting word balloon
		}
	}
	if ( wordBalloonNext )													// if balloon next true
	{
		player.enabled = false;												// turn off player controls (could add a line for aniSprite and have him idle instead of frozen)
		wordBalloon2.GetComponent(Renderer).enabled = true;								// set balloon render state to true (unhide)
		Time.timeScale = 0.0;												// scale time to zero (stop/pause)
		if ( CrossPlatformInputManager.GetButtonDown ( "Fire1" ) )								// check for button press
		{
			wordBalloon2.GetComponent(Renderer).enabled = false;							// set balloon render state to false (hide)
			player.enabled = true;											// turn on player controls
			wordBalloonNext = false;										// turn off next word balloon 
			Time.timeScale = 1.0;		
			aS.PlaySoundFX(aS.marioStartSaying, 0);									// set time scale back to normal													// play the audio clip
			if(currentScene.name == "jGAT_WelcomeScene" || currentScene.name == "jGAT_sandboxSmall"){
				openMenu();
			}

		}
	}
}
function OnTriggerEnter (other : Collider )									// if trigger enter event
{
	if ( other.tag == "Player" )											// check if tag name equals 'Player'
	{
		wordBalloonStart = true;											// if so, then enable balloon start
	}
}
function OnTriggerExit ( other : Collider )									// if trigger exit event
{
	if ( other.tag == "Player" )											// check if tag name equals 'Player'
	{
		wordBalloonStart = false;											// if so, then turn off balloon start 
		wordBalloon1.GetComponent(Renderer).enabled = false;								// set balloon render state to false (hide)
	}
}

function openMenu(){
	yield WaitForSeconds(aS.marioStartSaying.length);
	if (GAME_PAUSED) {
			pauseBtn.GetComponentInChildren.<Text>().text = "Pause";
			menu.SetActive (false);
			if (mobileControls) {
				jumpBtn.GetComponent.<Image> ().enabled = true;
				joyStick.GetComponent.<Image> ().enabled = true;
				runBtn.GetComponent.<Image> ().enabled = true;
			}
			Time.timeScale = 1;
			AudioListener.pause = false;
			GAME_PAUSED = false;
		} else {
			pauseBtn.GetComponentInChildren.<Text>().text = "Play";
			if (mobileControls) {
				jumpBtn.GetComponent.<Image> ().enabled = false;
				joyStick.GetComponent.<Image> ().enabled = false;
				runBtn.GetComponent.<Image> ().enabled = false;
			}
			menu.SetActive (true);
			Time.timeScale = 0;
			AudioListener.pause = true;
			GAME_PAUSED = true;
		}
}
