import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

/* ***Layouts**** */
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Error = lazy(() => import('../views/authentication/Error'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));
const FarmRegistration = lazy(() => import('../views/FarmRegistration'));
const FarmSearch = lazy(() => import('../views/FarmSearch'));

const Router = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BlankLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register-farm',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FarmRegistration />
          </Suspense>
        ),
      },
      {
        path: '/search-farm',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FarmSearch />
          </Suspense>
        ),
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
