import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";

const Auth = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setUser(user);
        setLogin(!!user);
      }
    );
  }, []);

  return (
    <div>
      {login ? (
        <div>
          <h1>Logged in</h1>
        </div>
      ) : (
        <button
          onClick={() => {
            supabase.auth.signInWithOAuth({ provider: "twitch" });
          }}
        >
          Log in with twitch
        </button>
      )}
    </div>
  );
};

export default Auth;
