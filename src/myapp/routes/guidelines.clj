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

(declare guide-page)
(declare guide-revenue-page)

(defn get-user []
  (session/get :user))

(defn guidelines-handler []
  (let [user (get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (guide-revenue-page user)
        (guide-page user)))))

; PAGE ELEMENT

(defn guide-revenue-select []
  (hc/html
   (hf/form-to [:post "/guidelines-revenue"]
               [:div.float-left [:h4 "Marka"] [:div.radioWrapper
                                               (for [brand  (dbquery/get-brand-id)]
                                                 [:div [:input {:type "radio" :name "brand-name" :value brand :class "radio"} [:span.radio-name (dbquery/get-brand-name brand)]]])]]
               [:div.float-left [:h4 "Rok"] [:div.radioWrapper
                                             (for [years (range 2013 2016)]
                                               [:div [:input {:type "radio" :name "year" :value years :class "radio"} [:span.radio-name years]]])]]
               [:div.float-left [:h4 "Wersja"] [:div.radioWrapper
                                                (for [version [1 2 3]]
                                                  [:div [:input {:type "radio" :name "version" :value version :class "radio"} [:span.radio-name (dbquery/get-version-name version)]]])]]
               (hf/submit-button {:class "btn"} "select"))))

(defn guide-revenue
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([year version brand-id]
   (hc/html
    [:h3.padding "Wytyczne dla marki: "[:b (dbquery/get-brand-name brand-id)]  ", na rok " [:b year] ", wersja: "[:b (dbquery/get-version-name version)]]
    [:br]
    [:table.table.revenue.table-bordered
     [:thead
      [:tr
       [:th "Ms"] [:th "Co?"]
       (for [market (dbquery/get-market-id-all)]
         [:th (dbquery/get-market-name market)])]]
     [:tbody
      (for [month (range 1 13)]
        (list
         [:tr
          [:td {:rowspan "4"} month]]
         [:tr
          [:td "Sprzedaż"]
          (for [market (dbquery/get-market-id-all)]
            [:td
             (:value (dbquery/get-revenue-value brand-id market year month version))])]
         [:tr
          [:td "Marża"]
          (for [market (dbquery/get-market-id-all)]
            [:td
             (:profit_margin (dbquery/get-revenue-value brand-id market year month version))])]
         [:tr
          [:td "Marża %"]
          (for [market (dbquery/get-market-id-all)]
            [:td
             (dbquery/get-revenue-marginP brand-id market year month version) " %"])]))]])))


(defn guide-select
  [id-user where]
  (hc/html
   (hf/form-to {:class "leftMargin"}
               [:post where]
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
               (hf/submit-button {:class "btn"} "select"))))


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
       [:th "Nr Kosztu"] [:th "Nazwa"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"]
       [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
     (into
      [:tbody]
      (for
        [cost-id
         (distinct
          (for
            [row
             (dbquery/cost-on-center-grid user)]
            (:id_cost row)))]
        [:tr
         [:td cost-id]
         [:td (dbquery/get-cost-name cost-id)]
         [:td [:b (apply + (dbquery/get-plan-value user cost-id year version))]]
         (for [t (range 1 5)]
           [:td (dbquery/get-quarter-value user cost-id year version t)])
         (for [month (range 1 13)]
           [:td (dbquery/get-plan-value user cost-id year month version)])
         ]))])))

; END OF PAGE ELEMENT

;PAGE RENDERS

(defn guide-gird-page [id-center year version]
  (layout/render "guidelines.html" {:guide-select (guide-select id-center "/guidelines")
                                    :guide-grid (guide-grid id-center year version)
                                    :user-id id-center}))


(defn guide-page [id-center]
  (layout/render "guidelines.html" {:guide-grid (guide-grid)
                                    :guide-select (guide-select id-center "/guidelines")
                                    :user-id id-center}))

(defn guide-revenue-page [id-center]
  (layout/render "guidelines.html" {:guide-grid (guide-revenue)
                                    :guide-select (guide-revenue-select)
                                    :user-id id-center}))

(defn guide-gird-revenue [id-center year version brand-name]
  (layout/render "guidelines.html" {:guide-grid (guide-revenue year version brand-name)
                                    :user-id id-center}))

;END OF PAGE RENDERS

(defroutes guide-routes
  (GET "/guidelines" [] (guidelines-handler))
  (POST "/guidelines" [year version] (guide-gird-page (get-user) year version))
  (POST "/guidelines-revenue" [year version brand-name]
        (guide-gird-revenue (get-user) year version brand-name)))
