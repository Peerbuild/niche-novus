"use client";
import { getSignature } from "@/app/actions/cloud";
import { deleteImage, getGallery } from "@/app/actions/gallery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useState } from "react";
import GalleryForm from "./GalleryForm";

export default function Page() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => await getGallery(),
  });

  console.log(query.data);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 ">
      <div>
        <GalleryForm />
      </div>
      {query.data?.map((gallery) => {
        return <GalleryForm key={gallery.id} item={gallery} />;
      })}
    </div>
  );
}
