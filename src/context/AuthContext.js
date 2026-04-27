import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session and listen for auth changes
  useEffect(() => {
    // Get the current session on load
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchAndSetUserRole(session.user);
      } else {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen to Supabase auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchAndSetUserRole(session.user);
      } else {
        setUser(null);
        setRole(null);
        setProfileName(null);
        setLoading(false);
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const fetchAndSetUserRole = async (currentUser) => {
    try {
      setUser(currentUser);
      // Fetch the role from the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('role, name')
        .eq('id', currentUser.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile role:', error.message);
        setRole('customer'); // fallback
        setProfileName(null);
      } else if (data) {
        setRole(data.role || 'customer');
        setProfileName(data.name || null);
      }
    } catch (err) {
      console.error('Unexpected error fetching role:', err);
      setRole('customer');
      setProfileName(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    if (data?.user) {
      await fetchAndSetUserRole(data.user);
    }
    return data;
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) {
      setLoading(false);
      throw error;
    }

    // Supabase security feature: if the email already exists, it returns a fake user with an empty identities array.
    if (data?.user && data.user.identities && data.user.identities.length === 0) {
      setLoading(false);
      throw new Error("This email already exists. Please try to login instead.");
    }

    if (data?.user) {
      // Create a profile record so you can see the user in your database's 'profiles' table!
      const { error: profileError } = await supabase.from('profiles').insert([
        { 
          id: data.user.id, 
          email: email,
          name: name,
          role: 'customer' 
        }
      ]);
      
      if (profileError) {
        console.error("Failed to create profile record:", profileError);
      }

      await fetchAndSetUserRole(data.user);
    }
    return data;
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    setProfileName(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, profileName, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
