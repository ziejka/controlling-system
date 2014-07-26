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

(defn guide-select
  [id-user]
  (hc/html
   (hf/form-to {:class "leftMargin"}
               [:post "/guidelines"]
               [:div.float-left
                [:div.radioWrapper
                 (let [y (dbquery/get-plan-year id-user)]
                   (if (= 1 (count y))
                     [:input {:type "radio" :name "year" :value (first y) :class "radio"} [:span.radio-name (first y)]]
                     (for [year y]
                       [:input {:type "radio" :name "year" :value year :class "radio"} [:span.radio-name year]])))]]
               [:div.float-left
                [:div.radioWrapper
                 (let [v (dbquery/get-plan-version id-user)]
                   (if (= 1 (count v))
                     [:input {:type "radio" :name "version" :value (first v) :class "radio"}
                      [:span.radio-name (dbquery/get-version-name (first v))]]
                     (for [version v]
                       [:input {:type "radio" :name "version" :value version :class "radio"}
                        [:span.radio-name (dbquery/get-version-name version)]])))]]
               (hf/submit-button {:class "btn"} "select")   )))


(defn guide-grid
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([user year version]
   (hc/html
    [:br]
    [:h4.leftMargin "Wytyczne dla centrum: "
     [:b user] " "
     [:b (dbquery/get-center-name user)] " na rok "
     [:b year] " wersja: "[:b (dbquery/get-version-name version)]]
    [:br]
    [:table.table.table-striped
     [:thead
      [:tr
       [:th "Nr Kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"]
       [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"]]]
     (into
      [:tbody]
      (for
        [cost-id
         (distinct
          (for
            [row
             (dbquery/get-plan-costs user year version)]
            (:cost_type_id_cost row)))]
        [:tr
         [:td cost-id]
         [:td (dbquery/get-cost-name cost-id)]
         (for [month (range 1 13)]
           [:td (dbquery/get-plan-value user cost-id year month version)])
         [:td [:b (apply + (dbquery/get-plan-value user cost-id year version))]]
         (for [t (range 1 5)]
           [:td (dbquery/get-quarter-value user cost-id year version t)])
         ]))])))


(defn guide-gird-page [id-center year version]
  (layout/render "guidelines.html" {:guide-select (guide-select id-center)
                                    :guide-grid (guide-grid id-center year version)
                                    :user-id id-center}))


(defn guide-page [id-center]
  (layout/render "guidelines.html" {:guide-grid (guide-grid)
                                    :guide-select (guide-select id-center)
                                    :user-id id-center}))

(defroutes guide-routes
  (GET "/guidelines" [] (guide-page (get-user)))
  (POST "/guidelines" [year version] (guide-gird-page (get-user) year version)))
