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
all

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

(defn get-each-one [what params]
  (distinct
   (for [x params]
     (what x))))


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
        [:td "3. (=) Marża I (1-2)"]
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
       (let [t-cost (selection :cost_center_id_center 50211 (rest all))
             n-cost (selection :cost_center_id_center 50212 (rest all))
             s-cost (selection :cost_center_id_center 50213 (rest all))
             market-cost (concat t-cost n-cost s-cost)]
         [:tbody
          [:tr.danger
           [:td "4. (-) Koszty rynku"]
           [:td (sum market-cost)]
           (for [t (range 1 5)]
             [:td (sum (selection :term t market-cost))])
           (for [month (range 1 13)]
             [:td (sum (selection :onmonth month market-cost))])]
          (for [center-id (get-each-one :cost_center_id_center market-cost)]
            (let [one-center (selection :cost_center_id_center center-id market-cost)]
              [:tbody
               [:tr.active
                [:td [:a {:data-toggle "collapse" :href (str "#" center-id)} center-id]]
                [:td (sum one-center)]
                (for [t (range 1 5)]
                  [:td (sum (selection :term t one-center))])
                (for [month (range 1 13)]
                  [:td (sum (selection :onmonth month one-center))])]
               [:tbody {:id center-id :class "collapse out"}
                (for [cost-id (get-each-one :cost_type_id_cost one-center)]
                  (let [one-cost (selection :cost_type_id_cost cost-id one-center)]
                    [:tr
                     [:td  cost-id]
                     [:td  (sum one-cost)]
                     (for [t (range 1 5)]
                       [:td  (sum (selection :term t one-cost))])
                     (for [month (range 1 13)]
                       [:td (sum (selection :onmonth month one-cost))])]))]]))
          (let [margin-2-year (-
                               (sum-margin (first all))
                               (sum market-cost))]
            [:tbody
             [:tr.info
              [:td "5. (=) Marża II (3-4)"]
              [:td margin-2-year]
              (for [t (range 1 5)]
                [:td (-
                      (sum-margin (selection :term t (first all)))
                      (sum (selection :term t market-cost)))])
              (for [month (range 1 13)]
                [:td (-
                      (sum-margin (selection :r_month month (first all)))
                      (sum (selection :onmonth month market-cost)))])]

             (for [market (main-market all)]
               (let [one-center (selection :cost_center_id_center
                                           (cond
                                            (= market (seq "11037")) 50211
                                            (= market (seq "21037")) 50212
                                            (= market (seq "31037")) 50213)
                                           market-cost)]
                 [:tr
                  [:td (cond
                        (= market (seq "11037")) "73011 Rynek Tradycyjny"
                        (= market (seq "21037")) "73012 Rynek Nowoczesny"
                        (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
                  [:td (-
                        (sum-margin (market-selection market (first all)))
                        (sum one-center))]
                  (for [t (range 1 5)]
                    [:td (-
                          (sum-margin (selection :term t (market-selection market (first all))))
                          (sum (selection :term t one-center)))])
                  (for [month (range 1 13)]
                    [:td (-
                          (sum-margin (selection :r_month month (first all)))
                          (sum (selection :onmonth month market-cost)))])]))
             [:tr.info
              [:td "(=) Marża II (%)"]
              [:td (format "%.2f"
                           (* 100.0
                              (/
                               margin-2-year
                               (sum (first all))))) " %"]
              (for [t (range 1 5)]
                [:td (format "%.2f"
                             (* 100.0
                                (/
                                 (-
                                  (sum-margin (selection :term t (first all)))
                                  (sum (selection :term t market-cost)))
                                 (sum (selection :term t (first all)))))) " %"])
              (for [month (range 1 13)]
                [:td (format "%.2f"
                             (* 100.0
                                (/
                                 (-
                                  (sum-margin (selection :r_month month (first all)))
                                  (sum (selection :onmonth month market-cost)))
                                 (sum (selection :r_month month (first all)))))) " %"])]
             (for [market (main-market all)]
               (let [one-center (selection :cost_center_id_center
                                           (cond
                                            (= market (seq "11037")) 50211
                                            (= market (seq "21037")) 50212
                                            (= market (seq "31037")) 50213)
                                           market-cost)]
                 [:tr
                  [:td (cond
                        (= market (seq "11037")) "73011 Rynek Tradycyjny"
                        (= market (seq "21037")) "73012 Rynek Nowoczesny"
                        (= market (seq "31037")) "73013 Sprzedaż Zagraniczna")]
                  [:td (format "%.2f"
                               (* 100.0
                                  (/
                                   (-
                                    (sum-margin (market-selection market (first all)))
                                    (sum one-center))
                                   (sum (market-selection market (first all)))))) " %"]
                  (for [t (range 1 5)]
                    [:td (format "%.2f"
                                 (* 100.0
                                    (/
                                     (-
                                      (sum-margin (selection :term t (market-selection market (first all))))
                                      (sum (selection :term t one-center)))
                                     (sum (selection :term t (market-selection market (first all))))))) " %"])
                  (for [month (range 1 13)]
                    [:td (format "%.2f"
                                 (* 100.0
                                    (/
                                     (-
                                      (sum-margin (selection :r_month month (first all)))
                                      (sum (selection :onmonth month market-cost)))
                                     (sum (selection :r_month month (market-selection market (first all))))))) " %"])]))
             (let [general-center (selection :cost_center_id_center 50214 (rest all))]
               [:tbody
                [:tr.danger
                 [:td "6. (-) Koszty ogólne rynków"]
                 [:td (sum general-center)]
                 (for [t (range 1 5)]
                   [:td (sum (selection :term t general-center))])
                 (for [month (range 1 13)]
                   [:td (sum (selection :onmonth month general-center))])]
                (for [center-id (get-each-one :cost_center_id_center general-center)]
                  (let [one-center (selection :cost_center_id_center center-id general-center)]
                    [:tbody
                     [:tr.active
                      [:td [:a {:data-toggle "collapse" :href (str "#" center-id)} center-id]]
                      [:td (sum one-center)]
                      (for [t (range 1 5)]
                        [:td (sum (selection :term t one-center))])
                      (for [month (range 1 13)]
                        [:td (sum (selection :onmonth month one-center))])]
                     [:tbody {:id center-id :class "collapse out"}
                      (for [cost-id (get-each-one :cost_type_id_cost one-center)]
                        (let [one-cost (selection :cost_type_id_cost cost-id one-center)]
                          [:tr
                           [:td  cost-id]
                           [:td  (sum one-cost)]
                           (for [t (range 1 5)]
                             [:td  (sum (selection :term t one-cost))])
                           (for [month (range 1 13)]
                             [:td (sum (selection :onmonth month one-cost))])]))]]))
                (let [margin-3-year (-
                                     margin-2-year
                                     (sum general-center))]
                  [:tbody
                   [:tr.info
                    [:td "7. (=) Marża III (5-6)"]
                    [:td margin-3-year]
                    (for [t (range 1 5)]
                      [:td (-
                            (-
                             (sum-margin (selection :term t (first all)))
                             (sum (selection :term t market-cost)))
                            (sum (selection :term t general-center)))])
                    (for [month (range 1 13)]
                      [:td (-
                            (-
                             (sum-margin (selection :r_month month (first all)))
                             (sum (selection :onmonth month market-cost)))
                            (sum (selection :onmonth month general-center)))])]
                   [:tr.info
                    [:td "(=) Marża III (%)"]
                    [:td (format "%.2f"
                                 (* 100.0
                                    (/
                                     margin-3-year
                                     (sum (first all))))) " %"]
                    (for [t (range 1 5)]
                      [:td (format "%.2f"
                                   (* 100.0
                                      (/
                                       (-
                                        (-
                                         (sum-margin (selection :term t (first all)))
                                         (sum (selection :term t market-cost)))
                                        (sum (selection :term t general-center)))
                                       (sum (selection :term t (first all)))))) " %"])
                    (for [month (range 1 13)]
                      [:td (format "%.2f"
                                   (* 100.0
                                      (/
                                       (-
                                        (-
                                         (sum-margin (selection :r_month month (first all)))
                                         (sum (selection :onmonth month market-cost)))
                                        (sum (selection :onmonth month general-center)))
                                       (sum (selection :r_month month (first all)))))) " %"])]
                   (let [management-center (apply concat
                                                  (for [x
                                                        (range 55051 55058)]
                                                    (selection :cost_center_id_center x (rest all))))]
                     [:tr.danger
                      [:td "10. (-) Koszty zarządu i administracji"]
                      [:td (sum management-center)]
                      (for [t (range 1 5)]
                        [:td (sum (selection :term t management-center))])
                      (for [month (range 1 13)]
                        [:td (sum (selection :onmonth month management-center))])])])])])



          ])])]))


(let [management-center (apply concat
                               (for [x
                                     (range 55051 55058)]
                                 (selection :cost_center_id_center x (rest all))))]
  (count  management-center))

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
