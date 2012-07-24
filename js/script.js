    function tumblr(resp) {
      var posts = resp.posts;
      $('#blog .loading').replaceWith('<ul/>');
      $ul = $('#blog ul');
      for (var i=0; i<posts.length; i++) {
        var p = posts[i];
                    var title = p['regular-title'] || p['link-text'] || null, body = p['regular-body'] || null;
        if (title) {
          $ul.append('<h3><a href="'+p['url']+'">'+title+'</a></h3>');
          $ul.append('<p>'+body+'</p>');
        }
      }
    };




$("#projects-link").click(function () {
  $(this).addClass("active");
});

$("#logo").hover(
  function () {
    $(this).addClass("mono-cat");
  },
  function () {
    $(this).removeClass("mono-cat");
  }
);







$.fn.pager = function(clas, options) {
	
	var settings = {		
		navId: 'nav',
		navClass: 'nav',
		navAttach: 'append',
		highlightClass: 'highlight',
		prevText: '&laquo;',
		nextText: '&raquo;',
		linkText: null,
		linkWrap: null,
		height: null
	}
	if(options) $.extend(settings, options);
	
		
	return this.each( function () {
		
		var me = $(this);
		var size;
	  	var i = 0;		
		var navid = '#'+settings.navId;
		
		function init () {
			size = $(clas, me).not(navid).size();
			if(settings.height == null) {			
				settings.height = getHighest();
			}
			if(size > 1) {
				makeNav();
				show();
				highlight();
			}			
			sizePanel();
			if(settings.linkWrap != null) {
				linkWrap();
			}
		}
		function makeNav () {		
			var str = '<div id="'+settings.navId+'" class="'+settings.navClass+'">';
			str += '<a href="#" rel="prev">'+settings.prevText+'</a>';
			for(var i = 0; i < size; i++) {
				var j = i+1;
				str += '<a href="#" rel="'+j+'">';
				str += (settings.linkText == null) ? j : settings.linkText[j-1];				
				str += '</a>';
			}
			str += '<a href="#" rel="next">'+settings.nextText+'</a>';
			str += '</div>';
			switch (settings.navAttach) {		
				case 'before':
					$(me).before(str);
					break;
				case 'after':		
					$(me).after(str);
					break;
				case 'prepend':
					$(me).prepend(str);
					break;
				default:
					$(me).append(str);
					break;
			}
		}
		function show () {
			$(me).find(clas).not(navid).hide();
			var show = $(me).find(clas).not(navid).get(i);
			$(show).show();
		}		
		function highlight () {
			$(me).find(navid).find('a').removeClass(settings.highlightClass);
			var show = $(me).find(navid).find('a').get(i+1);			
			$(show).addClass(settings.highlightClass);
		}

		function sizePanel () {
			if($.browser.msie) {
				$(me).find(clas).not(navid).css( {
					height: settings.height
				});	
			} else {
				$(me).find(clas).not(navid).css( {
					minHeight: settings.height
				});
			}
		}
		function getHighest () {
			var highest = 0;
			$(me).find(clas).not(navid).each(function () {
				
				if(this.offsetHeight > highest) {
					highest = this.offsetHeight;
				}
			});
			highest = highest + "px";
			return highest;
		}
		function getNavHeight () {
			var nav = $(navid).get(0);
			return nav.offsetHeight;
		}
		function linkWrap () {
			$(me).find(navid).find("a").wrap(settings.linkWrap);
		}
		init();
		$(this).find(navid).find("a").click(function () {

			if($(this).attr('rel') == 'next') {
				if(i + 1 < size) {
					i = i+1;
				}
			} else if($(this).attr('rel') == 'prev') { 
				if(i > 0) {	
					i = i-1;
				}
			} else {		
				var j = $(this).attr('rel');	
				i = j-1;		
			}
			show();
			highlight();
			return false;
		});
	});	
}



$(document).ready(function() {
	$("#heading, .subhead, #learnmore").animate({opacity:1, top:'+=20'});

  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 1500, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
  
});


/*
	* haylep-JS ~ 
	* :: Now with support for touch events and multiple instances for 
	* :: those situations that call for multiple easter eggs!
	* Code: http://haylep-js.googlecode.com/
	* Examples: http://www.snaptortoise.com/haylep-js
	* Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
	* Version: 1.3.3 (4/16/2011)
	* Licensed under the GNU General Public License v3
	* http://www.gnu.org/copyleft/gpl.html
	* Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
*/

var haylep = function() {
	var haylep= {
			addEvent:function ( obj, type, fn, ref_obj )
			{
				if (obj.addEventListener)
					obj.addEventListener( type, fn, false );
				else if (obj.attachEvent)
				{
					// IE
					obj["e"+type+fn] = fn;
					obj[type+fn] = function() { obj["e"+type+fn]( window.event,ref_obj ); }
	
					obj.attachEvent( "on"+type, obj[type+fn] );
				}
			},
	        input:"",
	        pattern:"3838404037393739666513",
		/*pattern:"38384040373937396665",*/
	        load: function(link) {					
				this.addEvent(document,"keydown", function(e,ref_obj) {											
					if (ref_obj) haylep = ref_obj; // IE
					haylep.input+= e ? e.keyCode : event.keyCode;
					if (haylep.input.length > haylep.pattern.length) haylep.input = haylep.input.substr((haylep.input.length - haylep.pattern.length));
					if (haylep.input == haylep.pattern) {
                    haylep.code(link);
					haylep.input="";
                   	return;
                    }
            	},this);
           this.iphone.load(link)
	                
				},
	        code: function(link) { window.location=link},
	        iphone:{
	                start_x:0,
	                start_y:0,
	                stop_x:0,
	                stop_y:0,
	                tap:false,
	                capture:false,
					orig_keys:"",
	                keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],
	                code: function(link) { haylep.code(link);},
	                load: function(link){
									this.orig_keys = this.keys;
	    							haylep.addEvent(document,"touchmove",function(e){
	                          if(e.touches.length == 1 && haylep.iphone.capture==true){ 
	                            var touch = e.touches[0]; 
	                                haylep.iphone.stop_x = touch.pageX;
	                                haylep.iphone.stop_y = touch.pageY;
	                                haylep.iphone.tap = false; 
	                                haylep.iphone.capture=false;
	                                haylep.iphone.check_direction();
	                                }
	                                });               
	                        haylep.addEvent(document,"touchend",function(evt){
	                                if (haylep.iphone.tap==true) haylep.iphone.check_direction(link);           
	                                },false);
	                        haylep.addEvent(document,"touchstart", function(evt){
	                                haylep.iphone.start_x = evt.changedTouches[0].pageX
	                                haylep.iphone.start_y = evt.changedTouches[0].pageY
	                                haylep.iphone.tap = true
	                                haylep.iphone.capture = true
	                                });               
	                                },
	                check_direction: function(link){
	                        x_magnitude = Math.abs(this.start_x-this.stop_x)
	                        y_magnitude = Math.abs(this.start_y-this.stop_y)
	                        x = ((this.start_x-this.stop_x) < 0) ? "RIGHT" : "LEFT";
	                        y = ((this.start_y-this.stop_y) < 0) ? "DOWN" : "UP";
	                        result = (x_magnitude > y_magnitude) ? x : y;
	                        result = (this.tap==true) ? "TAP" : result;                     

	                        if (result==this.keys[0]) this.keys = this.keys.slice(1,this.keys.length)
	                        if (this.keys.length==0) { 
														this.keys=this.orig_keys;
														this.code(link)
														}
	                        }
	                }
	}
	return haylep;
}

