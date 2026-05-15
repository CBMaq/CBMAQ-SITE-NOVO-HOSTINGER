"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X, GripVertical, Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { uploadImage } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface SortablePhotoProps {
  url: string;
  index: number;
  onRemove: (url: string) => void;
}

function SortablePhoto({ url, index, onRemove }: SortablePhotoProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group aspect-square rounded-xl border-2 border-border overflow-hidden bg-muted/30",
        isDragging ? "opacity-50 border-primary" : ""
      )}
    >
      <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover" />

      {/* Grip Handler */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 left-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing hover:bg-black/70"
      >
        <GripVertical className="w-4 h-4" />
      </div>


      {/* Remove Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(url);
        }}
        className="absolute top-2 right-2 p-1.5 bg-destructive/90 backdrop-blur-sm rounded-md text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive shadow-sm"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
  bucketName?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  bucketName = "service_images"
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const currentFilesCount = value.length;
      const spaceLeft = maxFiles - currentFilesCount;
      const filesToUpload = acceptedFiles.slice(0, spaceLeft);

      if (filesToUpload.length === 0) {
        alert(`Você atingiu o limite de ${maxFiles} imagens.`);
        return;
      }

      setIsUploading(true);
      try {
        const uploadPromises = filesToUpload.map(file => uploadImage(file, bucketName));
        const newUrls = await Promise.all(uploadPromises);
        
        onChange([...value, ...newUrls]);
      } catch (error) {
        console.error("Error uploading images:", error);
        alert("Ocorreu um erro ao fazer o upload das imagens.");
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange, maxFiles, bucketName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    disabled: isUploading || value.length >= maxFiles,
  });

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as string);
      const newIndex = value.indexOf(over.id as string);

      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer text-center",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50 hover:border-muted-foreground",
          isUploading || value.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm font-medium">Fazendo upload...</span>
          </div>
        ) : (
          <>
            <div className="p-3 bg-muted rounded-full">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {isDragActive ? "Solte as imagens aqui" : "Arraste e solte ou clique para selecionar"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                PNG, JPG ou WEBP até 5MB. Proporção recomendada: 16:9. {value.length}/{maxFiles} adicionadas.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Sortable Gallery */}
      {value.length > 0 && (
        <div className="p-4 bg-muted/20 border border-border rounded-xl">
          <p className="text-xs text-muted-foreground mb-3 font-medium flex items-center justify-between">
            <span>Arraste para reordenar as fotos da galeria.</span>
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={value} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {value.map((url, index) => (
                  <SortablePhoto
                    key={url}
                    url={url}
                    index={index}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
