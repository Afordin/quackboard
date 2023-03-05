import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        <button
          class="bg-[#772ce8] text-white button"
          aria-label="Cerrar sesión"
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          <Image
            alt="Twitch profile picture"
            src={user.user_metadata.picture}
            height="32"
            width="32"
            class="rounded-full inline-block"
          />{" "}
          {user.user_metadata.name} x
        </button>
      ) : (
        <button
          class="bg-[#772ce8] text-white button"
          onClick={() => {
            supabase.auth.signInWithOAuth({ provider: "twitch" });
            // console.log(data);
            // // supabase.from("users").insert(
            // //   {

            // //   }
            // // )
          }}
        >
          Iniciar sesión con Twitch
        </button>
      )}
    </div>
  );
};

export default Auth;
