(ns myapp.routes.home
  (:use compojure.core)
  (:require [myapp.layout :as layout]
            [myapp.util :as util]))

(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")}))

(defn about-page []
  (layout/render "about.html"))

(defn contact-page []
  (layout/render "contact.html"))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/contact" [] (contact-page)))
