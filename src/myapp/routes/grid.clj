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
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
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
                            (hf/hidden-field "verssion" version)])]))
                (hf/submit-button {:class "btn leftMargin"} "send")])))

(defn revenue-select []
  (hc/html
   (hf/form-to [:post "/plan-revenue"]
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
  ([year version]
   (hc/html
    (hf/form-to [:post "revenue-create"]
                [:table.table.table-striped.revenue.table-bordered
                 [:thead
                  [:tr
                   [:th {:rowspan "2"} "Marka"] [:th.long {:rowspan "2"} "Rynek"] [:th.longb {:rowspan "2"} "Rynek szczegół"]
                   [:th {:colspan "3"} "I"]   [:th {:colspan "3"} "II"]   [:th {:colspan "3"} "III"]
                   [:th {:colspan "3"} "IV"]  [:th {:colspan "3"} "V"]    [:th {:colspan "3"} "VI"]
                   [:th {:colspan "3"} "VII"] [:th {:colspan "3"} "VIII"] [:th {:colspan "3"} "IX"]
                   [:th {:colspan "3"} "X"]   [:th {:colspan "3"} "XI"]   [:th {:colspan "3"} "XII"]]
                  [:tr (for [m (range 12)]
                         (list [:th "Sprzedaż"] [:th "Marża"] [:th "Marża [%]"]))]]
                 [:tbody
                  (for [brand-name (dbquery/get-brand-name)]
                    (list
                     [:tr
                      [:td brand-name]
                      (for [n (range 38)]
                        [:td ])]
                     [:tr
                      [:td {:rowspan "14"}]]
                     [:tr
                      [:td "Rynek Tradycyjy"]
                      (for [n (range 37)]
                        [:td ])]
                     [:tr
                      [:td {:rowspan "3"}]]
                     (for [market-name (dbquery/get-market-name dbquery/get-market-11)]
                       [:tr
                        [:td market-name]
                        (for [month (range 1 13)]
                          (list
                           [:td
                            (hf/hidden-field "id_market_type" market-name)
                            (hf/hidden-field "id_brands" brand-name)
                            (hf/hidden-field "r_year" year)
                            (hf/hidden-field "r_month" month)
                            (hf/hidden-field "version" version)
                            (hf/text-field {:placeholder "value"} "value")]
                           [:td
                            (hf/text-field {:placeholder "profit_margin"} "profit_margin")]
                           [:td "suma"]))])
                     [:tr
                      [:td "Rynek Nowoczesny"]
                      (for [n (range 37)]
                        [:td ])]
                     [:tr
                      [:td {:rowspan "4"}]]
                     (for [market-name (dbquery/get-market-name dbquery/get-market-12)]
                       [:tr
                        [:td market-name]
                        (for [month (range 1 13)]
                          (list
                           [:td
                            (hf/hidden-field "id_market_type" market-name)
                            (hf/hidden-field "id_brands" brand-name)
                            (hf/hidden-field "r_year" year)
                            (hf/hidden-field "r_month" month)
                            (hf/hidden-field "version" version)
                            (hf/text-field {:placeholder "value"} "value")]
                           [:td
                            (hf/text-field {:placeholder "profit_margin"} "profit_margin")]
                           [:td "suma"]))])
                     [:tr
                      [:td "Rynek Specjalistyczny"]
                      (for [n (range 37)]
                        [:td ])]
                     [:tr
                      [:td {:rowspan "3"}]]
                     (for [market-name (dbquery/get-market-name dbquery/get-market-13)]
                       [:tr
                        [:td market-name]
                        (for [month (range 1 13)]
                          (list
                           [:td
                            (hf/hidden-field "id_market_type" market-name)
                            (hf/hidden-field "id_brands" brand-name)
                            (hf/hidden-field "r_year" year)
                            (hf/hidden-field "r_month" month)
                            (hf/hidden-field "version" version)
                            (hf/text-field {:placeholder "value"} "value")]
                           [:td
                            (hf/text-field {:placeholder "profit_margin"} "profit_margin")]
                           [:td "suma"]))])
                     ))
                  ]]))))

(hc/html [:tr (for [m (range 12)]
                (list [:th "Sprzedaż"] [:th "Marża"] [:th "Marża [%]"]))])

(for [brand-name (dbquery/get-brand-name)]
  [:tr
   [:td {:rowspan "7"} brand-name]
   [:td ]])
; END OF PAGE ELEMENT


; PAGE RENDER

(defn plan-revenue []
  (layout/render "grid.html" {:user-id (get-user)
                              :forms (revenueSendForm)
                              :select (revenue-select)}))

(defn plan-revenue-grid [year version]
  (layout/render "grid.html" {:user-id (get-user)
                              :forms (revenueSendForm year version)
                              :select (revenue-select)}))

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
  (POST "/plan-revenue" [year version]
        (plan-revenue-grid year version))
  (POST "/revenue-create" [& params]
        (do (dbquery/add-revenue-plan params)
          (resp/redirect "/plan"))))
