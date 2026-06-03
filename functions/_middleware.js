export async function onRequest(context) {
  const url = new URL(context.request.url);
  const canonicalHost = 'schuckman.com.ar';

  // Cualquier host que no sea el apex (www, *.pages.dev, etc.) -> 301 al apex
  if (url.hostname !== canonicalHost) {
    url.hostname = canonicalHost;
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }

  // Es el apex: servir el sitio normal
  return context.next();
}
