import React from "react";
import { Button } from "./ui/button";

const FooterCallToAction = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Partner with Artesana?
        </h2>
        <p className="text-xl mb-8">
          Join us in bringing the richness of Africa's agriculture to the world.
        </p>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-black hover:text-primary-foreground">
          <a href="/contact-us">Contact Us Today</a>
        </Button>
      </div>
    </section>
  );
};

export default FooterCallToAction;
