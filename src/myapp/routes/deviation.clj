(ns myapp.routes.deviation
  (:use compojure.core)
  (:require
   [myapp.layout :as layout]
   [myapp.util :as util]
   [myapp.dbquery :as dbquery]
   [myapp.routes.grid :as grid]
   [myapp.routes.guidelines :as guide]
   [myapp.routes.exec :as exec]
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

(defn select-center []
  (hc/html
   (hf/form-to [:post "/dev-center"]
               [:div.float-left [:h4 "Centrum"] [:div.radioWrapper
                                                 (for [center (dbquery/get-list-center)]
                                                   [:div  [:input {:type "radio" :name "center" :value center :class "radio" :required ""}
                                                           [:span.radio-name center " " (dbquery/get-center-name center)]]])]]
               (hf/submit-button {:class "btn"} "select"))))


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
    [:table.table.table-striped.table-bordered
     [:thead
      [:tr
       [:th "Nr Kosztu"] [:th "Nazwa"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"]
       [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
     (into
      [:tbody]
      (let [all (dbquery/dev-all user year version)]
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
             (let [year-cell (filter #(= (:id_cost %) c) all)]
               [:td
                [:a {:data-toggle "tooltip"
                     :data-placement "top"
                     :title ['Planowano (apply + (for [x year-cell] (:plan x))) 'Wykonano (apply + (for [x year-cell] (:realized x)))]}
                 (apply + (for [x year-cell] (:deviation x)))]])
             (for [t (range 1 5)]
               (let [quarter-cell (filter #(= (:term %) t) (filter #(= (:id_cost %) c) all))]
                 [:td
                  [:a {:data-toggle "tooltip"
                       :data-placement "top"
                       :title ['Planowano (apply + (for [x quarter-cell] (:plan x))) 'Wykonano (apply + (for [x quarter-cell] (:realized x)))]}
                   (apply +
                          (for [x quarter-cell]
                            (:deviation x)))]]))
             (for [month (range 1 13)]
               (let [cell (first
                           (filter #(= (:onmonth %) month) (filter #(= (:id_cost %) c)  all)))]
                 [:td [:a
                       {:data-toggle "tooltip"
                        :data-placement "top"
                        :title ['Planowano (:plan cell) 'Wykonano (:realized cell)]}
                       (:deviation cell)]]))]))))])))


(defn dev-grid-r
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([year version brand-id]
   (hc/html
    [:h3.padding "Wytyczne dla marki: "[:b (dbquery/get-brand-name brand-id)]  ", na rok " [:b year] ", wersja: "[:b (dbquery/get-version-name version)]]
    [:br]
    (let [all (dbquery/dev-rev-all brand-id year version)]
      [:table.table.revenue.table-bordered
       [:thead
        [:tr
         [:th "Ms"] [:th "Co?"]
         (for [market (distinct (for [a all] (:m_name a)))]
           [:th market])]]
       [:tbody
        (for [month (range 1 13)]
          (list
           [:tr
            [:td {:rowspan "4"} month]]
           [:tr
            [:td "Sprzedaż"]
            (for [market (distinct (for [a all] (:market a)))]
              [:td (let [cell
                         (first (filter #(= (:month %) month) (filter #(= (:market %) market) all)))]
                     [:a
                      {:data-toggle "tooltip"
                       :data-placement "top"
                       :title ['Planowano (:plan cell) 'Wykonano (:realized cell)]}
                      (:dev_value cell)])])]
           [:tr
            [:td "Marża"]
            (for [market (distinct (for [a all] (:market a)))]
              [:td (let [cell
                         (first (filter #(= (:month %) month) (filter #(= (:market %) market) all)))]
                     [:a
                      {:data-toggle "tooltip"
                       :data-placement "top"
                       :title ['Planowano (:plan_margin cell) 'Wykonano (:realized_margin cell)]}
                      (:dev_margin cell)])])]
           [:tr
            [:td "Marża %"]
            (for [market (distinct (for [a all] (:market a)))]
              [:td
               (let [marginp
                     (:marginp (first (filter #(= (:month %) month) (filter #(= (:market %) market) all))))]
                 (if (nil? marginp) 0 marginp)) " %"])]))]]))))



;REDER PAGE
(defn dev-page [id-center]
  (layout/render "deviation.html" {:guide-grid (guide-dev-grid)
                                   :guide-select (guide/guide-select id-center "/dev")
                                   :user-id id-center}))

(defn dev-grid-page [id-center year version]
  (layout/render "deviation.html" {:guide-grid (guide-dev-grid id-center year version)
                                   :guide-select (guide/guide-select id-center "/dev")
                                   :user-id id-center}))

(defn dev-grid-admin  [id-center year version]
  (layout/render "deviation.html" {:guide-grid (guide-dev-grid id-center year version)
                                   :guide-select (grid/center-selection id-center "/dev-admin")
                                   :user-id id-center}))

(defn dev-admin [user]
  (layout/render "deviation.html" {:user-id user
                                   :guide-select (select-center)}))

(defn dev-admin-select [center]
  (layout/render "deviation.html" {:user-id (grid/get-user)
                                   :guide-grid (guide-dev-grid)
                                   :guide-select (grid/center-selection center "/dev-admin")}))

(defn dev-revenue [user]
  (layout/render "deviation.html" {:user-id user
                                   :guide-grid (dev-grid-r)
                                   :guide-select (guide/guide-revenue-select "/dev-rev")}))

(defn dev-grid-revenue [user year version brand-name]
  (layout/render "deviation.html" {:user-id user
                                   :guide-grid (dev-grid-r year version brand-name)}))

(defroutes deviation-routes
  (GET "/deviation" [] (deviation-handler))
  (POST "/dev" [year version] (dev-grid-page (grid/get-user) year version))
  (POST "/dev-admin" [center year version] (dev-grid-admin center year version))
  (POST "/dev-center" [center] (dev-admin-select center))
  (POST "/dev-rev" [year version brand-name]
        (dev-grid-revenue (guide/get-user) year version brand-name)))
