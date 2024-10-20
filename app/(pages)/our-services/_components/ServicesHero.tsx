"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ServicesHero() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Our Services
        </h1>
        <TextGenerateEffect
          words="Delivering Excellence in Agro Exports"
          className="text-xl sm:text-2xl md:text-3xl mb-8"
        />
        <Button asChild size="lg" className="bg-white text-primary hover:bg-primary/90 hover:text-white/90">
          <Link href="#servicesDetails">Explore Our Services</Link>
        </Button>
      </div>
    </div>
  );
}
