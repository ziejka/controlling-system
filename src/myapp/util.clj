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
  (hc/html (hf/form-to [:post "/create"]
    (hf/text-field {:placeholder "cost_type_id_cost"} "cost_type_id_cost")
    (hf/text-field {:placeholder "cost_center_id_center"} "cost_center_id_center")
    (hf/text-field {:placeholder "onYear"} "onYear")
    (hf/text-field {:placeholder "onMonth"} "onMonth")
    (hf/text-field {:placeholder "value"} "value")
    (hf/submit-button "login"))))


 