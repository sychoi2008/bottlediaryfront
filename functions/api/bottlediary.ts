export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  // 프론트에서 보내는 요청은 /api/bottlediary/... 형태이므로,
  // 앞의 '/api'만 제거하면 나머지는 그대로 유지됩니다.
  const path = url.pathname.replace(/^\/api/, ""); // 예: /api/bottlediary/emotions → /bottlediary/emotions

  // 백엔드 서버는 http://3.39.23.44:8080/bottlediary/... 로 동작 중이므로,
  // path를 그대로 붙여줍니다.
  const backendUrl = `http://3.39.23.44:8080${path}`;
  console.log("Proxying to backend:", backendUrl);

  // 백엔드로 요청 전달
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
