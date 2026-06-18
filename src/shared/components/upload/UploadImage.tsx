"use client";
import { useState } from "react";
import { UploadDropzone } from "../../utils/uploadthing";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "@/src/features/communities/schemas/communitySchema";
import { ErrorForm } from "../forms";

export default function UploadImage() {
  const {
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
  } = useFormContext<CommunityInput>();
  const [image, setImage] = useState("");

  const currentImage = getValues("image") ? getValues("image") : null;

  return (
    <>
      <UploadDropzone
        endpoint={"ephubUploader"}
        // mostrar url de imagen subida
        onClientUploadComplete={(res) => {
          setImage(res[0].ufsUrl);
          setValue("image", res[0].ufsUrl);
          clearErrors("image");
        }}
        // estilos
        appearance={{
          button:
            "ut-ready:bg-orange-300 ut-uploading:cursor-not-allowed rounded bg-red-500 bg-none after:bg-orange-400",
          container:
            "w-full flex-column rounded-md border-cyan-300 bg-slate-200",
          allowedContent:
            "flex flex-col items-center justify-center px-2 text-white font-bold",
        }}
      />
      {errors.image && <ErrorForm>{errors.image.message}</ErrorForm>}
      {image && (
        <>
          <p className="text-slate-600 italic">Imagen subida de referencia:</p>
          <Image
            src={image}
            width={200}
            height={200}
            alt="Imagen subida de referencia"
          />
        </>
      )}
      {currentImage && !image && (
        <>
          <p className="text-slate-600 italic">Imagen Actual:</p>
          <Image
            src={currentImage}
            width={200}
            height={200}
            alt="Imagen subida de referencia"
          />
        </>
      )}
    </>
  );
}
