import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyArz8mcHzOrikL78CiOJT5SSUQAECo2cBI",
  authDomain: "catch-of-the-day-aan.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-aan.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp}

export default base