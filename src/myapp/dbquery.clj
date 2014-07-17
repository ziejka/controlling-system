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

(defn cost-on-center []
	(j/query mysql-db
		(s/select * :cost_on_center)))