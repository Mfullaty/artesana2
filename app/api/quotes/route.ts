import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const [quotes, totalQuotes] = await Promise.all([
      db.quote.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.quote.count(),
    ]);

    const totalPages = Math.ceil(totalQuotes / limit);

    return NextResponse.json({
      quotes,
      pagination: {
        currentPage: page,
        totalPages,
        totalQuotes,
      },
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quote = await db.quote.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        companyName: body.companyName,
        website: body.website,
        needFor: body.needFor,
        product: body.product,
        productType: body.productType,
        cultivationType: body.cultivationType,
        processing: body.processing,
        unit: body.unit,
        volume: body.volume,
        purchaseType: body.purchaseType,
        deliveryAddress: body.deliveryAddress,
        incoterm: body.incoterm,
        deliveryDate: new Date(body.deliveryDate),
        deliveryFrequency: body.deliveryFrequency,
        additionalInfo: body.additionalInfo,
      },
    });

    // Send email using Resend
    await resend.emails.send({
      from: "info@artesana.com.ng",
      to: 'MustaphaIbrahim37@gmail.com',
      subject: 'Quote Request From '+body.fullName,
      html: `<p>Hello, Admin ${body.fullName + ' Filled the Quote Form'},</p><p>Login to your dashboard to view the quote: https://artesana.com.ng/admin/quotes</p>`,
    })
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Error creating quote" },
      { status: 500 }
    );
  }
}
