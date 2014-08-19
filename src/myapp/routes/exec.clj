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
  [center year version where]
  (hc/html
   [:h3.padding "Wykonanie: Cetrum: " [:B center]" " [:b (dbquery/get-center-name center)]  ", rok " [:b year]]
   (hf/form-to [:post where]
               [:table.table.table-striped
                [:thead
                 [:tr
                  [:th {:colspan 2 :style "border-bottom: none;"}] [:th.middle {:colspan 12 :style "text-align: center; border-bottom: none;"} "Miesiąc"]]
                 [:tr
                  [:th "Nr kosztu"] [:th "Nazwa"] [:th "I"] [:th "II"] [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]
                  [:th "Rok"] [:th "Kw. I"] [:th "Kw. II"] [:th "Kw. III"] [:th "Kw. IV"]]]
                (into [:tbody]
                      (for [cost (for [costs (dbquery/cost-on-center-grid center)] (:id_cost costs))]
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


; PAGE RENDER

(defn exec-revenue []
  (layout/render "exec.html" {:user-id (get-user)
                              :forms (grid/revenueSendForm)
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

(defn exec-grid-page [center year version where]
  (layout/render "exec.html" {:user-id (get-user)
                              :forms (execForm center year version where)}))



;END OF PAGE RENDER

(defroutes exec-routes
  (GET "/exec" [] (exec-handler))
  (POST "/exec" [center year version]
        (exec-grid-page center year version "/add-exec"))
  (POST "/select-center" [center] (exec-admin-select center))
  (POST "/add-exec" [& params]
        (do (dbquery/add-realized-cost params)
          (resp/redirect "/exec")))
  (POST "/add-exec-revenue" [year version brand-name]
        (grid/plan-revenue-grid year version brand-name "/exec-rev"))
  (POST "/exec-rev" [& params]
        (do (dbquery/add-revenue-exec params)
          (resp/redirect "/exec"))))
