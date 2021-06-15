function accessErrorRedirect(){
		location.href=jQuery.top_menu.href;
}

function accessError(){
	if(!jQuery.top_menu.debug && !jQuery.top_menu.chrome_app && !jQuery.top_menu.andapp){
		var isTouch = ('ontouchstart' in window);
		var thisPage = document.URL.match(/error/i);
		var topPage  = document.URL.match(/bahamut/i);
		if(isTouch === false && thisPage === null && topPage !== null){
			setTimeout("accessErrorRedirect()",0);
		}
	}
}

function fadeOut(){
	$("#loading").css('display','none');
}

function fadeIn(){
	$("#loading").css('display','none');
	$('#pics').show();
}

$(window).unload(function(){
	$('a[href]').attr('href','');
});

function addLoggingKey(src,key,value){
	if(typeof src==typeof ''){
		return addQuery(src,key,value);
	}else if(src && src.tagName && src.tagName == 'FORM'){
		src.action = addQuery(src.action,key,value);
	}
}

function addQuery(uri,key,value){
	var a = document.createElement('a');
	if(uri.match(/(\?|\&)url=(http%3A%2F%2F.*?)(\?|\&|$)/)){
		var match=RegExp.$2;
		var suburi='url='+encodeURIComponent(addQuery(decodeURIComponent(match),key,value));
		uri = uri.replace('url='+match,suburi);
		return uri;
	}else{
		a.href=uri;
		if(!a.search)a.search='';
		a.search += ((a.search.length)?'&':'?')+key+'='+value;
		return a.href;
	}
}

function click_shortcut() {
	if( document.getElementById("accesskey_5") ) {
		e_accesskey_5 = document.getElementById("accesskey_5");
		if( e_accesskey_5.tagName == "INPUT" ) {
			var form=e_accesskey_5;
			do{
				form=form.parentNode;
			}while(form!=null && form.tagName!='FORM');
			if(form)addLoggingKey(form,'ack5','1');
			e_accesskey_5.click();
		}else if( e_accesskey_5.tagName == "A" ) {
			$(e_accesskey_5).parents('form').append($('<input type="hidden" />').attr({name:'ack5'}).val(1));
			location.href=addLoggingKey(e_accesskey_5.href,'ack5','1');
		}
	}else{
		if(document.getElementById("accesskeyNextImg") != null){
			e_accesskey_5 = document.getElementById("accesskeyNextImg");
			if( e_accesskey_5.tagName == "A" ) {
				location.href=e_accesskey_5.href;
			}
		}
	}
}

$.fn.disableOnSubmit = function(disableList){
	if(disableList == null){ var $list = 'input[type=submit],button';}
	else{ var $list = disableList;}
	$(this).find($list).removeAttr('disabled');

	if($('#Evasion').size() == 0 && $('.Evasion').size() == 0){ 
		$(this).submit(function(){ 
			var el = this;
			if($('.MultiSubmit').size() == 0){ 
				//こっちの処理に入るとsubmitデータ送信前に無効フラグが立つので正常に送信出ない
				$(this).find($list).attr('disabled','disabled');
			}else{
				//送信前に無効フラグが立たないように一瞬遅らせる
				setTimeout(function(){ 
					$(el).find($list).attr('disabled','disabled');
				},1);
			}
			setTimeout(function(){ 
				$(el).find($list).attr('disabled',false);
			},500);
		});
		return this;
	}
	
};
$(function(){
	$("#loading").replaceWith("<div id='loading'><img src='http://ava-a.mbga.jp/i/dot.gif' height='570px' width='1px' ></div>");
	var isTouch = ('ontouchstart' in window);
	var thisPage = document.URL.match(/error/i);
	var topPage  = document.URL.match(/bahamut/i);
	var outChk   = 0;
	if(isTouch === false && thisPage === null && topPage !== null){
		if(!jQuery.top_menu.debug && !jQuery.top_menu.chrome_app && !jQuery.top_menu.andapp){
			setTimeout("accessErrorRedirect()",0);
			var outChk   = 1;
		}
	}

	if (window.orientation === undefined && thisPage === null && topPage !== null) {
		if(!jQuery.top_menu.debug && !jQuery.top_menu.chrome_app && !jQuery.top_menu.andapp){
			setTimeout("accessErrorRedirect()",0);
			var outChk   = 2;
		}
	}

	$("#loading").show();

	if(outChk > 0){
		setTimeout("fadeOut()",10);
	}else{
		setTimeout("fadeIn()",20);
	}

	var exeText = $("#accesskey_5").prop("value");
	if (exeText == null ) exeText = $("#accesskey_5").text();
	if (exeText == null && document.getElementById("accesskey_5") ) {
		exeText = document.getElementById("accesskey_5").value;
	}
	if((exeText == null || exeText.length == 0) && document.getElementById("accesskeyNextImg") != null){
		exeText = '次へ';
	}
	if(exeText == null || exeText.length == 0) {
		exeText = "ショートカットオフ";
		$("#shortcut_link_show").attr("onclick","return false");
		var shortOff = 1;
	}
	$("#shortcut_text_show").text(exeText);

	var menuItem = $("#accordion_header");
	menuItem.data('collapsed', false);
	var panel = $("#accordion")

	$("#accordion_header").click(function() {

		if (menuItem.data('collapsed')) {
			menuItem.data('collapsed', false);
			panel.hide();
		}
		else {
			menuItem.data('collapsed', true);
			panel.show();
		}
	});

	var chk = 0;
	$("#chks_change").click(function(){
		if(chk == 0)
		{
			$(".chkbox").attr("checked", true);
			$("#lnk_msg").text("全解除");
			$(".tabBtnRight").css({
				"background":"-moz-linear-gradient(top,#020101 0%,#020101 3%,#180a0a 3%,#220808)",
				"background":"-webkit-gradient(linear, left top, left bottom, from(#020101), color-stop(0.03,#020101), color-stop(0.03,#180a0a), to(#220808))",
				"border-left":"1px dashed #3b3b3b",
				"border-top":"1px solid #000",
				"border-bottom":"1px solid #000"
				})
			chk = 1;
		} else {
			$(".chkbox").attr("checked", false);
			$("#lnk_msg").text("全選択");
			$(".tabBtnRight").css({
				"background":"-moz-linear-gradient(top,#502020 0%,#502020 3%,#411010 3%,#310000)",
				"background":"-webkit-gradient(linear, left top, left bottom, from(#502020), color-stop(0.03,#502020), color-stop(0.03,#411010), to(#310000))",
				"border-left":"1px dashed #3b3b3b",
				"border-top":"1px solid #000",
				"border-bottom":"1px solid #353535"
				})
			chk = 0;
		}
		return false;
	});

	if(shortOff == 1){
		var exeText = $("#accesskey_str").prop("value");
		if (exeText == null ) exeText = $("#accesskey_str").text();
		if (exeText == null && document.getElementById("accesskey_str") ) exeText = document.getElementById("accesskey_str").value;
		if(exeText != null && exeText.length != 0) {
			$("#shortcut_text_show").text(exeText);
		}
		$("#shortcut_link_show").click(function(){
			var forms = document.getElementById("Evasion");
			var input = document.createElement('input');

			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'reinforce');
			input.setAttribute('value', 'true');
			forms.appendChild(input);
			addLoggingKey(forms,'ack5','1');
			forms.submit();
		});
	}
	$('form').disableOnSubmit();
});

$(document).ready(function(){
	function resizeContainer(e){
		var staticWidth = 300;
		$("div.mbga-pf-footer-container").css("width", staticWidth);
	}
	resizeContainer(null);
	$(window).bind("resize", resizeContainer);
});

$(function(){
	$("[class^='tab-area-col'] li").click(function(){
		if(!$(this).find("a").attr("href")){
			return false;
		}
		window.location=$(this).find("a").attr("href");

		return false;
	})
});


//スマートフォン端末active効果を出すための設定
$(function(){
	$(".touchListener").on("touchstart", function(){
		$(this).addClass("is-touch");
	});
	$(".touchListener").on("touchend", function(){
		$(this).removeClass("is-touch");
	});
});
