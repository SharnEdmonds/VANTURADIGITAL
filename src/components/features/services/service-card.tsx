import Link from "next/link";
import type { Service } from "@/types";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";

// ═══════════════════════════════════════════════════════════════
// ServiceCard — smart component rendering a single service
// ═══════════════════════════════════════════════════════════════

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug.current}`} className="group">
      <Card>
        <h2 className="mb-2 text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors">
          {service.title}
        </h2>
        <p className="mb-4 text-sm text-[var(--color-muted)]">
          {service.shortDescription}
        </p>
        {service.capabilities?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {service.capabilities.slice(0, 3).map((cap) => (
              <Badge key={cap._key}>{cap.title}</Badge>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
