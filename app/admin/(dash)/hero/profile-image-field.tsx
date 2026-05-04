"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/admin/image-uploader"

export function HeroProfileImageField({ defaultValue }: { defaultValue: string }) {
  const [url, setUrl] = useState(defaultValue)
  return (
    <>
      <ImageUploader value={url} onChange={setUrl} prefix="profile" label="Upload profile photo" />
      <input type="hidden" name="profileImageUrl" value={url} />
    </>
  )
}
