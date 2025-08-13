import { navLinks } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { Collection } from "../components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";

type HomeProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

const Home = async ({ searchParams }: HomeProps) => {
  const page = Number((await searchParams).page) || 1;
  const searchQuery = (await searchParams).query || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="text-4xl font-bold">Unleash your visions</h1>
        <ul className="flex items-center justify-center">
          {navLinks.slice(1, 6).map((link) => (
            <li key={link.route} className="mx-4">
              <Link
                href={link.route}
                className="text-lg font-medium text-blue-600 hover:underline flex items-center gap-2"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="mr-2 inline-block align-middle transition-transform hover:scale-110"
                />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          page={page}
          totalPages={images?.totalPage}
        />
      </section>
    </>
  );
};

export default Home;
