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

; ---------------------------------------------------

(def all (query-chose 2013 1))
all
(rest all)

#_(market-selection "73011" (first all))

(= (reverse (seq "73011")) (rest (reverse (seq "730112"))))

#_(market-selection "73011" (first all))

#_(distinct
 (for
   [m (all-market (first all))]
   (rest
    (reverse (str m)))))

; ---------------------------------------------------



(defn sum [params]
  (apply
   +
   (for [x params]
     (:value x))))

(defn selection [what x params]
  (filter
   #(= x (what %)) params))

(defn value [params]
  (:value (first params)))

(defn market-selection [market params]
  (filter
   #(=
     market
     (rest
      (reverse
       (seq (str (:id_market_type %))))))
   params))

(defn all-market [params]
  (distinct
   (for [x params]
     (:id_market_type x))))

(defn main-market [params]
  (distinct
   (for
     [m (all-market (first all))]
     (rest
      (reverse (str m))))))

; ---------------------------------------------------

(defn grid [year version]
  (hc/html
   [:table.table
    [:thead
     [:tr
      [:th "Opis"] [:th "Rocznie"] [:th "Kwartał I"] [:th "Kwartał II"] [:th "Kwartał IIII"] [:th "Kwartał IV"] [:th "I"] [:th "II"]
      [:th "III"] [:th "IV"] [:th "V"] [:th "VI"] [:th "VII"] [:th "VIII"] [:th "IX"] [:th "X"] [:th "XI"] [:th "XII"]]]
    (let [all (query-chose year version)]
      [:tbody
       [:tr
        [:td "Przychody ze sprzedaży"]
        [:td (sum (first all))]
        (for [t (range 1 5)]
          [:td (sum (selection :term t (first all)))])
        (for [month (range 1 13)]
          [:td (sum (selection :r_month month (first all)))])]
       (for [market (main-market all)]
         [:tr
          [:td "73011 Rynek Tradycyjny "]
          [:td (sum (market-selection market (first all)))]
          (for [t (range 1 5)]
            [:td (sum (selection :term t (market-selection market (first all))))])
          (for [month (range 1 13)]
            [:td (sum (selection :r_month month (market-selection market (first all))))])])


       #_(
       [:tr
        [:td "73011 Rynek Tradycyjny "]
        [:td (sum (market-selection "73011" (first all)))]
        (for [t (range 1 5)]
          [:td (sum (selection :term t (market-selection "73011" (first all))))])
        (for [month (range 1 13)]
          [:td (sum (selection :r_month month (market-selection "73011" (first all))))])]
       [:tr
        [:td "73012 Rynek Nowoczesny "]
        [:td (sum (market-selection "73012" (first all)))]
        (for [t (range 1 5)]
          [:td (sum (selection :term t (market-selection "73012" (first all))))])
        (for [month (range 1 13)]
          [:td (sum (selection :r_month month (market-selection "73012" (first all))))])]
       [:tr
        [:td "73013 Sprzedaż Zagraniczna "]
        [:td (sum (market-selection "73013" (first all)))]
        (for [t (range 1 5)]
          [:td (sum (selection :term t (market-selection "73013" (first all))))])
        (for [month (range 1 13)]
          [:td (sum (selection :r_month month (market-selection "73013" (first all))))])] )
       ])]))


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
