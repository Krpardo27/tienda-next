"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="next-tienda"
      onSuccess={(result, { widget }) => {
        console.log(result);
        if (result.event === "success") {
          widget.close();
          // @ts-ignore
          setImageUrl(result.info?.secure_url);
        }
      }}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800"></label>
            <div
              onClick={() => open()}
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <TbPhotoPlus size={40} className="mx-auto" />
              <p className="text-sm text-center text-slate-500">
                Click para subir imagen
              </p>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={imageUrl}
                    alt="Imagen del producto"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {image && !imageUrl && (
            <div className="space-y-2">
              <label htmlFor="">Imagen actual:</label>
              <div className="relative size-64">
                <Image
                  src={getImagePath(image)}
                  alt="Imagen actual del producto"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
          <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
        </>
      )}
    </CldUploadWidget>
  );
}
