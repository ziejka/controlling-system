(ns myapp.dbquery
  (:require
   [clojure.java.jdbc :as j]
   [clojure.java.jdbc.sql :as s]))

(def mysql-db {
               :subprotocol "mysql"
               :subname "//localhost:3306/AXdb"
               :user "root"
               :password ""
               :zeroDateTimeBehavior "convertToNull"})

(defn all []
  (j/query mysql-db
           (s/select * :brands)))

(defn add-value [params]
  (apply j/insert! mysql-db :planned_costs
         (for [v (range (count (:value params)))] (apply conj (for [k (keys params)] {k (nth (k params) v)})))))

(defn cost-on-center-grid [user center]
  (j/query mysql-db
           (s/select :id_cost :cost_on_center
                     (s/where {:planned_by user :plannedOnCenter center}))))

(defn plan-on-center [user]
  (j/query mysql-db
           ["select distinct cc.plannedOnCenter from cost_on_center cc
            where cc.planned_by =  ?" user]))

(defn get-user [id]
  (first (j/query mysql-db
                  (s/select * :users (s/where {:UserId id})))))

(defn get-cost-name [cost]
  (:cost_name (first (j/query mysql-db
                              (s/select :cost_name :cost_type
                                        (s/where {:id_cost cost}))))))

(defn get-version-name [idVersion]
  (:nameversion (first (j/query mysql-db
                                (s/select :nameVersion :version
                                          (s/where {:idVersion idVersion}))))))

(defn get-center-name [idCenter]
  (:center_name  (first (j/query mysql-db
                                 (s/select :center_name :cost_center
                                           (s/where {:id_center idCenter}))))))

(defn get-plan-costs [id-center year version]
  (j/query mysql-db
           (s/select :cost_type_id_cost :planned_costs
                     (s/where {:cost_center_id_center id-center
                               :onYear year
                               :verssion version}))))

(defn get-plan-year [id-center]
  (for
    [y (distinct
        (j/query mysql-db
                 (s/select :onYear :planned_costs
                           (s/where
                            {:cost_center_id_center id-center}))))] (:onyear y)))


(defn get-plan-version [id-center]
  (for
    [v (distinct
        (j/query mysql-db
                 (s/select :verssion :planned_costs
                           (s/where
                            {:cost_center_id_center id-center}))))] (:verssion v)))

(defn get-plan-value
  ([id-center id-cost year version]
   (for
     [v (j/query mysql-db
                 (s/select :value :planned_costs
                           (s/where
                            {:cost_center_id_center id-center
                             :cost_type_id_cost id-cost
                             :onYear year
                             :verssion version})))] (:value v)))
  ([id-center id-cost year month version]
   (:value
    (first
     (j/query mysql-db
              (s/select :value :planned_costs
                        (s/where
                         {:cost_center_id_center id-center
                          :cost_type_id_cost id-cost
                          :onYear year
                          :onMonth month
                          :verssion version})))))))


(defn get-quarter-value
  [id-center id-cost year version term]
  (:value
  (first
     (j/query mysql-db
                ["select sum(p.value) value from planned_costs p
                 where p.cost_center_id_center = ?
                 and p.cost_type_id_cost = ?
                 and p.onYear = ?
                 and p.verssion = ?
                 and p.term =?"
                 id-center id-cost year version term]))))

(:value (first
 (j/query mysql-db
                ["select sum(p.value) value from planned_costs p
                 where p.cost_center_id_center = ?
                 and p.cost_type_id_cost = ?
                 and p.onYear = ?
                 and p.verssion = ?
                 and p.term =?"
                 50333 4010100 2014 2 1])))


(get-quarter-value 50333 4010100 2014 2 1)
