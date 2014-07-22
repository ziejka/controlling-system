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
    (hf/form-to [:post "/login"]
               (hf/label "login" "Login: ")
               (hf/text-field "username")[:br]
               (hf/label "pass" "Password: ")
               (hf/password-field "password")
               (hf/submit-button "Login")))) 