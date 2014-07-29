(ns modern-cljs.login
  (:require [domina :as d]))

(defn calc []
  (for [tr (d/sel "tr")]
    (let [v (d/by-id "value")]
      (+ v))))

;; define the function to be attached to form submission event
(defn validate-form []
  ;; get email and password element from their ids in the HTML form
   (let [username (d/by-id "username")
        password (d/by-id "password")]
    ;; get email and password value using (value el)
    (if (and (> (count (d/value username)) 0)
             (> (count (d/value password)) 0))
      true
      (do (js/alert "Please, complete the form!")
          false))))


(defn init []
  ;; verify that js/document exists and that it has a getElementById
  ;; property
  (if (and js/document
           (.-getElementById js/document))
    ;; get loginForm by element id and set its onsubmit property to
    ;; our validate-form function
    (let [login-form (.getElementById js/document "loginForm")]
      (set! (.-onsubmit login-form) validate-form))))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)
