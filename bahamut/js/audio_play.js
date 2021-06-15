if ((/iPhone/.test(navigator.userAgent) || /iPad/.test(navigator.userAgent)) && /OS 4/.test(navigator.userAgent)) {
	//iPhone4+iOS4�n�ŕs����������ׁAiPhone4�n�͎g�p���Ȃ�
} else {
	emi_audio_flag=1;
	load_id=0;

	emiAudioHandler=("ontouchstart"in window)?"touchstart":"mousedown";

	emi_audio_url0="";

	emi_audio_src0=new Audio(emi_audio_url0);

	function emiAudioInit(init_id){
		emi_audio_flag=0;
		load_id=init_id;
		eval('emi_audio_src'+init_id+'=new Audio(emi_audio_url'+init_id+')');
	};

	function emiAudioLoad(load_id){
		eval('emi_audio_src'+load_id+'.load();');
	};

	function emiAudioPlay(play_id,pause_id){
		emiAudioPause(pause_id);
		eval('emi_audio_src'+play_id+'.play();');
	};

	function emiAudioPause(pause_id){
		eval('emi_audio_src'+pause_id+'.pause();');
	};

	document.addEventListener(emiAudioHandler,function(e){
		e.preventDefault();
		if(emi_audio_flag==0){
			emi_audio_flag=1;
			emiAudioLoad(load_id);
		}
	},true);
}
