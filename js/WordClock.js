function WordClock(containerSelector){
	if(!(this instanceof WordClock)){
		return;
	}

	this.start = function(){
		showTime();
		setInterval(function(){
			showTime();
		},30000);
	}

	function init(container){
		var $clock = $('<div id="WordClock"></div>'),
			modifiers = ['it','is','half','ten','quarter','twenty','five','minutes','to','past'],
			seconds,
			current,
			i;
		
		for(i=0;i<modifiers.length;i++){
			current = modifiers[i];
			$clock.append('<span class="modifier '+current+'"> '+current+' </span>');
		}

		for(i=1;i<=12;i++){
			$clock.append('<span class="hour '+clockIntToString(i)+'"> '+clockIntToString(i)+' </span>');
		}

		$clock.append('<span class="modifier oclock"> o\'clock </span>');

		$(container).append($clock);

		$('#WordClock .modifier.it').addClass('active');
		$('#WordClock .modifier.is').addClass('active');
	}

	function showTime(){
		var date = getDateNearestToFive(getDateWithOffset()),
			hours = date.getHours(),
			minutes = date.getMinutes();

		if(minutes == 15 || minutes == 30 || minutes == 45){
			$('#WordClock .modifier.minutes').removeClass('active');
		}
		else{
			$('#WordClock .modifier.minutes').addClass('active');
		}

		if(minutes == 30){
			$('#WordClock .modifier.half').addClass('active');
		}
		else{
			$('#WordClock .modifier.half').removeClass('active');
		}

		if(minutes == 5 || minutes == 25 || minutes == 55 || minutes == 35){
			$('#WordClock .modifier.five').addClass('active');
		}
		else{
			$('#WordClock .modifier.five').removeClass('active');
		}

		if(minutes == 20 || minutes == 25 || minutes == 40 || minutes == 35){
			$('#WordClock .modifier.twenty').addClass('active');
		}
		else{
			$('#WordClock .modifier.twenty').removeClass('active');
		}

		if(minutes == 10 || minutes == 50){
			$('#WordClock .modifier.ten').addClass('active');
		}
		else{
			$('#WordClock .modifier.ten').removeClass('active');
		}

		if(minutes == 15 || minutes == 45){
			$('#WordClock .modifier.quarter').addClass('active');
		}
		else{
			$('#WordClock .modifier.quarter').removeClass('active');
		}

		if(minutes == 0){
			$('#WordClock .modifier.oclock').addClass('active');
			$('#WordClock .modifier.minutes').removeClass('active');
			$('#WordClock .modifier.past').removeClass('active');
			$('#WordClock .modifier.to').removeClass('active');
		}
		else{
			$('#WordClock .modifier.oclock').removeClass('active');

			if(minutes <= 30){
				$('#WordClock .modifier.past').addClass('active');
				$('#WordClock .modifier.to').removeClass('active');
			}
			else{
				$('#WordClock .modifier.past').removeClass('active');
				$('#WordClock .modifier.to').addClass('active');
				hours++;
			}
		}

		if(hours > 12){
			hours -= 12;
		}
		if(hours == 0){
			hours = 12;
		}

		for(var i=1; i<= 12; i++){
			if(i == hours){
				$('#WordClock .hour.'+clockIntToString(i)).addClass('active');
			}
			else{
				$('#WordClock .hour'+clockIntToString(i)).removeClass('active');
			}
		}
	}

	function clockIntToString(num){
		var nums = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];

		if(typeof num != 'number'){
			throw 'type exception';
		}

		return nums[num-1];
	}

	function getDateNearestToFive(date){
		var coeff = 1000 * 60 * 5; // 1000 milliseconds per second, 60 seconds per minute
		return new Date(Math.round(date.getTime() / coeff) * coeff);
	}

	function getDateWithOffset(offset){
		offset = offset || 0;
		return new Date( new Date().getTime() + offset * 3600 * 1000);
	}



	init(containerSelector);
	return this;
}