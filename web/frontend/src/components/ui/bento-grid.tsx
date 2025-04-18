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
        "grid md:auto-rows-[35rem] grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto ",
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
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-100 shadow-input dark:shadow-none p-4 bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
        imageUrl ? "text-white bg-cover bg-center" : "dark:bg-black dark:border-white/[0.2]",
        className
      )}
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
    >
      <div className={cn("relative z-10", imageUrl && "backdrop-blur-sm bg-black/30 p-2 rounded-lg")}>
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {icon}
          <div className="font-sans font-bold text-neutral-100 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-200 text-xs">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

