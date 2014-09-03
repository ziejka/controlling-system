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
                 {:forms util/login-form} ))
;:user-id (session/get :user)
(defn logout []
  (session/clear!)
  (resp/redirect "/"))

; END OF AUTH ROUTS



;PAGE'S ELEMENTS



;END OF PAGE'S ELEMENTS


;USERS PAGE ROUTS

(defn home-page []
  (layout/render
   "home.html" {:content (util/md->html "/md/docs.md")
                :user-id (session/get :user)}))


;END OF USERS PAGE ROUTS


(defroutes home-routes
  (GET "/login" []
       (login-page))
  (POST "/login" [username password]
        (handle-login username password))
  (GET "/" [] (site-hendler))
  (GET "/home" [] (home-page))
  (GET "/logout" []
       (logout)))
