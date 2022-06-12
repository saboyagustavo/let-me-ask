import { createContext, useState, useEffect, ReactNode } from 'react';
import { firebaseApp } from '../services/firebase';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';


type User = {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(): Promise<void>;
  Logout(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        const authenticatedUser = {
          id: uid,
          name: displayName,
          avatar: photoURL,
        };

        setUser(authenticatedUser);
        sessionStorage.setItem('@App:user', JSON.stringify(authenticatedUser));
      }
    });
    
    return () => {
      unsubscribe();
    }
  }, [auth]);

  async function Login() {
    if (user) {
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        const authenticatedUser = {
          id: uid,
          name: displayName,
          avatar: photoURL,
        };

        setUser(authenticatedUser);
        sessionStorage.setItem('@App:user', JSON.stringify(authenticatedUser));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function Logout() {
    setUser(null);
    sessionStorage.clear();
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};