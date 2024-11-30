import { GoogleLogin } from "@react-oauth/google";
import { useNotificationContext } from "@/context/useNotificationContext";
import { useAuthContext } from "@/context/useAuthContext";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { saveSession, user } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLoginSuccess = async (response) => {
    const googleToken = response.credential;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/users/auth/google-auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();
      console.log('google login response',data);
      
      if (!res.ok) {
        throw new Error(data?.message || "Invalid server response");
      }

      // Save session
      const { access, refresh, user: loggedInUser } = data;
      await saveSession({ access, refresh, user: loggedInUser });
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      showNotification({
        message: "Google login successful!",
        variant: "success",
      });

      // Ensure redirection happens only after the context is updated
      redirectUser(loggedInUser);
    } catch (error) {
      console.error("Google login error:", error);
      showNotification({
        message: "Google login failed. Please try again.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const redirectUser = (loggedInUser) => {
    const redirectLink = searchParams.get("redirectTo");
    if (redirectLink) {
      navigate(redirectLink);
    } else if (loggedInUser?.role === "college_admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    showNotification({
      message: "Google login failed. Please try again.",
      variant: "danger",
    });
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        cookiePolicy="single_host_origin"
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GoogleSignIn;
