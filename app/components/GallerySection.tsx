import { ExternalLink } from "lucide-react";
import GallerySlider from "./GallerySlider";

interface GallerySectionProps {
  photoDriveUrl: string;
}

export default function GallerySection({ photoDriveUrl }: GallerySectionProps) {
  return (
    <section className="py-12 px-6 md:px-12 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 md:mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-neutral-900">
              Фотогалерея
            </h2>
            <p className="text-on-surface-variant text-lg">
              Погрузитесь в атмосферу вашего будущего дома
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <a 
              href={photoDriveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex justify-center items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-neutral-800 hover:scale-[1.005] active:scale-95 transition-all duration-70 shadow-sm hover:shadow-lg ease-in-out cursor-pointer"
            >
              Смотреть все 100+ фотографий на диске
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <GallerySlider />
      </div>
    </section>
  );
}
