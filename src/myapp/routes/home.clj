(ns myapp.routes.home
  (:use compojure.core)
  (:require 
    [myapp.layout :as layout]
    [myapp.util :as util]
    [myapp.dbquery :as dbquery]
    [ring.util.response :as resp]
    [hiccup.core :as hc]
    [noir.session :as session]))


; SESSION

(defn set-user [id]
  (session/put! :user id)
  (session/get :user))

(defn remove-user []
  (session/remove! :user)
  (session/get :user))

(defn set-user-if-nil [id]
  (session/get :user id))


(defn clear-session []
  (session/clear!))

;END sesion!

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
     :forms util/sendForm
     :select util/center-selection}))

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