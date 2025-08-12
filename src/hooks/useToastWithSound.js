"use client";

import { toast } from "sonner"; // ← استورد toast مباشرة، مش useToast
import { Howl } from "howler";

// مسار الصوت
const sound = new Howl({
  src: ["/sounds/alert.mp3"],
  volume: 0.5,
});

export default function useToastWithSound() {
  const notify = (type, message) => {
    // تشغيل الصوت
    sound.play();

    // عرض الإشعار باستخدام sonner.toast
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return notify;
}
