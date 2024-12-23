"use client";// This is for type safety.
import { useRouter } from "next/navigation";

export function goToLogin(router:any) {
  router.push("/?route=login");
}

export function goToSignup(router:any) {
  router.push("/?route=signup");
}

export function goToHome(router:any) {
  router.push("/?route=home");
}
