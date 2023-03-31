import { useEffect, useState } from "react";

interface Image {
  id: number;
  name: string;
  data: Buffer;
  mime_type: string;
}

const ImageView = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("http://localhost:3000/image/");
      const data = await response.json();
      console.log(data);
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-center">Your Images</h1>
        {images.length < 1 ? (
          <h2 className="text-center text-2xl">
            You haven't uploaded any images yet...
          </h2>
        ) : (
          <div className="w-[720px] flex flex-wrap justify-center gap-4">
            {images.map((image) => (
              <img
                className="max-w-[250px] max-h-[250px]"
                key={image.id}
                src={`data:${image.mime_type};base64,${image.data}`}
                alt={image.name}
                width={250}
                height={250}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageView;
