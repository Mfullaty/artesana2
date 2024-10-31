import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send notification email to company
    await resend.emails.send({
      from: 'Artesana Quotes <info@artesana.com.ng>',
      to: 'info@artesana.com.ng',
      subject: 'New Quote Request Received',
      html: `
        <h1>New Quote Request</h1>
        <p>A new quote request has been submitted by ${body.fullName}.</p>
        <h2>Quote Details:</h2>
        <ul>
          <li>Name: ${body.fullName}</li>
          <li>Email: ${body.email}</li>
          <li>Phone: ${body.phone}</li>
          <li>Company: ${body.companyName}</li>
          <li>Product: ${body.product}</li>
          <li>Volume: ${body.volume} ${body.unit}</li>
        </ul>
        <p>Please log in to the admin panel for full details. <a href="https://artesana.com.ng/admin/quotes">View Quotes</a></p>
      `
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Artesana <info@artesana.com.ng>',
      to: body.email,
      subject: 'Quote Request Received - Artesana',
      html: `
        <h1>Thank You for Your Quote Request</h1>
        <p>Dear ${body.fullName},</p>
        <p>We have received your quote request for ${body.product}. Our team will review your request and get back to you shortly.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Artesana Team</p>
      `
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Error creating quote" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { quoteIds } = body;

    if (!Array.isArray(quoteIds) || quoteIds.length === 0) {
      return NextResponse.json({ error: 'Invalid quote IDs' }, { status: 400 });
    }

    const result = await db.quote.deleteMany({
      where: {
        id: {
          in: quoteIds,
        },
      },
    });

    return NextResponse.json({ success: true, deletedCount: result.count });
  } catch (error) {
    console.error("Error deleting quotes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}