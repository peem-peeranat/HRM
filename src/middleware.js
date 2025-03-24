import { NextResponse } from "next/server";

export async function middleware(request) {
  // อนุญาตให้เข้าถึงหน้า / และ /login ได้โดยไม่ต้องตรวจสอบ token
  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get("token");
    let response = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      }
    });
    const responseJSON = await response.json();

    const requestHeaders = new Headers(request.headers);
    // เปลี่ยนจาก responseJSON.email เป็น responseJSON.username
    requestHeaders.set("users", JSON.stringify({ username: responseJSON.username }));

    if (!token || !token.value) {
      throw new Error("Token not found");
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.log("Error:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/:path*", // ใช้ "*" เพื่อให้ middleware ทำงานกับทุกเส้นทาง
};