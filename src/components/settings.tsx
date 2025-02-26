import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch.tsx";
import { useWordleStore } from "@/lib/store.ts";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip.tsx";

export const SettingsDialog = () => {
  const settings = useWordleStore(({ settings }) => settings);
  const setSettings = useWordleStore(({ setSettings }) => setSettings);
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>הגדרות</TooltipContent>
      </Tooltip>
      <DialogContent aria-description="הגדרות">
        <DialogHeader>
          <DialogTitle>הגדרות</DialogTitle>
          <DialogDescription className="sr-only">
            הגדרות עבור וורדל מניאק: מצב קשה, אוצר מילים מורחב
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <SwitchCard
            value={settings.hardMode}
            onChange={(hardMode) => setSettings({ hardMode })}
            name="מצב קשה"
            description="ניתן להשתמש רק במילים שתואמות לרמזים שניתנו עד עכשיו."
          />
          <SwitchCard
            value={settings.expandedMode}
            onChange={(expandedMode) => setSettings({ expandedMode })}
            name="אוצר מילים מורחב"
            description="המילים האפשריות נבחרות מתוך אוצר מילים רחב, כולל מילים נדירות והטיות נוספות."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SwitchCard = ({
  value,
  onChange,
  name,
  description,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  name: string;
  description: string;
}) => (
  <label className="flex flex-row items-center justify-between rounded-lg border p-4">
    <div className="space-y-0.5">
      <div className="text-base">{name}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
    <div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  </label>
);
