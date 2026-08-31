import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";

export function CallButton({
  variant = "secondary",
  size = "md",
  showNumber = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show the number itself rather than "Call now". */
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <a
      href={site.phone.href}
      aria-label={copy.a11y.callAria}
      className={buttonClasses(variant, size, className)}
    >
      <PhoneIcon className="h-4 w-4" />
      {showNumber ? site.phone.display : copy.actions.call}
    </a>
  );
}
