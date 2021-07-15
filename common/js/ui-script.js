$(function (){
	gnb();
	dropDown();
	layerPopup();
	toggleActiveClass();
	tabContent();
	uploadFile();
	inputInteraction();
	accordion();
});

var gnb = function (){
	var $el = $('#gnb');
	var trigger = $('#gnb-trigger');
	trigger.on('click', function (){
		if ($(this).hasClass('active')) {
			$el.removeClass('active');
			$el.slideUp(150);
			$(this).removeClass('active');
		} else {
			$el.addClass('active');
			$el.slideDown(150);
			$(this).addClass('active');
		}
	})
}

var dropDown = function () {
	var $el  = $('.dropDown');
	var $elInteraction = $el.closest('.form-dropdown-par')

	//active
	$(document).on('click', '.dropDown >.trigger', function (e){
		var par = $(this).closest($el);
		if (par.find('>.target').length){
			e.preventDefault();
			if (!par.hasClass('active')){
				if ($elInteraction.length) {
					$elInteraction.find('.dropDown.active').find('>.target').slideUp(0);
					$elInteraction.find('.dropDown.active').removeClass('active')
					par.addClass('active');
					par.find('>.target');
				} else {
					par.addClass('active');
					par.find('>.target').slideDown(150);
				}
			} else {
				par.removeClass('active')
				par.find('>.target').slideUp(150);
			}
		}
	});
	$el.find('>.target > li > a,>.target > li > button').on('click', function (e){
		e.preventDefault();
		var dropDownText = $(this).text();
		var par = $(this).closest($el);

		par.find('>.trigger').text(dropDownText)
		par.removeClass('active')
		par.find('>.target').slideUp(150);
	})
	$(document).on('click', '.dropDown-close', function (){
		var par = $(this).closest($el);
		par.removeClass('active')
		par.find('>.target').slideUp(150);
	})
}

var popupOpenFunc = function (target){
	$('[' + target + ']').addClass('active');
	$('[' + target + ']').attr('tabindex',0).focus();
}
var popupCloseFunc = function (target){
	$('[' + target + ']').removeClass('active');
	$('[' + target + ']').removeAttr('tabindex');
}
var layerPopup = function (){
	// open
	var openTrigger = $('[data-layer-href]');
	openTrigger.on('click', function (){
		var layerHref = $(this).attr('data-layer-href');
		$('[' + layerHref + ']').addClass('active');
		$('[' + layerHref + ']').attr('tabindex',0).focus();
	})
	// close
	var closeTrigger = $('[data-layer-close]');
	closeTrigger.on('click', function (e){
		// e.preventDefault();
		$(this).closest('.layer-popup').removeClass('active')
		$(this).closest('.layer-popup').removeAttr('tabindex')
	})
}


var toggleActiveClass = function (){
	var $el = $('.togClass');
	$el.on('click', function (){
		$(this).toggleClass('active');
	})
}

var tabContent = function (){
	// active
	var openTrigger = $('[data-tab-href]');
	openTrigger.on('click', function (){
		var tabHref = $(this).attr('data-tab-href');

		// tab list
		$(this).closest('li').siblings('li').removeClass('active');
		$(this).closest('li').addClass('active');

		// tab content
		$('[' + tabHref + ']').siblings('').removeClass('active')
		$('[' + tabHref + ']').addClass('active');
	})
}

var uploadFile = function (){
	var fileTarget = $('.inp-file .blind');
	fileTarget.on('change', function(){
	// 값이 변경되면
	if(window.FileReader){ // modern browser
		var filename = $(this)[0].files[0].name; } else { // old IE
		var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
		} // 추출한 파일명 삽입
		$(this).siblings('.inp-file-text').val(filename);
	});
}

var inputInteraction = function (){
	var $el = $('.input-action');
	$el.on('keyup keypress', function (){
		var par = $(this).closest('.input-text')
		if ($(this).val().length > 0){
			par.addClass('active')
		} else {
			par.removeClass('active')
		}
	})

}

var accordion = function (){
	var $el = $('.accordion-list');
	var openTrigger = $el.find('.acc-trigger')
	openTrigger.on('click', function (){
		var par = $(this).closest('li')
		if (!par.hasClass('active')){
			par.siblings('').removeClass('active')
			par.siblings('').find('.acc-target').slideUp(150);
			par.addClass('active');
			par.find('.acc-target').slideDown(150);
		} else {
			par.removeClass('active');
			par.find('.acc-target').slideUp(150);
		}
	})
	$el.each(function (){
		$el.find('>li.active .acc-target').css('display','block');
	})

}

/*** layerpopup focus out prevent ***/
$(document).ready(function() {

	var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], video";

	// dropdown open 시 key 입력 event
	$('.layer-popup').keydown(function(event) {
		trapTabKey($(this), event);
	})


	//focusout prevent event
	function trapTabKey(obj, evt) {
		// if tab or shift-tab pressed
		if (evt.which == 9) {
			// get list of all children elements in given object
			var o = obj.find('*');
			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(focusableElementsString).filter(':visible')
			// get currently focused item
			var focusedItem;
			focusedItem = $(':focus');
			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length
			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);
			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}
			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}
	}
});