(function(b){function f(a,g){var d=b.proxy(this.process,this),e=b(a).is("body")?b(window):b(a),c;this.options=b.extend({},b.fn.scrollspy.defaults,g);this.$scrollElement=e.on("scroll.scroll.data-api",d);this.selector=(this.options.target||(c=b(a).attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a";this.$body=b("body").on("click.scroll.data-api",this.selector,d);this.refresh();this.process()}f.prototype={constructor:f,refresh:function(){this.targets=this.$body.find(this.selector).map(function(){var a=
b(this).attr("href");return/^#\w/.test(a)&&b(a).length?a:null});this.offsets=b.map(this.targets,function(a){return b(a).position().top})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.offsets,d=this.targets,e=this.activeTarget,c;for(c=b.length;c--;)e!=d[c]&&a>=b[c]&&(!b[c+1]||a<=b[c+1])&&this.activate(d[c])},activate:function(a){this.activeTarget=a;this.$body.find(this.selector).parent(".active").removeClass("active");a=this.$body.find(this.selector+'[href="'+
a+'"]').parent("li").addClass("active");a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active")}};b.fn.scrollspy=function(a){return this.each(function(){var g=b(this),d=g.data("scrollspy"),e=typeof a=="object"&&a;d||g.data("scrollspy",d=new f(this,e));if(typeof a=="string")d[a]()})};b.fn.scrollspy.Constructor=f;b.fn.scrollspy.defaults={offset:10};b(function(){b('[data-spy="scroll"]').each(function(){var a=b(this);a.scrollspy(a.data())})})})(window.jQuery);
