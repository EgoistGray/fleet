import Image from "next/image";

type CardProps = {
  name: string;
  description: string;
  imageUrl: string;
};
export default function Card({ name, description, imageUrl }: CardProps) {
  return (
    <div className="relative grid h-full w-full  rounded-xl p-4">
      <div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-500">
          <Image
            src={imageUrl}
            alt="invalid image"
            className="h-full w-full object-cover object-center"
            layout="fill"
          />
        </div>
        <h1 className="leading-10">{name}</h1>
        <h2 className="font-normal leading-10">{description}</h2>
      </div>
    </div>
  );
}
