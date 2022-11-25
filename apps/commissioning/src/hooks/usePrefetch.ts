import { useRouter } from "next/router";
import { useEffect } from "react";


/**
 * Use to define page content to pre-fetch so navigation can be instant.
 * We need this when navigating with router.push.
 */
export function usePrefetch(path: string) {
  const router = useRouter();
  
  useEffect(() => {
    router.prefetch(path);
  }, [router, path]);
}
