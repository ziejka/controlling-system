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
var opt_wrapper_6003 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<select multiple='multiple'>","</select>"], null);var table_section_wrapper_6004 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<table>","</table>"], null);var cell_wrapper_6005 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [3,"<table><tbody><tr>","</tr></tbody></table>"], null);domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["td","optgroup","tfoot","tr","area",new cljs.core.Keyword(null,"default","default",2558708147),"option","legend","thead","col","caption","th","colgroup","tbody"],[cell_wrapper_6005,opt_wrapper_6003,table_section_wrapper_6004,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,"<table><tbody>","</tbody></table>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<map>","</map>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,"",""], null),opt_wrapper_6003,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,"<fieldset>","</fieldset>"], null),table_section_wrapper_6004,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], null),table_section_wrapper_6004,cell_wrapper_6005,table_section_wrapper_6004,table_section_wrapper_6004]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));var tbody = (((cljs.core._EQ_.call(null,tag_name,"table")) && (no_tbody_QMARK_))?(function (){var and__3431__auto__ = div.firstChild;if(cljs.core.truth_(and__3431__auto__))
{return div.firstChild.childNodes;
} else
{return and__3431__auto__;
}
})():(((cljs.core._EQ_.call(null,start_wrap,"<table>")) && (no_tbody_QMARK_))?divchildNodes:cljs.core.PersistentVector.EMPTY));var seq__6010 = cljs.core.seq.call(null,tbody);var chunk__6011 = null;var count__6012 = 0;var i__6013 = 0;while(true){
if((i__6013 < count__6012))
{var child = cljs.core._nth.call(null,chunk__6011,i__6013);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,0)))
{child.parentNode.removeChild(child);
} else
{}
{
var G__6014 = seq__6010;
var G__6015 = chunk__6011;
var G__6016 = count__6012;
var G__6017 = (i__6013 + 1);
seq__6010 = G__6014;
chunk__6011 = G__6015;
count__6012 = G__6016;
i__6013 = G__6017;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__6010);if(temp__4126__auto__)
{var seq__6010__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6010__$1))
{var c__4191__auto__ = cljs.core.chunk_first.call(null,seq__6010__$1);{
var G__6018 = cljs.core.chunk_rest.call(null,seq__6010__$1);
var G__6019 = c__4191__auto__;
var G__6020 = cljs.core.count.call(null,c__4191__auto__);
var G__6021 = 0;
seq__6010 = G__6018;
chunk__6011 = G__6019;
count__6012 = G__6020;
i__6013 = G__6021;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__6010__$1);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,0)))
{child.parentNode.removeChild(child);
} else
{}
{
var G__6022 = cljs.core.next.call(null,seq__6010__$1);
var G__6023 = null;
var G__6024 = 0;
var G__6025 = 0;
seq__6010 = G__6022;
chunk__6011 = G__6023;
count__6012 = G__6024;
i__6013 = G__6025;
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
domina.html_to_dom = (function html_to_dom(html){var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();var vec__6027 = cljs.core.get.call(null,domina.wrap_map,tag_name,new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(domina.wrap_map));var depth = cljs.core.nth.call(null,vec__6027,0,null);var start_wrap = cljs.core.nth.call(null,vec__6027,1,null);var end_wrap = cljs.core.nth.call(null,vec__6027,2,null);var div = (function (){var wrapper = (function (){var div = document.createElement("div");div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();var level = depth;while(true){
if((level > 0))
{{
var G__6028 = wrapper.lastChild;
var G__6029 = (level - 1);
wrapper = G__6028;
level = G__6029;
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
if(cljs.core.truth_((function (){var and__3431__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);if(and__3431__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3431__auto__;
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
domina.DomContent = (function (){var obj6031 = {};return obj6031;
})();
domina.nodes = (function nodes(content){if((function (){var and__3431__auto__ = content;if(and__3431__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3431__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__4070__auto__ = (((content == null))?null:content);return (function (){var or__3443__auto__ = (domina.nodes[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (domina.nodes["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){if((function (){var and__3431__auto__ = nodeseq;if(and__3431__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3431__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__4070__auto__ = (((nodeseq == null))?null:nodeseq);return (function (){var or__3443__auto__ = (domina.single_node[goog.typeOf(x__4070__auto__)]);if(or__3443__auto__)
{return or__3443__auto__;
} else
{var or__3443__auto____$1 = (domina.single_node["_"]);if(or__3443__auto____$1)
{return or__3443__auto____$1;
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
var log_debug__delegate = function (mesg){if(cljs.core.truth_((function (){var and__3431__auto__ = domina._STAR_debug_STAR_;if(cljs.core.truth_(and__3431__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3431__auto__;
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
log_debug.cljs$lang$applyTo = (function (arglist__6032){
var mesg = cljs.core.seq(arglist__6032);
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
log.cljs$lang$applyTo = (function (arglist__6033){
var mesg = cljs.core.seq(arglist__6033);
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
common_ancestor.cljs$lang$applyTo = (function (arglist__6034){
var contents = cljs.core.seq(arglist__6034);
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
domina.clone = (function clone(content){return cljs.core.map.call(null,(function (p1__6035_SHARP_){return p1__6035_SHARP_.cloneNode(true);
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
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){domina.apply_with_cloning.call(null,(function (p1__6036_SHARP_,p2__6037_SHARP_){return goog.dom.insertChildAt(p1__6036_SHARP_,p2__6037_SHARP_,idx);
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
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__6039_SHARP_,p2__6038_SHARP_){return goog.dom.insertSiblingBefore(p2__6038_SHARP_,p1__6039_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__6041_SHARP_,p2__6040_SHARP_){return goog.dom.insertSiblingAfter(p2__6040_SHARP_,p1__6041_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){domina.apply_with_cloning.call(null,(function (p1__6043_SHARP_,p2__6042_SHARP_){return goog.dom.replaceNode(p2__6042_SHARP_,p1__6043_SHARP_);
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
var set_style_BANG___delegate = function (content,name,value){var seq__6048_6052 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6049_6053 = null;var count__6050_6054 = 0;var i__6051_6055 = 0;while(true){
if((i__6051_6055 < count__6050_6054))
{var n_6056 = cljs.core._nth.call(null,chunk__6049_6053,i__6051_6055);goog.style.setStyle(n_6056,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__6057 = seq__6048_6052;
var G__6058 = chunk__6049_6053;
var G__6059 = count__6050_6054;
var G__6060 = (i__6051_6055 + 1);
seq__6048_6052 = G__6057;
chunk__6049_6053 = G__6058;
count__6050_6054 = G__6059;
i__6051_6055 = G__6060;
continue;
}
} else
{var temp__4126__auto___6061 = cljs.core.seq.call(null,seq__6048_6052);if(temp__4126__auto___6061)
{var seq__6048_6062__$1 = temp__4126__auto___6061;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6048_6062__$1))
{var c__4191__auto___6063 = cljs.core.chunk_first.call(null,seq__6048_6062__$1);{
var G__6064 = cljs.core.chunk_rest.call(null,seq__6048_6062__$1);
var G__6065 = c__4191__auto___6063;
var G__6066 = cljs.core.count.call(null,c__4191__auto___6063);
var G__6067 = 0;
seq__6048_6052 = G__6064;
chunk__6049_6053 = G__6065;
count__6050_6054 = G__6066;
i__6051_6055 = G__6067;
continue;
}
} else
{var n_6068 = cljs.core.first.call(null,seq__6048_6062__$1);goog.style.setStyle(n_6068,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__6069 = cljs.core.next.call(null,seq__6048_6062__$1);
var G__6070 = null;
var G__6071 = 0;
var G__6072 = 0;
seq__6048_6052 = G__6069;
chunk__6049_6053 = G__6070;
count__6050_6054 = G__6071;
i__6051_6055 = G__6072;
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
set_style_BANG_.cljs$lang$applyTo = (function (arglist__6073){
var content = cljs.core.first(arglist__6073);
arglist__6073 = cljs.core.next(arglist__6073);
var name = cljs.core.first(arglist__6073);
var value = cljs.core.rest(arglist__6073);
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
var set_attr_BANG___delegate = function (content,name,value){var seq__6078_6082 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6079_6083 = null;var count__6080_6084 = 0;var i__6081_6085 = 0;while(true){
if((i__6081_6085 < count__6080_6084))
{var n_6086 = cljs.core._nth.call(null,chunk__6079_6083,i__6081_6085);n_6086.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__6087 = seq__6078_6082;
var G__6088 = chunk__6079_6083;
var G__6089 = count__6080_6084;
var G__6090 = (i__6081_6085 + 1);
seq__6078_6082 = G__6087;
chunk__6079_6083 = G__6088;
count__6080_6084 = G__6089;
i__6081_6085 = G__6090;
continue;
}
} else
{var temp__4126__auto___6091 = cljs.core.seq.call(null,seq__6078_6082);if(temp__4126__auto___6091)
{var seq__6078_6092__$1 = temp__4126__auto___6091;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6078_6092__$1))
{var c__4191__auto___6093 = cljs.core.chunk_first.call(null,seq__6078_6092__$1);{
var G__6094 = cljs.core.chunk_rest.call(null,seq__6078_6092__$1);
var G__6095 = c__4191__auto___6093;
var G__6096 = cljs.core.count.call(null,c__4191__auto___6093);
var G__6097 = 0;
seq__6078_6082 = G__6094;
chunk__6079_6083 = G__6095;
count__6080_6084 = G__6096;
i__6081_6085 = G__6097;
continue;
}
} else
{var n_6098 = cljs.core.first.call(null,seq__6078_6092__$1);n_6098.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__6099 = cljs.core.next.call(null,seq__6078_6092__$1);
var G__6100 = null;
var G__6101 = 0;
var G__6102 = 0;
seq__6078_6082 = G__6099;
chunk__6079_6083 = G__6100;
count__6080_6084 = G__6101;
i__6081_6085 = G__6102;
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
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__6103){
var content = cljs.core.first(arglist__6103);
arglist__6103 = cljs.core.next(arglist__6103);
var name = cljs.core.first(arglist__6103);
var value = cljs.core.rest(arglist__6103);
return set_attr_BANG___delegate(content,name,value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){var seq__6108_6112 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6109_6113 = null;var count__6110_6114 = 0;var i__6111_6115 = 0;while(true){
if((i__6111_6115 < count__6110_6114))
{var n_6116 = cljs.core._nth.call(null,chunk__6109_6113,i__6111_6115);n_6116.removeAttribute(cljs.core.name.call(null,name));
{
var G__6117 = seq__6108_6112;
var G__6118 = chunk__6109_6113;
var G__6119 = count__6110_6114;
var G__6120 = (i__6111_6115 + 1);
seq__6108_6112 = G__6117;
chunk__6109_6113 = G__6118;
count__6110_6114 = G__6119;
i__6111_6115 = G__6120;
continue;
}
} else
{var temp__4126__auto___6121 = cljs.core.seq.call(null,seq__6108_6112);if(temp__4126__auto___6121)
{var seq__6108_6122__$1 = temp__4126__auto___6121;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6108_6122__$1))
{var c__4191__auto___6123 = cljs.core.chunk_first.call(null,seq__6108_6122__$1);{
var G__6124 = cljs.core.chunk_rest.call(null,seq__6108_6122__$1);
var G__6125 = c__4191__auto___6123;
var G__6126 = cljs.core.count.call(null,c__4191__auto___6123);
var G__6127 = 0;
seq__6108_6112 = G__6124;
chunk__6109_6113 = G__6125;
count__6110_6114 = G__6126;
i__6111_6115 = G__6127;
continue;
}
} else
{var n_6128 = cljs.core.first.call(null,seq__6108_6122__$1);n_6128.removeAttribute(cljs.core.name.call(null,name));
{
var G__6129 = cljs.core.next.call(null,seq__6108_6122__$1);
var G__6130 = null;
var G__6131 = 0;
var G__6132 = 0;
seq__6108_6112 = G__6129;
chunk__6109_6113 = G__6130;
count__6110_6114 = G__6131;
i__6111_6115 = G__6132;
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
domina.parse_style_attributes = (function parse_style_attributes(style){return cljs.core.reduce.call(null,(function (acc,pair){var vec__6134 = pair.split(/\s*:\s*/);var k = cljs.core.nth.call(null,vec__6134,0,null);var v = cljs.core.nth.call(null,vec__6134,1,null);if(cljs.core.truth_((function (){var and__3431__auto__ = k;if(cljs.core.truth_(and__3431__auto__))
{return v;
} else
{return and__3431__auto__;
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
domina.attrs = (function attrs(content){var node = domina.single_node.call(null,content);var attrs__$1 = node.attributes;return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__6135_SHARP_){var attr = attrs__$1.item(p1__6135_SHARP_);var value = attr.nodeValue;if((cljs.core.not_EQ_.call(null,null,value)) && (cljs.core.not_EQ_.call(null,"",value)))
{return new cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true, false);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){var seq__6142_6148 = cljs.core.seq.call(null,styles);var chunk__6143_6149 = null;var count__6144_6150 = 0;var i__6145_6151 = 0;while(true){
if((i__6145_6151 < count__6144_6150))
{var vec__6146_6152 = cljs.core._nth.call(null,chunk__6143_6149,i__6145_6151);var name_6153 = cljs.core.nth.call(null,vec__6146_6152,0,null);var value_6154 = cljs.core.nth.call(null,vec__6146_6152,1,null);domina.set_style_BANG_.call(null,content,name_6153,value_6154);
{
var G__6155 = seq__6142_6148;
var G__6156 = chunk__6143_6149;
var G__6157 = count__6144_6150;
var G__6158 = (i__6145_6151 + 1);
seq__6142_6148 = G__6155;
chunk__6143_6149 = G__6156;
count__6144_6150 = G__6157;
i__6145_6151 = G__6158;
continue;
}
} else
{var temp__4126__auto___6159 = cljs.core.seq.call(null,seq__6142_6148);if(temp__4126__auto___6159)
{var seq__6142_6160__$1 = temp__4126__auto___6159;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6142_6160__$1))
{var c__4191__auto___6161 = cljs.core.chunk_first.call(null,seq__6142_6160__$1);{
var G__6162 = cljs.core.chunk_rest.call(null,seq__6142_6160__$1);
var G__6163 = c__4191__auto___6161;
var G__6164 = cljs.core.count.call(null,c__4191__auto___6161);
var G__6165 = 0;
seq__6142_6148 = G__6162;
chunk__6143_6149 = G__6163;
count__6144_6150 = G__6164;
i__6145_6151 = G__6165;
continue;
}
} else
{var vec__6147_6166 = cljs.core.first.call(null,seq__6142_6160__$1);var name_6167 = cljs.core.nth.call(null,vec__6147_6166,0,null);var value_6168 = cljs.core.nth.call(null,vec__6147_6166,1,null);domina.set_style_BANG_.call(null,content,name_6167,value_6168);
{
var G__6169 = cljs.core.next.call(null,seq__6142_6160__$1);
var G__6170 = null;
var G__6171 = 0;
var G__6172 = 0;
seq__6142_6148 = G__6169;
chunk__6143_6149 = G__6170;
count__6144_6150 = G__6171;
i__6145_6151 = G__6172;
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
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){var seq__6179_6185 = cljs.core.seq.call(null,attrs);var chunk__6180_6186 = null;var count__6181_6187 = 0;var i__6182_6188 = 0;while(true){
if((i__6182_6188 < count__6181_6187))
{var vec__6183_6189 = cljs.core._nth.call(null,chunk__6180_6186,i__6182_6188);var name_6190 = cljs.core.nth.call(null,vec__6183_6189,0,null);var value_6191 = cljs.core.nth.call(null,vec__6183_6189,1,null);domina.set_attr_BANG_.call(null,content,name_6190,value_6191);
{
var G__6192 = seq__6179_6185;
var G__6193 = chunk__6180_6186;
var G__6194 = count__6181_6187;
var G__6195 = (i__6182_6188 + 1);
seq__6179_6185 = G__6192;
chunk__6180_6186 = G__6193;
count__6181_6187 = G__6194;
i__6182_6188 = G__6195;
continue;
}
} else
{var temp__4126__auto___6196 = cljs.core.seq.call(null,seq__6179_6185);if(temp__4126__auto___6196)
{var seq__6179_6197__$1 = temp__4126__auto___6196;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6179_6197__$1))
{var c__4191__auto___6198 = cljs.core.chunk_first.call(null,seq__6179_6197__$1);{
var G__6199 = cljs.core.chunk_rest.call(null,seq__6179_6197__$1);
var G__6200 = c__4191__auto___6198;
var G__6201 = cljs.core.count.call(null,c__4191__auto___6198);
var G__6202 = 0;
seq__6179_6185 = G__6199;
chunk__6180_6186 = G__6200;
count__6181_6187 = G__6201;
i__6182_6188 = G__6202;
continue;
}
} else
{var vec__6184_6203 = cljs.core.first.call(null,seq__6179_6197__$1);var name_6204 = cljs.core.nth.call(null,vec__6184_6203,0,null);var value_6205 = cljs.core.nth.call(null,vec__6184_6203,1,null);domina.set_attr_BANG_.call(null,content,name_6204,value_6205);
{
var G__6206 = cljs.core.next.call(null,seq__6179_6197__$1);
var G__6207 = null;
var G__6208 = 0;
var G__6209 = 0;
seq__6179_6185 = G__6206;
chunk__6180_6186 = G__6207;
count__6181_6187 = G__6208;
i__6182_6188 = G__6209;
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
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){var seq__6214_6218 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6215_6219 = null;var count__6216_6220 = 0;var i__6217_6221 = 0;while(true){
if((i__6217_6221 < count__6216_6220))
{var node_6222 = cljs.core._nth.call(null,chunk__6215_6219,i__6217_6221);goog.dom.classes.add(node_6222,class$);
{
var G__6223 = seq__6214_6218;
var G__6224 = chunk__6215_6219;
var G__6225 = count__6216_6220;
var G__6226 = (i__6217_6221 + 1);
seq__6214_6218 = G__6223;
chunk__6215_6219 = G__6224;
count__6216_6220 = G__6225;
i__6217_6221 = G__6226;
continue;
}
} else
{var temp__4126__auto___6227 = cljs.core.seq.call(null,seq__6214_6218);if(temp__4126__auto___6227)
{var seq__6214_6228__$1 = temp__4126__auto___6227;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6214_6228__$1))
{var c__4191__auto___6229 = cljs.core.chunk_first.call(null,seq__6214_6228__$1);{
var G__6230 = cljs.core.chunk_rest.call(null,seq__6214_6228__$1);
var G__6231 = c__4191__auto___6229;
var G__6232 = cljs.core.count.call(null,c__4191__auto___6229);
var G__6233 = 0;
seq__6214_6218 = G__6230;
chunk__6215_6219 = G__6231;
count__6216_6220 = G__6232;
i__6217_6221 = G__6233;
continue;
}
} else
{var node_6234 = cljs.core.first.call(null,seq__6214_6228__$1);goog.dom.classes.add(node_6234,class$);
{
var G__6235 = cljs.core.next.call(null,seq__6214_6228__$1);
var G__6236 = null;
var G__6237 = 0;
var G__6238 = 0;
seq__6214_6218 = G__6235;
chunk__6215_6219 = G__6236;
count__6216_6220 = G__6237;
i__6217_6221 = G__6238;
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
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){var seq__6243_6247 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6244_6248 = null;var count__6245_6249 = 0;var i__6246_6250 = 0;while(true){
if((i__6246_6250 < count__6245_6249))
{var node_6251 = cljs.core._nth.call(null,chunk__6244_6248,i__6246_6250);goog.dom.classes.remove(node_6251,class$);
{
var G__6252 = seq__6243_6247;
var G__6253 = chunk__6244_6248;
var G__6254 = count__6245_6249;
var G__6255 = (i__6246_6250 + 1);
seq__6243_6247 = G__6252;
chunk__6244_6248 = G__6253;
count__6245_6249 = G__6254;
i__6246_6250 = G__6255;
continue;
}
} else
{var temp__4126__auto___6256 = cljs.core.seq.call(null,seq__6243_6247);if(temp__4126__auto___6256)
{var seq__6243_6257__$1 = temp__4126__auto___6256;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6243_6257__$1))
{var c__4191__auto___6258 = cljs.core.chunk_first.call(null,seq__6243_6257__$1);{
var G__6259 = cljs.core.chunk_rest.call(null,seq__6243_6257__$1);
var G__6260 = c__4191__auto___6258;
var G__6261 = cljs.core.count.call(null,c__4191__auto___6258);
var G__6262 = 0;
seq__6243_6247 = G__6259;
chunk__6244_6248 = G__6260;
count__6245_6249 = G__6261;
i__6246_6250 = G__6262;
continue;
}
} else
{var node_6263 = cljs.core.first.call(null,seq__6243_6257__$1);goog.dom.classes.remove(node_6263,class$);
{
var G__6264 = cljs.core.next.call(null,seq__6243_6257__$1);
var G__6265 = null;
var G__6266 = 0;
var G__6267 = 0;
seq__6243_6247 = G__6264;
chunk__6244_6248 = G__6265;
count__6245_6249 = G__6266;
i__6246_6250 = G__6267;
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
domina.toggle_class_BANG_ = (function toggle_class_BANG_(content,class$){var seq__6272_6276 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6273_6277 = null;var count__6274_6278 = 0;var i__6275_6279 = 0;while(true){
if((i__6275_6279 < count__6274_6278))
{var node_6280 = cljs.core._nth.call(null,chunk__6273_6277,i__6275_6279);goog.dom.classes.toggle(node_6280,class$);
{
var G__6281 = seq__6272_6276;
var G__6282 = chunk__6273_6277;
var G__6283 = count__6274_6278;
var G__6284 = (i__6275_6279 + 1);
seq__6272_6276 = G__6281;
chunk__6273_6277 = G__6282;
count__6274_6278 = G__6283;
i__6275_6279 = G__6284;
continue;
}
} else
{var temp__4126__auto___6285 = cljs.core.seq.call(null,seq__6272_6276);if(temp__4126__auto___6285)
{var seq__6272_6286__$1 = temp__4126__auto___6285;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6272_6286__$1))
{var c__4191__auto___6287 = cljs.core.chunk_first.call(null,seq__6272_6286__$1);{
var G__6288 = cljs.core.chunk_rest.call(null,seq__6272_6286__$1);
var G__6289 = c__4191__auto___6287;
var G__6290 = cljs.core.count.call(null,c__4191__auto___6287);
var G__6291 = 0;
seq__6272_6276 = G__6288;
chunk__6273_6277 = G__6289;
count__6274_6278 = G__6290;
i__6275_6279 = G__6291;
continue;
}
} else
{var node_6292 = cljs.core.first.call(null,seq__6272_6286__$1);goog.dom.classes.toggle(node_6292,class$);
{
var G__6293 = cljs.core.next.call(null,seq__6272_6286__$1);
var G__6294 = null;
var G__6295 = 0;
var G__6296 = 0;
seq__6272_6276 = G__6293;
chunk__6273_6277 = G__6294;
count__6274_6278 = G__6295;
i__6275_6279 = G__6296;
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
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){var classes_6305__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);var seq__6301_6306 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6302_6307 = null;var count__6303_6308 = 0;var i__6304_6309 = 0;while(true){
if((i__6304_6309 < count__6303_6308))
{var node_6310 = cljs.core._nth.call(null,chunk__6302_6307,i__6304_6309);goog.dom.classes.set(node_6310,classes_6305__$1);
{
var G__6311 = seq__6301_6306;
var G__6312 = chunk__6302_6307;
var G__6313 = count__6303_6308;
var G__6314 = (i__6304_6309 + 1);
seq__6301_6306 = G__6311;
chunk__6302_6307 = G__6312;
count__6303_6308 = G__6313;
i__6304_6309 = G__6314;
continue;
}
} else
{var temp__4126__auto___6315 = cljs.core.seq.call(null,seq__6301_6306);if(temp__4126__auto___6315)
{var seq__6301_6316__$1 = temp__4126__auto___6315;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6301_6316__$1))
{var c__4191__auto___6317 = cljs.core.chunk_first.call(null,seq__6301_6316__$1);{
var G__6318 = cljs.core.chunk_rest.call(null,seq__6301_6316__$1);
var G__6319 = c__4191__auto___6317;
var G__6320 = cljs.core.count.call(null,c__4191__auto___6317);
var G__6321 = 0;
seq__6301_6306 = G__6318;
chunk__6302_6307 = G__6319;
count__6303_6308 = G__6320;
i__6304_6309 = G__6321;
continue;
}
} else
{var node_6322 = cljs.core.first.call(null,seq__6301_6316__$1);goog.dom.classes.set(node_6322,classes_6305__$1);
{
var G__6323 = cljs.core.next.call(null,seq__6301_6316__$1);
var G__6324 = null;
var G__6325 = 0;
var G__6326 = 0;
seq__6301_6306 = G__6323;
chunk__6302_6307 = G__6324;
count__6303_6308 = G__6325;
i__6304_6309 = G__6326;
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
domina.set_text_BANG_ = (function set_text_BANG_(content,value){var seq__6331_6335 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6332_6336 = null;var count__6333_6337 = 0;var i__6334_6338 = 0;while(true){
if((i__6334_6338 < count__6333_6337))
{var node_6339 = cljs.core._nth.call(null,chunk__6332_6336,i__6334_6338);goog.dom.setTextContent(node_6339,value);
{
var G__6340 = seq__6331_6335;
var G__6341 = chunk__6332_6336;
var G__6342 = count__6333_6337;
var G__6343 = (i__6334_6338 + 1);
seq__6331_6335 = G__6340;
chunk__6332_6336 = G__6341;
count__6333_6337 = G__6342;
i__6334_6338 = G__6343;
continue;
}
} else
{var temp__4126__auto___6344 = cljs.core.seq.call(null,seq__6331_6335);if(temp__4126__auto___6344)
{var seq__6331_6345__$1 = temp__4126__auto___6344;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6331_6345__$1))
{var c__4191__auto___6346 = cljs.core.chunk_first.call(null,seq__6331_6345__$1);{
var G__6347 = cljs.core.chunk_rest.call(null,seq__6331_6345__$1);
var G__6348 = c__4191__auto___6346;
var G__6349 = cljs.core.count.call(null,c__4191__auto___6346);
var G__6350 = 0;
seq__6331_6335 = G__6347;
chunk__6332_6336 = G__6348;
count__6333_6337 = G__6349;
i__6334_6338 = G__6350;
continue;
}
} else
{var node_6351 = cljs.core.first.call(null,seq__6331_6345__$1);goog.dom.setTextContent(node_6351,value);
{
var G__6352 = cljs.core.next.call(null,seq__6331_6345__$1);
var G__6353 = null;
var G__6354 = 0;
var G__6355 = 0;
seq__6331_6335 = G__6352;
chunk__6332_6336 = G__6353;
count__6333_6337 = G__6354;
i__6334_6338 = G__6355;
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
domina.set_value_BANG_ = (function set_value_BANG_(content,value){var seq__6360_6364 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6361_6365 = null;var count__6362_6366 = 0;var i__6363_6367 = 0;while(true){
if((i__6363_6367 < count__6362_6366))
{var node_6368 = cljs.core._nth.call(null,chunk__6361_6365,i__6363_6367);goog.dom.forms.setValue(node_6368,value);
{
var G__6369 = seq__6360_6364;
var G__6370 = chunk__6361_6365;
var G__6371 = count__6362_6366;
var G__6372 = (i__6363_6367 + 1);
seq__6360_6364 = G__6369;
chunk__6361_6365 = G__6370;
count__6362_6366 = G__6371;
i__6363_6367 = G__6372;
continue;
}
} else
{var temp__4126__auto___6373 = cljs.core.seq.call(null,seq__6360_6364);if(temp__4126__auto___6373)
{var seq__6360_6374__$1 = temp__4126__auto___6373;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6360_6374__$1))
{var c__4191__auto___6375 = cljs.core.chunk_first.call(null,seq__6360_6374__$1);{
var G__6376 = cljs.core.chunk_rest.call(null,seq__6360_6374__$1);
var G__6377 = c__4191__auto___6375;
var G__6378 = cljs.core.count.call(null,c__4191__auto___6375);
var G__6379 = 0;
seq__6360_6364 = G__6376;
chunk__6361_6365 = G__6377;
count__6362_6366 = G__6378;
i__6363_6367 = G__6379;
continue;
}
} else
{var node_6380 = cljs.core.first.call(null,seq__6360_6374__$1);goog.dom.forms.setValue(node_6380,value);
{
var G__6381 = cljs.core.next.call(null,seq__6360_6374__$1);
var G__6382 = null;
var G__6383 = 0;
var G__6384 = 0;
seq__6360_6364 = G__6381;
chunk__6361_6365 = G__6382;
count__6362_6366 = G__6383;
i__6363_6367 = G__6384;
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
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);if(cljs.core.truth_((function (){var and__3431__auto__ = allows_inner_html_QMARK_;if(and__3431__auto__)
{var and__3431__auto____$1 = (function (){var or__3443__auto__ = domina.support.leading_whitespace_QMARK_;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();if(cljs.core.truth_(and__3431__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3431__auto____$1;
}
} else
{return and__3431__auto__;
}
})()))
{var value_6395 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");try{var seq__6391_6396 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__6392_6397 = null;var count__6393_6398 = 0;var i__6394_6399 = 0;while(true){
if((i__6394_6399 < count__6393_6398))
{var node_6400 = cljs.core._nth.call(null,chunk__6392_6397,i__6394_6399);node_6400.innerHTML = value_6395;
{
var G__6401 = seq__6391_6396;
var G__6402 = chunk__6392_6397;
var G__6403 = count__6393_6398;
var G__6404 = (i__6394_6399 + 1);
seq__6391_6396 = G__6401;
chunk__6392_6397 = G__6402;
count__6393_6398 = G__6403;
i__6394_6399 = G__6404;
continue;
}
} else
{var temp__4126__auto___6405 = cljs.core.seq.call(null,seq__6391_6396);if(temp__4126__auto___6405)
{var seq__6391_6406__$1 = temp__4126__auto___6405;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6391_6406__$1))
{var c__4191__auto___6407 = cljs.core.chunk_first.call(null,seq__6391_6406__$1);{
var G__6408 = cljs.core.chunk_rest.call(null,seq__6391_6406__$1);
var G__6409 = c__4191__auto___6407;
var G__6410 = cljs.core.count.call(null,c__4191__auto___6407);
var G__6411 = 0;
seq__6391_6396 = G__6408;
chunk__6392_6397 = G__6409;
count__6393_6398 = G__6410;
i__6394_6399 = G__6411;
continue;
}
} else
{var node_6412 = cljs.core.first.call(null,seq__6391_6406__$1);node_6412.innerHTML = value_6395;
{
var G__6413 = cljs.core.next.call(null,seq__6391_6406__$1);
var G__6414 = null;
var G__6415 = 0;
var G__6416 = 0;
seq__6391_6396 = G__6413;
chunk__6392_6397 = G__6414;
count__6393_6398 = G__6415;
i__6394_6399 = G__6416;
continue;
}
}
} else
{}
}
break;
}
}catch (e6390){if((e6390 instanceof Error))
{var e_6417 = e6390;domina.replace_children_BANG_.call(null,content,value_6395);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e6390;
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
var get_data__3 = (function (node,key,bubble){var m = domina.single_node.call(null,node).__domina_data;var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);if(cljs.core.truth_((function (){var and__3431__auto__ = bubble;if(cljs.core.truth_(and__3431__auto__))
{return (value == null);
} else
{return and__3431__auto__;
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
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){var m = (function (){var or__3443__auto__ = domina.single_node.call(null,node).__domina_data;if(cljs.core.truth_(or__3443__auto__))
{return or__3443__auto__;
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
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){var parents = domina.nodes.call(null,parent_content);var children = domina.nodes.call(null,child_content);var first_child = (function (){var frag = document.createDocumentFragment();var seq__6424_6428 = cljs.core.seq.call(null,children);var chunk__6425_6429 = null;var count__6426_6430 = 0;var i__6427_6431 = 0;while(true){
if((i__6427_6431 < count__6426_6430))
{var child_6432 = cljs.core._nth.call(null,chunk__6425_6429,i__6427_6431);frag.appendChild(child_6432);
{
var G__6433 = seq__6424_6428;
var G__6434 = chunk__6425_6429;
var G__6435 = count__6426_6430;
var G__6436 = (i__6427_6431 + 1);
seq__6424_6428 = G__6433;
chunk__6425_6429 = G__6434;
count__6426_6430 = G__6435;
i__6427_6431 = G__6436;
continue;
}
} else
{var temp__4126__auto___6437 = cljs.core.seq.call(null,seq__6424_6428);if(temp__4126__auto___6437)
{var seq__6424_6438__$1 = temp__4126__auto___6437;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6424_6438__$1))
{var c__4191__auto___6439 = cljs.core.chunk_first.call(null,seq__6424_6438__$1);{
var G__6440 = cljs.core.chunk_rest.call(null,seq__6424_6438__$1);
var G__6441 = c__4191__auto___6439;
var G__6442 = cljs.core.count.call(null,c__4191__auto___6439);
var G__6443 = 0;
seq__6424_6428 = G__6440;
chunk__6425_6429 = G__6441;
count__6426_6430 = G__6442;
i__6427_6431 = G__6443;
continue;
}
} else
{var child_6444 = cljs.core.first.call(null,seq__6424_6438__$1);frag.appendChild(child_6444);
{
var G__6445 = cljs.core.next.call(null,seq__6424_6438__$1);
var G__6446 = null;
var G__6447 = 0;
var G__6448 = 0;
seq__6424_6428 = G__6445;
chunk__6425_6429 = G__6446;
count__6426_6430 = G__6447;
i__6427_6431 = G__6448;
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
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__6418_SHARP_,p2__6419_SHARP_){return f.call(null,p1__6418_SHARP_,p2__6419_SHARP_);
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
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){var and__3431__auto__ = obj;if(cljs.core.truth_(and__3431__auto__))
{var and__3431__auto____$1 = cljs.core.not.call(null,obj.nodeName);if(and__3431__auto____$1)
{return obj.length;
} else
{return and__3431__auto____$1;
}
} else
{return and__3431__auto__;
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
{if((function (){var G__6450 = list_thing;if(G__6450)
{var bit__4093__auto__ = (G__6450.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4093__auto__) || (G__6450.cljs$core$ISeqable$))
{return true;
} else
{if((!G__6450.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6450);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6450);
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
{if((function (){var G__6451 = content;if(G__6451)
{var bit__4093__auto__ = (G__6451.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4093__auto__) || (G__6451.cljs$core$ISeqable$))
{return true;
} else
{if((!G__6451.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6451);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6451);
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
{if((function (){var G__6452 = content;if(G__6452)
{var bit__4093__auto__ = (G__6452.cljs$lang$protocol_mask$partition0$ & 8388608);if((bit__4093__auto__) || (G__6452.cljs$core$ISeqable$))
{return true;
} else
{if((!G__6452.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6452);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__6452);
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
