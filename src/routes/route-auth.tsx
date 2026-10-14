import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import { modulePath } from "@shared-constants/path-module";

const AuthPage = lazy(() => import("@modules/auth/auth"));

export default function RouteAuth() {
  return (
    <>
      <Route path={modulePath.auth.login} element={<Suspense fallback={null}><AuthPage /></Suspense>} />
      <Route path={modulePath.auth.register} element={<Suspense fallback={null}><AuthPage /></Suspense>} />
    </>
  );
}
