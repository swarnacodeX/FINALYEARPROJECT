import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 auto-rows-[22rem] gap-6 max-w-6xl mx-auto p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  imageUrl,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border dark:border-white/20 bg-white dark:bg-neutral-900 p-6 shadow-md transition-all hover:shadow-2xl hover:scale-[1.02]",
        imageUrl ? "text-white bg-cover bg-center" : "",
        className
      )}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
    >
      {/* Blur overlay for image background */}
      {imageUrl && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 rounded-3xl" />
      )}

      <div className="relative z-10 flex flex-col space-y-4">
        {header}

        <div className="flex flex-col space-y-2">
          {icon && (
            <div className="text-3xl opacity-90 group-hover:opacity-100 transition">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
          )}
          {description && (
            <p className="text-sm opacity-70 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
