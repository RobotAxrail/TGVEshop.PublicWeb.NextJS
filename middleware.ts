// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface IDomainFromPreprintQRDomainBody {
  domainToRedirectTo: string | undefined;
}

export async function middleware(req: NextRequest) {
  try {
    // if(process.env.EWARUNG_PREPRINT_QR_DOMAIN)
    const {
      nextUrl: { search },
    } = req;
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());

    //escape the function if the origin is not from eWarung preprint qr domain and doesn't have shopId ('?s=xxx')
    if (
      req.nextUrl.origin !==
        process.env.NEXT_PUBLIC_EWARUNG_PREPRINT_QR_DOMAIN ||
      !params.s ||
      req.nextUrl.origin.includes("http://localhost:")
    )
      return;

    const slugFetch = await fetch(
      `${req.nextUrl.origin}/api/merchant/${params.s}`
    );

    if (slugFetch.status === 404) {
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const data: IDomainFromPreprintQRDomainBody = await slugFetch.json();

    if (data?.domainToRedirectTo) {
      return NextResponse.redirect("https://" + data.domainToRedirectTo);
    }
    return;
  } catch (error) {
    console.error("middleware", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
