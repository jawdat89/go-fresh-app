// src/components/ContentItemComponent.tsx
interface ContentItemProps {
  title?: string;
  description?: string;
  emoji?: string;
  link?: string;
  linkText?: string;
  icon?: JSX.Element; // Updated type to JSX.Element
}

export default function ContentItem({
  title,
  description,
  emoji,
  link,
  linkText,
  icon,
}: ContentItemProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      {title ? (
        <h3 className="font-heading text-2xl font-bold">{title}</h3>
      ) : null}
      {description ? <p className="font-body mt-2">{description}</p> : null}
      {emoji ? <p className="mt-2">{emoji}</p> : null}
      {link && linkText ? (
        <a href={link} className="text-primary hover:text-secondary transition">
          {linkText}
          {icon && <span className="inline-block ml-2">{icon}</span>}
        </a>
      ) : (
        <> </>
      )}
    </div>
  );
}
