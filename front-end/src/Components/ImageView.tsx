import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  const deleteImage = async (imageId: number) => {
    const response = await fetch("http://localhost:3000/image/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: imageId }),
    });
    const data = await response.json();
    console.log(data);
    setImages(images.filter((image) => image.id !== imageId));
  };

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
              <div>
                <img
                  className="max-w-[250px] max-h-[250px]"
                  key={uuidv4()}
                  src={`data:${image.mime_type};base64,${image.data}`}
                  alt={image.name}
                  width={250}
                  height={250}
                />
                <button key={uuidv4()} onClick={() => deleteImage(image.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageView;
