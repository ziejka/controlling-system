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

(defn cost-on-center [user]
	(j/query mysql-db
		["select cost_type.id_cost from cost_type inner join cost_on_center on cost_type.id_cost = cost_on_center.id_cost where cost_on_center.planned_by = ?" user]))
	
(defn get-user [id]
	(first (j/query mysql-db
		(s/select * :users (s/where {:UserId id})))))
