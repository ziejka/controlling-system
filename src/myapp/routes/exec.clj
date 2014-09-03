(ns myapp.routes.exec
  (:use compojure.core)
  (:require
   [myapp.layout :as layout]
   [myapp.util :as util]
   [myapp.dbquery :as dbquery]
   [myapp.routes.grid :as grid]
   [ring.util.response :as resp]
   [hiccup.core :as hc]
   [hiccup.form :as hf]
   [noir.session :as session]))

(defn get-user []
  (session/get :user))

; PAGE HANDLER

(declare exec-revenue)
(declare exec-admin)
(declare exec-page)

(defn exec-handler []
  (let [user (get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (exec-revenue)
        (if (= "55052" user)
          (exec-admin)
          (exec-page))))))


; END OF PAGE HANDLER

(defn parse-int [s]
   (Integer. (re-find  #"\d+" s )))

; EXEC COSTS

(defn select-my-center []
  (hc/html
   (hf/form-to [:post "/select-center"]
               [:div.float-left [:h4 "Centrum"] [:div.radioWrapper
                                                 (for [center (dbquery/get-list-center)]
                                                   [:div  [:input {:type "radio" :name "center" :value center :class "radio" :required ""}
                                                           [:span.radio-name center " " (dbquery/get-center-name center)]]])]]
               (hf/submit-button {:class "btn"} "select"))))


(defn exec-select
  ([]  (grid/center-selection (get-user) "/exec"))
  ([id-center] (grid/center-selection id-center "/exec")))

(defn execForm
  [center year month version where]
  (hc/html
   [:div.center
    [:h3.margins "Wykonanie: Cetrum: " [:B center]" " [:b (dbquery/get-center-name center)]  ", rok " [:b year]]
   (hf/form-to [:post where]
               [:table.table.table-striped.table-bordered
                [:thead
                 [:tr
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th (nth grid/ms-name (parse-int month))]]]
                (into [:tbody]
                      (for [cost (for [costs (dbquery/cost-on-center-grid center)] (:id_cost costs))]
                        [:tr
                         [:td cost]
                         [:td (dbquery/get-cost-name cost)]
                       [:td
                            (hf/hidden-field "cost_type_id_cost" cost)
                            (hf/hidden-field "cost_center_id_center" center)
                            (hf/hidden-field "onYear" year)
                            (hf/hidden-field "onMonth" month)
                            (hf/text-field {:placeholder "0" :required "" :class "value"} "value")
                            (hf/hidden-field "verssion" version)]]))
                (hf/submit-button {:class "btn margins"} "send")])]))


(defn exec-rev-grid
  ([] (hc/html
       [:h4.padding "Wybeirz rok i wersję" ]))
  ([year month version brand-id where]
   (hc/html
    [:h3.padding "Wybrałeś markę: "[:b (dbquery/get-brand-name brand-id)]  ", rok " [:b year]
     (if (= where "/exec-rev")
       [:span " miesiąc: " (nth grid/ms-name (parse-int month))]
       [:span ", wersja: "[:b (dbquery/get-version-name version)]])]
    [:br]
    (hf/form-to [:post where]
                (hf/submit-button {:class "btn leftMargin margins"} "send")
                [:br]
                [:table.table.revenue.table-bordered
                 [:thead
                  [:tr
                   [:th "Opis"]
                   (for [market (dbquery/get-market-id-all)]
                     [:th (dbquery/get-market-name market)])]]
                 [:tbody
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
                        [:td {:class "myMargin"} "0 %"])]]]))))


; PAGE RENDER

(defn exec-revenue []
  (layout/render "exec.html" {:user-id (get-user)
                              :forms (exec-rev-grid)
                              :select (grid/revenue-select "/add-exec-revenue")
                              }))

(defn exec-page []
  (layout/render "exec.html" {:user-id (get-user)
                              :select (exec-select)}))

(defn exec-admin []
  (layout/render "exec.html" {:user-id (get-user)
                              :select (select-my-center)}))

(defn exec-admin-select [my-center]
  (layout/render "exec.html" {:user-id my-center
                              :select (exec-select my-center)}))

(defn exec-grid-page [center year month version where]
  (layout/render "exec.html" {:user-id (get-user)
                              :forms (execForm center year month version where)}))

(defn revenue-exec-grid [year month version brand-name where]
  (layout/render "exec.html" {:user-id (get-user)
                              :forms (exec-rev-grid year month version brand-name where)}))



;END OF PAGE RENDER

(defroutes exec-routes
  (GET "/exec" [] (exec-handler))
  (POST "/exec" [center year version month]
        (exec-grid-page center year month version "/add-exec"))
  (POST "/select-center" [center] (exec-admin-select center))
  (POST "/add-exec" [& params]
        (do (dbquery/add-realized-cost params)
          (resp/redirect "/exec")))
  (POST "/add-exec-revenue" [year month version brand-name]
        (revenue-exec-grid year month version brand-name "/exec-rev"))
  (POST "/exec-rev" [& params]
        (do (dbquery/add-revenue-exec params)
          (resp/redirect "/exec"))))
