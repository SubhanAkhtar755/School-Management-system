import Approuter from "./config/Router";
import User from "./components/contextApi/user";
import { useEffect, useState } from "react";
import { auth, db, doc, getDoc, onAuthStateChanged } from "./config/firebase";
import Aos from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUser(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    });
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <User.Provider value={{user}}>
      <Approuter />
    </User.Provider>
  );
}

export default App;
