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
	(j/insert! mysql-db :planned_costs params))

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
