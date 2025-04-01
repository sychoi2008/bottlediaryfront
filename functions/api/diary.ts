export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace("/api", ""); // /api/diary → /diary
  const backendUrl = `http://3.39.23.44:8080${path}`;

  const response = await fetch(backendUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: response.headers,
  });
}
