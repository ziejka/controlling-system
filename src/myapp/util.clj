(ns myapp.util
  (:require [noir.io :as io]
            [markdown.core :as md]
            [hiccup.form :as hf]
            [hiccup.core :as hc]
            [myapp.dbquery :as dbquery]
            [noir.session :as session]))

(defn md->html
  "reads a markdown file from public/md and returns an HTML string"
  [filename]
  (->>
   (io/slurp-resource filename)
   (md/md-to-html-string)))

(def login-form
  (hc/html
   (hf/form-to {:id "loginForm"}
               [:post "/login"]
               (hf/label {:class "log"} "login" "Login: ")
               (hf/text-field {:required ""} "username")[:br]
               (hf/label {:class "pass"} "pass" "Password: ")
               (hf/password-field {:required ""} "password")
               (hf/submit-button {:id "submit" :class "btn leftMargin"} "Login"))))
