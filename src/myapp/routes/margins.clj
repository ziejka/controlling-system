(ns myapp.routes.margins
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

(declare margins-page)

(defn margin-handler [user]
  (if (= "55052" user)
    (margins-page user)
    (resp/redirect "/")))


(defn margins-page [user]
  (layout/render "margins.html" {:user-id user
                                 :guide-grid user
                                 }))

(defroutes margins-routes
  (GET "/margins" [] (margin-handler (guide/get-user))))
