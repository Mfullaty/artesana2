import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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