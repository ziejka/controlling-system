(ns myapp.routes.guidelines
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

(defn guide-grid [user]
  (hc/html
   [:table.table.table-striped
    [:thead
     [:tr
      [:th "Nr Kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
   (into [:tbody]
         (for [cost-id (distinct (for [row (dbquery/get-guidelines 50333)] (:cost_type_id_cost row)))]
           [:tr
            [:td cost-id]
            [:td (dbquery/get-cost-name cost-id)]
            (let [v (:value (dbquery/get-guidelines 50333))]
              [:td v])]))]))





(defn guide-page [id-center]
  (layout/render "guidelines.html" {:guide-grid (guide-grid id-center)
                                    :user-id id-center}))

(defroutes guide-routes
  (GET "/guidelines" [] (guide-page (get-user))))
