import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import type { ProjectData } from "../../types/chat";

interface ProjectCarouselProps {
  projects: ProjectData[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="project-carousel-container w-full max-w-2xl mx-auto my-4">
      {/* Header */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-mono text-purple-300 mb-1">
          ✨ Featured Projects
        </h3>
        <p className="text-xs text-gray-400 font-mono">
          {currentIndex + 1} / {projects.length}
        </p>
      </div>

      {/* Main Carousel Card */}
      <div className="relative bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden shadow-xl shadow-purple-900/20">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-black">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          {/* Achievement Badge */}
          {currentProject.achievement && (
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-400/50">
              <span className="text-xs font-mono text-purple-300">
                {currentProject.achievement}
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5">
          {/* Title */}
          <h4 className="text-xl font-bold text-white mb-2 font-mono">
            {currentProject.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 leading-relaxed font-mono">
            {currentProject.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-purple-900/30 text-purple-300 border border-purple-500/30 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {currentProject.link && (
              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded text-sm text-purple-300 font-mono transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            )}
            {currentProject.github && (
              <a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 border border-gray-600/50 rounded text-sm text-gray-300 font-mono transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-purple-300" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-purple-300" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-purple-400 w-6"
                  : "bg-purple-900/50 hover:bg-purple-700/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
