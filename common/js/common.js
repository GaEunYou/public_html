function checkValue(_val) {
    if(_val === null || typeof _val === 'undefined' || (typeof _val === 'string' && _val === '')) {
        return true;
    }
    
    return false;
}

var __SUBMIT_FLAG__ = true; //SUBMIT 가능여부
var __SPINNER__;
var __SPINNER_PANEL__;

function startSpinner(targetId) {
    var opts = {
          lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 0.5 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.6 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
        }
    __SPINNER__ = new Spinner(opts).spin(document.getElementById(targetId));
    __SPINNER_PANEL__ = $('<div></div>');
    __SPINNER_PANEL__.css('position', 'absolute');
    __SPINNER_PANEL__.css('height', '100%');
    __SPINNER_PANEL__.css('width', '100%');
    __SPINNER_PANEL__.css('background-color', 'rgba(0, 0, 0, 0.2');
    __SPINNER_PANEL__.css('z-index', '100000');
    __SPINNER_PANEL__.prependTo($('#__CONTENT_BODY__'));
}

function stopSpinner() {
    __SPINNER__.stop();
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/* ===== image save start ===== */
function makeFrame(url, target) { 
    var ifrm = document.createElement( "IFRAME" ); 
    ifrm.setAttribute( "style", "display:none;" ) ;
    ifrm.setAttribute( "src", url ) ; 
    ifrm.setAttribute( "name", target) ; 
    ifrm.style.width = 0+"px"; 
    ifrm.style.height = 0+"px"; 

    document.body.appendChild( ifrm ); 
} 

function removeiframe() {
	var iframes = document.getElementsByTagName('iframe');
	for (var i = 0; i < iframes.length; i++) {
	    iframes[i].parentNode.removeChild(iframes[i]);
	}
}

function saveToDisk(fileURL, fileName) {
    if (!(window.ActiveXObject || "ActiveXObject" in window)) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || fileURL;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);

    } else if ( window.ActiveXObject || "ActiveXObject" in window ) {
        makeFrame(fileURL, fileName);
        alert('"' + fileName +'" 이미지 파일을 다운로드 합니다.');
        var _window = window.open(fileURL, fileName);
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
        removeiframe();
    }
}
/* ===== image save end ===== */

function popupCenter(url, title, w, h) {  
    // Fixes dual-screen position                         Most browsers      Firefox  
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;  
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;  
              
    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;  
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;  
              
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;  
    var top = ((height / 2) - (h / 2)) + dualScreenTop;  
    var newWindow = window.open(url, title, 'menubars=no, scrollbars=auto, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);  
  
    // Puts focus on the newWindow  
    /*
    if (window.focus) {  
        newWindow.focus();  
    } 
    */
   return newWindow;
}  

function imgPopup(obj) {
    var img_width = obj.naturalWidth;
    var win_width = obj.naturalWidth;
    var img_height = obj.naturalHeight;
    var win = obj.naturalHeight;
    var url = obj.src;

    var tokens = url.split('/');
    var newWindow = popupCenter(url, tokens[tokens.length - 1], img_width, img_height)
    newWindow.document.write("<style>body{margin:0px;}</style><img src='" + url + "' width='" + win_width + "'>");
}

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    } else {
       return results[1] || 0;
    }
}

function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

//8방위
function direct_8(val){
    var indata = Number(val)/22.5;
    var rd = "";
    if(indata <= 1.0){ //북
        rd = "북";
    }else if(indata <= 3.0   ){ //북동
        rd = "북동";
    }else if(indata <= 5.0   ){ //동
        rd = "동";
    }else if(indata <= 7.0   ){ //남동
        rd = "남동";
    }else if(indata <= 9.0   ){ //남
        rd = "남";
    }else if(indata <= 11.0   ){ //남서
        rd = "남서";
    }else if(indata <= 13.0   ){ //서
        rd = "서";
    }else if(indata <= 15.0   ){ //북서
        rd = "북서";
    }else if( 15.0 < indata){ //북
        rd = "북";
    }
    
    return rd;
}

function direct_8_en(val){
    var indata = Number(val)/22.5;
    var rd = "";
    if(indata <= 1.0){ //북
        rd = "N";
    }else if(indata <= 3.0   ){ //북동
        rd = "NE";
    }else if(indata <= 5.0   ){ //동
        rd = "E";
    }else if(indata <= 7.0   ){ //남동
        rd = "SE";
    }else if(indata <= 9.0   ){ //남
        rd = "S";
    }else if(indata <= 11.0   ){ //남서
        rd = "SW";
    }else if(indata <= 13.0   ){ //서
        rd = "W";
    }else if(indata <= 15.0   ){ //북서
        rd = "NW";
    }else if( 15.0 < indata){ //북
        rd = "N";
    }
    
    return rd;
}

function isEmpty(val) {
    if(val == undefined || val == null || val == '' || (val != null && typeof val == 'object' && !Object.keys(val).length)) {
        return true;
    } else {
        return false;
    }
}