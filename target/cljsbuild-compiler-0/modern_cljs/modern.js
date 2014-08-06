// Compiled by ClojureScript 0.0-2173
goog.provide('modern_cljs.modern');
goog.require('cljs.core');
goog.require('domina');
goog.require('domina');
goog.require('domina');
modern_cljs.modern.validate_form = (function validate_form(){var username = domina.by_id.call(null,"username");var password = domina.by_id.call(null,"password");if(((cljs.core.count.call(null,domina.value.call(null,username)) > 0)) && ((cljs.core.count.call(null,domina.value.call(null,password)) > 0)))
{return true;
} else
{alert("Please, complete the form!");
return false;
}
});
modern_cljs.modern.init = (function init(){if(cljs.core.truth_((function (){var and__3431__auto__ = document;if(cljs.core.truth_(and__3431__auto__))
{return document.getElementById;
} else
{return and__3431__auto__;
}
})()))
{var login_form = document.getElementById("loginForm");return login_form.onsubmit = modern_cljs.modern.validate_form;
} else
{return null;
}
});
window.onload = modern_cljs.modern.init;
