import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import BookDetail from "./pages/BookDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./auth/ProtectedRoute";
import AddBookForm from "./pages/AddBookForm";
import EditBookForm from "./pages/EditBookForm";
import SearchBooks from "./pages/SearchBooks"; 

// Wrapper to use auth inside Routes
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Only show Home if user is logged in */}
        <Route
  path="/"
  element={
    user ? (
      user.role.toUpperCase() === 'ADMIN' ? (
        <AdminDashboard />
      ) : (
        <Home />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>


        <Route
          path="/book/:id"
          element={
            <ProtectedRoute role="USER">
              <BookDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute role="USER">
              <SearchBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute role="ADMIN">
              <AddBookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-book/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <EditBookForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
