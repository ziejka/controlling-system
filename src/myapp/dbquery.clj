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
  (first (j/query mysql-db
                  (s/select :cost_name :cost_type
                            (s/where {:id_cost cost})))))

(defn get-version-name [idVersion]
  (:nameversion (first (j/query mysql-db
                                (s/select :nameVersion :version
                                          (s/where {:idVersion idVersion}))))))

(defn get-center-name [idCenter]
  (:center_name  (first (j/query mysql-db
                                 (s/select :center_name :cost_center
                                           (s/where {:id_center idCenter}))))))
