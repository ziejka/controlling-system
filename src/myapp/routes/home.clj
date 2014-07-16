(ns myapp.routes.home
  (:use compojure.core)
  (:require 
    [myapp.layout :as layout]
    [myapp.util :as util]
    [myapp.posts :as posts]
    [ring.util.response :as resp]))


(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")}))

(defn grid-page []
  (layout/render "grid.html"
    {:content (list (posts/all))
     :items (posts/all)
     :years (range 2013 2021)
     :forms util/sendForm}))

(defn contact-page []
  (layout/render "contact.html" {:items (range 10)}))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/grid" [] (grid-page))
  (GET "/contact" [] (contact-page))
  (POST "/create" [& params]
    (do (posts/add-value params)
      (resp/redirect "/"))))
