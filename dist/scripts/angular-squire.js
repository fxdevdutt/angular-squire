/**
* @preserve angular-squire - angularjs directive for squire rich text editor
* @version v0.6.1
* @link https://github.com/HourlyNerd/angular-squire
* @license MIT
**/
(function(){angular.module("angular-squire",[]).directive("squire",["squireService",function(e){return{restrict:"E",require:"ngModel",scope:{height:"@",width:"@",body:"=",placeholder:"@",editorClass:"@",buttons:"@"},replace:!0,transclude:!0,templateUrl:"/modules/angular-squire/editor.html",controller:["$scope",function(n){var t,i;return n.buttons&&(t=n.$eval(n.buttons),n.buttonVis=_.defaults(t||{},e.getButtonDefaults())),i=!0,n.isEditorVisible=function(){return i},n.editorVisibility=this.editorVisibility=function(e){var t;return 1!==arguments.length?i:(i=e,e&&null!=(t=n.editor)?t.focus():void 0)}}],link:function(n,t,i,s){var r,a,o,l,u,c,d,v,g,f,h,m,p,b,k,L;return o="http://",a="angular-squire-iframe",r="h4",l=n.editor=null,n.data={link:o},k=function(i){return i=e.sanitize.input(i,l),n.$evalAsync(function(){return s.$setViewValue(i),s.$isEmpty(i)?t.removeClass("squire-has-value"):t.addClass("squire-has-value")})},s.$render=function(){return null!=l?l.setHTML(s.$viewValue||""):void 0},s.$isEmpty=function(e){return angular.isString(e)?0===angular.element("<div>"+e+"</div>").text().trim().length:!e},u=function(){return l?angular.element(l.getSelection().commonAncestorContainer).closest("a").attr("href"):o},n.canRemoveLink=function(){var e;return e=u(),e&&e!==o},n.canAddLink=function(){return n.data.link&&n.data.link!==o},n.$on("$destroy",function(){return null!=l?l.destroy():void 0}),n.showPlaceholder=function(){return s.$isEmpty(s.$viewValue)},n.popoverHide=function(e,t){var i;return i=function(){return angular.element(e.target).closest(".popover-visible").removeClass("popover-visible"),n.action(t)},e.keyCode?13===e.keyCode?i():void 0:i()},n.popoverShow=function(e){var i,s;i=angular.element(e.currentTarget),angular.element(e.target).closest(".squire-popover").length||i.hasClass("popover-visible")||(i.addClass("popover-visible"),n.data.link=/>A\b/.test(l.getPath())||l.hasFormat("A")?u():o,s=t.find(".squire-popover").find("input").focus().end(),s.css({left:-1*(s.width()/2)+i.width()/2+2}))},L=function(e){var t;return t=e.head,_.each(angular.element("link"),function(n){var i;return i=e.createElement("link"),i.setAttribute("href",n.href),i.setAttribute("type","text/css"),i.setAttribute("rel","stylesheet"),t.appendChild(i)}),e.childNodes[0].className=a+" ",n.editorClass?e.childNodes[0].className+=n.editorClass:void 0},d=t.find("iframe"),p=t.find(".menu"),c=!1,v=function(){var i;return i=d[0].contentWindow.document,L(i),s.$setPristine(),l=n.editor=new Squire(i),l.defaultBlockTag="P",n.body&&(l.setHTML(n.body),k(n.body),c=!0),l.addEventListener("willPaste",function(n){return e.sanitize.paste(n,l)}),l.addEventListener("input",function(){var e;return c?(e=l.getHTML(),k(e)):void 0}),l.addEventListener("focus",function(){return t.addClass("focus").triggerHandler("focus"),n.editorVisibility(!0),c=!0}),l.addEventListener("blur",function(){return t.removeClass("focus").triggerHandler("blur"),s.$pristine&&!s.$isEmpty(s.$viewValue)?s.$setTouched():s.$setPristine(),c=!0}),l.addEventListener("pathChange",function(){var e,n;return e=l.getPath(),/>A\b/.test(e)||l.hasFormat("A")?t.find(".add-link").addClass("active"):t.find(".add-link").removeClass("active"),p.attr("class","menu "+(null!=(n=e.split("BODY")[1])?n.replace(/>|\.|html|body|div/gi," ").replace(RegExp(r,"g"),"size").toLowerCase():void 0))}),l.alignRight=function(){return l.setTextAlignment("right")},l.alignCenter=function(){return l.setTextAlignment("center")},l.alignLeft=function(){return l.setTextAlignment("left")},l.alignJustify=function(){return l.setTextAlignment("justify")},l.makeHeading=function(){var e;return e=!p.hasClass("size"),l.forEachBlock(function(n){return e?angular.element(n).addClass(r):angular.element(n).removeClass(r)},!0),l.focus()}},b=navigator.userAgent,g=/Chrome/.test(b)||/Safari/.test(b),h=/rv:11.0|IE/.test(b),f=!g&&!h,m=!1,d.on("load",function(){return m=!0}),g?v():t.one("mouseenter",function(){return f?m?v():d.on("load",v):v()}),Squire.prototype.testPresenceinSelection=function(e,n,t,i){var s,r;return s=this.getPath(),r=i.test(s)|this.hasFormat(t),e===n&&r},n.action=function(e){var t,i,s,r,a;if(l)if(a={value:e,testBold:l.testPresenceinSelection("bold",e,"B",/>B\b/),testItalic:l.testPresenceinSelection("italic",e,"I",/>I\b/),testUnderline:l.testPresenceinSelection("underline",e,"U",/>U\b/),testOrderedList:l.testPresenceinSelection("makeOrderedList",e,"OL",/>OL\b/),testUnorderedList:l.testPresenceinSelection("makeUnorderedList",e,"UL",/>UL\b/),testLink:l.testPresenceinSelection("removeLink",e,"A",/>A\b/),testQuote:l.testPresenceinSelection("increaseQuoteLevel",e,"blockquote",/>blockquote\b/),isNotValue:function(n){return n===e&&""!==this.value}},a.testBold||a.testItalic||a.testUnderline||a.testOrderedList||a.testUnorderedList||a.testQuote||a.testLink){if(a.testBold&&l.removeBold(),a.testItalic&&l.removeItalic(),a.testUnderline&&l.removeUnderline(),a.testOrderedList&&l.removeList(),a.testUnorderedList&&l.removeList(),a.testQuote&&l.decreaseQuoteLevel(),a.testLink)return l.removeLink(),l.focus()}else if(!a.isNotValue("removeLink")){if("makeLink"===e){if(!n.canAddLink())return;return i=angular.element(l.getSelection().commonAncestorContainer).closest("a")[0],i&&(s=d[0].contentWindow.document.createRange(),s.selectNodeContents(i),r=d[0].contentWindow.getSelection(),r.removeAllRanges(),r.addRange(s)),t=n.data.link.match(/^\s*?javascript:/i)?o:n.data.link,l.makeLink(t,{target:"_blank",title:t,rel:"nofollow"}),n.data.link=o,l.focus()}return l[e](),l.focus()}}}}}]).directive("squireCover",function(){return{restrict:"E",replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isCoverVisible()"\n    ng-click=\'hideCover()\'\n    class="angular-squire-cover">\n</ng-transclude>',link:function(e,n,t,i){var s;return s=!0,e.isCoverVisible=function(){return s},e.hideCover=function(){return s=!1,i.editorVisibility(!0)},i.editorVisibility(!s),e.$watch(function(){return i.editorVisibility()},function(e){return s=!e})}}}).directive("squireControls",function(){return{restrict:"E",scope:!1,replace:!0,transclude:!0,require:"^squire",template:'<ng-transclude ng-show="isControlsVisible()"\n    class="angular-squire-controls">\n</ng-transclude>',link:function(e,n,t,i){return e.isControlsVisible=function(){return i.editorVisibility()}}}}).provider("squireService",[function(){var e,n,t,i,s;return e={bold:!0,italic:!0,underline:!0,link:!0,ol:!0,ul:!0,quote:!0,header:!0,alignRight:!0,alignLeft:!0,alignCenter:!0,undo:!0,redo:!0},n=new Sanitize({elements:["div","span","b","i","ul","ol","li","blockquote","a","p","br","u"],attributes:{__ALL__:["class"],a:["href","title","target","rel"]},protocols:{a:{href:["ftp","http","https","mailto","gopher"]}}}),s={paste:n,input:n},t=!0,i={onPaste:function(){},onChange:function(e){return e},sanitize:{paste:function(e,n){return t&&(e.fragment=s.paste.clean_node(e.fragment)),i.onPaste(e,n)},input:function(e,n){var r,a,o,l,u;if(t){for(o=document.createDocumentFragment(),u=document.createElement("body"),u.innerHTML=e;r=u.firstChild;)o.appendChild(r);for(o=s.input.clean_node(o);r=o.firstChild;)u.appendChild(r);l=u.innerHTML,e!==l&&(n.setHTML(l),e=l)}return a={html:e},i.onChange(a,n),a.html}},setButtonDefaults:function(n){return e=n},getButtonDefaults:function(){return e}},this.onPaste=function(e){return e?i.onPaste=e:void 0},this.onChange=function(e){return e?i.onChange=e:void 0},this.sanitizeOptions={paste:function(e){return e?s.paste=new Sanitize(e):void 0},input:function(e){return e?s.input=new Sanitize(e):void 0}},this.strictPaste=function(e){return s.paste=e?new Sanitize({elements:["div","span","b","i","u","br","p"]}):n},this.enableSanitizer=function(e){return null==e&&(e=!0),t=e},this.$get=function(){return i},this}])}).call(this),angular.module("angular-squire").run(["$templateCache",function(e){e.put("/modules/angular-squire/editor.html",'<div class=\'angular-squire\'>\n    <div ng-class="{\'editor-hide\': !isEditorVisible()}" class=\'editor-container\'>\n        <div class="menu">\n            <div class="group" ng-show="buttonVis.bold || buttonVis.italic || buttonVis.underline">\n                <div title=\'Bold\'\n                     ng-click="action(\'bold\')"\n                     ng-show="buttonVis.bold"\n                     class="item bold">\n                    <i class="fa fa-bold"></i>\n                </div>\n                <div title=\'Italic\'\n                     ng-click="action(\'italic\')"\n                     ng-show="buttonVis.italic"\n                     class="item italic">\n                    <i class="fa fa-italic"></i>\n                </div>\n                <div title=\'Underline\'\n                     ng-click="action(\'underline\')"\n                     ng-show="buttonVis.underline"\n                     class="item underline">\n                    <i class="fa fa-underline"></i>\n                </div>\n            </div>\n            <div class="group"  ng-show="buttonVis.link || buttonVis.ol || buttonVis.ul || buttonVis.quote">\n                <div title=\'Insert Link\'\n                     class="item add-link"\n                     ng-show="buttonVis.link"\n                     ng-click="popoverShow($event)">\n                    <i class="fa fa-link"></i>\n                    <div class="squire-popover">\n                        <div class="arrow"></div>\n                        <div class="content">\n                            <div class="title">Insert Link</div>\n                            <input type="text"\n                                id="edit-link"\n                                placeholder="Link URL"\n                                ng-model="data.link"\n                                ng-keydown="popoverHide($event, \'makeLink\')" />\n                            <button class="double r" ng-show="canRemoveLink()"\n                                ng-click="popoverHide($event, \'removeLink\')">\n                                <span class="fa fa-remove"></span> Remove Link\n                            </button>\n                            <button class="double l" ng-show="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-edit"></span> Update Link\n                            </button>\n                            <button ng-hide="canRemoveLink()"\n                                ng-class="{disabled: !canAddLink()}"\n                                ng-click="popoverHide($event, \'makeLink\')">\n                                <span class="fa fa-plus"></span> Insert Link\n                            </button>\n                        </div>\n                        <div class="squire-popover-overlay" ng-click="popoverHide($event, \'makeLink\')"></div>\n                    </div>\n                </div>\n                <div title=\'Insert Numbered List\'\n                     ng-click="action(\'makeOrderedList\')"\n                     ng-show="buttonVis.ol"\n                     class="item olist">\n                    <i class="fa fa-list-ol"></i>\n                </div>\n                <div title=\'Insert List\'\n                     ng-click="action(\'makeUnorderedList\')"\n                     ng-show="buttonVis.ul"\n                     class="item ulist">\n                    <i class="fa fa-list-ul"></i>\n                </div>\n                <div title=\'Quote\'\n                     ng-click="action(\'increaseQuoteLevel\')"\n                     ng-show="buttonVis.quote"\n                     class="item quote">\n                    <i class="fa fa-quote-right"></i>\n                </div>\n            </div>\n\n            <div class="group" ng-show="buttonVis.header || buttonVis.alignLeft || buttonVis.alignRight || buttonVis.alignCenter">\n                <div title=\'Header\'\n                     ng-click="action(\'makeHeading\')"\n                     ng-show="buttonVis.header"\n                     class="item header">\n                    <i class="fa fa-header"></i>\n                </div>\n                <div title=\'Align Left\'\n                     ng-click="action(\'alignLeft\')"\n                     ng-show="buttonVis.alignLeft"\n                     class="item aleft">\n                    <i class="fa fa-align-left"></i>\n                </div>\n                <div title=\'Align Center\'\n                     ng-click="action(\'alignCenter\')"\n                     ng-show="buttonVis.alignCenter"\n                     class="item acenter">\n                    <i class="fa fa-align-center"></i>\n                </div>\n                <div title=\'Align Right\'\n                     ng-click="action(\'alignRight\')"\n                     ng-show="buttonVis.alignRight"\n                     class="item aright">\n                    <i class="fa fa-align-right"></i>\n                </div>\n            </div>\n\n            <div class="group" ng-show="buttonVis.undo || buttonVis.redo">\n                <div title=\'Undo\'\n                     ng-click="action(\'undo\')"\n                     ng-show="buttonVis.undo"\n                     class="item">\n                    <i class="fa fa-undo"></i>\n                </div>\n                <div title=\'Redo\'\n                     ng-click="action(\'redo\')"\n                     ng-show="buttonVis.redo"\n                     class="item">\n                    <i class="fa fa-repeat"></i>\n                </div>\n            </div>\n        </div>\n\n        <div class=\'angular-squire-wrapper\' ng-style=\'{width: width, height: height}\'>\n            <div class=\'placeholder\'>\n                <div ng-show=\'showPlaceholder()\'>{{ placeholder }}</div>\n            </div>\n            <iframe frameborder=\'0\' border=\'0\' marginwidth=\'0\' marginheight=\'0\' src=\'about:blank\'></iframe>\n        </div>\n    </div>\n    <ng-transclude></ng-transclude>\n</div>\n')}]);