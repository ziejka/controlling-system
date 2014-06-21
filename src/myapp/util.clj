(ns myapp.util
  (:require [noir.io :as io]
            [markdown.core :as md]
            [hiccup.form :as hf]
            [hiccup.core :as hc]))

(defn md->html
  "reads a markdown file from public/md and returns an HTML string"
  [filename]
  (->>
    (io/slurp-resource filename)
    (md/md-to-html-string)))

(def loggin
  (hc/html (hf/form-to [:post "/login"]
    (hf/text-field {:placeholder "screen name"} "id")
    (hf/password-field {:placeholder "password"} "pass")
    (hf/submit-button "login"))))


