import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("adminInfo");
  let url = req.url;

  if (!verify && url.includes("/dashboard")) {
    return NextResponse.redirect("https://autoshowroomclient.vercel.app");
  }
}