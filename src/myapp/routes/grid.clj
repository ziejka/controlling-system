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

; PAGE HANDLER

(declare plan-page)
(declare plan-revenue)

(defn plan-handler []
  (let [user (get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (plan-revenue)
        (plan-page)))))

; END OF PAGE HANDLER

; PAGE ELEMENT

; COSTS

(defn center-selection [user where]
  (hc/html
   [:h3 "Wybierz nr centrum rok oraz wersję"][:br]
   (hf/form-to [:post where]
               (if (or (= where "/exec") (= where "/dev-admin"))
                 [:input {:type "hidden" :name "center" :value user}]
                 [:div.float-left [:h4 "Centrum"] [:div.radioWrapper
                                                   (for [center (for [centers (dbquery/plan-on-center user)] (:plannedoncenter centers))]
                                                     [:div  [:input {:type "radio" :name "center" :value center :class "radio" :required ""}
                                                             [:span.radio-name center]]])]])
               [:div.float-left [:h4 "Rok"] [:div.radioWrapper
                                             (for [years (range 2013 2016)]
                                               [:div [:input {:type "radio" :name "year" :value years :class "radio" :required ""}
                                                      [:span.radio-name years]]])]]
               (if (= where "/exec")
                 [:input {:type "hidden" :name "version" :value "1"}]
                 [:div.float-left [:h4 "Wersja"] [:div.radioWrapper
                                                  (for [version [1 2 3]]
                                                    [:div [:input {:type "radio" :name "version" :value version :class "radio" :required ""}
                                                           [:span.radio-name (dbquery/get-version-name version)]]])]])
               (hf/submit-button {:class "btn"} "select"))))

(defn sendForm
  [my-center center year version where]
  (hc/html
   [:h3.padding "Wybrałeś cetrum: " [:B center]" " [:b (dbquery/get-center-name center)]  ", rok " [:b year]
    [:span ", wersja: "[:b (dbquery/get-version-name version)]]]
   (hf/form-to [:post where]
               [:table.table.table-striped
                [:thead
                 [:tr
                  [:th {:colspan 2 :style "border-bottom: none;"}] [:th.middle {:colspan 12 :style "text-align: center; border-bottom: none;"} "Miesiąc"]]
                 [:tr
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]
                  [:th "Rok"] [:th "Kw. I"] [:th "Kw. II"] [:th "Kw. III"] [:th "Kw. IV"]]]
                (into [:tbody]
                      (for [cost (for [costs (dbquery/cost-on-center-grid my-center center)] (:id_cost costs))]
                        [:tr {:class "calc"}
                         [:td cost]
                         [:td (dbquery/get-cost-name cost)]
                         (for [month (range 1 13)]
                           [:td
                            (hf/hidden-field "cost_type_id_cost" cost)
                            (hf/hidden-field "cost_center_id_center" center)
                            (hf/hidden-field "onYear" year)
                            (hf/hidden-field "onMonth" month)
                            (hf/text-field {:placeholder "0" :required "" :class "value"} "value")
                            (hf/hidden-field "verssion" version)])
                         [:td {:class "sum"} "0"]
                         [:td {:class "qu1"} "0"]
                         [:td {:class "qu2"} "0"]
                         [:td {:class "qu3"} "0"]
                         [:td {:class "qu4"} "0"]]))
                (hf/submit-button {:class "btn leftMargin"} "send")])))

; END OF COSTS

; REVENUE

(defn revenue-select [where]
  (hc/html
   (hf/form-to [:post where]
               [:div.float-left [:h4 "Marka"] [:div.radioWrapper
                                               (for [brand  (dbquery/get-brand-id)]
                                                 [:div [:input {:type "radio" :name "brand-name" :value brand :class "radio" :required ""}
                                                        [:span.radio-name (dbquery/get-brand-name brand)]]])]]
               [:div.float-left [:h4 "Rok"] [:div.radioWrapper
                                             (for [years (range 2013 2016)]
                                               [:div [:input {:type "radio" :name "year" :value years :class "radio" :required ""}
                                                      [:span.radio-name years]]])]]
               (if (= where "/add-exec-revenue")
                 [:input {:type "hidden" :name "version" :value "1"}]
                 [:div.float-left [:h4 "Wersja"] [:div.radioWrapper
                                                (for [version [1 2 3]]
                                                  [:div [:input {:type "radio" :name "version" :value version :class "radio" :required ""}
                                                         [:span.radio-name (dbquery/get-version-name version)]]])]])
               (hf/submit-button {:class "btn"} "select"))))

(defn revenueSendForm
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([year version brand-id where]
   (hc/html
    [:h3.padding "Wybrałeś markę: "[:b (dbquery/get-brand-name brand-id)]  ", rok " [:b year]
     (if (= where "/exec-rev")
       [:span ]
       [:span ", wersja: "[:b (dbquery/get-version-name version)]])]
    [:br]
    (hf/form-to [:post where]
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
                     [:tr {:class "sale"}
                      [:td "Sprzedaż"]
                      (for [market (dbquery/get-market-id-all)]
                        [:td
                         (hf/hidden-field "id_market_type" market)
                         (hf/hidden-field "id_brands" brand-id)
                         (hf/hidden-field "r_year" year)
                         (hf/hidden-field "r_month" month)
                         (hf/hidden-field "version" version)
                         (hf/text-field {:placeholder "0" :required "" :class "focusOn"} "value")])]
                     [:tr {:class "margin"}
                      [:td "Marża"]
                      (for [market (dbquery/get-market-id-all)]
                        [:td
                         (hf/text-field {:placeholder "0" :required "" :class "focusOn"} "profit_margin")])]
                     [:tr {:class "marginP"}
                      [:td "Marża %"]
                      (for [market (dbquery/get-market-id-all)]
                        [:td {:class "myMargin"} "0 %"])]))]]))))

; END OF REVENUE

; END OF PAGE ELEMENT


; PAGE RENDER

(defn plan-revenue []
  (layout/render "plan.html" {:user-id (get-user)
                              :forms (revenueSendForm)
                              :select (revenue-select "/plan-revenue")}))

(defn plan-revenue-grid [year version brand-name where]
  (layout/render "plan.html" {:user-id (get-user)
                              :forms (revenueSendForm year version brand-name where)}))

(defn plan-page []
  (layout/render "plan.html" {:user-id (get-user)
                              :select (center-selection (get-user) "/grid")}))

(defn grid-page [center year version where]
  (layout/render "plan.html"
                 {:user-id center
                  :forms (sendForm (get-user) center year version where)}))

;END OF PAGE RENDER

(defroutes grid-routes
  (GET "/plan" [] (plan-handler))
  (POST "/grid" [center year version]
        (grid-page center year version "/create"))
  (POST "/create" [& params]
        (do (dbquery/add-value params)
          (resp/redirect "/plan")))
  (POST "/plan-revenue" [year version brand-name where]
        (plan-revenue-grid year version brand-name "/revenue-create"))
  (POST "/revenue-create" [& params]
        (do (dbquery/add-revenue-plan params)
          (resp/redirect "/plan"))))
