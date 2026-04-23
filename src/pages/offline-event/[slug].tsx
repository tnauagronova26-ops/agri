import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";
import { offlineEvents } from "@/data/events";

export async function getStaticPaths() {
  const paths = offlineEvents.map((event) => ({
    params: { slug: event.title.toLowerCase().replace(/\s+/g, "-") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const event = offlineEvents.find(
    (e) => e.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );
  return { props: { event } };
}

export default function OfflineEventDetail({ event }: { event: typeof offlineEvents[0] }) {
  if (!event) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-white">Event not found</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen py-20">
        <Link href="/#events-offline">
          <Button
            variant="ghost"
            className="mb-8 text-white bg-primary hover:text-white hover:bg-primary/50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        {/* Event Title */}
        <div className="text-center mb-12">
          <h1 className="clash-grotesk text-2xl font-semibold tracking-tight text-black xl:text-5xl">
            {event.title}
          </h1>
        </div>

        {/* Poster Image - Full Width */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[3/4] overflow-hidden rounded-xl border border-primary/60 bg-primary/20">
          {event.poster && (
            <Image
              src={event.poster}
              alt={event.title}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-black font-bold">
            Download Event Rules for {event.title}
          </p>
          <a
            href={event.eventRules}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-md font-semibold"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Event Rules
          </a>
        </div>
      </div>
    </Container>
  );
}