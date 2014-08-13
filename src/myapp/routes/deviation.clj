(ns myapp.routes.deviation
  (:use compojure.core)
  (:require
   [myapp.layout :as layout]
   [myapp.util :as util]
   [myapp.dbquery :as dbquery]
   [myapp.routes.grid :as grid]
   [myapp.routes.guidelines :as guide]
   [ring.util.response :as resp]
   [hiccup.core :as hc]
   [hiccup.form :as hf]
   [noir.session :as session]))

(declare dev-page)
(declare dev-revenue)
(declare dev-admin)

(defn deviation-handler []
  (let [user (grid/get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (dev-revenue user)
        (if (= "55052" user)
          (dev-admin user)
          (dev-page user))))))

;PAGE ELEMENTS

(defn guide-dev-grid
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([user year version]
   (hc/html
    [:br]
    [:h4.leftMargin "Odchylenia dla centrum: "
     [:b user] " "
     [:b (dbquery/get-center-name user)] " na rok "
     [:b year] " wersja: "[:b (dbquery/get-version-name version)]]
    [:br]
    [:table.table.table-striped
     [:thead
      [:tr
       [:th "Nr Kosztu"] [:th "Nazwa"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"]
       [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
     (into
      [:tbody]
      (let [all (dbquery/dev-all user)]
        (let
          [cost (distinct (for [a all] (:id_cost a)))]
          (for [c cost]
            [:tr
             [:td c]
             [:td
              (:cost_name
               (first
                (filter #(= (:id_cost %) c)
                        all)))]
             (for [month (range 1 13)]
               [:td
                (:deviation
                 (first
                  (filter #(and (= (:id_cost %) c) (= (:onmonth %) month))
                          all)))])])))

      #_(for
          [cost-id
           (distinct
            (for
              [row
               (dbquery/cost-on-center-grid user)]
              (:id_cost row)))]
          [:tr
           [:td cost-id]
           [:td (dbquery/get-cost-name cost-id)]
           [:td [:b (dbquery/deviation-val cost-id user year version)]]
           (for [t (range 1 5)]
             [:td (dbquery/dev-quart-val cost-id user year version t)])
           (for [month (range 1 13)]
             [:td [:a {:data-toggle "tooltip" :title (dbquery/deviation-val cost-id user year month version)}
                   (dbquery/deviation-val cost-id user year month version)]])
           ])
      )])))

(guide-dev-grid 50213 2013 1)


;REDER PAGE
(defn dev-page [id-center]
  (layout/render "guidelines.html" {:guide-grid (guide-dev-grid)
                                    :guide-select (guide/guide-select id-center "/dev")
                                    :user-id id-center}))

(defn dev-grid-page [id-center year version]
  (layout/render "guidelines.html" {:guide-grid (guide-dev-grid id-center year version)
                                    :guide-select (guide/guide-select id-center "/dev")
                                    :user-id id-center}))

(defroutes deviation-routes
  (GET "/deviation" [] (deviation-handler))
  (POST "/dev" [year version] (dev-grid-page (grid/get-user) year version)))
