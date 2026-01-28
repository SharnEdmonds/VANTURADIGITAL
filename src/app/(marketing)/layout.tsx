import type { ReactNode } from "react";
import { Header } from "@/components/features/navigation";
import { Footer } from "@/components/features/navigation";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
