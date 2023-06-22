import { useEffect, useRef, useState } from 'react';

function useGetIdToken() {
  const [idToken, setIdToken] = useState();
  const googleSignInRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      // Handle the response after the user signs in with Google
      console.log('응답', response); // ID token can be accessed using response.credential
      // You can pass the ID token to your backend for further processing
      setIdToken(response.credential);
    };

    const renderButton = () => {
      window.google.accounts.id.initialize({
        client_id:
          '1082895007031-pbcem7t8pavstntj3biuvie6n35in5d9.apps.googleusercontent.com', // Replace with your client ID
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleSignInRef.current!, {
        theme: 'filled_blue',
        size: 'large',
        text: 'Sign in with Google',
      });
    };

    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        if (googleSignInRef.current) {
          renderButton();
        }
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Clean up: remove the dynamically added script element
      const script = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]',
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return [idToken, googleSignInRef];
}
export default useGetIdToken;
