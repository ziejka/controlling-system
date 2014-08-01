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


; PAGE RENDER

(defn exec-revenue []
  (layout/render "grid.html" {:user-id (get-user)
                              ;  :forms (revenueSendForm)
                              ;  :select (revenue-select)
                              }))

(defn exec-page []
  (layout/render "plan.html" {:user-id (get-user)
                              :select (exec-select)}))

(defn exec-admin []
  (layout/render "plan.html" {:user-id (get-user)
                              :select (select-my-center)}))

(defn exec-admin-select [my-center]
  (layout/render "plan.html" {:user-id my-center
                              :select (exec-select my-center)}))



;END OF PAGE RENDER

(defroutes exec-routes
  (GET "/exec" [] (exec-handler))
  (POST "/exec" [center year version]
        (grid/grid-page center year version "/add-exec"))
  (POST "/select-center" [center] (exec-admin-select center))
  (POST "/add-exec" [& params]
        (do (dbquery/add-realized-cost params)
          (resp/redirect "/exec"))))
