import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig';

const AuthContext = createContext();

const useFetchRoleByGmail = (gmail) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gmail) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const q = query(collection(db, 'user'), where('gmail', '==', gmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setRole(userDoc.data().role);
        } else {
          setError('No such document!');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [gmail]);

  return { role, loading, error };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gmail, setGmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setGmail(currentUser.email);
      } else {
        setGmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const { role, loading: roleLoading, error: roleError } = useFetchRoleByGmail(gmail);

  return (
    <AuthContext.Provider value={{ user, role, roleLoading, roleError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};