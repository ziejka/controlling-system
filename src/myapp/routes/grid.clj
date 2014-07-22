(ns myapp.routes.grid
  (:use compojure.core)
  (:require
    [myapp.layout :as layout]
    [myapp.util :as util]
    [myapp.dbquery :as dbquery]
    [ring.util.response :as resp]
    [hiccup.core :as hc]
    [hiccup.form :as hf]
    [noir.session :as session]))

(defn get-user []
  (session/get :user))

; PAGE ELEMENT

(defn center-selection []
  (hc/html
   (hf/form-to [:post "/grid"]
      [:div.float-left (for [center (for [centers (dbquery/plann-on-center (get-user))] (vals centers))] [:div [:input {:type "radio" :name "center" :value center :class "radio"} [:span center]]])]
      [:div.float-left (for [years (range 2013 2016)] [:div [:input {:type "radio" :name "year" :value years :class "radio"} [:span years]]])]
      [:div.float-left (for [version ["Plan" "Korekta-1" "Korekta-2"]] [:div [:input {:type "radio" :name "version" :value version :class "radio"} [:span version]]])]
   (hf/submit-button "select"))))

(defn sendForm ([] (hc/html [:p "Wybierz centrum kosztowe na jakie chcesz planować"]))
  ([center year version]
   (hc/html
    (hf/form-to [:post "/create"]
    [:table.table.table-striped
    [:thead
      [:tr
        [:th center year version]
        [:th "Nr kosztu"]
        [:th "Nazwa"]
        [:th "I"]
        [:th "II"]
        [:th "III"]
        [:th "IV"]
        [:th "V"]
        [:th "VI"]
        [:th "VII"]
        [:th "VIII"]
        [:th "IX"]
        [:th "X"]
        [:th "XI"]
        [:th "XII"]]]
     (into [:tbody]
      (for [cost (for [costs (dbquery/cost-on-center-grid 50211 #_(get-user))] (vals costs))]
        [:tr
       ;   [:td center year version]
          [:td cost]
          [:td "nazwa"]
          [:td (hf/hidden-field "cost_type_id_cost" cost)
               (hf/hidden-field "cost_center_id_center" year)
               (hf/hidden-field "onYear" year)
               (hf/hidden-field "onMonth" 01)
               (hf/text-field {:placeholder "value"} "value")
               (hf/hidden-field "verssion" version)]

          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]]))
    (hf/submit-button {:class "btn"} "send")]))))


; END OF PAGE ELEMENT


; PAGE RENDER

(defn plan-page []
  (layout/render "plan.html" {
     :select (center-selection)}))

(defn grid-page [center year version]
  (layout/render "grid.html"
    {:content (list (dbquery/all))
     :items (dbquery/all)
    ; :version (versio-selection)
     ;:year (year-selection)
     :forms (sendForm center year version)
     ;:select (center-selection)
     :user-id (session/get :user)}))

;END OF PAGE RENDER

(defroutes grid-routes
  (GET "/plan" [] (plan-page))
  (POST "/grid" [center year version]
        (do (sendForm center year version)
          (grid-page center year version))))
