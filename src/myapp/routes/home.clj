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

#_(defn center-selection!!! []
    (hc/html
     (hf/form-to [:post "/grid"]
                 [:span "Planned on center: "]
                 (hf/drop-down "on-center-choice" (for [center (dbquery/plann-on-center (get-user))] (vals center)))
                 [:span "Planned on year: "]
                 (hf/drop-down "year-choice" (range 2013 2023))
                 [:span "Versionn of plan: "]
                 (hf/drop-down "version-choice" ["Plan" "Korekta-1" "Korekta-2"])
                 (hf/submit-button "selecet"))))



#_(defn center-selection []
    (hc/html
     ))


#_(defn center-selection []
    (hc/html
     (hf/form-to [:post "/grid"]
                 [:input {:value 50211 :name "center"}]
                 [:input {:value 2013 :name "year"}]
                 [:input {:value "Plan" :name "version"}]
                 (hf/submit-button "selecet"))))

#_(defn year-selection []
    (hc/html
     [:span "Planned on year: "]
     (hf/drop-down "year-choice" (range 2013 2023))))

#_(defn version-selection []
    (hc/html
     [:span "Versionn of plan: "]
     (hf/drop-down "version-choice" ["Plan" "Korekta-1" "Korekta-2"] 0)))



;END OF PAGE'S ELEMENTS


;USERS PAGE ROUTS

(defn home-page []
  (layout/render
   "home.html" {
                :content (util/md->html "/md/docs.md")
                :user-id (session/get :user)}))

(defn contact-page []
  (layout/render "contact.html" {
                                 :items (range 10)
                                 :user-id (session/get :user)}))

;END OF USERS PAGE ROUTS


(defroutes home-routes
  (GET "/login" []
       (login-page))
  (POST "/login" [username password]
        (handle-login username password))
  (GET "/" [] (site-hendler))
  (GET "/home" [] (home-page))
  (GET "/contact" [] (contact-page))
  (GET "/logout" []
       (logout)))
