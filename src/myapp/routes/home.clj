(ns myapp.routes.home
  (:use compojure.core)
  (:require [myapp.layout :as layout]
            [myapp.util :as util]
            [myapp.posts :as posts]
            ;[noir.core :only [defpage]]
            [hiccup.element :only [link-to]]))

(defn- list-brands []
  [:table
    [:thead
      [:tr
        [:th "ID"]
        [:th "Name"]]]
  (into [:tbody]
    for [all (posts/all)]
      [:tr
        [:td (:id_brands all)]
        [:td (:brand_name all)]])])

(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")}))

(defn about-page []
  (layout/render "about.html"
    {:content (list-brands)}))

(defn contact-page []
  (layout/render "contact.html"))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/contact" [] (contact-page)))



