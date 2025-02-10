import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";

export default function FoodUploadWidget() {
  const [dragActive, setDragActive] = useState(false);

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the uploaded file
      console.log(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Log Food
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-primary bg-primary/10" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your food photo here, or click to select a file
          </p>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                // Handle the uploaded file
                console.log(e.target.files[0]);
              }
            }}
          />
          <Button asChild variant="secondary">
            <label htmlFor="file-upload">Select File</label>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
