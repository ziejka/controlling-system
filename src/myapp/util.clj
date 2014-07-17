(ns myapp.util
  (:require [noir.io :as io]
            [markdown.core :as md]
            [hiccup.form :as hf]
            [hiccup.core :as hc]
            [myapp.dbquery :as dbquery]))

(defn md->html
  "reads a markdown file from public/md and returns an HTML string"
  [filename]
  (->>
    (io/slurp-resource filename)
    (md/md-to-html-string)))


                  (defn books []
                    [{:author "Fogus M., Houser C."
                      :title "The Joy Of Clojure"
                      :year "2011"
                      :format "pdf"
                      :id 1}
                     {:author "Fogus M., Houser C."
                      :title "The Joy Of Clojure"
                      :year "2011"
                      :format "epub"
                      :id 2}])


                    (defn- list-books []
                    [:table
                     [:thead
                      [:tr
                       [:th "Author"]
                       [:th "Title"]
                       [:th "Published"]
                       [:th "Format"]]]
                     (into [:tbody]
                           (for [book (books)]
                             [:tr
                              [:td (:author book)]
                              [:td (:title book)]
                              [:td (:year book)]]))])


(def center-selection
  (hc/html
    (hf/drop-down "drop" (for [center (dbquery/cost-on-center)] (vals center)))))

(def sendForm
  (hc/html 
    (hf/form-to [:post "/create"]
    [:table.table.table-striped
    [:thead
      [:tr
        [:th "a"]
        [:th "a"]]]
     (into [:tbody]
      (for [center (for [center (dbquery/cost-on-center)] (vals center))]
        [:tr
          [:td center]
          [:td (hf/text-field {:placeholder "value"} "value")]]))
          

    (hf/submit-button {:class "btn"} "send")])))



         #_( [:td (hf/text-field {:placeholder "cost_type_id_cost"} "cost_type_id_cost")]
          [:td (hf/text-field {:placeholder "cost_type_id_cost"} "cost_type_id_cost")]
          [:td (hf/text-field {:placeholder "cost_center_id_center"} "cost_center_id_center")]
          [:td (hf/text-field {:placeholder "onYear"} "onYear")]
          [:td (hf/text-field {:placeholder "onMonth"} "onMonth")]
          [:td (hf/text-field {:placeholder "value"} "value")])