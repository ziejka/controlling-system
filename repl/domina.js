// Compiled by ClojureScript 0.0-2173
goog.provide('domina');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.xml');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.events');
goog.require('goog.string');
goog.require('domina.support');
goog.require('goog.style');
goog.require('goog.style');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_5151 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<select multiple='multiple'>","</select>"], null);var table_section_wrapper_5152 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<table>","</table>"], null);var cell_wrapper_5153 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [3,"<table><tbody><tr>","</tr></tbody></table>"], null);domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["td","optgroup","tfoot","tr","area",new cljs.core.Keyword(null,"default","default",2558708147),"option","legend","thead","col","caption","th","colgroup","tbody"],[cell_wrapper_5153,opt_wrapper_5151,table_section_wrapper_5152,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,"<table><tbody>","</tbody></table>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<map>","</map>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,"",""], null),opt_wrapper_5151,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<fieldset>","</fieldset>"], null),table_section_wrapper_5152,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], null),table_section_wrapper_5152,cell_wrapper_5153,table_section_wrapper_5152,table_section_wrapper_5152]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));var tbody = (((cljs.core._EQ_.call(null,tag_name,"table")) && (no_tbody_QMARK_))?(function (){var and__3528__auto__ = div.firstChild;if(cljs.core.truth_(and__3528__auto__))
{return div.firstChild.childNodes;
} else
{return and__3528__auto__;
}
})():(((cljs.core._EQ_.call(null,start_wrap,"<table>")) && (no_tbody_QMARK_))?divchildNodes:cljs.core.PersistentVector.EMPTY));var seq__5158 = cljs.core.seq.call(null,tbody);var chunk__5159 = null;var count__5160 = 0;var i__5161 = 0;while(true){
if((i__5161 < count__5160))
{var child = cljs.core._nth.call(null,chunk__5159,i__5161);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,0)))
{child.parentNode.removeChild(child);
} else
{}
{
var G__5162 = seq__5158;
var G__5163 = chunk__5159;
var G__5164 = count__5160;
var G__5165 = (i__5161 + 1);
seq__5158 = G__5162;
chunk__5159 = G__5163;
count__5160 = G__5164;
i__5161 = G__5165;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5158);if(temp__4126__auto__)
{var seq__5158__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5158__$1))
{var c__4288__auto__ = cljs.core.chunk_first.call(null,seq__5158__$1);{
var G__5166 = cljs.core.chunk_rest.call(null,seq__5158__$1);
var G__5167 = c__4288__auto__;
var G__5168 = cljs.core.count.call(null,c__4288__auto__);
var G__5169 = 0;
seq__5158 = G__5166;
chunk__5159 = G__5167;
count__5160 = G__5168;
i__5161 = G__5169;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__5158__$1);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,0)))
{child.parentNode.removeChild(child);
} else
{}
{
var G__5170 = cljs.core.next.call(null,seq__5158__$1);
var G__5171 = null;
var G__5172 = 0;
var G__5173 = 0;
seq__5158 = G__5170;
chunk__5159 = G__5171;
count__5160 = G__5172;
i__5161 = G__5173;
continue;
}
}
} else
{return null;
}
}
break;
}
});
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();var vec__5175 = cljs.core.get.call(null,domina.wrap_map,tag_name,new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(domina.wrap_map));var depth = cljs.core.nth.call(null,vec__5175,0,null);var start_wrap = cljs.core.nth.call(null,vec__5175,1,null);var end_wrap = cljs.core.nth.call(null,vec__5175,2,null);var div = (function (){var wrapper = (function (){var div = document.createElement("div");div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();var level = depth;while(true){
if((level > 0))
{{
var G__5176 = wrapper.lastChild;
var G__5177 = (level - 1);
wrapper = G__5176;
level = G__5177;
continue;
}
} else
{return wrapper;
}
break;
}
})();if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3528__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);if(and__3528__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3528__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = (function (){var obj5179 = {};return obj5179;
})();
domina.nodes = (function nodes(content){if((function (){var and__3528__auto__ = content;if(and__3528__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3528__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__4167__auto__ = (((content == null))?null:content);return (function (){var or__3540__auto__ = (domina.nodes[goog.typeOf(x__4167__auto__)]);if(or__3540__auto__)
{return or__3540__auto__;
} else
{var or__3540__auto____$1 = (domina.nodes["_"]);if(or__3540__auto____$1)
{return or__3540__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){if((function (){var and__3528__auto__ = nodeseq;if(and__3528__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3528__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__4167__auto__ = (((nodeseq == null))?null:nodeseq);return (function (){var or__3540__auto__ = (domina.single_node[goog.typeOf(x__4167__auto__)]);if(or__3540__auto__)
{return or__3540__auto__;
} else
{var or__3540__auto____$1 = (domina.single_node["_"]);if(or__3540__auto____$1)
{return or__3540__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){if(cljs.core.truth_((function (){var and__3528__auto__ = domina._STAR_debug_STAR_;if(cljs.core.truth_(and__3528__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3528__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log_debug__delegate.call(this,mesg);};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__5180){
var mesg = cljs.core.seq(arglist__5180);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log__delegate.call(this,mesg);};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__5181){
var mesg = cljs.core.seq(arglist__5181);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,class_name)));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return common_ancestor__delegate.call(this,contents);};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__5182){
var contents = cljs.core.seq(arglist__5182);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){return cljs.core.map.call(null,(function (p1__5183_SHARP_){return p1__5183_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){domina.apply_with_cloning.call(null,(function (p1__5184_SHARP_,p2__5185_SHARP_){return goog.dom.insertChildAt(p1__5184_SHARP_,p2__5185_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__5187_SHARP_,p2__5186_SHARP_){return goog.dom.insertSiblingBefore(p2__5186_SHARP_,p1__5187_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__5189_SHARP_,p2__5188_SHARP_){return goog.dom.insertSiblingAfter(p2__5188_SHARP_,p1__5189_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){domina.apply_with_cloning.call(null,(function (p1__5191_SHARP_,p2__5190_SHARP_){return goog.dom.replaceNode(p2__5190_SHARP_,p1__5191_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){var seq__5196_5200 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5197_5201 = null;var count__5198_5202 = 0;var i__5199_5203 = 0;while(true){
if((i__5199_5203 < count__5198_5202))
{var n_5204 = cljs.core._nth.call(null,chunk__5197_5201,i__5199_5203);goog.style.setStyle(n_5204,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5205 = seq__5196_5200;
var G__5206 = chunk__5197_5201;
var G__5207 = count__5198_5202;
var G__5208 = (i__5199_5203 + 1);
seq__5196_5200 = G__5205;
chunk__5197_5201 = G__5206;
count__5198_5202 = G__5207;
i__5199_5203 = G__5208;
continue;
}
} else
{var temp__4126__auto___5209 = cljs.core.seq.call(null,seq__5196_5200);if(temp__4126__auto___5209)
{var seq__5196_5210__$1 = temp__4126__auto___5209;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5196_5210__$1))
{var c__4288__auto___5211 = cljs.core.chunk_first.call(null,seq__5196_5210__$1);{
var G__5212 = cljs.core.chunk_rest.call(null,seq__5196_5210__$1);
var G__5213 = c__4288__auto___5211;
var G__5214 = cljs.core.count.call(null,c__4288__auto___5211);
var G__5215 = 0;
seq__5196_5200 = G__5212;
chunk__5197_5201 = G__5213;
count__5198_5202 = G__5214;
i__5199_5203 = G__5215;
continue;
}
} else
{var n_5216 = cljs.core.first.call(null,seq__5196_5210__$1);goog.style.setStyle(n_5216,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5217 = cljs.core.next.call(null,seq__5196_5210__$1);
var G__5218 = null;
var G__5219 = 0;
var G__5220 = 0;
seq__5196_5200 = G__5217;
chunk__5197_5201 = G__5218;
count__5198_5202 = G__5219;
i__5199_5203 = G__5220;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_style_BANG___delegate.call(this,content,name,value);};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__5221){
var content = cljs.core.first(arglist__5221);
arglist__5221 = cljs.core.next(arglist__5221);
var name = cljs.core.first(arglist__5221);
var value = cljs.core.rest(arglist__5221);
return set_style_BANG___delegate(content,name,value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){var seq__5226_5230 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5227_5231 = null;var count__5228_5232 = 0;var i__5229_5233 = 0;while(true){
if((i__5229_5233 < count__5228_5232))
{var n_5234 = cljs.core._nth.call(null,chunk__5227_5231,i__5229_5233);n_5234.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5235 = seq__5226_5230;
var G__5236 = chunk__5227_5231;
var G__5237 = count__5228_5232;
var G__5238 = (i__5229_5233 + 1);
seq__5226_5230 = G__5235;
chunk__5227_5231 = G__5236;
count__5228_5232 = G__5237;
i__5229_5233 = G__5238;
continue;
}
} else
{var temp__4126__auto___5239 = cljs.core.seq.call(null,seq__5226_5230);if(temp__4126__auto___5239)
{var seq__5226_5240__$1 = temp__4126__auto___5239;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5226_5240__$1))
{var c__4288__auto___5241 = cljs.core.chunk_first.call(null,seq__5226_5240__$1);{
var G__5242 = cljs.core.chunk_rest.call(null,seq__5226_5240__$1);
var G__5243 = c__4288__auto___5241;
var G__5244 = cljs.core.count.call(null,c__4288__auto___5241);
var G__5245 = 0;
seq__5226_5230 = G__5242;
chunk__5227_5231 = G__5243;
count__5228_5232 = G__5244;
i__5229_5233 = G__5245;
continue;
}
} else
{var n_5246 = cljs.core.first.call(null,seq__5226_5240__$1);n_5246.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__5247 = cljs.core.next.call(null,seq__5226_5240__$1);
var G__5248 = null;
var G__5249 = 0;
var G__5250 = 0;
seq__5226_5230 = G__5247;
chunk__5227_5231 = G__5248;
count__5228_5232 = G__5249;
i__5229_5233 = G__5250;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_attr_BANG___delegate.call(this,content,name,value);};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__5251){
var content = cljs.core.first(arglist__5251);
arglist__5251 = cljs.core.next(arglist__5251);
var name = cljs.core.first(arglist__5251);
var value = cljs.core.rest(arglist__5251);
return set_attr_BANG___delegate(content,name,value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){var seq__5256_5260 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5257_5261 = null;var count__5258_5262 = 0;var i__5259_5263 = 0;while(true){
if((i__5259_5263 < count__5258_5262))
{var n_5264 = cljs.core._nth.call(null,chunk__5257_5261,i__5259_5263);n_5264.removeAttribute(cljs.core.name.call(null,name));
{
var G__5265 = seq__5256_5260;
var G__5266 = chunk__5257_5261;
var G__5267 = count__5258_5262;
var G__5268 = (i__5259_5263 + 1);
seq__5256_5260 = G__5265;
chunk__5257_5261 = G__5266;
count__5258_5262 = G__5267;
i__5259_5263 = G__5268;
continue;
}
} else
{var temp__4126__auto___5269 = cljs.core.seq.call(null,seq__5256_5260);if(temp__4126__auto___5269)
{var seq__5256_5270__$1 = temp__4126__auto___5269;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5256_5270__$1))
{var c__4288__auto___5271 = cljs.core.chunk_first.call(null,seq__5256_5270__$1);{
var G__5272 = cljs.core.chunk_rest.call(null,seq__5256_5270__$1);
var G__5273 = c__4288__auto___5271;
var G__5274 = cljs.core.count.call(null,c__4288__auto___5271);
var G__5275 = 0;
seq__5256_5260 = G__5272;
chunk__5257_5261 = G__5273;
count__5258_5262 = G__5274;
i__5259_5263 = G__5275;
continue;
}
} else
{var n_5276 = cljs.core.first.call(null,seq__5256_5270__$1);n_5276.removeAttribute(cljs.core.name.call(null,name));
{
var G__5277 = cljs.core.next.call(null,seq__5256_5270__$1);
var G__5278 = null;
var G__5279 = 0;
var G__5280 = 0;
seq__5256_5260 = G__5277;
chunk__5257_5261 = G__5278;
count__5258_5262 = G__5279;
i__5259_5263 = G__5280;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){return cljs.core.reduce.call(null,(function (acc,pair){var vec__5282 = pair.split(/\s*:\s*/);var k = cljs.core.nth.call(null,vec__5282,0,null);var v = cljs.core.nth.call(null,vec__5282,1,null);if(cljs.core.truth_((function (){var and__3528__auto__ = k;if(cljs.core.truth_(and__3528__auto__))
{return v;
} else
{return and__3528__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){var style = domina.attr.call(null,content,"style");if(typeof style === 'string')
{return domina.parse_style_attributes.call(null,style);
} else
{if((style == null))
{return cljs.core.PersistentArrayMap.EMPTY;
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.PersistentArrayMap.EMPTY;
} else
{return null;
}
}
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){var node = domina.single_node.call(null,content);var attrs__$1 = node.attributes;return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__5283_SHARP_){var attr = attrs__$1.item(p1__5283_SHARP_);var value = attr.nodeValue;if((cljs.core.not_EQ_.call(null,null,value)) && (cljs.core.not_EQ_.call(null,"",value)))
{return new cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true, false);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){var seq__5290_5296 = cljs.core.seq.call(null,styles);var chunk__5291_5297 = null;var count__5292_5298 = 0;var i__5293_5299 = 0;while(true){
if((i__5293_5299 < count__5292_5298))
{var vec__5294_5300 = cljs.core._nth.call(null,chunk__5291_5297,i__5293_5299);var name_5301 = cljs.core.nth.call(null,vec__5294_5300,0,null);var value_5302 = cljs.core.nth.call(null,vec__5294_5300,1,null);domina.set_style_BANG_.call(null,content,name_5301,value_5302);
{
var G__5303 = seq__5290_5296;
var G__5304 = chunk__5291_5297;
var G__5305 = count__5292_5298;
var G__5306 = (i__5293_5299 + 1);
seq__5290_5296 = G__5303;
chunk__5291_5297 = G__5304;
count__5292_5298 = G__5305;
i__5293_5299 = G__5306;
continue;
}
} else
{var temp__4126__auto___5307 = cljs.core.seq.call(null,seq__5290_5296);if(temp__4126__auto___5307)
{var seq__5290_5308__$1 = temp__4126__auto___5307;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5290_5308__$1))
{var c__4288__auto___5309 = cljs.core.chunk_first.call(null,seq__5290_5308__$1);{
var G__5310 = cljs.core.chunk_rest.call(null,seq__5290_5308__$1);
var G__5311 = c__4288__auto___5309;
var G__5312 = cljs.core.count.call(null,c__4288__auto___5309);
var G__5313 = 0;
seq__5290_5296 = G__5310;
chunk__5291_5297 = G__5311;
count__5292_5298 = G__5312;
i__5293_5299 = G__5313;
continue;
}
} else
{var vec__5295_5314 = cljs.core.first.call(null,seq__5290_5308__$1);var name_5315 = cljs.core.nth.call(null,vec__5295_5314,0,null);var value_5316 = cljs.core.nth.call(null,vec__5295_5314,1,null);domina.set_style_BANG_.call(null,content,name_5315,value_5316);
{
var G__5317 = cljs.core.next.call(null,seq__5290_5308__$1);
var G__5318 = null;
var G__5319 = 0;
var G__5320 = 0;
seq__5290_5296 = G__5317;
chunk__5291_5297 = G__5318;
count__5292_5298 = G__5319;
i__5293_5299 = G__5320;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified attributes for each node in the content, given a map of names and values. Names may be a string or keyword. Values will be cast to a string, multiple values wil be concatenated.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){var seq__5327_5333 = cljs.core.seq.call(null,attrs);var chunk__5328_5334 = null;var count__5329_5335 = 0;var i__5330_5336 = 0;while(true){
if((i__5330_5336 < count__5329_5335))
{var vec__5331_5337 = cljs.core._nth.call(null,chunk__5328_5334,i__5330_5336);var name_5338 = cljs.core.nth.call(null,vec__5331_5337,0,null);var value_5339 = cljs.core.nth.call(null,vec__5331_5337,1,null);domina.set_attr_BANG_.call(null,content,name_5338,value_5339);
{
var G__5340 = seq__5327_5333;
var G__5341 = chunk__5328_5334;
var G__5342 = count__5329_5335;
var G__5343 = (i__5330_5336 + 1);
seq__5327_5333 = G__5340;
chunk__5328_5334 = G__5341;
count__5329_5335 = G__5342;
i__5330_5336 = G__5343;
continue;
}
} else
{var temp__4126__auto___5344 = cljs.core.seq.call(null,seq__5327_5333);if(temp__4126__auto___5344)
{var seq__5327_5345__$1 = temp__4126__auto___5344;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5327_5345__$1))
{var c__4288__auto___5346 = cljs.core.chunk_first.call(null,seq__5327_5345__$1);{
var G__5347 = cljs.core.chunk_rest.call(null,seq__5327_5345__$1);
var G__5348 = c__4288__auto___5346;
var G__5349 = cljs.core.count.call(null,c__4288__auto___5346);
var G__5350 = 0;
seq__5327_5333 = G__5347;
chunk__5328_5334 = G__5348;
count__5329_5335 = G__5349;
i__5330_5336 = G__5350;
continue;
}
} else
{var vec__5332_5351 = cljs.core.first.call(null,seq__5327_5345__$1);var name_5352 = cljs.core.nth.call(null,vec__5332_5351,0,null);var value_5353 = cljs.core.nth.call(null,vec__5332_5351,1,null);domina.set_attr_BANG_.call(null,content,name_5352,value_5353);
{
var G__5354 = cljs.core.next.call(null,seq__5327_5345__$1);
var G__5355 = null;
var G__5356 = 0;
var G__5357 = 0;
seq__5327_5333 = G__5354;
chunk__5328_5334 = G__5355;
count__5329_5335 = G__5356;
i__5330_5336 = G__5357;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){var seq__5362_5366 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5363_5367 = null;var count__5364_5368 = 0;var i__5365_5369 = 0;while(true){
if((i__5365_5369 < count__5364_5368))
{var node_5370 = cljs.core._nth.call(null,chunk__5363_5367,i__5365_5369);goog.dom.classes.add(node_5370,class$);
{
var G__5371 = seq__5362_5366;
var G__5372 = chunk__5363_5367;
var G__5373 = count__5364_5368;
var G__5374 = (i__5365_5369 + 1);
seq__5362_5366 = G__5371;
chunk__5363_5367 = G__5372;
count__5364_5368 = G__5373;
i__5365_5369 = G__5374;
continue;
}
} else
{var temp__4126__auto___5375 = cljs.core.seq.call(null,seq__5362_5366);if(temp__4126__auto___5375)
{var seq__5362_5376__$1 = temp__4126__auto___5375;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5362_5376__$1))
{var c__4288__auto___5377 = cljs.core.chunk_first.call(null,seq__5362_5376__$1);{
var G__5378 = cljs.core.chunk_rest.call(null,seq__5362_5376__$1);
var G__5379 = c__4288__auto___5377;
var G__5380 = cljs.core.count.call(null,c__4288__auto___5377);
var G__5381 = 0;
seq__5362_5366 = G__5378;
chunk__5363_5367 = G__5379;
count__5364_5368 = G__5380;
i__5365_5369 = G__5381;
continue;
}
} else
{var node_5382 = cljs.core.first.call(null,seq__5362_5376__$1);goog.dom.classes.add(node_5382,class$);
{
var G__5383 = cljs.core.next.call(null,seq__5362_5376__$1);
var G__5384 = null;
var G__5385 = 0;
var G__5386 = 0;
seq__5362_5366 = G__5383;
chunk__5363_5367 = G__5384;
count__5364_5368 = G__5385;
i__5365_5369 = G__5386;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){var seq__5391_5395 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5392_5396 = null;var count__5393_5397 = 0;var i__5394_5398 = 0;while(true){
if((i__5394_5398 < count__5393_5397))
{var node_5399 = cljs.core._nth.call(null,chunk__5392_5396,i__5394_5398);goog.dom.classes.remove(node_5399,class$);
{
var G__5400 = seq__5391_5395;
var G__5401 = chunk__5392_5396;
var G__5402 = count__5393_5397;
var G__5403 = (i__5394_5398 + 1);
seq__5391_5395 = G__5400;
chunk__5392_5396 = G__5401;
count__5393_5397 = G__5402;
i__5394_5398 = G__5403;
continue;
}
} else
{var temp__4126__auto___5404 = cljs.core.seq.call(null,seq__5391_5395);if(temp__4126__auto___5404)
{var seq__5391_5405__$1 = temp__4126__auto___5404;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5391_5405__$1))
{var c__4288__auto___5406 = cljs.core.chunk_first.call(null,seq__5391_5405__$1);{
var G__5407 = cljs.core.chunk_rest.call(null,seq__5391_5405__$1);
var G__5408 = c__4288__auto___5406;
var G__5409 = cljs.core.count.call(null,c__4288__auto___5406);
var G__5410 = 0;
seq__5391_5395 = G__5407;
chunk__5392_5396 = G__5408;
count__5393_5397 = G__5409;
i__5394_5398 = G__5410;
continue;
}
} else
{var node_5411 = cljs.core.first.call(null,seq__5391_5405__$1);goog.dom.classes.remove(node_5411,class$);
{
var G__5412 = cljs.core.next.call(null,seq__5391_5405__$1);
var G__5413 = null;
var G__5414 = 0;
var G__5415 = 0;
seq__5391_5395 = G__5412;
chunk__5392_5396 = G__5413;
count__5393_5397 = G__5414;
i__5394_5398 = G__5415;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Toggles the specified CSS class from each node in the content.
*/
domina.toggle_class_BANG_ = (function toggle_class_BANG_(content,class$){var seq__5420_5424 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5421_5425 = null;var count__5422_5426 = 0;var i__5423_5427 = 0;while(true){
if((i__5423_5427 < count__5422_5426))
{var node_5428 = cljs.core._nth.call(null,chunk__5421_5425,i__5423_5427);goog.dom.classes.toggle(node_5428,class$);
{
var G__5429 = seq__5420_5424;
var G__5430 = chunk__5421_5425;
var G__5431 = count__5422_5426;
var G__5432 = (i__5423_5427 + 1);
seq__5420_5424 = G__5429;
chunk__5421_5425 = G__5430;
count__5422_5426 = G__5431;
i__5423_5427 = G__5432;
continue;
}
} else
{var temp__4126__auto___5433 = cljs.core.seq.call(null,seq__5420_5424);if(temp__4126__auto___5433)
{var seq__5420_5434__$1 = temp__4126__auto___5433;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5420_5434__$1))
{var c__4288__auto___5435 = cljs.core.chunk_first.call(null,seq__5420_5434__$1);{
var G__5436 = cljs.core.chunk_rest.call(null,seq__5420_5434__$1);
var G__5437 = c__4288__auto___5435;
var G__5438 = cljs.core.count.call(null,c__4288__auto___5435);
var G__5439 = 0;
seq__5420_5424 = G__5436;
chunk__5421_5425 = G__5437;
count__5422_5426 = G__5438;
i__5423_5427 = G__5439;
continue;
}
} else
{var node_5440 = cljs.core.first.call(null,seq__5420_5434__$1);goog.dom.classes.toggle(node_5440,class$);
{
var G__5441 = cljs.core.next.call(null,seq__5420_5434__$1);
var G__5442 = null;
var G__5443 = 0;
var G__5444 = 0;
seq__5420_5424 = G__5441;
chunk__5421_5425 = G__5442;
count__5422_5426 = G__5443;
i__5423_5427 = G__5444;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){var classes_5453__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);var seq__5449_5454 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5450_5455 = null;var count__5451_5456 = 0;var i__5452_5457 = 0;while(true){
if((i__5452_5457 < count__5451_5456))
{var node_5458 = cljs.core._nth.call(null,chunk__5450_5455,i__5452_5457);goog.dom.classes.set(node_5458,classes_5453__$1);
{
var G__5459 = seq__5449_5454;
var G__5460 = chunk__5450_5455;
var G__5461 = count__5451_5456;
var G__5462 = (i__5452_5457 + 1);
seq__5449_5454 = G__5459;
chunk__5450_5455 = G__5460;
count__5451_5456 = G__5461;
i__5452_5457 = G__5462;
continue;
}
} else
{var temp__4126__auto___5463 = cljs.core.seq.call(null,seq__5449_5454);if(temp__4126__auto___5463)
{var seq__5449_5464__$1 = temp__4126__auto___5463;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5449_5464__$1))
{var c__4288__auto___5465 = cljs.core.chunk_first.call(null,seq__5449_5464__$1);{
var G__5466 = cljs.core.chunk_rest.call(null,seq__5449_5464__$1);
var G__5467 = c__4288__auto___5465;
var G__5468 = cljs.core.count.call(null,c__4288__auto___5465);
var G__5469 = 0;
seq__5449_5454 = G__5466;
chunk__5450_5455 = G__5467;
count__5451_5456 = G__5468;
i__5452_5457 = G__5469;
continue;
}
} else
{var node_5470 = cljs.core.first.call(null,seq__5449_5464__$1);goog.dom.classes.set(node_5470,classes_5453__$1);
{
var G__5471 = cljs.core.next.call(null,seq__5449_5464__$1);
var G__5472 = null;
var G__5473 = 0;
var G__5474 = 0;
seq__5449_5454 = G__5471;
chunk__5450_5455 = G__5472;
count__5451_5456 = G__5473;
i__5452_5457 = G__5474;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){var seq__5479_5483 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5480_5484 = null;var count__5481_5485 = 0;var i__5482_5486 = 0;while(true){
if((i__5482_5486 < count__5481_5485))
{var node_5487 = cljs.core._nth.call(null,chunk__5480_5484,i__5482_5486);goog.dom.setTextContent(node_5487,value);
{
var G__5488 = seq__5479_5483;
var G__5489 = chunk__5480_5484;
var G__5490 = count__5481_5485;
var G__5491 = (i__5482_5486 + 1);
seq__5479_5483 = G__5488;
chunk__5480_5484 = G__5489;
count__5481_5485 = G__5490;
i__5482_5486 = G__5491;
continue;
}
} else
{var temp__4126__auto___5492 = cljs.core.seq.call(null,seq__5479_5483);if(temp__4126__auto___5492)
{var seq__5479_5493__$1 = temp__4126__auto___5492;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5479_5493__$1))
{var c__4288__auto___5494 = cljs.core.chunk_first.call(null,seq__5479_5493__$1);{
var G__5495 = cljs.core.chunk_rest.call(null,seq__5479_5493__$1);
var G__5496 = c__4288__auto___5494;
var G__5497 = cljs.core.count.call(null,c__4288__auto___5494);
var G__5498 = 0;
seq__5479_5483 = G__5495;
chunk__5480_5484 = G__5496;
count__5481_5485 = G__5497;
i__5482_5486 = G__5498;
continue;
}
} else
{var node_5499 = cljs.core.first.call(null,seq__5479_5493__$1);goog.dom.setTextContent(node_5499,value);
{
var G__5500 = cljs.core.next.call(null,seq__5479_5493__$1);
var G__5501 = null;
var G__5502 = 0;
var G__5503 = 0;
seq__5479_5483 = G__5500;
chunk__5480_5484 = G__5501;
count__5481_5485 = G__5502;
i__5482_5486 = G__5503;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){var seq__5508_5512 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5509_5513 = null;var count__5510_5514 = 0;var i__5511_5515 = 0;while(true){
if((i__5511_5515 < count__5510_5514))
{var node_5516 = cljs.core._nth.call(null,chunk__5509_5513,i__5511_5515);goog.dom.forms.setValue(node_5516,value);
{
var G__5517 = seq__5508_5512;
var G__5518 = chunk__5509_5513;
var G__5519 = count__5510_5514;
var G__5520 = (i__5511_5515 + 1);
seq__5508_5512 = G__5517;
chunk__5509_5513 = G__5518;
count__5510_5514 = G__5519;
i__5511_5515 = G__5520;
continue;
}
} else
{var temp__4126__auto___5521 = cljs.core.seq.call(null,seq__5508_5512);if(temp__4126__auto___5521)
{var seq__5508_5522__$1 = temp__4126__auto___5521;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5508_5522__$1))
{var c__4288__auto___5523 = cljs.core.chunk_first.call(null,seq__5508_5522__$1);{
var G__5524 = cljs.core.chunk_rest.call(null,seq__5508_5522__$1);
var G__5525 = c__4288__auto___5523;
var G__5526 = cljs.core.count.call(null,c__4288__auto___5523);
var G__5527 = 0;
seq__5508_5512 = G__5524;
chunk__5509_5513 = G__5525;
count__5510_5514 = G__5526;
i__5511_5515 = G__5527;
continue;
}
} else
{var node_5528 = cljs.core.first.call(null,seq__5508_5522__$1);goog.dom.forms.setValue(node_5528,value);
{
var G__5529 = cljs.core.next.call(null,seq__5508_5522__$1);
var G__5530 = null;
var G__5531 = 0;
var G__5532 = 0;
seq__5508_5512 = G__5529;
chunk__5509_5513 = G__5530;
count__5510_5514 = G__5531;
i__5511_5515 = G__5532;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);if(cljs.core.truth_((function (){var and__3528__auto__ = allows_inner_html_QMARK_;if(and__3528__auto__)
{var and__3528__auto____$1 = (function (){var or__3540__auto__ = domina.support.leading_whitespace_QMARK_;if(cljs.core.truth_(or__3540__auto__))
{return or__3540__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();if(cljs.core.truth_(and__3528__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3528__auto____$1;
}
} else
{return and__3528__auto__;
}
})()))
{var value_5543 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");try{var seq__5539_5544 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__5540_5545 = null;var count__5541_5546 = 0;var i__5542_5547 = 0;while(true){
if((i__5542_5547 < count__5541_5546))
{var node_5548 = cljs.core._nth.call(null,chunk__5540_5545,i__5542_5547);node_5548.innerHTML = value_5543;
{
var G__5549 = seq__5539_5544;
var G__5550 = chunk__5540_5545;
var G__5551 = count__5541_5546;
var G__5552 = (i__5542_5547 + 1);
seq__5539_5544 = G__5549;
chunk__5540_5545 = G__5550;
count__5541_5546 = G__5551;
i__5542_5547 = G__5552;
continue;
}
} else
{var temp__4126__auto___5553 = cljs.core.seq.call(null,seq__5539_5544);if(temp__4126__auto___5553)
{var seq__5539_5554__$1 = temp__4126__auto___5553;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5539_5554__$1))
{var c__4288__auto___5555 = cljs.core.chunk_first.call(null,seq__5539_5554__$1);{
var G__5556 = cljs.core.chunk_rest.call(null,seq__5539_5554__$1);
var G__5557 = c__4288__auto___5555;
var G__5558 = cljs.core.count.call(null,c__4288__auto___5555);
var G__5559 = 0;
seq__5539_5544 = G__5556;
chunk__5540_5545 = G__5557;
count__5541_5546 = G__5558;
i__5542_5547 = G__5559;
continue;
}
} else
{var node_5560 = cljs.core.first.call(null,seq__5539_5554__$1);node_5560.innerHTML = value_5543;
{
var G__5561 = cljs.core.next.call(null,seq__5539_5554__$1);
var G__5562 = null;
var G__5563 = 0;
var G__5564 = 0;
seq__5539_5544 = G__5561;
chunk__5540_5545 = G__5562;
count__5541_5546 = G__5563;
i__5542_5547 = G__5564;
continue;
}
}
} else
{}
}
break;
}
}catch (e5538){if((e5538 instanceof Error))
{var e_5565 = e5538;domina.replace_children_BANG_.call(null,content,value_5543);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e5538;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){if(typeof inner_content === 'string')
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){var m = domina.single_node.call(null,node).__domina_data;var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);if(cljs.core.truth_((function (){var and__3528__auto__ = bubble;if(cljs.core.truth_(and__3528__auto__))
{return (value == null);
} else
{return and__3528__auto__;
}
})()))
{var temp__4126__auto__ = domina.single_node.call(null,node).parentNode;if(cljs.core.truth_(temp__4126__auto__))
{var parent = temp__4126__auto__;return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){var m = (function (){var or__3540__auto__ = domina.single_node.call(null,node).__domina_data;if(cljs.core.truth_(or__3540__auto__))
{return or__3540__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){var parents = domina.nodes.call(null,parent_content);var children = domina.nodes.call(null,child_content);var first_child = (function (){var frag = document.createDocumentFragment();var seq__5572_5576 = cljs.core.seq.call(null,children);var chunk__5573_5577 = null;var count__5574_5578 = 0;var i__5575_5579 = 0;while(true){
if((i__5575_5579 < count__5574_5578))
{var child_5580 = cljs.core._nth.call(null,chunk__5573_5577,i__5575_5579);frag.appendChild(child_5580);
{
var G__5581 = seq__5572_5576;
var G__5582 = chunk__5573_5577;
var G__5583 = count__5574_5578;
var G__5584 = (i__5575_5579 + 1);
seq__5572_5576 = G__5581;
chunk__5573_5577 = G__5582;
count__5574_5578 = G__5583;
i__5575_5579 = G__5584;
continue;
}
} else
{var temp__4126__auto___5585 = cljs.core.seq.call(null,seq__5572_5576);if(temp__4126__auto___5585)
{var seq__5572_5586__$1 = temp__4126__auto___5585;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5572_5586__$1))
{var c__4288__auto___5587 = cljs.core.chunk_first.call(null,seq__5572_5586__$1);{
var G__5588 = cljs.core.chunk_rest.call(null,seq__5572_5586__$1);
var G__5589 = c__4288__auto___5587;
var G__5590 = cljs.core.count.call(null,c__4288__auto___5587);
var G__5591 = 0;
seq__5572_5576 = G__5588;
chunk__5573_5577 = G__5589;
count__5574_5578 = G__5590;
i__5575_5579 = G__5591;
continue;
}
} else
{var child_5592 = cljs.core.first.call(null,seq__5572_5586__$1);frag.appendChild(child_5592);
{
var G__5593 = cljs.core.next.call(null,seq__5572_5586__$1);
var G__5594 = null;
var G__5595 = 0;
var G__5596 = 0;
seq__5572_5576 = G__5593;
chunk__5573_5577 = G__5594;
count__5574_5578 = G__5595;
i__5575_5579 = G__5596;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){return first_child.cloneNode(true);
});})(parents,children,first_child))
));if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__5566_SHARP_,p2__5567_SHARP_){return f.call(null,p1__5566_SHARP_,p2__5567_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){var and__3528__auto__ = obj;if(cljs.core.truth_(and__3528__auto__))
{var and__3528__auto____$1 = cljs.core.not.call(null,obj.nodeName);if(and__3528__auto____$1)
{return obj.length;
} else
{return and__3528__auto____$1;
}
} else
{return and__3528__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5598 = list_thing;if(G__5598)
{var bit__4190__auto__ = (G__5598.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4190__auto__) || (G__5598.cljs$core$ISeqable$))
{return true;
} else
{if((!G__5598.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5598);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5598);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [list_thing], null));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5599 = content;if(G__5599)
{var bit__4190__auto__ = (G__5599.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4190__auto__) || (G__5599.cljs$core$ISeqable$))
{return true;
} else
{if((!G__5599.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5599);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5599);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [content], null));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){if((content == null))
{return null;
} else
{if((function (){var G__5600 = content;if(G__5600)
{var bit__4190__auto__ = (G__5600.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4190__auto__) || (G__5600.cljs$core$ISeqable$))
{return true;
} else
{if((!G__5600.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5600);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__5600);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if(new cljs.core.Keyword(null,"default","default",2558708147))
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){var nodelist__$1 = this;return domina.lazy_nodelist.call(null,nodelist__$1);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){var nodelist__$1 = this;return nodelist__$1.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){var nodelist__$1 = this;if((nodelist__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist__$1,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){var nodelist__$1 = this;return nodelist__$1.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){var nodelist__$1 = this;return domina.lazy_nodelist.call(null,nodelist__$1);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){var nodelist__$1 = this;return nodelist__$1.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){var nodelist__$1 = this;if((nodelist__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist__$1,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){var nodelist__$1 = this;return nodelist__$1.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){var coll__$1 = this;return domina.lazy_nodelist.call(null,coll__$1);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){var coll__$1 = this;return coll__$1.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){var coll__$1 = this;if((coll__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll__$1,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){var coll__$1 = this;return coll__$1.length;
});
} else
{}
