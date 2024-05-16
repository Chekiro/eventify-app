import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Discover the Magic: Let Us Make Your Events Truly Unforgettable!
            </h1>
            <p>
              Unleash unforgettable events with our expert team at Eventify.
              From concept to execution, we meticulously craft every detail to
              reflect your unique vision. Trust us to turn ordinary moments into
              extraordinary memories.
            </p>
            <Button asChild size="lg" className="button w-full sm:w-fit">
              <Link href="#events">Check It !</Link>
            </Button>
          </div>
          <Image
            width={1000}
            height={1000}
            src="/assets/images/hero-section.svg"
            alt="Hero Logo"
            className="max-h-[70vh] object-contain object-center 2xsl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Let's Go <br /> Check Our Amazing Events !
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
