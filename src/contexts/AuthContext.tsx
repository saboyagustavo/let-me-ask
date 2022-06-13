import { createContext, useState, useEffect, ReactNode } from 'react';
import { firebaseApp } from '../services/firebase';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { User } from 'firebase/auth'

type AuthenticatedUser = {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextData {
  signed: boolean;
  user: AuthenticatedUser | undefined;
  Login(): Promise<void>;
  Logout(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = (props: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<AuthenticatedUser | undefined>(undefined);
  const auth = getAuth(firebaseApp);
  
  function authenticate(usr: User | undefined) {
    try {
      if (usr) {
        const { displayName, photoURL, uid } = usr;
        if (!displayName) {
          throw new Error(
            'Informações de nome de usuário da sua conta Google estão inválidas ou incompletas'
          );
        }

        if (!photoURL) {
          throw new Error(
            'Informações da foto de perfil do usuário da sua conta Google estão inválidas ou incompletas'
          );
        }

        const authenticatedUser = {
          id: uid,
          name: displayName,
          avatar: photoURL,
        };

        setLoggedUser(authenticatedUser);
        sessionStorage.setItem('@App:user', JSON.stringify(authenticatedUser));
      } else {
        throw new Error('Desculpe, houve uma falha na autenticação');
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    if (storagedUser) {
      setLoggedUser(JSON.parse(storagedUser));
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(user => {
      authenticate(user!);
    });
    
    return () => {
      unsubscribe();
    }
  }, [auth]);

  async function Login() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    authenticate(user);
  }

  async function Logout() {
    setLoggedUser(undefined);
    sessionStorage.clear();
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(loggedUser), user: loggedUser, Login, Logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};