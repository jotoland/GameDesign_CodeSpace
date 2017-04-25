
//mario Sounds
var marioItsAMe						: AudioClip;
var marioLetsAGo					: AudioClip;
var marioAppear						: AudioClip;
var marioBreakBlock					: AudioClip;
var marioBump						: AudioClip;
var marioJump						: AudioClip;
var marioCrouchJump					: AudioClip;
var marioStompGumba					: AudioClip;
var marioStartSaying				: AudioClip;
var marioFinishSaying				: AudioClip;
var marioInjured					: AudioClip;
var marioPowerDown					: AudioClip;
var marioDie						: AudioClip;
var marioPowerUp					: AudioClip;
var mario1UP						: AudioClip;

//projectile sounds
var fireballSpawn					: AudioClip;
var fireballHit						: AudioClip;

//collectables, game state, porting
var coinCollect						: AudioClip;
var pauseSound						: AudioClip;
var pipePort						: AudioClip;
var levelCompletionSound			: AudioClip;
var oldSchoolStageStart				: AudioClip;
var creditsMusic					: AudioClip;
var grassMusic						: AudioClip;
var worldOneMusic					: AudioClip;
var underWorldMusic					: AudioClip;
var gameOverSound					: AudioClip;


//getting the audio source from this gameObject
private var AUDIO_SOURCE			: AudioSource;
private var bcCam1					: GameObject;
private var bcCam2					: GameObject;
private var bcCam3					: GameObject;
private var bcCam4					: GameObject;
private var bcCam5					: GameObject;
private var bcCam6					: GameObject;
private var actor					: GameObject;
private var player					: GameObject;
private var BACKUP_AS_1				: AudioSource;
private var BACKUP_AS_2				: AudioSource;
private var BACKUP_AS_3				: AudioSource;
private var BACKUP_AS_4				: AudioSource;
private var BACKUP_AS_5				: AudioSource;
private var BACKUP_AS_6				: AudioSource;
private var SOUND_TRACK				: AudioSource;
private var PIPE_TRACK				: AudioSource;
private var soundRate				: float = 0.0;
private var soundDelay				: float = 0.0;

//function to play audio clips
function PlaySoundFX(soundName : AudioClip, soundDelay : float){
	//if(!AUDIO_SOURCE.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		AUDIO_SOURCE.clip = soundName;
		AUDIO_SOURCE.Play();
		yield WaitForSeconds(AUDIO_SOURCE.clip.length);
	//}
}

function PlaySoundFXQb(soundName : AudioClip, soundDelay : float){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_1.clip = soundName;
		BACKUP_AS_1.Play();
		yield WaitForSeconds(BACKUP_AS_1.clip.length);
}

function PlaySoundFXBlock(soundName : AudioClip, soundDelay : float){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_2.clip = soundName;
		BACKUP_AS_2.Play();
		yield WaitForSeconds(BACKUP_AS_2.clip.length);
}

function PlaySoundFXGrow(soundName : AudioClip, soundDelay : float){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_3.clip = soundName;
		BACKUP_AS_3.Play();
		yield WaitForSeconds(BACKUP_AS_3.clip.length);
	
}

function PlaySoundFX1UP(soundName : AudioClip, soundDelay : float){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_4.clip = soundName;
		BACKUP_AS_4.Play();
		yield WaitForSeconds(BACKUP_AS_4.clip.length);
}

function PlaySoundFXFire(soundName : AudioClip, soundDelay : float){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_5.clip = soundName;
		BACKUP_AS_5.Play();
		yield WaitForSeconds(BACKUP_AS_5.clip.length);
}

function PlaySoundFXCoin(soundName : AudioClip, soundDelay : float){
	if(!BACKUP_AS_6.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		BACKUP_AS_6.clip = soundName;
		BACKUP_AS_6.Play();
		yield WaitForSeconds(BACKUP_AS_6.clip.length);
	}
}

function PlaySoundTrack(soundName : AudioClip, soundDelay : float){
	if(!SOUND_TRACK.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		SOUND_TRACK.clip = soundName;
		SOUND_TRACK.Play();
		yield WaitForSeconds(SOUND_TRACK.clip.length);
	}
}

function PlaySoundPipe(soundName : AudioClip, soundDelay : float){
	if(!PIPE_TRACK.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		PIPE_TRACK.clip = soundName;
		PIPE_TRACK.Play();
		yield WaitForSeconds(PIPE_TRACK.clip.length);
	}
}

function Start(){
	AUDIO_SOURCE = GetComponent.<AudioSource>();
	bcCam1 = GameObject.Find("main_camera_transitionTo");
	BACKUP_AS_1 = bcCam1.GetComponent.<AudioSource>();
	bcCam2 = GameObject.Find("main_camera_perspective_back");
	BACKUP_AS_2 = bcCam2.GetComponent.<AudioSource>();
	bcCam3 = GameObject.Find("main_camera_perspective_clouds");
	BACKUP_AS_3 = bcCam3.GetComponent.<AudioSource>();
	bcCam4 = GameObject.Find("main_camera_perspective_front");
	BACKUP_AS_4 = bcCam4.GetComponent.<AudioSource>();
	bcCam5 = GameObject.Find("main_camera_perspective_middle");
	BACKUP_AS_5 = bcCam5.GetComponent.<AudioSource>();
	bcCam6 = GameObject.Find("main_camera_hud");
	BACKUP_AS_6 = bcCam6.GetComponent.<AudioSource>();
	actor = GameObject.Find("jGAT_actor");
	SOUND_TRACK = actor.GetComponent.<AudioSource>();
	player = GameObject.Find("GameOverCanvas");
	PIPE_TRACK = player.GetComponent.<AudioSource>();
}