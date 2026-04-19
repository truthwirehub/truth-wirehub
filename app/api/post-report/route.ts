import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, secret_key } = body;

    // Security: Taake koi aur aapki site par post na kar sakay
    if (secret_key !== 'Zaman_Mega_Engine_786') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Yahan hum data ko console par dikhayenge (Testing ke liye)
    console.log("n8n Data Received:", title);

    return NextResponse.json({ message: 'Success!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}