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
(+ (count (first all)) (count (rest all)))

; ---------------------------------------------------



(defn sum [params]
  (apply
   +
   (for [x params]
     (:value x))))

(defn sum-margin [params]
  (apply
   +
   (for [x params]
     (:profit_margin x))))

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
       [:tr.success
        [:td "1. Przychody ze sprzedaży"]
        [:td (sum (first all))]
        (for [t (range 1 5)]
          [:td (sum (selection :term t (first all)))])
        (for [month (range 1 13)]
          [:td (sum (selection :r_month month (first all)))])]
       (for [market (main-market all)]
         [:tr
          [:td (cond
                (= market (seq "11037")) "73011 Rynek Tradycyjny"
                (= market (seq "21037")) "73012 Rynek Nowoczesny"
                (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
          [:td (sum (market-selection market (first all)))]
          (for [t (range 1 5)]
            [:td (sum (selection :term t (market-selection market (first all))))])
          (for [month (range 1 13)]
            [:td (sum (selection :r_month month (market-selection market (first all))))])])
       [:tr.active
        [:td "2. Koszty sprzedanych produktów"]
        [:td (-
              (sum (first all))
              (sum-margin (first all)))]
        (for [t (range 1 5)]
          [:td (-
                (sum (selection :term t (first all)))
                (sum-margin (selection :term t (first all))))])
        (for [month (range 1 13)]
          [:td (-
                (sum (selection :r_month month (first all)))
                (sum-margin (selection :r_month month (first all))))])]
       (for [market (main-market all)]
         [:tr
          [:td (cond
                (= market (seq "11037")) "73011 Rynek Tradycyjny"
                (= market (seq "21037")) "73012 Rynek Nowoczesny"
                (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
          [:td (-
                (sum (market-selection market (first all)))
                (sum-margin (market-selection market (first all))))]
          (for [t (range 1 5)]
            [:td (-
                  (sum (selection :term t (market-selection market (first all))))
                  (sum-margin (selection :term t (market-selection market (first all)))))])
          (for [month (range 1 13)]
            [:td (-
                  (sum (selection :r_month month (market-selection market (first all))))
                  (sum-margin (selection :r_month month (market-selection market (first all)))))])])
       [:tr.info
        [:td "3 (=) Marża I (1-2)"]
        [:td (sum-margin (first all))]
        (for [t (range 1 5)]
          [:td (sum-margin (selection :term t (first all)))])
        (for [month (range 1 13)]
          [:td (sum-margin (selection :r_month month (first all)))])]
       (for [market (main-market all)]
         [:tr
          [:td (cond
                (= market (seq "11037")) "73011 Rynek Tradycyjny"
                (= market (seq "21037")) "73012 Rynek Nowoczesny"
                (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
          [:td (sum-margin (market-selection market (first all)))]
          (for [t (range 1 5)]
            [:td (sum-margin (selection :term t (market-selection market (first all))))])
          (for [month (range 1 13)]
            [:td (sum-margin (selection :r_month month (market-selection market (first all))))])])
       [:tr.active
        [:td "(=) Marża I (%)"]
        [:td (format "%.2f"
                     (* 100.0
                        (/
                         (sum-margin (first all))
                         (sum (first all))))) " %"]
        (for [t (range 1 5)]
          [:td (format "%.2f"
                       (* 100.0
                          (/
                           (sum-margin (selection :term t (first all)))
                           (sum (selection :term t (first all)))))) " %"])
        (for [month (range 1 13)]
          [:td (format "%.2f"
                       (* 100.0
                          (/
                           (sum-margin (selection :r_month month (first all)))
                           (sum (selection :r_month month (first all)))))) " %"])]
       (for [market (main-market all)]
         [:tr
          [:td (cond
                (= market (seq "11037")) "73011 Rynek Tradycyjny"
                (= market (seq "21037")) "73012 Rynek Nowoczesny"
                (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
          [:td (format "%.2f"
                       (* 100.0
                          (/
                           (sum-margin (market-selection market (first all)))
                           (sum (market-selection market (first all)))))) " %"]
          (for [t (range 1 5)]
            [:td (format "%.2f"
                         (* 100.0
                            (/
                             (sum-margin (selection :term t (market-selection market (first all))))
                             (sum (selection :term t (market-selection market (first all))))))) " %"])
          (for [month (range 1 13)]
            [:td (format "%.2f"
                         (* 100.0
                            (/
                             (sum-margin (selection :r_month month (market-selection market (first all))))
                             (sum (selection :r_month month (market-selection market (first all))))))) " %"])])
       (let [market-cost (selection :cost_center_id_center 50211 (rest all))]
        [:tr.danger
        [:td "4. (-) Koszty rynku"]
        [:td (sum market-cost)]
        (for [t (range 1 5)]
          [:td (sum (selection :term t market-cost))])
        (for [month (range 1 13)]
          [:td (sum (selection :onmonth month market-cost))])]
         )



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
