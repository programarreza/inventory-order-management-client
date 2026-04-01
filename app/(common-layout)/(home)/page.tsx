"use client";
import Banner from "./_components/Banner";
import Container from "./_components/Container";

export default function HomePage() {
  return (
    <div className="pt-16">
      <Container>
        <Banner bannerGallery={[]} />
      </Container>
    </div>
  );
}
