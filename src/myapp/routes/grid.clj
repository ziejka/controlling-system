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
   (hf/form-to {:class "padding"}
               [:post "/grid"]
               [:div.float-left (for [center (for [centers (dbquery/plan-on-center (get-user))] (:plannedoncenter centers))]
                                  [:div [:input {:type "radio" :name "center" :value center :class "radio"} center]])]
               [:div.float-left (for [years (range 2013 2016)]
                                  [:div [:input {:type "radio" :name "year" :value years :class "radio"} years]])]
               [:div.float-left (for [version [1 2 3]]
                                  [:div [:input {:type "radio" :name "version" :value version :class "radio"} version]])]
               (hf/submit-button "select"))))

(defn sendForm
  [center year version]
  (hc/html
   (hf/form-to [:post "/create"]
               [:table.table.table-striped
                [:thead
                 [:tr
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
                (into [:tbody]
                      (for [cost (for [costs (dbquery/cost-on-center-grid (get-user) center)] (:id_cost costs))]
                        [:tr
                         [:td cost]
                         [:td (:cost_name (dbquery/get-cost-name cost))]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 1)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 2)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 3)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 4)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 5)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 6)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 7)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 8)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 9)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 10)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 11)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]
                         [:td (hf/hidden-field "cost_type_id_cost" cost)
                          (hf/hidden-field "cost_center_id_center" center)
                          (hf/hidden-field "onYear" year)
                          (hf/hidden-field "onMonth" 12)
                          (hf/text-field {:placeholder "value"} "value")
                          (hf/hidden-field "verssion" version)]]))
                (hf/submit-button {:class "btn leftMargin"} "send")])))


; END OF PAGE ELEMENT


; PAGE RENDER

(defn plan-page []
  (layout/render "plan.html" {:select (center-selection)}))

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
          (grid-page center year version)))
  (POST "/create" [& params]
        (do (dbquery/add-value params)
          (resp/redirect "/plan"))))
