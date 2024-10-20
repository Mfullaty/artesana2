"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import BackButton from "./back-button";
import Header from "./header";
import Social from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
}: CardWrapperProps) => {
  return (
    <Card className="w-[90%] mx-auto md:w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
        <CardContent className="px-0">{children}</CardContent>
      </CardHeader>
      {showSocial && (
        <CardFooter>
            <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
        label={backButtonLabel}
        href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
