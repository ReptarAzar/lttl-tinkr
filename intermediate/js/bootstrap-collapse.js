(function(c){var e=function(a,b){this.$element=c(a);this.options=c.extend({},c.fn.collapse.defaults,b);if(this.options.parent)this.$parent=c(this.options.parent);this.options.toggle&&this.toggle()};e.prototype={constructor:e,dimension:function(){return this.$element.hasClass("width")?"width":"height"},show:function(){var a=this.dimension(),b=c.camelCase(["scroll",a].join("-")),d=this.$parent&&this.$parent.find(".in"),f;d&&d.length&&(f=d.data("collapse"),d.collapse("hide"),f||d.data("collapse",null));
this.$element[a](0);this.transition("addClass","show","shown");this.$element[a](this.$element[0][b])},hide:function(){var a=this.dimension();this.reset(this.$element[a]());this.transition("removeClass","hide","hidden");this.$element[a](0)},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto");this.$element[a?"addClass":"removeClass"]("collapse");return this},transition:function(a,b,d){var f=this,e=function(){b=="show"&&f.reset();f.$element.trigger(d)};this.$element.trigger(b)[a]("in");
c.support.transition&&this.$element.hasClass("collapse")?this.$element.one(c.support.transition.end,e):e()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};c.fn.collapse=function(a){return this.each(function(){var b=c(this),d=b.data("collapse"),f=typeof a=="object"&&a;d||b.data("collapse",d=new e(this,f));if(typeof a=="string")d[a]()})};c.fn.collapse.defaults={toggle:!0};c.fn.collapse.Constructor=e;c(function(){c("body").on("click.collapse.data-api","[data-toggle=collapse]",
function(a){var b=c(this),d,a=b.attr("data-target")||a.preventDefault()||(d=b.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),b=c(a).data("collapse")?"toggle":b.data();c(a).collapse(b)})})})(window.jQuery);
