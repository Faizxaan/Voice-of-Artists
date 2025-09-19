"use client";

import { useState } from "react";
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  User,
  Music,
  FileText,
  Globe,
} from "lucide-react";

interface FormData {
  // Personal Information
  artistName: string;
  realName: string;
  email: string;
  phone: string;
  location: string;

  // Artist Information
  genre: string;
  yearsActive: string;
  influences: string;
  biography: string;

  // Music & Content
  soundcloudUrl: string;
  spotifyUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  website: string;

  // Voice of Artist Response
  voiceOfArtistStatement: string;
  artistGoals: string;

  // Availability
  availableForInterviews: boolean;
  preferredContactMethod: string;

  // Files
  pressKit: File | null;
  musicSamples: File[];
  photos: File[];
}

interface FileUploadProps {
  label: string;
  accept: string;
  multiple?: boolean;
  required?: boolean;
  files: File[] | File | null;
  onChange: (files: File[] | File | null) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  multiple = false,
  required = false,
  files,
  onChange,
  maxFiles = 5,
  maxSize = 10,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError("");

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileValidation(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFileValidation(selectedFiles);
    }
  };

  const handleFileValidation = (newFiles: File[]) => {
    // Check file size
    const oversizedFiles = newFiles.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setUploadError(`Some files exceed the ${maxSize}MB limit`);
      return;
    }

    if (multiple) {
      const currentFiles = Array.isArray(files) ? files : [];
      const totalFiles = currentFiles.length + newFiles.length;

      if (totalFiles > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      onChange([...currentFiles, ...newFiles]);
    } else {
      onChange(newFiles[0] || null);
    }
  };

  const removeFile = (index: number) => {
    if (multiple && Array.isArray(files)) {
      const updatedFiles = files.filter((_, i) => i !== index);
      onChange(updatedFiles);
    } else {
      onChange(null);
    }
  };

  const fileList = multiple
    ? Array.isArray(files)
      ? files
      : []
    : files
      ? [files]
      : [];

  const fileArray: File[] = fileList.filter(
    (file): file is File => file instanceof File
  );

  return (
    <div className="space-y-4">
      <label className="font-mono font-bold text-black">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div
        className={`border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-black bg-black/5"
            : "border-black/30 hover:border-black/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id={`file-${label.toLowerCase().replace(/\s+/g, "-")}`}
        />

        <Upload className="w-12 h-12 text-black/40 mx-auto mb-4" />

        <p className="font-mono text-black/70 mb-2">
          Drag & drop {multiple ? "files" : "a file"} here, or{" "}
          <label
            htmlFor={`file-${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-black underline cursor-pointer hover:text-black/70"
          >
            browse
          </label>
        </p>

        <p className="font-mono text-xs text-black/50">
          {multiple ? `Max ${maxFiles} files, ` : ""}up to {maxSize}MB each
        </p>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-red-600 font-mono text-sm">
          <AlertCircle className="w-4 h-4" />
          {uploadError}
        </div>
      )}

      {fileArray.length > 0 && (
        <div className="space-y-2">
          {fileArray.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-black/5 border border-black/20"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-black/60" />
                <span className="font-mono text-sm text-black">
                  {file.name}
                </span>
                <span className="font-mono text-xs text-black/60">
                  ({(file.size / 1024 / 1024).toFixed(1)}MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ArtistApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    artistName: "",
    realName: "",
    email: "",
    phone: "",
    location: "",
    genre: "",
    yearsActive: "",
    influences: "",
    biography: "",
    soundcloudUrl: "",
    spotifyUrl: "",
    youtubeUrl: "",
    instagramUrl: "",
    website: "",
    voiceOfArtistStatement: "",
    artistGoals: "",
    availableForInterviews: false,
    preferredContactMethod: "email",
    pressKit: null,
    musicSamples: [],
    photos: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const totalSteps = 4;

  const updateFormData = (
    field: keyof FormData,
    value: string | boolean | File | File[] | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.artistName && formData.email && formData.location);
      case 2:
        return !!(formData.genre && formData.biography);
      case 3:
        return !!formData.voiceOfArtistStatement;
      case 4:
        return true; // Music samples are now optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // In a real implementation, this would submit to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
    } catch {
      setSubmitError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section className="section-wrapper py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="content-panel bg-cyan-50 border-2 border-cyan-400 p-12">
              <CheckCircle className="w-16 h-16 text-cyan-600 mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-black mb-6">
                Application Submitted!
              </h2>
              <p className="font-mono text-lg text-black/70 mb-8">
                Thank you for your application. We&apos;ll review your
                submission and get back to you within 5-7 business days.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-black text-white px-8 py-4 font-mono text-lg 
                         hover:bg-black/90 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-wrapper py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="content-panel text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl text-black mb-6">
              Artist Application
            </h2>
            <p className="font-mono text-lg md:text-xl text-black/70 max-w-3xl mx-auto">
              Join the Voice of Artist platform. Share your story, showcase your
              music, and connect with our community of authentic artists.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`flex items-center ${i < totalSteps - 1 ? "flex-1" : ""}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center 
                              font-mono font-bold ${
                                i + 1 <= currentStep
                                  ? "bg-black text-white border-black"
                                  : "bg-white text-black border-black/30"
                              }`}
                  >
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        i + 1 < currentStep ? "bg-black" : "bg-black/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-sm text-black/60">
              <span>Personal Info</span>
              <span>Artist Details</span>
              <span>Voice Statement</span>
              <span>Media Files</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="content-panel border-2 border-black p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <User className="w-6 h-6 text-black" />
                  <h3 className="font-display text-2xl md:text-3xl text-black">
                    Personal Information
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Artist Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.artistName}
                      onChange={(e) =>
                        updateFormData("artistName", e.target.value)
                      }
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="Your stage/artist name"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Real Name
                    </label>
                    <input
                      type="text"
                      value={formData.realName}
                      onChange={(e) =>
                        updateFormData("realName", e.target.value)
                      }
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="Your legal name"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-mono font-bold text-black mb-2 block">
                      Location <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        updateFormData("location", e.target.value)
                      }
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="City, State/Country"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Artist Information */}
            {currentStep === 2 && (
              <div className="content-panel border-2 border-black p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <Music className="w-6 h-6 text-black" />
                  <h3 className="font-display text-2xl md:text-3xl text-black">
                    Artist Details
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono font-bold text-black mb-2 block">
                        Primary Genre <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.genre}
                        onChange={(e) =>
                          updateFormData("genre", e.target.value)
                        }
                        className="w-full p-4 border-2 border-black/20 font-mono 
                                 focus:border-black focus:outline-none"
                        required
                      >
                        <option value="">Select a genre</option>
                        <option value="alternative">Alternative</option>
                        <option value="electronic">Electronic</option>
                        <option value="folk">Folk</option>
                        <option value="hip-hop">Hip-Hop</option>
                        <option value="indie">Indie</option>
                        <option value="jazz">Jazz</option>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="r&b">R&B</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono font-bold text-black mb-2 block">
                        Years Active
                      </label>
                      <input
                        type="text"
                        value={formData.yearsActive}
                        onChange={(e) =>
                          updateFormData("yearsActive", e.target.value)
                        }
                        className="w-full p-4 border-2 border-black/20 font-mono 
                                 focus:border-black focus:outline-none"
                        placeholder="e.g., 2020-present or 5 years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Musical Influences
                    </label>
                    <input
                      type="text"
                      value={formData.influences}
                      onChange={(e) =>
                        updateFormData("influences", e.target.value)
                      }
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none"
                      placeholder="Artists, genres, or sounds that inspire you"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Artist Biography <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      value={formData.biography}
                      onChange={(e) =>
                        updateFormData("biography", e.target.value)
                      }
                      rows={6}
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none resize-none"
                      placeholder="Tell us your story. How did you get started? What drives your music? What makes you unique?"
                      required
                    />
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="font-mono font-bold text-black mb-4">
                      Online Presence
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="url"
                        value={formData.soundcloudUrl}
                        onChange={(e) =>
                          updateFormData("soundcloudUrl", e.target.value)
                        }
                        className="p-3 border-2 border-black/20 font-mono text-sm 
                                 focus:border-black focus:outline-none"
                        placeholder="SoundCloud URL"
                      />
                      <input
                        type="url"
                        value={formData.spotifyUrl}
                        onChange={(e) =>
                          updateFormData("spotifyUrl", e.target.value)
                        }
                        className="p-3 border-2 border-black/20 font-mono text-sm 
                                 focus:border-black focus:outline-none"
                        placeholder="Spotify URL"
                      />
                      <input
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={(e) =>
                          updateFormData("youtubeUrl", e.target.value)
                        }
                        className="p-3 border-2 border-black/20 font-mono text-sm 
                                 focus:border-black focus:outline-none"
                        placeholder="YouTube URL"
                      />
                      <input
                        type="url"
                        value={formData.instagramUrl}
                        onChange={(e) =>
                          updateFormData("instagramUrl", e.target.value)
                        }
                        className="p-3 border-2 border-black/20 font-mono text-sm 
                                 focus:border-black focus:outline-none"
                        placeholder="Instagram URL"
                      />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          updateFormData("website", e.target.value)
                        }
                        className="p-3 border-2 border-black/20 font-mono text-sm 
                                 focus:border-black focus:outline-none md:col-span-2"
                        placeholder="Personal website"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Voice of Artist Statement */}
            {currentStep === 3 && (
              <div className="content-panel border-2 border-black p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <Globe className="w-6 h-6 text-black" />
                  <h3 className="font-display text-2xl md:text-3xl text-black">
                    Voice of Artist Statement
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      What is your Voice of Artist?{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <p className="font-mono text-sm text-black/70 mb-4">
                      This is the core question of our platform. What message,
                      emotion, or perspective do you bring to the world through
                      your art?
                    </p>
                    <textarea
                      value={formData.voiceOfArtistStatement}
                      onChange={(e) =>
                        updateFormData("voiceOfArtistStatement", e.target.value)
                      }
                      rows={8}
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none resize-none"
                      placeholder="Describe your unique artistic voice and what you want to communicate through your music..."
                      required
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold text-black mb-2 block">
                      Artist Goals & Aspirations
                    </label>
                    <textarea
                      value={formData.artistGoals}
                      onChange={(e) =>
                        updateFormData("artistGoals", e.target.value)
                      }
                      rows={4}
                      className="w-full p-4 border-2 border-black/20 font-mono 
                               focus:border-black focus:outline-none resize-none"
                      placeholder="What are you hoping to achieve with your music? Where do you see your artistic journey going?"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="interviews"
                        checked={formData.availableForInterviews}
                        onChange={(e) =>
                          updateFormData(
                            "availableForInterviews",
                            e.target.checked
                          )
                        }
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="interviews"
                        className="font-mono text-black"
                      >
                        I&apos;m available for interviews and features
                      </label>
                    </div>

                    <div>
                      <label className="font-mono font-bold text-black mb-2 block">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContactMethod}
                        onChange={(e) =>
                          updateFormData(
                            "preferredContactMethod",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border-2 border-black/20 font-mono 
                                 focus:border-black focus:outline-none"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="social">Social Media</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: File Uploads */}
            {currentStep === 4 && (
              <div className="content-panel border-2 border-black p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <FileText className="w-6 h-6 text-black" />
                  <h3 className="font-display text-2xl md:text-3xl text-black">
                    Media & Files
                  </h3>
                </div>

                <div className="space-y-8">
                  <FileUpload
                    label="Music Samples"
                    accept="audio/*"
                    multiple={true}
                    required={false}
                    files={formData.musicSamples}
                    onChange={(files) =>
                      updateFormData("musicSamples", files as File[])
                    }
                    maxFiles={5}
                    maxSize={25}
                  />

                  <FileUpload
                    label="Artist Photos"
                    accept="image/*"
                    multiple={true}
                    files={formData.photos}
                    onChange={(files) =>
                      updateFormData("photos", files as File[])
                    }
                    maxFiles={10}
                    maxSize={5}
                  />

                  <FileUpload
                    label="Press Kit (Optional)"
                    accept=".pdf,.doc,.docx"
                    files={formData.pressKit}
                    onChange={(file) =>
                      updateFormData("pressKit", file as File)
                    }
                    maxSize={10}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-4 font-mono text-lg border-2 transition-colors ${
                  currentStep === 1
                    ? "border-black/20 text-black/40 cursor-not-allowed"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                Previous
              </button>

              <div className="font-mono text-sm text-black/60">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className={`px-8 py-4 font-mono text-lg transition-colors ${
                    validateStep(currentStep)
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-black/20 text-black/40 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep(currentStep) || isSubmitting}
                  className={`px-8 py-4 font-mono text-lg transition-colors ${
                    validateStep(currentStep) && !isSubmitting
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-black/20 text-black/40 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>

            {submitError && (
              <div className="mt-6 flex items-center gap-2 text-red-600 font-mono">
                <AlertCircle className="w-5 h-5" />
                {submitError}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export { ArtistApplicationForm };
