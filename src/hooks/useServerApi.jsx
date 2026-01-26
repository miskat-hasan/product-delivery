export async function useServerApi({ endpoint, revalidate, ssr = false }) {
  const baseURL = `${process.env.NEXT_PUBLIC_SITE_URL}${endpoint}`;

  const res = await fetch(baseURL, {
    cache: ssr ? "no-store" : "force-cache",
    ...(ssr ? {} : { next: { revalidate: revalidate ?? 3600 } }),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return { data: [] };
    }

    throw new Error(`Failed to fetch ${endpoint} — ${res.status}`);
  }

  return res.json();
}
