(ns myapp.handler
  (:require [compojure.core :refer [defroutes]]
            [myapp.routes.home :refer [home-routes]]
            [myapp.middleware :as middleware]
            [noir.util.middleware :refer [app-handler]]
            [compojure.route :as route]
            [taoensso.timbre :as timbre]
            [taoensso.timbre.appenders.rotor :as rotor]
            [selmer.parser :as parser]
            [environ.core :refer [env]]
            [ring.util.response :as resp]
            [noir.session :as session]))

(defroutes app-routes
  ;(GET "/login:id" [id] (set-user id))
  ;(GET "/remove" [] (remove-user))
  ;(GET "/set-if-nil/:id" [id] (set-user-if-nil id))
  ;(GET "/logout" [] (clear-session))
  (route/resources "/")
  (route/not-found "Not Found"))2

(defn init
  "init will be called once when
   app is deployed as a servlet on
   an app server such as Tomcat
   put any initialization code here"
  []
  (timbre/set-config!
    [:appenders :rotor]
    {:min-level :info
     :enabled? true
     :async? false ; should be always false for rotor
     :max-message-per-msecs nil
     :fn rotor/appender-fn})

  (timbre/set-config!
    [:shared-appender-config :rotor]
    {:path "myapp.log" :max-size (* 512 1024) :backlog 10})

  (if (env :dev) (parser/cache-off!))
  (timbre/info "myapp started successfully"))

(defn destroy
  "destroy will be called when your application
   shuts down, put any clean up code here"
  []
  (timbre/info "myapp is shutting down..."))



(def app (session/wrap-noir-session (app-handler
           ;; add your application routes here
           [home-routes app-routes]
           :session-options {:timeout (* 1 60)
                      :timeout-response (resp/redirect "/")}
           ;; add custom middleware here
           :middleware [middleware/wrap-request-logging
                        middleware/template-error-page
                        middleware/log-request]
           ;; add access rules here
           :access-rules []
           ;; serialize/deserialize the following data formats
           ;; available formats:
           ;; :json :json-kw :yaml :yaml-kw :edn :yaml-in-html
           :formats [:json-kw :edn])))
