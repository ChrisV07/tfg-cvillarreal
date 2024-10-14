"use client";

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

// Update the type to include null
export default function ImageUpload({ image }: { image: string | null | undefined }) {
    const [imageUrl, setImageUrl] = useState('');

    // Function to safely get the image path
    const safeGetImagePath = (img: string | null | undefined) => {
        if (typeof img === 'string') {
            return getImagePath(img);
        }
        return '';
    };

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close();
                    //@ts-ignore
                    setImageUrl(result.info?.secure_url);
                }
            }}
            uploadPreset="g4liolyc"
            options={{
                maxFiles: 1,
                folder: "Restaurants" // Especificar la carpeta 'restaurants'
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2 ">
                        <label className="text-slate-800">Logo Restaurante</label>
                        <div
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 rounded-lg"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus size={50} />
                            <p className="text-lg font-semibold">
                                {image ? 'Editar Imágen' : 'Agregar Imágen'}
                            </p>

                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Logo Restaurante"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <label>Imágen Actual:</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={safeGetImagePath(image)}
                                    alt="Logo Restaurante"
                                    style={{ objectFit: 'contain' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                                />
                            </div>
                        </div>
                    )}

                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image || ''}
                    />
                </>
            )}
        </CldUploadWidget>
    );
}
