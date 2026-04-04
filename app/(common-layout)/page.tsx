"use client";

import Container from "@/components/Container";
// import Banner from "./(home)/_components/Banner";
import Products from "./(home)/_components/Home/Products";

export default function HomePage() {
  return (
    <div className="mt-16">
      <Container>
        {/* <Banner /> */}
        <Products />
      </Container>
    </div>
  );
}
