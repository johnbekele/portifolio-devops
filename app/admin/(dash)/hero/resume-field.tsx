"use client"

import { useState } from "react"
import { FileUploader } from "@/components/admin/file-uploader"

const DEFAULT_RESUME_URL = "/Yohans_Bekele_Resume.pdf"

export function HeroResumeField({ defaultValue }: { defaultValue: string }) {
  const [url, setUrl] = useState(defaultValue || DEFAULT_RESUME_URL)
  return (
    <>
      <FileUploader
        value={url}
        onChange={setUrl}
        prefix="resume"
        accept="application/pdf,.pdf"
        label="Upload resume PDF"
        fallbackUrl={DEFAULT_RESUME_URL}
      />
      <input type="hidden" name="resumeUrl" value={url} />
    </>
  )
}
