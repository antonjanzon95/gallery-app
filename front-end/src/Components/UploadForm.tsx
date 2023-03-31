import { useState } from "react";

const UploadForm = () => {
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploaded(true);
  };

  return (
    <>
      <div>
        {!uploaded ? (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-center">
              Upload an image
            </h1>
            <form
              onSubmit={handleSubmit}
              action="http://localhost:3000/image/savefile"
              method="post"
              encType="multipart/form-data"
            >
              <input type="file" name="image" />
              <button
                type="submit"
                className="px-6 py-1 border-slate-100 border-2 bg-teal-800 hover:bg-teal-500"
              >
                Upload
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-center">
              Successfully uploaded image
            </h1>
            <button
              onClick={() => setUploaded(false)}
              className="px-6 py-1 border-slate-100 border-2 bg-teal-800 hover:bg-teal-500 mx-auto"
            >
              Upload another
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadForm;
