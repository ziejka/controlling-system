(ns myapp.routes.home
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

;AUTH ROUTS

(defn site-hendler []
  (if (empty? (session/get :user)) 
    (resp/redirect "/login")
    (resp/redirect "/home")))

(defn handle-login [id pass]
  (let [user (dbquery/get-user id)]
    (if (and user (= pass (:password user)))
      (do (session/put! :user id) (resp/redirect "/home"))
      (resp/redirect "/"))))

(defn login-page []
  (layout/render "login.html"
    {:forms util/login-form
     :user-id (session/get :user)} ))

(defn logout []
  (session/clear!)
  (resp/redirect "/"))

; END OF AUTH ROUTS



;PAGE'S ELEMENTS

(defn center-selection []
  (hc/html
    (hf/drop-down "dropdwon-list" (for [center (dbquery/cost-on-center (get-user))] (vals center)))))

(defn sendForm []
  (hc/html 
    (hf/form-to [:post "/create"]
    [:table.table.table-striped
    [:thead
      [:tr
        [:th "Nr kosztu"]
        [:th "Nazwa"]
        [:th "I"]
        [:th "II"]
        [:th "III"]
        [:th "IV"]
        [:th "V"]
        [:th "VI"]
        [:th "VII"]
        [:th "VIII"]
        [:th "IX"]
        [:th "X"]
        [:th "XI"]
        [:th "XII"]]]
     (into [:tbody]
      (for [center (for [center (dbquery/cost-on-center (get-user))] (vals center))]
        [:tr
          [:td center]
          [:td "nazwa"]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]
          [:td (hf/text-field {:placeholder "value"} "value")]]))
    (hf/submit-button {:class "btn"} "send")])))

;END OF PAGE'S ELEMENTS



;USERS PAGE ROUTS

(defn home-page []
  (layout/render
    "home.html" {:content (util/md->html "/md/docs.md")
                 :user-id (session/get :user)}))

(defn grid-page []
  (layout/render "grid.html"
    {:content (list (dbquery/all))
     :items (dbquery/all)
     :years (range 2013 2021)
     :forms (sendForm)
     :select (center-selection)}))

(defn contact-page []
  (layout/render "contact.html" {:items (range 10)}))

;END OF USERS PAGE ROUTS





(defroutes home-routes
 ; (context "/user/:user-id" [user-id]
  (GET "/login" []
       (login-page))
  (POST "/login" [username password]
        (handle-login username password))
  (GET "/" [] (site-hendler))
  (GET "/home" [] (home-page))
  (GET "/grid" [] (grid-page))
  (GET "/contact" [] (contact-page))
  (POST "/create" [& params]
    (do (dbquery/add-value params)
      (resp/redirect "/grid")))
  (GET "/logout" []
        (logout)))