export async function POST(req: Request) {
  const data = await req.json();
  const { token } = data;
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return new Response(null, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
        method: "POST",
    });
    const responseData = await response.json();
    const { success } = responseData;
    console.log("reCAPTCHA:", responseData);

    if (success) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 403 });
    }
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}