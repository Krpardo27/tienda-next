"use client";

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type Props = {
  image?: string | null;
  categorySlug?: string;
};

export default function ImageUpload({ image, categorySlug }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  console.log("categorySlug", categorySlug);

  const existingImagePath = getImagePath(image ?? "");

  const folderPath = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "fuente-vicuna";

    if (!categorySlug) return base;

    return `${base}/${categorySlug}`;
  }, [categorySlug]);

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        maxFiles: 1,
        folder: folderPath,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        maxImageFileSize: 5000000,
      }}
      onSuccess={(result, { widget }) => {
        if (result.event !== "success") return;

        widget.close();

        const info = result.info;

        if (
          info &&
          typeof info === "object" &&
          "secure_url" in info &&
          typeof info.secure_url === "string"
        ) {
          setImageUrl(info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-3">
            <label
              className="
                block text-sm font-medium
                text-[var(--foreground)]
              "
            >
              Imagen del producto
            </label>

            <div
              onClick={() => open()}
              className="
                relative
                flex flex-col items-center justify-center gap-4
                min-h-[260px]
                rounded-2xl
                border-2 border-dashed border-[var(--border)]
                bg-[var(--surface)]
                cursor-pointer
                transition-all duration-300
                hover:border-amber-500/40
                hover:bg-amber-500/[0.03]
              "
            >
              {!imageUrl && !existingImagePath && (
                <>
                  <TbPhotoPlus size={42} className="text-[var(--muted)]" />

                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      Subir imagen
                    </p>

                    <p className="text-xs text-[var(--muted)]">
                      JPG, PNG o WEBP
                    </p>
                  </div>
                </>
              )}

              {(imageUrl || existingImagePath) && (
                <div className="absolute inset-0">
                  <Image
                    src={imageUrl || existingImagePath}
                    alt="Imagen del producto"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="image" value={imageUrl || image || ""} />
        </>
      )}
    </CldUploadWidget>
  );
}
