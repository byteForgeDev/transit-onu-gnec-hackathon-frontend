// app/_app.jsx

import { AuthProvider } from '../context/AuthContext' // Import AuthProvider

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp