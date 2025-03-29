import React, { useState } from 'react';
import { supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';
import { Camera, MapPin, FileText, Check, Upload, ArrowRight, X } from 'lucide-react';

// Import shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file || !description || !location) {
      setUploadStatus('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setUploadStatus('Submitting...');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 300);

      const code = uuidv4().slice(0, 6);
      const filePath = `uploads/${code}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;
      const { error: insertError } = await supabase.from('photos').insert([
        { code, image_url: imageUrl, description, location, status: 'Under Review' },
      ]);
      if (insertError) throw insertError;
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUniqueCode(code);
      
      // Small delay to show completed progress before changing step
      setTimeout(() => {
        setCurrentStep(4);
      }, 500);
    } catch (error) {
      setUploadStatus(`Submission failed: ${error.message}`);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIndicator = (step, currentStep) => {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 mr-2"
        style={{ 
          borderColor: currentStep >= step ? 'rgb(16, 185, 129)' : 'rgb(209, 213, 219)',
          backgroundColor: currentStep >= step ? 'rgb(16, 185, 129)' : 'transparent',
          color: currentStep >= step ? 'white' : 'rgb(107, 114, 128)'
        }}>
        {step}
      </div>
    )
  }

  return (
    <Card className="max-w-xl mx-auto shadow-xl">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Upload Your Photo</CardTitle>
        <CardDescription className="text-gray-100 text-center">Share your moments with our community</CardDescription>
      </CardHeader>

      <div className="px-6 py-4 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {stepIndicator(1, currentStep)}
            <span className={currentStep >= 1 ? "font-medium" : "text-gray-500"}>Upload</span>
          </div>
          <div className="flex-grow mx-2 h-0.5 bg-gray-200">
            <div className={`h-full bg-green-500 transition-all duration-300`} 
                style={{ width: `${currentStep > 1 ? '100%' : '0%'}` }}></div>
          </div>
          <div className="flex items-center">
            {stepIndicator(2, currentStep)}
            <span className={currentStep >= 2 ? "font-medium" : "text-gray-500"}>Details</span>
          </div>
          <div className="flex-grow mx-2 h-0.5 bg-gray-200">
            <div className={`h-full bg-green-500 transition-all duration-300`} 
                style={{ width: `${currentStep > 2 ? '100%' : '0%'}` }}></div>
          </div>
          <div className="flex items-center">
            {stepIndicator(3, currentStep)}
            <span className={currentStep >= 3 ? "font-medium" : "text-gray-500"}>Review</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 bg-white">
        {uploadStatus && currentStep !== 4 && (
          <Alert className="mb-4" variant={uploadStatus.includes('failed') ? "destructive" : "default"}>
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>{uploadStatus}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 && (
          <div className="text-center">
            {preview ? (
              <div className="relative bg-gray-100 p-2 rounded-lg shadow-inner">
                <img src={preview} className="w-full rounded-lg shadow-sm object-contain max-h-80" alt="Preview" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={clearFile} 
                        variant="destructive" 
                        size="icon"
                        className="absolute top-4 right-4 rounded-full shadow-md">
                        <X size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Badge className="absolute bottom-4 left-4 bg-black/70">
                  {file?.name.length > 20 ? `${file?.name.substring(0, 20)}...` : file?.name}
                </Badge>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 transition-all hover:border-gray-400">
                <Input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="photo-upload" className="flex flex-col items-center cursor-pointer">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-lg font-medium">Click to upload or drag & drop</p>
                  <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                </Label>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide details about your photo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Where was this photo taken?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-xl font-semibold flex items-center mb-2">
              <FileText className="w-5 h-5 mr-2" />
              Review Your Submission
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <img src={preview} className="w-full rounded-lg shadow-sm object-contain max-h-64 mb-4" alt="Preview" />
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="mt-1">{description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {location}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">File</h4>
                  <p className="mt-1 text-sm text-gray-600">{file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)</p>
                </div>
              </div>
            </div>
            
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
            <p className="text-gray-600 mb-6">Your photo has been submitted for review</p>
            
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-600">Your tracking code</p>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <code className="text-xl font-mono bg-black text-white px-4 py-2 rounded">{uniqueCode}</code>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        {currentStep > 1 && currentStep < 4 && (
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={isSubmitting}
          >
            Back
          </Button>
        )}
        
        {currentStep === 1 && (
          <Button
            className="w-full"
            onClick={() => setCurrentStep(2)}
            disabled={!file}
          >
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {currentStep === 2 && (
          <Button
            className="ml-auto"
            onClick={() => setCurrentStep(3)}
            disabled={!description || !location}
          >
            Continue to Review
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        {currentStep === 3 && (
          <Button
            className="ml-auto"
            onClick={handleUpload}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Photo'}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        )}
        
        {currentStep === 4 && (
          <Button 
            className="w-full"
            variant="default"
            onClick={() => {
              setCurrentStep(1);
              setFile(null);
              setPreview(null);
              setDescription('');
              setLocation('');
              setUniqueCode('');
              setUploadStatus('');
              setUploadProgress(0);
            }}
          >
            Upload Another Photo
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}