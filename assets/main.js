var text = (
`// Hey, bro! It\'s my oficial page! (Press ENTER for fast coding!);

class I {
	constructor() {
		this.name = "Andrey Zhevlakov";
		this.nick = "azbang";
		this.mail = "azbango5@gmail.com";
		this.description = "Web Developer"; 
		this.skills = [
			"html5", "css3", "javascript", 
			"es6", "coffescript"
		];
	
		this.contacts = { ... };
		this.projects = { ... };
	}
}

var me = new I();
generatePage(me);
// Press ENTER when ready...`).split('');


$(document).ready(function() {
	var $code = $('code');
	var $content = $('#content');
	var $viewCode = $('#view-code');

	var comleteStr = '';
	var count = 0;
	var isShowContent = false;
	var delay = 3;
	var _delay = 0;

	var timer = setInterval(function() {
		_delay += 1;

		if(_delay < delay) return;
		else _delay = 0; 
		
		if(count > text.length-2) {
			finishPrint();
			clearInterval(timer)
		}

		comleteStr += text[count];
		$code.empty();
		$code.html(comleteStr);
		hljs.highlightBlock($code[0]);
		$code.append('<span id="cursor">|</span>');

		count += 1;
	}, 1);

	$(window).keydown(function(e) {
		if(e.which === 13) delay = 0;
	});
	$(window).keyup(function(e) {
		if(e.which === 13) delay = 3;
	});

	function finishPrint() {
		$(window).keyup(function(e) {
			if(e.which === 13) {
				isShowContent = !isShowContent;

				$content.removeClass('hide');
				$content.toggleClass('content-blur', !isShowContent);
				$viewCode.toggleClass('code-blur', isShowContent);
				
				setTimeout(function() {
					$code.toggleClass('zoom', isShowContent);
				}, 500);
			}
		});
	}
});