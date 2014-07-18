(ns myapp.routes.home
  (:use compojure.core)
  (:require 
    [myapp.layout :as layout]
    [myapp.util :as util]
    [myapp.dbquery :as dbquery]
    [ring.util.response :as resp]))


(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")}))

(defn grid-page []
  (layout/render "grid.html"
    {:content (list (dbquery/all))
     :items (dbquery/all)
     :years (range 2013 2021)
     :forms util/sendForm
     :select util/center-selection}))

(defn contact-page []
  (layout/render "contact.html" {:items (range 10)}))

(defn login-page []
  (layout/render "login.html"
    {:forms util/login-form} ))

(defroutes home-routes
 ; (context "/user/:user-id" [user-id]
  (GET "/login" [] (login-page))
  (GET "/" [] (home-page))
  (GET "/grid" [] (grid-page))
  (GET "/contact" [] (contact-page))
  (POST "/create" [& params]
    (do (dbquery/add-value params)
      (resp/redirect "/grid"))));)
