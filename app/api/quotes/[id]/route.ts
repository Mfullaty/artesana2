import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedQuote = await prisma.quote.update({
      where: { id: params.id },
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

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.quote.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
