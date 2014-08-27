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

(defn margin-select []
  (hc/html
   (hf/form-to [:post "/margin-grid"]
               [:div.float-left [:h4 "Rok"]
                [:div.radioWrapper
                 (for [years (range 2013 2016)]
                   [:div [:input {:type "radio" :name "year" :value years :class "radio" :required ""}
                          [:span.radio-name years]]])]]
               [:div.float-left [:h4 "Wersja"]
                [:div.radioWrapper
                 (for [version [0 1 2 3]]
                   [:div [:input {:type "radio" :name "version" :value version :class "radio" :required ""}
                          [:span.radio-name
                           (if-let [n (dbquery/get-version-name version)]
                             n
                             "Wykonanie")]]])]]
               (hf/submit-button {:class "btn"} "select"))))

;; GRID ;;

(defn query-chose [year version]
  (if
    (= 0 version)
    (conj
     (dbquery/real-cost year)
     (dbquery/real-revenues year))
    (conj
     (dbquery/plan-cost year version)
     (dbquery/plan-revenues year version))))

(def all (query-chose 2013 1))
all
(rest all)


(defn sell-revenue [params]
 (apply
  +
  (for [rev (filter #(contains? % :id_brands) params)]
    (:value rev))))

(sell-revenue (first all))



(defn grid [year version]
  (hc/html
   [:table.table.table-striped
     [:thead
      [:tr
       [:th "Opis"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"] [:th "I"] [:th "II"]
       [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
    (into
     [:tbody]
     (let [all (query-chose year version)]
       [:tr
        [:td "Przychody ze sprzedaży"]
        [:td (sell-revenue (first all))]]))]))


;; END GRID ;;
(defn margins-page [user]
  (layout/render "margins.html" {:user-id user
                                 :select (margin-select)}))

(defn margin-grid [year version]
  (layout/render "margins.html" {:user-id (guide/get-user)
                                 :grid (grid year version)}))

(defroutes margins-routes
  (GET "/margins" [] (margin-handler (guide/get-user)))
  (POST "/margin-grid" [year version] (margin-grid year version)))
