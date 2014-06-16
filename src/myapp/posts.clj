(ns myapp.posts
  (:refer-clojure :exclude [get])
  (:require [clojure.java.jdbc :as j]
            [clojure.java.jdbc.sql :as s]))

(def mysql-db {:subprotocol "mysql"
               :subname "//localhost:3306/AXdb"
               :user "root"
               :password ""
               :zeroDateTimeBehavior "convertToNull"})
(defn all []
  (j/query mysql-db
    (s/select * :brands)))