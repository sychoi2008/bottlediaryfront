export async function onRequest(context: any) {
  const url = new URL(context.request.url);

  // '/api' 부분 제거
  const path = url.pathname.replace(/^\/api/, "");
  const backendUrl = `http://3.39.23.44:8080${path}`;
  console.log("Proxying to backend:", backendUrl);

  const headers = new Headers();
  for (const [key, value] of context.request.headers.entries()) {
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  }

  const init: RequestInit = {
    method: context.request.method,
    headers,
  };

  if (context.request.method !== "GET" && context.request.method !== "HEAD") {
    init.body = context.request.body;
  }

  try {
    const response = await fetch(backendUrl, init);
    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return new Response("Proxy failed", { status: 500 });
  }
}
