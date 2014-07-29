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

;PLAN HANDLER

(declare plan-page)
(declare plan-revenue)

(defn plan-handler []
  (let [user (get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (plan-revenue)
        (plan-page)))))


;END OF PLAN HANDLER

; PAGE ELEMENT

(defn center-selection []
  (hc/html
   [:h3 "Wybierz nr centrum rok oraz wersję na jaką chcesz zaplanować"][:br]
   (hf/form-to [:post "/grid"]
               [:div.float-left [:h4 "Centrum"] [:div.radioWrapper
                                                 (for [center (for [centers (dbquery/plan-on-center (get-user))] (:plannedoncenter centers))]
                                                   [:div  [:input {:type "radio" :name "center" :value center :class "radio"} [:span.radio-name center]]])]]
               [:div.float-left [:h4 "Rok"] [:div.radioWrapper
                                             (for [years (range 2013 2016)]
                                               [:div [:input {:type "radio" :name "year" :value years :class "radio"} [:span.radio-name years]]])]]
               [:div.float-left [:h4 "Wersja"] [:div.radioWrapper
                                                (for [version [1 2 3]]
                                                  [:div [:input {:type "radio" :name "version" :value version :class "radio"} [:span.radio-name (dbquery/get-version-name version)]]])]]
               (hf/submit-button {:class "btn"} "select"))))

(defn sendForm
  [center year version]
  (hc/html
   [:h3.padding "Planujesz na cetrum: " [:B center]" " [:b (dbquery/get-center-name center)]  ", na rok " [:b year] ", wersja: "[:b (dbquery/get-version-name version)]]
   (hf/form-to [:post "/create"]
               [:table.table.table-striped
                [:thead
                 [:tr
                  [:th {:colspan 2 :style "border-bottom: none;"}] [:th.middle {:colspan 12 :style "text-align: center; border-bottom: none;"} "Miesiąc"]]
                 [:tr
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]
                  [:th "Rok"] [:th "Kw. I"] [:th "Kw. II"] [:th "Kw. III"] [:th "Kw. IV"]]]
                (into [:tbody]
                      (for [cost (for [costs (dbquery/cost-on-center-grid (get-user) center)] (:id_cost costs))]
                        [:tr
                         [:td cost]
                         [:td (dbquery/get-cost-name cost)]
                         (for [month (range 1 13)]
                           [:td
                            (hf/hidden-field "cost_type_id_cost" cost)
                            (hf/hidden-field "cost_center_id_center" center)
                            (hf/hidden-field "onYear" year)
                            (hf/hidden-field "onMonth" month)
                            (hf/text-field {:placeholder "value"} "value")
                            (hf/hidden-field "verssion" version)])
                         [:td [:b "timer-component"]]
                         [:td "a"]
                         [:td "b"]
                         [:td "c"]
                         [:td "d"]]))
                (hf/submit-button {:class "btn leftMargin"} "send")])))

(defn revenue-select []
  (hc/html
   (hf/form-to [:post "/plan-revenue"]
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

(defn revenueSendForm
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([year version brand-id]
   (hc/html
    [:h3.padding "Planujesz dla marki: "[:b (dbquery/get-brand-name brand-id)]  ", na rok " [:b year] ", wersja: "[:b (dbquery/get-version-name version)]]
    [:br]
    (hf/form-to [:post "revenue-create"]
                (hf/submit-button {:class "btn leftMargin"} "send")
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
                         (hf/hidden-field "id_market_type" market)
                         (hf/hidden-field "id_brands" brand-id)
                         (hf/hidden-field "r_year" year)
                         (hf/hidden-field "r_month" month)
                         (hf/hidden-field "version" version)
                         (hf/text-field {:placeholder "value"} "value")])]
                     [:tr
                      [:td "Marża"]
                      (for [market (dbquery/get-market-id-all)]
                        [:td
                         (hf/text-field {:placeholder "margin"} "profit_margin")])]
                     [:tr
                      [:td "Marża %"]
                      (for [market (dbquery/get-market-id-all)]
                        [:td "suma"])]))]]))))

; END OF PAGE ELEMENT


; PAGE RENDER

(defn plan-revenue []
  (layout/render "grid.html" {:user-id (get-user)
                              :forms (revenueSendForm)
                              :select (revenue-select)}))

(defn plan-revenue-grid [year version brand-name]
  (layout/render "grid.html" {:user-id (get-user)
                              :forms (revenueSendForm year version brand-name)}))

(defn plan-page []
  (layout/render "plan.html" {:user-id (get-user)
                              :select (center-selection)}))

(defn grid-page [center year version]
  (layout/render "grid.html"
                 {:user-id center
                  :forms (sendForm center year version)}))

;END OF PAGE RENDER

(defroutes grid-routes
  (GET "/plan" [] (plan-handler))
  (POST "/grid" [center year version]
        (do (sendForm center year version)
          (grid-page center year version)))
  (POST "/create" [& params]
        (do (dbquery/add-value params)
          (resp/redirect "/plan")))
  (POST "/plan-revenue" [year version brand-name]
        (plan-revenue-grid year version brand-name))
  (POST "/revenue-create" [& params]
        (do (dbquery/add-revenue-plan params)
          (resp/redirect "/plan"))))
