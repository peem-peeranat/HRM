"use server"
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");


    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: email,
      password,
    }
    )
    cookies().set('token', response.data.jwt);

  } catch (error) {

    let errorMessage = ''
    if (error.response && error.response.data.error.message) {
      errorMessage = error.response.data.error.message
    }

    return {
      message: errorMessage || "Login fail",
    }
  }
  redirect('/home')
}