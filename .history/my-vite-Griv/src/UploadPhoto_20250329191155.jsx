"use client"

import { useState, useRef } from "react"
import { supabase } from "./supabase"
import { v4 as uuidv4 } from "uuid"
import { Upload, ImageIcon, MapPin, FileText, X, Check, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function UploadPhoto() {
  const [formState, setFormState] = useState({
    file: null,
    preview: null,
    description: "",
    location: "",
    isUploading: false,
    uploadStatus: "",
    uploadCode: null
  })
  const fileInputRef = useRef(null)
  
  const { file, preview, description, location, isUploading, uploadStatus, uploadCode } = formState
  
  const updateFormState = (updates) => setFormState(prev => ({ ...prev, ...updates }))

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    
    if (!selectedFile) {
      updateFormState({ file: null, preview: null })
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => updateFormState({ file: selectedFile, preview: e.target.result })
    reader.readAsDataURL(selectedFile)
  }

  // Handle file drop events
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => updateFormState({ file: droppedFile, preview: e.target.result })
        reader.readAsDataURL(droppedFile)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const clearFile = () => {
    updateFormState({ file: null, preview: null })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleUpload = async () => {
    if (!file) {
      updateFormState({ uploadStatus: "Please select a file" })
      return
    }

    updateFormState({ isUploading: true, uploadStatus: "Uploading..." })

    try {
      const uniqueCode = uuidv4().slice(0, 6)
      const filePath = `uploads/${uniqueCode}-${file.name}`

      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file)

      if (uploadError) throw new Error(uploadError.message)

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath)
      
      // Insert record
      const { error: insertError } = await supabase
        .from("photos")
        .insert([{ 
          code: uniqueCode, 
          image_url: publicUrlData.publicUrl, 
          description, 
          location, 
          status: "Under Review" 
        }])

      if (insertError) throw new Error(insertError.message)

      // Success
      updateFormState({
        uploadCode: uniqueCode,
        uploadStatus: "success",
        file: null,
        preview: null,
        description: "",
        location: ""
      })
    } catch (error) {
      updateFormState({ uploadStatus: `Error: ${error.message}` })
    } finally {
      updateFormState({ isUploading: false })
    }
  }

  const resetForm = () => {
    updateFormState({
      file: null,
      preview: null,
      description: "",
      location: "",
      uploadStatus: "",
      uploadCode: null
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const SuccessView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-green-50 p-6 rounded-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Check className="h-8 w-8 text-green-600" />
      </motion.div>
      <h3 className="text-lg font-medium text-green-800 mb-2">Upload Successful!</h3>
      <p className="text-green-700 mb-4">Your photo has been uploaded and is under review.</p>
      <div className="bg-green-100 p-3 rounded-md inline-block">
        <p className="text-sm text-green-800">
          Your code: <span className="font-mono font-bold">{uploadCode}</span>
        </p>
      </div>
      <button
        onClick={resetForm}
        className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Upload Another Photo
      </button>
    </motion.div>
  )

  const UploadForm = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      {/* Photo Upload Field */}
      <div className="space-y-2">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
          Photo
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden" // Hide input but keep it accessible
          />

          <AnimatePresence>
            {preview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-video mb-2 rounded-lg overflow-hidden border-2 border-dashed border-indigo-300"
              >
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering file input
                    clearFile();
                  }}
                  type="button"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-2"
                >
                  <ImageIcon className="h-10 w-10 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to select an image or drag and drop</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {file ? "Change Photo" : "Select Photo"}
          </button>
        </div>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4" />
          <span>Description</span>
        </label>
        <textarea
          id="description"
          placeholder="Tell us about your photo..."
          value={description}
          onChange={(e) => updateFormState({ description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
          rows={3}
        />
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4" />
          <span>Location</span>
        </label>
        <input
          id="location"
          type="text"
          placeholder="Where was this photo taken?"
          value={location}
          onChange={(e) => updateFormState({ location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>

      {/* Error Message */}
      {uploadStatus && uploadStatus !== "success" && uploadStatus !== "Uploading..." && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm p-2 bg-red-50 rounded"
        >
          {uploadStatus}
        </motion.div>
      )}
    </motion.div>
  )

  // Background elements
  const BackgroundBlobs = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>
);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <BackgroundBlobs />
      
      <div className="p-6 rounded-lg w-full">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Upload className="h-5 w-5" />
              <span>Upload Photo</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Share your amazing photos with the community</p>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            <AnimatePresence mode="wait">
              {uploadStatus === "success" ? <SuccessView /> : <UploadForm />}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-gray-50 border-t">
            {uploadStatus !== "success" && (
              <button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isUploading || !file ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  "Upload Photo"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}