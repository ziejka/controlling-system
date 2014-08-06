(ns myapp.routes.deviation
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

(declare dev-page)
(declare dev-revenue)
(declare dev-admin)

(defn deviation-handler []
  (let [user (grid/get-user)]
    (if (empty? user)
      (resp/redirect "/")
      (if (= "730" user)
        (dev-revenue)
        (if (= "55052" user)
          (dev-admin)
          (dev-page))))))

;PAGE ELEMENTS





;REDER PAGE

(defn dev-page [id-center year version brand-name]
  (layout/render "guidelines.html" {;:guide-grid (guide-dev year version brand-name)
                                    :user-id id-center}))

(defroutes deviation-routes
  (GET "/deviation" [] (deviation-handler) ))
