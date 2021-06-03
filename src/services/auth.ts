import { Post } from ".";
import { storage } from "./storage";

export const Auth = (setAuth: (a: boolean) => void, history: any): void => {
  const handle = async () => {
    try {
      const res = await Post("/refresh_token", {});
      if (res && res.data) {
        if (res.data.ok) {
          storage.saveToken(res.data.accessToken);
          setAuth(true);
        } else {
          setAuth(false);
          history.push("/login");
        }
      } else {
        setAuth(false);
        history.push("/login");
      }
    } catch (err) {
      setAuth(false);
      history.push("/login");
    }
  };

  handle();
};
