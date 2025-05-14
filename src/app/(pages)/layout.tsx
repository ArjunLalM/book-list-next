'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from 'react-toastify';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
     
      if (pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [pathname, router]);

  if (isAuthenticated === null) return null;

  return (
    <Provider store={store}>
      {isAuthenticated && <Header />}
      {children}
       <ToastContainer position="top-right" autoClose={3000} />
      {isAuthenticated && <Footer />}
    </Provider>
  );
}
