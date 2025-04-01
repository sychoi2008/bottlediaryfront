// functions/api/catchall.ts
export async function onRequest(context: any) {
  const url = new URL(context.request.url);

  // 여기서 /api/ 뒷부분을 파싱
  const path = url.pathname.replace(/^\/api/, ""); // /api/xx → /xx

  const backendUrl = `http://3.39.23.44:8080${path}`;
  console.log("🔁 Proxying to backend:", backendUrl);

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
