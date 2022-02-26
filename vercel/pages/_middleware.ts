import { NextRequest } from 'next/server';

const FLAG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet">
<rect width="1200" height="800" fill="#005BBB"/>
<rect width="1200" height="400" y="400" fill="#FFD500"/>
</svg>`.replace(/\n/g, '');

const CONTENT = `<div style="width: 50%; max-width: 250px; margin: 20px auto">${FLAG}</div>
<h1 style="text-align: center; color: red">Россия уходи из Украины!</h1>
<h1 style="text-align: center; color: red">Russia get out of Ukraine!</h1>
`.replace(/\n/g, '');

const CLIENT_JS = `
(function () {
var div = document.createElement("div");
div.style.width = "100%";
div.style.height = "100%";
div.style.background = "white";
div.style.color = "red";
div.style.position = "fixed";
div.style.top = 0;
div.style.left = 0;
div.style.zIndex = 2147483645;
div.style.border = "5px solid red";

div.innerHTML = '${CONTENT}';
document.getElementsByTagName("body")[0].appendChild(div);
})();`;

// Block Austria, prefer Germany
const BLOCKED_COUNTRY = 'RU'

export function middleware(req: NextRequest) {
  const country = req.geo.country || 'UNKNOWN'

  if (country === BLOCKED_COUNTRY) {
    return new Response(CLIENT_JS, { 
      headers: {
        'Content-Type': 'text/javascript'
      }
    });

  }
  return new Response(null, { 
    headers: {
      'Content-Type': 'text/javascript'
    }
  });
}
