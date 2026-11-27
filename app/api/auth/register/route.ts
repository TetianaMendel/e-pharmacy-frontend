import { NextResponse } from "next/server";
import axios from "axios";
import { api } from "../../api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data } = await api.post("/api/user/register", body);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}